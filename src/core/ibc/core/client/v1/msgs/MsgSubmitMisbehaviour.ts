/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../../../util/json';
import { AccAddress } from '../../../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgSubmitMisbehaviour as MsgSubmitMisbehaviourV1_pb } from '@xpla/xpla.proto/ibc/core/client/v1/tx';

/**
 *  MsgSubmitMisbehaviour defines an sdk.Msg type that submits Evidence for light client misbehaviour.
 */
export class MsgSubmitMisbehaviourV1 extends JSONSerializable<
  any,
  MsgSubmitMisbehaviourV1.Data,
  MsgSubmitMisbehaviourV1.Proto
> {
  /**
   * @param client_id client unique identifier
   * @param misbehaviour misbehaviour used for freezing the light client
   * @param signer signer address
   */
  constructor(
    public client_id: string,
    public misbehaviour: any | undefined,
    public signer: AccAddress
  ) {
    super();
  }

  public static fromAmino(_: any, _isClassic?: boolean): MsgSubmitMisbehaviourV1 {
    throw new Error('Amino not supported');
  }

  public toAmino(_?: boolean): any {
    throw new Error('Amino not supported');
  }

  public static fromData(
    data: MsgSubmitMisbehaviourV1.Data,
    _?: boolean
  ): MsgSubmitMisbehaviourV1 {
    const { client_id, misbehaviour, signer } = data;
    return new MsgSubmitMisbehaviourV1(client_id, misbehaviour, signer);
  }

  public toData(_?: boolean): MsgSubmitMisbehaviourV1.Data {
    const { client_id, misbehaviour, signer } = this;
    return {
      '@type': '/ibc.core.client.v1.MsgSubmitMisbehaviour',
      client_id,
      misbehaviour,
      signer,
    };
  }

  public static fromProto(
    proto: MsgSubmitMisbehaviourV1.Proto,
    _?: boolean
  ): MsgSubmitMisbehaviourV1 {
    return new MsgSubmitMisbehaviourV1(
      proto.clientId,
      proto.misbehaviour,
      proto.signer
    );
  }

  public toProto(_?: boolean): MsgSubmitMisbehaviourV1.Proto {
    const { client_id, misbehaviour, signer } = this;
    return MsgSubmitMisbehaviourV1_pb.fromPartial({
      clientId: client_id,
      misbehaviour,
      signer,
    });
  }

  public packAny(_?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/ibc.core.client.v1.MsgSubmitMisbehaviour',
      value: MsgSubmitMisbehaviourV1_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgSubmitMisbehaviourV1 {
    return MsgSubmitMisbehaviourV1.fromProto(
      MsgSubmitMisbehaviourV1_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgSubmitMisbehaviourV1 {
  export interface Data {
    '@type': '/ibc.core.client.v1.MsgSubmitMisbehaviour';
    client_id: string;
    misbehaviour: any | undefined;
    signer: AccAddress;
  }
  export type Proto = MsgSubmitMisbehaviourV1_pb;
}
