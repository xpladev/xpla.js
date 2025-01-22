import { JSONSerializable } from '../../../../../../../util/json';
import { InterchainAccountPacketDataV1 } from '../../../v1/PacketData';
import { Int, Numeric } from '../../../../../../numeric';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgSendTx as MsgSendTxV1_pb } from '@xpla/xpla.proto/ibc/applications/interchain_accounts/controller/v1/tx';

export class MsgSendTxV1 extends JSONSerializable<
  any,
  MsgSendTxV1.Data,
  MsgSendTxV1.Proto
> {
  public relative_timeout: Int;

  /**
   * @param owner
   * @param connection_id
   * @param packet_data
   * @param relative_timeout
   */
  constructor(
    public owner: string,
    public connection_id: string,
    public packet_data: InterchainAccountPacketDataV1,
    relative_timeout: Numeric.Input,
  ) {
    super();
    this.relative_timeout = new Int(relative_timeout);
  }

  public static fromAmino(_: any): MsgSendTxV1 {
    throw new Error('Amino not supported');
  }

  public toAmino(): any {
    throw new Error('Amino not supported');
  }

  public static fromData(
    data: MsgSendTxV1.Data,
  ): MsgSendTxV1 {
    const { owner, connection_id, packet_data, relative_timeout } = data;
    return new MsgSendTxV1(
      owner, connection_id,
      InterchainAccountPacketDataV1.fromData(packet_data),
      relative_timeout,
    );
  }

  public toData(): MsgSendTxV1.Data {
    const { owner, connection_id, packet_data, relative_timeout } = this;
    return {
      '@type': '/ibc.applications.interchain_accounts.controller.v1.MsgSendTx',
      owner, connection_id,
      packet_data: packet_data.toData(),
      relative_timeout: relative_timeout.toFixed(),
    };
  }

  public static fromProto(
    proto: MsgSendTxV1.Proto,
  ): MsgSendTxV1 {
    return new MsgSendTxV1(
      proto.owner,
      proto.connectionId,
      proto.packetData ? InterchainAccountPacketDataV1.fromProto(proto.packetData) : new InterchainAccountPacketDataV1(0, [], ''),
      proto.relativeTimeout.toString(),
    );
  }

  public toProto(): MsgSendTxV1.Proto {
    const { owner, connection_id, packet_data, relative_timeout } = this;
    return MsgSendTxV1_pb.fromPartial({
      owner,
      connectionId: connection_id,
      packetData: packet_data.toProto(),
      relativeTimeout: relative_timeout.toFixed(),
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/ibc.applications.interchain_accounts.controller.v1.MsgSendTx',
      value: MsgSendTxV1_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
  ): MsgSendTxV1 {
    return MsgSendTxV1.fromProto(
      MsgSendTxV1_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgSendTxV1 {
  export interface Data {
    '@type': '/ibc.applications.interchain_accounts.controller.v1.MsgSendTx';
    owner: string,
    connection_id: string,
    packet_data: InterchainAccountPacketDataV1.Data,
    relative_timeout: string,
  }

  export type Proto = MsgSendTxV1_pb;
}
