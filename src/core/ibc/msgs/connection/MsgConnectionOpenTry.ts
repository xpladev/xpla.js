/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Int, Numeric } from '../../../../core/numeric';
import { Convert } from '../../../../util/convert';
import { Counterparty } from '../../core/connection/Counterparty';
import { Version } from '../../core/connection/Version';
import { Height } from '../../core/client/Height';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgConnectionOpenTry as MsgConnectionOpenTry_pb } from '@xpla/xpla.proto/ibc/core/connection/v1/tx';

/**
 *  MsgConnectionOpenTry defines a msg sent by a Relayer to try to open a connection on Chain B.
 */
export class MsgConnectionOpenTry extends JSONSerializable<
  any,
  MsgConnectionOpenTry.Data,
  MsgConnectionOpenTry.Proto
> {
  public delay_period: Int;
  public proof_init: Buffer;
  public proof_client: Buffer;
  public proof_consensus: Buffer;
  public host_consensus_state_proof: Buffer | undefined;

  /**
   * @param client_id in the case of crossing hello's, when both chains call OpenInit, we need the connection identifier of the previous connection in state INIT
   * @param previous_connection_id
   * @param client_state
   * @param counterparty
   * @param delay_period
   * @param counterparty_versions
   * @param proof_height proof of the initialization the connection on Chain A: `UNITIALIZED -> INIT`
   * @param proof_init proof of client state included in message
   * @param proof_client proof of client consensus state
   * @param proof_consensus
   * @param consensus_height
   * @param signer signer address
   * @param host_consensus_state_proof optional
   */
  constructor(
    public client_id: string,
    public previous_connection_id: string,
    public client_state: Any | undefined,
    public counterparty: Counterparty | undefined,
    delay_period: Numeric.Input,
    public counterparty_versions: Version[],
    public proof_height: Height | undefined,
    proof_init: Buffer | Uint8Array | number[] | string,
    proof_client: Buffer | Uint8Array | number[] | string,
    proof_consensus: Buffer | Uint8Array | number[] | string,
    public consensus_height: Height | undefined,
    public signer: AccAddress,
    host_consensus_state_proof: Buffer | Uint8Array | number[] | string | undefined,
  ) {
    super();
    this.delay_period = new Int(delay_period);
    this.proof_init = Convert.toBuffer(proof_init);
    this.proof_client = Convert.toBuffer(proof_client);
    this.proof_consensus = Convert.toBuffer(proof_consensus);
    if (host_consensus_state_proof)
      this.host_consensus_state_proof = Convert.toBuffer(host_consensus_state_proof);
  }

  public static fromAmino(_: any, _isClassic?: boolean): MsgConnectionOpenTry {
    throw new Error('Amino not supported');
  }

  public toAmino(_?: boolean): any {
    throw new Error('Amino not supported');
  }

  public static fromData(
    data: MsgConnectionOpenTry.Data,
    _?: boolean
  ): MsgConnectionOpenTry {
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
    return new MsgConnectionOpenTry(
      client_id,
      previous_connection_id,
      Any.fromJSON(client_state),
      counterparty ? Counterparty.fromData(counterparty) : undefined,
      Number.parseInt(delay_period),
      counterparty_versions.length > 0
        ? counterparty_versions.map(cv => Version.fromData(cv))
        : [],
      proof_height ? Height.fromData(proof_height) : undefined,
      proof_init,
      proof_client,
      proof_consensus,
      consensus_height ? Height.fromData(consensus_height) : undefined,
      signer,
      host_consensus_state_proof,
    );
  }

  public toData(_?: boolean): MsgConnectionOpenTry.Data {
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
      client_state: client_state ? Any.toJSON(client_state) : undefined,
      counterparty: counterparty ? counterparty.toData() : undefined,
      delay_period: delay_period.toFixed(),
      counterparty_versions:
        counterparty_versions.length > 0
          ? counterparty_versions.map(cv => cv.toData())
          : [],
      proof_height: proof_height ? proof_height.toData() : undefined,
      proof_init: proof_init.toString('base64'),
      proof_client: proof_client.toString('base64'),
      proof_consensus: proof_consensus.toString('base64'),
      consensus_height: consensus_height
        ? consensus_height.toData()
        : undefined,
      signer,
      host_consensus_state_proof: host_consensus_state_proof?.toString('base64'),
    };
  }

  public static fromProto(
    proto: MsgConnectionOpenTry.Proto,
    _?: boolean
  ): MsgConnectionOpenTry {
    return new MsgConnectionOpenTry(
      proto.clientId,
      proto.previousConnectionId,
      proto.clientState,
      proto.counterparty
        ? Counterparty.fromProto(proto.counterparty)
        : undefined,
      proto.delayPeriod.toNumber(),
      proto.counterpartyVersions.length > 0
        ? proto.counterpartyVersions.map(cv => Version.fromProto(cv))
        : [],
      proto.proofHeight ? Height.fromProto(proto.proofHeight) : undefined,
      proto.proofInit,
      proto.proofClient,
      proto.proofConsensus,
      proto.consensusHeight
        ? Height.fromProto(proto.consensusHeight)
        : undefined,
      proto.signer,
      proto.hostConsensusStateProof,
    );
  }

  public toProto(_?: boolean): MsgConnectionOpenTry.Proto {
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
    return MsgConnectionOpenTry_pb.fromPartial({
      clientId: client_id,
      previousConnectionId: previous_connection_id,
      clientState: client_state,
      counterparty: counterparty ? counterparty.toProto() : undefined,
      delayPeriod: delay_period.toFixed(),
      counterpartyVersions:
        counterparty_versions.length > 0
          ? counterparty_versions.map(cv => cv.toProto())
          : [],
      proofHeight: proof_height ? proof_height.toProto() : undefined,
      proofInit: proof_init,
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
      typeUrl: '/ibc.core.connection.v1.MsgConnectionOpenTry',
      value: MsgConnectionOpenTry_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgConnectionOpenTry {
    return MsgConnectionOpenTry.fromProto(
      MsgConnectionOpenTry_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgConnectionOpenTry {
  export interface Data {
    '@type': '/ibc.core.connection.v1.MsgConnectionOpenTry';
    client_id: string;
    previous_connection_id: string;
    client_state: any;
    counterparty?: Counterparty.Data;
    delay_period: string;
    counterparty_versions: Version.Data[];
    proof_height?: Height.Data;
    proof_init: string; // base64
    proof_client: string; // base64
    proof_consensus: string; // base64
    consensus_height?: Height.Data;
    signer: AccAddress;
    host_consensus_state_proof?: string; // base64
  }
  export type Proto = MsgConnectionOpenTry_pb;
}
