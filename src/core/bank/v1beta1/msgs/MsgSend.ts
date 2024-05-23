/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { Coins } from '../../../Coins';
import { AccAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgSend as MsgSendV1B1_pb } from '@xpla/xpla.proto/cosmos/bank/v1beta1/tx';

/**
 * A basic message for sending [[Coins]] between Xpla accounts.
 */
export class MsgSendV1B1 extends JSONSerializable<
  MsgSendV1B1.Amino,
  MsgSendV1B1.Data,
  MsgSendV1B1.Proto
> {
  /**
   * value of the transaction
   */
  public amount: Coins;

  /**
   * @param from_address sender's address
   * @param to_address recipient's address
   * @param amount value of the transaction
   */
  constructor(
    public from_address: AccAddress,
    public to_address: AccAddress,
    amount: Coins.Input
  ) {
    super();
    this.amount = new Coins(amount);
  }

  public static fromAmino(
    data: MsgSendV1B1.Amino,
    _isClassic?: boolean
  ): MsgSendV1B1 {
    const {
      value: { from_address, to_address, amount },
    } = data;
    return new MsgSendV1B1(from_address, to_address, Coins.fromAmino(amount));
  }

  public toAmino(isClassic?: boolean): MsgSendV1B1.Amino {
    const { from_address, to_address, amount } = this;
    return {
      type: isClassic ? 'bank/MsgSend' : 'cosmos-sdk/MsgSend',
      value: {
        from_address,
        to_address,
        amount: amount.toAmino(),
      },
    };
  }

  public static fromData(
    data: MsgSendV1B1.Data,
    _isClassic?: boolean
  ): MsgSendV1B1 {
    const { from_address, to_address, amount } = data;
    return new MsgSendV1B1(from_address, to_address, Coins.fromData(amount));
  }

  public toData(_isClassic?: boolean): MsgSendV1B1.Data {
    const { from_address, to_address, amount } = this;
    return {
      '@type': '/cosmos.bank.v1beta1.MsgSend',
      from_address,
      to_address,
      amount: amount.toData(),
    };
  }

  public static fromProto(
    proto: MsgSendV1B1.Proto,
    _isClassic?: boolean
  ): MsgSendV1B1 {
    return new MsgSendV1B1(
      proto.fromAddress,
      proto.toAddress,
      Coins.fromProto(proto.amount)
    );
  }

  public toProto(_isClassic?: boolean): MsgSendV1B1.Proto {
    const { from_address, to_address, amount } = this;
    return MsgSendV1B1_pb.fromPartial({
      fromAddress: from_address,
      toAddress: to_address,
      amount: amount.toProto(),
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.bank.v1beta1.MsgSend',
      value: MsgSendV1B1_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(msgAny: Any, isClassic?: boolean): MsgSendV1B1 {
    return MsgSendV1B1.fromProto(
      MsgSendV1B1_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgSendV1B1 {
  export interface Amino {
    type: 'bank/MsgSend' | 'cosmos-sdk/MsgSend';
    value: {
      from_address: AccAddress;
      to_address: AccAddress;
      amount: Coins.Amino;
    };
  }

  export interface Data {
    '@type': '/cosmos.bank.v1beta1.MsgSend';
    from_address: AccAddress;
    to_address: AccAddress;
    amount: Coins.Data;
  }

  export type Proto = MsgSendV1B1_pb;
}
