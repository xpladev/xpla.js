import { JSONSerializable } from '../../../../../../util/json';
import { Convert } from '../../../../../../util/convert';
import { QueryRequest as QueryRequestV1_pb } from '@xpla/xpla.proto/ibc/applications/interchain_accounts/host/v1/host';

/**
 *  Params defines the set of on-chain interchain accounts parameters.
 *  The following parameters may be used to disable the host submodule.
 */
export class QueryRequestV1 extends JSONSerializable<
  any,
  QueryRequestV1.Data,
  QueryRequestV1.Proto
> {
  public data: Uint8Array;

  /**
   * @param path defines the path of the query request as defined by ADR-021.
   * @param data defines the payload of the query request as defined by ADR-021.
   */
  constructor(
    public path: string,
    data: Uint8Array | number[] | string,
  ) {
    super();
    this.data = Convert.toBytes(data);
  }

  public static fromAmino(_: any): QueryRequestV1 {
    throw new Error('Amino not supported');
  }

  public toAmino(): any {
    throw new Error('Amino not supported');
  }

  public static fromData(data_: QueryRequestV1.Data): QueryRequestV1 {
    const { path, data } = data_;
    return new QueryRequestV1(path, data);
  }

  public toData(): QueryRequestV1.Data {
    const { path, data } = this;
    const res: QueryRequestV1.Data = {
      path,
      data: Convert.toBase64(data),
    };
    return res;
  }

  public static fromProto(proto: QueryRequestV1.Proto): QueryRequestV1 {
    return new QueryRequestV1(proto.path, proto.data);
  }

  public toProto(): QueryRequestV1.Proto {
    const { path, data } = this;
    return QueryRequestV1_pb.fromPartial({
      path, data,
    });
  }
}

export namespace QueryRequestV1 {
  export interface Data {
    path: string;
    data: string; // base64
  }

  export type Proto = QueryRequestV1_pb;
}
