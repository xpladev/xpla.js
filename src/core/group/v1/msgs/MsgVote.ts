import { Int64, Int64Input, parseInt64 } from '../../../../util/int64';
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { VoteOption } from '@xpla/xpla.proto/cosmos/gov/v1/gov';
import {
  Exec,
  MsgVote as MsgGroupVoteV1_pb,
} from '@xpla/xpla.proto/cosmos/group/v1/tx';

export class MsgGroupVoteV1 extends JSONSerializable<
  MsgGroupVoteV1.Amino,
  MsgGroupVoteV1.Data,
  MsgGroupVoteV1.Proto
> {
  public proposal_id: Int64;
  /**
   * @param proposal_id is the unique ID of the proposal
   * @param voter is the voter account address
   * @param option is the voter's choice on the proposal
   * @param metadata is any arbitrary metadata attached to the vote
   * @param exec defines whether the proposal should be executed immediately after voting or not
   */

  constructor(
    proposal_id: Int64Input,
    public voter: AccAddress,
    public option: VoteOption,
    public metadata: string,
    public exec: Exec
  ) {
    super();
    this.proposal_id = parseInt64(proposal_id);
  }

  public static fromAmino(
    data: MsgGroupVoteV1.Amino,
    _isClassic?: boolean
  ): MsgGroupVoteV1 {
    const {
      value: { proposal_id, voter, option, metadata, exec },
    } = data;
    return new MsgGroupVoteV1(proposal_id, voter, option, metadata, exec);
  }

  public toAmino(isClassic?: boolean): MsgGroupVoteV1.Amino {
    const { proposal_id, voter, option, metadata, exec } = this;
    return {
      type: isClassic ? 'group/MsgVote' : 'cosmos-sdk/group/MsgVote',
      value: {
        proposal_id: proposal_id.toFixed(),
        voter,
        option,
        metadata,
        exec,
      },
    };
  }

  public static fromData(
    data: MsgGroupVoteV1.Data,
    _isClassic?: boolean
  ): MsgGroupVoteV1 {
    const { proposal_id, voter, option, metadata, exec } = data;
    return new MsgGroupVoteV1(proposal_id, voter, option, metadata, exec);
  }

  public toData(_isClassic?: boolean): MsgGroupVoteV1.Data {
    const { proposal_id, voter, option, metadata, exec } = this;
    return {
      '@type': '/cosmos.group.v1.MsgVote',
      proposal_id: proposal_id.toFixed(),
      voter,
      option,
      metadata,
      exec,
    };
  }

  public static fromProto(
    proto: MsgGroupVoteV1.Proto,
    _isClassic?: boolean
  ): MsgGroupVoteV1 {
    return new MsgGroupVoteV1(
      proto.proposalId,
      proto.voter,
      proto.option,
      proto.metadata,
      proto.exec
    );
  }

  public toProto(_isClassic?: boolean): MsgGroupVoteV1.Proto {
    const { proposal_id, voter, option, metadata, exec } = this;
    return MsgGroupVoteV1_pb.fromPartial({
      proposalId: proposal_id.toString(),
      voter,
      option,
      metadata,
      exec,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.group.v1.MsgVote',
      value: MsgGroupVoteV1_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(msgAny: Any, isClassic?: boolean): MsgGroupVoteV1 {
    return MsgGroupVoteV1.fromProto(
      MsgGroupVoteV1_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgGroupVoteV1 {
  export interface Amino {
    type: 'group/MsgVote' | 'cosmos-sdk/group/MsgVote';
    value: {
      proposal_id: string;
      voter: AccAddress;
      option: VoteOption;
      metadata: string;
      exec: Exec;
    };
  }

  export interface Data {
    '@type': '/cosmos.group.v1.MsgVote';
    proposal_id: string;
    voter: AccAddress;
    option: VoteOption;
    metadata: string;
    exec: Exec;
  }

  export type Proto = MsgGroupVoteV1_pb;
}
