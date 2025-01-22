/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { UpgradeFields } from '../../core/channel/Upgrade';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgChannelUpgradeInit as MsgChannelUpgradeInit_pb } from '@xpla/xpla.proto/ibc/core/channel/v1/tx';

export class MsgChannelUpgradeInit extends JSONSerializable<
  any,
  MsgChannelUpgradeInit.Data,
  MsgChannelUpgradeInit.Proto
> {
  /**
   * @param port_id identifier of the port to use
   * @param channel channel info
   * @param fields upgrade fields
   * @param signer signer address
   */
  constructor(
    public port_id: string,
    public channel_id: string,
    public fields: UpgradeFields | undefined,
    public signer: AccAddress,
  ) {
    super();
  }

  public static fromAmino(_: any, _isClassic?: boolean): MsgChannelUpgradeInit {
    throw new Error('Amino not supported');
  }

  public toAmino(_?: boolean): any {
    throw new Error('Amino not supported');
  }

  public static fromData(
    data: MsgChannelUpgradeInit.Data,
    _?: boolean
  ): MsgChannelUpgradeInit {
    const { port_id, channel_id, fields, signer } = data;
    return new MsgChannelUpgradeInit(
      port_id,
      channel_id,
      fields ? UpgradeFields.fromData(fields) : undefined,
      signer,
    );
  }

  public toData(_?: boolean): MsgChannelUpgradeInit.Data {
    const { port_id, channel_id, fields, signer } = this;
    return {
      '@type': '/ibc.core.channel.v1.MsgChannelUpgradeInit',
      port_id,
      channel_id,
      fields: fields ? fields.toData() : undefined,
      signer,
    };
  }

  public static fromProto(
    proto: MsgChannelUpgradeInit.Proto,
    _?: boolean
  ): MsgChannelUpgradeInit {
    return new MsgChannelUpgradeInit(
      proto.portId,
      proto.channelId,
      proto.fields ? UpgradeFields.fromProto(proto.fields) : undefined,
      proto.signer,
    );
  }

  public toProto(_?: boolean): MsgChannelUpgradeInit.Proto {
    const { port_id, channel_id, fields, signer } = this;
    return MsgChannelUpgradeInit_pb.fromPartial({
      portId: port_id,
      channelId: channel_id,
      fields: fields ? fields.toProto() : undefined,
      signer,
    });
  }

  public packAny(_?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/ibc.core.channel.v1.MsgChannelUpgradeInit',
      value: MsgChannelUpgradeInit_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgChannelUpgradeInit {
    return MsgChannelUpgradeInit.fromProto(
      MsgChannelUpgradeInit_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgChannelUpgradeInit {
  export interface Data {
    '@type': '/ibc.core.channel.v1.MsgChannelUpgradeInit';
    port_id: string;
    channel_id: string;
    fields: UpgradeFields.Data | undefined;
    signer: AccAddress;
  }
  export type Proto = MsgChannelUpgradeInit_pb;
}
