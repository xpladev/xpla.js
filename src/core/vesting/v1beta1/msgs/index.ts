import { MsgCreateVestingAccountV1B1 } from './MsgCreateVestingAccount';
import { MsgCreatePermanentLockedAccountV1B1 } from './MsgCreatePermanentLockedAccount';
import { MsgCreatePeriodicVestingAccountV1B1 } from './MsgCreatePeriodicVestingAccount';

export * from './MsgCreateVestingAccount';
export * from './MsgCreatePermanentLockedAccount';
export * from './MsgCreatePeriodicVestingAccount';

export type VestingMsgV1B1 =
  | MsgCreateVestingAccountV1B1
  | MsgCreatePermanentLockedAccountV1B1
  | MsgCreatePeriodicVestingAccountV1B1;

export namespace VestingMsgV1B1 {
  export type Amino =
    | MsgCreateVestingAccountV1B1.Amino
    | MsgCreatePermanentLockedAccountV1B1.Amino
    | MsgCreatePeriodicVestingAccountV1B1.Amino;
  export type Data =
    | MsgCreateVestingAccountV1B1.Data
    | MsgCreatePermanentLockedAccountV1B1.Data
    | MsgCreatePeriodicVestingAccountV1B1.Data;
  export type Proto =
    | MsgCreateVestingAccountV1B1.Proto
    | MsgCreatePermanentLockedAccountV1B1.Proto
    | MsgCreatePeriodicVestingAccountV1B1.Proto;
}
