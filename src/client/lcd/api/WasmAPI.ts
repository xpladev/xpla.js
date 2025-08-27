import { BaseAPI } from './BaseAPI';
import { AccAddress } from '../../../core/bech32';
import { APIParams, Pagination, PaginationOptions } from '../APIRequester';
import { LCDClient } from '../LCDClient';
import {
  HistoryEntry,
  AbsoluteTxPosition,
  AccessConfig,
  CodesParamsV1,
} from '../../../core/wasm';
import { Convert } from '../../../util/convert';

export interface CodeInfo {
  code_id: number;
  code_hash: string;
  data_hash: string;
  creator: AccAddress;
  instantiate_config?: AccessConfig;
  data?: string;
}

export namespace CodeInfo {
  export interface DataV1 {
    code_id: string;
    code_hash: string;
    creator: AccAddress;
  }
  export interface DataV2 {
    code_id: string;
    data_hash: string;
    creator: AccAddress;
    instantiate_permission?: AccessConfig.Data;
  }
  export interface DataV3 {
    code_id: string;
    checksum: string;
    creator: AccAddress;
    instantiate_permission?: AccessConfig.Data;
  }
}

export interface ContractInfo {
  code_id: number;
  address?: AccAddress;
  creator: AccAddress;
  admin?: AccAddress;
  init_msg?: any; // object
  label?: string;
  created?: AbsoluteTxPosition;
  ibc_port_id?: string;
  extension?: any;
}

export namespace ContractInfo {
  export interface DataV1 {
    code_id: string;
    address: AccAddress;
    creator: AccAddress;
    admin: AccAddress;
    init_msg: any; // object
  }

  export interface DataV2 {
    code_id: string;
    creator: AccAddress;
    admin: AccAddress;
    label?: string;
    created?: AbsoluteTxPosition.Data;
    ibc_port_id?: string;
    extension?: any;
  }
}

export interface PinnedCodes {
  code_ids: number[];
}

export interface QueryResult {
  data: string;
}
export namespace QueryResult {
  export interface Data {
    data: string;
  }
}

export interface Model {
  key: string;
  value: string;
}

export namespace Model {
  export interface Data {
    key: string;
    value: string;
  }
}

export class WasmAPI extends BaseAPI {
  constructor(public lcd: LCDClient) {
    super(lcd.apiRequester);
  }

  public async codeInfos(
    params: Partial<PaginationOptions & APIParams> = {}
  ): Promise<[CodeInfo[], Pagination]> {
    return this.c
      .get<{
        code_infos: CodeInfo.DataV2[];
        pagination: Pagination;
      }>('/cosmwasm/wasm/v1/code', params)
      .then(d => ([
        d.code_infos.map(code_info => ({
          code_id: +code_info.code_id,
          code_hash: code_info.data_hash,
          data_hash: code_info.data_hash,
          creator: code_info.creator,
          instantiate_permission: code_info.instantiate_permission
            ? AccessConfig.fromData(code_info.instantiate_permission)
            : undefined,
        })),
        d.pagination,
      ]));
  }

  public async codeInfo(
    codeID: number,
    with_data: boolean = false,
    params: APIParams = {}
  ): Promise<CodeInfo> {
    if (with_data) {
      const endpoint = `/cosmwasm/wasm/v1/code/${codeID}`;
      return this.c
      .get<{ code_info: CodeInfo.DataV2, data: string }>(endpoint, params)
      .then((d) => ({
        code_id: +d.code_info.code_id,
        code_hash: d.code_info.data_hash,
        data_hash: d.code_info.data_hash,
        checksum: d.code_info.data_hash,
        creator: d.code_info.creator,
        instantiate_permission: d.code_info.instantiate_permission
          ? AccessConfig.fromData(d.code_info.instantiate_permission)
          : undefined,
        data: d.data,
      }));
    } else {
      const endpoint = `/cosmwasm/wasm/v1/code-info/${codeID}`;
      return this.c
      .get<CodeInfo.DataV3>(endpoint, params)
      .then((d) => ({
        code_id: +d.code_id,
        code_hash: d.checksum,
        data_hash: d.checksum,
        checksum: d.checksum,
        creator: d.creator,
        instantiate_permission: d.instantiate_permission
          ? AccessConfig.fromData(d.instantiate_permission)
          : undefined,
      }));
    }
  }

  public async contractInfo(
    contractAddress: AccAddress,
    params: APIParams = {}
  ): Promise<ContractInfo> {
    // new endpoint doesn't return init_msg so have to retrieve it from history
    const [historyEntry, _] = await this.contractHistory(contractAddress);

    const endpoint = `/cosmwasm/wasm/v1/contract/${contractAddress}`;
    return this.c
      .get<{ contract_info: ContractInfo.DataV2 }>(endpoint, params)
      .then(({ contract_info: d }) => ({
        code_id: Number.parseInt(d.code_id),
        address: contractAddress,
        creator: d.creator,
        admin: d.admin !== '' ? d.admin : undefined,
        label: d.label !== '' ? d.label : undefined,
        init_msg: historyEntry[0].msg,
        created: d.created ? AbsoluteTxPosition.fromData(d.created) : undefined,
        ibc_port_id: d.ibc_port_id !== '' ? d.ibc_port_id : undefined,
        extension: d.extension,
      }));
  }

  public async contractQuery<T>(
    contractAddress: AccAddress,
    query: object | string,
    params: APIParams = {}
  ): Promise<T> {
    const query_msg = Convert.toBase64(Convert.fromUTF8(JSON.stringify(query)));
    const endpoint = `/cosmwasm/wasm/v1/contract/${contractAddress}/smart/${query_msg}`;
    return this.c
      .get<{ data: T }>(endpoint, {
        ...params,
      })
      .then(d => d.data);
  }

  public async parameters(
    module = 'codes',
    params: APIParams = {}
  ): Promise<CodesParamsV1 | any> {
    return this.c
      .get<{ params: any }>(`/cosmwasm/wasm/v1/${module}/params`, params)
      .then(({ params: d }) => {
        if (module === 'codes') return CodesParamsV1.fromData(d);
        return d;
      });
  }

  public async wasmLimitsConfig(
    params: APIParams = {}
  ): Promise<any> {
    return this.c
      .get<{ config: string }>('/cosmwasm/wasm/v1/wasm-limits-config', params)
      .then(({ config: d }) => JSON.parse(d));
  }

  public async pinnedCodes(
    params: Partial<PaginationOptions & APIParams> = {}
  ): Promise<[PinnedCodes, Pagination]> {
    if (this.lcd.config.isClassic) {
      throw new Error('Not supported for the network');
    }
    return this.c
      .get<{
        code_ids: string[];
        pagination: Pagination;
      }>(`/cosmwasm/wasm/v1/codes/pinned`, params)
      .then(d => ([
        { code_ids: d.code_ids.map(Number.parseInt), },
        d.pagination,
      ]));
  }

  public async rawContractState(
    contractAddress: AccAddress,
    query_data: string,
    params: APIParams = {}
  ): Promise<QueryResult> {
    if (this.lcd.config.isClassic) {
      throw new Error('Not supported for the network');
    }
    return this.c
      .get<{ result: QueryResult.Data }>(
        `/cosmwasm/wasm/v1/contract/${contractAddress}/raw/${
          Convert.toBase64(Convert.fromUTF8(query_data))
        }`,
        params
      )
      .then(({ result: d }) => ({
        data: Convert.toUTF8(Convert.fromBase64(d.data)),
      }));
  }

  public async smartContractState(
    contractAddress: AccAddress,
    query_data: object | string,
    params: APIParams = {}
  ): Promise<QueryResult> {
    if (this.lcd.config.isClassic) {
      throw new Error('Not supported for the network');
    }
    return this.c
      .get<{ result: QueryResult.Data }>(
        `/cosmwasm/wasm/v1/contract/${contractAddress}/smart/${
          Convert.toBase64(Convert.fromUTF8(JSON.stringify(query_data)))
        }`,
        params
      )
      .then(({ result: d }) => ({
        data: d.data,
      }));
  }

  public async contractHistory(
    contractAddress: AccAddress,
    params: Partial<PaginationOptions & APIParams> = {}
  ): Promise<[HistoryEntry[], Pagination]> {
    if (this.lcd.config.isClassic) {
      throw new Error('Not supported for the network');
    }
    return this.c
      .get<{
        entries: HistoryEntry.Data[];
        pagination: Pagination;
      }>(`/cosmwasm/wasm/v1/contract/${contractAddress}/history`, params)
      .then(d => [
        d.entries.map(HistoryEntry.fromData),
        d.pagination,
      ]);
  }

  public async contractStates(
    contractAddress: AccAddress,
    params: Partial<PaginationOptions & APIParams> = {}
  ): Promise<[Model[], Pagination]> {
    if (this.lcd.config.isClassic) {
      throw new Error('Not supported for the network');
    }
    return this.c
      .get<{
        models: Model.Data[];
        pagination: Pagination;
      }>(`/cosmwasm/wasm/v1/contract/${contractAddress}/state`, params)
      .then(d => [
        d.models.map(model => {
          return {
            key: model.key,
            value: model.value,
          };
        }),
        d.pagination,
      ]);
  }

  public async contractsByCreator(
    creator: AccAddress,
    params: Partial<PaginationOptions & APIParams> = {}
  ): Promise<[string[], Pagination]> {
    if (this.lcd.config.isClassic) {
      throw new Error('Not supported for the network');
    }
    return this.c
      .get<{
        contract_addresses: string[];
        pagination: Pagination;
      }>(`/cosmwasm/wasm/v1/contracts/creator/${creator}`, params)
      .then(d => [
        d.contract_addresses,
        d.pagination,
      ]);
  }

  public async buildAddress(
    codeHash: string,
    creator: AccAddress,
    salt?: string,
    initArgs?: any,
    params: APIParams = {}
  ): Promise<string> {
    if (this.lcd.config.isClassic) {
      throw new Error('Not supported for the network');
    }
    params.code_hash = codeHash;
    params.creator_address = creator;
    params.salt = salt;
    params.init_msg = initArgs ? Convert.toBase64(Convert.fromUTF8(JSON.stringify(initArgs))) : undefined;
    return this.c
      .get<{
        address: string;
      }>('/cosmwasm/wasm/v1/contract/build_address', params)
      .then(d => d.address);
  }
}
