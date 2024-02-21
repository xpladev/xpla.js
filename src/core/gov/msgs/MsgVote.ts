/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgVote as MsgVote_pb } from '@xpla/xpla.proto/cosmos/gov/v1beta1/tx';
import { VoteOption } from '@xpla/xpla.proto/cosmos/gov/v1beta1/gov';

/**
 * Vote for a proposal
 */
export class MsgVote extends JSONSerializable<
  MsgVote.Amino,
  MsgVote.Data,
  MsgVote.Proto
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

  public static fromAmino(data: MsgVote.Amino, _isClassic?: boolean): MsgVote {
    const {
      value: { proposal_id, voter, option },
    } = data;
    return new MsgVote(Number.parseInt(proposal_id), voter, option);
  }

  public toAmino(isClassic?: boolean): MsgVote.Amino {
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

  public static fromData(data: MsgVote.Data, _isClassic?: boolean): MsgVote {
    const { proposal_id, voter, option } = data;
    return new MsgVote(Number.parseInt(proposal_id), voter, option);
  }

  public toData(_isClassic?: boolean): MsgVote.Data {
    const { proposal_id, voter, option } = this;
    return {
      '@type': '/cosmos.gov.v1beta1.MsgVote',
      proposal_id: proposal_id.toFixed(),
      voter,
      option,
    };
  }

  public static fromProto(proto: MsgVote.Proto, _isClassic?: boolean): MsgVote {
    return new MsgVote(proto.proposalId.toNumber(), proto.voter, proto.option);
  }

  public toProto(_isClassic?: boolean): MsgVote.Proto {
    const { proposal_id, voter, option } = this;
    return MsgVote_pb.fromPartial({
      option,
      proposalId: proposal_id,
      voter,
    });
  }

  public packAny(_isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.gov.v1beta1.MsgVote',
      value: MsgVote_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _isClassic?: boolean): MsgVote {
    return MsgVote.fromProto(MsgVote_pb.decode(msgAny.value));
  }
}

export namespace MsgVote {
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

  export type Proto = MsgVote_pb;
}
