/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../../../util/json';
import { AccAddress } from '../../../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgChannelCloseInit as MsgChannelCloseInitV1_pb } from '@xpla/xpla.proto/ibc/core/channel/v1/tx';

/**
 * MsgChannelCloseInit defines a msg sent by a Relayer to Chain A to close a channel with Chain B.
 */
export class MsgChannelCloseInitV1 extends JSONSerializable<
  any,
  MsgChannelCloseInitV1.Data,
  MsgChannelCloseInitV1.Proto
> {
  /**
   * @param port_id identifier of the port to use
   * @param channel channel info
   * @param signer signer address
   */
  constructor(
    public port_id: string,
    public channel_id: string,
    public signer: AccAddress
  ) {
    super();
  }

  public static fromAmino(_: any, _isClassic?: boolean): MsgChannelCloseInitV1 {
    throw new Error('Amino not supported');
  }

  public toAmino(_?: boolean): any {
    throw new Error('Amino not supported');
  }

  public static fromData(
    data: MsgChannelCloseInitV1.Data,
    _?: boolean
  ): MsgChannelCloseInitV1 {
    const { port_id, channel_id, signer } = data;
    return new MsgChannelCloseInitV1(port_id, channel_id, signer);
  }

  public toData(_?: boolean): MsgChannelCloseInitV1.Data {
    const { port_id, channel_id, signer } = this;
    return {
      '@type': '/ibc.core.channel.v1.MsgChannelCloseInit',
      port_id,
      channel_id,
      signer,
    };
  }

  public static fromProto(
    proto: MsgChannelCloseInitV1.Proto,
    _?: boolean
  ): MsgChannelCloseInitV1 {
    return new MsgChannelCloseInitV1(proto.portId, proto.channelId, proto.signer);
  }

  public toProto(_?: boolean): MsgChannelCloseInitV1.Proto {
    const { port_id, channel_id, signer } = this;
    return MsgChannelCloseInitV1_pb.fromPartial({
      portId: port_id,
      channelId: channel_id,
      signer,
    });
  }

  public packAny(_?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/ibc.core.channel.v1.MsgChannelCloseInit',
      value: MsgChannelCloseInitV1_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgChannelCloseInitV1 {
    return MsgChannelCloseInitV1.fromProto(
      MsgChannelCloseInitV1_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgChannelCloseInitV1 {
  export interface Data {
    '@type': '/ibc.core.channel.v1.MsgChannelCloseInit';
    port_id: string;
    channel_id: string;
    signer: AccAddress;
  }
  export type Proto = MsgChannelCloseInitV1_pb;
}
