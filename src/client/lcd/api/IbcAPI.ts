import { BaseAPI } from './BaseAPI';
import { APIParams, Pagination, PaginationOptions } from '../APIRequester';
import { Dec, Int, Numeric } from '../../../core/numeric';
import {
  Channel,
  Counterparty as PortChannel,
  PacketId,
  PacketState,
  Timeout,
  IdentifiedConnection,
  Height,
  IdentifiedClientState,
  ClientConsensusStates,
  ConsensusStateWithHeight,
  MerklePath,
} from '../../../core/ibc/core';
import { LCDClient } from '../LCDClient';

export interface IbcClientParams {
  allowed_clients: string[];
}
export namespace IbcClientParams {
  export interface Data {
    allowed_clients: string[];
  }
}

export interface IbcChannelParams {
  upgrade_timeout: Timeout;
}
export namespace IbcChannelParams {
  export interface Data {
    upgrade_timeout: Timeout.Data;
  }
}

export interface IbcConnectionParams {
  max_expected_time_per_block: Int;
}
export namespace IbcConnectionParams {
  export interface Data {
    max_expected_time_per_block: string;
  }
}

export interface Status {
  status: string;
}
export namespace Status {
  export interface Data {
    status: string;
  }
}

export interface Port {
  channel: Channel;
  proof: string;
  proof_height: Height;
}
export namespace Port {
  export interface Data {
    channel: Channel.Data;
    proof: string;
    proof_height: Height.Data;
  }
}

export interface Proof {
  proof: string;
  proof_height: Height;
}
export namespace Proof {
  export interface Data {
    proof: string;
    proof_height: Height.Data;
  }
}

export interface TypedValue {
  type_url: string;
  value: string;
}

export interface VerifyMembership {
  /** client unique identifier. */
  client_id: string;
  /** the proof to be verified by the client. */
  proof: Buffer;
  /** the height of the commitment root at which the proof is verified. */
  proof_height?: Height;
  /** the commitment key path. */
  merkle_path?: MerklePath;
  /** the value which is proven. */
  value: Uint8Array;
  /** optional time delay */
  time_delay?: Int;
  /** optional block delay */
  block_delay?: Int;
}
export namespace VerifyMembership {
  export interface Data {
    client_id: string;
    proof: string; // base64
    proof_height?: Height.Data;
    merkle_path?: MerklePath.Data;
    value: string; // base64
    time_delay?: string;
    block_delay?: string;
  }

  export function toData(src: VerifyMembership): VerifyMembership.Data {
    const res: VerifyMembership.Data = {
      client_id: src.client_id,
      proof: Buffer.from(src.proof).toString('base64'),
      proof_height: src.proof_height ? src.proof_height.toData() : undefined,
      merkle_path: src.merkle_path ? src.merkle_path.toData() : undefined,
      value: Buffer.from(src.value).toString('base64'),
      time_delay: src.time_delay ? src.time_delay.toString() : undefined,
      block_delay: src.block_delay ? src.block_delay.toString() : undefined,
    };
    return res;
  }
}

export class IbcAPI extends BaseAPI {
  constructor(public lcd: LCDClient) {
    super(lcd.apiRequester);
  }

  /**
   * query all the IBC channels of a chain
   */
  public async channels(
    params: Partial<PaginationOptions & APIParams> = {}
  ): Promise<[Channel[], Pagination, Height]> {
    return this.c
      .get<{
        channels: Channel.Data[];
        height: Height.Data;
        pagination: Pagination;
      }>(`/ibc/core/channel/v1/channels`, params)
      .then(d => [
        d.channels.map(Channel.fromData),
        d.pagination,
        Height.fromData(d.height),
      ]);
  }

  public async channelsByConnection(
    connection_id: string,
    params: Partial<PaginationOptions & APIParams> = {}
  ): Promise<[Channel[], Pagination, Height]> {
    return this.c
      .get<{
        channels: Channel.Data[];
        height: Height.Data;
        pagination: Pagination;
      }>(`/ibc/core/channel/v1/connections/${connection_id}/channels`, params)
      .then(d => [
        d.channels.map(Channel.fromData),
        d.pagination,
        Height.fromData(d.height),
      ]);
  }

  /**
   * query the information of the port at given channel
   * @param channel_id channel identifier
   * @param port_id port name
   */
  public async port(
    port_channel: PortChannel,
    params: APIParams = {}
  ): Promise<Port> {
    return this.c
      .get<{
        channel: Channel.Data;
        proof: string | null;
        proof_height: Height.Data;
      }>(`/ibc/core/channel/v1/channels/${port_channel.channel_id}/ports/${port_channel.port_id}`, params)
      .then(d => {
        return {
          channel: Channel.fromData(d.channel),
          proof: d.proof ?? '',
          proof_height: Height.fromData(d.proof_height),
        };
      });
  }

  public async nextSequence(
    port_channel: PortChannel,
    params: APIParams = {}
  ): Promise<[ Int, Proof ]> {
    return this.c
      .get<{
        next_sequence_receive: Numeric.Input;
        proof: string | null;
        proof_height: Height.Data;
      }>(`/ibc/core/channel/v1/channels/${port_channel.channel_id}/ports/${port_channel.port_id}/next_sequence`, params)
      .then(d => [
        new Int(d.next_sequence_receive),
        {
          proof: d.proof ?? '',
          proof_height: Height.fromData(d.proof_height),
        }
      ]);
  }

  public async nextSequenceSend(
    port_channel: PortChannel,
    params: APIParams = {}
  ): Promise<[ Int, Proof ]> {
    return this.c
      .get<{
        next_sequence_send: Numeric.Input;
        proof: string | null;
        proof_height: Height.Data;
      }>(`/ibc/core/channel/v1/channels/${port_channel.channel_id}/ports/${port_channel.port_id}/next_sequence_send`, params)
      .then(d => [
        new Int(d.next_sequence_send),
        {
          proof: d.proof ?? '',
          proof_height: Height.fromData(d.proof_height),
        }
      ]);
  }

  public async packetAcknowledgements(
    port_channel: PortChannel,
    params: Partial<PaginationOptions & APIParams> = {}
  ): Promise<[ PacketState[], Pagination, Height ]> {
    return this.c
      .get<{
        acknowledgements: PacketState.Data[];
        height: Height.Data;
        pagination: Pagination;
      }>(`/ibc/core/channel/v1/channels/${port_channel.channel_id}/ports/${port_channel.port_id}/packet_acknowledgements`, params)
      .then(d => [
        d.acknowledgements.map(a => PacketState.fromData(a)),
        d.pagination,
        Height.fromData(d.height),
      ]);
  }

  public async packetAcknowledgement(
    packet_id: PacketId,
    params: APIParams = {}
  ): Promise<[ PacketState, Proof ]> {
    return this.c
      .get<{
        acknowledgement: string;
        proof: string | null;
        proof_height: Height.Data;
      }>(`/ibc/core/channel/v1/channels/${packet_id.channel_id}/ports/${packet_id.port_id}/packet_acks/${packet_id.sequence}`, params)
      .then(d => [
        new PacketState(
          packet_id.channel_id,
          packet_id.port_id,
          packet_id.sequence,
          d.acknowledgement,
        ),
        {
          proof: d.proof ?? '',
          proof_height: Height.fromData(d.proof_height),
        }
      ]);
  }

  public async packetCommitments(
    port_channel: PortChannel,
    params: Partial<PaginationOptions & APIParams> = {}
  ): Promise<[ PacketState[], Pagination, Height ]> {
    return this.c
      .get<{
        commitments: PacketState.Data[];
        height: Height.Data;
        pagination: Pagination;
      }>(`/ibc/core/channel/v1/channels/${port_channel.channel_id}/ports/${port_channel.port_id}/packet_commitments`, params)
      .then(d => [
        d.commitments.map(a => PacketState.fromData(a)),
        d.pagination,
        Height.fromData(d.height),
      ]);
  }

  public async packetCommitment(
    packet_id: PacketId,
    params: APIParams = {}
  ): Promise<[ PacketState, Proof ]> {
    return this.c
      .get<{
        commitment: string;
        proof: string | null;
        proof_height: Height.Data;
      }>(`/ibc/core/channel/v1/channels/${packet_id.channel_id}/ports/${packet_id.port_id}/packet_commitments/${packet_id.sequence}`, params)
      .then(d => [
        new PacketState(packet_id.channel_id, packet_id.port_id, packet_id.sequence, d.commitment),
        {
          proof: d.proof ?? '',
          proof_height: Height.fromData(d.proof_height),
        }
      ]);
  }

  public async packetCommitmentUnreceivedAcknowledgements(
    packet_id: PacketId,
    params: APIParams = {}
  ): Promise<[ PacketId[], Height ]> {
    return this.c
      .get<{
        sequences: string[];
        height: Height.Data;
      }>(`/ibc/core/channel/v1/channels/${packet_id.channel_id}/ports/${packet_id.port_id}/packet_commitments/${packet_id.sequence}/unreceived_acks`, params)
      .then(d => [
        d.sequences.map(a => new PacketId(packet_id.port_id, packet_id.channel_id, a)),
        Height.fromData(d.height),
      ]);
  }

  public async packetCommitmentUnreceivedPackets(
    packet_id: PacketId,
    params: APIParams = {}
  ): Promise<[ PacketId[], Height ]> {
    return this.c
      .get<{
        sequences: string[];
        height: Height.Data;
      }>(`/ibc/core/channel/v1/channels/${packet_id.channel_id}/ports/${packet_id.port_id}/packet_commitments/${packet_id.sequence}/unreceived_packets`, params)
      .then(d => [
        d.sequences.map(a => new PacketId(packet_id.port_id, packet_id.channel_id, a)),
        Height.fromData(d.height),
      ]);
  }

  public async packetReceived(
    packet_id: PacketId,
    params: APIParams = {}
  ): Promise<[ boolean, Proof ]> {
    return this.c
      .get<{
        received: boolean;
        proof: string | null;
        proof_height: Height.Data;
      }>(`/ibc/core/channel/v1/channels/${packet_id.channel_id}/ports/${packet_id.port_id}/packet_receipts/${packet_id.sequence}`, params)
      .then(d => [
        d.received,
        {
          proof: d.proof ?? '',
          proof_height: Height.fromData(d.proof_height),
        }
      ]);
  }

  public async upgradeChannel(
    port_channel: PortChannel,
    params: APIParams = {}
  ): Promise<[ any, Proof ]> {
    return this.c
      .get<{
        upgrade: any;
        proof: string | null;
        proof_height: Height.Data;
      }>(`/ibc/core/channel/v1/channels/${port_channel.channel_id}/ports/${port_channel.port_id}/upgrade`, params)
      .then(d => [
        d.upgrade,
        {
          proof: d.proof ?? '',
          proof_height: Height.fromData(d.proof_height),
        }
      ]);
  }

  public async upgradeChannelError(
    port_channel: PortChannel,
    params: APIParams = {}
  ): Promise<[ any, Proof ]> {
    return this.c
      .get<{
        error_receipt: any;
        proof: string | null;
        proof_height: Height.Data;
      }>(`/ibc/core/channel/v1/channels/${port_channel.channel_id}/ports/${port_channel.port_id}/upgrade_error`, params)
      .then(d => [
        d.error_receipt,
        {
          proof: d.proof ?? '',
          proof_height: Height.fromData(d.proof_height),
        }
      ]);
  }

  /**
   *  query all the IBC connections of a chain
   */
  public async connections(
    params: APIParams = {}
  ): Promise<[IdentifiedConnection[], Pagination]> {
    return this.c
      .get<{
        connections: IdentifiedConnection.Data[];
        pagination: Pagination;
      }>(`/ibc/core/connection/v1/connections`, params)
      .then(d => [
        d.connections.map(IdentifiedConnection.fromData),
        d.pagination,
      ]);
  }

  public async clientConnectionIds(
    client_id: string,
    params: APIParams = {}
  ): Promise<[ string[], Proof ]> {
    return this.c
      .get<{
        connection_paths: string[];
        proof: string | null;
        proof_height: Height.Data;
      }>(`/ibc/core/connection/v1/client_connections/${client_id}`, params)
      .then(d => [
        d.connection_paths,
        {
          proof: d.proof ?? '',
          proof_height: Height.fromData(d.proof_height),
        }
      ]);
  }

  /**
   * query an IBC connection end
   * @param connection_id connection unique identifier
   */
  public async connection(
    connection_id: string,
    params: APIParams = {}
  ): Promise<[ IdentifiedConnection, Proof ]> {
    return this.c
      .get<{
        connection: IdentifiedConnection.Data;
        proof: string | null;
        proof_height: Height.Data;
      }>(`/ibc/core/connection/v1/connections/${connection_id}`, params)
      .then(d => [
        IdentifiedConnection.fromData(d.connection),
        {
          proof: d.proof ?? '',
          proof_height: Height.fromData(d.proof_height),
        }
      ]);
  }

  /**
   * query all the channels associated with a connection end
   * @param connection_id connection unique identifier
   */
  public async connectionChannels(
    connection_id: string,
    params: APIParams = {}
  ): Promise<[Channel[], Height, Pagination]> {
    return this.c
      .get<{
        channels: Channel.Data[];
        pagination: Pagination;
        height: Height.Data;
      }>(`/ibc/core/channel/v1/connections/${connection_id}/channels`, params)
      .then(d => [
        d.channels.map(Channel.fromData),
        Height.fromData(d.height),
        d.pagination,
      ]);
  }

  /**
   * Gets the current client application parameters.
   */
  public async clientParameters(params: APIParams = {}): Promise<IbcClientParams> {
    return this.c
      .get<{ params: IbcClientParams.Data }>('/ibc/client/v1/params', params)
      .then(({ params: d }) => ({
        allowed_clients: d.allowed_clients,
      }));
  }

  public async channelParameters(params: APIParams = {}): Promise<IbcChannelParams> {
    return this.c
      .get<{ params: IbcChannelParams.Data }>('/ibc/core/channel/v1/params', params)
      .then(({ params: d }) => ({
        upgrade_timeout: Timeout.fromData(d.upgrade_timeout),
      }));
  }

  public async connectionParameters(params: APIParams = {}): Promise<IbcConnectionParams> {
    return this.c
      .get<{ params: IbcConnectionParams.Data }>('/ibc/core/connection/v1/params', params)
      .then(({ params: d }) => ({
        max_expected_time_per_block: new Int(d.max_expected_time_per_block),
      }));
  }

  /**
   * query all the IBC light clients of a chain
   */
  public async clientStates(
    params: Partial<PaginationOptions & APIParams> = {}
  ): Promise<[IdentifiedClientState[], Pagination]> {
    return this.c
      .get<{
        client_states: IdentifiedClientState.Data[];
        pagination: Pagination;
      }>(`/ibc/core/client/v1/client_states`, params)
      .then(d => [
        d.client_states.map(IdentifiedClientState.fromData),
        d.pagination,
      ]);
  }

  /**
   * query an IBC light client
   * @param client_id client state unique identifier
   * @returns
   */
  public async clientState(
    client_id: string,
    params: APIParams = {}
  ): Promise<IdentifiedClientState> {
    return this.c
      .get<{
        client_state: IdentifiedClientState.Data;
      }>(`/ibc/core/client/v1/client_states/${client_id}`, params)
      .then(d => IdentifiedClientState.fromData(d.client_state));
  }

  public async clientStateByChannel(
    port_channel: PortChannel,
    params: APIParams = {}
  ): Promise<IdentifiedClientState> {
    return this.c
      .get<{
        identified_client_state: IdentifiedClientState.Data;
      }>(`/ibc/core/channel/v1/channels/${port_channel.channel_id}/ports/${port_channel.port_id}/client_state`, params)
      .then(d => IdentifiedClientState.fromData(d.identified_client_state));
  }

  public async clientStateByConnection(
    connection_id: string,
    params: APIParams = {}
  ): Promise<[ IdentifiedClientState, Proof ]> {
    return this.c
      .get<{
        identified_client_state: IdentifiedClientState.Data;
        proof: string | null;
        proof_height: Height.Data;
      }>(`/ibc/core/connection/v1/connections/${connection_id}/client_state`, params)
      .then(d => [
        IdentifiedClientState.fromData(d.identified_client_state),
        {
          proof: d.proof ?? '',
          proof_height: Height.fromData(d.proof_height),
        }
      ]);
  }

  /**
   * query the status of an IBC light client
   * @param client_id client state unique identifier
   * @returns
   */
  public async clientStatus(
    client_id: string,
    params: APIParams = {}
  ): Promise<Status> {
    return this.c
      .get<{
        status: Status.Data;
      }>(`/ibc/core/client/v1/client_status/${client_id}`, params)
      .then();
  }

  /**
   * query all the consensus state associated with a given client
   * @param client_id client identifier
   * @returns
   */
  public async consensusStates(
    client_id: string,
    params: Partial<PaginationOptions & APIParams> = {}
  ): Promise<[ ClientConsensusStates, Pagination ]> {
    return this.c
      .get<{
        consensus_states: ClientConsensusStates.Data;
        pagination: Pagination;
      }>(`/ibc/core/client/v1/consensus_states/${client_id}`, params)
      .then(d => [
        ClientConsensusStates.fromData(d.consensus_states),
        d.pagination,
      ]);
  }

  public async consensusStateHeights(
    client_id: string,
    params: Partial<PaginationOptions & APIParams> = {}
  ): Promise<[ Height[], Pagination ]> {
    return this.c
      .get<{
        consensus_state_heights: Height.Data[];
        pagination: Pagination;
      }>(`/ibc/core/client/v1/consensus_states/${client_id}/heights`, params)
      .then(d => [
        d.consensus_state_heights.map(Height.fromData),
        d.pagination,
      ]);
  }

  public async consensusStateByHeight(
    client_id: string,
    height: Height,
    params: APIParams = {}
  ): Promise<[ ConsensusStateWithHeight, Proof ]> {
    return this.c
      .get<{
        consensus_state: ConsensusStateWithHeight.Data;
        proof: string | null;
        proof_height: Height.Data;
      }>(`/ibc/core/client/v1/consensus_states/${client_id}/revision/${height.revision_number}/height/${height.revision_height}`, params)
      .then(d => [
        ConsensusStateWithHeight.fromData(d.consensus_state),
        {
          proof: d.proof ?? '',
          proof_height: Height.fromData(d.proof_height),
        },
      ]);
  }

  public async consensusStateByChannel(
    port_channel: PortChannel,
    height: Height,
    params: APIParams = {}
  ): Promise<[ ConsensusStateWithHeight, Proof ]> {
    return this.c
      .get<{
        consensus_state: ConsensusStateWithHeight.Data;
        client_id: string;
        proof: string | null;
        proof_height: Height.Data;
      }>(`/ibc/core/channel/v1/channels/${port_channel.channel_id}/ports/${port_channel.port_id}/consensus_state/revision/${height.revision_number}/height/${height.revision_height}`, params)
      .then(d => [
        ConsensusStateWithHeight.fromData(d.consensus_state),
        {
          proof: d.proof ?? '',
          proof_height: Height.fromData(d.proof_height),
        },
      ]);
  }

  public async consensusStateByConnection(
    connection_id: string,
    height: Height,
    params: APIParams = {}
  ): Promise<[ ConsensusStateWithHeight, Proof ]> {
    return this.c
      .get<{
        client_id: string;
        consensus_state: ConsensusStateWithHeight.Data;
        proof: string | null;
        proof_height: Height.Data;
      }>(`/ibc/core/connection/v1/connections/${connection_id}/consensus_state/revision/${height.revision_number}/height/${height.revision_height}`, params)
      .then(d => [
        ConsensusStateWithHeight.fromData(d.consensus_state),
        {
          proof: d.proof ?? '',
          proof_height: Height.fromData(d.proof_height),
        },
      ]);
  }

  public async upgradedClientStates(
    params: Partial<PaginationOptions & APIParams> = {}
  ): Promise<TypedValue> {
    return this.c
      .get<{
        upgraded_client_state: any;
      }>('/ibc/core/client/v1/upgraded_client_states', params)
      .then(d => ({
        type_url: d.upgraded_client_state.type_url ?? '',
        value: d.upgraded_client_state.value ?? '',
      }));
  }

  public async upgradedConsensusStates(
    params: Partial<PaginationOptions & APIParams> = {}
  ): Promise<TypedValue> {
    return this.c
      .get<{
        upgraded_consensus_state: any;
      }>('/ibc/core/client/v1/upgraded_consensus_states', params)
      .then(d => ({
        type_url: d.upgraded_consensus_state.type_url ?? '',
        value: d.upgraded_consensus_state.value ?? '',
      }));
  }

  public async verifyMembership(
    membership: VerifyMembership,
  ): Promise<boolean> {
    return await this.c.post<{
      success: boolean;
    }>(
      '/ibc/core/client/v1/verify_membership',
      VerifyMembership.toData(membership),
    ).then(d => d.success);
  }
}
