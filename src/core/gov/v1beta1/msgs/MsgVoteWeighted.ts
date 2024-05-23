/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { WeightedVoteOptionV1B1 } from '../Vote';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgVoteWeighted as MsgVoteWeightedV1B1_pb } from '@xpla/xpla.proto/cosmos/gov/v1beta1/tx';

/**
 * Weighted vote for a proposal
 */
export class MsgVoteWeightedV1B1 extends JSONSerializable<
  MsgVoteWeightedV1B1.Amino,
  MsgVoteWeightedV1B1.Data,
  MsgVoteWeightedV1B1.Proto
> {
  /**
   * @param proposal_id ID of proposal to vote on
   * @param voter voter's account address
   * @param option one of voting options
   */
  constructor(
    public proposal_id: number,
    public voter: AccAddress,
    public options: WeightedVoteOptionV1B1[]
  ) {
    super();
  }

  public static fromAmino(
    data: MsgVoteWeightedV1B1.Amino,
    _isClassic?: boolean
  ): MsgVoteWeightedV1B1 {
    const {
      value: { proposal_id, voter, options },
    } = data;
    return new MsgVoteWeightedV1B1(
      Number.parseInt(proposal_id),
      voter,
      options.map(o => WeightedVoteOptionV1B1.fromAmino(o))
    );
  }

  public toAmino(isClassic?: boolean): MsgVoteWeightedV1B1.Amino {
    const { proposal_id, voter, options } = this;
    return {
      type: isClassic ? 'gov/MsgVoteWeighted' : 'cosmos-sdk/MsgVoteWeighted',
      value: {
        proposal_id: proposal_id.toFixed(),
        voter,
        options: options.map(o => o.toAmino()),
      },
    };
  }

  public static fromData(
    data: MsgVoteWeightedV1B1.Data,
    _isClassic?: boolean
  ): MsgVoteWeightedV1B1 {
    const { proposal_id, voter, options } = data;
    return new MsgVoteWeightedV1B1(
      Number.parseInt(proposal_id),
      voter,
      options.map(o => WeightedVoteOptionV1B1.fromData(o))
    );
  }

  public toData(_isClassic?: boolean): MsgVoteWeightedV1B1.Data {
    const { proposal_id, voter, options } = this;
    return {
      '@type': '/cosmos.gov.v1beta1.MsgVoteWeighted',
      proposal_id: proposal_id.toFixed(),
      voter,
      options: options.map(o => o.toData()),
    };
  }

  public static fromProto(
    proto: MsgVoteWeightedV1B1.Proto,
    _isClassic?: boolean
  ): MsgVoteWeightedV1B1 {
    return new MsgVoteWeightedV1B1(
      proto.proposalId.toNumber(),
      proto.voter,
      proto.options.map(o => WeightedVoteOptionV1B1.fromProto(o))
    );
  }

  public toProto(_isClassic?: boolean): MsgVoteWeightedV1B1.Proto {
    const { proposal_id, voter, options } = this;
    return MsgVoteWeightedV1B1_pb.fromPartial({
      options: options.map(o => o.toProto()),
      proposalId: proposal_id,
      voter,
    });
  }

  public packAny(_isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.gov.v1beta1.MsgVoteWeighted',
      value: MsgVoteWeightedV1B1_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    _isClassic?: boolean
  ): MsgVoteWeightedV1B1 {
    return MsgVoteWeightedV1B1.fromProto(
      MsgVoteWeightedV1B1_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgVoteWeightedV1B1 {
  export interface Amino {
    type: 'gov/MsgVoteWeighted' | 'cosmos-sdk/MsgVoteWeighted';
    value: {
      proposal_id: string;
      voter: AccAddress;
      options: WeightedVoteOptionV1B1.Amino[];
    };
  }

  export interface Data {
    '@type': '/cosmos.gov.v1beta1.MsgVoteWeighted';
    proposal_id: string;
    voter: AccAddress;
    options: WeightedVoteOptionV1B1.Data[];
  }

  export type Proto = MsgVoteWeightedV1B1_pb;
}
