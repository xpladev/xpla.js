/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../../../util/json';
import { Convert } from '../../../../../../util/convert';
import { AccAddress } from '../../../../../bech32';
import { HeightV1 } from '../../../client/v1/Height';
import { PacketV1 } from '../Packet';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgTimeoutOnClose as MsgTimeoutOnCloseV1_pb } from '@xpla/xpla.proto/ibc/core/channel/v1/tx';

/**
 * MsgTimeoutOnClose timed-out packet upon counterparty channel closure.
 */
export class MsgTimeoutOnCloseV1 extends JSONSerializable<
  any,
  MsgTimeoutOnCloseV1.Data,
  MsgTimeoutOnCloseV1.Proto
> {
  /**
   * @param packet
   * @param proof_unreceived
   * @param proof_close
   * @param proof_height
   * @param next_seuqnce_recv
   * @param signer signer address
   */
  constructor(
    public packet: PacketV1 | undefined,
    public proof_unreceived: string,
    public proof_close: string,
    public proof_height: HeightV1 | undefined,
    public next_sequence_recv: number,
    public signer: AccAddress
  ) {
    super();
  }

  public static fromAmino(_: any, _isClassic?: boolean): MsgTimeoutOnCloseV1 {
    throw new Error('Amino not supported');
  }

  public toAmino(_?: boolean): any {
    throw new Error('Amino not supported');
  }

  public static fromData(
    data: MsgTimeoutOnCloseV1.Data,
    _?: boolean
  ): MsgTimeoutOnCloseV1 {
    const {
      packet,
      proof_unreceived,
      proof_close,
      proof_height,
      next_sequence_recv,
      signer,
    } = data;
    return new MsgTimeoutOnCloseV1(
      packet ? PacketV1.fromData(packet) : undefined,
      proof_close,
      proof_unreceived,
      proof_height ? HeightV1.fromData(proof_height) : undefined,
      Number.parseInt(next_sequence_recv),
      signer
    );
  }

  public toData(_?: boolean): MsgTimeoutOnCloseV1.Data {
    const {
      packet,
      proof_unreceived,
      proof_close,
      proof_height,
      next_sequence_recv,
      signer,
    } = this;
    return {
      '@type': '/ibc.core.channel.v1.MsgTimeoutOnClose',
      packet: packet ? packet.toData() : undefined,
      proof_unreceived,
      proof_close,
      proof_height: proof_height ? proof_height.toData() : undefined,
      next_sequence_recv: next_sequence_recv.toFixed(),
      signer,
    };
  }

  public static fromProto(
    proto: MsgTimeoutOnCloseV1.Proto,
    _?: boolean
  ): MsgTimeoutOnCloseV1 {
    return new MsgTimeoutOnCloseV1(
      proto.packet ? PacketV1.fromProto(proto.packet) : undefined,
      Convert.toBase64(proto.proofUnreceived),
      Convert.toBase64(proto.proofClose),
      proto.proofHeight ? HeightV1.fromProto(proto.proofHeight) : undefined,
      proto.nextSequenceRecv.toNumber(),
      proto.signer
    );
  }

  public toProto(_?: boolean): MsgTimeoutOnCloseV1.Proto {
    const {
      packet,
      proof_unreceived,
      proof_close,
      proof_height,
      next_sequence_recv,
      signer,
    } = this;
    return MsgTimeoutOnCloseV1_pb.fromPartial({
      packet: packet ? packet.toProto() : undefined,
      proofUnreceived: Convert.fromBase64(proof_unreceived),
      proofClose: Convert.fromBase64(proof_close),
      proofHeight: proof_height ? proof_height.toProto() : undefined,
      nextSequenceRecv: next_sequence_recv,
      signer,
    });
  }

  public packAny(_?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/ibc.core.channel.v1.MsgTimeoutOnClose',
      value: MsgTimeoutOnCloseV1_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgTimeoutOnCloseV1 {
    return MsgTimeoutOnCloseV1.fromProto(
      MsgTimeoutOnCloseV1_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgTimeoutOnCloseV1 {
  export interface Data {
    '@type': '/ibc.core.channel.v1.MsgTimeoutOnClose';
    packet?: PacketV1.Data;
    proof_unreceived: string;
    proof_close: string;
    proof_height?: HeightV1.Data;
    next_sequence_recv: string;
    signer: AccAddress;
  }
  export type Proto = MsgTimeoutOnCloseV1_pb;
}
