/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../../../util/json';
import { Convert } from '../../../../../../util/convert';
import { AccAddress } from '../../../../../bech32';
import { ChannelV1 } from '../Channel';
import { HeightV1 } from '../../../client/v1/Height';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgChannelOpenTry as MsgChannelOpenTryV1_pb } from '@xpla/xpla.proto/ibc/core/channel/v1/tx';

/**
 * MsgChannelOpenTry defines a msg sent by a Relayer to try to open a channel on Chain B
 */
export class MsgChannelOpenTryV1 extends JSONSerializable<
  any,
  MsgChannelOpenTryV1.Data,
  MsgChannelOpenTryV1.Proto
> {
  /**
   * @param port_id identifier of the port to use
   * @param previous_channel_id
   * @param channel channel info
   * @param counterparty_version
   * @param proof_init
   * @param proof_height
   * @param signer signer address
   */
  constructor(
    public port_id: string,
    public previous_channel_id: string,
    public channel: ChannelV1 | undefined,
    public counterparty_version: string,
    public proof_init: string,
    public proof_height: HeightV1 | undefined,
    public signer: AccAddress
  ) {
    super();
  }

  public static fromAmino(_: any, _isClassic?: boolean): MsgChannelOpenTryV1 {
    throw new Error('Amino not supported');
  }

  public toAmino(_?: boolean): any {
    throw new Error('Amino not supported');
  }

  public static fromData(
    data: MsgChannelOpenTryV1.Data,
    _?: boolean
  ): MsgChannelOpenTryV1 {
    const {
      port_id,
      previous_channel_id,
      channel,
      counterparty_version,
      proof_init,
      proof_height,
      signer,
    } = data;
    return new MsgChannelOpenTryV1(
      port_id,
      previous_channel_id,
      channel ? ChannelV1.fromData(channel) : undefined,
      counterparty_version,
      proof_init,
      proof_height ? HeightV1.fromData(proof_height) : undefined,
      signer
    );
  }

  public toData(_?: boolean): MsgChannelOpenTryV1.Data {
    const {
      port_id,
      previous_channel_id,
      channel,
      counterparty_version,
      proof_init,
      proof_height,
      signer,
    } = this;
    return {
      '@type': '/ibc.core.channel.v1.MsgChannelOpenTry',
      port_id,
      previous_channel_id,
      channel: channel ? channel.toData() : undefined,
      counterparty_version,
      proof_init,
      proof_height: proof_height ? proof_height.toData() : undefined,
      signer,
    };
  }

  public static fromProto(
    proto: MsgChannelOpenTryV1.Proto,
    _?: boolean
  ): MsgChannelOpenTryV1 {
    return new MsgChannelOpenTryV1(
      proto.portId,
      proto.previousChannelId,
      proto.channel ? ChannelV1.fromProto(proto.channel) : undefined,
      proto.counterpartyVersion,
      Convert.toBase64(proto.proofInit),
      proto.proofHeight ? HeightV1.fromProto(proto.proofHeight) : undefined,
      proto.signer
    );
  }

  public toProto(_?: boolean): MsgChannelOpenTryV1.Proto {
    const {
      port_id,
      previous_channel_id,
      channel,
      counterparty_version,
      proof_init,
      proof_height,
      signer,
    } = this;
    return MsgChannelOpenTryV1_pb.fromPartial({
      portId: port_id,
      previousChannelId: previous_channel_id,
      channel: channel ? channel.toProto() : undefined,
      counterpartyVersion: counterparty_version,
      proofInit: Convert.fromBase64(proof_init),
      proofHeight: proof_height ? proof_height.toProto() : undefined,
      signer,
    });
  }

  public packAny(_?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/ibc.core.channel.v1.MsgChannelOpenTry',
      value: MsgChannelOpenTryV1_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgChannelOpenTryV1 {
    return MsgChannelOpenTryV1.fromProto(
      MsgChannelOpenTryV1_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgChannelOpenTryV1 {
  export interface Data {
    '@type': '/ibc.core.channel.v1.MsgChannelOpenTry';
    port_id: string;
    previous_channel_id: string;
    channel?: ChannelV1.Data;
    counterparty_version: string;
    proof_init: string;
    proof_height?: HeightV1.Data;
    signer: AccAddress;
  }
  export type Proto = MsgChannelOpenTryV1_pb;
}
