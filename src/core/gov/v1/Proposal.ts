import { Coins } from '../../Coins';
import { Int } from '../../numeric';
import { JSONSerializable } from '../../../util/json';
import {
  Proposal as ProposalV1_pb,
  ProposalStatus,
  TallyResult,
  proposalStatusFromJSON,
  proposalStatusToJSON,
} from '@xpla/xpla.proto/cosmos/gov/v1/gov';
import { Msg } from '../../Msg';
import { AccAddress } from '../../../core/bech32';
import { MsgExecLegacyContentV1 } from './msgs';

/**
 * Stores information pertaining to a submitted proposal, such as its status and time of
 * the voting period
 */
export class ProposalV1 extends JSONSerializable<
  ProposalV1.Amino,
  ProposalV1.Data,
  ProposalV1.Proto
> {
  /**
   *
   * @param id proposal's ID
   * @param messages messages are the arbitrary messages to be executed if the proposal passes
   * @param status proposal's status
   * @param final_tally_result tally result
   * @param submit_time time proposal was submitted and deposit period started
   * @param deposit_end_time time deposit period will end
   * @param total_deposit amount of coins deposited by all users
   * @param voting_start_time time voting period will start
   * @param voting_end_time time voting period will end
   * @param metadata metadata is any arbitrary metadata attached to the proposal
   * @param title title of the proposal
   * @param summary short summary of the proposal
   * @param proposer address of the proposal sumbitter
   */
  constructor(
    public id: number,
    public messages: Msg[],
    public status: ProposalStatus,
    public final_tally_result: ProposalV1.FinalTallyResult,
    public submit_time: Date,
    public deposit_end_time: Date,
    public total_deposit: Coins,
    public voting_start_time: Date,
    public voting_end_time: Date,
    public metadata: string,
    public title: string,
    public summary: string,
    public proposer: AccAddress
  ) {
    super();

    //HACK: If the first message in messages is in legacy format and the content of summary is empty or the same as title, the description of the legacy content is imported into summary.
    if (
      (this.summary.length < 1 || this.summary === this.title) &&
      messages.length > 0 &&
      messages[0] instanceof MsgExecLegacyContentV1
    ) {
      this.summary = messages[0].content?.description ?? '';
    }
  }

  public static fromAmino(
    data: ProposalV1.Amino,
    _isClassic?: boolean
  ): ProposalV1 {
    const {
      id,
      messages,
      status,
      final_tally_result,
      submit_time,
      deposit_end_time,
      total_deposit,
      voting_start_time,
      voting_end_time,
      metadata,
      title,
      summary,
      proposer,
    } = data;

    return new ProposalV1(
      Number.parseInt(id),
      messages.map(m => Msg.fromAmino(m)),
      status,
      {
        yes: new Int(final_tally_result.yes || 0),
        no: new Int(final_tally_result.no || 0),
        abstain: new Int(final_tally_result.abstain || 0),
        no_with_veto: new Int(final_tally_result.no_with_veto || 0),
      },
      new Date(submit_time),
      new Date(deposit_end_time),
      Coins.fromAmino(total_deposit),
      new Date(voting_start_time),
      new Date(voting_end_time),
      metadata,
      title,
      summary,
      proposer
    );
  }

  public toAmino(_isClassic?: boolean): ProposalV1.Amino {
    const { status, final_tally_result } = this;

    //HACK: If the first message in messages is in legacy format, the title and description of the legacy content have the substance, so the title is taken from the legacy content and the summary has the same value as the title.
    if (
      this.messages.length > 0 &&
      this.messages[0] instanceof MsgExecLegacyContentV1
    ) {
      this.summary = this.title = this.messages[0].content?.title ?? this.title;
    }

    return {
      id: this.id.toFixed(),
      messages: this.messages.map(m => m.toAmino()),
      status: status,
      final_tally_result: {
        yes: final_tally_result.yes.toFixed(),
        no: final_tally_result.no.toFixed(),
        abstain: final_tally_result.abstain.toFixed(),
        no_with_veto: final_tally_result.no_with_veto.toFixed(),
      },
      submit_time: this.submit_time.toISOString(),
      deposit_end_time: this.deposit_end_time.toISOString(),
      total_deposit: this.total_deposit.toAmino(),
      voting_start_time: this.voting_start_time.toISOString(),
      voting_end_time: this.voting_end_time.toISOString(),
      metadata: this.metadata,
      title: this.title,
      summary: this.summary,
      proposer: this.proposer,
    };
  }

  public static fromData(
    data: ProposalV1.Data,
    _isClassic?: boolean
  ): ProposalV1 {
    const {
      id,
      messages,
      status,
      final_tally_result,
      submit_time,
      deposit_end_time,
      total_deposit,
      voting_start_time,
      voting_end_time,
      metadata,
      title,
      summary,
      proposer,
    } = data;

    return new ProposalV1(
      Number.parseInt(id),
      messages.map(m => Msg.fromData(m)),
      proposalStatusFromJSON(status),
      {
        yes: new Int(final_tally_result?.yes || 0),
        no: new Int(final_tally_result?.no || 0),
        abstain: new Int(final_tally_result?.abstain || 0),
        no_with_veto: new Int(final_tally_result?.no_with_veto || 0),
      },
      new Date(submit_time),
      new Date(deposit_end_time),
      Coins.fromData(total_deposit),
      new Date(voting_start_time),
      new Date(voting_end_time),
      metadata,
      title,
      summary,
      proposer
    );
  }

  public toData(_isClassic?: boolean): ProposalV1.Data {
    const { status, final_tally_result } = this;

    //HACK: If the first message in messages is in legacy format, the title and description of the legacy content have the substance, so the title is taken from the legacy content and the summary has the same value as the title.
    if (
      this.messages.length > 0 &&
      this.messages[0] instanceof MsgExecLegacyContentV1
    ) {
      this.title = this.messages[0].content?.title ?? this.title;
      this.summary = this.messages[0].content?.description ?? this.summary;
    }

    return {
      id: this.id.toFixed(),
      messages: this.messages.map(m => m.toData()),
      status: proposalStatusToJSON(status),
      final_tally_result: {
        yes: final_tally_result.yes.toString(),
        no: final_tally_result.no.toString(),
        abstain: final_tally_result.abstain.toString(),
        no_with_veto: final_tally_result.no_with_veto.toString(),
      },
      submit_time: this.submit_time.toISOString(),
      deposit_end_time: this.deposit_end_time.toISOString(),
      total_deposit: this.total_deposit.toData(),
      voting_start_time: this.voting_start_time.toISOString(),
      voting_end_time: this.voting_end_time.toISOString(),
      metadata: this.metadata,
      title: this.title,
      summary: this.summary,
      proposer: this.proposer,
    };
  }

  public static fromProto(
    data: ProposalV1.Proto,
    _isClassic?: boolean
  ): ProposalV1 {
    return new ProposalV1(
      data.id.toNumber(),
      data.messages.map(m => Msg.fromProto(m)),
      data.status,
      {
        yes: new Int(data.finalTallyResult?.yesCount ?? 0),
        no: new Int(data.finalTallyResult?.noCount ?? 0),
        abstain: new Int(data.finalTallyResult?.abstainCount ?? 0),
        no_with_veto: new Int(data.finalTallyResult?.noWithVetoCount ?? 0),
      },
      data.submitTime as Date,
      data.depositEndTime as Date,
      Coins.fromProto(data.totalDeposit),
      data.votingStartTime as Date,
      data.votingEndTime as Date,
      data.metadata,
      data.title,
      data.summary,
      data.proposer
    );
  }

  public toProto(_isClassic?: boolean): ProposalV1.Proto {
    const { status, final_tally_result } = this;

    let ftr: TallyResult | undefined;
    if (final_tally_result) {
      ftr = TallyResult.fromPartial({
        yesCount: final_tally_result.yes.toString(),
        noCount: final_tally_result.no.toString(),
        abstainCount: final_tally_result.abstain.toString(),
        noWithVetoCount: final_tally_result.no_with_veto.toString(),
      });
    }

    //HACK: If the first message in messages is in legacy format, the title and description of the legacy content have the substance, so the title is taken from the legacy content and the summary has the same value as the title.
    if (
      this.messages.length > 0 &&
      this.messages[0] instanceof MsgExecLegacyContentV1
    ) {
      this.summary = this.title = this.messages[0].content?.title ?? this.title;
    }

    return ProposalV1_pb.fromPartial({
      id: this.id,
      messages: this.messages.map(m => m.packAny()),
      status,
      finalTallyResult: ftr,
      submitTime: this.submit_time,
      depositEndTime: this.deposit_end_time,
      totalDeposit: this.total_deposit.toProto(),
      votingEndTime: this.voting_end_time,
      votingStartTime: this.voting_start_time,
      metadata: this.metadata,
      title: this.title,
      summary: this.summary,
      proposer: this.proposer,
    });
  }
}

export namespace ProposalV1 {
  export const Status = ProposalStatus;
  export type Status = ProposalStatus;

  export interface FinalTallyResult {
    yes: Int;
    abstain: Int;
    no: Int;
    no_with_veto: Int;
  }

  export interface Amino {
    messages: Msg.Amino[];
    id: string;
    status: number;
    final_tally_result: {
      yes: string;
      abstain: string;
      no: string;
      no_with_veto: string;
    };
    submit_time: string;
    deposit_end_time: string;
    total_deposit: Coins.Amino;
    voting_start_time: string;
    voting_end_time: string;
    metadata: string;
    title: string;
    summary: string;
    proposer: string;
  }

  export interface Data {
    messages: Msg.Data[];
    id: string;
    status: string;
    final_tally_result: {
      yes: string;
      abstain: string;
      no: string;
      no_with_veto: string;
    };
    submit_time: string;
    deposit_end_time: string;
    total_deposit: Coins.Data;
    voting_start_time: string;
    voting_end_time: string;
    metadata: string;
    title: string;
    summary: string;
    proposer: string;
  }

  export type Proto = ProposalV1_pb;
}
