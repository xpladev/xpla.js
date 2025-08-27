/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../util/json';
import { AccessConfig } from './AccessConfig';
import { AccessType } from './AccessTypeParam';
import {
  accessTypeFromJSON,
  accessTypeToJSON,
  Params as CodesParamsV1_pb,
} from '@xpla/xpla.proto/cosmwasm/wasm/v1/types';

export class CodesParamsV1 extends JSONSerializable<
  CodesParamsV1.Amino,
  CodesParamsV1.Data,
  CodesParamsV1.Proto
> {
  /**
   * @param code_upload_access 
   * @param instantiate_default_permission 
   */
  constructor(
    public code_upload_access: AccessConfig | undefined,
    public instantiate_default_permission: AccessType
  ) {
    super();
  }

  public static fromAmino(
    data: CodesParamsV1.Amino,
    _?: boolean
  ): CodesParamsV1 {
    const { code_upload_access, instantiate_default_permission } = data;
    return new CodesParamsV1(
      code_upload_access
        ? AccessConfig.fromAmino(code_upload_access)
        : undefined,
      accessTypeFromJSON(instantiate_default_permission)
    );
  }

  public toAmino(_?: boolean): CodesParamsV1.Amino {
    const { code_upload_access, instantiate_default_permission } = this;

    const res: CodesParamsV1.Amino = {
      code_upload_access: code_upload_access
        ? code_upload_access.toAmino()
        : undefined,
      instantiate_default_permission: accessTypeToJSON(
        instantiate_default_permission
      ),
    };

    return res;
  }

  public static fromData(data: CodesParamsV1.Data, _?: boolean): CodesParamsV1 {
    const { code_upload_access, instantiate_default_permission } = data;
    return new CodesParamsV1(
      code_upload_access
        ? AccessConfig.fromData(code_upload_access)
        : undefined,
      accessTypeFromJSON(instantiate_default_permission)
    );
  }

  public toData(_?: boolean): CodesParamsV1.Data {
    const { code_upload_access, instantiate_default_permission } = this;

    const res: CodesParamsV1.Data = {
      '@type': '/cosmwasm.wasm.v1.Params',
      code_upload_access: code_upload_access
        ? code_upload_access.toData()
        : undefined,
      instantiate_default_permission: accessTypeToJSON(
        instantiate_default_permission
      ),
    };

    return res;
  }

  public static fromProto(
    proto: CodesParamsV1.Proto,
    _?: boolean
  ): CodesParamsV1 {
    return new CodesParamsV1(
      proto.codeUploadAccess
        ? AccessConfig.fromProto(proto.codeUploadAccess)
        : undefined,
      proto.instantiateDefaultPermission
    );
  }

  public toProto(_?: boolean): CodesParamsV1.Proto {
    const { code_upload_access, instantiate_default_permission } = this;
    return CodesParamsV1_pb.fromPartial({
      codeUploadAccess: code_upload_access
        ? code_upload_access.toProto()
        : undefined,
      instantiateDefaultPermission: instantiate_default_permission,
    });
  }
}

export namespace CodesParamsV1 {
  export interface Amino {
    code_upload_access: AccessConfig.Amino | undefined;
    instantiate_default_permission: string | undefined;
  }

  export interface Data {
    '@type': '/cosmwasm.wasm.v1.Params';
    code_upload_access: AccessConfig.Data | undefined;
    instantiate_default_permission: string;
  }

  export type Proto = CodesParamsV1_pb;
}
