/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Coins } from '../../Coins';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgFundCommunityPool as MsgFundCommunityPool_pb } from '@xpla/xpla.proto/cosmos/distribution/v1beta1/tx';

export class MsgFundCommunityPool extends JSONSerializable<
  MsgFundCommunityPool.Amino,
  MsgFundCommunityPool.Data,
  MsgFundCommunityPool.Proto
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
    data: MsgFundCommunityPool.Amino,
    _isClassic?: boolean
  ): MsgFundCommunityPool {
    const {
      value: { depositor, amount },
    } = data;
    return new MsgFundCommunityPool(depositor, Coins.fromAmino(amount));
  }

  public toAmino(isClassic?: boolean): MsgFundCommunityPool.Amino {
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
    proto: MsgFundCommunityPool.Data,
    _isClassic?: boolean
  ): MsgFundCommunityPool {
    const { depositor, amount } = proto;
    return new MsgFundCommunityPool(depositor, Coins.fromData(amount));
  }

  public toData(_isClassic?: boolean): MsgFundCommunityPool.Data {
    const { depositor, amount } = this;
    return {
      '@type': '/cosmos.distribution.v1beta1.MsgFundCommunityPool',
      depositor,
      amount: amount.toData(),
    };
  }

  public static fromProto(
    proto: MsgFundCommunityPool.Proto,
    _isClassic?: Boolean
  ): MsgFundCommunityPool {
    return new MsgFundCommunityPool(
      proto.depositor,
      Coins.fromProto(proto.amount)
    );
  }

  public toProto(_isClassic?: boolean): MsgFundCommunityPool.Proto {
    const { depositor, amount } = this;
    return MsgFundCommunityPool_pb.fromPartial({
      amount: amount.toProto(),
      depositor,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.distribution.v1beta1.MsgFundCommunityPool',
      value: MsgFundCommunityPool_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgFundCommunityPool {
    return MsgFundCommunityPool.fromProto(
      MsgFundCommunityPool_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgFundCommunityPool {
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

  export type Proto = MsgFundCommunityPool_pb;
}
