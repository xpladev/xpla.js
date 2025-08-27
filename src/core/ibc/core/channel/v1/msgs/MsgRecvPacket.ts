/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../../../util/json';
import { Convert } from '../../../../../../util/convert';
import { AccAddress } from '../../../../../bech32';
import { HeightV1 } from '../../../client/v1/Height';
import { PacketV1 } from '../Packet';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgRecvPacket as MsgRecvPacketV1_pb } from '@xpla/xpla.proto/ibc/core/channel/v1/tx';

/**
 * MsgRecvPacket receives incoming IBC packet
 */
export class MsgRecvPacketV1 extends JSONSerializable<
  any,
  MsgRecvPacketV1.Data,
  MsgRecvPacketV1.Proto
> {
  /**
   * @param packet
   * @param proof_commitment
   * @param proof_height
   * @param signer signer address
   */
  constructor(
    public packet: PacketV1 | undefined,
    public proof_commitment: string,
    public proof_height: HeightV1 | undefined,
    public signer: AccAddress
  ) {
    super();
  }

  public static fromAmino(_: any, _isClassic?: boolean): MsgRecvPacketV1 {
    throw new Error('Amino not supported');
  }

  public toAmino(_?: boolean): any {
    throw new Error('Amino not supported');
  }

  public static fromData(data: MsgRecvPacketV1.Data, _?: boolean): MsgRecvPacketV1 {
    const { packet, proof_commitment, proof_height, signer } = data;
    return new MsgRecvPacketV1(
      packet ? PacketV1.fromData(packet) : undefined,
      proof_commitment,
      proof_height ? HeightV1.fromData(proof_height) : undefined,
      signer
    );
  }

  public toData(_?: boolean): MsgRecvPacketV1.Data {
    const { packet, proof_commitment, proof_height, signer } = this;
    return {
      '@type': '/ibc.core.channel.v1.MsgRecvPacket',
      packet: packet ? packet.toData() : undefined,
      proof_commitment,
      proof_height: proof_height ? proof_height.toData() : undefined,
      signer,
    };
  }

  public static fromProto(
    proto: MsgRecvPacketV1.Proto,
    _?: boolean
  ): MsgRecvPacketV1 {
    return new MsgRecvPacketV1(
      proto.packet ? PacketV1.fromProto(proto.packet) : undefined,
      Convert.toBase64(proto.proofCommitment),
      proto.proofHeight ? HeightV1.fromProto(proto.proofHeight) : undefined,
      proto.signer
    );
  }

  public toProto(_?: boolean): MsgRecvPacketV1.Proto {
    const { packet, proof_commitment, proof_height, signer } = this;
    return MsgRecvPacketV1_pb.fromPartial({
      packet: packet ? packet.toProto() : undefined,
      proofCommitment: Convert.fromBase64(proof_commitment),
      proofHeight: proof_height ? proof_height.toProto() : undefined,
      signer,
    });
  }

  public packAny(_?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/ibc.core.channel.v1.MsgRecvPacket',
      value: MsgRecvPacketV1_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgRecvPacketV1 {
    return MsgRecvPacketV1.fromProto(MsgRecvPacketV1_pb.decode(msgAny.value));
  }
}

export namespace MsgRecvPacketV1 {
  export interface Data {
    '@type': '/ibc.core.channel.v1.MsgRecvPacket';
    packet?: PacketV1.Data;
    proof_commitment: string;
    proof_height?: HeightV1.Data;
    signer: AccAddress;
  }
  export type Proto = MsgRecvPacketV1_pb;
}
