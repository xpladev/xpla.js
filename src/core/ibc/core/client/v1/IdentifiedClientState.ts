import { JSONSerializable } from '../../../../../util/json';
import { IdentifiedClientState as IdentifiedClientStateV1_pb } from '@xpla/xpla.proto/ibc/core/client/v1/client';

/**
 * IdentifiedClientState defines a client state with an additional client identifier field
 */
export class IdentifiedClientStateV1 extends JSONSerializable<
  IdentifiedClientStateV1.Amino,
  IdentifiedClientStateV1.Data,
  IdentifiedClientStateV1.Proto
> {
  /**
   * @param client_id client identifier
   * @param client_state client state
   */
  constructor(
    public client_id: string,
    public client_state: any | undefined,
  ) {
    super();
  }

  public static fromAmino(
    data: IdentifiedClientStateV1.Amino
  ): IdentifiedClientStateV1 {
    const { client_id, client_state } = data;
    return new IdentifiedClientStateV1(client_id, client_state);
  }

  public toAmino(): IdentifiedClientStateV1.Amino {
    const { client_id, client_state } = this;
    const res: IdentifiedClientStateV1.Amino = {
      client_id: client_id,
      client_state: client_state,
    };
    return res;
  }

  public static fromData(
    data: IdentifiedClientStateV1.Data
  ): IdentifiedClientStateV1 {
    const { client_id, client_state } = data;
    return new IdentifiedClientStateV1(client_id, client_state);
  }

  public toData(): IdentifiedClientStateV1.Data {
    const { client_id, client_state } = this;
    const res: IdentifiedClientStateV1.Data = {
      client_id,
      client_state,
    };
    return res;
  }

  public static fromProto(
    proto: IdentifiedClientStateV1.Proto
  ): IdentifiedClientStateV1 {
    return new IdentifiedClientStateV1(proto.clientId, proto.clientState);
  }

  public toProto(): IdentifiedClientStateV1.Proto {
    const { client_id, client_state } = this;
    return IdentifiedClientStateV1_pb.fromPartial({
      clientId: client_id,
      clientState: client_state,
    });
  }
}

export namespace IdentifiedClientStateV1 {
  export interface Amino {
    client_id: string;
    client_state: any | undefined;
  }

  export interface Data {
    client_id: string;
    client_state: any | undefined;
  }

  export type Proto = IdentifiedClientStateV1_pb;
}
