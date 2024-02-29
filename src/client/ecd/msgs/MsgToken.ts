import { EvmAddress, Numeric } from '../../../core';
import { EvmTx, EvmMessage } from './EvmTx';
import { ECDClient } from '../ECDClient';

/**
 * A basic message for sending [[Coins]] between Xpla accounts.
 */
export class EvmSendToken extends EvmMessage {
  /**
   * @param contract erc20 token contract address
   * @param from_address sender's address
   * @param to_address recipient's address
   * @param amount value of the transaction
   */
  constructor(
    public contract: EvmAddress,
    public from_address: EvmAddress,
    public to_address: EvmAddress,
    public amount: Numeric.Input
  ) {
    super();
  }

  public tx(): EvmTx {
    const tx: EvmTx = {};
    tx.type = 0;
    tx.from = this.from_address;
    tx.to = this.contract;
    tx.value = Numeric.parse(0);
    tx.data = Buffer.from(
      'a9059cbb' + // keccak256('transfer(address,uint256)') to 4 bytes
        ECDClient.dataFromParams(
          ['address', 'bignumber'],
          [this.to_address, this.amount.toString()]
        ).toString('hex'),
      'hex'
    );
    return tx;
  }
}

export class EvmMintToken extends EvmMessage {
  /**
   * @param contract erc20 token contract address
   * @param owner_address contract owner's address
   * @param to_address recipient's address
   * @param amount value of the transaction
   */
  constructor(
    public contract: EvmAddress,
    public owner_address: EvmAddress,
    public to_address: EvmAddress,
    public amount: Numeric.Input
  ) {
    super();
  }

  public tx(): EvmTx {
    const tx: EvmTx = {};
    tx.type = 0;
    tx.from = this.owner_address;
    tx.to = this.contract;
    tx.value = Numeric.parse(0);
    tx.data = Buffer.from(
      '40c10f19' + // keccak256('mint(address,uint256)') to 4 bytes
        ECDClient.dataFromParams(
          ['address', 'bignumber'],
          [this.to_address, this.amount.toString()]
        ).toString('hex'),
      'hex'
    );
    return tx;
  }
}
