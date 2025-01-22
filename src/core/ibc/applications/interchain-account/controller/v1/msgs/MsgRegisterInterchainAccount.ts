/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../../../../util/json';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgRegisterInterchainAccount as MsgRegisterInterchainAccountV1_pb } from '@xpla/xpla.proto/ibc/applications/interchain_accounts/controller/v1/tx';
import { Order as IbcChannelOrderV1, orderToJSON, orderFromJSON } from '@xpla/xpla.proto/ibc/core/channel/v1/channel';

export class MsgRegisterInterchainAccountV1 extends JSONSerializable<
  any,
  MsgRegisterInterchainAccountV1.Data,
  MsgRegisterInterchainAccountV1.Proto
> {
  /**
   * @param owner
   * @param connection_id
   * @param version
   * @param ordering
   */
  constructor(
    public owner: string,
    public connection_id: string,
    public version: string,
    public ordering: IbcChannelOrderV1,
  ) {
    super();
  }

  public static fromAmino(_: any): MsgRegisterInterchainAccountV1 {
    throw new Error('Amino not supported');
  }

  public toAmino(): any {
    throw new Error('Amino not supported');
  }

  public static fromData(
    data: MsgRegisterInterchainAccountV1.Data,
  ): MsgRegisterInterchainAccountV1 {
    const { owner, connection_id, version, ordering } = data;
    return new MsgRegisterInterchainAccountV1(
      owner, connection_id, version,
      orderFromJSON(ordering),
    );
  }

  public toData(): MsgRegisterInterchainAccountV1.Data {
    const { owner, connection_id, version, ordering } = this;
    return {
      '@type': '/ibc.applications.interchain_accounts.controller.v1.MsgRegisterInterchainAccount',
      owner, connection_id, version,
      ordering: orderToJSON(ordering),
    };
  }

  public static fromProto(
    proto: MsgRegisterInterchainAccountV1.Proto,
  ): MsgRegisterInterchainAccountV1 {
    return new MsgRegisterInterchainAccountV1(
      proto.owner,
      proto.connectionId,
      proto.version,
      proto.ordering,
    );
  }

  public toProto(): MsgRegisterInterchainAccountV1.Proto {
    const { owner, connection_id, version, ordering } = this;
    return MsgRegisterInterchainAccountV1_pb.fromPartial({
      owner,
      connectionId: connection_id,
      version,
      ordering,
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/ibc.applications.interchain_accounts.controller.v1.MsgRegisterInterchainAccount',
      value: MsgRegisterInterchainAccountV1_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
  ): MsgRegisterInterchainAccountV1 {
    return MsgRegisterInterchainAccountV1.fromProto(
      MsgRegisterInterchainAccountV1_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgRegisterInterchainAccountV1 {
  export interface Data {
    '@type': '/ibc.applications.interchain_accounts.controller.v1.MsgRegisterInterchainAccount';
    owner: string,
    connection_id: string,
    version: string,
    ordering: string,
  }

  export type Proto = MsgRegisterInterchainAccountV1_pb;
}
