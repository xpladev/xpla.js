import { JSONSerializable } from '../../../../../util/json';
import { ConsensusStateWithHeightV1 } from './ConsensusStateWithHeight';
import { ClientConsensusStates as ClientConsensusStatesV1_pb } from '@xpla/xpla.proto/ibc/core/client/v1/client';

/**
 * ClientConsensusStates defines all the stored consensus states for a given client/
 */
export class ClientConsensusStatesV1 extends JSONSerializable<
  ClientConsensusStatesV1.Amino,
  ClientConsensusStatesV1.Data,
  ClientConsensusStatesV1.Proto
> {
  /**
   * @param client_id client identifier
   * @param consensus_states consensus states and their heights associated with the client
   */
  constructor(
    public client_id: string,
    public consensus_states: ConsensusStateWithHeightV1[]
  ) {
    super();
  }

  public static fromAmino(
    data: ClientConsensusStatesV1.Amino
  ): ClientConsensusStatesV1 {
    const { client_id, consensus_states } = data;
    return new ClientConsensusStatesV1(
      client_id,
      consensus_states.map(ConsensusStateWithHeightV1.fromAmino)
    );
  }

  public toAmino(): ClientConsensusStatesV1.Amino {
    const { client_id, consensus_states } = this;
    const res: ClientConsensusStatesV1.Amino = {
      client_id: client_id,
      consensus_states: consensus_states.map(state => state.toAmino()),
    };
    return res;
  }

  public static fromData(
    data: ClientConsensusStatesV1.Data
  ): ClientConsensusStatesV1 {
    const { client_id, consensus_states } = data;
    return new ClientConsensusStatesV1(
      client_id,
      consensus_states.map(state => ConsensusStateWithHeightV1.fromData(state))
    );
  }

  public toData(): ClientConsensusStatesV1.Data {
    const { client_id, consensus_states } = this;
    const res: ClientConsensusStatesV1.Data = {
      client_id,
      consensus_states: consensus_states.map(state => state.toData()),
    };
    return res;
  }

  public static fromProto(
    proto: ClientConsensusStatesV1.Proto
  ): ClientConsensusStatesV1 {
    return new ClientConsensusStatesV1(
      proto.clientId,
      proto.consensusStates.map(ConsensusStateWithHeightV1.fromProto)
    );
  }

  public toProto(): ClientConsensusStatesV1.Proto {
    const { client_id, consensus_states } = this;
    return ClientConsensusStatesV1_pb.fromPartial({
      clientId: client_id,
      consensusStates: consensus_states.map(state => state.toProto()),
    });
  }
}

export namespace ClientConsensusStatesV1 {
  export interface Amino {
    client_id: string;
    consensus_states: ConsensusStateWithHeightV1.Amino[];
  }

  export interface Data {
    client_id: string;
    consensus_states: ConsensusStateWithHeightV1.Data[];
  }

  export type Proto = ClientConsensusStatesV1_pb;
}
