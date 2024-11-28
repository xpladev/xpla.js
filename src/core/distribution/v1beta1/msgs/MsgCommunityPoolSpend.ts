/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { Coins } from '../../../Coins';
import { AccAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgCommunityPoolSpend as MsgCommunityPoolSpendV1B1_pb } from '@xpla/xpla.proto/cosmos/distribution/v1beta1/tx';

export class MsgCommunityPoolSpendV1B1 extends JSONSerializable<
  MsgCommunityPoolSpendV1B1.Amino,
  MsgCommunityPoolSpendV1B1.Data,
  MsgCommunityPoolSpendV1B1.Proto
> {
  /**
   * value of the transaction
   */
  public amount: Coins;

  /**
   * @param validator_address validator's operator address
   */
  constructor(
    public authority: AccAddress,
    public recipient: AccAddress,
    amount: Coins.Input
  ) {
    super();
    this.amount = new Coins(amount);
  }

  public static fromAmino(
    data: MsgCommunityPoolSpendV1B1.Amino,
    _isClassic?: boolean
  ): MsgCommunityPoolSpendV1B1 {
    const {
      value: { authority, recipient, amount },
    } = data;
    return new MsgCommunityPoolSpendV1B1(
      authority,
      recipient,
      Coins.fromAmino(amount)
    );
  }

  public toAmino(isClassic?: boolean): MsgCommunityPoolSpendV1B1.Amino {
    const { authority, recipient, amount } = this;
    return {
      type: isClassic
        ? 'distribution/MsgCommunityPoolSpend'
        : 'cosmos-sdk/distr/MsgCommunityPoolSpend',
      value: {
        authority,
        recipient,
        amount: amount.toAmino(),
      },
    };
  }

  public static fromData(
    proto: MsgCommunityPoolSpendV1B1.Data,
    _isClassic?: boolean
  ): MsgCommunityPoolSpendV1B1 {
    const { authority, recipient, amount } = proto;
    return new MsgCommunityPoolSpendV1B1(
      authority,
      recipient,
      Coins.fromAmino(amount)
    );
  }

  public toData(_isClassic?: boolean): MsgCommunityPoolSpendV1B1.Data {
    const { authority, recipient, amount } = this;
    return {
      '@type': '/cosmos.distribution.v1beta1.MsgCommunityPoolSpend',
      authority,
      recipient,
      amount: amount.toData(),
    };
  }

  public static fromProto(
    proto: MsgCommunityPoolSpendV1B1.Proto,
    _isClassic?: boolean
  ): MsgCommunityPoolSpendV1B1 {
    return new MsgCommunityPoolSpendV1B1(
      proto.authority,
      proto.recipient,
      Coins.fromProto(proto.amount)
    );
  }

  public toProto(_isClassic?: boolean): MsgCommunityPoolSpendV1B1.Proto {
    const { authority, recipient, amount } = this;
    return MsgCommunityPoolSpendV1B1_pb.fromPartial({
      authority,
      recipient,
      amount: amount.toProto(),
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.distribution.v1beta1.MsgCommunityPoolSpend',
      value: MsgCommunityPoolSpendV1B1_pb.encode(
        this.toProto(isClassic)
      ).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgCommunityPoolSpendV1B1 {
    return MsgCommunityPoolSpendV1B1.fromProto(
      MsgCommunityPoolSpendV1B1_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgCommunityPoolSpendV1B1 {
  export interface Amino {
    type:
      | 'distribution/MsgCommunityPoolSpend'
      | 'cosmos-sdk/distr/MsgCommunityPoolSpend';
    value: {
      authority: AccAddress;
      recipient: AccAddress;
      amount: Coins.Amino;
    };
  }

  export interface Data {
    '@type': '/cosmos.distribution.v1beta1.MsgCommunityPoolSpend';
    authority: AccAddress;
    recipient: AccAddress;
    amount: Coins.Data;
  }

  export type Proto = MsgCommunityPoolSpendV1B1_pb;
}
