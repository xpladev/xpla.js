/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../util/json';
import { Coins } from '../../Coins';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { Period as PeriodV1B1_pb } from '@xpla/xpla.proto/cosmos/vesting/v1beta1/vesting';

/**
 * Period defines a length of time and amount of coins that will vest.
 */
export class PeriodV1B1 extends JSONSerializable<
  PeriodV1B1.Amino,
  PeriodV1B1.Data,
  PeriodV1B1.Proto
> {
  public amount: Coins;

  /**
   * @param length
   * @param amount
   */
  constructor(public length: number, amount: Coins.Input) {
    super();
    this.amount = new Coins(amount);
  }

  public static fromAmino(
    data: PeriodV1B1.Amino,
    _isClassic?: boolean
  ): PeriodV1B1 {
    const { length, amount } = data;
    return new PeriodV1B1(Number.parseInt(length), Coins.fromAmino(amount));
  }

  public toAmino(_isClassic?: boolean): PeriodV1B1.Amino {
    const { length, amount } = this;

    const res: PeriodV1B1.Amino = {
      length: length.toFixed(),
      amount: amount.toAmino(),
    };
    return res;
  }

  public static fromData(
    data: PeriodV1B1.Data,
    _isClassic?: boolean
  ): PeriodV1B1 {
    const { length, amount } = data;
    return new PeriodV1B1(Number.parseInt(length), Coins.fromData(amount));
  }

  public toData(_isClassic?: boolean): PeriodV1B1.Data {
    const { length, amount } = this;

    const res: PeriodV1B1.Amino = {
      length: length.toFixed(),
      amount: amount.toData(),
    };
    return res;
  }

  public static fromProto(
    proto: PeriodV1B1.Proto,
    _isClassic?: boolean
  ): PeriodV1B1 {
    return new PeriodV1B1(
      proto.length.toNumber(),
      Coins.fromProto(proto.amount)
    );
  }

  public toProto(_isClassic?: boolean): PeriodV1B1.Proto {
    const { length, amount } = this;
    return PeriodV1B1_pb.fromPartial({
      length: length,
      amount: amount.toProto(),
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.vesting.v1beta1.Period',
      value: PeriodV1B1_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(msgAny: Any, isClassic?: boolean): PeriodV1B1 {
    return PeriodV1B1.fromProto(PeriodV1B1_pb.decode(msgAny.value), isClassic);
  }
}

export namespace PeriodV1B1 {
  export interface Amino {
    length: string;
    amount: Coins.Amino;
  }

  export interface Data {
    length: string;
    amount: Coins.Data;
  }

  export type Proto = PeriodV1B1_pb;
}
