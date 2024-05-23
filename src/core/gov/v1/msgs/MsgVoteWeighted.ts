/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { WeightedVoteOptionV1 } from '../Vote';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgVoteWeighted as MsgVoteWeightedV1_pb } from '@xpla/xpla.proto/cosmos/gov/v1/tx';

/**
 * Weighted vote for a proposal
 */
export class MsgVoteWeightedV1 extends JSONSerializable<
  MsgVoteWeightedV1.Amino,
  MsgVoteWeightedV1.Data,
  MsgVoteWeightedV1.Proto
> {
  /**
   * @param proposal_id defines the unique id of the proposal
   * @param voter is the voter address for the proposal
   * @param options defines the weighted vote options
   * @param metadata is any arbitrary metadata attached to the VoteWeighted
   */
  constructor(
    public proposal_id: number,
    public voter: AccAddress,
    public options: WeightedVoteOptionV1[],
    public metadata: string
  ) {
    super();
  }

  public static fromAmino(
    data: MsgVoteWeightedV1.Amino,
    _isClassic?: boolean
  ): MsgVoteWeightedV1 {
    const {
      value: { proposal_id, voter, options, metadata },
    } = data;
    return new MsgVoteWeightedV1(
      Number.parseInt(proposal_id),
      voter,
      options.map(o => WeightedVoteOptionV1.fromAmino(o)),
      metadata
    );
  }

  public toAmino(isClassic?: boolean): MsgVoteWeightedV1.Amino {
    const { proposal_id, voter, options, metadata } = this;
    return {
      type: isClassic ? 'gov/MsgVoteWeighted' : 'cosmos-sdk/MsgVoteWeighted',
      value: {
        proposal_id: proposal_id.toFixed(),
        voter,
        options: options.map(o => o.toAmino()),
        metadata,
      },
    };
  }

  public static fromData(
    data: MsgVoteWeightedV1.Data,
    _isClassic?: boolean
  ): MsgVoteWeightedV1 {
    const { proposal_id, voter, options, metadata } = data;
    return new MsgVoteWeightedV1(
      Number.parseInt(proposal_id),
      voter,
      options.map(o => WeightedVoteOptionV1.fromData(o)),
      metadata
    );
  }

  public toData(_isClassic?: boolean): MsgVoteWeightedV1.Data {
    const { proposal_id, voter, options, metadata } = this;
    return {
      '@type': '/cosmos.gov.v1.MsgVoteWeighted',
      proposal_id: proposal_id.toFixed(),
      voter,
      options: options.map(o => o.toData()),
      metadata,
    };
  }

  public static fromProto(
    proto: MsgVoteWeightedV1.Proto,
    _isClassic?: boolean
  ): MsgVoteWeightedV1 {
    return new MsgVoteWeightedV1(
      proto.proposalId.toNumber(),
      proto.voter,
      proto.options.map(o => WeightedVoteOptionV1.fromProto(o)),
      proto.metadata
    );
  }

  public toProto(_isClassic?: boolean): MsgVoteWeightedV1.Proto {
    const { proposal_id, voter, options, metadata } = this;
    return MsgVoteWeightedV1_pb.fromPartial({
      proposalId: proposal_id,
      voter,
      options: options.map(o => o.toProto()),
      metadata,
    });
  }

  public packAny(_isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.gov.v1.MsgVoteWeighted',
      value: MsgVoteWeightedV1_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    _isClassic?: boolean
  ): MsgVoteWeightedV1 {
    return MsgVoteWeightedV1.fromProto(
      MsgVoteWeightedV1_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgVoteWeightedV1 {
  export interface Amino {
    type: 'gov/MsgVoteWeighted' | 'cosmos-sdk/MsgVoteWeighted';
    value: {
      proposal_id: string;
      voter: AccAddress;
      options: WeightedVoteOptionV1.Amino[];
      metadata: string;
    };
  }

  export interface Data {
    '@type': '/cosmos.gov.v1.MsgVoteWeighted';
    proposal_id: string;
    voter: AccAddress;
    options: WeightedVoteOptionV1.Data[];
    metadata: string;
  }

  export type Proto = MsgVoteWeightedV1_pb;
}
