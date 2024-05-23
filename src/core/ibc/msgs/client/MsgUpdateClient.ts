/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgUpdateClient as MsgUpdateClient_pb } from '@xpla/xpla.proto/ibc/core/client/v1/tx';
/**
 * MsgUpdateClient defines an sdk.Msg to update a IBC client state using the given header
 */
export class MsgUpdateClient extends JSONSerializable<
  any,
  MsgUpdateClient.Data,
  MsgUpdateClient.Proto
> {
  /**
   * @param client_id client unique identifier
   * @param client_message client message to update the light client
   * @param signer signer address
   */
  constructor(
    public client_id: string,
    public client_message: Any | undefined,
    public signer: string
  ) {
    super();
  }

  public static fromAmino(_: any, _isClassic?: boolean): MsgUpdateClient {
    throw new Error('Amino not supported');
  }

  public toAmino(): any {
    throw new Error('Amino not supported');
  }

  public static fromData(
    data: MsgUpdateClient.Data,
    _?: boolean
  ): MsgUpdateClient {
    const { client_id, client_message, signer } = data;
    return new MsgUpdateClient(client_id, client_message, signer);
  }

  public toData(_?: boolean): MsgUpdateClient.Data {
    const { client_id, client_message, signer } = this;
    return {
      '@type': '/ibc.core.client.v1.MsgUpdateClient',
      client_id,
      client_message,
      signer,
    };
  }

  public static fromProto(
    proto: MsgUpdateClient.Proto,
    _?: boolean
  ): MsgUpdateClient {
    return new MsgUpdateClient(
      proto.clientId,
      proto.clientMessage,
      proto.signer
    );
  }

  public toProto(_?: boolean): MsgUpdateClient.Proto {
    const { client_id, client_message, signer } = this;
    return MsgUpdateClient_pb.fromPartial({
      clientId: client_id,
      clientMessage: client_message,
      signer,
    });
  }

  public packAny(_?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/ibc.core.client.v1.MsgUpdateClient',
      value: MsgUpdateClient_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgUpdateClient {
    return MsgUpdateClient.fromProto(MsgUpdateClient_pb.decode(msgAny.value));
  }
}

export namespace MsgUpdateClient {
  export interface Data {
    '@type': '/ibc.core.client.v1.MsgUpdateClient';
    client_id: string;
    client_message?: Any;
    signer: AccAddress;
  }
  export type Proto = MsgUpdateClient_pb;
}
