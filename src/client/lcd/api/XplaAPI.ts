import { Coins, RewardParamsV1B1 } from '../../../core';
import { APIParams } from '../APIRequester';
import { LCDClient } from '../LCDClient';
import { BaseAPI } from './BaseAPI';

export class XplaAPI extends BaseAPI {
  constructor(public lcd: LCDClient) {
    super(lcd.apiRequester);
  }

  public async rewardPool(params: APIParams = {}): Promise<Coins> {
    return this.c.get<{ pool: any[] }>('/xpla/reward/v1beta1/pool', params)
      .then(d => Coins.fromData(d.pool));
  }

  public async volunteerValidators(params: APIParams = {}): Promise<string[]> {
    return this.c.get<{ volunteer_validators: string[] }>('/xpla/volunteer/v1beta1/validators', params)
      .then(d => d.volunteer_validators);
  }

  /**
   * Gets the current xpla reward module's parameters.
   */
  public async parameters(
    module = 'reward',
    params: APIParams = {}
  ): Promise<RewardParamsV1B1 | any> {
    return this.c
      .get<{ params: any }>(`/xpla/${module}/v1beta1/params`, params)
      .then(({ params: d }) => {
        if (d?.reward_distribute_account) {
          return RewardParamsV1B1.fromData(d);
        }
        return d;
      });
  }
}
