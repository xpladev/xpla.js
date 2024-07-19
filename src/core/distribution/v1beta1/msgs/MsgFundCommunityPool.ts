/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Coins } from '../../../Coins';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgFundCommunityPool as MsgFundCommunityPoolV1B1_pb } from '@xpla/xpla.proto/cosmos/distribution/v1beta1/tx';

export class MsgFundCommunityPoolV1B1 extends JSONSerializable<
  MsgFundCommunityPoolV1B1.Amino,
  MsgFundCommunityPoolV1B1.Data,
  MsgFundCommunityPoolV1B1.Proto
> {
  public amount: Coins;
  /**
   * @param depositor depositor's account address
   * @param amount coins to fund the community pool
   */
  constructor(public depositor: AccAddress, amount: Coins.Input) {
    super();
    this.amount = new Coins(amount);
  }

  public static fromAmino(
    data: MsgFundCommunityPoolV1B1.Amino,
    _isClassic?: boolean
  ): MsgFundCommunityPoolV1B1 {
    const {
      value: { depositor, amount },
    } = data;
    return new MsgFundCommunityPoolV1B1(depositor, Coins.fromAmino(amount));
  }

  public toAmino(isClassic?: boolean): MsgFundCommunityPoolV1B1.Amino {
    const { depositor, amount } = this;
    return {
      type: isClassic
        ? 'distribution/MsgFundCommunityPool'
        : 'cosmos-sdk/MsgFundCommunityPool',
      value: {
        depositor,
        amount: amount.toAmino(),
      },
    };
  }

  public static fromData(
    proto: MsgFundCommunityPoolV1B1.Data,
    _isClassic?: boolean
  ): MsgFundCommunityPoolV1B1 {
    const { depositor, amount } = proto;
    return new MsgFundCommunityPoolV1B1(depositor, Coins.fromData(amount));
  }

  public toData(_isClassic?: boolean): MsgFundCommunityPoolV1B1.Data {
    const { depositor, amount } = this;
    return {
      '@type': '/cosmos.distribution.v1beta1.MsgFundCommunityPool',
      depositor,
      amount: amount.toData(),
    };
  }

  public static fromProto(
    proto: MsgFundCommunityPoolV1B1.Proto,
    _isClassic?: Boolean
  ): MsgFundCommunityPoolV1B1 {
    return new MsgFundCommunityPoolV1B1(
      proto.depositor,
      Coins.fromProto(proto.amount)
    );
  }

  public toProto(_isClassic?: boolean): MsgFundCommunityPoolV1B1.Proto {
    const { depositor, amount } = this;
    return MsgFundCommunityPoolV1B1_pb.fromPartial({
      amount: amount.toProto(),
      depositor,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.distribution.v1beta1.MsgFundCommunityPool',
      value: MsgFundCommunityPoolV1B1_pb.encode(
        this.toProto(isClassic)
      ).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgFundCommunityPoolV1B1 {
    return MsgFundCommunityPoolV1B1.fromProto(
      MsgFundCommunityPoolV1B1_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgFundCommunityPoolV1B1 {
  export interface Amino {
    type:
      | 'distribution/MsgFundCommunityPool'
      | 'cosmos-sdk/MsgFundCommunityPool';
    value: {
      depositor: AccAddress;
      amount: Coins.Amino;
    };
  }

  export interface Data {
    '@type': '/cosmos.distribution.v1beta1.MsgFundCommunityPool';
    depositor: AccAddress;
    amount: Coins.Data;
  }

  export type Proto = MsgFundCommunityPoolV1B1_pb;
}
