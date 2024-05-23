import { Erc20MsgV1 } from './v1/msgs';

export * from './v1/msgs';
export * from './v1/proposals';

export type Erc20Msg = Erc20MsgV1;

export namespace Erc20Msg {
  export type Amino = Erc20MsgV1.Amino;
  export type Data = Erc20MsgV1.Data;
  export type Proto = Erc20MsgV1.Proto;
}

export {
  MsgConvertCoinV1 as MsgConvertCoin,
  MsgConvertERC20V1 as MsgConvertERC20,
} from './v1/msgs';
