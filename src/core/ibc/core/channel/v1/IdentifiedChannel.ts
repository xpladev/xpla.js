import { ChannelV1 } from './Channel';
import { IdentifiedChannel as IdentifiedChannel_pb } from '@xpla/xpla.proto/ibc/core/channel/v1/channel';

/** A list entry retaining its local chain identifiers. */
export class IdentifiedChannelV1 extends ChannelV1 {
  constructor(
    state: ChannelV1['state'],
    ordering: ChannelV1['ordering'],
    counterparty: ChannelV1['counterparty'],
    connection_hops: string[],
    version: string,
    public port_id: string,
    public channel_id: string
  ) {
    super(state, ordering, counterparty, connection_hops, version);
  }
  private static fromValue(
    value: ChannelV1,
    portId: string,
    channelId: string
  ): IdentifiedChannelV1 {
    return new IdentifiedChannelV1(
      value.state,
      value.ordering,
      value.counterparty,
      value.connection_hops,
      value.version,
      portId,
      channelId
    );
  }
  public static fromData(data: IdentifiedChannelV1.Data): IdentifiedChannelV1 {
    return IdentifiedChannelV1.fromValue(
      ChannelV1.fromData(data),
      data.port_id,
      data.channel_id
    );
  }
  public toData(): IdentifiedChannelV1.Data {
    return {
      ...super.toData(),
      port_id: this.port_id,
      channel_id: this.channel_id,
    };
  }
  public static fromAmino(
    data: IdentifiedChannelV1.Amino
  ): IdentifiedChannelV1 {
    return IdentifiedChannelV1.fromValue(
      ChannelV1.fromAmino(data),
      data.port_id,
      data.channel_id
    );
  }
  public toAmino(): IdentifiedChannelV1.Amino {
    return {
      ...super.toAmino(),
      port_id: this.port_id,
      channel_id: this.channel_id,
    };
  }
  public static fromProto(
    data: IdentifiedChannelV1.Proto
  ): IdentifiedChannelV1 {
    return IdentifiedChannelV1.fromValue(
      ChannelV1.fromProto(data),
      data.portId,
      data.channelId
    );
  }
  public toProto(): IdentifiedChannelV1.Proto {
    return {
      ...super.toProto(),
      portId: this.port_id,
      channelId: this.channel_id,
    };
  }
}
export namespace IdentifiedChannelV1 {
  export type Proto = IdentifiedChannel_pb;
  export interface Data extends ChannelV1.Data {
    port_id: string;
    channel_id: string;
  }
  export interface Amino extends ChannelV1.Amino {
    port_id: string;
    channel_id: string;
  }
}
