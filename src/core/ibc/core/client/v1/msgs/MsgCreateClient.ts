/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../../../util/json';
import { AccAddress } from '../../../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgCreateClient as MsgCreateClientV1_pb } from '@xpla/xpla.proto/ibc/core/client/v1/tx';
/**
 * MsgCreateClient defines a message to create an IBC client
 */
export class MsgCreateClientV1 extends JSONSerializable<
  any,
  MsgCreateClientV1.Data,
  MsgCreateClientV1.Proto
> {
  /**
   * @param client_state light client state
   * @param consensus_state consensus state associated with the client that corresponds to a given
   * @param signer signer address
   */
  constructor(
    public client_state: any | undefined,
    public consensus_state: any | undefined,
    public signer: AccAddress,
  ) {
    super();
  }

  public static fromAmino(_: any, _isClassic?: boolean): MsgCreateClientV1 {
    throw new Error('Amino not supported');
  }

  public toAmino(_?: boolean): any {
    throw new Error('Amino not supported');
  }

  public static fromData(
    data: MsgCreateClientV1.Data,
    _?: boolean
  ): MsgCreateClientV1 {
    const { client_state, consensus_state, signer } = data;
    return new MsgCreateClientV1(client_state, consensus_state, signer);
  }

  public toData(_?: boolean): MsgCreateClientV1.Data {
    const { client_state, consensus_state, signer } = this;
    return {
      '@type': '/ibc.core.client.v1.MsgCreateClient',
      client_state,
      consensus_state,
      signer,
    };
  }

  public static fromProto(
    proto: MsgCreateClientV1.Proto,
    _?: boolean
  ): MsgCreateClientV1 {
    return new MsgCreateClientV1(
      proto.clientState,
      proto.consensusState,
      proto.signer
    );
  }

  public toProto(_?: boolean): MsgCreateClientV1.Proto {
    const { client_state, consensus_state, signer } = this;
    return MsgCreateClientV1_pb.fromPartial({
      clientState: client_state,
      consensusState: consensus_state,
      signer,
    });
  }

  public packAny(_?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/ibc.core.client.v1.MsgCreateClient',
      value: MsgCreateClientV1_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgCreateClientV1 {
    return MsgCreateClientV1.fromProto(MsgCreateClientV1_pb.decode(msgAny.value));
  }
}

export namespace MsgCreateClientV1 {
  export interface Data {
    '@type': '/ibc.core.client.v1.MsgCreateClient';
    client_state: any | undefined;
    consensus_state: any | undefined;
    signer: AccAddress;
  }
  export type Proto = MsgCreateClientV1_pb;
}
