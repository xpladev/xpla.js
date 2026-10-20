import { Int64, Int64Input, parseInt64 } from '../../../../../util/int64';
import { JSONSerializable } from '../../../../../util/json';
import { Convert } from '../../../../../util/convert';
import { HeightV1 } from '../../client/v1/Height';
import { Packet as PacketV1_pb } from '@xpla/xpla.proto/ibc/core/channel/v1/channel';

/** Packet defines a type that carries data across different chains through IBC */
export class PacketV1 extends JSONSerializable<
  PacketV1.Amino,
  PacketV1.Data,
  PacketV1.Proto
> {
  public sequence: Int64;
  public timeout_timestamp: Int64;
  /**
   * @param sequence number corresponds to the order of sends and receives, where a Packet with an earlier sequence number must be sent and received before a Packet with a later sequence number.
   * @param source_port identifies the port on the sending chain.
   * @param source_channel identifies the channel end on the sending chain.
   * @param destination_port identifies the port on the receiving chain.
   * @param destination_channel identifies the channel end on the receiving chain.
   * @param data base64 encoded, actual opaque bytes transferred directly to the application module
   * @param timeout_height block height after which the packet times out
   * @param timeout_timestamp block timestamp (in nanoseconds) after which the packet times out
   */

  constructor(
    sequence: Int64Input,
    public source_port: string,
    public source_channel: string,
    public destination_port: string,
    public destination_channel: string,
    public data: string,
    public timeout_height: HeightV1 | undefined,
    timeout_timestamp: Int64Input
  ) {
    super();
    this.sequence = parseInt64(sequence);
    this.timeout_timestamp = parseInt64(timeout_timestamp);
  }

  public static fromAmino(_data: PacketV1.Amino): PacketV1 {
    const {
      sequence,
      source_port,
      source_channel,
      destination_port,
      destination_channel,
      data,
      timeout_height,
      timeout_timestamp,
    } = _data;
    return new PacketV1(
      sequence,
      source_port,
      source_channel,
      destination_port,
      destination_channel,
      data,
      timeout_height ? HeightV1.fromAmino(timeout_height) : undefined,
      timeout_timestamp
    );
  }

  public toAmino(): PacketV1.Amino {
    const {
      sequence,
      source_port,
      source_channel,
      destination_port,
      destination_channel,
      data,
      timeout_height,
      timeout_timestamp,
    } = this;
    const res: PacketV1.Amino = {
      sequence: sequence.toString(),
      source_port,
      source_channel,
      destination_port,
      destination_channel,
      data,
      timeout_height: timeout_height ? timeout_height.toAmino() : undefined,
      timeout_timestamp: timeout_timestamp.toString(),
    };
    return res;
  }

  public static fromData(_data: PacketV1.Data): PacketV1 {
    const {
      sequence,
      source_port,
      source_channel,
      destination_port,
      destination_channel,
      data,
      timeout_height,
      timeout_timestamp,
    } = _data;
    return new PacketV1(
      sequence,
      source_port,
      source_channel,
      destination_port,
      destination_channel,
      data,
      timeout_height ? HeightV1.fromData(timeout_height) : undefined,
      timeout_timestamp
    );
  }

  public toData(): PacketV1.Data {
    const {
      sequence,
      source_port,
      source_channel,
      destination_port,
      destination_channel,
      data,
      timeout_height,
      timeout_timestamp,
    } = this;
    const res: PacketV1.Data = {
      sequence: sequence.toString(),
      source_port,
      source_channel,
      destination_port,
      destination_channel,
      data,
      timeout_height: timeout_height ? timeout_height.toData() : undefined,
      timeout_timestamp: timeout_timestamp.toFixed(),
    };
    return res;
  }

  public static fromProto(proto: PacketV1.Proto): PacketV1 {
    return new PacketV1(
      proto.sequence,
      proto.sourcePort,
      proto.sourceChannel,
      proto.destinationPort,
      proto.destinationChannel,
      Convert.toBase64(proto.data),
      proto.timeoutHeight ? HeightV1.fromProto(proto.timeoutHeight) : undefined,
      proto.timeoutTimestamp
    );
  }

  public toProto(): PacketV1.Proto {
    const {
      sequence,
      source_port,
      source_channel,
      destination_port,
      destination_channel,
      data,
      timeout_height,
      timeout_timestamp,
    } = this;
    return PacketV1_pb.fromPartial({
      sequence: sequence.toString(),
      sourcePort: source_port,
      sourceChannel: source_channel,
      destinationPort: destination_port,
      destinationChannel: destination_channel,
      data: Convert.fromBase64(data),
      timeoutHeight: timeout_height ? timeout_height.toProto() : undefined,
      timeoutTimestamp: timeout_timestamp.toString(),
    });
  }
}

export namespace PacketV1 {
  export interface Amino {
    sequence: string;
    source_port: string;
    source_channel: string;
    destination_port: string;
    destination_channel: string;
    data: string;
    timeout_height?: HeightV1.Amino;
    timeout_timestamp: string;
  }

  export interface Data {
    sequence: string;
    source_port: string;
    source_channel: string;
    destination_port: string;
    destination_channel: string;
    data: string;
    timeout_height?: HeightV1.Data;
    timeout_timestamp: string;
  }

  export type Proto = PacketV1_pb;
}
