import {
  UpgradeMsgV1B1,
  MsgSoftwareUpgradeV1B1,
  MsgCancelUpgradeV1B1,
} from './v1beta1/msgs';

export * from './v1beta1/msgs';
export * from './v1beta1/proposals';
export * from './v1beta1/Plan';

export type UpgradeMsg = UpgradeMsgV1B1;

export namespace UpgradeMsg {
  export type Amino = UpgradeMsgV1B1.Amino;
  export type Data = UpgradeMsgV1B1.Data;
  export type Proto = UpgradeMsgV1B1.Proto;
}

export type MsgSoftwareUpgrade = MsgSoftwareUpgradeV1B1;
export type MsgCancelUpgrade = MsgCancelUpgradeV1B1;
export {
  SoftwareUpgradeProposalV1B1 as SoftwareUpgradeProposal,
  CancelSoftwareUpgradeProposalV1B1 as CancelSoftwareUpgradeProposal,
} from './v1beta1/proposals';
export { PlanV1B1 as Plan } from './v1beta1/Plan';
