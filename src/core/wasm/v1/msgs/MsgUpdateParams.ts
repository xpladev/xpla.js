/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { AccessConfig, AccessType } from '../AccessConfig';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { Params } from '@xpla/xpla.proto/cosmwasm/wasm/v1/types';
import { MsgUpdateParams as MsgUpdateWasmParamsV1_pb } from '@xpla/xpla.proto/cosmwasm/wasm/v1/tx';

export class MsgUpdateWasmParamsV1 extends JSONSerializable<
  MsgUpdateWasmParamsV1.Amino,
  MsgUpdateWasmParamsV1.Data,
  MsgUpdateWasmParamsV1.Proto
> {
  constructor(
    public authority: AccAddress,
    public codeUploadAccess: AccessConfig | undefined,
    public instantiateDefaultPermission: AccessType
  ) {
    super();
  }

  public static fromAmino(
    data: MsgUpdateWasmParamsV1.Amino,
    _isClassic?: boolean
  ): MsgUpdateWasmParamsV1 {
    const {
      value: { authority, codeUploadAccess, instantiateDefaultPermission },
    } = data;
    return new MsgUpdateWasmParamsV1(
      authority,
      codeUploadAccess,
      instantiateDefaultPermission
    );
  }

  public toAmino(_isClassic?: boolean): MsgUpdateWasmParamsV1.Amino {
    const { authority, codeUploadAccess, instantiateDefaultPermission } = this;
    return {
      type: 'wasm/MsgUpdateParamsV1',
      value: {
        authority,
        codeUploadAccess,
        instantiateDefaultPermission,
      },
    };
  }

  public static fromData(
    data: MsgUpdateWasmParamsV1.Data,
    _isClassic?: boolean
  ): MsgUpdateWasmParamsV1 {
    const { authority, codeUploadAccess, instantiateDefaultPermission } = data;
    return new MsgUpdateWasmParamsV1(
      authority,
      codeUploadAccess,
      instantiateDefaultPermission
    );
  }

  public toData(_isClassic?: boolean): MsgUpdateWasmParamsV1.Data {
    const { authority, codeUploadAccess, instantiateDefaultPermission } = this;
    return {
      '@type': '/cosmwasm.wasm.v1.MsgUpdateParams',
      authority,
      codeUploadAccess,
      instantiateDefaultPermission,
    };
  }

  public static fromProto(
    proto: MsgUpdateWasmParamsV1.Proto,
    _isClassic?: boolean
  ): MsgUpdateWasmParamsV1 {
    return new MsgUpdateWasmParamsV1(
      proto.authority,
      proto.params?.codeUploadAccess
        ? AccessConfig.fromProto(proto.params.codeUploadAccess)
        : undefined,
      proto.params?.instantiateDefaultPermission ??
        AccessType.ACCESS_TYPE_UNSPECIFIED
    );
  }

  public toProto(_isClassic?: boolean): MsgUpdateWasmParamsV1.Proto {
    const { authority, codeUploadAccess, instantiateDefaultPermission } = this;
    return MsgUpdateWasmParamsV1_pb.fromPartial({
      authority,
      params: Params.fromPartial({
        codeUploadAccess: codeUploadAccess?.toProto(),
        instantiateDefaultPermission,
      }),
    });
  }

  public packAny(_isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmwasm.wasm.v1.MsgUpdateParams',
      value: MsgUpdateWasmParamsV1_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    _isClassic?: boolean
  ): MsgUpdateWasmParamsV1 {
    return MsgUpdateWasmParamsV1.fromProto(
      MsgUpdateWasmParamsV1_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgUpdateWasmParamsV1 {
  export interface Amino {
    type: 'wasm/MsgUpdateParamsV1';
    value: {
      authority: AccAddress;
      codeUploadAccess: AccessConfig | undefined;
      instantiateDefaultPermission: AccessType;
    };
  }

  export interface Data {
    '@type': '/cosmwasm.wasm.v1.MsgUpdateParams';
    authority: AccAddress;
    codeUploadAccess: AccessConfig | undefined;
    instantiateDefaultPermission: AccessType;
  }

  export type Proto = MsgUpdateWasmParamsV1_pb;
}
