import { JSONSerializable } from '../../../../../util/json';
import { CounterpartyV1 } from './Counterparty';
import {
  State,
  Order,
  IdentifiedChannel as IdentifiedChannelV1_pb,
} from '@xpla/xpla.proto/ibc/core/channel/v1/channel';

/**
 * IdentifiedChannel defines a channel with additional port and channel
 * identifier fields.
 */
export class IdentifiedChannelV1 extends JSONSerializable<
  IdentifiedChannelV1.Amino,
  IdentifiedChannelV1.Data,
  IdentifiedChannelV1.Proto
> {
  /**
   * @param state current state of the channel end
   * @param ordering  whether the channel is ordered or unordered
   * @param counterparty counterparty channel end
   * @param connection_hops list of connection identifiers, in order, along which packets sent on this channel will travel
   * @param version opaque channel version, which is agreed upon during the handshake
   * @param port_id port identifier
   * @param channel_id channel identifier
   */
  constructor(
    public state: State,
    public ordering: Order,
    public counterparty: CounterpartyV1 | undefined,
    public connection_hops: string[],
    public version: string,
    public port_id: string,
    public channel_id: string,
  ) {
    super();
  }

  public static fromAmino(data: IdentifiedChannelV1.Amino): IdentifiedChannelV1 {
    const {
      state,
      ordering,
      counterparty,
      connection_hops,
      version,
      port_id,
      channel_id,
    } = data;
    return new IdentifiedChannelV1(
      state,
      ordering,
      counterparty ? CounterpartyV1.fromAmino(counterparty) : undefined,
      connection_hops,
      version,
      port_id,
      channel_id,
    );
  }

  public toAmino(): IdentifiedChannelV1.Amino {
    const {
      state,
      ordering,
      counterparty,
      connection_hops,
      version,
      port_id,
      channel_id,
    } = this;
    const res: IdentifiedChannelV1.Amino = {
      state,
      ordering,
      counterparty: counterparty ? counterparty.toAmino() : undefined,
      connection_hops,
      version,
      port_id,
      channel_id,
    };
    return res;
  }

  public static fromData(data: IdentifiedChannelV1.Data): IdentifiedChannelV1 {
    const {
      state,
      ordering,
      counterparty,
      connection_hops,
      version,
      port_id,
      channel_id,
    } = data;
    return new IdentifiedChannelV1(
      state,
      ordering,
      counterparty ? CounterpartyV1.fromData(counterparty) : undefined,
      connection_hops,
      version,
      port_id,
      channel_id,
    );
  }

  public toData(): IdentifiedChannelV1.Data {
    const {
      state,
      ordering,
      counterparty,
      connection_hops,
      version,
      port_id,
      channel_id,
    } = this;
    const res: IdentifiedChannelV1.Data = {
      state,
      ordering,
      counterparty: counterparty ? counterparty.toData() : undefined,
      connection_hops,
      version,
      port_id,
      channel_id,
    };
    return res;
  }

  public static fromProto(proto: IdentifiedChannelV1.Proto): IdentifiedChannelV1 {
    return new IdentifiedChannelV1(
      proto.state,
      proto.ordering,
      proto.counterparty
        ? CounterpartyV1.fromProto(proto.counterparty)
        : undefined,
      proto.connectionHops,
      proto.version,
      proto.portId,
      proto.channelId,
    );
  }

  public toProto(): IdentifiedChannelV1.Proto {
    const {
      state,
      ordering,
      counterparty,
      connection_hops,
      version,
      port_id,
      channel_id,
    } = this;
    return IdentifiedChannelV1_pb.fromPartial({
      state,
      ordering,
      counterparty: counterparty ? counterparty.toProto() : undefined,
      connectionHops: connection_hops,
      version,
      portId: port_id,
      channelId: channel_id,
    });
  }
}

export namespace IdentifiedChannelV1 {
  export interface Amino {
    state: State;
    ordering: Order;
    counterparty?: CounterpartyV1.Amino;
    connection_hops: string[];
    version: string;
    port_id: string;
    channel_id: string;
  }

  export interface Data {
    state: State;
    ordering: Order;
    counterparty?: CounterpartyV1.Data;
    connection_hops: string[];
    version: string;
    port_id: string;
    channel_id: string;
  }

  export type Proto = IdentifiedChannelV1_pb;
}
