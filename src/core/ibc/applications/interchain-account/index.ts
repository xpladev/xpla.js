import {
  MsgRegisterInterchainAccountV1,
  MsgSendTxV1,
  MsgUpdateIcaControllerParamsV1,
} from './controller';
import {
  MsgModuleQuerySafeV1,
  MsgUpdateIcaHostParamsV1,
} from './host';

export * from './v1/Account';
export * from './v1/Metadata';
export * from './v1/PacketData';
export * from './controller';
export * from './host';

export {
  MsgRegisterInterchainAccountV1 as MsgRegisterInterchainAccount,
  MsgSendTxV1 as MsgSendTx,
  MsgUpdateIcaControllerParamsV1 as MsgUpdateIcaControllerParams,
  IcaControllerParamsV1 as IcaControllerParams,
} from './controller';
export {
  MsgModuleQuerySafeV1 as MsgModuleQuerySafe,
  QueryRequestV1 as QueryRequest,
  MsgUpdateIcaHostParamsV1 as MsgUpdateIcaHostParams,
  IcaHostParamsV1 as IcaHostParams,
} from './host';

export type IcaMsgV1 =
  | MsgRegisterInterchainAccountV1
  | MsgSendTxV1
  | MsgUpdateIcaControllerParamsV1
  | MsgModuleQuerySafeV1
  | MsgUpdateIcaHostParamsV1;

export namespace IcaMsgV1 {
  export type Data =
    | MsgRegisterInterchainAccountV1.Data
    | MsgSendTxV1.Data
    | MsgUpdateIcaControllerParamsV1.Data
    | MsgModuleQuerySafeV1.Data
    | MsgUpdateIcaHostParamsV1.Data;

  export type Proto =
    | MsgRegisterInterchainAccountV1.Proto
    | MsgSendTxV1.Proto
    | MsgUpdateIcaControllerParamsV1.Proto
    | MsgModuleQuerySafeV1.Proto
    | MsgUpdateIcaHostParamsV1.Proto;
}

export type IcaMsg = IcaMsgV1;
export namespace IcaMsg {
  export type Data = IcaMsgV1.Data;
  export type Proto = IcaMsgV1.Proto;
}
