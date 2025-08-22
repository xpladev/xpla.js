import { ProtocolPoolMsgV1 } from './v1/msgs';
import { ProtocolPoolParamsV1 } from './v1/Params';

export * from './v1/msgs';
export * from './v1/Params';

export type ProtocolPoolMsg = ProtocolPoolMsgV1;
export type ProtocolPoolParams = ProtocolPoolParamsV1;

export namespace ProtocolPoolMsg {
  export type Amino = ProtocolPoolMsgV1.Amino;
  export type Data = ProtocolPoolMsgV1.Data;
  export type Proto = ProtocolPoolMsgV1.Proto;
}

export {
  MsgFundCommunityPoolV1 as MsgFundCommunityPool,
  MsgCommunityPoolSpendV1 as MsgCommunityPoolSpend,
  MsgCreateContinuousFundV1 as MsgCreateContinuousFund,
  MsgCancelContinuousFundV1 as MsgCancelContinuousFund,
} from './v1/msgs';
