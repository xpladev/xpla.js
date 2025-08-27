/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../../../util/json';
import { AccAddress } from '../../../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgRecoverClient as MsgRecoverClientV1_pb } from '@xpla/xpla.proto/ibc/core/client/v1/tx';

/**
 * MsgRecoverClient defines the message used to recover a frozen or expired client
 */
export class MsgRecoverClientV1 extends JSONSerializable<
  any,
  MsgRecoverClientV1.Data,
  MsgRecoverClientV1.Proto
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

  public static fromAmino(_: any, _isClassic?: boolean): MsgRecoverClientV1 {
    throw new Error('Amino not supported');
  }

  public toAmino(_?: boolean): any {
    throw new Error('Amino not supported');
  }

  public static fromData(
    data: MsgRecoverClientV1.Data,
    _?: boolean
  ): MsgRecoverClientV1 {
    const {
      subject_client_id,
      substitute_client_id,
      signer,
    } = data;
    return new MsgRecoverClientV1(
      subject_client_id,
      substitute_client_id,
      signer,
    );
  }

  public toData(_?: boolean): MsgRecoverClientV1.Data {
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
    proto: MsgRecoverClientV1.Proto,
    _?: boolean
  ): MsgRecoverClientV1 {
    return new MsgRecoverClientV1(
      proto.subjectClientId,
      proto.substituteClientId,
      proto.signer,
    );
  }

  public toProto(_?: boolean): MsgRecoverClientV1.Proto {
    const {
      subject_client_id,
      substitute_client_id,
      signer,
    } = this;
    return MsgRecoverClientV1_pb.fromPartial({
      subjectClientId: subject_client_id,
      substituteClientId: substitute_client_id,
      signer: signer,
    });
  }

  public packAny(_?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/ibc.core.client.v1.MsgRecoverClient',
      value: MsgRecoverClientV1_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgRecoverClientV1 {
    return MsgRecoverClientV1.fromProto(MsgRecoverClientV1_pb.decode(msgAny.value));
  }
}

export namespace MsgRecoverClientV1 {
  export interface Data {
    '@type': '/ibc.core.client.v1.MsgRecoverClient';
    subject_client_id: string;
    substitute_client_id: string;
    signer: AccAddress;
  }
  export type Proto = MsgRecoverClientV1_pb;
}
