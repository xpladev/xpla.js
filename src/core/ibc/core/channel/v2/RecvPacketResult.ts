import { JSONSerializable } from '../../../../../util/json';
import { Convert } from '../../../../../util/convert';
import {
  RecvPacketResult as RecvPacketResultV2_pb,
  PacketStatus, packetStatusFromJSON, packetStatusToJSON,
} from '@xpla/xpla.proto/ibc/core/channel/v2/packet';

/** RecvPacketResult speecifies the status of a packet as well as the acknowledgement bytes. */
export class RecvPacketResultV2 extends JSONSerializable<
  RecvPacketResultV2.Amino,
  RecvPacketResultV2.Data,
  RecvPacketResultV2.Proto
> {
  /**
   * @param status status of the packet
   * @param acknowledgement base64 encoded, acknowledgement of the packet
   */
  constructor(
    public status: PacketStatus,
    public acknowledgement: string,
  ) {
    super();
  }

  public static fromAmino(_data: RecvPacketResultV2.Amino): RecvPacketResultV2 {
    const {
      status,
      acknowledgement,
    } = _data;
    return new RecvPacketResultV2(
      packetStatusFromJSON(status),
      acknowledgement,
    );
  }

  public toAmino(): RecvPacketResultV2.Amino {
    const {
      status,
      acknowledgement,
    } = this;
    const res: RecvPacketResultV2.Amino = {
      status: packetStatusToJSON(status),
      acknowledgement,
    };
    return res;
  }

  public static fromData(_data: RecvPacketResultV2.Data): RecvPacketResultV2 {
    const {
      status,
      acknowledgement,
    } = _data;
    return new RecvPacketResultV2(
      packetStatusFromJSON(status),
      acknowledgement,
    );
  }

  public toData(): RecvPacketResultV2.Data {
    const {
      status,
      acknowledgement,
    } = this;
    const res: RecvPacketResultV2.Data = {
      status: packetStatusToJSON(status),
      acknowledgement,
    };
    return res;
  }

  public static fromProto(proto: RecvPacketResultV2.Proto): RecvPacketResultV2 {
    return new RecvPacketResultV2(
      proto.status,
      Convert.toBase64(proto.acknowledgement),
    );
  }

  public toProto(): RecvPacketResultV2.Proto {
    const {
      status,
      acknowledgement,
    } = this;
    return RecvPacketResultV2_pb.fromPartial({
      status,
      acknowledgement: Convert.fromBase64(acknowledgement),
    });
  }
}

export namespace RecvPacketResultV2 {
  export interface Amino {
    status: string,
    acknowledgement: string,
  }

  export interface Data {
    status: string,
    acknowledgement: string,
  }

  export type Proto = RecvPacketResultV2_pb;
}
