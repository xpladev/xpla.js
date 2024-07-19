import { EvmMsgV1 } from './v1/msgs';

export * from './v1/msgs';
export * from './v1/Params';

export type EvmMsg = EvmMsgV1;

export namespace EvmMsg {
  export type Amino = EvmMsgV1.Amino;
  export type Data = EvmMsgV1.Data;
  export type Proto = EvmMsgV1.Proto;
}

export {
  MsgEthereumTxV1 as MsgEthereumTx,
  MsgUpdateEvmParamsV1 as MsgUpdateEvmParams,
} from './v1/msgs';
