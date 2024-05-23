import {
  StakingMsgV1B1,
  MsgDelegateV1B1,
  MsgUndelegateV1B1,
  MsgBeginRedelegateV1B1,
  MsgCreateValidatorV1B1,
  MsgEditValidatorV1B1,
  MsgCancelUnbondingDelegationV1B1,
} from './v1beta1/msgs';

export * from './v1beta1/msgs';
export * from './v1beta1/Delegation';
export * from './v1beta1/Redelegation';
export * from './v1beta1/UnbondingDelegation';
export * from './v1beta1/Validator';

export type StakingMsg = StakingMsgV1B1;

export namespace StakingMsg {
  export type Amino = StakingMsgV1B1.Amino;
  export type Data = StakingMsgV1B1.Data;
  export type Proto = StakingMsgV1B1.Proto;
}

export type MsgDelegate = MsgDelegateV1B1;
export type MsgUndelegate = MsgUndelegateV1B1;
export type MsgBeginRedelegate = MsgBeginRedelegateV1B1;
export type MsgCreateValidator = MsgCreateValidatorV1B1;
export type MsgEditValidator = MsgEditValidatorV1B1;
export type MsgCancelUnbondingDelegation = MsgCancelUnbondingDelegationV1B1;
export { DelegationV1B1 as Delegation } from './v1beta1/Delegation';
export { RedelegationV1B1 as Redelegation } from './v1beta1/Redelegation';
export { UnbondingDelegationV1B1 as UnbondingDelegation } from './v1beta1/UnbondingDelegation';
export { ValidatorV1B1 as Validator } from './v1beta1/Validator';
