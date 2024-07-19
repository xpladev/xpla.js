import { BaseAPI } from './BaseAPI';
import { EvmParamsV1 } from '../../../core';
import { APIParams } from '../APIRequester';
import { LCDClient } from '../LCDClient';

export class EvmAPI extends BaseAPI {
  constructor(public lcd: LCDClient) {
    super(lcd.apiRequester);
  }

  /**
   * Gets the current evm module's parameters.
   */
  public async parameters(params: APIParams = {}): Promise<EvmParamsV1> {
    return this.c
      .get<{ params: any }>('/ethermint/evm/v1/params', params)
      .then(({ params: d }) => EvmParamsV1.fromData(d));
  }
}
