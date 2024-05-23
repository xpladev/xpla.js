import { MsgSubmitProposalV1 } from './MsgSubmitProposal';
import { MsgVoteV1 } from './MsgVote';
import { MsgDepositV1 } from './MsgDeposit';
import { MsgVoteWeightedV1 } from './MsgVoteWeighted';
import { MsgExecLegacyContentV1 } from './MsgExecLegacyContent';
import { MsgUpdateGovParamsV1 } from './MsgUpdateParams';

export * from './MsgDeposit';
export * from './MsgSubmitProposal';
export * from './MsgVote';
export * from './MsgVoteWeighted';
export * from './MsgExecLegacyContent';
export * from './MsgUpdateParams';

export type GovMsgV1 =
  | MsgDepositV1
  | MsgSubmitProposalV1
  | MsgVoteV1
  | MsgVoteWeightedV1
  | MsgExecLegacyContentV1
  | MsgUpdateGovParamsV1;

export namespace GovMsgV1 {
  export type Amino =
    | MsgDepositV1.Amino
    | MsgSubmitProposalV1.Amino
    | MsgVoteV1.Amino
    | MsgVoteWeightedV1.Amino
    | MsgExecLegacyContentV1.Amino
    | MsgUpdateGovParamsV1.Amino;
  export type Data =
    | MsgDepositV1.Data
    | MsgSubmitProposalV1.Data
    | MsgVoteV1.Data
    | MsgVoteWeightedV1.Data
    | MsgExecLegacyContentV1.Data
    | MsgUpdateGovParamsV1.Data;
  export type Proto =
    | MsgDepositV1.Proto
    | MsgSubmitProposalV1.Proto
    | MsgVoteV1.Proto
    | MsgVoteWeightedV1.Proto
    | MsgExecLegacyContentV1.Proto
    | MsgUpdateGovParamsV1.Proto;
}
