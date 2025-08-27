import { JSONSerializable } from '../../../../../util/json';
import { VersionV1 } from './Version';
import { CounterpartyV1 } from './Counterparty';
import {
  IdentifiedConnection as IdentifiedConnectionV1_pb,
  State, stateFromJSON, stateToJSON,
} from '@xpla/xpla.proto/ibc/core/connection/v1/connection';

/**
 * IdentifiedConnection defines a connection with additional connection identifier field
 */
export class IdentifiedConnectionV1 extends JSONSerializable<
  IdentifiedConnectionV1.Amino,
  IdentifiedConnectionV1.Data,
  IdentifiedConnectionV1.Proto
> {
  /**
   * @param id connection identifier.
   * @param client_id client associated with this connection.
   * @param versions IBC version which can be utilised to determine encodings or protocols for channels or packets utilising this connection.
   * @param state current state of the connection end.
   * @param counterparty counterparty chain associated with this connection.
   * @param delay_period delay period associated with this connection.
   */
  constructor(
    public id: string,
    public client_id: string,
    public versions: VersionV1[],
    public state: State,
    public counterparty: CounterpartyV1 | undefined,
    public delay_period: number
  ) {
    super();
  }

  public static fromAmino(
    data: IdentifiedConnectionV1.Amino
  ): IdentifiedConnectionV1 {
    const { id, client_id, versions, state, counterparty, delay_period } = data;
    return new IdentifiedConnectionV1(
      id,
      client_id,
      versions.map(VersionV1.fromAmino),
      stateFromJSON(state),
      counterparty ? CounterpartyV1.fromAmino(counterparty) : undefined,
      Number.parseInt(delay_period)
    );
  }

  public toAmino(): IdentifiedConnectionV1.Amino {
    const { id, client_id, versions, state, counterparty, delay_period } = this;
    const res: IdentifiedConnectionV1.Amino = {
      id,
      client_id,
      versions: versions.map(version => version.toAmino()),
      state: stateToJSON(state),
      counterparty: counterparty?.toAmino(),
      delay_period: delay_period.toFixed(),
    };
    return res;
  }

  public static fromData(
    data: IdentifiedConnectionV1.Data
  ): IdentifiedConnectionV1 {
    const { id, client_id, versions, state, counterparty, delay_period } = data;
    return new IdentifiedConnectionV1(
      id,
      client_id,
      versions.map(VersionV1.fromData),
      stateFromJSON(state),
      counterparty ? CounterpartyV1.fromData(counterparty) : undefined,
      Number.parseInt(delay_period)
    );
  }

  public toData(): IdentifiedConnectionV1.Data {
    const { id, client_id, versions, state, counterparty, delay_period } = this;
    const res: IdentifiedConnectionV1.Amino = {
      id,
      client_id,
      versions: versions.map(version => version.toData()),
      state: stateToJSON(state),
      counterparty: counterparty?.toData(),
      delay_period: delay_period.toFixed(),
    };
    return res;
  }

  public static fromProto(
    proto: IdentifiedConnectionV1.Proto
  ): IdentifiedConnectionV1 {
    return new IdentifiedConnectionV1(
      proto.id,
      proto.clientId,
      proto.versions.map(VersionV1.fromProto),
      proto.state,
      proto.counterparty
        ? CounterpartyV1.fromProto(proto.counterparty)
        : undefined,
      proto.delayPeriod.toNumber()
    );
  }

  public toProto(): IdentifiedConnectionV1.Proto {
    const { id, client_id, versions, state, counterparty, delay_period } = this;
    return IdentifiedConnectionV1_pb.fromPartial({
      id,
      clientId: client_id,
      versions: versions.map(v => v.toProto()),
      state,
      counterparty: counterparty?.toProto(),
      delayPeriod: delay_period,
    });
  }
}

export namespace IdentifiedConnectionV1 {
  export interface Amino {
    id: string;
    client_id: string;
    versions: VersionV1.Amino[];
    state: string;
    counterparty?: CounterpartyV1.Amino;
    delay_period: string;
  }

  export interface Data {
    id: string;
    client_id: string;
    versions: VersionV1.Data[];
    state: string;
    counterparty?: CounterpartyV1.Data;
    delay_period: string;
  }

  export type Proto = IdentifiedConnectionV1_pb;
}
