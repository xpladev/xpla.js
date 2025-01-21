import { MsgConnectionOpenAck } from './MsgConnectionOpenAck';
import { MsgConnectionOpenConfirm } from './MsgConnectionOpenConfirm';
import { MsgConnectionOpenInit } from './MsgConnectionOpenInit';
import { MsgConnectionOpenTry } from './MsgConnectionOpenTry';
import { MsgUpdateIbcConnectionParamsV1 } from './MsgUpdateParams';

export * from './MsgConnectionOpenInit';
export * from './MsgConnectionOpenTry';
export * from './MsgConnectionOpenConfirm';
export * from './MsgConnectionOpenAck';
export * from './MsgUpdateParams';
export { MsgUpdateIbcConnectionParamsV1 as MsgUpdateIbcConnectionParams } from './MsgUpdateParams';

export type IbcConnectionMsg =
  | MsgConnectionOpenInit
  | MsgConnectionOpenTry
  | MsgConnectionOpenConfirm
  | MsgConnectionOpenAck
  | MsgUpdateIbcConnectionParamsV1;

export namespace IbcConnectionMsg {
  export type Data =
    | MsgConnectionOpenInit.Data
    | MsgConnectionOpenTry.Data
    | MsgConnectionOpenConfirm.Data
    | MsgConnectionOpenAck.Data
    | MsgUpdateIbcConnectionParamsV1.Data;
  export type Proto =
    | MsgConnectionOpenInit.Proto
    | MsgConnectionOpenTry.Proto
    | MsgConnectionOpenConfirm.Proto
    | MsgConnectionOpenAck.Proto
    | MsgUpdateIbcConnectionParamsV1.Proto;
}
