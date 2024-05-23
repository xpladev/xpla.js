import { MsgSetWithdrawAddress } from './MsgSetWithdrawAddress';
import { MsgWithdrawDelegatorReward } from './MsgWithdrawDelegatorReward';
import { MsgWithdrawValidatorCommission } from './MsgWithdrawValidatorCommission';
import { MsgFundCommunityPool } from './MsgFundCommunityPool';
import { MsgCommunityPoolSpend } from './MsgCommunityPoolSpend';

export * from './MsgSetWithdrawAddress';
export * from './MsgWithdrawDelegatorReward';
export * from './MsgWithdrawValidatorCommission';
export * from './MsgFundCommunityPool';
export * from './MsgCommunityPoolSpend';

export type DistributionMsg =
  | MsgSetWithdrawAddress
  | MsgWithdrawDelegatorReward
  | MsgWithdrawValidatorCommission
  | MsgFundCommunityPool
  | MsgCommunityPoolSpend;

export namespace DistributionMsg {
  export type Amino =
    | MsgSetWithdrawAddress.Amino
    | MsgWithdrawDelegatorReward.Amino
    | MsgWithdrawValidatorCommission.Amino
    | MsgFundCommunityPool.Amino
    | MsgCommunityPoolSpend.Amino;

  export type Data =
    | MsgSetWithdrawAddress.Data
    | MsgWithdrawDelegatorReward.Data
    | MsgWithdrawValidatorCommission.Data
    | MsgFundCommunityPool.Data
    | MsgCommunityPoolSpend.Data;

  export type Proto =
    | MsgSetWithdrawAddress.Proto
    | MsgWithdrawDelegatorReward.Proto
    | MsgWithdrawValidatorCommission.Proto
    | MsgFundCommunityPool.Proto
    | MsgCommunityPoolSpend.Proto;
}
