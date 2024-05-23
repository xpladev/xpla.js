import { MsgSubmitProposalV1B1 } from './MsgSubmitProposal';
import { MsgVoteV1B1 } from './MsgVote';
import { MsgDepositV1B1 } from './MsgDeposit';
import { MsgVoteWeightedV1B1 } from './MsgVoteWeighted';

export * from './MsgDeposit';
export * from './MsgSubmitProposal';
export * from './MsgVote';
export * from './MsgVoteWeighted';

export type GovMsgV1B1 =
  | MsgDepositV1B1
  | MsgSubmitProposalV1B1
  | MsgVoteV1B1
  | MsgVoteWeightedV1B1;

export namespace GovMsgV1B1 {
  export type Amino =
    | MsgDepositV1B1.Amino
    | MsgSubmitProposalV1B1.Amino
    | MsgVoteV1B1.Amino
    | MsgVoteWeightedV1B1.Amino;
  export type Data =
    | MsgDepositV1B1.Data
    | MsgSubmitProposalV1B1.Data
    | MsgVoteV1B1.Data
    | MsgVoteWeightedV1B1.Data;
  export type Proto =
    | MsgDepositV1B1.Proto
    | MsgSubmitProposalV1B1.Proto
    | MsgVoteV1B1.Proto
    | MsgVoteWeightedV1B1.Proto;
}
