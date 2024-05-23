import {
  VestingMsgV1B1,
  MsgCreateVestingAccountV1B1,
  MsgCreatePermanentLockedAccountV1B1,
  MsgCreatePeriodicVestingAccountV1B1,
} from './v1beta1/msgs';

export * from './v1beta1/msgs';
export * from './v1beta1/Period';

export type VestingMsg = VestingMsgV1B1;

export namespace VestingMsg {
  export type Amino = VestingMsgV1B1.Amino;
  export type Data = VestingMsgV1B1.Data;
  export type Proto = VestingMsgV1B1.Proto;
}

export type MsgCreateVestingAccount = MsgCreateVestingAccountV1B1;
export type MsgCreatePermanentLockedAccount =
  MsgCreatePermanentLockedAccountV1B1;
export type MsgCreatePeriodicVestingAccount =
  MsgCreatePeriodicVestingAccountV1B1;
export { PeriodV1B1 as Period } from './v1beta1/Period';
