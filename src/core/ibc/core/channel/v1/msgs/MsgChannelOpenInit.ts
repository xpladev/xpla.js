/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../../../util/json';
import { AccAddress } from '../../../../../bech32';
import { ChannelV1 } from '../Channel';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgChannelOpenInit as MsgChannelOpenInitV1_pb } from '@xpla/xpla.proto/ibc/core/channel/v1/tx';

/**
 * MsgChannelOpenInit defines an sdk.Msg to initialize a channel handshake. It is called by a relayer on Chain A.
 */
export class MsgChannelOpenInitV1 extends JSONSerializable<
  any,
  MsgChannelOpenInitV1.Data,
  MsgChannelOpenInitV1.Proto
> {
  /**
   * @param port_id identifier of the port to use
   * @param channel channel info
   * @param signer signer address
   */
  constructor(
    public port_id: string,
    public channel: ChannelV1 | undefined,
    public signer: AccAddress
  ) {
    super();
  }

  public static fromAmino(_: any, _isClassic?: boolean): MsgChannelOpenInitV1 {
    throw new Error('Amino not supported');
  }

  public toAmino(_?: boolean): any {
    throw new Error('Amino not supported');
  }

  public static fromData(
    data: MsgChannelOpenInitV1.Data,
    _?: boolean
  ): MsgChannelOpenInitV1 {
    const { port_id, channel, signer } = data;
    return new MsgChannelOpenInitV1(
      port_id,
      channel ? ChannelV1.fromData(channel) : undefined,
      signer
    );
  }

  public toData(_?: boolean): MsgChannelOpenInitV1.Data {
    const { port_id, channel, signer } = this;
    return {
      '@type': '/ibc.core.channel.v1.MsgChannelOpenInit',
      port_id,
      channel: channel ? channel.toData() : undefined,
      signer,
    };
  }

  public static fromProto(
    proto: MsgChannelOpenInitV1.Proto,
    _?: boolean
  ): MsgChannelOpenInitV1 {
    return new MsgChannelOpenInitV1(
      proto.portId,
      proto.channel ? ChannelV1.fromProto(proto.channel) : undefined,
      proto.signer
    );
  }

  public toProto(_?: boolean): MsgChannelOpenInitV1.Proto {
    const { port_id, channel, signer } = this;
    return MsgChannelOpenInitV1_pb.fromPartial({
      portId: port_id,
      channel: channel ? channel.toProto() : undefined,
      signer,
    });
  }

  public packAny(_?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/ibc.core.channel.v1.MsgChannelOpenInit',
      value: MsgChannelOpenInitV1_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgChannelOpenInitV1 {
    return MsgChannelOpenInitV1.fromProto(
      MsgChannelOpenInitV1_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgChannelOpenInitV1 {
  export interface Data {
    '@type': '/ibc.core.channel.v1.MsgChannelOpenInit';
    port_id: string;
    channel?: ChannelV1.Data;
    signer: AccAddress;
  }
  export type Proto = MsgChannelOpenInitV1_pb;
}
