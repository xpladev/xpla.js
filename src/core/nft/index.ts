import { NftMsgV1B1 } from './v1beta1/msgs';

export * from './v1beta1/msgs';

export type NftMsg = NftMsgV1B1;

export namespace NftMsg {
  export type Data = NftMsgV1B1.Data;
  export type Proto = NftMsgV1B1.Proto;
}

export { MsgNftSendV1B1 as MsgNftSend } from './v1beta1/msgs';
