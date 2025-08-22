import { JSONSerializable } from '../../../../../util/json';
import { Int, Numeric } from '../../../../numeric';
import { PacketId as PacketIdV1_pb } from '@xpla/xpla.proto/ibc/core/channel/v1/channel';

/**
 * PacketId is an identifer for a unique Packet
 * Source chains refer to packets by source port/channel
 * Destination chains refer to packets by destination port/channel
 */
export class PacketIdV1 extends JSONSerializable<
  PacketIdV1.Amino,
  PacketIdV1.Data,
  PacketIdV1.Proto
> {
  public sequence: Int;

  /**
   * @param port_id  channel port identifier.
   * @param channel_id channel unique identifier.
   * @param sequence packet sequence.
   */
  constructor(
    public port_id: string,
    public channel_id: string,
    sequence: Numeric.Input,
  ) {
    super();
    this.sequence = new Int(sequence);
  }

  public static fromAmino(data: PacketIdV1.Amino): PacketIdV1 {
    const { port_id, channel_id, sequence } = data;
    return new PacketIdV1(port_id, channel_id, sequence);
  }

  public toAmino(): PacketIdV1.Amino {
    const { port_id, channel_id, sequence } = this;
    const res: PacketIdV1.Amino = {
      port_id,
      channel_id,
      sequence: sequence.toFixed(),
    };
    return res;
  }

  public static fromData(data: PacketIdV1.Data): PacketIdV1 {
    const { port_id, channel_id, sequence } = data;
    return new PacketIdV1(port_id, channel_id, sequence);
  }

  public toData(): PacketIdV1.Data {
    const { port_id, channel_id, sequence } = this;
    const res: PacketIdV1.Data = {
      port_id,
      channel_id,
      sequence: sequence.toFixed(),
    };
    return res;
  }

  public static fromProto(proto: PacketIdV1.Proto): PacketIdV1 {
    return new PacketIdV1(
      proto.portId,
      proto.channelId,
      proto.sequence.toString(),
    );
  }

  public toProto(): PacketIdV1.Proto {
    const { port_id, channel_id, sequence } = this;
    return PacketIdV1_pb.fromPartial({
      portId: port_id,
      channelId: channel_id,
      sequence: sequence.toFixed(),
    });
  }
}

export namespace PacketIdV1 {
  export interface Amino {
    port_id: string;
    channel_id: string;
    sequence: string;
  }

  export interface Data {
    port_id: string;
    channel_id: string;
    sequence: string;
  }

  export type Proto = PacketIdV1_pb;
}
