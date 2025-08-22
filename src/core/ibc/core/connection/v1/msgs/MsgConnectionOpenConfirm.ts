import { JSONSerializable } from '../../../../../../util/json';
import { Convert } from '../../../../../../util/convert';
import { AccAddress } from '../../../../../bech32';
import { HeightV1 } from '../../../client/v1/Height';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgConnectionOpenConfirm as MsgConnectionOpenConfirmV1_pb } from '@xpla/xpla.proto/ibc/core/connection/v1/tx';

/**
 * MsgConnectionOpenConfirm defines a msg sent by a Relayer to Chain B to
 * acknowledge the change of connection state to OPEN on Chain A.
 */
export class MsgConnectionOpenConfirmV1 extends JSONSerializable<
  any,
  MsgConnectionOpenConfirmV1.Data,
  MsgConnectionOpenConfirmV1.Proto
> {
  /**
   * @param connection_id
   * @param proof_ack base64 encoded, proof for the change of the connection state on Chain A: `INIT -> OPEN`
   * @param proof_height
   * @param signer
   */
  constructor(
    public connection_id: string,
    public proof_ack: string,
    public proof_height: HeightV1 | undefined,
    public signer: AccAddress,
  ) {
    super();
  }

  public static fromAmino(_: any): MsgConnectionOpenConfirmV1 {
    throw new Error('Amino not supported');
  }

  public toAmino(): any {
    throw new Error('Amino not supported');
  }

  public static fromData(
    data: MsgConnectionOpenConfirmV1.Data,
  ): MsgConnectionOpenConfirmV1 {
    const {
      connection_id,
      proof_ack,
      proof_height,
      signer,
    } = data;
    return new MsgConnectionOpenConfirmV1(
      connection_id,
      proof_ack,
      proof_height ? HeightV1.fromData(proof_height) : undefined,
      signer,
    );
  }

  public toData(): MsgConnectionOpenConfirmV1.Data {
    const {
      connection_id,
      proof_ack,
      proof_height,
      signer,
    } = this;
    return {
      '@type': '/ibc.core.connection.v1.MsgConnectionOpenConfirm',
      connection_id,
      proof_ack,
      proof_height: proof_height ? proof_height.toData() : undefined,
      signer,
    };
  }

  public static fromProto(
    proto: MsgConnectionOpenConfirmV1.Proto,
  ): MsgConnectionOpenConfirmV1 {
    return new MsgConnectionOpenConfirmV1(
      proto.connectionId,
      Convert.toBase64(proto.proofAck),
      proto.proofHeight ? HeightV1.fromProto(proto.proofHeight) : undefined,
      proto.signer,
    );
  }

  public toProto(): MsgConnectionOpenConfirmV1.Proto {
    const {
      connection_id,
      proof_ack,
      proof_height,
      signer,
    } = this;
    return MsgConnectionOpenConfirmV1_pb.fromPartial({
      connectionId: connection_id,
      proofAck: Convert.fromBase64(proof_ack),
      proofHeight: proof_height ? proof_height.toProto() : undefined,
      signer,
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/ibc.core.connection.v1.MsgConnectionOpenConfirm',
      value: MsgConnectionOpenConfirmV1_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any): MsgConnectionOpenConfirmV1 {
    return MsgConnectionOpenConfirmV1.fromProto(
      MsgConnectionOpenConfirmV1_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgConnectionOpenConfirmV1 {
  export interface Data {
    '@type': '/ibc.core.connection.v1.MsgConnectionOpenConfirm';
    connection_id: string;
    proof_ack: string;
    proof_height: HeightV1.Data | undefined;
    signer: AccAddress;
  }
  export type Proto = MsgConnectionOpenConfirmV1_pb;
}
