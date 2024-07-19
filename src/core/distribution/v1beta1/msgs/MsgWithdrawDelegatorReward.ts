/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { AccAddress, ValAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgWithdrawDelegatorReward as MsgWithdrawDelegatorRewardV1B1_pb } from '@xpla/xpla.proto/cosmos/distribution/v1beta1/tx';

/**
 * A delegator can withdraw currently outstanding rewards accrued from their delegation
 * toward a validator by submitting the following message.
 *
 * The rewards will be deposited to their Withdraw Address.
 */
export class MsgWithdrawDelegatorRewardV1B1 extends JSONSerializable<
  MsgWithdrawDelegatorRewardV1B1.Amino,
  MsgWithdrawDelegatorRewardV1B1.Data,
  MsgWithdrawDelegatorRewardV1B1.Proto
> {
  /**
   *
   * @param delegator_address delegator's account address
   * @param validator_address validator's operator address
   */
  constructor(
    public delegator_address: AccAddress,
    public validator_address: ValAddress
  ) {
    super();
  }

  public static fromAmino(
    data: MsgWithdrawDelegatorRewardV1B1.Amino,
    _isClassic?: boolean
  ): MsgWithdrawDelegatorRewardV1B1 {
    const {
      value: { delegator_address, validator_address },
    } = data;
    return new MsgWithdrawDelegatorRewardV1B1(
      delegator_address,
      validator_address
    );
  }

  public toAmino(isClassic?: boolean): MsgWithdrawDelegatorRewardV1B1.Amino {
    const { delegator_address, validator_address } = this;
    return {
      type: isClassic
        ? 'distribution/MsgWithdrawDelegationReward'
        : 'cosmos-sdk/MsgWithdrawDelegationReward',
      value: {
        delegator_address,
        validator_address,
      },
    };
  }

  public static fromData(
    proto: MsgWithdrawDelegatorRewardV1B1.Data,
    _isClassic?: boolean
  ): MsgWithdrawDelegatorRewardV1B1 {
    const { delegator_address, validator_address } = proto;
    return new MsgWithdrawDelegatorRewardV1B1(
      delegator_address,
      validator_address
    );
  }

  public toData(_isClassic?: boolean): MsgWithdrawDelegatorRewardV1B1.Data {
    const { delegator_address, validator_address } = this;
    return {
      '@type': '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward',
      delegator_address,
      validator_address,
    };
  }

  public static fromProto(
    proto: MsgWithdrawDelegatorRewardV1B1.Proto,
    _isClassic?: boolean
  ): MsgWithdrawDelegatorRewardV1B1 {
    return new MsgWithdrawDelegatorRewardV1B1(
      proto.delegatorAddress,
      proto.validatorAddress
    );
  }

  public toProto(_isClassic?: boolean): MsgWithdrawDelegatorRewardV1B1.Proto {
    const { delegator_address, validator_address } = this;
    return MsgWithdrawDelegatorRewardV1B1_pb.fromPartial({
      delegatorAddress: delegator_address,
      validatorAddress: validator_address,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward',
      value: MsgWithdrawDelegatorRewardV1B1_pb.encode(
        this.toProto(isClassic)
      ).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgWithdrawDelegatorRewardV1B1 {
    return MsgWithdrawDelegatorRewardV1B1.fromProto(
      MsgWithdrawDelegatorRewardV1B1_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgWithdrawDelegatorRewardV1B1 {
  export interface Amino {
    type:
      | 'distribution/MsgWithdrawDelegationReward'
      | 'cosmos-sdk/MsgWithdrawDelegationReward';
    value: {
      delegator_address: AccAddress;
      validator_address: ValAddress;
    };
  }

  export interface Data {
    '@type': '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward';
    delegator_address: AccAddress;
    validator_address: ValAddress;
  }

  export type Proto = MsgWithdrawDelegatorRewardV1B1_pb;
}
