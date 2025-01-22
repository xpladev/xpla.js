/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { Int, Numeric } from '../../../numeric';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgIBCCloseChannel as MsgIBCCloseChannelV1_pb } from '@xpla/xpla.proto/cosmwasm/wasm/v1/ibc';

export class MsgIBCCloseChannelV1 extends JSONSerializable<
  MsgIBCCloseChannelV1.Amino,
  MsgIBCCloseChannelV1.Data,
  MsgIBCCloseChannelV1.Proto
> {
  /**
   * @param channel by which the packet will be sent
   */
  constructor(
    public channel: string,
  ) {
    super();
  }

  public static fromAmino(
    data_: MsgIBCCloseChannelV1.Amino,
    _isClassic?: boolean
  ): MsgIBCCloseChannelV1 {
    const { channel } = data_;
    return new MsgIBCCloseChannelV1(
      channel ?? '',
    );
  }

  public toAmino(_isClassic?: boolean): MsgIBCCloseChannelV1.Amino {
    const { channel } = this;
    return {
      type: undefined,
      channel: channel.length > 0 ? channel : undefined,
    };
  }

  public static fromProto(
    proto: MsgIBCCloseChannelV1.Proto,
    _isClassic?: boolean
  ): MsgIBCCloseChannelV1 {
    return new MsgIBCCloseChannelV1(
      proto.channel,
    );
  }

  public toProto(_isClassic?: boolean): MsgIBCCloseChannelV1.Proto {
    const { channel } = this;
    return MsgIBCCloseChannelV1_pb.fromPartial({
      channel,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmwasm.wasm.v1.MsgIBCCloseChannel',
      value: MsgIBCCloseChannelV1_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(msgAny: Any, isClassic?: boolean): MsgIBCCloseChannelV1 {
    return MsgIBCCloseChannelV1.fromProto(
      MsgIBCCloseChannelV1_pb.decode(msgAny.value),
      isClassic
    );
  }

  public static fromData(
    data_: MsgIBCCloseChannelV1.Data,
    _isClassic?: boolean
  ): MsgIBCCloseChannelV1 {
    const { channel } = data_;
    return new MsgIBCCloseChannelV1(
      channel,
    );
  }

  public toData(_isClassic?: boolean): MsgIBCCloseChannelV1.Data {
    const { channel } = this;
    return {
      '@type': '/cosmwasm.wasm.v1.MsgIBCCloseChannel',
      channel,
    };
  }
}

export namespace MsgIBCCloseChannelV1 {
  export interface Amino {
    type: 'wasm/MsgIBCCloseChannel' | undefined;
    channel?: string;
  }

  export interface Data {
    '@type': '/cosmwasm.wasm.v1.MsgIBCCloseChannel';
    channel: string;
  }

  export type Proto = MsgIBCCloseChannelV1_pb;
}
