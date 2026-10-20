import { Numeric } from '../../../../numeric';
import { ConnectionEndV1 } from './ConnectionEnd';
import { IdentifiedConnection as IdentifiedConnection_pb } from '@xpla/xpla.proto/ibc/core/connection/v1/connection';

/** A list entry retaining its local chain identifiers. */
export class IdentifiedConnectionV1 extends ConnectionEndV1 {
  constructor(
    public id: string,
    client_id: string,
    versions: ConnectionEndV1['versions'],
    state: ConnectionEndV1['state'],
    counterparty: ConnectionEndV1['counterparty'],
    delay_period: Numeric.Input
  ) {
    super(client_id, versions, state, counterparty, delay_period);
  }
  private static fromValue(
    value: ConnectionEndV1,
    id: string
  ): IdentifiedConnectionV1 {
    return new IdentifiedConnectionV1(
      id,
      value.client_id,
      value.versions,
      value.state,
      value.counterparty,
      value.delay_period
    );
  }
  public static fromData(
    data: IdentifiedConnectionV1.Data
  ): IdentifiedConnectionV1 {
    return IdentifiedConnectionV1.fromValue(
      ConnectionEndV1.fromData(data),
      data.id
    );
  }
  public toData(): IdentifiedConnectionV1.Data {
    return { ...super.toData(), id: this.id };
  }
  public static fromAmino(
    data: IdentifiedConnectionV1.Amino
  ): IdentifiedConnectionV1 {
    return IdentifiedConnectionV1.fromValue(
      ConnectionEndV1.fromAmino(data),
      data.id
    );
  }
  public toAmino(): IdentifiedConnectionV1.Amino {
    return { ...super.toAmino(), id: this.id };
  }
  public static fromProto(
    data: IdentifiedConnectionV1.Proto
  ): IdentifiedConnectionV1 {
    return IdentifiedConnectionV1.fromValue(
      ConnectionEndV1.fromProto(data),
      data.id
    );
  }
  public toProto(): IdentifiedConnectionV1.Proto {
    return { ...super.toProto(), id: this.id };
  }
}
export namespace IdentifiedConnectionV1 {
  export type Proto = IdentifiedConnection_pb;
  export interface Data extends ConnectionEndV1.Data {
    id: string;
  }
  export interface Amino extends ConnectionEndV1.Amino {
    id: string;
  }
}
