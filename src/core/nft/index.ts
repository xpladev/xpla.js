import { NftMsgV1B1, MsgNftSendV1B1 } from './v1beta1/msgs';

export * from './v1beta1/msgs';

export type NftMsg = NftMsgV1B1;

export namespace NftMsg {
  export type Amino = NftMsgV1B1.Amino;
  export type Data = NftMsgV1B1.Data;
  export type Proto = NftMsgV1B1.Proto;
}

export type MsgNftSend = MsgNftSendV1B1;
