/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../../../util/json';
import { Convert } from '../../../../../../util/convert';
import { AccAddress } from '../../../../../bech32';
import { HeightV1 } from '../../../client/v1/Height';
import { PacketV1 } from '../Packet';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgAcknowledgement as MsgAcknowledgementV1_pb } from '@xpla/xpla.proto/ibc/core/channel/v1/tx';

/**
 * MsgAcknowledgement receives incoming IBC acknowledgement
 */
export class MsgAcknowledgementV1 extends JSONSerializable<
  any,
  MsgAcknowledgementV1.Data,
  MsgAcknowledgementV1.Proto
> {
  /**
   * @param packet
   * @param acknowledgement
   * @param proof_acked
   * @param proof_height
   * @param signer signer address
   */
  constructor(
    public packet: PacketV1 | undefined,
    public acknowledgement: string,
    public proof_acked: string,
    public proof_height: HeightV1 | undefined,
    public signer: AccAddress
  ) {
    super();
  }

  public static fromAmino(_: any, _isClassic?: boolean): MsgAcknowledgementV1 {
    throw new Error('Amino not supported');
  }

  public toAmino(_?: boolean): any {
    throw new Error('Amino not supported');
  }

  public static fromData(
    data: MsgAcknowledgementV1.Data,
    _?: boolean
  ): MsgAcknowledgementV1 {
    const { packet, acknowledgement, proof_acked, proof_height, signer } = data;
    return new MsgAcknowledgementV1(
      packet ? PacketV1.fromData(packet) : undefined,
      proof_acked,
      acknowledgement,
      proof_height ? HeightV1.fromData(proof_height) : undefined,
      signer
    );
  }

  public toData(_?: boolean): MsgAcknowledgementV1.Data {
    const { packet, acknowledgement, proof_acked, proof_height, signer } = this;
    return {
      '@type': '/ibc.core.channel.v1.MsgAcknowledgement',
      packet: packet ? packet.toData() : undefined,
      acknowledgement,
      proof_acked,
      proof_height: proof_height ? proof_height.toData() : undefined,
      signer,
    };
  }

  public static fromProto(
    proto: MsgAcknowledgementV1.Proto,
    _?: boolean
  ): MsgAcknowledgementV1 {
    return new MsgAcknowledgementV1(
      proto.packet ? PacketV1.fromProto(proto.packet) : undefined,
      Convert.toBase64(proto.acknowledgement),
      Convert.toBase64(proto.proofAcked),
      proto.proofHeight ? HeightV1.fromProto(proto.proofHeight) : undefined,
      proto.signer
    );
  }

  public toProto(_?: boolean): MsgAcknowledgementV1.Proto {
    const { packet, acknowledgement, proof_acked, proof_height, signer } = this;
    return MsgAcknowledgementV1_pb.fromPartial({
      packet: packet ? packet.toProto() : undefined,
      acknowledgement: Convert.fromBase64(acknowledgement),
      proofAcked: Convert.fromBase64(proof_acked),
      proofHeight: proof_height ? proof_height.toProto() : undefined,
      signer,
    });
  }

  public packAny(_?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/ibc.core.channel.v1.MsgAcknowledgement',
      value: MsgAcknowledgementV1_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgAcknowledgementV1 {
    return MsgAcknowledgementV1.fromProto(
      MsgAcknowledgementV1_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgAcknowledgementV1 {
  export interface Data {
    '@type': '/ibc.core.channel.v1.MsgAcknowledgement';
    packet?: PacketV1.Data;
    acknowledgement: string;
    proof_acked: string;
    proof_height?: HeightV1.Data;
    signer: AccAddress;
  }
  export type Proto = MsgAcknowledgementV1_pb;
}
