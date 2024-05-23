/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { VoteOption } from '@xpla/xpla.proto/cosmos/gov/v1/gov';
import { MsgVote as MsgVoteV1_pb } from '@xpla/xpla.proto/cosmos/gov/v1/tx';

/**
 * Vote for a proposal
 */
export class MsgVoteV1 extends JSONSerializable<
  MsgVoteV1.Amino,
  MsgVoteV1.Data,
  MsgVoteV1.Proto
> {
  /**
   * @param proposal_id defines the unique id of the proposal
   * @param voter is the voter address for the proposal
   * @param option defines the vote option
   * @param metadata is any arbitrary metadata attached to the Vote
   */
  constructor(
    public proposal_id: number,
    public voter: AccAddress,
    public option: VoteOption,
    public metadata: string
  ) {
    super();
  }

  public static fromAmino(
    data: MsgVoteV1.Amino,
    _isClassic?: boolean
  ): MsgVoteV1 {
    const {
      value: { proposal_id, voter, option, metadata },
    } = data;
    return new MsgVoteV1(Number.parseInt(proposal_id), voter, option, metadata);
  }

  public toAmino(isClassic?: boolean): MsgVoteV1.Amino {
    const { proposal_id, voter, option, metadata } = this;
    return {
      type: isClassic ? 'gov/MsgVote' : 'cosmos-sdk/MsgVote',
      value: {
        proposal_id: proposal_id.toFixed(),
        voter,
        option,
        metadata,
      },
    };
  }

  public static fromData(
    data: MsgVoteV1.Data,
    _isClassic?: boolean
  ): MsgVoteV1 {
    const { proposal_id, voter, option, metadata } = data;
    return new MsgVoteV1(Number.parseInt(proposal_id), voter, option, metadata);
  }

  public toData(_isClassic?: boolean): MsgVoteV1.Data {
    const { proposal_id, voter, option, metadata } = this;
    return {
      '@type': '/cosmos.gov.v1.MsgVote',
      proposal_id: proposal_id.toFixed(),
      voter,
      option,
      metadata,
    };
  }

  public static fromProto(
    proto: MsgVoteV1.Proto,
    _isClassic?: boolean
  ): MsgVoteV1 {
    return new MsgVoteV1(
      proto.proposalId.toNumber(),
      proto.voter,
      proto.option,
      proto.metadata
    );
  }

  public toProto(_isClassic?: boolean): MsgVoteV1.Proto {
    const { proposal_id, voter, option, metadata } = this;
    return MsgVoteV1_pb.fromPartial({
      proposalId: proposal_id,
      voter,
      option,
      metadata,
    });
  }

  public packAny(_isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.gov.v1.MsgVote',
      value: MsgVoteV1_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _isClassic?: boolean): MsgVoteV1 {
    return MsgVoteV1.fromProto(MsgVoteV1_pb.decode(msgAny.value));
  }
}

export namespace MsgVoteV1 {
  export interface Amino {
    type: 'gov/MsgVote' | 'cosmos-sdk/MsgVote';
    value: {
      proposal_id: string;
      voter: AccAddress;
      option: VoteOption;
      metadata: string;
    };
  }

  export interface Data {
    '@type': '/cosmos.gov.v1.MsgVote';
    proposal_id: string;
    voter: AccAddress;
    option: VoteOption;
    metadata: string;
  }

  export type Proto = MsgVoteV1_pb;
}
