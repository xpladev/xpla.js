import { FeemarketParamsV1 } from '../../../core';
import { APIParams } from '../APIRequester';
import { LCDClient } from '../LCDClient';
import { BaseAPI } from './BaseAPI';

export class FeemarketAPI extends BaseAPI {
  constructor(public lcd: LCDClient) {
    super(lcd.apiRequester);
  }

  public async baseFee(params: APIParams = {}): Promise<string> {
    return this.c
      .get<{ base_fee: string }>('/ethermint/feemarket/v1/base_fee', params)
      .then(d => d.base_fee ?? '');
  }

  public async blockGas(params: APIParams = {}): Promise<string> {
    return this.c
      .get<{ gas: string }>('/ethermint/feemarket/v1/block_gas', params)
      .then(d => d.gas ?? '');
  }

  /**
   * Gets the current ethermint feemarket module's parameters.
   */
  public async parameters(
    params: APIParams = {}
  ): Promise<FeemarketParamsV1 | any> {
    return this.c
      .get<{ params: any }>('/ethermint/feemarket/v1/params', params)
      .then(({ params: d }) => FeemarketParamsV1.fromData(d));
  }
}
