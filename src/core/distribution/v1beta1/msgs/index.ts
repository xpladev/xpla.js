import { MsgSetWithdrawAddressV1B1 } from './MsgSetWithdrawAddress';
import { MsgWithdrawDelegatorRewardV1B1 } from './MsgWithdrawDelegatorReward';
import { MsgWithdrawValidatorCommissionV1B1 } from './MsgWithdrawValidatorCommission';
import { MsgFundCommunityPoolV1B1 } from './MsgFundCommunityPool';
import { MsgCommunityPoolSpendV1B1 } from './MsgCommunityPoolSpend';
import { MsgDepositValidatorRewardsPoolV1B1 } from './MsgDepositValidatorRewardsPool';
import { MsgUpdateDistributionParamsV1B1 } from './MsgUpdateParams';

export * from './MsgSetWithdrawAddress';
export * from './MsgWithdrawDelegatorReward';
export * from './MsgWithdrawValidatorCommission';
export * from './MsgFundCommunityPool';
export * from './MsgCommunityPoolSpend';
export * from './MsgDepositValidatorRewardsPool';
export * from './MsgUpdateParams';

export type DistributionMsgV1B1 =
  | MsgSetWithdrawAddressV1B1
  | MsgWithdrawDelegatorRewardV1B1
  | MsgWithdrawValidatorCommissionV1B1
  | MsgFundCommunityPoolV1B1
  | MsgCommunityPoolSpendV1B1
  | MsgDepositValidatorRewardsPoolV1B1
  | MsgUpdateDistributionParamsV1B1;

export namespace DistributionMsgV1B1 {
  export type Amino =
    | MsgSetWithdrawAddressV1B1.Amino
    | MsgWithdrawDelegatorRewardV1B1.Amino
    | MsgWithdrawValidatorCommissionV1B1.Amino
    | MsgFundCommunityPoolV1B1.Amino
    | MsgCommunityPoolSpendV1B1.Amino
    | MsgDepositValidatorRewardsPoolV1B1.Amino
    | MsgUpdateDistributionParamsV1B1.Amino;

  export type Data =
    | MsgSetWithdrawAddressV1B1.Data
    | MsgWithdrawDelegatorRewardV1B1.Data
    | MsgWithdrawValidatorCommissionV1B1.Data
    | MsgFundCommunityPoolV1B1.Data
    | MsgCommunityPoolSpendV1B1.Data
    | MsgDepositValidatorRewardsPoolV1B1.Data
    | MsgUpdateDistributionParamsV1B1.Data;

  export type Proto =
    | MsgSetWithdrawAddressV1B1.Proto
    | MsgWithdrawDelegatorRewardV1B1.Proto
    | MsgWithdrawValidatorCommissionV1B1.Proto
    | MsgFundCommunityPoolV1B1.Proto
    | MsgCommunityPoolSpendV1B1.Proto
    | MsgDepositValidatorRewardsPoolV1B1.Proto
    | MsgUpdateDistributionParamsV1B1.Proto;
}
