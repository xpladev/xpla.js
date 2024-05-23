/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { Coin } from '../../../Coin';
import { AccAddress, ValAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgBeginRedelegate as MsgBeginRedelegateV1B1_pb } from '@xpla/xpla.proto/cosmos/staking/v1beta1/tx';
/**
 * A delegator can choose to redelegate their bonded Luna and transfer a delegation
 * amount from one validator to another. Unlike undelegating, redelegations do not incur
 * a 21-day unbonding period and happen immediately.
 */
export class MsgBeginRedelegateV1B1 extends JSONSerializable<
  MsgBeginRedelegateV1B1.Amino,
  MsgBeginRedelegateV1B1.Data,
  MsgBeginRedelegateV1B1.Proto
> {
  /**
   *
   * @param delegator_address delegator's account address
   * @param validator_src_address validator to undelegate from
   * @param validator_dst_address validator to delegate to
   * @param amount LUNA to be redelegated
   */
  constructor(
    public delegator_address: AccAddress,
    public validator_src_address: ValAddress,
    public validator_dst_address: ValAddress,
    public amount: Coin
  ) {
    super();
  }

  public static fromAmino(
    data: MsgBeginRedelegateV1B1.Amino,
    _isClassic?: boolean
  ): MsgBeginRedelegateV1B1 {
    const {
      value: {
        delegator_address,
        validator_src_address,
        validator_dst_address,
        amount,
      },
    } = data;
    return new MsgBeginRedelegateV1B1(
      delegator_address,
      validator_src_address,
      validator_dst_address,
      Coin.fromAmino(amount)
    );
  }

  public toAmino(isClassic?: boolean): MsgBeginRedelegateV1B1.Amino {
    const {
      delegator_address,
      validator_src_address,
      validator_dst_address,
      amount,
    } = this;
    return {
      type: isClassic
        ? 'staking/MsgBeginRedelegate'
        : 'cosmos-sdk/MsgBeginRedelegate',
      value: {
        delegator_address,
        validator_src_address,
        validator_dst_address,
        amount: amount.toAmino(),
      },
    };
  }

  public static fromData(
    data: MsgBeginRedelegateV1B1.Data,
    _isClassic?: boolean
  ): MsgBeginRedelegateV1B1 {
    const {
      delegator_address,
      validator_src_address,
      validator_dst_address,
      amount,
    } = data;
    return new MsgBeginRedelegateV1B1(
      delegator_address,
      validator_src_address,
      validator_dst_address,
      Coin.fromData(amount)
    );
  }

  public toData(_isClassic?: boolean): MsgBeginRedelegateV1B1.Data {
    const {
      delegator_address,
      validator_src_address,
      validator_dst_address,
      amount,
    } = this;
    return {
      '@type': '/cosmos.staking.v1beta1.MsgBeginRedelegate',
      delegator_address,
      validator_src_address,
      validator_dst_address,
      amount: amount.toData(),
    };
  }

  public static fromProto(
    proto: MsgBeginRedelegateV1B1.Proto,
    _isClassic?: boolean
  ): MsgBeginRedelegateV1B1 {
    return new MsgBeginRedelegateV1B1(
      proto.delegatorAddress,
      proto.validatorSrcAddress,
      proto.validatorDstAddress,
      Coin.fromProto(proto.amount as Coin.Proto)
    );
  }

  public toProto(_isClassic?: boolean): MsgBeginRedelegateV1B1.Proto {
    const {
      delegator_address,
      validator_src_address,
      validator_dst_address,
      amount,
    } = this;
    return MsgBeginRedelegateV1B1_pb.fromPartial({
      amount: amount.toProto(),
      delegatorAddress: delegator_address,
      validatorDstAddress: validator_dst_address,
      validatorSrcAddress: validator_src_address,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.staking.v1beta1.MsgBeginRedelegate',
      value: MsgBeginRedelegateV1B1_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgBeginRedelegateV1B1 {
    return MsgBeginRedelegateV1B1.fromProto(
      MsgBeginRedelegateV1B1_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgBeginRedelegateV1B1 {
  export interface Amino {
    type: 'staking/MsgBeginRedelegate' | 'cosmos-sdk/MsgBeginRedelegate';
    value: {
      delegator_address: AccAddress;
      validator_src_address: ValAddress;
      validator_dst_address: ValAddress;
      amount: Coin.Amino;
    };
  }

  export interface Data {
    '@type': '/cosmos.staking.v1beta1.MsgBeginRedelegate';
    delegator_address: AccAddress;
    validator_src_address: ValAddress;
    validator_dst_address: ValAddress;
    amount: Coin.Data;
  }

  export type Proto = MsgBeginRedelegateV1B1_pb;
}
