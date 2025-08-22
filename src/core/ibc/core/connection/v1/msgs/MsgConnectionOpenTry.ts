import { JSONSerializable } from '../../../../../../util/json';
import { Convert } from '../../../../../../util/convert';
import { AccAddress } from '../../../../../bech32';
import { Numeric, Int } from '../../../../../numeric';
import { CounterpartyV1 } from '../Counterparty';
import { VersionV1 } from '../Version';
import { HeightV1 } from '../../../client/v1/Height';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgConnectionOpenTry as MsgConnectionOpenTryV1_pb } from '@xpla/xpla.proto/ibc/core/connection/v1/tx';

/**
 * MsgConnectionOpenTry defines a msg sent by a Relayer to try to open a
 * connection on Chain B.
 */
export class MsgConnectionOpenTryV1 extends JSONSerializable<
  any,
  MsgConnectionOpenTryV1.Data,
  MsgConnectionOpenTryV1.Proto
> {
  public delay_period: Int;
  /**
   * @param client_id
   * @param previous_connection_id this field is unused. Crossing hellos are no longer supported in core IBC.
   * @param client_state this field is unused.
   * @param counterparty
   * @param delay_period
   * @param counterparty_versions
   * @param proof_height
   * @param proof_init base64 encoded, proof of the initialization the connection on Chain A: `UNINITIALIZED -> INIT`
   * @param proof_client base64 encoded, this field is unused.
   * @param proof_consensus base64 encoded, this field is unused.
   * @param consensus_height this field is unused.
   * @param signer
   * @param host_consensus_state_proof base64 encoded, this field is unused.
   */
  constructor(
    public client_id: string,
    public previous_connection_id: string,
    public client_state: any | undefined,
    public counterparty: CounterpartyV1 | undefined,
    delay_period: Numeric.Input,
    public counterparty_versions: VersionV1[],
    public proof_height: HeightV1 | undefined,
    public proof_init: string,
    public proof_client: string,
    public proof_consensus: string,
    public consensus_height: HeightV1 | undefined,
    public signer: AccAddress,
    public host_consensus_state_proof: string,
  ) {
    super();
    this.delay_period = new Int(delay_period);
  }

  public static fromAmino(_: any): MsgConnectionOpenTryV1 {
    throw new Error('Amino not supported');
  }

  public toAmino(): any {
    throw new Error('Amino not supported');
  }

  public static fromData(
    data: MsgConnectionOpenTryV1.Data,
  ): MsgConnectionOpenTryV1 {
    const {
      client_id,
      previous_connection_id,
      client_state,
      counterparty,
      delay_period,
      counterparty_versions,
      proof_height,
      proof_init,
      proof_client,
      proof_consensus,
      consensus_height,
      signer,
      host_consensus_state_proof,
    } = data;
    return new MsgConnectionOpenTryV1(
      client_id,
      previous_connection_id,
      client_state,
      counterparty ? CounterpartyV1.fromData(counterparty) : undefined,
      delay_period,
      counterparty_versions.map(VersionV1.fromData),
      proof_height ? HeightV1.fromData(proof_height) : undefined,
      proof_init,
      proof_client,
      proof_consensus,
      consensus_height ? HeightV1.fromData(consensus_height) : undefined,
      signer,
      host_consensus_state_proof,
    );
  }

  public toData(): MsgConnectionOpenTryV1.Data {
    const {
      client_id,
      previous_connection_id,
      client_state,
      counterparty,
      delay_period,
      counterparty_versions,
      proof_height,
      proof_init,
      proof_client,
      proof_consensus,
      consensus_height,
      signer,
      host_consensus_state_proof,
    } = this;
    return {
      '@type': '/ibc.core.connection.v1.MsgConnectionOpenTry',
      client_id,
      previous_connection_id,
      client_state,
      counterparty: counterparty ? counterparty.toData() : undefined,
      delay_period: delay_period.toFixed(0),
      counterparty_versions: counterparty_versions.map(version => version.toData()),
      proof_height: proof_height ? proof_height.toData() : undefined,
      proof_init,
      proof_client,
      proof_consensus,
      consensus_height: consensus_height ? consensus_height.toData() : undefined,
      signer,
      host_consensus_state_proof,
    };
  }

  public static fromProto(
    proto: MsgConnectionOpenTryV1.Proto,
  ): MsgConnectionOpenTryV1 {
    return new MsgConnectionOpenTryV1(
      proto.clientId,
      proto.previousConnectionId,
      proto.clientState,
      proto.counterparty ? CounterpartyV1.fromProto(proto.counterparty) : undefined,
      proto.delayPeriod.toString(),
      proto.counterpartyVersions.map(VersionV1.fromProto),
      proto.proofHeight ? HeightV1.fromProto(proto.proofHeight) : undefined,
      Convert.toBase64(proto.proofInit),
      Convert.toBase64(proto.proofClient),
      Convert.toBase64(proto.proofConsensus),
      proto.consensusHeight ? HeightV1.fromProto(proto.consensusHeight) : undefined,
      proto.signer,
      Convert.toBase64(proto.hostConsensusStateProof),
    );
  }

  public toProto(): MsgConnectionOpenTryV1.Proto {
    const {
      client_id,
      previous_connection_id,
      client_state,
      counterparty,
      delay_period,
      counterparty_versions,
      proof_height,
      proof_init,
      proof_client,
      proof_consensus,
      consensus_height,
      signer,
      host_consensus_state_proof,
    } = this;
    return MsgConnectionOpenTryV1_pb.fromPartial({
      clientId: client_id,
      previousConnectionId: previous_connection_id,
      clientState: client_state,
      counterparty: counterparty ? counterparty.toProto() : undefined,
      delayPeriod: delay_period.toFixed(0),
      counterpartyVersions: counterparty_versions.map(version => version.toProto()),
      proofHeight: proof_height ? proof_height.toProto() : undefined,
      proofInit: Convert.fromBase64(proof_init),
      proofClient: Convert.fromBase64(proof_client),
      proofConsensus: Convert.fromBase64(proof_consensus),
      consensusHeight: consensus_height ? consensus_height.toProto() : undefined,
      signer,
      hostConsensusStateProof: Convert.fromBase64(host_consensus_state_proof),
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/ibc.core.connection.v1.MsgConnectionOpenTry',
      value: MsgConnectionOpenTryV1_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any): MsgConnectionOpenTryV1 {
    return MsgConnectionOpenTryV1.fromProto(
      MsgConnectionOpenTryV1_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgConnectionOpenTryV1 {
  export interface Data {
    '@type': '/ibc.core.connection.v1.MsgConnectionOpenTry';
    client_id: string;
    previous_connection_id: string;
    client_state: any | undefined;
    counterparty: CounterpartyV1.Data | undefined;
    delay_period: string;
    counterparty_versions: VersionV1.Data[];
    proof_height: HeightV1.Data | undefined;
    proof_init: string;
    proof_client: string;
    proof_consensus: string;
    consensus_height: HeightV1.Data | undefined;
    signer: AccAddress;
    host_consensus_state_proof: string;
  }
  export type Proto = MsgConnectionOpenTryV1_pb;
}
