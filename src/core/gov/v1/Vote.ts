/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Dec, Numeric } from '../../numeric';
import {
  Vote as VoteV1_pb,
  VoteOption,
  WeightedVoteOption as WeightedVoteOptionV1_pb,
} from '@xpla/xpla.proto/cosmos/gov/v1/gov';

/**
 * Stores vote information for a proposal
 */
export class VoteV1 extends JSONSerializable<
  VoteV1.Amino,
  VoteV1.Data,
  VoteV1.Proto
> {
  public Option = VoteOption;

  /**
   * @param proposal_id defines the unique id of the proposal
   * @param voter is the voter address of the proposal
   * @param options is the weighted vote options
   * @param metadata is any  arbitrary metadata to attached to the vote
   */
  constructor(
    public proposal_id: number,
    public voter: AccAddress,
    public options: WeightedVoteOptionV1[],
    public metadata: string
  ) {
    super();
  }

  public static fromAmino(data: VoteV1.Amino, _?: boolean): VoteV1 {
    const { proposal_id, voter, options, metadata } = data;
    return new VoteV1(
      Number.parseInt(proposal_id),
      voter,
      options.map(v => WeightedVoteOptionV1.fromAmino(v)),
      metadata
    );
  }

  public toAmino(_?: boolean): VoteV1.Amino {
    const { proposal_id, voter, options, metadata } = this;

    const res: VoteV1.Amino = {
      proposal_id: proposal_id.toFixed(),
      voter,
      options: options.map(v => v.toAmino()),
      metadata,
    };

    return res;
  }

  public static fromData(data: VoteV1.Data, _?: boolean): VoteV1 {
    const { proposal_id, voter, options, metadata } = data;
    return new VoteV1(
      Number.parseInt(proposal_id),
      voter,
      options.map(v => WeightedVoteOptionV1.fromData(v)),
      metadata
    );
  }

  public toData(_?: boolean): VoteV1.Data {
    const { proposal_id, voter, options, metadata } = this;

    const res: VoteV1.Data = {
      proposal_id: proposal_id.toFixed(),
      voter,
      options: options.map(v => v.toData()),
      metadata,
    };

    return res;
  }

  public static fromProto(proto: VoteV1.Proto, _?: boolean): VoteV1 {
    return new VoteV1(
      proto.proposalId.toNumber(),
      proto.voter,
      proto.options.map(o => WeightedVoteOptionV1.fromProto(o)),
      proto.metadata
    );
  }

  public toProto(_?: boolean): VoteV1.Proto {
    const { proposal_id, voter, options, metadata } = this;
    return VoteV1_pb.fromPartial({
      proposalId: proposal_id,
      voter,
      options: options.map(o => o.toProto()),
      metadata,
    });
  }
}

export namespace VoteV1 {
  export interface Amino {
    proposal_id: string;
    voter: AccAddress;
    options: WeightedVoteOptionV1.Amino[];
    metadata: string;
  }

  export interface Data {
    proposal_id: string;
    voter: AccAddress;
    options: WeightedVoteOptionV1.Data[];
    metadata: string;
  }

  export type Proto = VoteV1_pb;
}

export class WeightedVoteOptionV1 extends JSONSerializable<
  WeightedVoteOptionV1.Amino,
  WeightedVoteOptionV1.Data,
  WeightedVoteOptionV1.Proto
> {
  public weight: Dec;
  constructor(public option: VoteOption, weight: Numeric.Input) {
    super();
    this.weight = new Dec(weight);
  }

  public static fromAmino(
    data: WeightedVoteOptionV1.Amino,
    _?: boolean
  ): WeightedVoteOptionV1 {
    const { option, weight } = data;
    return new WeightedVoteOptionV1(option, weight);
  }

  public toAmino(_?: boolean): WeightedVoteOptionV1.Amino {
    const { option, weight } = this;
    return {
      option,
      weight: weight.toFixed(),
    };
  }

  public static fromData(
    data: WeightedVoteOptionV1.Data,
    _?: boolean
  ): WeightedVoteOptionV1 {
    const { option, weight } = data;
    return new WeightedVoteOptionV1(option, weight);
  }

  public toData(_?: boolean): WeightedVoteOptionV1.Data {
    const { option, weight } = this;
    return {
      option,
      weight: weight.toFixed(),
    };
  }

  public static fromProto(
    proto: WeightedVoteOptionV1.Proto,
    _?: boolean
  ): WeightedVoteOptionV1 {
    const dec18 = new Dec(10).pow(18);
    return new WeightedVoteOptionV1(proto.option, new Dec(proto.weight).div(dec18));
  }

  public toProto(_?: boolean): WeightedVoteOptionV1.Proto {
    const { option, weight } = this;
    const dec18 = new Dec(10).pow(18);
    return WeightedVoteOptionV1_pb.fromPartial({
      option,
      weight: weight.mul(dec18).toFixed(0),
    });
  }
}

export namespace WeightedVoteOptionV1 {
  export interface Amino {
    option: VoteOption;
    weight: string;
  }

  export interface Data {
    option: VoteOption;
    weight: string;
  }

  export type Proto = WeightedVoteOptionV1_pb;
}
