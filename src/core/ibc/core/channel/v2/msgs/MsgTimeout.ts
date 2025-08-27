/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../../../util/json';
import { Convert } from '../../../../../../util/convert';
import { AccAddress } from '../../../../../bech32';
import { HeightV1 } from '../../../client/v1/Height';
import { PacketV2 } from '../Packet';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgTimeout as MsgTimeoutV2_pb } from '@xpla/xpla.proto/ibc/core/channel/v2/tx';

/** MsgTimeout receives timed-out packet */
export class MsgTimeoutV2 extends JSONSerializable<
  any,
  MsgTimeoutV2.Data,
  MsgTimeoutV2.Proto
> {
  /**
   * @param packet
   * @param proof_unreceived base64 encoded
   * @param proof_height
   * @param signer signer address
   */
  constructor(
    public packet: PacketV2 | undefined,
    public proof_unreceived: string,
    public proof_height: HeightV1 | undefined,
    public signer: AccAddress
  ) {
    super();
  }

  public static fromAmino(_: any, _isClassic?: boolean): MsgTimeoutV2 {
    throw new Error('Amino not supported');
  }

  public toAmino(_?: boolean): any {
    throw new Error('Amino not supported');
  }

  public static fromData(data: MsgTimeoutV2.Data, _?: boolean): MsgTimeoutV2 {
    const {
      packet,
      proof_unreceived,
      proof_height,
      signer,
    } = data;
    return new MsgTimeoutV2(
      packet ? PacketV2.fromData(packet) : undefined,
      proof_unreceived,
      proof_height ? HeightV1.fromData(proof_height) : undefined,
      signer,
    );
  }

  public toData(_?: boolean): MsgTimeoutV2.Data {
    const {
      packet,
      proof_unreceived,
      proof_height,
      signer,
    } = this;
    return {
      '@type': '/ibc.core.channel.v2.MsgTimeout',
      packet: packet ? packet.toData() : undefined,
      proof_unreceived,
      proof_height: proof_height ? proof_height.toData() : undefined,
      signer,
    };
  }

  public static fromProto(proto: MsgTimeoutV2.Proto, _?: boolean): MsgTimeoutV2 {
    return new MsgTimeoutV2(
      proto.packet ? PacketV2.fromProto(proto.packet) : undefined,
      Convert.toBase64(proto.proofUnreceived),
      proto.proofHeight ? HeightV1.fromProto(proto.proofHeight) : undefined,
      proto.signer,
    );
  }

  public toProto(_?: boolean): MsgTimeoutV2.Proto {
    const {
      packet,
      proof_unreceived,
      proof_height,
      signer,
    } = this;
    return MsgTimeoutV2_pb.fromPartial({
      packet: packet ? packet.toProto() : undefined,
      proofUnreceived: Convert.fromBase64(proof_unreceived),
      proofHeight: proof_height ? proof_height.toProto() : undefined,
      signer,
    });
  }

  public packAny(_?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/ibc.core.channel.v2.MsgTimeout',
      value: MsgTimeoutV2_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgTimeoutV2 {
    return MsgTimeoutV2.fromProto(MsgTimeoutV2_pb.decode(msgAny.value));
  }
}

export namespace MsgTimeoutV2 {
  export interface Data {
    '@type': '/ibc.core.channel.v2.MsgTimeout';
    packet?: PacketV2.Data;
    proof_unreceived: string;
    proof_height?: HeightV1.Data;
    signer: AccAddress;
  }
  export type Proto = MsgTimeoutV2_pb;
}
