import { MsgFundRewardPoolV1B1 } from './MsgFundRewardPool';
import { MsgUpdateRewardParamsV1B1 } from './MsgUpdateParams';

export * from './MsgFundRewardPool';
export * from './MsgUpdateParams';

export type XplaMsgV1B1 = MsgFundRewardPoolV1B1 | MsgUpdateRewardParamsV1B1;
export namespace XplaMsgV1B1 {
  export type Amino =
    | MsgFundRewardPoolV1B1.Amino
    | MsgUpdateRewardParamsV1B1.Amino;
  export type Data =
    | MsgFundRewardPoolV1B1.Data
    | MsgUpdateRewardParamsV1B1.Data;
  export type Proto =
    | MsgFundRewardPoolV1B1.Proto
    | MsgUpdateRewardParamsV1B1.Proto;
}
