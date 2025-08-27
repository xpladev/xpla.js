import { HeightV1 } from './Height';
import { JSONSerializable } from '../../../../../util/json';
import { ConsensusStateWithHeight as ConsensusStateWithHeightV1_pb } from '@xpla/xpla.proto/ibc/core/client/v1/client';

/**
 * ConsensusStateWithHeight defines a consensus state with an additional height field.
 */
export class ConsensusStateWithHeightV1 extends JSONSerializable<
  ConsensusStateWithHeightV1.Amino,
  ConsensusStateWithHeightV1.Data,
  ConsensusStateWithHeightV1.Proto
> {
  /**
   * @param height consensus state height
   * @param consensus_state consensus state
   */
  constructor(
    public height: HeightV1 | undefined,
    public consensus_state: any,
  ) {
    super();
  }

  public static fromAmino(
    data: ConsensusStateWithHeightV1.Amino
  ): ConsensusStateWithHeightV1 {
    const { height, consensus_state } = data;
    return new ConsensusStateWithHeightV1(
      height ? HeightV1.fromAmino(height) : undefined,
      consensus_state
    );
  }

  public toAmino(): ConsensusStateWithHeightV1.Amino {
    const { height, consensus_state } = this;
    const res: ConsensusStateWithHeightV1.Amino = {
      height: height ? height.toAmino() : undefined,
      consensus_state: consensus_state,
    };
    return res;
  }

  public static fromData(
    data: ConsensusStateWithHeightV1.Data
  ): ConsensusStateWithHeightV1 {
    const { height, consensus_state } = data;
    return new ConsensusStateWithHeightV1(
      height ? HeightV1.fromData(height) : undefined,
      consensus_state
    );
  }

  public toData(): ConsensusStateWithHeightV1.Data {
    const { height, consensus_state } = this;
    const res: ConsensusStateWithHeightV1.Data = {
      height: height ? height.toData() : undefined,
      consensus_state,
    };
    return res;
  }

  public static fromProto(
    proto: ConsensusStateWithHeightV1.Proto
  ): ConsensusStateWithHeightV1 {
    return new ConsensusStateWithHeightV1(
      proto.height ? HeightV1.fromProto(proto.height) : undefined,
      proto.consensusState
    );
  }

  public toProto(): ConsensusStateWithHeightV1.Proto {
    const { height, consensus_state } = this;
    return ConsensusStateWithHeightV1_pb.fromPartial({
      height: height ? height.toProto() : undefined,
      consensusState: consensus_state,
    });
  }
}

export namespace ConsensusStateWithHeightV1 {
  export interface Amino {
    height?: HeightV1.Amino;
    consensus_state: any;
  }

  export interface Data {
    height?: HeightV1.Data;
    consensus_state: any;
  }

  export type Proto = ConsensusStateWithHeightV1_pb;
}
