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
    public sequence: number,
    public source_port: string,
    public source_channel: string,
    public destination_port: string,
    public destination_channel: string,
    public data: string,
    public timeout_height: HeightV1 | undefined,
    public timeout_timestamp: number
  ) {
    super();
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
      sequence,
      source_port,
      source_channel,
      destination_port,
      destination_channel,
      data,
      timeout_height: timeout_height ? timeout_height.toAmino() : undefined,
      timeout_timestamp,
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
      Number.parseInt(timeout_timestamp)
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
      sequence,
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
      proto.sequence.toNumber(),
      proto.sourcePort,
      proto.sourceChannel,
      proto.destinationPort,
      proto.destinationChannel,
      Convert.toBase64(proto.data),
      proto.timeoutHeight ? HeightV1.fromProto(proto.timeoutHeight) : undefined,
      proto.timeoutTimestamp.toNumber()
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
      sequence,
      sourcePort: source_port,
      sourceChannel: source_channel,
      destinationPort: destination_port,
      destinationChannel: destination_channel,
      data: Convert.fromBase64(data),
      timeoutHeight: timeout_height ? timeout_height.toProto() : undefined,
      timeoutTimestamp: timeout_timestamp,
    });
  }
}

export namespace PacketV1 {
  export interface Amino {
    sequence: number;
    source_port: string;
    source_channel: string;
    destination_port: string;
    destination_channel: string;
    data: string;
    timeout_height?: HeightV1.Amino;
    timeout_timestamp: number;
  }

  export interface Data {
    sequence: number;
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
