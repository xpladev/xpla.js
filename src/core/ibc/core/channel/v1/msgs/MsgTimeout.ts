/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../../../util/json';
import { Convert } from '../../../../../../util/convert';
import { AccAddress } from '../../../../../bech32';
import { HeightV1 } from '../../../client/v1/Height';
import { PacketV1 } from '../Packet';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgTimeout as MsgTimeoutV1_pb } from '@xpla/xpla.proto/ibc/core/channel/v1/tx';

/**
 * MsgTimeout receives timed-out packet
 */
export class MsgTimeoutV1 extends JSONSerializable<
  any,
  MsgTimeoutV1.Data,
  MsgTimeoutV1.Proto
> {
  /**
   * @param packet
   * @param proof_unreceived
   * @param proof_height
   * @param next_seuqnce_recv
   * @param signer signer address
   */
  constructor(
    public packet: PacketV1 | undefined,
    public proof_unreceived: string,
    public proof_height: HeightV1 | undefined,
    public next_sequence_recv: number,
    public signer: AccAddress
  ) {
    super();
  }

  public static fromAmino(_: any, _isClassic?: boolean): MsgTimeoutV1 {
    throw new Error('Amino not supported');
  }

  public toAmino(_?: boolean): any {
    throw new Error('Amino not supported');
  }

  public static fromData(data: MsgTimeoutV1.Data, _?: boolean): MsgTimeoutV1 {
    const {
      packet,
      proof_unreceived,
      proof_height,
      next_sequence_recv,
      signer,
    } = data;
    return new MsgTimeoutV1(
      packet ? PacketV1.fromData(packet) : undefined,
      proof_unreceived,
      proof_height ? HeightV1.fromData(proof_height) : undefined,
      Number.parseInt(next_sequence_recv),
      signer
    );
  }

  public toData(_?: boolean): MsgTimeoutV1.Data {
    const {
      packet,
      proof_unreceived,
      proof_height,
      next_sequence_recv,
      signer,
    } = this;
    return {
      '@type': '/ibc.core.channel.v1.MsgTimeout',
      packet: packet ? packet.toData() : undefined,
      proof_unreceived,
      proof_height: proof_height ? proof_height.toData() : undefined,
      next_sequence_recv: next_sequence_recv.toFixed(),
      signer,
    };
  }

  public static fromProto(proto: MsgTimeoutV1.Proto, _?: boolean): MsgTimeoutV1 {
    return new MsgTimeoutV1(
      proto.packet ? PacketV1.fromProto(proto.packet) : undefined,
      Convert.toBase64(proto.proofUnreceived),
      proto.proofHeight ? HeightV1.fromProto(proto.proofHeight) : undefined,
      proto.nextSequenceRecv.toNumber(),
      proto.signer
    );
  }

  public toProto(_?: boolean): MsgTimeoutV1.Proto {
    const {
      packet,
      proof_unreceived,
      proof_height,
      next_sequence_recv,
      signer,
    } = this;
    return MsgTimeoutV1_pb.fromPartial({
      packet: packet ? packet.toProto() : undefined,
      proofUnreceived: Convert.fromBase64(proof_unreceived),
      proofHeight: proof_height ? proof_height.toProto() : undefined,
      nextSequenceRecv: next_sequence_recv,
      signer,
    });
  }

  public packAny(_?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/ibc.core.channel.v1.MsgTimeout',
      value: MsgTimeoutV1_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgTimeoutV1 {
    return MsgTimeoutV1.fromProto(MsgTimeoutV1_pb.decode(msgAny.value));
  }
}

export namespace MsgTimeoutV1 {
  export interface Data {
    '@type': '/ibc.core.channel.v1.MsgTimeout';
    packet?: PacketV1.Data;
    proof_unreceived: string;
    proof_height?: HeightV1.Data;
    next_sequence_recv: string;
    signer: AccAddress;
  }
  export type Proto = MsgTimeoutV1_pb;
}
