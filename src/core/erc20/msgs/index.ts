import { MsgConvertCoin } from './MsgConvertCoin';
import { MsgConvertERC20 } from './MsgConvertERC20';

export * from './MsgConvertCoin';
export * from './MsgConvertERC20';

export type Erc20Msg = MsgConvertCoin | MsgConvertERC20;
export namespace Erc20Msg {
  export type Amino = MsgConvertCoin.Amino | MsgConvertERC20.Amino;
  export type Data = MsgConvertCoin.Data | MsgConvertERC20.Data;
  export type Proto = MsgConvertCoin.Proto | MsgConvertERC20.Proto;
}
