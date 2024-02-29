import { MsgEthereumTx } from './MsgEthereumTx';

export * from './MsgEthereumTx';

export type EvmMsg = MsgEthereumTx;
export namespace EvmMsg {
  export type Amino = MsgEthereumTx.Amino;
  export type Data = MsgEthereumTx.Data;
  export type Proto = MsgEthereumTx.Proto;
}
