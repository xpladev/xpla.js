import { Dec, Numeric, MintParamsV1B1 } from '../../../core';
import { APIParams } from '../APIRequester';
import { LCDClient } from '../LCDClient';
import { BaseAPI } from './BaseAPI';

export class MintAPI extends BaseAPI {
  constructor(public lcd: LCDClient) {
    super(lcd.apiRequester);
  }

  /**
   * Gets the current minting inflation value
   */
  public async inflation(params: APIParams = {}): Promise<Dec> {
    return this.c
      .get<{ inflation: Numeric.Input }>(
        `/cosmos/mint/v1beta1/inflation`,
        params
      )
      .then(d => new Dec(d.inflation));
  }

  /**
   * Gets the current minting annual provisions value
   */
  public async annualProvisions(params: APIParams = {}): Promise<Dec> {
    return this.c
      .get<{ annual_provisions: Numeric.Input }>(
        `cosmos/mint/v1beta1/annual_provisions`,
        params
      )
      .then(d => new Dec(d.annual_provisions));
  }

  /**
   * Gets the current minting module's parameters.
   */
  public async parameters(params: APIParams = {}): Promise<MintParamsV1B1> {
    return this.c
      .get<{ params: any }>('/cosmos/mint/v1beta1/params', params)
      .then(({ params: d }) => MintParamsV1B1.fromData(d));
  }
}
