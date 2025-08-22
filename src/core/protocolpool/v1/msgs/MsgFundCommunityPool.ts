import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Coins } from '../../../Coins';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgFundCommunityPool as MsgFundCommunityPoolV1_pb } from '@xpla/xpla.proto/cosmos/protocolpool/v1/tx';

/**
 * MsgFundCommunityPool allows an account to directly
 * fund the community pool.
 */
export class MsgFundCommunityPoolV1 extends JSONSerializable<
  MsgFundCommunityPoolV1.Amino,
  MsgFundCommunityPoolV1.Data,
  MsgFundCommunityPoolV1.Proto
> {
  public amount: Coins;
  /**
   * @param depositor
   * @param amount
   */
  constructor(
    public depositor: AccAddress,
    amount: Coins.Input,
  ) {
    super();
    this.amount = new Coins(amount);
  }

  public static fromAmino(
    data: MsgFundCommunityPoolV1.Amino,
  ): MsgFundCommunityPoolV1 {
    const {
      depositor,
      amount,
    } = data;
    return new MsgFundCommunityPoolV1(
      depositor,
      Coins.fromAmino(amount),
    );
  }

  public toAmino(): MsgFundCommunityPoolV1.Amino {
    const {
      depositor,
      amount,
    } = this;
    return {
      type: 'protocolpool/MsgFundCommunityPool',
      depositor,
      amount: amount.toAmino(),
    };
  }

  public static fromData(
    proto: MsgFundCommunityPoolV1.Data,
  ): MsgFundCommunityPoolV1 {
    const {
      depositor,
      amount,
    } = proto;
    return new MsgFundCommunityPoolV1(
      depositor,
      Coins.fromData(amount),
    );
  }

  public toData(): MsgFundCommunityPoolV1.Data {
    const {
      depositor,
      amount,
    } = this;
    return {
      '@type': '/cosmos.protocolpool.v1.MsgFundCommunityPool',
      depositor,
      amount: amount.toData(),
    };
  }

  public static fromProto(
    proto: MsgFundCommunityPoolV1.Proto,
  ): MsgFundCommunityPoolV1 {
    return new MsgFundCommunityPoolV1(
      proto.depositor,
      Coins.fromProto(proto.amount),
    );
  }

  public toProto(): MsgFundCommunityPoolV1.Proto {
    const {
      depositor,
      amount,
    } = this;
    return MsgFundCommunityPoolV1_pb.fromPartial({
      depositor,
      amount: amount.toProto(),
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.protocolpool.v1.MsgFundCommunityPool',
      value: MsgFundCommunityPoolV1_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any): MsgFundCommunityPoolV1 {
    return MsgFundCommunityPoolV1.fromProto(
      MsgFundCommunityPoolV1_pb.decode(msgAny.value),
    );
  }
}

export namespace MsgFundCommunityPoolV1 {
  export interface Amino {
    type: 'protocolpool/MsgFundCommunityPool';
    depositor: AccAddress;
    amount: Coins.Amino;
  }

  export interface Data {
    '@type': '/cosmos.protocolpool.v1.MsgFundCommunityPool';
    depositor: AccAddress;
    amount: Coins.Data;
  }

  export type Proto = MsgFundCommunityPoolV1_pb;
}
