/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../util/json';
import { AccAddress, ValAddress } from '../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgWithdrawDelegatorReward as MsgWithdrawDelegatorReward_pb } from '@xpla/xpla.proto/cosmos/distribution/v1beta1/tx';

/**
 * A delegator can withdraw currently outstanding rewards accrued from their delegation
 * toward a validator by submitting the following message.
 *
 * The rewards will be deposited to their Withdraw Address.
 */
export class MsgWithdrawDelegatorReward extends JSONSerializable<
  MsgWithdrawDelegatorReward.Amino,
  MsgWithdrawDelegatorReward.Data,
  MsgWithdrawDelegatorReward.Proto
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
    data: MsgWithdrawDelegatorReward.Amino,
    _isClassic?: boolean
  ): MsgWithdrawDelegatorReward {
    const {
      value: { delegator_address, validator_address },
    } = data;
    return new MsgWithdrawDelegatorReward(delegator_address, validator_address);
  }

  public toAmino(isClassic?: boolean): MsgWithdrawDelegatorReward.Amino {
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
    proto: MsgWithdrawDelegatorReward.Data,
    _isClassic?: boolean
  ): MsgWithdrawDelegatorReward {
    const { delegator_address, validator_address } = proto;
    return new MsgWithdrawDelegatorReward(delegator_address, validator_address);
  }

  public toData(_isClassic?: boolean): MsgWithdrawDelegatorReward.Data {
    const { delegator_address, validator_address } = this;
    return {
      '@type': '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward',
      delegator_address,
      validator_address,
    };
  }

  public static fromProto(
    proto: MsgWithdrawDelegatorReward.Proto,
    _isClassic?: boolean
  ): MsgWithdrawDelegatorReward {
    return new MsgWithdrawDelegatorReward(
      proto.delegatorAddress,
      proto.validatorAddress
    );
  }

  public toProto(_isClassic?: boolean): MsgWithdrawDelegatorReward.Proto {
    const { delegator_address, validator_address } = this;
    return MsgWithdrawDelegatorReward_pb.fromPartial({
      delegatorAddress: delegator_address,
      validatorAddress: validator_address,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward',
      value: MsgWithdrawDelegatorReward_pb.encode(
        this.toProto(isClassic)
      ).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgWithdrawDelegatorReward {
    return MsgWithdrawDelegatorReward.fromProto(
      MsgWithdrawDelegatorReward_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgWithdrawDelegatorReward {
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

  export type Proto = MsgWithdrawDelegatorReward_pb;
}
