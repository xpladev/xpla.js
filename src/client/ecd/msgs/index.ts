import { EvmSend } from './MsgBank';
import { EvmSendToken, EvmMintToken } from './MsgToken';
import { EvmSendNft, EvmMintNft } from './MsgNFT';

export * from './EvmTx';
export * from './MsgBank';
export * from './MsgToken';
export * from './MsgNFT';

export type EvmBankMsg = EvmSend;

export type EvmTokenMsg = // ERC20
  EvmSendToken | EvmMintToken;

export type EvmNftMsg = // ERC721
  EvmSendNft | EvmMintNft;
