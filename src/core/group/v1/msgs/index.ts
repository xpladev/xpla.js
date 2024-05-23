import { MsgCreateGroupV1 } from './MsgCreateGroup';
import { MsgUpdateGroupMembersV1 } from './MsgUpdateGroupMembers';
import { MsgUpdateGroupAdminV1 } from './MsgUpdateGroupAdmin';
import { MsgUpdateGroupMetadataV1 } from './MsgUpdateGroupMetadata';
import { MsgCreateGroupPolicyV1 } from './MsgCreateGroupPolicy';
import { MsgUpdateGroupPolicyAdminV1 } from './MsgUpdateGroupPolicyAdmin';
import { MsgCreateGroupWithPolicyV1 } from './MsgCreateGroupWithPolicy';
import { MsgUpdateGroupPolicyDecisionPolicyV1 } from './MsgUpdateGroupPolicyDecisionPolicy';
import { MsgUpdateGroupPolicyMetadataV1 } from './MsgUpdateGroupPolicyMetadata';
import { MsgGroupSubmitProposalV1 } from './MsgSubmitProposal';
import { MsgGroupWithdrawProposalV1 } from './MsgWithdrawProposal';
import { MsgGroupVoteV1 } from './MsgVote';
import { MsgGroupExecV1 } from './MsgExec';
import { MsgLeaveGroupV1 } from './MsgLeaveGroup';

export * from './MsgCreateGroup';
export * from './MsgUpdateGroupMembers';
export * from './MsgUpdateGroupAdmin';
export * from './MsgUpdateGroupMetadata';
export * from './MsgCreateGroupPolicy';
export * from './MsgUpdateGroupPolicyAdmin';
export * from './MsgCreateGroupWithPolicy';
export * from './MsgUpdateGroupPolicyDecisionPolicy';
export * from './MsgUpdateGroupPolicyMetadata';
export * from './MsgSubmitProposal';
export * from './MsgWithdrawProposal';
export * from './MsgVote';
export * from './MsgExec';
export * from './MsgLeaveGroup';

export type GroupMsgV1 =
  | MsgCreateGroupV1
  | MsgUpdateGroupMembersV1
  | MsgUpdateGroupAdminV1
  | MsgUpdateGroupMetadataV1
  | MsgCreateGroupPolicyV1
  | MsgUpdateGroupPolicyAdminV1
  | MsgCreateGroupWithPolicyV1
  | MsgUpdateGroupPolicyDecisionPolicyV1
  | MsgUpdateGroupPolicyMetadataV1
  | MsgGroupSubmitProposalV1
  | MsgGroupWithdrawProposalV1
  | MsgGroupVoteV1
  | MsgGroupExecV1
  | MsgLeaveGroupV1;
export namespace GroupMsgV1 {
  export type Amino =
    | MsgCreateGroupV1.Amino
    | MsgUpdateGroupMembersV1.Amino
    | MsgUpdateGroupAdminV1.Amino
    | MsgUpdateGroupMetadataV1.Amino
    | MsgCreateGroupPolicyV1.Amino
    | MsgUpdateGroupPolicyAdminV1.Amino
    | MsgCreateGroupWithPolicyV1.Amino
    | MsgUpdateGroupPolicyDecisionPolicyV1.Amino
    | MsgUpdateGroupPolicyMetadataV1.Amino
    | MsgGroupSubmitProposalV1.Amino
    | MsgGroupWithdrawProposalV1.Amino
    | MsgGroupVoteV1.Amino
    | MsgGroupExecV1.Amino
    | MsgLeaveGroupV1.Amino;
  export type Data =
    | MsgCreateGroupV1.Data
    | MsgUpdateGroupMembersV1.Data
    | MsgUpdateGroupAdminV1.Data
    | MsgUpdateGroupMetadataV1.Data
    | MsgCreateGroupPolicyV1.Data
    | MsgUpdateGroupPolicyAdminV1.Data
    | MsgCreateGroupWithPolicyV1.Data
    | MsgUpdateGroupPolicyDecisionPolicyV1.Data
    | MsgUpdateGroupPolicyMetadataV1.Data
    | MsgGroupSubmitProposalV1.Data
    | MsgGroupWithdrawProposalV1.Data
    | MsgGroupVoteV1.Data
    | MsgGroupExecV1.Data
    | MsgLeaveGroupV1.Data;
  export type Proto =
    | MsgCreateGroupV1.Proto
    | MsgUpdateGroupMembersV1.Proto
    | MsgUpdateGroupAdminV1.Proto
    | MsgUpdateGroupMetadataV1.Proto
    | MsgCreateGroupPolicyV1.Proto
    | MsgUpdateGroupPolicyAdminV1.Proto
    | MsgCreateGroupWithPolicyV1.Proto
    | MsgUpdateGroupPolicyDecisionPolicyV1.Proto
    | MsgUpdateGroupPolicyMetadataV1.Proto
    | MsgGroupSubmitProposalV1.Proto
    | MsgGroupWithdrawProposalV1.Proto
    | MsgGroupVoteV1.Proto
    | MsgGroupExecV1.Proto
    | MsgLeaveGroupV1.Proto;
}
