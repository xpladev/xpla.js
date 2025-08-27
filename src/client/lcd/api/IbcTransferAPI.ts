import { BaseAPI } from './BaseAPI';
import { APIParams, Pagination, PaginationOptions } from '../APIRequester';
import { LCDClient } from '../LCDClient';
import { Coins } from '../../../core';
import {
  IbcChannelCounterpartyV1 as PortChannel,
} from '../../../core/ibc/core';

export interface IbcDenom {
  base: string;
  trace: PortChannel[];
}
export namespace IbcDenom {
  export interface Data {
    base: string;
    trace: PortChannel.Data[];
  }
}

export interface IbcTransferParams {
  send_enabled: boolean;
  receive_enabled: boolean;
}
export namespace IbcTransferParams {
  export interface Data {
    send_enabled: boolean;
    receive_enabled: boolean;
  }
}

export class IbcTransferAPI extends BaseAPI {
  constructor(public lcd: LCDClient) {
    super(lcd.apiRequester);
  }

  public async denoms(
    params: Partial<PaginationOptions & APIParams> = {}
  ): Promise<[ IbcDenom[], Pagination ]> {
    return await this.c.get<{ denoms: IbcDenom[], pagination: Pagination }>(
      '/ibc/apps/transfer/v1/denoms',
      params
    )
    .then(d => [
      d.denoms.map(d => ({
        base: d.base,
        trace: d.trace.map(PortChannel.fromData),
      })),
      d.pagination,
    ]);
  }

  public async denom(
    hash: string,
    params: Partial<PaginationOptions & APIParams> = {}
  ): Promise<[ IbcDenom, Pagination ]> {
    return await this.c.get<{ denom: IbcDenom.Data, pagination: Pagination }>(
      `/ibc/apps/transfer/v1/denoms/${encodeURIComponent(hash)}`,
      params
    )
    .then(d => [
      {
        base: d.denom.base,
        trace: d.denom.trace.map(PortChannel.fromData),
      },
      d.pagination,
    ]);
  }

  public async escrowAddress(
    channel_id: string,
    port_id: string,
    params: APIParams = {}
  ): Promise<string> {
    return this.c
      .get<{ escrow_address: string }>(
        `/ibc/apps/transfer/v1/channels/${channel_id}/ports/${port_id}/escrow_address`,
        params
      )
      .then(d => d.escrow_address);
  }

  /** Gets a denomination hash information */
  public async denomHash(
    trace: string,
    params: Partial<PaginationOptions & APIParams> = {}
  ): Promise<string> {
    return await this.c.get<string>(
      `/ibc/apps/transfer/v1/denom_hashes/${trace}`,
      params
    );
  }

  public async totalEscrow(
    denom: string,
    params: APIParams = {}
  ): Promise<Coins> {
    return await this.c.get<{ amount: { amount: string, denom: string } }>(
      `/ibc/apps/transfer/v1/denoms/${denom}/total_escrow`,
      params
    )
    .then(d => Coins.fromData([d.amount]));
  }

  /**
   * Gets the current transfer application parameters.
   */
  public async parameters(params: APIParams = {}): Promise<IbcTransferParams> {
    return this.c
      .get<{ params: IbcTransferParams.Data }>(
        `/ibc/apps/transfer/v1/params`,
        params
      )
      .then(({ params: d }) => ({
        send_enabled: d.send_enabled,
        receive_enabled: d.receive_enabled,
      }));
  }
}
