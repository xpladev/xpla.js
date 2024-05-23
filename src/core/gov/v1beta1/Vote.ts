/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Dec, Numeric } from '../../numeric';
import {
  Vote as VoteV1B1_pb,
  VoteOption,
  WeightedVoteOption as WeightedVoteOptionV1B1_pb,
} from '@xpla/xpla.proto/cosmos/gov/v1beta1/gov';

/**
 * Stores vote information for a proposal
 */
export class VoteV1B1 extends JSONSerializable<
  VoteV1B1.Amino,
  VoteV1B1.Data,
  VoteV1B1.Proto
> {
  public Option = VoteOption;

  /**
   * @param proposal_id ID of proposal to vote on
   * @param voter voter's account address
   * @param options voting options
   */
  constructor(
    public proposal_id: number,
    public voter: AccAddress,
    public options: WeightedVoteOptionV1B1[]
  ) {
    super();
  }

  public static fromAmino(data: VoteV1B1.Amino, _?: boolean): VoteV1B1 {
    const { proposal_id, voter, options } = data;
    return new VoteV1B1(
      Number.parseInt(proposal_id),
      voter,
      options.map(v => WeightedVoteOptionV1B1.fromAmino(v))
    );
  }

  public toAmino(_?: boolean): VoteV1B1.Amino {
    const { proposal_id, voter, options } = this;

    const res: VoteV1B1.Amino = {
      proposal_id: proposal_id.toFixed(),
      voter,
      options: options.map(v => v.toAmino()),
    };

    return res;
  }

  public static fromData(data: VoteV1B1.Data, _?: boolean): VoteV1B1 {
    const { proposal_id, voter, options } = data;
    return new VoteV1B1(
      Number.parseInt(proposal_id),
      voter,
      options.map(v => WeightedVoteOptionV1B1.fromData(v))
    );
  }

  public toData(_?: boolean): VoteV1B1.Data {
    const { proposal_id, voter, options } = this;

    const res: VoteV1B1.Data = {
      proposal_id: proposal_id.toFixed(),
      voter,
      options: options.map(v => v.toData()),
    };

    return res;
  }

  public static fromProto(proto: VoteV1B1.Proto, _?: boolean): VoteV1B1 {
    return new VoteV1B1(
      proto.proposalId.toNumber(),
      proto.voter,
      proto.options.map(o => WeightedVoteOptionV1B1.fromProto(o))
    );
  }

  public toProto(_?: boolean): VoteV1B1.Proto {
    const { proposal_id, voter, options } = this;
    return VoteV1B1_pb.fromPartial({
      options: options.map(o => o.toProto()),
      proposalId: proposal_id,
      voter,
    });
  }
}

export namespace VoteV1B1 {
  export const Option = VoteOption;
  export type Option = VoteOption;

  export interface Amino {
    proposal_id: string;
    voter: AccAddress;
    options: WeightedVoteOptionV1B1.Amino[];
  }

  export interface Data {
    proposal_id: string;
    voter: AccAddress;
    options: WeightedVoteOptionV1B1.Data[];
  }

  export type Proto = VoteV1B1_pb;
}

export class WeightedVoteOptionV1B1 extends JSONSerializable<
  WeightedVoteOptionV1B1.Amino,
  WeightedVoteOptionV1B1.Data,
  WeightedVoteOptionV1B1.Proto
> {
  public weight: Dec;
  constructor(public option: VoteOption, weight: Numeric.Input) {
    super();
    this.weight = new Dec(weight);
  }

  public static fromAmino(
    data: WeightedVoteOptionV1B1.Amino,
    _?: boolean
  ): WeightedVoteOptionV1B1 {
    const { option, weight } = data;
    return new WeightedVoteOptionV1B1(option, weight);
  }

  public toAmino(_?: boolean): WeightedVoteOptionV1B1.Amino {
    const { option, weight } = this;
    return {
      option,
      weight: weight.toString(),
    };
  }

  public static fromData(
    data: WeightedVoteOptionV1B1.Data,
    _?: boolean
  ): WeightedVoteOptionV1B1 {
    const { option, weight } = data;
    return new WeightedVoteOptionV1B1(option, weight);
  }

  public toData(_?: boolean): WeightedVoteOptionV1B1.Data {
    const { option, weight } = this;
    return {
      option,
      weight: weight.toString(),
    };
  }

  public static fromProto(
    proto: WeightedVoteOptionV1B1.Proto,
    _?: boolean
  ): WeightedVoteOptionV1B1 {
    return new WeightedVoteOptionV1B1(proto.option, proto.weight);
  }

  public toProto(_?: boolean): WeightedVoteOptionV1B1.Proto {
    const { option, weight } = this;
    return WeightedVoteOptionV1B1_pb.fromPartial({
      option,
      weight: weight.toString(),
    });
  }
}

export namespace WeightedVoteOptionV1B1 {
  export interface Amino {
    option: VoteOption;
    weight: string;
  }

  export interface Data {
    option: VoteOption;
    weight: string;
  }

  export type Proto = WeightedVoteOptionV1B1_pb;
}
