import { BaseAPI } from './BaseAPI';
import { APIParams, Pagination, PaginationOptions } from '../APIRequester';
import { Int, Numeric } from '../../../core/numeric';
import {
  ChannelV1,
  IbcChannelCounterpartyV1 as PortChannel,
  PacketIdV1,
  PacketStateV1,
  ConnectionEndV1,
  HeightV1,
  IdentifiedClientStateV1,
  ConsensusStateWithHeightV1,
  IbcClientParamsV1,
  IbcConnectionParamsV1,
  ConnectionPathsV1,
} from '../../../core/ibc/core';
import {
  ClientStateV1,
  ConsensusStateV1,
} from '../../../core/ibc/lightclient';
import { LCDClient } from '../LCDClient';
import { Convert } from '../../../util/convert';

export interface Proof {
  proof: string;
  proof_height: HeightV1;
}
export namespace Proof {
  export interface Data {
    proof: string;
    proof_height: HeightV1.Data;
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
  proof: Uint8Array;
  /** the height of the commitment root at which the proof is verified. */
  proof_height?: HeightV1;
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
    proof_height?: HeightV1.Data;
    value: string; // base64
    time_delay?: string;
    block_delay?: string;
  }

  export function toData(src: VerifyMembership): VerifyMembership.Data {
    const res: VerifyMembership.Data = {
      client_id: src.client_id,
      proof: Convert.toBase64(src.proof),
      proof_height: src.proof_height ? src.proof_height.toData() : undefined,
      value: Convert.toBase64(src.value),
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
  ): Promise<[ ChannelV1[], Pagination, HeightV1 ]> {
    return this.c
      .get<{
        channels: ChannelV1.Data[];
        height: HeightV1.Data;
        pagination: Pagination;
      }>(`/ibc/core/channel/v1/channels`, params)
      .then(d => [
        d.channels.map(ChannelV1.fromData),
        d.pagination,
        HeightV1.fromData(d.height),
      ]);
  }

  public async channelsByConnection(
    connection_id: string,
    params: Partial<PaginationOptions & APIParams> = {}
  ): Promise<[ ChannelV1[], Pagination, HeightV1 ]> {
    return this.c
      .get<{
        channels: ChannelV1.Data[];
        height: HeightV1.Data;
        pagination: Pagination;
      }>(`/ibc/core/channel/v1/connections/${connection_id}/channels`, params)
      .then(d => [
        d.channels.map(ChannelV1.fromData),
        d.pagination,
        HeightV1.fromData(d.height),
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
  ): Promise<[ ChannelV1, Proof ]> {
    return this.c
      .get<{
        channel: ChannelV1.Data;
        proof: string | null;
        proof_height: HeightV1.Data;
      }>(`/ibc/core/channel/v1/channels/${port_channel.channel_id}/ports/${port_channel.port_id}`, params)
      .then(d => {
        return [
          ChannelV1.fromData(d.channel),
          {
            proof: d.proof ?? '',
            proof_height: HeightV1.fromData(d.proof_height),
          },
        ];
      });
  }

  /**
   * @param channel_id channel identifier
   * @param port_id port name
   */
  public async channelClientState(
    port_channel: PortChannel,
    params: APIParams = {}
  ): Promise<[ ChannelV1, Proof ]> {
    return this.c
      .get<{
        channel: ChannelV1.Data,
        proof: string | null,
        proof_height: HeightV1.Data,
      }>(`/ibc/core/channel/v1/channels/${port_channel.channel_id}/ports/${port_channel.port_id}`, params)
      .then(d => {
        return [
          ChannelV1.fromData(d.channel),
          {
            proof: d.proof ?? '',
            proof_height: HeightV1.fromData(d.proof_height),
          },
        ];
      });
  }

  /**
   * @param channel_id channel identifier
   * @param port_id port name
   */
  public async channelConsensusState(
    port_channel: PortChannel,
    height: HeightV1,
    params: APIParams = {}
  ): Promise<[ ConsensusStateV1, Proof ]> {
    return this.c
      .get<{
        consensus_state: ConsensusStateV1.Data,
        proof: string | null,
        proof_height: HeightV1.Data,
      }>(`/ibc/core/channel/v1/channels/${port_channel.channel_id}/ports/${port_channel.port_id}/consensus_state/revision/${height.revision_number}/height/${height.revision_height}`, params)
      .then(d => {
        return [
          ConsensusStateV1.fromData(d.consensus_state),
          {
            proof: d.proof ?? '',
            proof_height: HeightV1.fromData(d.proof_height),
          },
        ];
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
        proof_height: HeightV1.Data;
      }>(`/ibc/core/channel/v1/channels/${port_channel.channel_id}/ports/${port_channel.port_id}/next_sequence`, params)
      .then(d => [
        new Int(d.next_sequence_receive),
        {
          proof: d.proof ?? '',
          proof_height: HeightV1.fromData(d.proof_height),
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
        proof_height: HeightV1.Data;
      }>(`/ibc/core/channel/v1/channels/${port_channel.channel_id}/ports/${port_channel.port_id}/next_sequence_send`, params)
      .then(d => [
        new Int(d.next_sequence_send),
        {
          proof: d.proof ?? '',
          proof_height: HeightV1.fromData(d.proof_height),
        }
      ]);
  }

  public async nextSequenceSendByClient(
    client_id: string,
    params: APIParams = {}
  ): Promise<[ Int, Proof ]> {
    return this.c
      .get<{
        next_sequence_send: Numeric.Input;
        proof: string | null;
        proof_height: HeightV1.Data;
      }>(`/ibc/core/channel/v2/clients/${client_id}/next_sequence_send`, params)
      .then(d => [
        new Int(d.next_sequence_send),
        {
          proof: d.proof ?? '',
          proof_height: HeightV1.fromData(d.proof_height),
        }
      ]);
  }

  public async packetAcknowledgements(
    port_channel: PortChannel,
    params: Partial<PaginationOptions & APIParams> = {}
  ): Promise<[ PacketStateV1[], Pagination, HeightV1 ]> {
    return this.c
      .get<{
        acknowledgements: PacketStateV1.Data[];
        height: HeightV1.Data;
        pagination: Pagination;
      }>(`/ibc/core/channel/v1/channels/${port_channel.channel_id}/ports/${port_channel.port_id}/packet_acknowledgements`, params)
      .then(d => [
        d.acknowledgements.map(PacketStateV1.fromData),
        d.pagination,
        HeightV1.fromData(d.height),
      ]);
  }

  public async packetAcknowledgementsByClient(
    client_id: string,
    params: Partial<PaginationOptions & APIParams> = {}
  ): Promise<[ PacketStateV1[], Pagination, HeightV1 ]> {
    return this.c
      .get<{
        acknowledgements: PacketStateV1.Data[];
        height: HeightV1.Data;
        pagination: Pagination;
      }>(`/ibc/core/channel/v2/clients/${client_id}/packet_acknowledgements`, params)
      .then(d => [
        d.acknowledgements.map(PacketStateV1.fromData),
        d.pagination,
        HeightV1.fromData(d.height),
      ]);
  }

  public async packetAcknowledgement(
    packet_id: PacketIdV1,
    params: APIParams = {}
  ): Promise<[ string, Proof ]> {
    return this.c
      .get<{
        acknowledgement: string;
        proof: string | null;
        proof_height: HeightV1.Data;
      }>(`/ibc/core/channel/v1/channels/${packet_id.channel_id}/ports/${packet_id.port_id}/packet_acks/${packet_id.sequence}`, params)
      .then(d => [
        d.acknowledgement,
        {
          proof: d.proof ?? '',
          proof_height: HeightV1.fromData(d.proof_height),
        }
      ]);
  }

  public async packetAcknowledgementByClient(
    client_id: string,
    sequence: string,
    params: APIParams = {}
  ): Promise<[ string, Proof ]> {
    return this.c
      .get<{
        acknowledgement: string;
        proof: string | null;
        proof_height: HeightV1.Data;
      }>(`/ibc/core/channel/v2/clients/${client_id}/packet_acks/${sequence}`, params)
      .then(d => [
        d.acknowledgement,
        {
          proof: d.proof ?? '',
          proof_height: HeightV1.fromData(d.proof_height),
        }
      ]);
  }

  public async packetCommitments(
    port_channel: PortChannel,
    params: Partial<PaginationOptions & APIParams> = {}
  ): Promise<[ PacketStateV1[], Pagination, HeightV1 ]> {
    return this.c
      .get<{
        commitments: PacketStateV1.Data[];
        height: HeightV1.Data;
        pagination: Pagination;
      }>(`/ibc/core/channel/v1/channels/${port_channel.channel_id}/ports/${port_channel.port_id}/packet_commitments`, params)
      .then(d => [
        d.commitments.map(PacketStateV1.fromData),
        d.pagination,
        HeightV1.fromData(d.height),
      ]);
  }

  public async packetCommitmentsByClient(
    client_id: string,
    params: Partial<PaginationOptions & APIParams> = {}
  ): Promise<[ PacketStateV1[], Pagination, HeightV1 ]> {
    return this.c
      .get<{
        commitments: PacketStateV1.Data[];
        height: HeightV1.Data;
        pagination: Pagination;
      }>(`/ibc/core/channel/v2/clients/${client_id}/packet_commitments`, params)
      .then(d => [
        d.commitments.map(PacketStateV1.fromData),
        d.pagination,
        HeightV1.fromData(d.height),
      ]);
  }

  public async packetCommitment(
    packet_id: PacketIdV1,
    params: APIParams = {}
  ): Promise<[ string, Proof ]> {
    return this.c
      .get<{
        commitment: string;
        proof: string | null;
        proof_height: HeightV1.Data;
      }>(`/ibc/core/channel/v1/channels/${packet_id.channel_id}/ports/${packet_id.port_id}/packet_commitments/${packet_id.sequence}`, params)
      .then(d => [
        d.commitment,
        {
          proof: d.proof ?? '',
          proof_height: HeightV1.fromData(d.proof_height),
        }
      ]);
  }

  public async packetCommitmentByClient(
    client_id: string,
    sequence: Numeric.Input,
    params: APIParams = {}
  ): Promise<[ string, Proof ]> {
    return this.c
      .get<{
        commitment: string;
        proof: string | null;
        proof_height: HeightV1.Data;
      }>(`/ibc/core/channel/v2/clients/${client_id}/packet_commitments/${sequence}`, params)
      .then(d => [
        d.commitment,
        {
          proof: d.proof ?? '',
          proof_height: HeightV1.fromData(d.proof_height),
        }
      ]);
  }

  public async packetCommitmentUnreceivedAcknowledgements(
    packet_id: PacketIdV1,
    params: APIParams = {}
  ): Promise<[ string[], HeightV1 ]> {
    return this.c
      .get<{
        sequences: string[];
        height: HeightV1.Data;
      }>(`/ibc/core/channel/v1/channels/${packet_id.channel_id}/ports/${packet_id.port_id}/packet_commitments/${packet_id.sequence}/unreceived_acks`, params)
      .then(d => [
        d.sequences,
        HeightV1.fromData(d.height),
      ]);
  }

  public async packetCommitmentUnreceivedAcknowledgementsByClient(
    client_id: string,
    packet_ack_sequences: string[],
    params: APIParams = {}
  ): Promise<[ string[], HeightV1 ]> {
    return this.c
      .get<{
        sequences: string[];
        height: HeightV1.Data;
      }>(`/ibc/core/channel/v2/clients/${client_id}/packet_commitments/${packet_ack_sequences.join(',')}/unreceived_acks`, params)
      .then(d => [
        d.sequences,
        HeightV1.fromData(d.height),
      ]);
  }

  public async packetCommitmentUnreceivedPackets(
    packet_id: PacketIdV1,
    params: APIParams = {}
  ): Promise<[ string[], HeightV1 ]> {
    return this.c
      .get<{
        sequences: string[];
        height: HeightV1.Data;
      }>(`/ibc/core/channel/v1/channels/${packet_id.channel_id}/ports/${packet_id.port_id}/packet_commitments/${packet_id.sequence}/unreceived_packets`, params)
      .then(d => [
        d.sequences,
        HeightV1.fromData(d.height),
      ]);
  }

  public async packetCommitmentUnreceivedPacketsByClient(
    client_id: string,
    sequences: string[],
    params: APIParams = {}
  ): Promise<[ string[], HeightV1 ]> {
    return this.c
      .get<{
        sequences: string[];
        height: HeightV1.Data;
      }>(`/ibc/core/channel/v2/clients/${client_id}/packet_commitments/${sequences.join(',')}/unreceived_packets`, params)
      .then(d => [
        d.sequences,
        HeightV1.fromData(d.height),
      ]);
  }

  public async packetReceipts(
    packet_id: PacketIdV1,
    params: APIParams = {}
  ): Promise<[ boolean, Proof ]> {
    return this.c
      .get<{
        received: boolean;
        proof: string | null;
        proof_height: HeightV1.Data;
      }>(`/ibc/core/channel/v1/channels/${packet_id.channel_id}/ports/${packet_id.port_id}/packet_receipts/${packet_id.sequence}`, params)
      .then(d => [
        d.received,
        {
          proof: d.proof ?? '',
          proof_height: HeightV1.fromData(d.proof_height),
        }
      ]);
  }

  public async packetReceiptsByClient(
    client_id: string,
    sequence: string,
    params: APIParams = {}
  ): Promise<[ boolean, Proof ]> {
    return this.c
      .get<{
        received: boolean;
        proof: string | null;
        proof_height: HeightV1.Data;
      }>(`/ibc/core/channel/v2/clients/${client_id}/packet_receipts/${sequence}`, params)
      .then(d => [
        d.received,
        {
          proof: d.proof ?? '',
          proof_height: HeightV1.fromData(d.proof_height),
        }
      ]);
  }

  /**
   *  query all the IBC connections of a chain
   */
  public async connections(
    params: APIParams = {}
  ): Promise<[ ConnectionEndV1[], Pagination, HeightV1 ]> {
    return this.c
      .get<{
        connections: ConnectionEndV1.Data[];
        height: HeightV1.Data;
        pagination: Pagination;
      }>(`/ibc/core/connection/v1/connections`, params)
      .then(d => [
        d.connections.map(ConnectionEndV1.fromData),
        d.pagination,
        HeightV1.fromData(d.height),
      ]);
  }

  public async clientConnectionPaths(
    client_id: string,
    params: APIParams = {}
  ): Promise<[ ConnectionPathsV1, Proof ]> {
    return this.c
      .get<{
        connection_paths: string[];
        proof: string | null;
        proof_height: HeightV1.Data;
      }>(`/ibc/core/connection/v1/client_connections/${client_id}`, params)
      .then(d => [
        ConnectionPathsV1.fromData({
          client_id,
          paths: d.connection_paths,
        }),
        {
          proof: d.proof ?? '',
          proof_height: HeightV1.fromData(d.proof_height),
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
  ): Promise<[ ConnectionEndV1, Proof ]> {
    return this.c
      .get<{
        connection: ConnectionEndV1.Data;
        proof: string | null;
        proof_height: HeightV1.Data;
      }>(`/ibc/core/connection/v1/connections/${connection_id}`, params)
      .then(d => [
        ConnectionEndV1.fromData(d.connection),
        {
          proof: d.proof ?? '',
          proof_height: HeightV1.fromData(d.proof_height),
        }
      ]);
  }

  public async connectionClientState(
    connection_id: string,
    params: APIParams = {}
  ): Promise<[ IdentifiedClientStateV1, Proof ]> {
    return this.c
      .get<{
        identified_client_state: IdentifiedClientStateV1.Data;
        proof: string | null;
        proof_height: HeightV1.Data;
      }>(`/ibc/core/connection/v1/connections/${connection_id}/client_state`, params)
      .then(d => [
        IdentifiedClientStateV1.fromData(d.identified_client_state),
        {
          proof: d.proof ?? '',
          proof_height: HeightV1.fromData(d.proof_height),
        }
      ]);
  }

  public async connectionConsensusState(
    connection_id: string,
    height: HeightV1,
    params: APIParams = {}
  ): Promise<[ { client_id: string, consensus_state: ConsensusStateV1 }, Proof ]> {
    return this.c
      .get<{
        client_id: string;
        consensus_state: ConsensusStateV1.Data;
        proof: string | null;
        proof_height: HeightV1.Data;
      }>(`/ibc/core/connection/v1/connections/${connection_id}/consensus_state/revision/${height.revision_number}/height/${height.revision_height}`, params)
      .then(d => [
        {
          client_id: d.client_id,
          consensus_state: ConsensusStateV1.fromData(d.consensus_state),
        },
        {
          proof: d.proof ?? '',
          proof_height: HeightV1.fromData(d.proof_height),
        }
      ]);
  }

  public async clientCreator(
    client_id: string,
    params: APIParams = {}
  ): Promise<string> {
    return this.c
      .get<{ creator: string }>(`/ibc/core/client/v1/client_creator/${client_id}`, params)
      .then(d => d.creator);
  }

  /**
   * query all the IBC light clients of a chain
   */
  public async clientStates(
    params: Partial<PaginationOptions & APIParams> = {}
  ): Promise<[ { client_id: string, client_state: ClientStateV1 }[], Pagination ]> {
    return this.c
      .get<{
        client_states: { client_id: string, client_state: ClientStateV1.Data }[];
        pagination: Pagination;
      }>(`/ibc/core/client/v1/client_states`, params)
      .then(d => [
        d.client_states.map(({ client_id, client_state }) => ({
          client_id,
          client_state: ClientStateV1.fromData(client_state),
        })),
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
  ): Promise<[ ClientStateV1, Proof ]> {
    return this.c
      .get<{
        client_state: ClientStateV1.Data;
        proof: string | null;
        proof_height: HeightV1.Data;
      }>(`/ibc/core/client/v1/client_states/${client_id}`, params)
      .then(d => [
        ClientStateV1.fromData(d.client_state),
        {
          proof: d.proof ?? '',
          proof_height: HeightV1.fromData(d.proof_height),
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
  ): Promise<string> {
    return this.c
      .get<{ status: string }>(`/ibc/core/client/v1/client_status/${client_id}`, params)
      .then(d => d.status);
  }

  /**
   * query all the consensus state associated with a given client
   * @param client_id client identifier
   * @returns
   */
  public async clientConsensusStates(
    client_id: string,
    params: Partial<PaginationOptions & APIParams> = {}
  ): Promise<[ { height: HeightV1, consensus_state: ConsensusStateV1 }[], Pagination ]> {
    return this.c
      .get<{
        consensus_states: {
          height: HeightV1.Data;
          consensus_state: ConsensusStateV1.Data;
        }[];
        pagination: Pagination;
      }>(`/ibc/core/client/v1/consensus_states/${client_id}`, params)
      .then(d => [
        d.consensus_states.map(({ height, consensus_state }) => ({
          height: HeightV1.fromData(height),
          consensus_state: ConsensusStateV1.fromData(consensus_state),
        })),
        d.pagination,
      ]);
  }

  public async clientConsensusStateHeights(
    client_id: string,
    params: Partial<PaginationOptions & APIParams> = {}
  ): Promise<[ HeightV1[], Pagination ]> {
    return this.c
      .get<{
        consensus_state_heights: HeightV1.Data[];
        pagination: Pagination;
      }>(`/ibc/core/client/v1/consensus_states/${client_id}/heights`, params)
      .then(d => [
        d.consensus_state_heights.map(HeightV1.fromData),
        d.pagination,
      ]);
  }

  public async clientConsensusStateByHeight(
    client_id: string,
    height: HeightV1,
    params: APIParams = {}
  ): Promise<[ ConsensusStateV1, Proof ]> {
    return this.c
      .get<{
        consensus_state: ConsensusStateV1.Data;
        proof: string | null;
        proof_height: HeightV1.Data;
      }>(`/ibc/core/client/v1/consensus_states/${client_id}/revision/${height.revision_number}/height/${height.revision_height}`, params)
      .then(d => [
        ConsensusStateV1.fromData(d.consensus_state),
        {
          proof: d.proof ?? '',
          proof_height: HeightV1.fromData(d.proof_height),
        },
      ]);
  }

  public async upgradedClientStates(
    params: Partial<PaginationOptions & APIParams> = {}
  ): Promise<ClientStateV1> {
    return this.c
      .get<{
        upgraded_client_state: ClientStateV1.Data;
      }>('/ibc/core/client/v1/upgraded_client_states', params)
      .then(d => ClientStateV1.fromData(d.upgraded_client_state));
  }

  public async upgradedConsensusStates(
    params: Partial<PaginationOptions & APIParams> = {}
  ): Promise<ConsensusStateV1> {
    return this.c
      .get<{
        upgraded_consensus_state: ConsensusStateV1.Data;
      }>('/ibc/core/client/v1/upgraded_consensus_states', params)
      .then(d => ConsensusStateV1.fromData(d.upgraded_consensus_state));
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

  public async clientParameters(params: APIParams = {}): Promise<IbcClientParamsV1> {
    return this.c
      .get<{ params: IbcClientParamsV1.Data }>('/ibc/client/v1/params', params)
      .then(({ params: d }) => IbcClientParamsV1.fromData(d));
  }

  public async channelParameters(_: APIParams = {}): Promise<any> {
    throw new Error('Not Implemented');
  }

  public async connectionParameters(params: APIParams = {}): Promise<IbcConnectionParamsV1> {
    return this.c
      .get<{ params: IbcConnectionParamsV1.Data }>('/ibc/core/connection/v1/params', params)
      .then(({ params: d }) => IbcConnectionParamsV1.fromData(d));
  }
}
