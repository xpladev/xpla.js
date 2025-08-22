/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable, removeNull } from '../../../../util/json';
import { Convert } from '../../../../util/convert';
import { AccAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgSudoContract as MsgSudoContractV1_pb } from '@xpla/xpla.proto/cosmwasm/wasm/v1/tx';

export class MsgSudoContractV1 extends JSONSerializable<
  MsgSudoContractV1.Amino,
  MsgSudoContractV1.Data,
  MsgSudoContractV1.Proto
> {
  /**
   * @param sender is the that actor that signed the messages
   * @param code_id references the stored WASM code
   * @param new_instantiate_permission is the new access control
   */
  constructor(
    public authority: AccAddress,
    public contract: AccAddress,
    public msg: object | string
  ) {
    super();
  }

  public static fromAmino(
    data: MsgSudoContractV1.Amino,
    _isClassic?: boolean
  ): MsgSudoContractV1 {
    const {
      value: { authority, contract, msg },
    } = data;
    return new MsgSudoContractV1(authority, contract, msg);
  }

  public toAmino(_isClassic?: boolean): MsgSudoContractV1.Amino {
    const { authority, contract, msg } = this;
    return {
      type: 'wasm/MsgSudoContract',
      value: {
        authority,
        contract,
        msg: removeNull(msg),
      },
    };
  }

  public static fromProto(
    proto: MsgSudoContractV1.Proto,
    _isClassic?: boolean
  ): MsgSudoContractV1 {
    return new MsgSudoContractV1(
      proto.authority,
      proto.contract,
      JSON.parse(Convert.toUTF8(proto.msg))
    );
  }

  public toProto(_isClassic?: boolean): MsgSudoContractV1.Proto {
    const { authority, contract, msg } = this;
    return MsgSudoContractV1_pb.fromPartial({
      authority,
      contract,
      msg: Convert.fromUTF8(JSON.stringify(removeNull(msg))),
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmwasm.wasm.v1.MsgSudoContract',
      value: MsgSudoContractV1_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(msgAny: Any, isClassic?: boolean): MsgSudoContractV1 {
    return MsgSudoContractV1.fromProto(
      MsgSudoContractV1_pb.decode(msgAny.value),
      isClassic
    );
  }

  public static fromData(
    data: MsgSudoContractV1.Data,
    _isClassic?: boolean
  ): MsgSudoContractV1 {
    const { authority, contract, msg } = data;
    return new MsgSudoContractV1(authority, contract, msg);
  }

  public toData(_isClassic?: boolean): MsgSudoContractV1.Data {
    const { authority, contract, msg } = this;
    return {
      '@type': '/cosmwasm.wasm.v1.MsgSudoContract',
      authority,
      contract,
      msg,
    };
  }
}

export namespace MsgSudoContractV1 {
  export interface Amino {
    type: 'wasm/MsgSudoContract';
    value: {
      authority: AccAddress;
      contract: AccAddress;
      msg: object | string;
    };
  }

  export interface Data {
    '@type': '/cosmwasm.wasm.v1.MsgSudoContract';
    authority: AccAddress;
    contract: AccAddress;
    msg: object | string;
  }

  export type Proto = MsgSudoContractV1_pb;
}
