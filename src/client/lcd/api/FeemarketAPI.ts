import { FeemarketParamsV1 } from '../../../core';
import { APIParams } from '../APIRequester';
import { LCDClient } from '../LCDClient';
import { BaseAPI } from './BaseAPI';

export class FeemarketAPI extends BaseAPI {
  constructor(public lcd: LCDClient) {
    super(lcd.apiRequester);
  }

  public async baseFee(params: APIParams = {}): Promise<string> {
    try {
      // from 1.8
      return await this.c
        .get<{ base_fee: string }>('/cosmos/evm/feemarket/v1/base_fee', params)
        .catch(() => { throw new Error('Not Implemented') })
        .then(d => d.base_fee ?? '');
    } catch {}
    // for 1.7
    return await this.c
      .get<{ base_fee: string }>('/ethermint/feemarket/v1/base_fee', params)
      .then(d => d.base_fee ?? '');
  }

  public async blockGas(params: APIParams = {}): Promise<string> {
    try {
      // from 1.8
      return await this.c
        .get<{ gas: string }>('/cosmos/evm/feemarket/v1/block_gas', params)
        .catch(() => { throw new Error('Not Implemented') })
        .then(d => d.gas ?? '');
    } catch {}
    // for 1.7
    return await this.c
      .get<{ gas: string }>('/ethermint/feemarket/v1/block_gas', params)
      .then(d => d.gas ?? '');
  }

  /**
   * Gets the current evm feemarket module's parameters.
   */
  public async parameters(
    params: APIParams = {}
  ): Promise<FeemarketParamsV1 | any> {
    try {
      // from 1.8
      return await this.c
        .get<{ params: any }>('/cosmos/evm/feemarket/v1/params', params)
        .catch(() => { throw new Error('Not Implemented') })
        .then(({ params: d }) => FeemarketParamsV1.fromData(d));
    } catch {}
    // for 1.7
    return await this.c
      .get<{ params: any }>('/ethermint/feemarket/v1/params', params)
      .then(({ params: d }) => FeemarketParamsV1.fromData(d));
  }
}
