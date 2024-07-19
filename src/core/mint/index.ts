import { MintMsgV1B1 } from './v1beta1/msgs';

export * from './v1beta1/msgs';
export * from './v1beta1/Params';

export type MintMsg = MintMsgV1B1;

export namespace MintMsg {
  export type Amino = MintMsgV1B1.Amino;
  export type Data = MintMsgV1B1.Data;
  export type Proto = MintMsgV1B1.Proto;
}

export { MsgUpdateMintParamsV1B1 as MsgUpdateMintParams } from './v1beta1/msgs';
