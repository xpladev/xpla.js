import { MsgDelegateV1B1 } from './MsgDelegate';
import { MsgUndelegateV1B1 } from './MsgUndelegate';
import { MsgBeginRedelegateV1B1 } from './MsgBeginRedelegate';
import { MsgCreateValidatorV1B1 } from './MsgCreateValidator';
import { MsgEditValidatorV1B1 } from './MsgEditValidator';
import { MsgCancelUnbondingDelegationV1B1 } from './MsgCancelUnbondingDelegation';

export * from './MsgDelegate';
export * from './MsgUndelegate';
export * from './MsgBeginRedelegate';
export * from './MsgCreateValidator';
export * from './MsgEditValidator';
export * from './MsgCancelUnbondingDelegation';

export type StakingMsgV1B1 =
  | MsgDelegateV1B1
  | MsgUndelegateV1B1
  | MsgBeginRedelegateV1B1
  | MsgCreateValidatorV1B1
  | MsgEditValidatorV1B1
  | MsgCancelUnbondingDelegationV1B1;

export namespace StakingMsgV1B1 {
  export type Amino =
    | MsgDelegateV1B1.Amino
    | MsgUndelegateV1B1.Amino
    | MsgBeginRedelegateV1B1.Amino
    | MsgCreateValidatorV1B1.Amino
    | MsgEditValidatorV1B1.Amino
    | MsgCancelUnbondingDelegationV1B1.Amino;
  export type Data =
    | MsgDelegateV1B1.Data
    | MsgUndelegateV1B1.Data
    | MsgBeginRedelegateV1B1.Data
    | MsgCreateValidatorV1B1.Data
    | MsgEditValidatorV1B1.Data
    | MsgCancelUnbondingDelegationV1B1.Data;
  export type Proto =
    | MsgDelegateV1B1.Proto
    | MsgUndelegateV1B1.Proto
    | MsgBeginRedelegateV1B1.Proto
    | MsgCreateValidatorV1B1.Proto
    | MsgEditValidatorV1B1.Proto
    | MsgCancelUnbondingDelegationV1B1.Proto;
}
