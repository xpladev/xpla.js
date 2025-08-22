import { EvmAddress, Numeric } from '../../../core';
import { EvmTx, EvmMessage } from './EvmTx';
import { ECDClient } from '../ECDClient';
import { Convert } from '../../../util/convert';

/**
 * A basic message for sending [[Coins]] between Xpla accounts.
 */
export class EvmSendNft extends EvmMessage {
  /**
   * @param contract erc721 token contract address
   * @param from_address sender's address
   * @param to_address recipient's address
   * @param id NFT's ID
   */
  constructor(
    public contract: EvmAddress,
    public from_address: EvmAddress,
    public to_address: EvmAddress,
    public id: Numeric.Input
  ) {
    super();
  }

  public tx(): EvmTx {
    const tx: EvmTx = {};
    tx.type = 0;
    tx.from = this.from_address;
    tx.to = this.contract;
    tx.value = Numeric.parse(0);
    tx.data = Convert.fromHex(
      '42842e0e' + // keccak256('safeTransferFrom(address,address,uint256)') to 4 bytes
      Convert.toHex(
        ECDClient.dataFromParams(
          ['address', 'address', 'bignumber'],
          [this.from_address, this.to_address, this.id.toString()],
        )
      ),
    );
    return tx;
  }
}

export class EvmMintNft extends EvmMessage {
  /**
   * @param contract erc20 token contract address
   * @param owner_address contract owner's address
   * @param to_address recipient's address
   * @param id NFT's ID
   * @param uri NFT's data URI
   */
  constructor(
    public contract: EvmAddress,
    public owner_address: EvmAddress,
    public to_address: EvmAddress,
    public id: Numeric.Input,
    public uri: string
  ) {
    super();
  }

  public tx(): EvmTx {
    const tx: EvmTx = {};
    tx.type = 0;
    tx.from = this.owner_address;
    tx.to = this.contract;
    tx.value = Numeric.parse(0);
    tx.data = Convert.fromHex(
      'cd279c7c' + // keccak256('safeMint(address,uint256,string)') to 4 bytes
      Convert.toHex(
        ECDClient.dataFromParams(
          ['address', 'bignumber', 'string'],
          [this.to_address, this.id.toString(), this.uri],
        )
      ),
    );
    return tx;
  }
}
