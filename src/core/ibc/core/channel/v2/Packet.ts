import { JSONSerializable } from '../../../../../util/json';
import { PayloadV2 } from './Payload';
import { Packet as PacketV2_pb } from '@xpla/xpla.proto/ibc/core/channel/v2/packet';

/** Packet defines a type that carries data across different chains through IBC */
export class PacketV2 extends JSONSerializable<
  PacketV2.Amino,
  PacketV2.Data,
  PacketV2.Proto
> {
  /**
   * @param sequence number corresponds to the order of sends and receives, where a Packet with an earlier sequence number must be sent and received before a Packet with a later sequence number.
   * @param source_client identifies the sending client on the sending chain.
   * @param destination_client identifies the receiving client on the receiving chain.
   * @param timeout_timestamp timeout timestamp in seconds after which the packet times out.
   * @param payloads a list of payloads, each one for a specific application.
   */
  constructor(
    public sequence: number,
    public source_client: string,
    public destination_client: string,
    public timeout_timestamp: number,
    public payloads: PayloadV2[],
  ) {
    super();
  }

  public static fromAmino(_data: PacketV2.Amino): PacketV2 {
    const {
      sequence,
      source_client,
      destination_client,
      timeout_timestamp,
      payloads,
    } = _data;
    return new PacketV2(
      sequence,
      source_client,
      destination_client,
      timeout_timestamp,
      payloads.map(PayloadV2.fromAmino),
    );
  }

  public toAmino(): PacketV2.Amino {
    const {
      sequence,
      source_client,
      destination_client,
      timeout_timestamp,
      payloads,
    } = this;
    const res: PacketV2.Amino = {
      sequence,
      source_client,
      destination_client,
      timeout_timestamp,
      payloads: payloads.map((p) => p.toAmino()),
    };
    return res;
  }

  public static fromData(_data: PacketV2.Data): PacketV2 {
    const {
      sequence,
      source_client,
      destination_client,
      timeout_timestamp,
      payloads,
    } = _data;
    return new PacketV2(
      sequence,
      source_client,
      destination_client,
      timeout_timestamp,
      payloads.map(PayloadV2.fromData),
    );
  }

  public toData(): PacketV2.Data {
    const {
      sequence,
      source_client,
      destination_client,
      timeout_timestamp,
      payloads: data,
    } = this;
    const res: PacketV2.Data = {
      sequence,
      source_client,
      destination_client,
      timeout_timestamp,
      payloads: data,
    };
    return res;
  }

  public static fromProto(proto: PacketV2.Proto): PacketV2 {
    return new PacketV2(
      proto.sequence.toNumber(),
      proto.sourceClient,
      proto.destinationClient,
      proto.timeoutTimestamp.toNumber(),
      proto.payloads.map(PayloadV2.fromProto),
    );
  }

  public toProto(): PacketV2.Proto {
    const {
      sequence,
      source_client,
      destination_client,
      timeout_timestamp,
      payloads,
    } = this;
    return PacketV2_pb.fromPartial({
      sequence,
      sourceClient: source_client,
      destinationClient: destination_client,
      timeoutTimestamp: timeout_timestamp,
      payloads: payloads.map((p) => p.toProto()),
    });
  }
}

export namespace PacketV2 {
  export interface Amino {
    sequence: number;
    source_client: string;
    destination_client: string;
    timeout_timestamp: number;
    payloads: PayloadV2.Amino[];
  }

  export interface Data {
    sequence: number;
    source_client: string;
    destination_client: string;
    timeout_timestamp: number;
    payloads: PayloadV2.Data[];
  }

  export type Proto = PacketV2_pb;
}
