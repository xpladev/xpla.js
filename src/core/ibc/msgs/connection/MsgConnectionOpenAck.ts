/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Convert } from '../../../../util/convert';
import { Height } from '../../core/client/Height';
import { Version } from '../../core/connection/Version';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgConnectionOpenAck as MsgConnectionOpenAck_pb } from '@xpla/xpla.proto/ibc/core/connection/v1/tx';

/**
 * MsgConnectionOpenAck defines a msg sent by a Relayer to Chain A to
 * acknowledge the change of connection state to TRYOPEN on Chain B.
 */
export class MsgConnectionOpenAck extends JSONSerializable<
  any,
  MsgConnectionOpenAck.Data,
  MsgConnectionOpenAck.Proto
> {
  public proof_try: Buffer;
  public proof_client: Buffer;
  public proof_consensus: Buffer;
  public host_consensus_state_proof: Buffer | undefined;

  /**
   * @param connection_id
   * @param counterparty_connection_id
   * @param version
   * @param client_state
   * @param proof_height proof of the initialization the connection on Chain B: `UNITIALIZED -> TRYOPEN`
   * @param proof_try proof of client state included in message
   * @param proof_client proof of client consensus state
   * @param proof_consensus
   * @param consenesus_height
   * @param signer signer address
   * @param host_consensus_state_proof optional
   */
  constructor(
    public connection_id: string,
    public counterparty_connection_id: string,
    public version: Version | undefined,
    public client_state: Any | undefined,
    public proof_height: Height | undefined,
    proof_try: Buffer | Uint8Array | number[] | string,
    proof_client: Buffer | Uint8Array | number[] | string,
    proof_consensus: Buffer | Uint8Array | number[] | string,
    public consensus_height: Height | undefined,
    public signer: AccAddress,
    host_consensus_state_proof: Buffer | Uint8Array | number[] | string | undefined,
  ) {
    super();
    this.proof_try = Convert.toBuffer(proof_try);
    this.proof_client = Convert.toBuffer(proof_client);
    this.proof_consensus = Convert.toBuffer(proof_consensus);
    if (host_consensus_state_proof)
      this.host_consensus_state_proof = Convert.toBuffer(host_consensus_state_proof);
  }

  public static fromAmino(_: any, _isClassic?: boolean): MsgConnectionOpenAck {
    throw new Error('Amino not supported');
  }

  public toAmino(_?: boolean): any {
    throw new Error('Amino not supported');
  }

  public static fromData(
    data: MsgConnectionOpenAck.Data,
    _?: boolean
  ): MsgConnectionOpenAck {
    const {
      connection_id,
      counterparty_connection_id,
      version,
      client_state,
      proof_height,
      proof_try,
      proof_client,
      proof_consensus,
      consensus_height,
      signer,
      host_consensus_state_proof,
    } = data;
    return new MsgConnectionOpenAck(
      connection_id,
      counterparty_connection_id,
      version ? Version.fromData(version) : undefined,
      Any.fromJSON(client_state),
      proof_height ? Height.fromData(proof_height) : undefined,
      proof_try,
      proof_client,
      proof_consensus,
      consensus_height ? Height.fromData(consensus_height) : undefined,
      signer,
      host_consensus_state_proof,
    );
  }

  public toData(_?: boolean): MsgConnectionOpenAck.Data {
    const {
      connection_id,
      counterparty_connection_id,
      version,
      client_state,
      proof_height,
      proof_try,
      proof_client,
      proof_consensus,
      consensus_height,
      signer,
    } = this;
    return {
      '@type': '/ibc.core.connection.v1.MsgConnectionOpenAck',
      connection_id,
      counterparty_connection_id,
      version: version ? version.toData() : undefined,
      client_state: client_state ? Any.toJSON(client_state) : undefined,
      proof_height: proof_height ? proof_height.toData() : undefined,
      proof_try: proof_try.toString('base64'),
      proof_client: proof_client.toString('base64'),
      proof_consensus: proof_consensus.toString('base64'),
      consensus_height: consensus_height
        ? consensus_height.toData()
        : undefined,
      signer,
    };
  }

  public static fromProto(
    proto: MsgConnectionOpenAck.Proto,
    _?: boolean
  ): MsgConnectionOpenAck {
    return new MsgConnectionOpenAck(
      proto.connectionId,
      proto.counterpartyConnectionId,
      proto.version ? Version.fromProto(proto.version) : undefined,
      proto.clientState,
      proto.proofHeight ? Height.fromProto(proto.proofHeight) : undefined,
      proto.proofTry,
      proto.proofClient,
      proto.proofConsensus,
      proto.consensusHeight
        ? Height.fromProto(proto.consensusHeight)
        : undefined,
      proto.signer,
      proto.hostConsensusStateProof,
    );
  }

  public toProto(_?: boolean): MsgConnectionOpenAck.Proto {
    const {
      connection_id,
      counterparty_connection_id,
      version,
      client_state,
      proof_height,
      proof_try,
      proof_client,
      proof_consensus,
      consensus_height,
      signer,
      host_consensus_state_proof,
    } = this;
    return MsgConnectionOpenAck_pb.fromPartial({
      connectionId: connection_id,
      counterpartyConnectionId: counterparty_connection_id,
      version: version ? version.toProto() : undefined,
      clientState: client_state,
      proofHeight: proof_height ? proof_height.toProto() : undefined,
      proofTry: proof_try,
      proofClient: proof_client,
      proofConsensus: proof_consensus,
      consensusHeight: consensus_height
        ? consensus_height.toProto()
        : undefined,
      signer,
      hostConsensusStateProof: host_consensus_state_proof,
    });
  }

  public packAny(_?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/ibc.core.connection.v1.MsgConnectionOpenAck',
      value: MsgConnectionOpenAck_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgConnectionOpenAck {
    return MsgConnectionOpenAck.fromProto(
      MsgConnectionOpenAck_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgConnectionOpenAck {
  export interface Data {
    '@type': '/ibc.core.connection.v1.MsgConnectionOpenAck';
    connection_id: string;
    counterparty_connection_id: string;
    version?: Version.Data;
    client_state: any;
    proof_height?: Height.Data;
    proof_try: string;
    proof_client: string;
    proof_consensus: string;
    consensus_height?: Height.Data;
    signer: AccAddress;
    host_consensus_state_proof?: string;
  }
  export type Proto = MsgConnectionOpenAck_pb;
}
