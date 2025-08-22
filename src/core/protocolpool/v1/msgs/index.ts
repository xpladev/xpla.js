import { MsgFundCommunityPoolV1 } from './MsgFundCommunityPool';
import { MsgCommunityPoolSpendV1 } from './MsgCommunityPoolSpend';
import { MsgCreateContinuousFundV1 } from './MsgCreateContinuousFund';
import { MsgCancelContinuousFundV1 } from './MsgCancelContinuousFund';
import { MsgUpdateProtocolPoolParamsV1 } from './MsgUpdateParams';

export * from './MsgFundCommunityPool';
export * from './MsgCommunityPoolSpend';
export * from './MsgCreateContinuousFund';
export * from './MsgCancelContinuousFund';
export * from './MsgUpdateParams';

export type ProtocolPoolMsgV1 = 
  | MsgFundCommunityPoolV1
  | MsgCommunityPoolSpendV1
  | MsgCreateContinuousFundV1
  | MsgCancelContinuousFundV1
  | MsgUpdateProtocolPoolParamsV1;
export namespace ProtocolPoolMsgV1 {
  export type Amino =
    | MsgFundCommunityPoolV1.Amino
    | MsgCommunityPoolSpendV1.Amino
    | MsgCreateContinuousFundV1.Amino
    | MsgCancelContinuousFundV1.Amino
    | MsgUpdateProtocolPoolParamsV1.Amino;
  export type Data =
    | MsgFundCommunityPoolV1.Data
    | MsgCommunityPoolSpendV1.Data
    | MsgCreateContinuousFundV1.Data
    | MsgCancelContinuousFundV1.Data
    | MsgUpdateProtocolPoolParamsV1.Data;
  export type Proto =
    | MsgFundCommunityPoolV1.Proto
    | MsgCommunityPoolSpendV1.Proto
    | MsgCreateContinuousFundV1.Proto
    | MsgCancelContinuousFundV1.Proto
    | MsgUpdateProtocolPoolParamsV1.Proto;
}
