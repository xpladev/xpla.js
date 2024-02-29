import { EvmAddress, Coin, Coins, Numeric } from '../../../core';
import { EvmTx, EvmMessage } from './EvmTx';
import Decimal from 'decimal.js';

/**
 * A basic message for sending [[Coins]] between Xpla accounts.
 */
export class EvmSend extends EvmMessage {
  public amount: Coin;

  /**
   * @param from_address sender's address
   * @param to_address recipient's address
   * @param amount value of the transaction
   */
  constructor(
    public from_address: EvmAddress,
    public to_address: EvmAddress,
    amount: Coins.Input
  ) {
    super();

    // 현재 네이티브 코인은 axpla만 지원
    if (
      typeof amount === 'string' ||
      typeof amount === 'number' ||
      amount instanceof Decimal
    ) {
      try {
        const axpla = Numeric.parse(amount);
        this.amount = new Coin('axpla', axpla);
        return;
      } catch (e) {
        // parsing error.
      }
    }
    if (
      typeof amount === 'string' ||
      Array.isArray(amount) ||
      amount instanceof Coins
    ) {
      try {
        const coins = new Coins(amount);
        const axpla = coins.get('axpla');
        if (axpla) {
          this.amount = new Coin('axpla', axpla.amount);
          return;
        }
      } catch (e) {
        // parsing error.
      }
    }
    if (amount instanceof Coin && amount.denom === 'axpla') {
      this.amount = new Coin('axpla', amount.amount);
      return;
    }
    this.amount = new Coin('axpla', 0);
  }

  public tx(): EvmTx {
    const tx: EvmTx = {};
    tx.type = 0;
    tx.from = this.from_address;
    tx.to = this.to_address;
    tx.value = this.amount.amount;
    return tx;
  }
}
