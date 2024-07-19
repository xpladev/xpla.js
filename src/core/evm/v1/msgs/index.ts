import { MsgEthereumTxV1 } from './MsgEthereumTx';
import { MsgUpdateEvmParamsV1 } from './MsgUpdateParams';

export * from './MsgEthereumTx';
export * from './MsgUpdateParams';

export type EvmMsgV1 = MsgEthereumTxV1 | MsgUpdateEvmParamsV1;
export namespace EvmMsgV1 {
  export type Amino = MsgEthereumTxV1.Amino | MsgUpdateEvmParamsV1.Amino;
  export type Data = MsgEthereumTxV1.Data | MsgUpdateEvmParamsV1.Data;
  export type Proto = MsgEthereumTxV1.Proto | MsgUpdateEvmParamsV1.Proto;
}
