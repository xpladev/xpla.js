/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../util/json';
import { Coins } from '../../Coins';
import { ValAddress } from '../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgCommunityPoolSpend as MsgCommunityPoolSpend_pb } from '@xpla/xpla.proto/cosmos/distribution/v1beta1/tx';

export class MsgCommunityPoolSpend extends JSONSerializable<
  MsgCommunityPoolSpend.Amino,
  MsgCommunityPoolSpend.Data,
  MsgCommunityPoolSpend.Proto
> {
  /**
   * value of the transaction
   */
  public amount: Coins;

  /**
   * @param validator_address validator's operator address
   */
  constructor(
    public authority: ValAddress,
    public recipient: ValAddress,
    amount: Coins.Input
  ) {
    super();
    this.amount = new Coins(amount);
  }

  public static fromAmino(
    data: MsgCommunityPoolSpend.Amino,
    _isClassic?: boolean
  ): MsgCommunityPoolSpend {
    const {
      value: { authority, recipient, amount },
    } = data;
    return new MsgCommunityPoolSpend(
      authority,
      recipient,
      Coins.fromAmino(amount)
    );
  }

  public toAmino(isClassic?: boolean): MsgCommunityPoolSpend.Amino {
    const { authority, recipient, amount } = this;
    return {
      type: isClassic
        ? 'distribution/MsgCommunityPoolSpend'
        : 'cosmos-sdk/MsgCommunityPoolSpend',
      value: {
        authority,
        recipient,
        amount: amount.toAmino(),
      },
    };
  }

  public static fromData(
    proto: MsgCommunityPoolSpend.Data,
    _isClassic?: boolean
  ): MsgCommunityPoolSpend {
    const { authority, recipient, amount } = proto;
    return new MsgCommunityPoolSpend(
      authority,
      recipient,
      Coins.fromAmino(amount)
    );
  }

  public toData(_isClassic?: boolean): MsgCommunityPoolSpend.Data {
    const { authority, recipient, amount } = this;
    return {
      '@type': '/cosmos.distribution.v1beta1.MsgCommunityPoolSpend',
      authority,
      recipient,
      amount: amount.toData(),
    };
  }

  public static fromProto(
    proto: MsgCommunityPoolSpend.Proto,
    _isClassic?: boolean
  ): MsgCommunityPoolSpend {
    return new MsgCommunityPoolSpend(
      proto.authority,
      proto.recipient,
      Coins.fromProto(proto.amount)
    );
  }

  public toProto(_isClassic?: boolean): MsgCommunityPoolSpend.Proto {
    const { authority, recipient, amount } = this;
    return MsgCommunityPoolSpend_pb.fromPartial({
      authority,
      recipient,
      amount: amount.toProto(),
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.distribution.v1beta1.MsgCommunityPoolSpend',
      value: MsgCommunityPoolSpend_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgCommunityPoolSpend {
    return MsgCommunityPoolSpend.fromProto(
      MsgCommunityPoolSpend_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgCommunityPoolSpend {
  export interface Amino {
    type:
      | 'distribution/MsgCommunityPoolSpend'
      | 'cosmos-sdk/MsgCommunityPoolSpend';
    value: {
      authority: ValAddress;
      recipient: ValAddress;
      amount: Coins.Amino;
    };
  }

  export interface Data {
    '@type': '/cosmos.distribution.v1beta1.MsgCommunityPoolSpend';
    authority: ValAddress;
    recipient: ValAddress;
    amount: Coins.Data;
  }

  export type Proto = MsgCommunityPoolSpend_pb;
}
