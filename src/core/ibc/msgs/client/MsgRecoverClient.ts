/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgRecoverClient as MsgRecoverClient_pb } from '@xpla/xpla.proto/ibc/core/client/v1/tx';

/**
 * MsgRecoverClient defines the message used to recover a frozen or expired client
 */
export class MsgRecoverClient extends JSONSerializable<
  any,
  MsgRecoverClient.Data,
  MsgRecoverClient.Proto
> {
  /**
   * @param subject_client_id the client identifier for the client to be updated if the proposal passes
   * @param substitute_client_id the substitute client identifier for the client which will replace the subject client
   * @param signer signer address
   */
  constructor(
    public subject_client_id: string,
    public substitute_client_id: string,
    public signer: AccAddress,
  ) {
    super();
  }

  public static fromAmino(_: any, _isClassic?: boolean): MsgRecoverClient {
    throw new Error('Amino not supported');
  }

  public toAmino(_?: boolean): any {
    throw new Error('Amino not supported');
  }

  public static fromData(
    data: MsgRecoverClient.Data,
    _?: boolean
  ): MsgRecoverClient {
    const {
      subject_client_id,
      substitute_client_id,
      signer,
    } = data;
    return new MsgRecoverClient(
      subject_client_id,
      substitute_client_id,
      signer,
    );
  }

  public toData(_?: boolean): MsgRecoverClient.Data {
    const {
      subject_client_id,
      substitute_client_id,
      signer,
    } = this;
    return {
      '@type': '/ibc.core.client.v1.MsgRecoverClient',
      subject_client_id,
      substitute_client_id,
      signer,
    };
  }

  public static fromProto(
    proto: MsgRecoverClient.Proto,
    _?: boolean
  ): MsgRecoverClient {
    return new MsgRecoverClient(
      proto.subjectClientId,
      proto.substituteClientId,
      proto.signer,
    );
  }

  public toProto(_?: boolean): MsgRecoverClient.Proto {
    const {
      subject_client_id,
      substitute_client_id,
      signer,
    } = this;
    return MsgRecoverClient_pb.fromPartial({
      subjectClientId: subject_client_id,
      substituteClientId: substitute_client_id,
      signer: signer,
    });
  }

  public packAny(_?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/ibc.core.client.v1.MsgRecoverClient',
      value: MsgRecoverClient_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgRecoverClient {
    return MsgRecoverClient.fromProto(MsgRecoverClient_pb.decode(msgAny.value));
  }
}

export namespace MsgRecoverClient {
  export interface Data {
    '@type': '/ibc.core.client.v1.MsgRecoverClient';
    subject_client_id: string;
    substitute_client_id: string;
    signer: AccAddress;
  }
  export type Proto = MsgRecoverClient_pb;
}
