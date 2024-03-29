/* eslint-disable @typescript-eslint/no-unused-vars */
import { Coin } from '../../Coin';
import { JSONSerializable } from '../../../util/json';
import { AccAddress, ValAddress } from '../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgDelegate as MsgDelegate_pb } from '@xpla/xpla.proto/cosmos/staking/v1beta1/tx';

/**
 * A delegator can submit this message to send more Luna to be staked through a
 * validator delegate.
 */
export class MsgDelegate extends JSONSerializable<
  MsgDelegate.Amino,
  MsgDelegate.Data,
  MsgDelegate.Proto
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
    data: MsgDelegate.Amino,
    _isClassic?: boolean
  ): MsgDelegate {
    const {
      value: { delegator_address, validator_address, amount },
    } = data;
    return new MsgDelegate(
      delegator_address,
      validator_address,
      Coin.fromAmino(amount)
    );
  }

  public toAmino(isClassic?: boolean): MsgDelegate.Amino {
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
    proto: MsgDelegate.Proto,
    _isClassic?: boolean
  ): MsgDelegate {
    return new MsgDelegate(
      proto.delegatorAddress,
      proto.validatorAddress,
      Coin.fromProto(proto.amount as Coin.Proto)
    );
  }

  public toProto(_isClassic?: boolean): MsgDelegate.Proto {
    const { delegator_address, validator_address, amount } = this;
    return MsgDelegate_pb.fromPartial({
      amount: amount.toProto(),
      delegatorAddress: delegator_address,
      validatorAddress: validator_address,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.staking.v1beta1.MsgDelegate',
      value: MsgDelegate_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(msgAny: Any, isClassic?: boolean): MsgDelegate {
    return MsgDelegate.fromProto(
      MsgDelegate_pb.decode(msgAny.value),
      isClassic
    );
  }

  public static fromData(
    data: MsgDelegate.Data,
    _isClassic?: boolean
  ): MsgDelegate {
    const { delegator_address, validator_address, amount } = data;
    return new MsgDelegate(
      delegator_address,
      validator_address,
      Coin.fromData(amount)
    );
  }

  public toData(_isClassic?: boolean): MsgDelegate.Data {
    const { delegator_address, validator_address, amount } = this;
    return {
      '@type': '/cosmos.staking.v1beta1.MsgDelegate',
      delegator_address,
      validator_address,
      amount: amount.toData(),
    };
  }
}

export namespace MsgDelegate {
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

  export type Proto = MsgDelegate_pb;
}
