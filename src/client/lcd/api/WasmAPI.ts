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
import { Params as WasmCodesParams } from '@xpla/xpla.proto/cosmwasm/wasm/v1/types';

export interface CodeInfo {
  code_id: number;
  code_hash: string;
  data_hash: string;
  creator: AccAddress;
  instantiate_config?: AccessConfig;
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

  public async codeInfo(
    codeID: number,
    params: APIParams = {}
  ): Promise<CodeInfo> {
    const endpoint = `/cosmwasm/wasm/v1/code/${codeID}`;

    return this.c
      .get<{ code_info: CodeInfo.DataV2 }>(endpoint, params)
      .then(({ code_info: d }) => ({
        code_id: +d.code_id,
        code_hash: d.data_hash,
        data_hash: d.data_hash,
        creator: d.creator,
        instantiate_permission: d.instantiate_permission
          ? AccessConfig.fromData(d.instantiate_permission)
          : undefined,
      }));
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
      }));
  }

  public async contractQuery<T>(
    contractAddress: AccAddress,
    query: object | string,
    params: APIParams = {}
  ): Promise<T> {
    const query_msg = Buffer.from(JSON.stringify(query), 'utf-8').toString(
      'base64'
    );
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

  public async pinnedCodes(params: APIParams = {}): Promise<PinnedCodes> {
    if (this.lcd.config.isClassic) {
      throw new Error('Not supported for the network');
    }
    return this.c
      .get<{
        code_ids: string[];
        pagination: Pagination;
      }>(`/cosmwasm/wasm/v1/codes/pinned`, params)
      .then(d => ({
        code_ids: d.code_ids.map(code_id => Number.parseInt(code_id)),
      }));
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
        `/cosmwasm/wasm/v1/contract/${contractAddress}/raw/${Buffer.from(
          query_data,
          'utf-8'
        ).toString('base64')}`,
        params
      )
      .then(({ result: d }) => ({
        data: Buffer.from(d.data, 'base64').toString(),
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
        `/cosmwasm/wasm/v1/contract/${contractAddress}/smart/${Buffer.from(
          JSON.stringify(query_data),
          'utf-8'
        ).toString('base64')}`,
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
        d.entries.map(entry => HistoryEntry.fromData(entry)),
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
}
