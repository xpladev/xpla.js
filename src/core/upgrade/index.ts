import { UpgradeMsgV1B1 } from './v1beta1/msgs';

export * from './v1beta1/msgs';
export * from './v1beta1/proposals';
export * from './v1beta1/Plan';

export type UpgradeMsg = UpgradeMsgV1B1;

export namespace UpgradeMsg {
  export type Amino = UpgradeMsgV1B1.Amino;
  export type Data = UpgradeMsgV1B1.Data;
  export type Proto = UpgradeMsgV1B1.Proto;
}

export {
  MsgSoftwareUpgradeV1B1 as MsgSoftwareUpgrade,
  MsgCancelUpgradeV1B1 as MsgCancelUpgrade,
} from './v1beta1/msgs';
export {
  SoftwareUpgradeProposalV1B1 as SoftwareUpgradeProposal,
  CancelSoftwareUpgradeProposalV1B1 as CancelSoftwareUpgradeProposal,
} from './v1beta1/proposals';
export { PlanV1B1 as Plan } from './v1beta1/Plan';
