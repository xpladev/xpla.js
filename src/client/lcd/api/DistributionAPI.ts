import { BaseAPI } from './BaseAPI';
import {
  Coins,
  AccAddress,
  Dec,
  ValAddress,
  DistributionParamsV1B1,
} from '../../../core';
import { APIParams } from '../APIRequester';
import { LCDClient } from '../LCDClient';

/**
 * Holds the resonse of delegator rewards query
 */
export interface Rewards {
  /**
   * An object that maps validator addresses to corresponding rewards earned with that validator
   */
  rewards: {
    [validator: string]: Coins;
  };

  /**
   * Total cumulative rewards across delegations with all validators
   */
  total: Coins;
}

export namespace Rewards {
  export interface Data {
    rewards: {
      validator_address: ValAddress;
      reward: Coins.Data;
    }[];
    total: Coins.Data;
  }
}

export class DistributionAPI extends BaseAPI {
  constructor(public lcd: LCDClient) {
    super(lcd.apiRequester);
  }

  /**
   * Gets a delegator's rewards.
   * @param delegator delegator's account address
   */
  public async rewards(
    delegator: AccAddress,
    params: APIParams = {}
  ): Promise<Rewards> {
    const rewardsData = await this.c
      .get<Rewards.Data>(
        `/cosmos/distribution/v1beta1/delegators/${delegator}/rewards`,
        params
      )
      .then(d => d);

    const rewards: Rewards['rewards'] = {};
    for (const reward of rewardsData.rewards) {
      rewards[reward.validator_address] = Coins.fromData(reward.reward);
    }
    return {
      rewards,
      total: Coins.fromData(rewardsData.total),
    };
  }

  /**
   * Gets a validator's rewards.
   * @param validator validator's operator address
   */
  public async validatorCommission(
    validator: ValAddress,
    params: APIParams = {}
  ): Promise<Coins> {
    return this.c
      .get<{
        commission: {
          commission: Coins.Data;
        };
      }>(
        `/cosmos/distribution/v1beta1/validators/${validator}/commission`,
        params
      )
      .then(d => d.commission)
      .then(d => Coins.fromData(d.commission));
  }

  /**
   * Gets the withdraw address of a delegator, the address to which rewards are withdrawn.
   * @param delegator
   */
  public async withdrawAddress(
    delegator: AccAddress,
    params: APIParams = {}
  ): Promise<AccAddress> {
    return this.c
      .get<{ withdraw_address: AccAddress }>(
        `/cosmos/distribution/v1beta1/delegators/${delegator}/withdraw_address`,
        params
      )
      .then(d => d.withdraw_address);
  }

  /**
   * Gets the current value of the community pool.
   */
  public async communityPool(params: APIParams = {}): Promise<Coins> {
    return this.c
      .get<{ pool: Coins.Data }>(
        `/cosmos/distribution/v1beta1/community_pool`,
        params
      )
      .then(d => Coins.fromData(d.pool));
  }

  /**
   * Gets the current distribution parameters.
   */
  public async parameters(
    params: APIParams = {}
  ): Promise<DistributionParamsV1B1> {
    return this.c
      .get<{ params: any }>('/cosmos/distribution/v1beta1/params', params)
      .then(({ params: d }) => DistributionParamsV1B1.fromData(d));
  }
}
