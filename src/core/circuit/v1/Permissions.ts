/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../util/json';
import { Permissions as PermissionsV1_pb, Permissions_Level } from '@xpla/xpla.proto/cosmos/circuit/v1/types';

/**
 * Stores vote information for a proposal
 */
export class PermissionsV1 extends JSONSerializable<
  PermissionsV1.Amino,
  PermissionsV1.Data,
  PermissionsV1.Proto
> {
  /**
   * @param level is the level of permissions granted to this account
   * @param limit_type_urls is used with LEVEL_SOME_MSGS to limit the lists of Msg type URLs that the account can trip
   */
  constructor(
    public level: Permissions_Level,
    public limit_type_urls: string[],
  ) {
    super();
  }

  public static fromAmino(data: PermissionsV1.Amino, _?: boolean): PermissionsV1 {
    const { level, limit_type_urls } = data;
    return new PermissionsV1(
      level,
      limit_type_urls,
    );
  }

  public toAmino(_?: boolean): PermissionsV1.Amino {
    const { level, limit_type_urls } = this;

    const res: PermissionsV1.Amino = {
      level,
      limit_type_urls,
    };

    return res;
  }

  public static fromData(data: PermissionsV1.Data, _?: boolean): PermissionsV1 {
    const { level, limit_type_urls } = data;
    return new PermissionsV1(
      level,
      limit_type_urls,
    );
  }

  public toData(_?: boolean): PermissionsV1.Data {
    const { level, limit_type_urls } = this;

    const res: PermissionsV1.Data = {
      level,
      limit_type_urls,
    };

    return res;
  }

  public static fromProto(proto: PermissionsV1.Proto, _?: boolean): PermissionsV1 {
    return new PermissionsV1(
      proto.level,
      proto.limitTypeUrls,
    );
  }

  public toProto(_?: boolean): PermissionsV1.Proto {
    const { level, limit_type_urls } = this;
    return PermissionsV1_pb.fromPartial({
      level,
      limitTypeUrls: limit_type_urls,
    });
  }
}

export namespace PermissionsV1 {
  export interface Amino {
    level: Permissions_Level;
    limit_type_urls: string[];
  }

  export interface Data {
    level: Permissions_Level;
    limit_type_urls: string[];
  }

  export type Proto = PermissionsV1_pb;
}
