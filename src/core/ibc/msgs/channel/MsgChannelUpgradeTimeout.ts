/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { Convert } from '../../../../util/convert';
import { AccAddress } from '../../../bech32';
import { Height } from '../../core/client/Height';
import { Channel } from '../../core/channel/Channel';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgChannelUpgradeTimeout as MsgChannelUpgradeTimeout_pb } from '@xpla/xpla.proto/ibc/core/channel/v1/tx';

export class MsgChannelUpgradeTimeout extends JSONSerializable<
  any,
  MsgChannelUpgradeTimeout.Data,
  MsgChannelUpgradeTimeout.Proto
> {
  public proof_channel: Buffer;

  /**
   * @param port_id
   * @param channel_id
   * @param counterparty_channel
   * @param proof_channel
   * @param proof_height
   * @param signer
   */
  constructor(
    public port_id: string,
    public channel_id: string,
    public counterparty_channel: Channel | undefined,
    proof_channel: Buffer | Uint8Array | number[] | string,
    public proof_height: Height | undefined,
    public signer: AccAddress,
  ) {
    super();
    this.proof_channel = Convert.toBuffer(proof_channel);
  }

  public static fromAmino(_: any, _isClassic?: boolean): MsgChannelUpgradeTimeout {
    throw new Error('Amino not supported');
  }

  public toAmino(_?: boolean): any {
    throw new Error('Amino not supported');
  }

  public static fromData(
    data: MsgChannelUpgradeTimeout.Data,
    _?: boolean
  ): MsgChannelUpgradeTimeout {
    const {
      port_id,
      channel_id,
      counterparty_channel,
      proof_channel,
      proof_height,
      signer,
    } = data;
    return new MsgChannelUpgradeTimeout(
      port_id,
      channel_id,
      counterparty_channel ? Channel.fromData(counterparty_channel) : undefined,
      proof_channel,
      proof_height ? Height.fromData(proof_height) : undefined,
      signer,
    );
  }

  public toData(_?: boolean): MsgChannelUpgradeTimeout.Data {
    const {
      port_id,
      channel_id,
      counterparty_channel,
      proof_channel,
      proof_height,
      signer,
    } = this;
    return {
      '@type': '/ibc.core.channel.v1.MsgChannelUpgradeTimeout',
      port_id,
      channel_id,
      counterparty_channel: counterparty_channel ? counterparty_channel.toData() : undefined,
      proof_channel: proof_channel.toString('base64'),
      proof_height: proof_height ? proof_height.toData() : undefined,
      signer,
    };
  }

  public static fromProto(
    proto: MsgChannelUpgradeTimeout.Proto,
    _?: boolean
  ): MsgChannelUpgradeTimeout {
    return new MsgChannelUpgradeTimeout(
      proto.portId,
      proto.channelId,
      proto.counterpartyChannel ? Channel.fromProto(proto.counterpartyChannel) : undefined,
      proto.proofChannel,
      proto.proofHeight ? Height.fromProto(proto.proofHeight) : undefined,
      proto.signer,
    );
  }

  public toProto(_?: boolean): MsgChannelUpgradeTimeout.Proto {
    const {
      port_id,
      channel_id,
      counterparty_channel,
      proof_channel,
      proof_height,
      signer,
    } = this;
    return MsgChannelUpgradeTimeout_pb.fromPartial({
      portId: port_id,
      channelId: channel_id,
      counterpartyChannel: counterparty_channel ? counterparty_channel.toProto() : undefined,
      proofChannel: proof_channel,
      proofHeight: proof_height ? proof_height.toProto() : undefined,
      signer,
    });
  }

  public packAny(_?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/ibc.core.channel.v1.MsgChannelUpgradeTimeout',
      value: MsgChannelUpgradeTimeout_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgChannelUpgradeTimeout {
    return MsgChannelUpgradeTimeout.fromProto(
      MsgChannelUpgradeTimeout_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgChannelUpgradeTimeout {
  export interface Data {
    '@type': '/ibc.core.channel.v1.MsgChannelUpgradeTimeout';
    port_id: string;
    channel_id: string;
    counterparty_channel: Channel.Data | undefined;
    proof_channel: string; // base64
    proof_height: Height.Data | undefined;
    signer: AccAddress;
  }
  export type Proto = MsgChannelUpgradeTimeout_pb;
}
