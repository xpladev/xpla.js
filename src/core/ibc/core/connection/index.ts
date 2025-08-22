export * from './v1/ConnectionEnd';
export * from './v1/IdentifiedConnection';
export { CounterpartyV1 as IbcConnectionCounterpartyV1 } from './v1/Counterparty';
export * from './v1/ClientPaths';
export * from './v1/ConnectionPaths';
export * from './v1/Version';
export * from './v1/Params';

import { MsgConnectionOpenInitV1 } from './v1/msgs/MsgConnectionOpenInit';
import { MsgConnectionOpenTryV1 } from './v1/msgs/MsgConnectionOpenTry';
import { MsgConnectionOpenAckV1 } from './v1/msgs/MsgConnectionOpenAck';
import { MsgConnectionOpenConfirmV1 } from './v1/msgs/MsgConnectionOpenConfirm';
import { MsgUpdateIbcConnectionParamsV1 } from './v1/msgs/MsgUpdateParams';

export * from './v1/msgs/MsgConnectionOpenInit';
export * from './v1/msgs/MsgConnectionOpenTry';
export * from './v1/msgs/MsgConnectionOpenAck';
export * from './v1/msgs/MsgConnectionOpenConfirm';
export * from './v1/msgs/MsgUpdateParams';

export type IbcConnectionMsgV1 =
  | MsgConnectionOpenInitV1
  | MsgConnectionOpenTryV1
  | MsgConnectionOpenAckV1
  | MsgConnectionOpenConfirmV1
  | MsgUpdateIbcConnectionParamsV1;

export namespace IbcConnectionMsgV1 {
  export type Data =
    | MsgConnectionOpenInitV1.Data
    | MsgConnectionOpenTryV1.Data
    | MsgConnectionOpenAckV1.Data
    | MsgConnectionOpenConfirmV1.Data
    | MsgUpdateIbcConnectionParamsV1.Data;
  export type Proto =
    | MsgConnectionOpenInitV1.Proto
    | MsgConnectionOpenTryV1.Proto
    | MsgConnectionOpenAckV1.Proto
    | MsgConnectionOpenConfirmV1.Proto
    | MsgUpdateIbcConnectionParamsV1.Proto;
}

export type IbcConnectionMsg = IbcConnectionMsgV1;
export namespace IbcConnectionMsg {
  export type Data = IbcConnectionMsgV1.Data;
  export type Proto = IbcConnectionMsgV1.Proto;
}

export {
    MsgConnectionOpenInitV1 as MsgConnectionOpenInit,
    MsgConnectionOpenTryV1 as MsgConnectionOpenTry,
    MsgConnectionOpenAckV1 as MsgConnectionOpenAck,
    MsgConnectionOpenConfirmV1 as MsgConnectionOpenConfirm,
    MsgUpdateIbcConnectionParamsV1 as MsgUpdateIbcConnectionParams,
}
