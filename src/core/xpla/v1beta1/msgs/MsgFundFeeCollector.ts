/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { Coins } from '../../../Coins';
import { AccAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgFundFeeCollector as MsgFundFeeCollectorV1B1_pb } from '@xpla/xpla.proto/xpla/reward/v1beta1/tx';

/**
 * A basic message for sending [[Coins]] between Xpla accounts.
 */
export class MsgFundFeeCollectorV1B1 extends JSONSerializable<
  MsgFundFeeCollectorV1B1.Amino,
  MsgFundFeeCollectorV1B1.Data,
  MsgFundFeeCollectorV1B1.Proto
> {
  /**
   * value of the transaction
   */
  public amount: Coins;

  /**
   * @param amount value of the transaction
   * @param depositor depositor's address
   */
  constructor(amount: Coins.Input, public depositor: AccAddress) {
    super();
    this.amount = new Coins(amount);
  }

  public static fromAmino(
    data: MsgFundFeeCollectorV1B1.Amino,
    _isClassic?: boolean
  ): MsgFundFeeCollectorV1B1 {
    const {
      value: { amount, depositor },
    } = data;
    return new MsgFundFeeCollectorV1B1(Coins.fromAmino(amount), depositor);
  }

  public toAmino(_isClassic?: boolean): MsgFundFeeCollectorV1B1.Amino {
    const { amount, depositor } = this;
    return {
      type: 'xpladev/MsgFundFeeCollector',
      value: {
        amount: amount.toAmino(),
        depositor,
      },
    };
  }

  public static fromData(
    data: MsgFundFeeCollectorV1B1.Data,
    _isClassic?: boolean
  ): MsgFundFeeCollectorV1B1 {
    const { amount, depositor } = data;

    return new MsgFundFeeCollectorV1B1(Coins.fromData(amount), depositor);
  }

  public toData(_isClassic?: boolean): MsgFundFeeCollectorV1B1.Data {
    const { amount, depositor } = this;
    return {
      '@type': '/xpla.reward.v1beta1.MsgFundFeeCollector',
      amount: amount.toData(),
      depositor,
    };
  }

  public static fromProto(
    proto: MsgFundFeeCollectorV1B1.Proto,
    _isClassic?: boolean
  ): MsgFundFeeCollectorV1B1 {
    return new MsgFundFeeCollectorV1B1(
      Coins.fromProto(proto.amount),
      proto.depositor
    );
  }

  public toProto(_isClassic?: boolean): MsgFundFeeCollectorV1B1.Proto {
    const { amount, depositor } = this;
    return MsgFundFeeCollectorV1B1_pb.fromPartial({
      amount: amount.toProto(),
      depositor,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/xpla.reward.v1beta1.MsgFundFeeCollector',
      value: MsgFundFeeCollectorV1B1_pb.encode(
        this.toProto(isClassic)
      ).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgFundFeeCollectorV1B1 {
    return MsgFundFeeCollectorV1B1.fromProto(
      MsgFundFeeCollectorV1B1_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgFundFeeCollectorV1B1 {
  export interface Amino {
    type: 'xpladev/MsgFundFeeCollector';
    value: {
      amount: Coins.Amino;
      depositor: AccAddress;
    };
  }

  export interface Data {
    '@type': '/xpla.reward.v1beta1.MsgFundFeeCollector';
    amount: Coins.Data;
    depositor: AccAddress;
  }

  export type Proto = MsgFundFeeCollectorV1B1_pb;
}
