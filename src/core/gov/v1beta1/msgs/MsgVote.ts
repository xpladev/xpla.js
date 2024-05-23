/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { VoteOption } from '@xpla/xpla.proto/cosmos/gov/v1beta1/gov';
import { MsgVote as MsgVoteV1B1_pb } from '@xpla/xpla.proto/cosmos/gov/v1beta1/tx';

/**
 * Vote for a proposal
 */
export class MsgVoteV1B1 extends JSONSerializable<
  MsgVoteV1B1.Amino,
  MsgVoteV1B1.Data,
  MsgVoteV1B1.Proto
> {
  /**
   * @param proposal_id ID of proposal to vote on
   * @param voter voter's account address
   * @param option one of voting options
   */
  constructor(
    public proposal_id: number,
    public voter: AccAddress,
    public option: VoteOption
  ) {
    super();
  }

  public static fromAmino(
    data: MsgVoteV1B1.Amino,
    _isClassic?: boolean
  ): MsgVoteV1B1 {
    const {
      value: { proposal_id, voter, option },
    } = data;
    return new MsgVoteV1B1(Number.parseInt(proposal_id), voter, option);
  }

  public toAmino(isClassic?: boolean): MsgVoteV1B1.Amino {
    const { proposal_id, voter, option } = this;
    return {
      type: isClassic ? 'gov/MsgVote' : 'cosmos-sdk/MsgVote',
      value: {
        proposal_id: proposal_id.toFixed(),
        voter,
        option,
      },
    };
  }

  public static fromData(
    data: MsgVoteV1B1.Data,
    _isClassic?: boolean
  ): MsgVoteV1B1 {
    const { proposal_id, voter, option } = data;
    return new MsgVoteV1B1(Number.parseInt(proposal_id), voter, option);
  }

  public toData(_isClassic?: boolean): MsgVoteV1B1.Data {
    const { proposal_id, voter, option } = this;
    return {
      '@type': '/cosmos.gov.v1beta1.MsgVote',
      proposal_id: proposal_id.toFixed(),
      voter,
      option,
    };
  }

  public static fromProto(
    proto: MsgVoteV1B1.Proto,
    _isClassic?: boolean
  ): MsgVoteV1B1 {
    return new MsgVoteV1B1(
      proto.proposalId.toNumber(),
      proto.voter,
      proto.option
    );
  }

  public toProto(_isClassic?: boolean): MsgVoteV1B1.Proto {
    const { proposal_id, voter, option } = this;
    return MsgVoteV1B1_pb.fromPartial({
      option,
      proposalId: proposal_id,
      voter,
    });
  }

  public packAny(_isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.gov.v1beta1.MsgVote',
      value: MsgVoteV1B1_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _isClassic?: boolean): MsgVoteV1B1 {
    return MsgVoteV1B1.fromProto(MsgVoteV1B1_pb.decode(msgAny.value));
  }
}

export namespace MsgVoteV1B1 {
  export const Option = VoteOption;
  export type Option = VoteOption;

  export interface Amino {
    type: 'gov/MsgVote' | 'cosmos-sdk/MsgVote';
    value: {
      proposal_id: string;
      voter: AccAddress;
      option: VoteOption;
    };
  }

  export interface Data {
    '@type': '/cosmos.gov.v1beta1.MsgVote';
    proposal_id: string;
    voter: AccAddress;
    option: Option;
  }

  export type Proto = MsgVoteV1B1_pb;
}
