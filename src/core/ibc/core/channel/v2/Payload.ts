import { JSONSerializable } from '../../../../../util/json';
import { Convert } from '../../../../../util/convert';
import { Payload as PayloadV2_pb } from '@xpla/xpla.proto/ibc/core/channel/v2/packet';

/** Payload contains the source and destination ports and payload for the application (version, encoding, raw bytes) */
export class PayloadV2 extends JSONSerializable<
  PayloadV2.Amino,
  PayloadV2.Data,
  PayloadV2.Proto
> {
  /**
   * @param source_port specifies the source port of the packet.
   * @param destination_port specifies the destination port of the packet.
   * @param version version of the specified application.
   * @param encoding the encoding used for the provided value.
   * @param value base64 encoded, the raw bytes for the payload.
   */
  constructor(
    public source_port: string,
    public destination_port: string,
    public version: string,
    public encoding: string,
    public value: string,
  ) {
    super();
  }

  public static fromAmino(_data: PayloadV2.Amino): PayloadV2 {
    const {
      source_port,
      destination_port,
      version,
      encoding,
      value,
    } = _data;
    return new PayloadV2(
      source_port,
      destination_port,
      version,
      encoding,
      value,
    );
  }

  public toAmino(): PayloadV2.Amino {
    const {
      source_port,
      destination_port,
      version,
      encoding,
      value,
    } = this;
    const res: PayloadV2.Amino = {
      source_port,
      destination_port,
      version,
      encoding,
      value,
    };
    return res;
  }

  public static fromData(_data: PayloadV2.Data): PayloadV2 {
    const {
      source_port,
      destination_port,
      version,
      encoding,
      value,
    } = _data;
    return new PayloadV2(
      source_port,
      destination_port,
      version,
      encoding,
      value,
    );
  }

  public toData(): PayloadV2.Data {
    const {
      source_port,
      destination_port,
      version,
      encoding,
      value,
    } = this;
    const res: PayloadV2.Data = {
      source_port,
      destination_port,
      version,
      encoding,
      value,
    };
    return res;
  }

  public static fromProto(proto: PayloadV2.Proto): PayloadV2 {
    return new PayloadV2(
      proto.sourcePort,
      proto.destinationPort,
      proto.version,
      proto.encoding,
      Convert.toBase64(proto.value),
    );
  }

  public toProto(): PayloadV2.Proto {
    const {
      source_port,
      destination_port,
      version,
      encoding,
      value,
    } = this;
    return PayloadV2_pb.fromPartial({
      sourcePort: source_port,
      destinationPort: destination_port,
      version,
      encoding,
      value: Convert.fromBase64(value),
    });
  }
}

export namespace PayloadV2 {
  export interface Amino {
    source_port: string;
    destination_port: string;
    version: string;
    encoding: string;
    value: string;
  }

  export interface Data {
    source_port: string;
    destination_port: string;
    version: string;
    encoding: string;
    value: string;
  }

  export type Proto = PayloadV2_pb;
}
