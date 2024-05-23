import { MsgSoftwareUpgradeV1B1 } from './MsgSoftwareUpgrade';
import { MsgCancelUpgradeV1B1 } from './MsgCancelUpgrade';

export * from './MsgSoftwareUpgrade';
export * from './MsgCancelUpgrade';

export type UpgradeMsgV1B1 = MsgSoftwareUpgradeV1B1 | MsgCancelUpgradeV1B1;

export namespace UpgradeMsgV1B1 {
  export type Amino = MsgSoftwareUpgradeV1B1.Amino | MsgCancelUpgradeV1B1.Amino;
  export type Data = MsgSoftwareUpgradeV1B1.Data | MsgCancelUpgradeV1B1.Data;
  export type Proto = MsgSoftwareUpgradeV1B1.Proto | MsgCancelUpgradeV1B1.Proto;
}
