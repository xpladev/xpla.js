/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgConvertERC20 as MsgConvertERC20V1_pb } from '@xpla/xpla.proto/cosmos/evm/erc20/v1/tx';

/**
 * erc20 MsgConvertERC20
 */
export class MsgConvertERC20V1 extends JSONSerializable<
  MsgConvertERC20V1.Amino,
  MsgConvertERC20V1.Data,
  MsgConvertERC20V1.Proto
> {
  /**
   * @param contract_address ERC20 token contract address registered in a token pair
   * @param amount amount of ERC20 tokens to convert
   * @param receiver bech32 address to receive native Cosmos coins
   * @param sender sender hex address from the owner of the given ERC20 tokens
   */
  constructor(
    public contract_address: string,
    public amount: string,
    public receiver: AccAddress,
    public sender: string
  ) {
    super();
  }

  public static fromAmino(
    amino: MsgConvertERC20V1.Amino,
    _isClassic?: boolean
  ): MsgConvertERC20V1 {
    const {
      value: { contract_address, amount, receiver, sender },
    } = amino;
    return new MsgConvertERC20V1(contract_address, amount, receiver, sender);
  }

  public toAmino(_isClassic?: boolean): MsgConvertERC20V1.Amino {
    const { contract_address, amount, receiver, sender } = this;
    return {
      type: 'evm/MsgConvertERC20',
      value: {
        contract_address,
        amount,
        receiver,
        sender,
      },
    };
  }

  public static fromData(
    obj: MsgConvertERC20V1.Data,
    _isClassic?: boolean
  ): MsgConvertERC20V1 {
    const { contract_address, amount, receiver, sender } = obj;
    return new MsgConvertERC20V1(contract_address, amount, receiver, sender);
  }

  public toData(_isClassic?: boolean): MsgConvertERC20V1.Data {
    const { contract_address, amount, receiver, sender } = this;
    return {
      '@type': '/cosmos.evm.erc20.v1.MsgConvertERC20',
      contract_address,
      amount,
      receiver,
      sender,
    };
  }

  public static fromProto(
    proto: MsgConvertERC20V1.Proto,
    _isClassic?: boolean
  ): MsgConvertERC20V1 {
    return new MsgConvertERC20V1(
      proto.contractAddress,
      proto.amount,
      proto.receiver,
      proto.sender
    );
  }

  public toProto(_isClassic?: boolean): MsgConvertERC20V1.Proto {
    const { contract_address, amount, receiver, sender } = this;
    return MsgConvertERC20V1_pb.fromPartial({
      contractAddress: contract_address,
      amount,
      receiver,
      sender,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.evm.erc20.v1.MsgConvertERC20',
      value: MsgConvertERC20V1_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(msgAny: Any, isClassic?: boolean): MsgConvertERC20V1 {
    return MsgConvertERC20V1.fromProto(
      MsgConvertERC20V1_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgConvertERC20V1 {
  export interface Amino {
    type: 'ethermint/MsgConvertERC20' | 'evmos/MsgConvertERC20' | 'evm/MsgConvertERC20';
    value: {
      contract_address: AccAddress;
      amount: string;
      receiver: AccAddress;
      sender: AccAddress;
    };
  }

  export interface Data {
    '@type':
      | '/ethermint.erc20.v1.MsgConvertERC20'
      | '/evmos.erc20.v1.MsgConvertERC20'
      | '/cosmos.evm.erc20.v1.MsgConvertERC20';
    contract_address: AccAddress;
    amount: string;
    receiver: AccAddress;
    sender: AccAddress;
  }

  export type Proto = MsgConvertERC20V1_pb;
}
