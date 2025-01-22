import { MsgFundRewardPoolV1B1 } from './MsgFundRewardPool';
import { MsgUpdateRewardParamsV1B1 } from './MsgUpdateParams';
import { MsgRegisterVolunteerValidatorV1B1 } from './MsgRegisterVolunteerValidator';
import { MsgUnregisterVolunteerValidatorV1B1 } from './MsgUnregisterVolunteerValidator';

export * from './MsgFundRewardPool';
export * from './MsgUpdateParams';
export * from './MsgRegisterVolunteerValidator';
export * from './MsgUnregisterVolunteerValidator';

export type XplaMsgV1B1 =
  | MsgFundRewardPoolV1B1
  | MsgUpdateRewardParamsV1B1
  | MsgRegisterVolunteerValidatorV1B1
  | MsgUnregisterVolunteerValidatorV1B1;

export namespace XplaMsgV1B1 {
  export type Amino =
    | MsgFundRewardPoolV1B1.Amino
    | MsgUpdateRewardParamsV1B1.Amino
    | MsgRegisterVolunteerValidatorV1B1.Amino
    | MsgUnregisterVolunteerValidatorV1B1.Amino;
  
  export type Data =
    | MsgFundRewardPoolV1B1.Data
    | MsgUpdateRewardParamsV1B1.Data
    | MsgRegisterVolunteerValidatorV1B1.Data
    | MsgUnregisterVolunteerValidatorV1B1.Data;
  
  export type Proto =
    | MsgFundRewardPoolV1B1.Proto
    | MsgUpdateRewardParamsV1B1.Proto
    | MsgRegisterVolunteerValidatorV1B1.Proto
    | MsgUnregisterVolunteerValidatorV1B1.Proto;
  }
