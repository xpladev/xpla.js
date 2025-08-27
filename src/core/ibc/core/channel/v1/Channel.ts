import { JSONSerializable } from '../../../../../util/json';
import { CounterpartyV1 } from './Counterparty';
import {
  State,
  Order,
  Channel as ChannelV1_pb,
} from '@xpla/xpla.proto/ibc/core/channel/v1/channel';

/**
 * Channel defines pipeline for exactly-once packet delivery between specific
 * modules on separate blockchains, which has at least one end capable of
 * sending packets and one end capable of receiving packets.
 */
export class ChannelV1 extends JSONSerializable<
  ChannelV1.Amino,
  ChannelV1.Data,
  ChannelV1.Proto
> {
  /**
   * @param state current state of the channel end
   * @param ordering  whether the channel is ordered or unordered
   * @param counterparty counterparty channel end
   * @param connection_hops list of connection identifiers, in order, along which packets sent on this channel will travel
   * @param version opaque channel version, which is agreed upon during the handshake
   */
  constructor(
    public state: State,
    public ordering: Order,
    public counterparty: CounterpartyV1 | undefined,
    public connection_hops: string[],
    public version: string
  ) {
    super();
  }

  public static fromAmino(data: ChannelV1.Amino): ChannelV1 {
    const { state, ordering, counterparty, connection_hops, version } = data;
    return new ChannelV1(
      state,
      ordering,
      counterparty ? CounterpartyV1.fromAmino(counterparty) : undefined,
      connection_hops,
      version
    );
  }

  public toAmino(): ChannelV1.Amino {
    const { state, ordering, counterparty, connection_hops, version } = this;
    const res: ChannelV1.Amino = {
      state,
      ordering,
      counterparty: counterparty ? counterparty.toAmino() : undefined,
      connection_hops,
      version,
    };
    return res;
  }

  public static fromData(data: ChannelV1.Data): ChannelV1 {
    const { state, ordering, counterparty, connection_hops, version } = data;
    return new ChannelV1(
      state,
      ordering,
      counterparty ? CounterpartyV1.fromData(counterparty) : undefined,
      connection_hops,
      version
    );
  }

  public toData(): ChannelV1.Data {
    const { state, ordering, counterparty, connection_hops, version } = this;
    const res: ChannelV1.Data = {
      state,
      ordering,
      counterparty: counterparty ? counterparty.toData() : undefined,
      connection_hops,
      version,
    };
    return res;
  }

  public static fromProto(proto: ChannelV1.Proto): ChannelV1 {
    return new ChannelV1(
      proto.state,
      proto.ordering,
      proto.counterparty
        ? CounterpartyV1.fromProto(proto.counterparty)
        : undefined,
      proto.connectionHops,
      proto.version
    );
  }

  public toProto(): ChannelV1.Proto {
    const { state, ordering, counterparty, connection_hops, version } = this;
    return ChannelV1_pb.fromPartial({
      state,
      ordering,
      counterparty: counterparty ? counterparty.toProto() : undefined,
      connectionHops: connection_hops,
      version,
    });
  }
}

export namespace ChannelV1 {
  export interface Amino {
    state: State;
    ordering: Order;
    counterparty?: CounterpartyV1.Amino;
    connection_hops: string[];
    version: string;
  }

  export interface Data {
    state: State;
    ordering: Order;
    counterparty?: CounterpartyV1.Data;
    connection_hops: string[];
    version: string;
  }

  export type Proto = ChannelV1_pb;
}
