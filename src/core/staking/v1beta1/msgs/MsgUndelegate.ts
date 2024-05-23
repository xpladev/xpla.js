/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { Coin } from '../../../Coin';
import { AccAddress, ValAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgUndelegate as MsgUndelegateV1B1_pb } from '@xpla/xpla.proto/cosmos/staking/v1beta1/tx';

/**
 * A delegator can undelegate an amount of bonded Luna, and will begin the unbonding
 * process for those funds. The unbonding process takes 21 days to complete, during
 * which the Luna cannot be transacted or swapped.
 */
export class MsgUndelegateV1B1 extends JSONSerializable<
  MsgUndelegateV1B1.Amino,
  MsgUndelegateV1B1.Data,
  MsgUndelegateV1B1.Proto
> {
  /**
   * @param delegator_address delegator's account address
   * @param validator_address validator's operator address
   * @param amount Luna to be undelegated
   */
  constructor(
    public delegator_address: AccAddress,
    public validator_address: ValAddress,
    public amount: Coin
  ) {
    super();
  }

  public static fromAmino(
    data: MsgUndelegateV1B1.Amino,
    _isClassic?: boolean
  ): MsgUndelegateV1B1 {
    const {
      value: { delegator_address, validator_address, amount },
    } = data;
    return new MsgUndelegateV1B1(
      delegator_address,
      validator_address,
      Coin.fromAmino(amount)
    );
  }

  public toAmino(isClassic?: boolean): MsgUndelegateV1B1.Amino {
    const { delegator_address, validator_address, amount } = this;
    return {
      type: isClassic ? 'staking/MsgUndelegate' : 'cosmos-sdk/MsgUndelegate',
      value: {
        delegator_address,
        validator_address,
        amount: amount.toAmino(),
      },
    };
  }

  public static fromProto(
    proto: MsgUndelegateV1B1.Proto,
    _isClassic?: boolean
  ): MsgUndelegateV1B1 {
    return new MsgUndelegateV1B1(
      proto.delegatorAddress,
      proto.validatorAddress,
      Coin.fromProto(proto.amount as Coin.Proto)
    );
  }

  public toProto(_isClassic?: boolean): MsgUndelegateV1B1.Proto {
    const { delegator_address, validator_address, amount } = this;
    return MsgUndelegateV1B1_pb.fromPartial({
      amount: amount.toProto(),
      delegatorAddress: delegator_address,
      validatorAddress: validator_address,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.staking.v1beta1.MsgUndelegate',
      value: MsgUndelegateV1B1_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(msgAny: Any, isClassic?: boolean): MsgUndelegateV1B1 {
    return MsgUndelegateV1B1.fromProto(
      MsgUndelegateV1B1_pb.decode(msgAny.value),
      isClassic
    );
  }

  public static fromData(
    data: MsgUndelegateV1B1.Data,
    _isClassic?: boolean
  ): MsgUndelegateV1B1 {
    const { delegator_address, validator_address, amount } = data;
    return new MsgUndelegateV1B1(
      delegator_address,
      validator_address,
      Coin.fromData(amount)
    );
  }

  public toData(_isClassic?: boolean): MsgUndelegateV1B1.Data {
    const { delegator_address, validator_address, amount } = this;
    return {
      '@type': '/cosmos.staking.v1beta1.MsgUndelegate',
      delegator_address,
      validator_address,
      amount: amount.toData(),
    };
  }
}

export namespace MsgUndelegateV1B1 {
  export interface Amino {
    type: 'staking/MsgUndelegate' | 'cosmos-sdk/MsgUndelegate';
    value: {
      delegator_address: AccAddress;
      validator_address: ValAddress;
      amount: Coin.Amino;
    };
  }

  export interface Data {
    '@type': '/cosmos.staking.v1beta1.MsgUndelegate';
    delegator_address: AccAddress;
    validator_address: ValAddress;
    amount: Coin.Data;
  }

  export type Proto = MsgUndelegateV1B1_pb;
}
