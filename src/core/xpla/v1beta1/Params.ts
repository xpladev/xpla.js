/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../util/json';
import { Dec, Int, Numeric } from '../../../core/numeric';
import { AccAddress, Denom } from '../../../core';
import { Params as RewardParamsV1B1_pb } from '@xpla/xpla.proto/xpla/reward/v1beta1/reward';

export class RewardParamsV1B1 extends JSONSerializable<
  RewardParamsV1B1.Amino,
  RewardParamsV1B1.Data,
  RewardParamsV1B1.Proto
> {
  public fee_pool_rate: Dec;
  public community_pool_rate: Dec;
  public reserve_rate: Dec;

  /**
   * @param fee_pool_rate
   * @param community_pool_rate
   * @param reserve_rate
   * @param reserve_account
   * @param reward_distribute_account
   */
  constructor(
    fee_pool_rate: Numeric.Input,
    community_pool_rate: Numeric.Input,
    reserve_rate: Numeric.Input,
    public reserve_account: AccAddress,
    public reward_distribute_account: AccAddress
  ) {
    super();
    this.fee_pool_rate = new Dec(fee_pool_rate);
    this.community_pool_rate = new Dec(community_pool_rate);
    this.reserve_rate = new Dec(reserve_rate);
  }

  public static fromAmino(
    data: RewardParamsV1B1.Amino,
    _?: boolean
  ): RewardParamsV1B1 {
    const {
      fee_pool_rate,
      community_pool_rate,
      reserve_rate,
      reserve_account,
      reward_distribute_account,
    } = data;
    return new RewardParamsV1B1(
      fee_pool_rate ?? 0,
      community_pool_rate ?? 0,
      reserve_rate ?? 0,
      reserve_account ?? '',
      reward_distribute_account ?? ''
    );
  }

  public toAmino(_?: boolean): RewardParamsV1B1.Amino {
    const {
      fee_pool_rate,
      community_pool_rate,
      reserve_rate,
      reserve_account,
      reward_distribute_account,
    } = this;

    const res: RewardParamsV1B1.Amino = {
      fee_pool_rate: fee_pool_rate.toFixed(),
      community_pool_rate: community_pool_rate.toFixed(),
      reserve_rate: reserve_rate.toFixed(),
      reserve_account,
      reward_distribute_account,
    };

    return res;
  }

  public static fromData(
    data: RewardParamsV1B1.Data,
    _?: boolean
  ): RewardParamsV1B1 {
    const {
      fee_pool_rate,
      community_pool_rate,
      reserve_rate,
      reserve_account,
      reward_distribute_account,
    } = data;
    return new RewardParamsV1B1(
      fee_pool_rate,
      community_pool_rate,
      reserve_rate,
      reserve_account,
      reward_distribute_account
    );
  }

  public toData(_?: boolean): RewardParamsV1B1.Data {
    const {
      fee_pool_rate,
      community_pool_rate,
      reserve_rate,
      reserve_account,
      reward_distribute_account,
    } = this;

    const res: RewardParamsV1B1.Data = {
      '@type': '/xpla.reward.v1beta1.Params',
      fee_pool_rate: fee_pool_rate.toFixed(),
      community_pool_rate: community_pool_rate.toFixed(),
      reserve_rate: reserve_rate.toFixed(),
      reserve_account,
      reward_distribute_account,
    };

    return res;
  }

  public static fromProto(
    proto: RewardParamsV1B1.Proto,
    _?: boolean
  ): RewardParamsV1B1 {
    return new RewardParamsV1B1(
      proto.feePoolRate,
      proto.communityPoolRate,
      proto.reserveRate,
      proto.reserveAccount,
      proto.rewardDistributeAccount
    );
  }

  public toProto(_?: boolean): RewardParamsV1B1.Proto {
    const {
      fee_pool_rate,
      community_pool_rate,
      reserve_rate,
      reserve_account,
      reward_distribute_account,
    } = this;
    return RewardParamsV1B1_pb.fromPartial({
      feePoolRate: fee_pool_rate.toFixed(),
      communityPoolRate: community_pool_rate.toFixed(),
      reserveRate: reserve_rate.toFixed(),
      reserveAccount: reserve_account,
      rewardDistributeAccount: reward_distribute_account,
    });
  }
}

export namespace RewardParamsV1B1 {
  export interface Amino {
    fee_pool_rate: string | undefined;
    community_pool_rate: string | undefined;
    reserve_rate: string | undefined;
    reserve_account: string | undefined;
    reward_distribute_account: string | undefined;
  }

  export interface Data {
    '@type': '/xpla.reward.v1beta1.Params';
    fee_pool_rate: string;
    community_pool_rate: string;
    reserve_rate: string;
    reserve_account: string;
    reward_distribute_account: string;
  }

  export type Proto = RewardParamsV1B1_pb;
}
