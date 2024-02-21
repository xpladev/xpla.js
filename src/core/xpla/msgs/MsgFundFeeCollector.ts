/* eslint-disable @typescript-eslint/no-unused-vars */
import { Coins } from '../../Coins';
import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgFundFeeCollector as MsgFundFeeCollector_pb } from '@xpla/xpla.proto/xpla/reward/v1beta1/tx';

/**
 * A basic message for sending [[Coins]] between Xpla accounts.
 */
export class MsgFundFeeCollector extends JSONSerializable<
  MsgFundFeeCollector.Amino,
  MsgFundFeeCollector.Data,
  MsgFundFeeCollector.Proto
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
    data: MsgFundFeeCollector.Amino,
    _isClassic?: boolean
  ): MsgFundFeeCollector {
    const {
      value: { amount, depositor },
    } = data;
    return new MsgFundFeeCollector(Coins.fromAmino(amount), depositor);
  }

  public toAmino(_isClassic?: boolean): MsgFundFeeCollector.Amino {
    const { amount, depositor } = this;
    return {
      type: 'xpla/MsgFundFeeCollector',
      value: {
        amount: amount.toAmino(),
        depositor,
      },
    };
  }

  public static fromData(
    data: MsgFundFeeCollector.Data,
    _isClassic?: boolean
  ): MsgFundFeeCollector {
    const { amount, depositor } = data;

    return new MsgFundFeeCollector(Coins.fromData(amount), depositor);
  }

  public toData(_isClassic?: boolean): MsgFundFeeCollector.Data {
    const { amount, depositor } = this;
    return {
      '@type': '/xpla.reward.v1beta1.MsgFundFeeCollector',
      amount: amount.toData(),
      depositor,
    };
  }

  public static fromProto(
    proto: MsgFundFeeCollector.Proto,
    _isClassic?: boolean
  ): MsgFundFeeCollector {
    return new MsgFundFeeCollector(
      Coins.fromProto(proto.amount),
      proto.depositor
    );
  }

  public toProto(_isClassic?: boolean): MsgFundFeeCollector.Proto {
    const { amount, depositor } = this;
    return MsgFundFeeCollector_pb.fromPartial({
      amount: amount.toProto(),
      depositor,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/xpla.reward.v1beta1.MsgFundFeeCollector',
      value: MsgFundFeeCollector_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgFundFeeCollector {
    return MsgFundFeeCollector.fromProto(
      MsgFundFeeCollector_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgFundFeeCollector {
  export interface Amino {
    type: 'xpla/MsgFundFeeCollector';
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

  export type Proto = MsgFundFeeCollector_pb;
}
