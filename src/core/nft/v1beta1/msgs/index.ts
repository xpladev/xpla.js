import { MsgNftSendV1B1 } from './MsgSend';

export * from './MsgSend';

export type NftMsgV1B1 = MsgNftSendV1B1;
export namespace NftMsgV1B1 {
  export type Data = MsgNftSendV1B1.Data;
  export type Proto = MsgNftSendV1B1.Proto;
}
