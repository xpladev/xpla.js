/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../../../util/json';
import { Convert } from '../../../../../../util/convert';
import { AccAddress } from '../../../../../bech32';
import { HeightV1 } from '../../../client/v1/Height';
import { PacketV2 } from '../Packet';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgRecvPacket as MsgRecvPacketV2_pb } from '@xpla/xpla.proto/ibc/core/channel/v2/tx';

/** MsgRecvPacket receives an incoming IBC packet. */
export class MsgRecvPacketV2 extends JSONSerializable<
  any,
  MsgRecvPacketV2.Data,
  MsgRecvPacketV2.Proto
> {
  /**
   * @param packet
   * @param proof_commitment
   * @param proof_height
   * @param signer signer address
   */
  constructor(
    public packet: PacketV2 | undefined,
    public proof_commitment: string,
    public proof_height: HeightV1 | undefined,
    public signer: AccAddress
  ) {
    super();
  }

  public static fromAmino(_: any, _isClassic?: boolean): MsgRecvPacketV2 {
    throw new Error('Amino not supported');
  }

  public toAmino(_?: boolean): any {
    throw new Error('Amino not supported');
  }

  public static fromData(data: MsgRecvPacketV2.Data, _?: boolean): MsgRecvPacketV2 {
    const { packet, proof_commitment, proof_height, signer } = data;
    return new MsgRecvPacketV2(
      packet ? PacketV2.fromData(packet) : undefined,
      proof_commitment,
      proof_height ? HeightV1.fromData(proof_height) : undefined,
      signer
    );
  }

  public toData(_?: boolean): MsgRecvPacketV2.Data {
    const { packet, proof_commitment, proof_height, signer } = this;
    return {
      '@type': '/ibc.core.channel.v2.MsgRecvPacket',
      packet: packet ? packet.toData() : undefined,
      proof_commitment,
      proof_height: proof_height ? proof_height.toData() : undefined,
      signer,
    };
  }

  public static fromProto(
    proto: MsgRecvPacketV2.Proto,
    _?: boolean
  ): MsgRecvPacketV2 {
    return new MsgRecvPacketV2(
      proto.packet ? PacketV2.fromProto(proto.packet) : undefined,
      Convert.toBase64(proto.proofCommitment),
      proto.proofHeight ? HeightV1.fromProto(proto.proofHeight) : undefined,
      proto.signer
    );
  }

  public toProto(_?: boolean): MsgRecvPacketV2.Proto {
    const { packet, proof_commitment, proof_height, signer } = this;
    return MsgRecvPacketV2_pb.fromPartial({
      packet: packet ? packet.toProto() : undefined,
      proofCommitment: Convert.fromBase64(proof_commitment),
      proofHeight: proof_height ? proof_height.toProto() : undefined,
      signer,
    });
  }

  public packAny(_?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/ibc.core.channel.v2.MsgRecvPacket',
      value: MsgRecvPacketV2_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgRecvPacketV2 {
    return MsgRecvPacketV2.fromProto(MsgRecvPacketV2_pb.decode(msgAny.value));
  }
}

export namespace MsgRecvPacketV2 {
  export interface Data {
    '@type': '/ibc.core.channel.v2.MsgRecvPacket';
    packet?: PacketV2.Data;
    proof_commitment: string;
    proof_height?: HeightV1.Data;
    signer: AccAddress;
  }
  export type Proto = MsgRecvPacketV2_pb;
}
