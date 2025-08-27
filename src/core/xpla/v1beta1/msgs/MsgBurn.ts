/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { Coins } from '../../../Coins';
import { AccAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgBurn as MsgBurnV1B1_pb } from '@xpla/xpla.proto/xpla/burn/v1beta1/tx';

/** MsgBurn represents a message to burn coins from an account. */
export class MsgBurnV1B1 extends JSONSerializable<
  MsgBurnV1B1.Amino,
  MsgBurnV1B1.Data,
  MsgBurnV1B1.Proto
> {
  public amount: Coins;

  /**
   * @param authority is the address of the governance account.
   * @param amount
   */
  constructor(
    public authority: AccAddress,
    amount: Coins.Input,
  ) {
    super();
    this.amount = new Coins(amount);
  }

  public static fromAmino(
    amino: MsgBurnV1B1.Amino,
  ): MsgBurnV1B1 {
    const { authority, amount } = amino.value;
    return new MsgBurnV1B1(authority, Coins.fromAmino(amount));
  }

  public toAmino(): MsgBurnV1B1.Amino {
    const { authority, amount } = this;
    return {
      type: 'xpladev/MsgBurn',
      value: {
        authority,
        amount: amount.toAmino(),
      },
    };
  }

  public static fromData(
    data: MsgBurnV1B1.Data,
  ): MsgBurnV1B1 {
    const { authority, amount } = data;
    return new MsgBurnV1B1(authority, Coins.fromData(amount));
  }

  public toData(): MsgBurnV1B1.Data {
    const { authority, amount } = this;
    return {
      '@type': '/xpla.burn.v1beta1.MsgBurn',
      authority,
      amount: amount.toData(),
    };
  }

  public static fromProto(
    proto: MsgBurnV1B1.Proto,
  ): MsgBurnV1B1 {
    return new MsgBurnV1B1(
      proto.authority,
      Coins.fromProto(proto.amount),
    );
  }

  public toProto(): MsgBurnV1B1.Proto {
    const { authority, amount } = this;
    return MsgBurnV1B1_pb.fromPartial({
      authority,
      amount: amount.toProto(),
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/xpla.burn.v1beta1.MsgBurn',
      value: MsgBurnV1B1_pb.encode(
        this.toProto()
      ).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
  ): MsgBurnV1B1 {
    return MsgBurnV1B1.fromProto(
      MsgBurnV1B1_pb.decode(msgAny.value),
    );
  }
}

export namespace MsgBurnV1B1 {
  export interface Amino {
    type: 'xpladev/MsgBurn';
    value: {
      authority: AccAddress;
      amount: Coins.Amino;
    };
  }

  export interface Data {
    '@type': '/xpla.burn.v1beta1.MsgBurn';
    authority: AccAddress;
    amount: Coins.Data;
  }

  export type Proto = MsgBurnV1B1_pb;
}
