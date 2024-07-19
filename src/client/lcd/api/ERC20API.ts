import { BaseAPI } from './BaseAPI';
import { ERC20ParamsV1 } from '../../../core';
import { APIParams } from '../APIRequester';
import { LCDClient } from '../LCDClient';

export class ERC20API extends BaseAPI {
  constructor(public lcd: LCDClient) {
    super(lcd.apiRequester);
  }

  /**
   * Gets the current erc20 module's parameters.
   */
  public async parameters(params: APIParams = {}): Promise<ERC20ParamsV1> {
    return this.c
      .get<{ params: any }>('/evmos/erc20/v1/params', params)
      .then(({ params: d }) => ERC20ParamsV1.fromData(d));
  }
}
