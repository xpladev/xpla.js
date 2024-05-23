/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { Coin } from '../../../Coin';
import { AccAddress, ValAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgDelegate as MsgDelegateV1B1_pb } from '@xpla/xpla.proto/cosmos/staking/v1beta1/tx';

/**
 * A delegator can submit this message to send more Luna to be staked through a
 * validator delegate.
 */
export class MsgDelegateV1B1 extends JSONSerializable<
  MsgDelegateV1B1.Amino,
  MsgDelegateV1B1.Data,
  MsgDelegateV1B1.Proto
> {
  /**
   *
   * @param delegator_address delegator's account address
   * @param validator_address validator's operator address
   * @param amount amount of LUNA to be sent for delegation
   */
  constructor(
    public delegator_address: AccAddress,
    public validator_address: ValAddress,
    public amount: Coin
  ) {
    super();
  }

  public static fromAmino(
    data: MsgDelegateV1B1.Amino,
    _isClassic?: boolean
  ): MsgDelegateV1B1 {
    const {
      value: { delegator_address, validator_address, amount },
    } = data;
    return new MsgDelegateV1B1(
      delegator_address,
      validator_address,
      Coin.fromAmino(amount)
    );
  }

  public toAmino(isClassic?: boolean): MsgDelegateV1B1.Amino {
    const { delegator_address, validator_address, amount } = this;
    return {
      type: isClassic ? 'staking/MsgDelegate' : 'cosmos-sdk/MsgDelegate',
      value: {
        delegator_address,
        validator_address,
        amount: amount.toAmino(),
      },
    };
  }

  public static fromProto(
    proto: MsgDelegateV1B1.Proto,
    _isClassic?: boolean
  ): MsgDelegateV1B1 {
    return new MsgDelegateV1B1(
      proto.delegatorAddress,
      proto.validatorAddress,
      Coin.fromProto(proto.amount as Coin.Proto)
    );
  }

  public toProto(_isClassic?: boolean): MsgDelegateV1B1.Proto {
    const { delegator_address, validator_address, amount } = this;
    return MsgDelegateV1B1_pb.fromPartial({
      amount: amount.toProto(),
      delegatorAddress: delegator_address,
      validatorAddress: validator_address,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.staking.v1beta1.MsgDelegate',
      value: MsgDelegateV1B1_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(msgAny: Any, isClassic?: boolean): MsgDelegateV1B1 {
    return MsgDelegateV1B1.fromProto(
      MsgDelegateV1B1_pb.decode(msgAny.value),
      isClassic
    );
  }

  public static fromData(
    data: MsgDelegateV1B1.Data,
    _isClassic?: boolean
  ): MsgDelegateV1B1 {
    const { delegator_address, validator_address, amount } = data;
    return new MsgDelegateV1B1(
      delegator_address,
      validator_address,
      Coin.fromData(amount)
    );
  }

  public toData(_isClassic?: boolean): MsgDelegateV1B1.Data {
    const { delegator_address, validator_address, amount } = this;
    return {
      '@type': '/cosmos.staking.v1beta1.MsgDelegate',
      delegator_address,
      validator_address,
      amount: amount.toData(),
    };
  }
}

export namespace MsgDelegateV1B1 {
  export interface Amino {
    type: 'staking/MsgDelegate' | 'cosmos-sdk/MsgDelegate';
    value: {
      delegator_address: AccAddress;
      validator_address: ValAddress;
      amount: Coin.Amino;
    };
  }

  export interface Data {
    '@type': '/cosmos.staking.v1beta1.MsgDelegate';
    delegator_address: AccAddress;
    validator_address: ValAddress;
    amount: Coin.Data;
  }

  export type Proto = MsgDelegateV1B1_pb;
}
