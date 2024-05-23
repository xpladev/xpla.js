import { JSONSerializable } from '../../../../util/json';
import { Coins } from '../../../Coins';
import { AccAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgCreatePermanentLockedAccount as MsgCreatePermanentLockedAccountV1B1_pb } from '@xpla/xpla.proto/cosmos/vesting/v1beta1/tx';

export class MsgCreatePermanentLockedAccountV1B1 extends JSONSerializable<
  MsgCreatePermanentLockedAccountV1B1.Amino,
  MsgCreatePermanentLockedAccountV1B1.Data,
  MsgCreatePermanentLockedAccountV1B1.Proto
> {
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
    data: MsgCreatePermanentLockedAccountV1B1.Amino,
    isClassic?: boolean
  ): MsgCreatePermanentLockedAccountV1B1 {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const {
      value: { from_address, to_address, amount },
    } = data;
    return new MsgCreatePermanentLockedAccountV1B1(
      from_address,
      to_address,
      Coins.fromAmino(amount)
    );
  }

  public toAmino(
    isClassic?: boolean
  ): MsgCreatePermanentLockedAccountV1B1.Amino {
    const { from_address, to_address, amount } = this;
    return {
      type: isClassic
        ? 'vesting/MsgCreatePermanentLockedAccount'
        : 'cosmos-sdk/MsgCreatePermanentLockedAccount',
      value: {
        from_address,
        to_address,
        amount: amount.toAmino(),
      },
    };
  }

  public static fromData(
    data: MsgCreatePermanentLockedAccountV1B1.Data,
    isClassic?: boolean
  ): MsgCreatePermanentLockedAccountV1B1 {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const { from_address, to_address, amount } = data;

    return new MsgCreatePermanentLockedAccountV1B1(
      from_address,
      to_address,
      Coins.fromData(amount)
    );
  }

  public toData(isClassic?: boolean): MsgCreatePermanentLockedAccountV1B1.Data {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const { from_address, to_address, amount } = this;
    return {
      '@type': '/cosmos.vesting.v1beta1.MsgCreatePermanentLockedAccount',
      from_address,
      to_address,
      amount: amount.toData(),
    };
  }

  public static fromProto(
    proto: MsgCreatePermanentLockedAccountV1B1.Proto,
    isClassic?: boolean
  ): MsgCreatePermanentLockedAccountV1B1 {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    return new MsgCreatePermanentLockedAccountV1B1(
      proto.fromAddress,
      proto.toAddress,
      Coins.fromProto(proto.amount)
    );
  }

  public toProto(
    isClassic?: boolean
  ): MsgCreatePermanentLockedAccountV1B1.Proto {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const { from_address, to_address, amount } = this;
    return MsgCreatePermanentLockedAccountV1B1_pb.fromPartial({
      fromAddress: from_address,
      toAddress: to_address,
      amount: amount.toProto(),
    });
  }

  public packAny(isClassic?: boolean): Any {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    return Any.fromPartial({
      typeUrl: '/cosmos.vesting.v1beta1.MsgCreatePermanentLockedAccount',
      value: MsgCreatePermanentLockedAccountV1B1_pb.encode(
        this.toProto(isClassic)
      ).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgCreatePermanentLockedAccountV1B1 {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    return MsgCreatePermanentLockedAccountV1B1.fromProto(
      MsgCreatePermanentLockedAccountV1B1_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgCreatePermanentLockedAccountV1B1 {
  export interface Amino {
    type:
      | 'vesting/MsgCreatePermanentLockedAccount'
      | 'cosmos-sdk/MsgCreatePermanentLockedAccount';
    value: {
      from_address: AccAddress;
      to_address: AccAddress;
      amount: Coins.Amino;
    };
  }

  export interface Data {
    '@type': '/cosmos.vesting.v1beta1.MsgCreatePermanentLockedAccount';
    from_address: AccAddress;
    to_address: AccAddress;
    amount: Coins.Data;
  }

  export type Proto = MsgCreatePermanentLockedAccountV1B1_pb;
}
