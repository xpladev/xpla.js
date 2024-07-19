/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../util/json';
import { Dec, Int, Numeric } from '../../numeric';
import { Params as DistributionParamsV1B1_pb } from '@xpla/xpla.proto/cosmos/distribution/v1beta1/distribution';

export class DistributionParamsV1B1 extends JSONSerializable<
  DistributionParamsV1B1.Amino,
  DistributionParamsV1B1.Data,
  DistributionParamsV1B1.Proto
> {
  public community_tax: Dec;
  public base_proposer_reward: Dec;
  public bonus_proposer_reward: Dec;

  /**
   * @param community_tax
   * @param base_proposer_reward Deprecated: This field is deprecated and is no longer used in the x/distribution module's reward mechanism
   * @param bonus_proposer_reward Deprecated: This field is deprecated and is no longer used in the x/distribution module's reward mechanism
   * @param withdraw_addr_enabled
   */
  constructor(
    community_tax: Numeric.Input,
    /** @deprecated */ base_proposer_reward: Numeric.Input,
    /** @deprecated */ bonus_proposer_reward: Numeric.Input,
    public withdraw_addr_enabled: boolean
  ) {
    super();
    this.community_tax = new Dec(community_tax);
    this.base_proposer_reward = new Dec(base_proposer_reward);
    this.bonus_proposer_reward = new Dec(bonus_proposer_reward);
  }

  public static fromAmino(
    data: DistributionParamsV1B1.Amino,
    _?: boolean
  ): DistributionParamsV1B1 {
    const {
      community_tax,
      base_proposer_reward,
      bonus_proposer_reward,
      withdraw_addr_enabled,
    } = data;
    return new DistributionParamsV1B1(
      community_tax ?? 0,
      base_proposer_reward ?? 0,
      bonus_proposer_reward ?? 0,
      withdraw_addr_enabled ?? false
    );
  }

  public toAmino(_?: boolean): DistributionParamsV1B1.Amino {
    const {
      community_tax,
      base_proposer_reward,
      bonus_proposer_reward,
      withdraw_addr_enabled,
    } = this;

    const res: DistributionParamsV1B1.Amino = {
      community_tax: community_tax.toFixed(),
      base_proposer_reward: base_proposer_reward.toFixed(),
      bonus_proposer_reward: bonus_proposer_reward.toFixed(),
      withdraw_addr_enabled,
    };

    return res;
  }

  public static fromData(
    data: DistributionParamsV1B1.Data,
    _?: boolean
  ): DistributionParamsV1B1 {
    const {
      community_tax,
      base_proposer_reward,
      bonus_proposer_reward,
      withdraw_addr_enabled,
    } = data;
    return new DistributionParamsV1B1(
      community_tax,
      base_proposer_reward,
      bonus_proposer_reward,
      withdraw_addr_enabled
    );
  }

  public toData(_?: boolean): DistributionParamsV1B1.Data {
    const {
      community_tax,
      base_proposer_reward,
      bonus_proposer_reward,
      withdraw_addr_enabled,
    } = this;

    const res: DistributionParamsV1B1.Data = {
      '@type': '/cosmos.distribution.v1beta1.Params',
      community_tax: community_tax.toFixed(),
      base_proposer_reward: base_proposer_reward.toFixed(),
      bonus_proposer_reward: bonus_proposer_reward.toFixed(),
      withdraw_addr_enabled,
    };

    return res;
  }

  public static fromProto(
    proto: DistributionParamsV1B1.Proto,
    _?: boolean
  ): DistributionParamsV1B1 {
    return new DistributionParamsV1B1(
      proto.communityTax,
      proto.baseProposerReward,
      proto.bonusProposerReward,
      proto.withdrawAddrEnabled
    );
  }

  public toProto(_?: boolean): DistributionParamsV1B1.Proto {
    const {
      community_tax,
      base_proposer_reward,
      bonus_proposer_reward,
      withdraw_addr_enabled,
    } = this;
    return DistributionParamsV1B1_pb.fromPartial({
      communityTax: community_tax.toFixed(),
      baseProposerReward: base_proposer_reward.toFixed(),
      bonusProposerReward: bonus_proposer_reward.toFixed(),
      withdrawAddrEnabled: withdraw_addr_enabled,
    });
  }
}

export namespace DistributionParamsV1B1 {
  export interface Amino {
    community_tax: string | undefined;
    base_proposer_reward: string | undefined;
    bonus_proposer_reward: string | undefined;
    withdraw_addr_enabled: boolean | undefined;
  }

  export interface Data {
    '@type': '/cosmos.distribution.v1beta1.Params';
    community_tax: string;
    base_proposer_reward: string;
    bonus_proposer_reward: string;
    withdraw_addr_enabled: boolean;
  }

  export type Proto = DistributionParamsV1B1_pb;
}
