/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { AccessConfig } from '../AccessConfig';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgStoreCode as MsgStoreCodeV1_pb } from '@xpla/xpla.proto/cosmwasm/wasm/v1/tx';

export class MsgStoreCodeV1 extends JSONSerializable<
  MsgStoreCodeV1.Amino,
  MsgStoreCodeV1.Data,
  MsgStoreCodeV1.Proto
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
    data: MsgStoreCodeV1.Amino,
    _isClassic?: boolean
  ): MsgStoreCodeV1 {
    const {
      value: { sender, wasm_byte_code, instantiate_permission },
    } = data;
    return new MsgStoreCodeV1(
      sender,
      wasm_byte_code,
      instantiate_permission
        ? AccessConfig.fromAmino(instantiate_permission)
        : undefined
    );
  }

  public toAmino(_isClassic?: boolean): MsgStoreCodeV1.Amino {
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
    proto: MsgStoreCodeV1.Proto,
    _isClassic?: boolean
  ): MsgStoreCodeV1 {
    return new MsgStoreCodeV1(
      proto.sender,
      Buffer.from(proto.wasmByteCode).toString('base64'),
      proto.instantiatePermission
        ? AccessConfig.fromProto(proto.instantiatePermission)
        : undefined
    );
  }

  public toProto(_isClassic?: boolean): MsgStoreCodeV1.Proto {
    const { sender, wasm_byte_code, instantiate_permission } = this;
    return MsgStoreCodeV1_pb.fromPartial({
      sender,
      wasmByteCode: Buffer.from(wasm_byte_code, 'base64'),
      instantiatePermission: instantiate_permission?.toProto(),
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmwasm.wasm.v1.MsgStoreCode',
      value: MsgStoreCodeV1_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(msgAny: Any, isClassic?: boolean): MsgStoreCodeV1 {
    return MsgStoreCodeV1.fromProto(
      MsgStoreCodeV1_pb.decode(msgAny.value),
      isClassic
    );
  }

  public static fromData(
    data: MsgStoreCodeV1.Data,
    _isClassic?: boolean
  ): MsgStoreCodeV1 {
    const { sender, wasm_byte_code, instantiate_permission } = data;
    return new MsgStoreCodeV1(
      sender,
      wasm_byte_code,
      instantiate_permission
        ? AccessConfig.fromData(instantiate_permission)
        : undefined
    );
  }

  public toData(_isClassic?: boolean): MsgStoreCodeV1.Data {
    const { sender, wasm_byte_code, instantiate_permission } = this;
    return {
      '@type': '/cosmwasm.wasm.v1.MsgStoreCode',
      sender,
      wasm_byte_code,
      instantiate_permission: instantiate_permission?.toData(),
    };
  }
}

export namespace MsgStoreCodeV1 {
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

  export type Proto = MsgStoreCodeV1_pb;
}
