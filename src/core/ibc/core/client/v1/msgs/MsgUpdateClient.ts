/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../../../util/json';
import { AccAddress } from '../../../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgUpdateClient as MsgUpdateClientV1_pb } from '@xpla/xpla.proto/ibc/core/client/v1/tx';
/**
 * MsgUpdateClient defines an sdk.Msg to update a IBC client state using the given header
 */
export class MsgUpdateClientV1 extends JSONSerializable<
  any,
  MsgUpdateClientV1.Data,
  MsgUpdateClientV1.Proto
> {
  /**
   * @param client_id client unique identifier
   * @param client_message client message to update the light client
   * @param signer signer address
   */
  constructor(
    public client_id: string,
    public client_message: any | undefined,
    public signer: AccAddress,
  ) {
    super();
  }

  public static fromAmino(_: any, _isClassic?: boolean): MsgUpdateClientV1 {
    throw new Error('Amino not supported');
  }

  public toAmino(): any {
    throw new Error('Amino not supported');
  }

  public static fromData(
    data: MsgUpdateClientV1.Data,
    _?: boolean
  ): MsgUpdateClientV1 {
    const { client_id, client_message, signer } = data;
    return new MsgUpdateClientV1(client_id, client_message, signer);
  }

  public toData(_?: boolean): MsgUpdateClientV1.Data {
    const { client_id, client_message, signer } = this;
    return {
      '@type': '/ibc.core.client.v1.MsgUpdateClient',
      client_id,
      client_message,
      signer,
    };
  }

  public static fromProto(
    proto: MsgUpdateClientV1.Proto,
    _?: boolean
  ): MsgUpdateClientV1 {
    return new MsgUpdateClientV1(
      proto.clientId,
      proto.clientMessage,
      proto.signer
    );
  }

  public toProto(_?: boolean): MsgUpdateClientV1.Proto {
    const { client_id, client_message, signer } = this;
    return MsgUpdateClientV1_pb.fromPartial({
      clientId: client_id,
      clientMessage: client_message,
      signer,
    });
  }

  public packAny(_?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/ibc.core.client.v1.MsgUpdateClient',
      value: MsgUpdateClientV1_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgUpdateClientV1 {
    return MsgUpdateClientV1.fromProto(MsgUpdateClientV1_pb.decode(msgAny.value));
  }
}

export namespace MsgUpdateClientV1 {
  export interface Data {
    '@type': '/ibc.core.client.v1.MsgUpdateClient';
    client_id: string;
    client_message: any | undefined;
    signer: AccAddress;
  }
  export type Proto = MsgUpdateClientV1_pb;
}
