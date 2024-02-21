/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgStoreCode as MsgStoreCode_pb } from '@xpla/xpla.proto/cosmwasm/wasm/v1/tx';
import { AccessConfig } from '../AccessConfig';

export class MsgStoreCode extends JSONSerializable<
  MsgStoreCode.Amino,
  MsgStoreCode.Data,
  MsgStoreCode.Proto
> {
  /**
   * @param sender code creator
   * @param wasm_byte_code base64-encoded bytecode contents
   * @param instantiate_permission  InstantiatePermission access control to apply on contract creation, optional. v2 supported only
   */
  constructor(
    public sender: AccAddress,
    public wasm_byte_code: string,
    public instantiate_permission?: AccessConfig
  ) {
    super();
  }

  public static fromAmino(
    data: MsgStoreCode.Amino,
    _isClassic?: boolean
  ): MsgStoreCode {
    const {
      value: { sender, wasm_byte_code, instantiate_permission },
    } = data;
    return new MsgStoreCode(
      sender,
      wasm_byte_code,
      instantiate_permission
        ? AccessConfig.fromAmino(instantiate_permission)
        : undefined
    );
  }

  public toAmino(_isClassic?: boolean): MsgStoreCode.Amino {
    const { sender, wasm_byte_code, instantiate_permission } = this;
    return {
      type: 'wasm/MsgStoreCode',
      value: {
        sender,
        wasm_byte_code,
        instantiate_permission: instantiate_permission?.toAmino(),
      },
    };
  }

  public static fromProto(
    proto: MsgStoreCode.Proto,
    _isClassic?: boolean
  ): MsgStoreCode {
    return new MsgStoreCode(
      proto.sender,
      Buffer.from(proto.wasmByteCode).toString('base64'),
      proto.instantiatePermission
        ? AccessConfig.fromProto(proto.instantiatePermission)
        : undefined
    );
  }

  public toProto(_isClassic?: boolean): MsgStoreCode.Proto {
    const { sender, wasm_byte_code, instantiate_permission } = this;
    return MsgStoreCode_pb.fromPartial({
      sender,
      wasmByteCode: Buffer.from(wasm_byte_code, 'base64'),
      instantiatePermission: instantiate_permission?.toProto(),
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmwasm.wasm.v1.MsgStoreCode',
      value: MsgStoreCode_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(msgAny: Any, isClassic?: boolean): MsgStoreCode {
    return MsgStoreCode.fromProto(
      MsgStoreCode_pb.decode(msgAny.value),
      isClassic
    );
  }

  public static fromData(
    data: MsgStoreCode.Data,
    _isClassic?: boolean
  ): MsgStoreCode {
    const { sender, wasm_byte_code, instantiate_permission } = data;
    return new MsgStoreCode(
      sender,
      wasm_byte_code,
      instantiate_permission
        ? AccessConfig.fromData(instantiate_permission)
        : undefined
    );
  }

  public toData(_isClassic?: boolean): MsgStoreCode.Data {
    const { sender, wasm_byte_code, instantiate_permission } = this;
    return {
      '@type': '/cosmwasm.wasm.v1.MsgStoreCode',
      sender,
      wasm_byte_code,
      instantiate_permission: instantiate_permission?.toData(),
    };
  }
}

export namespace MsgStoreCode {
  export interface Amino {
    type: 'wasm/MsgStoreCode';
    value: {
      sender: AccAddress;
      wasm_byte_code: string;
      instantiate_permission?: AccessConfig.Amino;
    };
  }

  export interface Data {
    '@type': '/cosmwasm.wasm.v1.MsgStoreCode';
    sender: AccAddress;
    wasm_byte_code: string;
    instantiate_permission?: AccessConfig.Data;
  }

  export type Proto = MsgStoreCode_pb;
}
