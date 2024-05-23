/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { Coins } from '../../../Coins';
import { AccAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgCreateVestingAccount as MsgCreateVestingAccountV1B1_pb } from '@xpla/xpla.proto/cosmos/vesting/v1beta1/tx';

/**
 * MsgCreateVestingAccount defines a message that enables creating a vesting account.
 */
export class MsgCreateVestingAccountV1B1 extends JSONSerializable<
  MsgCreateVestingAccountV1B1.Amino,
  MsgCreateVestingAccountV1B1.Data,
  MsgCreateVestingAccountV1B1.Proto
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
    amount: Coins.Input,
    public end_time: number,
    public delayed: boolean
  ) {
    super();
    this.amount = new Coins(amount);
  }

  public static fromAmino(
    data: MsgCreateVestingAccountV1B1.Amino,
    _isClassic?: boolean
  ): MsgCreateVestingAccountV1B1 {
    const {
      value: { from_address, to_address, amount, end_time, delayed },
    } = data;
    return new MsgCreateVestingAccountV1B1(
      from_address,
      to_address,
      Coins.fromAmino(amount),
      Number.parseInt(end_time),
      delayed
    );
  }

  public toAmino(isClassic?: boolean): MsgCreateVestingAccountV1B1.Amino {
    const { from_address, to_address, amount, end_time, delayed } = this;
    return {
      type: isClassic
        ? 'vesting/MsgCreateVestingAccount'
        : 'cosmos-sdk/MsgCreateVestingAccount',
      value: {
        from_address,
        to_address,
        amount: amount.toAmino(),
        end_time: end_time.toFixed(),
        delayed,
      },
    };
  }

  public static fromData(
    data: MsgCreateVestingAccountV1B1.Data,
    _isClassic?: boolean
  ): MsgCreateVestingAccountV1B1 {
    const { from_address, to_address, amount, end_time, delayed } = data;

    return new MsgCreateVestingAccountV1B1(
      from_address,
      to_address,
      Coins.fromData(amount),
      Number.parseInt(end_time),
      delayed
    );
  }

  public toData(_isClassic?: boolean): MsgCreateVestingAccountV1B1.Data {
    const { from_address, to_address, amount, end_time, delayed } = this;
    return {
      '@type': '/cosmos.vesting.v1beta1.MsgCreateVestingAccount',
      from_address,
      to_address,
      amount: amount.toData(),
      end_time: end_time.toFixed(),
      delayed,
    };
  }

  public static fromProto(
    proto: MsgCreateVestingAccountV1B1.Proto,
    _isClassic?: boolean
  ): MsgCreateVestingAccountV1B1 {
    return new MsgCreateVestingAccountV1B1(
      proto.fromAddress,
      proto.toAddress,
      Coins.fromProto(proto.amount),
      proto.endTime.toNumber(),
      proto.delayed
    );
  }

  public toProto(_isClassic?: boolean): MsgCreateVestingAccountV1B1.Proto {
    const { from_address, to_address, amount, end_time, delayed } = this;
    return MsgCreateVestingAccountV1B1_pb.fromPartial({
      fromAddress: from_address,
      toAddress: to_address,
      amount: amount.toProto(),
      endTime: end_time,
      delayed,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.vesting.v1beta1.MsgCreateVestingAccount',
      value: MsgCreateVestingAccountV1B1_pb.encode(
        this.toProto(isClassic)
      ).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgCreateVestingAccountV1B1 {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    return MsgCreateVestingAccountV1B1.fromProto(
      MsgCreateVestingAccountV1B1_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgCreateVestingAccountV1B1 {
  export interface Amino {
    type:
      | 'vesting/MsgCreateVestingAccount'
      | 'cosmos-sdk/MsgCreateVestingAccount';
    value: {
      from_address: AccAddress;
      to_address: AccAddress;
      amount: Coins.Amino;
      end_time: string;
      delayed: boolean;
    };
  }

  export interface Data {
    '@type': '/cosmos.vesting.v1beta1.MsgCreateVestingAccount';
    from_address: AccAddress;
    to_address: AccAddress;
    amount: Coins.Data;
    end_time: string;
    delayed: boolean;
  }

  export type Proto = MsgCreateVestingAccountV1B1_pb;
}
