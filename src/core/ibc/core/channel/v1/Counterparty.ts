import { JSONSerializable } from '../../../../../util/json';
import { Counterparty as CounterpartyV1_pb } from '@xpla/xpla.proto/ibc/core/channel/v1/channel';

/** Counterparty defines a channel end counterparty */
export class CounterpartyV1 extends JSONSerializable<
  CounterpartyV1.Amino,
  CounterpartyV1.Data,
  CounterpartyV1.Proto
> {
  /**
   * @param port_id port on the counterparty chain which owns the other end of the channel.
   * @param channel_id channel end on the counterparty chain
   */
  constructor(public port_id: string, public channel_id: string) {
    super();
  }

  public static fromAmino(data: CounterpartyV1.Amino): CounterpartyV1 {
    const { port_id, channel_id } = data;
    return new CounterpartyV1(port_id, channel_id);
  }

  public toAmino(): CounterpartyV1.Amino {
    const { port_id, channel_id } = this;
    const res: CounterpartyV1.Amino = {
      port_id,
      channel_id,
    };
    return res;
  }

  public static fromData(data: CounterpartyV1.Data): CounterpartyV1 {
    const { port_id, channel_id } = data;
    return new CounterpartyV1(port_id, channel_id);
  }

  public toData(): CounterpartyV1.Data {
    const { port_id, channel_id } = this;
    const res: CounterpartyV1.Data = {
      port_id,
      channel_id,
    };
    return res;
  }

  public static fromProto(proto: CounterpartyV1.Proto): CounterpartyV1 {
    return new CounterpartyV1(proto.portId, proto.channelId);
  }

  public toProto(): CounterpartyV1.Proto {
    const { port_id, channel_id } = this;
    return CounterpartyV1_pb.fromPartial({
      portId: port_id,
      channelId: channel_id,
    });
  }
}

export namespace CounterpartyV1 {
  export interface Amino {
    port_id: string;
    channel_id: string;
  }

  export interface Data {
    port_id: string;
    channel_id: string;
  }

  export type Proto = CounterpartyV1_pb;
}
