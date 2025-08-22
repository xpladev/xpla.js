/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../../../util/json';
import { Convert } from '../../../../../../util/convert';
import { AccAddress } from '../../../../../bech32';
import { HeightV1 } from '../../../client/v1/Height';
import { PacketV2 } from '../Packet';
import { AcknowledgementV2 } from '../Acknowledgement';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgAcknowledgement as MsgAcknowledgementV2_pb } from '@xpla/xpla.proto/ibc/core/channel/v2/tx';

/**
 * MsgAcknowledgement receives incoming IBC acknowledgement
 */
export class MsgAcknowledgementV2 extends JSONSerializable<
  any,
  MsgAcknowledgementV2.Data,
  MsgAcknowledgementV2.Proto
> {
  /**
   * @param packet
   * @param acknowledgement
   * @param proof_acked base64 encoded
   * @param proof_height
   * @param signer signer address
   */
  constructor(
    public packet: PacketV2 | undefined,
    public acknowledgement: AcknowledgementV2 | undefined,
    public proof_acked: string,
    public proof_height: HeightV1 | undefined,
    public signer: AccAddress
  ) {
    super();
  }

  public static fromAmino(_: any, _isClassic?: boolean): MsgAcknowledgementV2 {
    throw new Error('Amino not supported');
  }

  public toAmino(_?: boolean): any {
    throw new Error('Amino not supported');
  }

  public static fromData(
    data: MsgAcknowledgementV2.Data,
    _?: boolean
  ): MsgAcknowledgementV2 {
    const {
      packet,
      acknowledgement,
      proof_acked,
      proof_height,
      signer,
    } = data;
    return new MsgAcknowledgementV2(
      packet ? PacketV2.fromData(packet) : undefined,
      acknowledgement ? AcknowledgementV2.fromData(acknowledgement) : undefined,
      proof_acked,
      proof_height ? HeightV1.fromData(proof_height) : undefined,
      signer
    );
  }

  public toData(_?: boolean): MsgAcknowledgementV2.Data {
    const { packet, acknowledgement, proof_acked, proof_height, signer } = this;
    return {
      '@type': '/ibc.core.channel.v2.MsgAcknowledgement',
      packet: packet ? packet.toData() : undefined,
      acknowledgement: acknowledgement ? acknowledgement.toData() : undefined,
      proof_acked,
      proof_height: proof_height ? proof_height.toData() : undefined,
      signer,
    };
  }

  public static fromProto(
    proto: MsgAcknowledgementV2.Proto,
    _?: boolean
  ): MsgAcknowledgementV2 {
    return new MsgAcknowledgementV2(
      proto.packet ? PacketV2.fromProto(proto.packet) : undefined,
      proto.acknowledgement ? AcknowledgementV2.fromProto(proto.acknowledgement) : undefined,
      Convert.toBase64(proto.proofAcked),
      proto.proofHeight ? HeightV1.fromProto(proto.proofHeight) : undefined,
      proto.signer
    );
  }

  public toProto(_?: boolean): MsgAcknowledgementV2.Proto {
    const { packet, acknowledgement, proof_acked, proof_height, signer } = this;
    return MsgAcknowledgementV2_pb.fromPartial({
      packet: packet ? packet.toProto() : undefined,
      acknowledgement: acknowledgement ? acknowledgement.toProto() : undefined,
      proofAcked: Convert.fromBase64(proof_acked),
      proofHeight: proof_height ? proof_height.toProto() : undefined,
      signer,
    });
  }

  public packAny(_?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/ibc.core.channel.v2.MsgAcknowledgement',
      value: MsgAcknowledgementV2_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgAcknowledgementV2 {
    return MsgAcknowledgementV2.fromProto(
      MsgAcknowledgementV2_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgAcknowledgementV2 {
  export interface Data {
    '@type': '/ibc.core.channel.v2.MsgAcknowledgement';
    packet: PacketV2.Data | undefined;
    acknowledgement: AcknowledgementV2.Data | undefined;
    proof_acked: string;
    proof_height: HeightV1.Data | undefined;
    signer: AccAddress;
  }
  export type Proto = MsgAcknowledgementV2_pb;
}
