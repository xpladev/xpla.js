/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable, removeNull } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Coins } from '../../../Coins';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgExecuteContract as MsgExecuteContractV1_pb } from '@xpla/xpla.proto/cosmwasm/wasm/v1/tx';

export class MsgExecuteContractV1 extends JSONSerializable<
  MsgExecuteContractV1.Amino,
  MsgExecuteContractV1.Data,
  MsgExecuteContractV1.Proto
> {
  public coins: Coins;

  /**
   * @param sender contract user
   * @param contract contract address
   * @param execute_msg HandleMsg to pass as arguments for contract invocation
   * @param coins coins to be sent to contract
   */
  constructor(
    public sender: AccAddress,
    public contract: AccAddress,
    public execute_msg: object | string,
    coins: Coins.Input = {}
  ) {
    super();
    this.coins = new Coins(coins);
  }

  public static fromAmino(
    data: MsgExecuteContractV1.Amino,
    _isClassic?: boolean
  ): MsgExecuteContractV1 {
    const {
      value: { sender, contract, msg, funds },
    } = data;
    return new MsgExecuteContractV1(
      sender,
      contract,
      msg,
      Coins.fromAmino(funds)
    );
  }

  public toAmino(_isClassic?: boolean): MsgExecuteContractV1.Amino {
    const { sender, contract, execute_msg, coins } = this;
    return {
      type: 'wasm/MsgExecuteContract',
      value: {
        sender,
        contract,
        msg: removeNull(execute_msg),
        funds: coins.toAmino(),
      },
    };
  }

  public static fromProto(
    proto: MsgExecuteContractV1.Proto,
    _isClassic?: boolean
  ): MsgExecuteContractV1 {
    return new MsgExecuteContractV1(
      proto.sender,
      proto.contract,
      JSON.parse(Buffer.from(proto.msg).toString('utf-8')),
      Coins.fromProto(proto.funds)
    );
  }

  public toProto(_isClassic?: boolean): MsgExecuteContractV1.Proto {
    const { sender, contract, execute_msg, coins } = this;
    return MsgExecuteContractV1_pb.fromPartial({
      funds: coins.toProto(),
      contract,
      sender,
      msg: Buffer.from(JSON.stringify(removeNull(execute_msg)), 'utf-8'),
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmwasm.wasm.v1.MsgExecuteContract',
      value: MsgExecuteContractV1_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgExecuteContractV1 {
    return MsgExecuteContractV1.fromProto(
      MsgExecuteContractV1_pb.decode(msgAny.value),
      isClassic
    );
  }

  public static fromData(
    data: MsgExecuteContractV1.Data,
    _isClassic?: boolean
  ): MsgExecuteContractV1 {
    const { sender, contract, msg, funds } = data;
    return new MsgExecuteContractV1(
      sender,
      contract,
      msg,
      Coins.fromData(funds)
    );
  }

  public toData(_isClassic?: boolean): MsgExecuteContractV1.Data {
    const { sender, contract, execute_msg, coins } = this;
    return {
      '@type': '/cosmwasm.wasm.v1.MsgExecuteContract',
      sender,
      contract,
      msg: execute_msg,
      funds: coins.toData(),
    };
  }
}

export namespace MsgExecuteContractV1 {
  export interface Amino {
    type: 'wasm/MsgExecuteContract';
    value: {
      sender: AccAddress;
      contract: AccAddress;
      msg: object | string;
      funds: Coins.Amino;
    };
  }

  export interface Data {
    '@type': '/cosmwasm.wasm.v1.MsgExecuteContract';
    sender: AccAddress;
    contract: AccAddress;
    msg: object | string;
    funds: Coins.Data;
  }

  export type Proto = MsgExecuteContractV1_pb;
}
