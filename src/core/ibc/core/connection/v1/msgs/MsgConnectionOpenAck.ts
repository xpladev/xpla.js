import { JSONSerializable } from '../../../../../../util/json';
import { Convert } from '../../../../../../util/convert';
import { AccAddress } from '../../../../../bech32';
import { VersionV1 } from '../Version';
import { HeightV1 } from '../../../client/v1/Height';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgConnectionOpenAck as MsgConnectionOpenAckV1_pb } from '@xpla/xpla.proto/ibc/core/connection/v1/tx';

/**
 * MsgConnectionOpenAck defines a msg sent by a Relayer to Chain A to
 * acknowledge the change of connection state to TRYOPEN on Chain B.
 */
export class MsgConnectionOpenAckV1 extends JSONSerializable<
  any,
  MsgConnectionOpenAckV1.Data,
  MsgConnectionOpenAckV1.Proto
> {
  /**
   * @param connection_id
   * @param counterparty_connection_id
   * @param version
   * @param client_state this field is unused.
   * @param proof_height this field is unused.
   * @param proof_try base64 encoded, proof of the initialization the connection on Chain B: `UNINITIALIZED -> TRYOPEN`
   * @param proof_client base64 encoded, this field is unused.
   * @param proof_consensus base64 encoded, this field is unused.
   * @param consensus_height this field is unused.
   * @param signer
   * @param host_consensus_state_proof base64 encoded, this field is unused.
   */
  constructor(
    public connection_id: string,
    public counterparty_connection_id: string,
    public version: VersionV1 | undefined,
    public client_state: any | undefined,
    public proof_height: HeightV1 | undefined,
    public proof_try: string,
    public proof_client: string,
    public proof_consensus: string,
    public consensus_height: HeightV1 | undefined,
    public signer: AccAddress,
    public host_consensus_state_proof: string,
  ) {
    super();
  }

  public static fromAmino(_: any): MsgConnectionOpenAckV1 {
    throw new Error('Amino not supported');
  }

  public toAmino(): any {
    throw new Error('Amino not supported');
  }

  public static fromData(
    data: MsgConnectionOpenAckV1.Data,
  ): MsgConnectionOpenAckV1 {
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
    return new MsgConnectionOpenAckV1(
      connection_id,
      counterparty_connection_id,
      version ? VersionV1.fromData(version) : undefined,
      client_state,
      proof_height ? HeightV1.fromData(proof_height) : undefined,
      proof_try,
      proof_client,
      proof_consensus,
      consensus_height ? HeightV1.fromData(consensus_height) : undefined,
      signer,
      host_consensus_state_proof,
    );
  }

  public toData(): MsgConnectionOpenAckV1.Data {
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
    return {
      '@type': '/ibc.core.connection.v1.MsgConnectionOpenAck',
      connection_id,
      counterparty_connection_id,
      version: version ? version.toData() : undefined,
      client_state,
      proof_height: proof_height ? proof_height.toData() : undefined,
      proof_try,
      proof_client,
      proof_consensus,
      consensus_height: consensus_height ? consensus_height.toData() : undefined,
      signer,
      host_consensus_state_proof,
    };
  }

  public static fromProto(
    proto: MsgConnectionOpenAckV1.Proto,
  ): MsgConnectionOpenAckV1 {
    return new MsgConnectionOpenAckV1(
      proto.connectionId,
      proto.counterpartyConnectionId,
      proto.version ? VersionV1.fromProto(proto.version) : undefined,
      proto.clientState,
      proto.proofHeight ? HeightV1.fromProto(proto.proofHeight) : undefined,
      Convert.toBase64(proto.proofTry),
      Convert.toBase64(proto.proofClient),
      Convert.toBase64(proto.proofConsensus),
      proto.consensusHeight ? HeightV1.fromProto(proto.consensusHeight) : undefined,
      proto.signer,
      Convert.toBase64(proto.hostConsensusStateProof),
    );
  }

  public toProto(): MsgConnectionOpenAckV1.Proto {
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
    return MsgConnectionOpenAckV1_pb.fromPartial({
      connectionId: connection_id,
      counterpartyConnectionId: counterparty_connection_id,
      version: version ? version.toProto() : undefined,
      clientState: client_state,
      proofHeight: proof_height ? proof_height.toProto() : undefined,
      proofTry: Convert.fromBase64(proof_try),
      proofClient: Convert.fromBase64(proof_client),
      proofConsensus: Convert.fromBase64(proof_consensus),
      consensusHeight: consensus_height ? consensus_height.toProto() : undefined,
      signer,
      hostConsensusStateProof: Convert.fromBase64(host_consensus_state_proof),
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/ibc.core.connection.v1.MsgConnectionOpenAck',
      value: MsgConnectionOpenAckV1_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any): MsgConnectionOpenAckV1 {
    return MsgConnectionOpenAckV1.fromProto(
      MsgConnectionOpenAckV1_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgConnectionOpenAckV1 {
  export interface Data {
    '@type': '/ibc.core.connection.v1.MsgConnectionOpenAck';
    connection_id: string;
    counterparty_connection_id: string;
    version: VersionV1.Data | undefined;
    client_state: any | undefined;
    proof_height: HeightV1.Data | undefined;
    proof_try: string;
    proof_client: string;
    proof_consensus: string;
    consensus_height: HeightV1.Data | undefined;
    signer: AccAddress;
    host_consensus_state_proof: string;
  }
  export type Proto = MsgConnectionOpenAckV1_pb;
}
