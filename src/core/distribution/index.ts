import { DistributionMsgV1B1 } from './v1beta1/msgs';

export * from './v1beta1/msgs';
export * from './v1beta1/proposals';
export * from './v1beta1/Params';

export type DistributionMsg = DistributionMsgV1B1;

export namespace DistributionMsg {
  export type Amino = DistributionMsgV1B1.Amino;
  export type Data = DistributionMsgV1B1.Data;
  export type Proto = DistributionMsgV1B1.Proto;
}

export {
  MsgSetWithdrawAddressV1B1 as MsgSetWithdrawAddress,
  MsgWithdrawDelegatorRewardV1B1 as MsgWithdrawDelegatorReward,
  MsgWithdrawValidatorCommissionV1B1 as MsgWithdrawValidatorCommission,
  MsgFundCommunityPoolV1B1 as MsgFundCommunityPool,
  MsgCommunityPoolSpendV1B1 as MsgCommunityPoolSpend,
  MsgUpdateDistributionParamsV1B1 as MsgUpdateDistributionParams,
} from './v1beta1/msgs';
