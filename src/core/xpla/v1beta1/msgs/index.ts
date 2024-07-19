import { MsgFundFeeCollectorV1B1 } from './MsgFundFeeCollector';
import { MsgUpdateRewardParamsV1B1 } from './MsgUpdateParams';

export * from './MsgFundFeeCollector';
export * from './MsgUpdateParams';

export type XplaMsgV1B1 = MsgFundFeeCollectorV1B1 | MsgUpdateRewardParamsV1B1;
export namespace XplaMsgV1B1 {
  export type Amino =
    | MsgFundFeeCollectorV1B1.Amino
    | MsgUpdateRewardParamsV1B1.Amino;
  export type Data =
    | MsgFundFeeCollectorV1B1.Data
    | MsgUpdateRewardParamsV1B1.Data;
  export type Proto =
    | MsgFundFeeCollectorV1B1.Proto
    | MsgUpdateRewardParamsV1B1.Proto;
}
