import { JSONSerializable } from '../../../../../util/json';
import { Convert } from '../../../../../util/convert';
import { Int, Numeric } from '../../../../numeric';
import { PacketState as PacketStateV1_pb } from '@xpla/xpla.proto/ibc/core/channel/v1/channel';

/**
 * PacketState defines the generic type necessary to retrieve and store
 * packet commitments, acknowledgements, and receipts.
 * Caller is responsible for knowing the context necessary to interpret this
 * state as a commitment, acknowledgement, or a receipt.
 */
export class PacketStateV1 extends JSONSerializable<
  PacketStateV1.Amino,
  PacketStateV1.Data,
  PacketStateV1.Proto
> {
  public sequence: Int;
  public data: Uint8Array;

  /**
   * @param port_id  channel port identifier.
   * @param channel_id channel unique identifier.
   * @param sequence packet sequence.
   * @param data embedded data that represents packet state.
   */
  constructor(
    public port_id: string,
    public channel_id: string,
    sequence: Numeric.Input,
    data: Uint8Array | number[] | string,
  ) {
    super();
    this.sequence = new Int(sequence);
    this.data = Convert.toBytes(data);
  }

  public static fromAmino(data_: PacketStateV1.Amino): PacketStateV1 {
    const { port_id, channel_id, sequence, data } = data_;
    return new PacketStateV1(
      port_id,
      channel_id,
      sequence,
      data,
    );
  }

  public toAmino(): PacketStateV1.Amino {
    const { port_id, channel_id, sequence, data } = this;
    const res: PacketStateV1.Amino = {
      port_id,
      channel_id,
      sequence: sequence.toFixed(),
      data: Convert.toBase64(data),
    };
    return res;
  }

  public static fromData(data_: PacketStateV1.Data): PacketStateV1 {
    const { port_id, channel_id, sequence, data } = data_;
    return new PacketStateV1(
      port_id,
      channel_id,
      sequence,
      data,
    );
  }

  public toData(): PacketStateV1.Data {
    const { port_id, channel_id, sequence, data } = this;
    const res: PacketStateV1.Data = {
      port_id,
      channel_id,
      sequence: sequence.toFixed(),
      data: Convert.toBase64(data),
    };
    return res;
  }

  public static fromProto(proto: PacketStateV1.Proto): PacketStateV1 {
    return new PacketStateV1(
      proto.portId,
      proto.channelId,
      proto.sequence.toString(),
      proto.data,
    );
  }

  public toProto(): PacketStateV1.Proto {
    const { port_id, channel_id, sequence, data } = this;
    return PacketStateV1_pb.fromPartial({
      portId: port_id,
      channelId: channel_id,
      sequence: sequence.toFixed(),
      data,
    });
  }
}

export namespace PacketStateV1 {
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

  export type Proto = PacketStateV1_pb;
}
