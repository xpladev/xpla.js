import { JSONSerializable } from '../../../../../util/json';
import { ConnectionPaths as ConnectionPathsV1_pb } from '@xpla/xpla.proto/ibc/core/connection/v1/connection';

/** ConnectionPaths define all the connection paths for a given client state. */
export class ConnectionPathsV1 extends JSONSerializable<
  ConnectionPathsV1.Amino,
  ConnectionPathsV1.Data,
  ConnectionPathsV1.Proto
> {
  /**
   * @param client_id client state unique identifier
   * @param paths list of connection paths
   */
  constructor(
    public client_id: string,
    public paths: string[],
  ) {
    super();
  }

  public static fromAmino(data: ConnectionPathsV1.Amino): ConnectionPathsV1 {
    const { client_id, paths } = data;
    return new ConnectionPathsV1(client_id, paths);
  }

  public toAmino(): ConnectionPathsV1.Amino {
    const { client_id, paths } = this;
    const res: ConnectionPathsV1.Amino = {
      client_id,
      paths,
    };
    return res;
  }

  public static fromData(data: ConnectionPathsV1.Data): ConnectionPathsV1 {
    const { client_id, paths } = data;
    return new ConnectionPathsV1(client_id, paths);
  }

  public toData(): ConnectionPathsV1.Data {
    const { client_id, paths } = this;
    const res: ConnectionPathsV1.Data = {
      client_id,
      paths,
    };
    return res;
  }

  public static fromProto(proto: ConnectionPathsV1.Proto): ConnectionPathsV1 {
    return new ConnectionPathsV1(proto.clientId, proto.paths);
  }

  public toProto(): ConnectionPathsV1.Proto {
    const { client_id, paths } = this;
    return ConnectionPathsV1_pb.fromPartial({
      clientId: client_id,
      paths,
    });
  }
}

export namespace ConnectionPathsV1 {
  export interface Amino {
    client_id: string;
    paths: string[];
  }

  export interface Data {
    client_id: string;
    paths: string[];
  }

  export type Proto = ConnectionPathsV1_pb;
}
