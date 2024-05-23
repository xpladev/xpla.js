import { GroupMsgV1 } from './v1/msgs';

export * from './v1/msgs';

export type GroupMsg = GroupMsgV1;

export namespace GroupMsg {
  export type Amino = GroupMsgV1.Amino;
  export type Data = GroupMsgV1.Data;
  export type Proto = GroupMsgV1.Proto;
}

export {
  MsgCreateGroupV1 as MsgCreateGroup,
  MsgUpdateGroupMembersV1 as MsgUpdateGroupMembers,
  MsgUpdateGroupAdminV1 as MsgUpdateGroupAdmin,
  MsgUpdateGroupMetadataV1 as MsgUpdateGroupMetadata,
  MsgCreateGroupPolicyV1 as MsgCreateGroupPolicy,
  MsgUpdateGroupPolicyAdminV1 as MsgUpdateGroupPolicyAdmin,
  MsgCreateGroupWithPolicyV1 as MsgCreateGroupWithPolicy,
  MsgUpdateGroupPolicyDecisionPolicyV1 as MsgUpdateGroupPolicyDecisionPolicy,
  MsgUpdateGroupPolicyMetadataV1 as MsgUpdateGroupPolicyMetadata,
  MsgGroupSubmitProposalV1 as MsgGroupSubmitProposal,
  MsgGroupWithdrawProposalV1 as MsgGroupWithdrawProposal,
  MsgGroupVoteV1 as MsgGroupVote,
  MsgGroupExecV1 as MsgGroupExec,
  MsgLeaveGroupV1 as MsgLeaveGroup,
} from './v1/msgs';
