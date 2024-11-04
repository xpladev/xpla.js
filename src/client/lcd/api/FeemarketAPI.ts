import { FeemarketParamsV1 } from '../../../core';
import { APIParams } from '../APIRequester';
import { LCDClient } from '../LCDClient';
import { BaseAPI } from './BaseAPI';

export class FeemarketAPI extends BaseAPI {
  constructor(public lcd: LCDClient) {
    super(lcd.apiRequester);
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
