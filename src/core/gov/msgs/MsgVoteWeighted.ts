/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { WeightedVoteOption } from '../Vote';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgVoteWeighted as MsgVoteWeighted_pb } from '@xpla/xpla.proto/cosmos/gov/v1beta1/tx';

/**
 * Weighted vote for a proposal
 */
export class MsgVoteWeighted extends JSONSerializable<
  MsgVoteWeighted.Amino,
  MsgVoteWeighted.Data,
  MsgVoteWeighted.Proto
> {
  /**
   * @param proposal_id ID of proposal to vote on
   * @param voter voter's account address
   * @param option one of voting options
   */
  constructor(
    public proposal_id: number,
    public voter: AccAddress,
    public options: WeightedVoteOption[]
  ) {
    super();
  }

  public static fromAmino(
    data: MsgVoteWeighted.Amino,
    _isClassic?: boolean
  ): MsgVoteWeighted {
    const {
      value: { proposal_id, voter, options },
    } = data;
    return new MsgVoteWeighted(
      Number.parseInt(proposal_id),
      voter,
      options.map(o => WeightedVoteOption.fromAmino(o))
    );
  }

  public toAmino(isClassic?: boolean): MsgVoteWeighted.Amino {
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
    data: MsgVoteWeighted.Data,
    _isClassic?: boolean
  ): MsgVoteWeighted {
    const { proposal_id, voter, options } = data;
    return new MsgVoteWeighted(
      Number.parseInt(proposal_id),
      voter,
      options.map(o => WeightedVoteOption.fromData(o))
    );
  }

  public toData(_isClassic?: boolean): MsgVoteWeighted.Data {
    const { proposal_id, voter, options } = this;
    return {
      '@type': '/cosmos.gov.v1beta1.MsgVoteWeighted',
      proposal_id: proposal_id.toFixed(),
      voter,
      options: options.map(o => o.toData()),
    };
  }

  public static fromProto(
    proto: MsgVoteWeighted.Proto,
    _isClassic?: boolean
  ): MsgVoteWeighted {
    return new MsgVoteWeighted(
      proto.proposalId.toNumber(),
      proto.voter,
      proto.options.map(o => WeightedVoteOption.fromProto(o))
    );
  }

  public toProto(_isClassic?: boolean): MsgVoteWeighted.Proto {
    const { proposal_id, voter, options } = this;
    return MsgVoteWeighted_pb.fromPartial({
      options: options.map(o => o.toProto()),
      proposalId: proposal_id,
      voter,
    });
  }

  public packAny(_isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.gov.v1beta1.MsgVoteWeighted',
      value: MsgVoteWeighted_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _isClassic?: boolean): MsgVoteWeighted {
    return MsgVoteWeighted.fromProto(MsgVoteWeighted_pb.decode(msgAny.value));
  }
}

export namespace MsgVoteWeighted {
  export interface Amino {
    type: 'gov/MsgVoteWeighted' | 'cosmos-sdk/MsgVoteWeighted';
    value: {
      proposal_id: string;
      voter: AccAddress;
      options: WeightedVoteOption.Amino[];
    };
  }

  export interface Data {
    '@type': '/cosmos.gov.v1beta1.MsgVoteWeighted';
    proposal_id: string;
    voter: AccAddress;
    options: WeightedVoteOption.Data[];
  }

  export type Proto = MsgVoteWeighted_pb;
}
