import { JSONSerializable } from '../../../../../util/json';
import { MerklePrefixV1 } from '../../commitment';
import { Counterparty as CounterpartyV1_pb } from '@xpla/xpla.proto/ibc/core/connection/v1/connection';

/** Counterparty defines the counterparty chain associated with a connection end. */
export class CounterpartyV1 extends JSONSerializable<
  CounterpartyV1.Amino,
  CounterpartyV1.Data,
  CounterpartyV1.Proto
> {
  /**
   * @param client_id identifies the client on the counterparty chain associated with a given connection.
   * @param connection_id identifies the connection end on the counterparty chain associated with a given connection.
   * @param prefix commitment merkle prefix of the counterparty chain.
   */
  constructor(
    public client_id: string,
    public connection_id: string,
    public prefix: MerklePrefixV1 | undefined,
  ) {
    super();
  }

  public static fromAmino(data: CounterpartyV1.Amino): CounterpartyV1 {
    const { client_id, connection_id, prefix } = data;
    return new CounterpartyV1(
      client_id,
      connection_id,
      prefix ? MerklePrefixV1.fromAmino(prefix) : undefined
    );
  }

  public toAmino(): CounterpartyV1.Amino {
    const { client_id, connection_id, prefix } = this;
    const res: CounterpartyV1.Amino = {
      client_id,
      connection_id,
      prefix,
    };
    return res;
  }

  public static fromData(data: CounterpartyV1.Data): CounterpartyV1 {
    const { client_id, connection_id, prefix } = data;
    return new CounterpartyV1(
      client_id,
      connection_id,
      prefix ? MerklePrefixV1.fromData(prefix) : undefined
    );
  }

  public toData(): CounterpartyV1.Data {
    const { client_id, connection_id, prefix } = this;
    const res: CounterpartyV1.Data = {
      client_id,
      connection_id,
      prefix: prefix ? prefix.toData() : undefined,
    };
    return res;
  }

  public static fromProto(proto: CounterpartyV1.Proto): CounterpartyV1 {
    return new CounterpartyV1(
      proto.clientId,
      proto.connectionId,
      proto.prefix ? MerklePrefixV1.fromProto(proto.prefix) : undefined
    );
  }

  public toProto(): CounterpartyV1.Proto {
    const { client_id, connection_id, prefix } = this;
    return CounterpartyV1_pb.fromPartial({
      clientId: client_id,
      connectionId: connection_id,
      prefix: prefix ? prefix.toProto() : undefined,
    });
  }
}

export namespace CounterpartyV1 {
  export interface Amino {
    client_id: string;
    connection_id: string;
    prefix: MerklePrefixV1.Amino | undefined;
  }

  export interface Data {
    client_id: string;
    connection_id: string;
    prefix: MerklePrefixV1.Data | undefined;
  }

  export type Proto = CounterpartyV1_pb;
}
