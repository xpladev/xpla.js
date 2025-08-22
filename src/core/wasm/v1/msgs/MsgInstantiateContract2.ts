/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable, removeNull } from '../../../../util/json';
import { Convert } from '../../../../util/convert';
import { AccAddress } from '../../../bech32';
import { Coins } from '../../../Coins';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgInstantiateContract2 as MsgInstantiateContract2V1_pb } from '@xpla/xpla.proto/cosmwasm/wasm/v1/tx';

export class MsgInstantiateContract2V1 extends JSONSerializable<
  MsgInstantiateContract2V1.Amino,
  MsgInstantiateContract2V1.Data,
  MsgInstantiateContract2V1.Proto
> {
  public funds: Coins;

  /**
   * @param sender is the that actor that signed the messages
   * @param admin is an optional address that can execute migrations
   * @param code_id is the reference to the stored WASM code
   * @param label is metadata to be stored with a contract instance
   * @param msg json encoded message to be passed to the contract on instantiation
   * @param funds coins that are transferred to the contract on instantiation
   * @param salt is an arbitrary value provided by the sender. Size can be 1 to 64
   * @param fix_msg include the msg value into the hash for the predictable address. Default is false
   */
  constructor(
    public sender: AccAddress,
    public admin: AccAddress | undefined,
    public code_id: number,
    public label: string,
    public msg: object | string,
    funds: Coins.Input = {},
    public salt: string,
    public fix_msg: boolean
  ) {
    super();
    this.funds = new Coins(funds);
  }

  public static fromAmino(
    data: MsgInstantiateContract2V1.Amino,
    _isClassic?: boolean
  ): MsgInstantiateContract2V1 {
    const {
      value: { sender, admin, code_id, label, msg, funds, salt, fix_msg },
    } = data;
    return new MsgInstantiateContract2V1(
      sender,
      admin,
      Number.parseInt(code_id),
      label,
      msg,
      Coins.fromAmino(funds),
      salt,
      fix_msg
    );
  }

  public toAmino(_isClassic?: boolean): MsgInstantiateContract2V1.Amino {
    const { sender, admin, code_id, label, msg, funds, salt, fix_msg } = this;
    return {
      type: 'wasm/MsgInstantiateContract2',
      value: {
        sender,
        admin,
        code_id: code_id.toFixed(),
        label,
        msg: removeNull(msg),
        funds: funds.toIntCoins().toAmino(),
        salt: removeNull(salt),
        fix_msg,
      },
    };
  }

  public static fromProto(
    proto: MsgInstantiateContract2V1.Proto,
    _isClassic?: boolean
  ): MsgInstantiateContract2V1 {
    return new MsgInstantiateContract2V1(
      proto.sender,
      proto.admin != null && proto.admin !== '' ? proto.admin : undefined,
      proto.codeId.toNumber(),
      proto.label,
      JSON.parse(Convert.toUTF8(proto.msg)),
      Coins.fromProto(proto.funds),
      Convert.toHex(proto.salt),
      proto.fixMsg
    );
  }

  public toProto(_isClassic?: boolean): MsgInstantiateContract2V1.Proto {
    const { sender, admin, code_id, label, msg, funds, salt, fix_msg } = this;
    return MsgInstantiateContract2V1_pb.fromPartial({
      sender,
      admin,
      codeId: code_id,
      label,
      msg: Convert.fromUTF8(JSON.stringify(msg)),
      funds: funds.toIntCoins().toProto(),
      salt: Convert.fromHex(salt),
      fixMsg: fix_msg,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmwasm.wasm.v1.MsgInstantiateContract2',
      value: MsgInstantiateContract2V1_pb.encode(
        this.toProto(isClassic)
      ).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgInstantiateContract2V1 {
    return MsgInstantiateContract2V1.fromProto(
      MsgInstantiateContract2V1_pb.decode(msgAny.value),
      isClassic
    );
  }

  public static fromData(
    data: MsgInstantiateContract2V1.Data,
    _isClassic?: boolean
  ): MsgInstantiateContract2V1 {
    const { sender, admin, code_id, label, msg, funds, salt, fix_msg } = data;
    return new MsgInstantiateContract2V1(
      sender,
      admin != null && admin !== '' ? admin : undefined,
      Number.parseInt(code_id),
      label,
      msg,
      Coins.fromData(funds),
      salt,
      fix_msg
    );
  }

  public toData(_isClassic?: boolean): MsgInstantiateContract2V1.Data {
    const { sender, admin, code_id, label, msg, funds, salt, fix_msg } = this;
    return {
      '@type': '/cosmwasm.wasm.v1.MsgInstantiateContract2',
      sender,
      admin: admin || '',
      code_id: code_id.toFixed(),
      label,
      msg: removeNull(msg),
      funds: funds.toIntCoins().toData(),
      salt,
      fix_msg,
    };
  }
}

export namespace MsgInstantiateContract2V1 {
  export interface Amino {
    type: 'wasm/MsgInstantiateContract2';
    value: {
      sender: AccAddress;
      admin?: AccAddress;
      code_id: string;
      label: string;
      msg: object | string;
      funds: Coins.Amino;
      salt: string;
      fix_msg: boolean;
    };
  }

  export interface Data {
    '@type': '/cosmwasm.wasm.v1.MsgInstantiateContract2';
    sender: AccAddress;
    admin: AccAddress;
    code_id: string;
    label: string;
    msg: object | string;
    funds: Coins.Data;
    salt: string;
    fix_msg: boolean;
  }

  export type Proto = MsgInstantiateContract2V1_pb;
}
