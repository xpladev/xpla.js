import { JSONSerializable } from '../../../../../util/json';
import { Version as VersionV1_pb } from '@xpla/xpla.proto/ibc/core/connection/v1/connection';

/**
 * Version defines the versioning scheme used to negotiate the IBC version in
 * the connection handshake.
 */
export class VersionV1 extends JSONSerializable<
  VersionV1.Amino,
  VersionV1.Data,
  VersionV1.Proto
> {
  /**
   * @param identifier unique version identifier
   * @param features list of features compatible with the specified identifier
   */
  constructor(
    public identifier: string,
    public features: string[],
  ) {
    super();
  }

  public static fromAmino(data: VersionV1.Amino): VersionV1 {
    const { identifier, features } = data;
    return new VersionV1(identifier, features);
  }

  public toAmino(): VersionV1.Amino {
    const { identifier, features } = this;
    const res: VersionV1.Amino = {
      identifier,
      features,
    };
    return res;
  }

  public static fromData(data: VersionV1.Data): VersionV1 {
    const { identifier, features } = data;
    return new VersionV1(identifier, features);
  }

  public toData(): VersionV1.Data {
    const { identifier, features } = this;
    const res: VersionV1.Data = {
      identifier,
      features,
    };
    return res;
  }

  public static fromProto(proto: VersionV1.Proto): VersionV1 {
    return new VersionV1(proto.identifier, proto.features);
  }

  public toProto(): VersionV1.Proto {
    const { identifier, features } = this;
    return VersionV1_pb.fromPartial({ identifier, features });
  }
}

export namespace VersionV1 {
  export interface Amino {
    identifier: string;
    features: string[];
  }

  export interface Data {
    identifier: string;
    features: string[];
  }

  export type Proto = VersionV1_pb;
}
