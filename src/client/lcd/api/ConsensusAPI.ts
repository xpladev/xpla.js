import { BaseAPI } from './BaseAPI';
import { ConsensusParams } from '../../../core';
import { APIParams } from '../APIRequester';
import { LCDClient } from '../LCDClient';

export class ConsensusAPI extends BaseAPI {
  constructor(public lcd: LCDClient) {
    super(lcd.apiRequester);
  }

  /**
   * Gets the current consensus parameters.
   */
  public async parameters(params: APIParams = {}): Promise<ConsensusParams> {
    return this.c
      .get<{ params: any }>('/cosmos/consensus/v1/params', params)
      .then(({ params: d }) => ConsensusParams.fromData(d));
  }
}
