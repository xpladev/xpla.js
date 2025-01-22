/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Convert } from '../../../../util/convert';
import { Height } from '../../core/client/Height';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgConnectionOpenConfirm as MsgConnectionOpenConfirm_pb } from '@xpla/xpla.proto/ibc/core/connection/v1/tx';

/**
 * MsgConnectionOpenConfirm defines a msg sent by a Relayer to Chain B to
 * acknowledge the change of connection state to OPEN on Chain A.
 */
export class MsgConnectionOpenConfirm extends JSONSerializable<
  any,
  MsgConnectionOpenConfirm.Data,
  MsgConnectionOpenConfirm.Proto
> {
  public proof_ack: Buffer;

  /**
   * @param connection_id
   * @param proof_ack proof for the change of the connection state on Chain A: `INIT -> OPEN`
   * @param proof_height
   * @param signer signer address
   */
  constructor(
    public connection_id: string,
    proof_ack: Buffer | Uint8Array | number[] | string,
    public proof_height: Height | undefined,
    public signer: AccAddress,
  ) {
    super();
    this.proof_ack = Convert.toBuffer(proof_ack);
  }

  public static fromAmino(
    _: any,
    _isClassic?: boolean
  ): MsgConnectionOpenConfirm {
    throw new Error('Amino not supported');
  }

  public toAmino(_?: boolean): any {
    throw new Error('Amino not supported');
  }

  public static fromData(
    data: MsgConnectionOpenConfirm.Data,
    _?: boolean
  ): MsgConnectionOpenConfirm {
    const { connection_id, proof_ack, proof_height, signer } = data;
    return new MsgConnectionOpenConfirm(
      connection_id,
      proof_ack,
      proof_height ? Height.fromData(proof_height) : undefined,
      signer
    );
  }

  public toData(_?: boolean): MsgConnectionOpenConfirm.Data {
    const { connection_id, proof_ack, proof_height, signer } = this;
    return {
      '@type': '/ibc.core.connection.v1.MsgConnectionOpenConfirm',
      connection_id,
      proof_ack: proof_ack.toString('base64'),
      proof_height: proof_height ? proof_height.toData() : undefined,
      signer,
    };
  }

  public static fromProto(
    proto: MsgConnectionOpenConfirm.Proto,
    _?: boolean
  ): MsgConnectionOpenConfirm {
    return new MsgConnectionOpenConfirm(
      proto.connectionId,
      proto.proofAck,
      proto.proofHeight ? Height.fromProto(proto.proofHeight) : undefined,
      proto.signer
    );
  }

  public toProto(_?: boolean): MsgConnectionOpenConfirm.Proto {
    const { connection_id, proof_ack, proof_height, signer } = this;
    return MsgConnectionOpenConfirm_pb.fromPartial({
      connectionId: connection_id,
      proofAck: proof_ack,
      proofHeight: proof_height ? proof_height.toProto() : undefined,
      signer,
    });
  }

  public packAny(_?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/ibc.core.connection.v1.MsgConnectionOpenConfirm',
      value: MsgConnectionOpenConfirm_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgConnectionOpenConfirm {
    return MsgConnectionOpenConfirm.fromProto(
      MsgConnectionOpenConfirm_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgConnectionOpenConfirm {
  export interface Data {
    '@type': '/ibc.core.connection.v1.MsgConnectionOpenConfirm';
    connection_id: string;
    proof_ack: string; // base64
    proof_height?: Height.Data;
    signer: AccAddress;
  }
  export type Proto = MsgConnectionOpenConfirm_pb;
}
