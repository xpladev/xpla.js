import { GovMsgV1 } from './v1/msgs';
import { GovMsgV1B1 } from './v1beta1/msgs';

export * from './v1/msgs';
export * from './v1/Vote';
export * from './v1beta1/msgs';
export * from './v1beta1/proposals';
export * from './v1beta1/Proposal';
export * from './v1beta1/Vote';

export type GovMsg = GovMsgV1 | GovMsgV1B1;

export namespace GovMsg {
  export type Amino = GovMsgV1.Amino | GovMsgV1B1.Amino;
  export type Data = GovMsgV1.Data | GovMsgV1B1.Data;
  export type Proto = GovMsgV1.Proto | GovMsgV1B1.Proto;
}

export {
  MsgDepositV1B1 as MsgDeposit,
  MsgSubmitProposalV1B1 as MsgSubmitProposal,
  MsgVoteV1B1 as MsgVote,
  MsgVoteWeightedV1B1 as MsgVoteWeighted,
} from './v1beta1/msgs';
export { ProposalV1B1 as Proposal } from './v1beta1/Proposal';
export {
  VoteV1B1 as Vote,
  WeightedVoteOptionV1B1 as WeightedVoteOption,
} from './v1beta1/Vote';
