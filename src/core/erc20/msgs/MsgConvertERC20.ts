/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgConvertERC20 as MsgConvertERC20_pb } from '@xpla/xpla.proto/evmos/erc20/v1/tx';

/**
 * erc20 MsgConvertERC20
 */
export class MsgConvertERC20 extends JSONSerializable<
  MsgConvertERC20.Amino,
  MsgConvertERC20.Data,
  MsgConvertERC20.Proto
> {
  /**
   * @param contractAddress ERC20 token contract address registered in a token pair
   * @param amount amount of ERC20 tokens to convert
   * @param receiver bech32 address to receive native Cosmos coins
   * @param sender sender hex address from the owner of the given ERC20 tokens
   */
  constructor(
    public contractAddress: string,
    public amount: string,
    public receiver: AccAddress,
    public sender: string
  ) {
    super();
  }

  public static fromAmino(
    amino: MsgConvertERC20.Amino,
    _isClassic?: boolean
  ): MsgConvertERC20 {
    const {
      value: { contractAddress, amount, receiver, sender },
    } = amino;
    return new MsgConvertERC20(contractAddress, amount, receiver, sender);
  }

  public toAmino(_isClassic?: boolean): MsgConvertERC20.Amino {
    const { contractAddress, amount, receiver, sender } = this;
    return {
      type: 'erc20/MsgConvertERC20',
      value: {
        contractAddress,
        amount,
        receiver,
        sender,
      },
    };
  }

  public static fromData(
    obj: MsgConvertERC20.Data,
    _isClassic?: boolean
  ): MsgConvertERC20 {
    const { contractAddress, amount, receiver, sender } = obj;
    return new MsgConvertERC20(contractAddress, amount, receiver, sender);
  }

  public toData(_isClassic?: boolean): MsgConvertERC20.Data {
    const { contractAddress, amount, receiver, sender } = this;
    return {
      '@type': '/evmos.erc20.v1.MsgConvertERC20',
      contractAddress,
      amount,
      receiver,
      sender,
    };
  }

  public static fromProto(
    proto: MsgConvertERC20.Proto,
    _isClassic?: boolean
  ): MsgConvertERC20 {
    return new MsgConvertERC20(
      proto.contractAddress,
      proto.amount,
      proto.receiver,
      proto.sender
    );
  }

  public toProto(_isClassic?: boolean): MsgConvertERC20.Proto {
    const { contractAddress, amount, receiver, sender } = this;
    return MsgConvertERC20_pb.fromPartial({
      contractAddress,
      amount,
      receiver,
      sender,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/evmos.erc20.v1.MsgConvertERC20',
      value: MsgConvertERC20_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(msgAny: Any, isClassic?: boolean): MsgConvertERC20 {
    return MsgConvertERC20.fromProto(
      MsgConvertERC20_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgConvertERC20 {
  export interface Amino {
    type: 'erc20/MsgConvertERC20';
    value: {
      contractAddress: string;
      amount: string;
      receiver: AccAddress;
      sender: string;
    };
  }

  export interface Data {
    '@type': '/evmos.erc20.v1.MsgConvertERC20';
    contractAddress: string;
    amount: string;
    receiver: AccAddress;
    sender: string;
  }

  export type Proto = MsgConvertERC20_pb;
}
