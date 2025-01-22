import { BaseAPI } from './BaseAPI';
import {
  Coins,
  AccAddress,
  ValAddress,
  DistributionParamsV1B1,
} from '../../../core';
import { APIParams, Pagination } from '../APIRequester';
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

/**
 * Holds the resonse of delegator rewards query
 */
export interface ValidatorRewards {
  operator_address: AccAddress;
  self_bond_rewards: Coins;
  commission: Coins;
}

export namespace ValidatorRewards {
  export interface Data {
    operator_address: AccAddress;
    self_bond_rewards: Coins.Data;
    commission: Coins.Data;
  }
}

export interface Slash {
  fraction: string;
  validator_period: string;
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
    validator?: AccAddress,
    params: APIParams = {}
  ): Promise<Rewards> {
    if (validator !== undefined) {
      const rewardsData = await this.c
      .get<{ rewards: Coins.Data }>(
        `/cosmos/distribution/v1beta1/delegators/${delegator}/rewards/${validator}`,
        params
      )
      .then(d => d);

      const rewards: Rewards['rewards'] = {};
      rewards[validator] = Coins.fromData(rewardsData.rewards);
      return {
        rewards,
        total: rewards[validator],
      };
    }

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

  public async validators(
    delegator: AccAddress,
    params: APIParams = {}
  ): Promise<string[]> {
    return this.c
      .get<{ validators: string[] }>(
        `/cosmos/distribution/v1beta1/delegators/${delegator}/validators`,
        params
      )
      .then(d => d.validators);
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
   * Gets a validator's rewards.
   * @param validator validator's operator address
   */
  public async validatorRewards(
    validator: ValAddress,
    params: APIParams = {}
  ): Promise<ValidatorRewards> {
    return this.c
      .get<ValidatorRewards.Data>(
        `/cosmos/distribution/v1beta1/validators/${validator}`,
        params
      )
      .then(d => ({
        operator_address: d.operator_address,
        self_bond_rewards: Coins.fromData(d.self_bond_rewards),
        commission: Coins.fromData(d.commission),
      }));
  }

  /**
   * Gets a validator's commission.
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

  public async validatorOutstandingRewards(
    validator: ValAddress,
    params: APIParams = {}
  ): Promise<Coins> {
    return this.c
      .get<{
        rewards: {
          rewards: Coins.Data;
        };
      }>(
        `/cosmos/distribution/v1beta1/validators/${validator}/outstanding_rewards`,
        params
      )
      .then(d => d.rewards)
      .then(d => Coins.fromData(d.rewards));
  }

  public async validatorSlashes(
    validator: ValAddress,
    params: APIParams = {}
  ): Promise<[Slash[], Pagination]> {
    return this.c
      .get<{
        slashes: Slash[];
        pagination: Pagination;
      }>(
        `/cosmos/distribution/v1beta1/validators/${validator}/slashes`,
        params
      )
      .then(d => [ d.slashes, d.pagination ]);
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
