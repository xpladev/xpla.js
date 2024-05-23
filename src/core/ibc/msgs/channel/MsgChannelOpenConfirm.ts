/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Height } from '../../core/client/Height';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgChannelOpenConfirm as MsgChannelOpenConfirm_pb } from '@xpla/xpla.proto/ibc/core/channel/v1/tx';

/**
 *  MsgChannelOpenConfirm defines a msg sent by a Relayer to Chain B to acknowledge the change of channel state to OPEN on Chain A.
 */
export class MsgChannelOpenConfirm extends JSONSerializable<
  any,
  MsgChannelOpenConfirm.Data,
  MsgChannelOpenConfirm.Proto
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
    public proof_height: Height | undefined,
    public signer: AccAddress
  ) {
    super();
  }

  public static fromAmino(_: any, _isClassic?: boolean): MsgChannelOpenConfirm {
    throw new Error('Amino not supported');
  }

  public toAmino(_?: boolean): any {
    throw new Error('Amino not supported');
  }

  public static fromData(
    data: MsgChannelOpenConfirm.Data,
    _?: boolean
  ): MsgChannelOpenConfirm {
    const { port_id, channel_id, proof_ack, proof_height, signer } = data;
    return new MsgChannelOpenConfirm(
      port_id,
      channel_id,
      proof_ack,
      proof_height ? Height.fromData(proof_height) : undefined,
      signer
    );
  }

  public toData(_?: boolean): MsgChannelOpenConfirm.Data {
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
    proto: MsgChannelOpenConfirm.Proto,
    _?: boolean
  ): MsgChannelOpenConfirm {
    return new MsgChannelOpenConfirm(
      proto.portId,
      proto.channelId,
      Buffer.from(proto.proofAck).toString('base64'),
      proto.proofHeight ? Height.fromProto(proto.proofHeight) : undefined,
      proto.signer
    );
  }

  public toProto(_?: boolean): MsgChannelOpenConfirm.Proto {
    const { port_id, channel_id, proof_ack, proof_height, signer } = this;
    return MsgChannelOpenConfirm_pb.fromPartial({
      portId: port_id,
      channelId: channel_id,
      proofAck: Buffer.from(proof_ack, 'base64'),
      proofHeight: proof_height ? proof_height.toProto() : undefined,
      signer,
    });
  }

  public packAny(_?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/ibc.core.channel.v1.MsgChannelOpenConfirm',
      value: MsgChannelOpenConfirm_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgChannelOpenConfirm {
    return MsgChannelOpenConfirm.fromProto(
      MsgChannelOpenConfirm_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgChannelOpenConfirm {
  export interface Data {
    '@type': '/ibc.core.channel.v1.MsgChannelOpenConfirm';
    port_id: string;
    channel_id: string;
    proof_ack: string;
    proof_height?: Height.Data;
    signer: AccAddress;
  }
  export type Proto = MsgChannelOpenConfirm_pb;
}
