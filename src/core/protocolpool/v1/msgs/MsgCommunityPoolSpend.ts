import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Coins } from '../../../Coins';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgCommunityPoolSpend as MsgCommunityPoolSpendV1_pb } from '@xpla/xpla.proto/cosmos/protocolpool/v1/tx';

/**
 * MsgCommunityPoolSpend defines a message for sending tokens from the community
 * pool to another account. This message is typically executed via a governance
 * proposal with the governance module being the executing authority.
 */
export class MsgCommunityPoolSpendV1 extends JSONSerializable<
  MsgCommunityPoolSpendV1.Amino,
  MsgCommunityPoolSpendV1.Data,
  MsgCommunityPoolSpendV1.Proto
> {
  public amount: Coins;
  /**
   * @param authority is the address that controls the module (defaults to x/gov unless overwritten).
   * @param recipient
   * @param amount
   */
  constructor(
    public authority: AccAddress,
    public recipient: AccAddress,
    amount: Coins.Input,
  ) {
    super();
    this.amount = new Coins(amount);
  }

  public static fromAmino(
    data: MsgCommunityPoolSpendV1.Amino,
  ): MsgCommunityPoolSpendV1 {
    const {
      authority,
      recipient,
      amount,
    } = data;
    return new MsgCommunityPoolSpendV1(
      authority,
      recipient,
      Coins.fromAmino(amount),
    );
  }

  public toAmino(): MsgCommunityPoolSpendV1.Amino {
    const {
      authority,
      recipient,
      amount,
    } = this;
    return {
      type: 'protocolpool/MsgCommunityPoolSpend',
      authority,
      recipient,
      amount: amount.toAmino(),
    };
  }

  public static fromData(
    proto: MsgCommunityPoolSpendV1.Data,
  ): MsgCommunityPoolSpendV1 {
    const {
      authority,
      recipient,
      amount,
    } = proto;
    return new MsgCommunityPoolSpendV1(
      authority,
      recipient,
      Coins.fromData(amount),
    );
  }

  public toData(): MsgCommunityPoolSpendV1.Data {
    const {
      authority,
      recipient,
      amount,
    } = this;
    return {
      '@type': '/cosmos.protocolpool.v1.MsgCommunityPoolSpend',
      authority,
      recipient,
      amount: amount.toData(),
    };
  }

  public static fromProto(
    proto: MsgCommunityPoolSpendV1.Proto,
  ): MsgCommunityPoolSpendV1 {
    return new MsgCommunityPoolSpendV1(
      proto.authority,
      proto.recipient,
      Coins.fromProto(proto.amount),
    );
  }

  public toProto(): MsgCommunityPoolSpendV1.Proto {
    const {
      authority,
      recipient,
      amount,
    } = this;
    return MsgCommunityPoolSpendV1_pb.fromPartial({
      authority,
      recipient,
      amount: amount.toProto(),
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.protocolpool.v1.MsgCommunityPoolSpend',
      value: MsgCommunityPoolSpendV1_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any): MsgCommunityPoolSpendV1 {
    return MsgCommunityPoolSpendV1.fromProto(
      MsgCommunityPoolSpendV1_pb.decode(msgAny.value),
    );
  }
}

export namespace MsgCommunityPoolSpendV1 {
  export interface Amino {
    type: 'protocolpool/MsgCommunityPoolSpend';
    authority: AccAddress;
    recipient: AccAddress;
    amount: Coins.Amino;
  }

  export interface Data {
    '@type': '/cosmos.protocolpool.v1.MsgCommunityPoolSpend';
    authority: AccAddress;
    recipient: AccAddress;
    amount: Coins.Data;
  }

  export type Proto = MsgCommunityPoolSpendV1_pb;
}
