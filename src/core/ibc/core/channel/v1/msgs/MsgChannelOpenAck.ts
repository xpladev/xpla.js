/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../../../util/json';
import { Convert } from '../../../../../../util/convert';
import { AccAddress } from '../../../../../bech32';
import { HeightV1 } from '../../../client/v1/Height';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgChannelOpenAck as MsgChannelOpenAckV1_pb } from '@xpla/xpla.proto/ibc/core/channel/v1/tx';

/**
 * MsgChannelOpenAck defines a msg sent by a Relayer to Chain A to acknowledge the change of channel state to TRYOPEN on Chain B.
 */
export class MsgChannelOpenAckV1 extends JSONSerializable<
  any,
  MsgChannelOpenAckV1.Data,
  MsgChannelOpenAckV1.Proto
> {
  /**
   * @param port_id identifier of the port to use
   * @param channel_id
   * @param counterparty_channel_id
   * @param counterparty_version
   * @param proof_try
   * @param proof_height
   * @param signer signer address
   */
  constructor(
    public port_id: string,
    public channel_id: string,
    public counterparty_channel_id: string,
    public counterparty_version: string,
    public proof_try: string,
    public proof_height: HeightV1 | undefined,
    public signer: AccAddress
  ) {
    super();
  }

  public static fromAmino(_: any, _isClassic?: boolean): MsgChannelOpenAckV1 {
    throw new Error('Amino not supported');
  }

  public toAmino(_?: boolean): any {
    throw new Error('Amino not supported');
  }

  public static fromData(
    data: MsgChannelOpenAckV1.Data,
    _?: boolean
  ): MsgChannelOpenAckV1 {
    const {
      port_id,
      channel_id,
      counterparty_channel_id,
      counterparty_version,
      proof_try,
      proof_height,
      signer,
    } = data;
    return new MsgChannelOpenAckV1(
      port_id,
      channel_id,
      counterparty_channel_id,
      counterparty_version,
      proof_try,
      proof_height ? HeightV1.fromData(proof_height) : undefined,
      signer
    );
  }

  public toData(_?: boolean): MsgChannelOpenAckV1.Data {
    const {
      port_id,
      channel_id,
      counterparty_channel_id,
      counterparty_version,
      proof_try,
      proof_height,
      signer,
    } = this;
    return {
      '@type': '/ibc.core.channel.v1.MsgChannelOpenAck',
      port_id,
      channel_id,
      counterparty_channel_id,
      counterparty_version,
      proof_try,
      proof_height: proof_height ? proof_height.toData() : undefined,
      signer,
    };
  }

  public static fromProto(
    proto: MsgChannelOpenAckV1.Proto,
    _?: boolean
  ): MsgChannelOpenAckV1 {
    return new MsgChannelOpenAckV1(
      proto.portId,
      proto.channelId,
      proto.counterpartyChannelId,
      proto.counterpartyVersion,
      Convert.toBase64(proto.proofTry),
      proto.proofHeight ? HeightV1.fromProto(proto.proofHeight) : undefined,
      proto.signer
    );
  }

  public toProto(_?: boolean): MsgChannelOpenAckV1.Proto {
    const {
      port_id,
      channel_id,
      counterparty_channel_id,
      counterparty_version,
      proof_try,
      proof_height,
      signer,
    } = this;
    return MsgChannelOpenAckV1_pb.fromPartial({
      portId: port_id,
      channelId: channel_id,
      counterpartyChannelId: counterparty_channel_id,
      counterpartyVersion: counterparty_version,
      proofTry: Convert.fromBase64(proof_try),
      proofHeight: proof_height ? proof_height.toProto() : undefined,
      signer,
    });
  }

  public packAny(_?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/ibc.core.channel.v1.MsgChannelOpenAck',
      value: MsgChannelOpenAckV1_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgChannelOpenAckV1 {
    return MsgChannelOpenAckV1.fromProto(
      MsgChannelOpenAckV1_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgChannelOpenAckV1 {
  export interface Data {
    '@type': '/ibc.core.channel.v1.MsgChannelOpenAck';
    port_id: string;
    channel_id: string;
    counterparty_channel_id: string;
    counterparty_version: string;
    proof_try: string;
    proof_height?: HeightV1.Data;
    signer: AccAddress;
  }
  export type Proto = MsgChannelOpenAckV1_pb;
}
