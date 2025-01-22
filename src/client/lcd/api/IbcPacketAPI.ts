import { BaseAPI } from './BaseAPI';
import { APIParams } from '../APIRequester';
import { LCDClient } from '../LCDClient';
import { Dec } from '../../../core/numeric';

export interface IbcPacketForwardParams {
  fee_percentage: Dec;
}

export class IbcPacketAPI extends BaseAPI {
  constructor(public lcd: LCDClient) {
    super(lcd.apiRequester);
  }

  public async parameters(
    params: APIParams = {}
  ): Promise<IbcPacketForwardParams> {
    return this.c
      .get<{ params: {
        fee_percentage: string,
      } }>(
        '/ibc/apps/interchain_accounts/controller/v1/params',
        params
      )
      .then(({ params: d }) => ({
        fee_percentage: new Dec(d.fee_percentage),
      }));
  }
}
