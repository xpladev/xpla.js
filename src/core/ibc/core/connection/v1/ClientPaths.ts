import { JSONSerializable } from '../../../../../util/json';
import { ClientPaths as ClientPathsV1_pb } from '@xpla/xpla.proto/ibc/core/connection/v1/connection';

/** ClientPaths define all the connection paths for a client state. */
export class ClientPathsV1 extends JSONSerializable<
  ClientPathsV1.Amino,
  ClientPathsV1.Data,
  ClientPathsV1.Proto
> {
  /**
   * @param paths list of connection paths
   */
  constructor(
    public paths: string[],
  ) {
    super();
  }

  public static fromAmino(data: ClientPathsV1.Amino): ClientPathsV1 {
    const { paths } = data;
    return new ClientPathsV1(paths);
  }

  public toAmino(): ClientPathsV1.Amino {
    const { paths } = this;
    const res: ClientPathsV1.Amino = {
      paths,
    };
    return res;
  }

  public static fromData(data: ClientPathsV1.Data): ClientPathsV1 {
    const { paths } = data;
    return new ClientPathsV1(paths);
  }

  public toData(): ClientPathsV1.Data {
    const { paths } = this;
    const res: ClientPathsV1.Data = {
      paths,
    };
    return res;
  }

  public static fromProto(proto: ClientPathsV1.Proto): ClientPathsV1 {
    return new ClientPathsV1(proto.paths);
  }

  public toProto(): ClientPathsV1.Proto {
    const { paths } = this;
    return ClientPathsV1_pb.fromPartial({ paths });
  }
}

export namespace ClientPathsV1 {
  export interface Amino {
    paths: string[];
  }

  export interface Data {
    paths: string[];
  }

  export type Proto = ClientPathsV1_pb;
}
