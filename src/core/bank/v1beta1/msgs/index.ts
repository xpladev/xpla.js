import { MsgSendV1B1 } from './MsgSend';
import { MsgMultiSendV1B1 } from './MsgMultiSend';
import { MsgSetSendEnabledV1B1 } from './MsgSetSendEnabled';
import { MsgUpdateBankParamsV1B1 } from './MsgUpdateParams';

export * from './MsgSend';
export * from './MsgMultiSend';
export * from './MsgSetSendEnabled';
export * from './MsgUpdateParams';

export type BankMsgV1B1 =
  | MsgSendV1B1
  | MsgMultiSendV1B1
  | MsgSetSendEnabledV1B1
  | MsgUpdateBankParamsV1B1;
export namespace BankMsgV1B1 {
  export type Amino =
    | MsgSendV1B1.Amino
    | MsgMultiSendV1B1.Amino
    | MsgSetSendEnabledV1B1.Amino
    | MsgUpdateBankParamsV1B1.Amino;
  export type Data =
    | MsgSendV1B1.Data
    | MsgMultiSendV1B1.Data
    | MsgSetSendEnabledV1B1.Data
    | MsgUpdateBankParamsV1B1.Data;
  export type Proto =
    | MsgSendV1B1.Proto
    | MsgMultiSendV1B1.Proto
    | MsgSetSendEnabledV1B1.Proto
    | MsgUpdateBankParamsV1B1.Proto;
}
