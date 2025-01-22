import { JSONSerializable } from '../../../../util/json';
import { Convert } from '../../../../util/convert';
import { Int, Numeric } from '../../../../core/numeric';
import { PacketState as PacketState_pb } from '@xpla/xpla.proto/ibc/core/channel/v1/channel';

export class PacketState extends JSONSerializable<
  PacketState.Amino,
  PacketState.Data,
  PacketState.Proto
> {
  public sequence: Int;
  public data: Buffer;

  /**
   * @param port_id  channel port identifier
   * @param channel_id channel unique identifier
   * @param sequence packet sequence
   */
  constructor(
    public port_id: string,
    public channel_id: string,
    sequence: Numeric.Input,
    data: Buffer | Uint8Array | number[] | string,
  ) {
    super();
    this.sequence = new Int(sequence);
    this.data = Convert.toBuffer(data);
  }

  public static fromAmino(data_: PacketState.Amino): PacketState {
    const { port_id, channel_id, sequence, data } = data_;
    return new PacketState(
      port_id,
      channel_id,
      sequence,
      data,
    );
  }

  public toAmino(): PacketState.Amino {
    const { port_id, channel_id, sequence, data } = this;
    const res: PacketState.Amino = {
      port_id,
      channel_id,
      sequence: sequence.toFixed(),
      data: data.toString('base64'),
    };
    return res;
  }

  public static fromData(data_: PacketState.Data): PacketState {
    const { port_id, channel_id, sequence, data } = data_;
    return new PacketState(
      port_id,
      channel_id,
      sequence,
      data,
    );
  }

  public toData(): PacketState.Data {
    const { port_id, channel_id, sequence, data } = this;
    const res: PacketState.Data = {
      port_id,
      channel_id,
      sequence: sequence.toFixed(),
      data: data.toString('base64'),
    };
    return res;
  }

  public static fromProto(proto: PacketState.Proto): PacketState {
    return new PacketState(
      proto.portId,
      proto.channelId,
      proto.sequence.toString(),
      proto.data,
    );
  }

  public toProto(): PacketState.Proto {
    const { port_id, channel_id, sequence, data } = this;
    return PacketState_pb.fromPartial({
      portId: port_id,
      channelId: channel_id,
      sequence: sequence.toFixed(),
      data,
    });
  }
}

export namespace PacketState {
  export interface Amino {
    port_id: string;
    channel_id: string;
    sequence: string;
    data: string; // base64
  }

  export interface Data {
    port_id: string;
    channel_id: string;
    sequence: string;
    data: string; // base64
  }

  export type Proto = PacketState_pb;
}
