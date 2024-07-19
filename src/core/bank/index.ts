import { BankMsgV1B1 } from './v1beta1/msgs';

export * from './v1beta1/msgs';
export * from './v1beta1/Params';

export type BankMsg = BankMsgV1B1;

export namespace BankMsg {
  export type Amino = BankMsgV1B1.Amino;
  export type Data = BankMsgV1B1.Data;
  export type Proto = BankMsgV1B1.Proto;
}

export {
  MsgSendV1B1 as MsgSend,
  MsgMultiSendV1B1 as MsgMultiSend,
  MsgSetSendEnabledV1B1 as MsgSetSendEnabled,
  MsgUpdateBankParamsV1B1 as MsgUpdateBankParams,
} from './v1beta1/msgs';
