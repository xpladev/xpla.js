/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../../../util/json';
import { Convert } from '../../../../../../util/convert';
import { AccAddress } from '../../../../../bech32';
import { HeightV1 } from '../../../client/v1/Height';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgChannelOpenConfirm as MsgChannelOpenConfirmV1_pb } from '@xpla/xpla.proto/ibc/core/channel/v1/tx';

/**
 *  MsgChannelOpenConfirm defines a msg sent by a Relayer to Chain B to acknowledge the change of channel state to OPEN on Chain A.
 */
export class MsgChannelOpenConfirmV1 extends JSONSerializable<
  any,
  MsgChannelOpenConfirmV1.Data,
  MsgChannelOpenConfirmV1.Proto
> {
  /**
   * @param port_id identifier of the port to use
   * @param channel_id
   * @param proof_ack
   * @param proof_height
   * @param signer signer address
   */
  constructor(
    public port_id: string,
    public channel_id: string,
    public proof_ack: string,
    public proof_height: HeightV1 | undefined,
    public signer: AccAddress
  ) {
    super();
  }

  public static fromAmino(_: any, _isClassic?: boolean): MsgChannelOpenConfirmV1 {
    throw new Error('Amino not supported');
  }

  public toAmino(_?: boolean): any {
    throw new Error('Amino not supported');
  }

  public static fromData(
    data: MsgChannelOpenConfirmV1.Data,
    _?: boolean
  ): MsgChannelOpenConfirmV1 {
    const { port_id, channel_id, proof_ack, proof_height, signer } = data;
    return new MsgChannelOpenConfirmV1(
      port_id,
      channel_id,
      proof_ack,
      proof_height ? HeightV1.fromData(proof_height) : undefined,
      signer
    );
  }

  public toData(_?: boolean): MsgChannelOpenConfirmV1.Data {
    const { port_id, channel_id, proof_ack, proof_height, signer } = this;
    return {
      '@type': '/ibc.core.channel.v1.MsgChannelOpenConfirm',
      port_id,
      channel_id,
      proof_ack,
      proof_height: proof_height ? proof_height.toData() : undefined,
      signer,
    };
  }

  public static fromProto(
    proto: MsgChannelOpenConfirmV1.Proto,
    _?: boolean
  ): MsgChannelOpenConfirmV1 {
    return new MsgChannelOpenConfirmV1(
      proto.portId,
      proto.channelId,
      Convert.toBase64(proto.proofAck),
      proto.proofHeight ? HeightV1.fromProto(proto.proofHeight) : undefined,
      proto.signer
    );
  }

  public toProto(_?: boolean): MsgChannelOpenConfirmV1.Proto {
    const { port_id, channel_id, proof_ack, proof_height, signer } = this;
    return MsgChannelOpenConfirmV1_pb.fromPartial({
      portId: port_id,
      channelId: channel_id,
      proofAck: Convert.fromBase64(proof_ack),
      proofHeight: proof_height ? proof_height.toProto() : undefined,
      signer,
    });
  }

  public packAny(_?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/ibc.core.channel.v1.MsgChannelOpenConfirm',
      value: MsgChannelOpenConfirmV1_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgChannelOpenConfirmV1 {
    return MsgChannelOpenConfirmV1.fromProto(
      MsgChannelOpenConfirmV1_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgChannelOpenConfirmV1 {
  export interface Data {
    '@type': '/ibc.core.channel.v1.MsgChannelOpenConfirm';
    port_id: string;
    channel_id: string;
    proof_ack: string;
    proof_height?: HeightV1.Data;
    signer: AccAddress;
  }
  export type Proto = MsgChannelOpenConfirmV1_pb;
}
