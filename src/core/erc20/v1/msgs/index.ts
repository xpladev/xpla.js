import { MsgConvertCoinV1 } from './MsgConvertCoin';
import { MsgConvertERC20V1 } from './MsgConvertERC20';

export * from './MsgConvertCoin';
export * from './MsgConvertERC20';

export type Erc20MsgV1 = MsgConvertCoinV1 | MsgConvertERC20V1;
export namespace Erc20MsgV1 {
  export type Amino = MsgConvertCoinV1.Amino | MsgConvertERC20V1.Amino;
  export type Data = MsgConvertCoinV1.Data | MsgConvertERC20V1.Data;
  export type Proto = MsgConvertCoinV1.Proto | MsgConvertERC20V1.Proto;
}
