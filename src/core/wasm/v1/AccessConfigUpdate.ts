import { Int64, Int64Input, parseInt64 } from '../../../util/int64';
import { JSONSerializable } from '../../../util/json';
import { AccessConfig } from './AccessConfig';
import { AccessConfigUpdate as AccessConfigUpdate_pb } from '@xpla/xpla.proto/cosmwasm/wasm/v1/proposal_legacy';

/**
 *
 */
export class AccessConfigUpdate extends JSONSerializable<
  AccessConfigUpdate.Amino,
  AccessConfigUpdate.Data,
  AccessConfigUpdate.Proto
> {
  public code_id: Int64;
  /**
   * @param code_id the reference to the stored WASM code to be updated
   * @param instantiate_permission to apply to the set of code ids
   */

  constructor(
    code_id: Int64Input,
    public instantiate_permission?: AccessConfig
  ) {
    super();
    this.code_id = parseInt64(code_id);
  }

  public static fromAmino(data: AccessConfigUpdate.Amino): AccessConfigUpdate {
    return new AccessConfigUpdate(
      data.code_id,
      data.instantiate_permission
        ? AccessConfig.fromAmino(data.instantiate_permission)
        : undefined
    );
  }

  public toAmino(): AccessConfigUpdate.Amino {
    const res: AccessConfigUpdate.Amino = {
      code_id: this.code_id.toFixed(),
      instantiate_permission: this.instantiate_permission?.toAmino(),
    };
    return res;
  }

  public static fromData(data: AccessConfigUpdate.Data): AccessConfigUpdate {
    return new AccessConfigUpdate(
      data.code_id,
      data.instantiate_permission
        ? AccessConfig.fromData(data.instantiate_permission)
        : undefined
    );
  }

  public toData(): AccessConfigUpdate.Data {
    const res: AccessConfigUpdate.Data = {
      code_id: this.code_id.toFixed(),
      instantiate_permission: this.instantiate_permission?.toData(),
    };
    return res;
  }

  public static fromProto(proto: AccessConfigUpdate.Proto): AccessConfigUpdate {
    return new AccessConfigUpdate(
      proto.codeId,
      proto.instantiatePermission
        ? AccessConfig.fromProto(proto.instantiatePermission)
        : undefined
    );
  }

  public toProto(): AccessConfigUpdate.Proto {
    return AccessConfigUpdate_pb.fromPartial({
      codeId: this.code_id.toString(),
      instantiatePermission: this.instantiate_permission?.toProto(),
    });
  }
}

export namespace AccessConfigUpdate {
  export interface Amino {
    code_id: string;
    instantiate_permission?: AccessConfig.Amino;
  }

  export interface Data {
    code_id: string;
    instantiate_permission?: AccessConfig.Data;
  }

  export type Proto = AccessConfigUpdate_pb;
}
