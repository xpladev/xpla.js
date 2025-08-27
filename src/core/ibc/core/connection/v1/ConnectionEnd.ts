import { JSONSerializable } from '../../../../../util/json';
import { Numeric, Int } from '../../../../numeric';
import { VersionV1 } from './Version';
import { CounterpartyV1 } from './Counterparty';
import {
  ConnectionEnd as ConnectionEndV1_pb,
  State, stateFromJSON, stateToJSON,
} from '@xpla/xpla.proto/ibc/core/connection/v1/connection';

/**
 * ConnectionEnd defines a stateful object on a chain connected to another
 * separate one.
 */
export class ConnectionEndV1 extends JSONSerializable<
  ConnectionEndV1.Amino,
  ConnectionEndV1.Data,
  ConnectionEndV1.Proto
> {
  public delay_period: Int;

  /**
   * @param client_id identifies the client on the counterparty chain associated with a given connection.
   * @param versions IBC version which can be utilised to determine encodings or protocols for channels or packets utilising this connection.
   * @param state current state of the connection end.
   * @param counterparty counterparty chain associated with this connection.
   * @param delay_period delay period that must pass before a consensus state can be used for packet-verification.
   */
  constructor(
    public client_id: string,
    public versions: VersionV1[],
    public state: State,
    public counterparty: CounterpartyV1 | undefined,
    delay_period: Numeric.Input,
  ) {
    super();
    this.delay_period = new Int(delay_period);
  }

  public static fromAmino(data: ConnectionEndV1.Amino): ConnectionEndV1 {
    const {
      client_id,
      versions,
      state,
      counterparty,
      delay_period,
    } = data;
    return new ConnectionEndV1(
      client_id,
      versions.map(VersionV1.fromAmino),
      stateFromJSON(state),
      counterparty ? CounterpartyV1.fromAmino(counterparty) : undefined,
      delay_period,
    );
  }

  public toAmino(): ConnectionEndV1.Amino {
    const {
      client_id,
      versions,
      state,
      counterparty,
      delay_period,
    } = this;
    const res: ConnectionEndV1.Amino = {
      client_id,
      versions: versions.map(version => version.toAmino()),
      state: stateToJSON(state),
      counterparty,
      delay_period: delay_period.toFixed(0),
    };
    return res;
  }

  public static fromData(data: ConnectionEndV1.Data): ConnectionEndV1 {
    const {
      client_id,
      versions,
      state,
      counterparty,
      delay_period,
    } = data;
    return new ConnectionEndV1(
      client_id,
      versions.map(VersionV1.fromData),
      stateFromJSON(state),
      counterparty ? CounterpartyV1.fromData(counterparty) : undefined,
      delay_period,
    );
  }

  public toData(): ConnectionEndV1.Data {
    const {
      client_id,
      versions,
      state,
      counterparty,
      delay_period,
    } = this;
    const res: ConnectionEndV1.Data = {
      client_id,
      versions: versions.map(version => version.toData()),
      state: stateToJSON(state),
      counterparty: counterparty?.toData(),
      delay_period: delay_period.toFixed(0),
    };
    return res;
  }

  public static fromProto(proto: ConnectionEndV1.Proto): ConnectionEndV1 {
    return new ConnectionEndV1(
      proto.clientId,
      proto.versions.map(VersionV1.fromProto),
      stateFromJSON(proto.state),
      proto.counterparty ? CounterpartyV1.fromProto(proto.counterparty) : undefined,
      proto.delayPeriod.toString(),
    );
  }

  public toProto(): ConnectionEndV1.Proto {
    const {
      client_id,
      versions,
      state,
      counterparty,
      delay_period,
    } = this;
    return ConnectionEndV1_pb.fromPartial({
      clientId: client_id,
      versions: versions.map(version => version.toProto()),
      state: stateFromJSON(state),
      counterparty: counterparty ? counterparty.toProto() : undefined,
      delayPeriod: delay_period.toFixed(0),
    });
  }
}

export namespace ConnectionEndV1 {
  export interface Amino {
    client_id: string;
    versions: VersionV1.Amino[];
    state: string;
    counterparty: CounterpartyV1.Amino | undefined;
    delay_period: string;
  }

  export interface Data {
    client_id: string;
    versions: VersionV1.Data[];
    state: string;
    counterparty: CounterpartyV1.Data | undefined;
    delay_period: string;
  }

  export type Proto = ConnectionEndV1_pb;
}
