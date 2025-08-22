/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../../../util/json';
import { Convert } from '../../../../../../util/convert';
import { Numeric, Int } from '../../../../..';
import { AccAddress } from '../../../../../bech32';
import { HeightV1 } from '../../../client/v1/Height';
import { PayloadV2 } from '../Payload';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgSendPacket as MsgSendPacketV2_pb } from '@xpla/xpla.proto/ibc/core/channel/v2/tx';

/** MsgSendPacket sends an outgoing IBC packet. */
export class MsgSendPacketV2 extends JSONSerializable<
  any,
  MsgSendPacketV2.Data,
  MsgSendPacketV2.Proto
> {
  /**
   * @param sourceClient
   * @param timeoutTimestamp
   * @param payloads
   * @param signer signer address
   */
  constructor(
    public source_client: string,
    public timeout_timestamp: number,
    public payloads: PayloadV2[],
    public signer: AccAddress,
  ) {
    super();
  }

  public static fromAmino(_: any, isClassic?: boolean): MsgSendPacketV2 {
    isClassic;
    throw new Error('Amino not supported');
  }

  public toAmino(_?: boolean): any {
    throw new Error('Amino not supported');
  }

  public static fromData(
    data: MsgSendPacketV2.Data,
    _?: boolean
  ): MsgSendPacketV2 {
    const {
      source_client,
      timeout_timestamp,
      payloads,
      signer,
    } = data;
    return new MsgSendPacketV2(
      source_client,
      timeout_timestamp,
      payloads.map(PayloadV2.fromData),
      signer
    );
  }

  public toData(_?: boolean): MsgSendPacketV2.Data {
    const {
      source_client,
      timeout_timestamp,
      payloads,
      signer,
    } = this;
    return {
      '@type': '/ibc.core.channel.v2.MsgSendPacket',
      source_client,
      timeout_timestamp,
      payloads,
      signer,
    };
  }

  public static fromProto(
    proto: MsgSendPacketV2.Proto,
    _?: boolean
  ): MsgSendPacketV2 {
    return new MsgSendPacketV2(
      proto.sourceClient,
      proto.timeoutTimestamp.toNumber(),
      proto.payloads.map(PayloadV2.fromProto),
      proto.signer,
    );
  }

  public toProto(_?: boolean): MsgSendPacketV2.Proto {
    const {
      source_client,
      timeout_timestamp,
      payloads,
      signer,
    } = this;
    return MsgSendPacketV2_pb.fromPartial({
      sourceClient: source_client,
      timeoutTimestamp: timeout_timestamp,
      payloads: payloads.map((p) => p.toProto()),
      signer,
    });
  }

  public packAny(_?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/ibc.core.channel.v2.MsgSendPacket',
      value: MsgSendPacketV2_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgSendPacketV2 {
    return MsgSendPacketV2.fromProto(
      MsgSendPacketV2_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgSendPacketV2 {
  export interface Data {
    '@type': '/ibc.core.channel.v2.MsgSendPacket';
    source_client: string;
    timeout_timestamp: number;
    payloads: PayloadV2.Data[];
    signer: AccAddress;
  }
  export type Proto = MsgSendPacketV2_pb;
}
