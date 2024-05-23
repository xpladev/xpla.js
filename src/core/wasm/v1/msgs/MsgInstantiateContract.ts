/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable, removeNull } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Coins } from '../../../Coins';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgInstantiateContract as MsgInstantiateContractV1_pb } from '@xpla/xpla.proto/cosmwasm/wasm/v1/tx';

export class MsgInstantiateContractV1 extends JSONSerializable<
  MsgInstantiateContractV1.Amino,
  MsgInstantiateContractV1.Data,
  MsgInstantiateContractV1.Proto
> {
  public init_coins: Coins;

  /**
   * @param sender is a sender address
   * @param admin is an optional contract admin address who can migrate the contract, put empty string to disable migration
   * @param code_id is the reference to the stored WASM code
   * @param init_msg json encoded message to be passed to the contract on instantiation
   * @param init_coins are transferred to the contract on execution
   * @param label label for the contract. v2 supported only
   */
  constructor(
    public sender: AccAddress,
    public admin: AccAddress | undefined,
    public code_id: number,
    public init_msg: object | string,
    init_coins: Coins.Input = {},
    public label?: string
  ) {
    super();
    this.init_coins = new Coins(init_coins);
  }

  public static fromAmino(
    data: MsgInstantiateContractV1.Amino,
    _isClassic?: boolean
  ): MsgInstantiateContractV1 {
    const {
      value: { sender, admin, code_id, msg, funds, label },
    } = data;
    return new MsgInstantiateContractV1(
      sender,
      admin,
      Number.parseInt(code_id),
      msg,
      Coins.fromAmino(funds),
      label
    );
  }

  public toAmino(_isClassic?: boolean): MsgInstantiateContractV1.Amino {
    const { sender, admin, code_id, init_msg, init_coins, label } = this;
    return {
      type: 'wasm/MsgInstantiateContract',
      value: {
        sender,
        admin,
        code_id: code_id.toFixed(),
        label,
        msg: removeNull(init_msg),
        funds: init_coins.toAmino(),
      },
    };
  }

  public static fromProto(
    proto: MsgInstantiateContractV1.Proto,
    _isClassic?: boolean
  ): MsgInstantiateContractV1 {
    return new MsgInstantiateContractV1(
      proto.sender,
      proto.admin !== '' ? proto.admin : undefined,
      proto.codeId.toNumber(),
      JSON.parse(Buffer.from(proto.msg).toString('utf-8')),
      Coins.fromProto(proto.funds),
      proto.label !== '' ? proto.label : undefined
    );
  }

  public toProto(_isClassic?: boolean): MsgInstantiateContractV1.Proto {
    const { sender, admin, code_id, init_msg, init_coins, label } = this;
    return MsgInstantiateContractV1_pb.fromPartial({
      admin,
      codeId: code_id,
      funds: init_coins.toProto(),
      msg: Buffer.from(JSON.stringify(init_msg), 'utf-8'),
      sender,
      label,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmwasm.wasm.v1.MsgInstantiateContract',
      value: MsgInstantiateContractV1_pb.encode(
        this.toProto(isClassic)
      ).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgInstantiateContractV1 {
    return MsgInstantiateContractV1.fromProto(
      MsgInstantiateContractV1_pb.decode(msgAny.value),
      isClassic
    );
  }

  public static fromData(
    data: MsgInstantiateContractV1.Data,
    _isClassic?: boolean
  ): MsgInstantiateContractV1 {
    const { sender, admin, code_id, label, msg, funds } = data;
    return new MsgInstantiateContractV1(
      sender,
      admin !== '' ? admin : undefined,
      Number.parseInt(code_id),
      msg,
      Coins.fromData(funds),
      label
    );
  }

  public toData(_isClassic?: boolean): MsgInstantiateContractV1.Data {
    const { sender, admin, code_id, label, init_msg, init_coins } = this;
    return {
      '@type': '/cosmwasm.wasm.v1.MsgInstantiateContract',
      sender,
      admin: admin || '',
      code_id: code_id.toFixed(),
      label,
      msg: removeNull(init_msg),
      funds: init_coins.toData(),
    };
  }
}

export namespace MsgInstantiateContractV1 {
  export interface Amino {
    type: 'wasm/MsgInstantiateContract';
    value: {
      sender: AccAddress;
      admin?: AccAddress;
      code_id: string;
      label?: string;
      msg: object | string;
      funds: Coins.Amino;
    };
  }

  export interface Data {
    '@type': '/cosmwasm.wasm.v1.MsgInstantiateContract';
    sender: AccAddress;
    admin: AccAddress;
    code_id: string;
    label?: string;
    msg: object | string;
    funds: Coins.Data;
  }

  export type Proto = MsgInstantiateContractV1_pb;
}
