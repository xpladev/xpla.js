import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { CodesParamsV1 } from '../Params';
import { AccessConfig, AccessType } from '../AccessConfig';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import {
  Params,
  accessTypeToJSON,
} from '@xpla/xpla.proto/cosmwasm/wasm/v1/types';
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
    const value = data.value;
    const params =
      'params' in value
        ? CodesParamsV1.fromAmino(value.params)
        : new CodesParamsV1(
            value.codeUploadAccess instanceof AccessConfig
              ? value.codeUploadAccess
              : value.codeUploadAccess
                ? AccessConfig.fromAmino(value.codeUploadAccess)
                : undefined,
            value.instantiateDefaultPermission
          );
    return new MsgUpdateWasmParamsV1(
      value.authority,
      params.code_upload_access,
      params.instantiate_default_permission
    );
  }

  public toAmino(_isClassic?: boolean): MsgUpdateWasmParamsV1.Amino {
    const { authority, codeUploadAccess, instantiateDefaultPermission } = this;
    return {
      type: 'wasm/MsgUpdateParams',
      value: {
        authority,
        params: new CodesParamsV1(
          codeUploadAccess,
          instantiateDefaultPermission
        ).toAmino(),
      },
    };
  }

  public static fromData(
    data: MsgUpdateWasmParamsV1.Data,
    _isClassic?: boolean
  ): MsgUpdateWasmParamsV1 {
    const value = data;
    const params =
      'params' in value
        ? CodesParamsV1.fromData({
            ...value.params,
            '@type': '/cosmwasm.wasm.v1.Params',
          })
        : new CodesParamsV1(
            value.codeUploadAccess instanceof AccessConfig
              ? value.codeUploadAccess
              : value.codeUploadAccess
                ? AccessConfig.fromData(value.codeUploadAccess)
                : undefined,
            value.instantiateDefaultPermission
          );
    return new MsgUpdateWasmParamsV1(
      value.authority,
      params.code_upload_access,
      params.instantiate_default_permission
    );
  }

  public toData(_isClassic?: boolean): MsgUpdateWasmParamsV1.Data {
    const { authority, codeUploadAccess, instantiateDefaultPermission } = this;
    return {
      '@type': '/cosmwasm.wasm.v1.MsgUpdateParams',
      authority,
      params: {
        code_upload_access: codeUploadAccess?.toData(),
        instantiate_default_permission: accessTypeToJSON(
          instantiateDefaultPermission
        ),
      },
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
  /** Input compatibility for SDK versions that flattened Params. */
  export interface LegacyParams {
    codeUploadAccess: AccessConfig | AccessConfig.Data | undefined;
    instantiateDefaultPermission: AccessType;
  }
  export interface Amino {
    type: 'wasm/MsgUpdateParams';
    value: { authority: AccAddress } & (
      { params: CodesParamsV1.Amino } | LegacyParams
    );
  }
  export type Data = {
    '@type': '/cosmwasm.wasm.v1.MsgUpdateParams';
    authority: AccAddress;
  } & ({ params: Omit<CodesParamsV1.Data, '@type'> } | LegacyParams);
  export type Proto = MsgUpdateWasmParamsV1_pb;
}
