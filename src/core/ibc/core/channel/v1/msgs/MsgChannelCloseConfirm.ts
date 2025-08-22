/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../../../util/json';
import { Convert } from '../../../../../../util/convert';
import { AccAddress } from '../../../../../bech32';
import { HeightV1 } from '../../../client/v1/Height';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgChannelCloseConfirm as MsgChannelCloseConfirmV1_pb } from '@xpla/xpla.proto/ibc/core/channel/v1/tx';

/**
 * MsgChannelCloseConfirm defines a msg sent by a Relayer to Chain B to acknowledge the change of channel state to CLOSED on Chain A.
 */
export class MsgChannelCloseConfirmV1 extends JSONSerializable<
  any,
  MsgChannelCloseConfirmV1.Data,
  MsgChannelCloseConfirmV1.Proto
> {
  /**
   * @param port_id identifier of the port to use
   * @param channel_id
   * @param proof_init
   * @param proof_height
   * @param signer signer address
   */
  constructor(
    public port_id: string,
    public channel_id: string,
    public proof_init: string,
    public proof_height: HeightV1 | undefined,
    public signer: AccAddress
  ) {
    super();
  }

  public static fromAmino(_: any, isClassic?: boolean): MsgChannelCloseConfirmV1 {
    isClassic;
    throw new Error('Amino not supported');
  }

  public toAmino(_?: boolean): any {
    throw new Error('Amino not supported');
  }

  public static fromData(
    data: MsgChannelCloseConfirmV1.Data,
    _?: boolean
  ): MsgChannelCloseConfirmV1 {
    const { port_id, channel_id, proof_init, proof_height, signer } = data;
    return new MsgChannelCloseConfirmV1(
      port_id,
      channel_id,
      proof_init,
      proof_height ? HeightV1.fromData(proof_height) : undefined,
      signer
    );
  }

  public toData(_?: boolean): MsgChannelCloseConfirmV1.Data {
    const { port_id, channel_id, proof_init, proof_height, signer } = this;
    return {
      '@type': '/ibc.core.channel.v1.MsgChannelCloseConfirm',
      port_id,
      channel_id,
      proof_init,
      proof_height: proof_height ? proof_height.toData() : undefined,
      signer,
    };
  }

  public static fromProto(
    proto: MsgChannelCloseConfirmV1.Proto,
    _?: boolean
  ): MsgChannelCloseConfirmV1 {
    return new MsgChannelCloseConfirmV1(
      proto.portId,
      proto.channelId,
      Convert.toBase64(proto.proofInit),
      proto.proofHeight ? HeightV1.fromProto(proto.proofHeight) : undefined,
      proto.signer
    );
  }

  public toProto(_?: boolean): MsgChannelCloseConfirmV1.Proto {
    const { port_id, channel_id, proof_init, proof_height, signer } = this;
    return MsgChannelCloseConfirmV1_pb.fromPartial({
      portId: port_id,
      channelId: channel_id,
      proofInit: Convert.fromBase64(proof_init),
      proofHeight: proof_height ? proof_height.toProto() : undefined,
      signer,
    });
  }

  public packAny(_?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/ibc.core.channel.v1.MsgChannelCloseConfirm',
      value: MsgChannelCloseConfirmV1_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgChannelCloseConfirmV1 {
    return MsgChannelCloseConfirmV1.fromProto(
      MsgChannelCloseConfirmV1_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgChannelCloseConfirmV1 {
  export interface Data {
    '@type': '/ibc.core.channel.v1.MsgChannelCloseConfirm';
    port_id: string;
    channel_id: string;
    proof_init: string;
    proof_height?: HeightV1.Data;
    signer: AccAddress;
  }
  export type Proto = MsgChannelCloseConfirmV1_pb;
}
