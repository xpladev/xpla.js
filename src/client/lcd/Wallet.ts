import { Int64Input, Int64 } from '../../util/int64';
import { LCDClient } from './LCDClient';
import { Key } from '../../key';
import { CreateTxOptions } from '../lcd/api/TxAPI';
import { Tx } from '../../core/Tx';
import { SignMode as SignModeV2 } from '@xpla/xpla.proto/cosmos/tx/signing/v1beta1/signing';
import { Coins, Fee } from '../../core';

export class Wallet {
  constructor(
    public lcd: LCDClient,
    public key: Key
  ) {}

  public accountNumberAndSequence(): Promise<{
    account_number: Int64;
    sequence: Int64;
  }> {
    return this.lcd.auth.accountInfo(this.key.accAddress).then(d => {
      return {
        account_number: d.getAccountNumber(),
        sequence: d.getSequenceNumber(),
      };
    });
  }

  public accountNumber(): Promise<Int64> {
    return this.lcd.auth.accountInfo(this.key.accAddress).then(d => {
      return d.getAccountNumber();
    });
  }

  public sequence(): Promise<Int64> {
    return this.lcd.auth.accountInfo(this.key.accAddress).then(d => {
      return d.getSequenceNumber();
    });
  }

  public async createTx(
    options: CreateTxOptions & {
      sequence?: Int64Input;
    }
  ): Promise<Tx> {
    return this.lcd.tx.create(
      [
        {
          address: this.key.accAddress,
          sequenceNumber: options.sequence,
          publicKey: this.key.publicKey,
        },
      ],
      options
    );
  }

  public async createAndSignTx(
    options: CreateTxOptions & {
      sequence?: Int64Input;
      accountNumber?: Int64Input;
      signMode?: SignModeV2;
    }
  ): Promise<Tx> {
    let accountNumber = options.accountNumber;
    let sequence = options.sequence;

    if (accountNumber === undefined || sequence === undefined) {
      const res = await this.accountNumberAndSequence();
      if (accountNumber === undefined) {
        accountNumber = res.account_number;
      }

      if (sequence === undefined) {
        sequence = res.sequence;
      }
    }

    options.sequence = sequence;
    options.accountNumber = accountNumber;

    let tx: Tx;

    if (options.fee) {
      tx = await this.createTx(options);
      tx = await this.key.signTx(
        tx,
        {
          accountNumber,
          sequence,
          chainID: this.lcd.config.chainID,
          signMode: options.signMode ?? SignModeV2.SIGN_MODE_DIRECT,
        },
        this.lcd.config.isClassic
      );
    } else {
      const gasPrices = options.gasPrices ?? this.lcd.config.gasPrices;
      const gasAdjustment =
        options.gasAdjustment ?? this.lcd.config.gasAdjustment ?? 2.0;
      const feeDenoms = options.feeDenoms ?? ['axpla'];
      let gasPricesCoins: Coins | undefined;

      if (gasPrices) {
        gasPricesCoins = new Coins(gasPrices);

        if (feeDenoms) {
          const gasPricesCoinsFiltered = gasPricesCoins.filter(c =>
            feeDenoms.includes(c.denom)
          );

          if (gasPricesCoinsFiltered.toArray().length > 0) {
            gasPricesCoins = gasPricesCoinsFiltered;
          }
        }
      }

      options.fee = new Fee(
        200000,
        gasPricesCoins ? gasPricesCoins.mul(200000).toIntCeilCoins() : '0axpla'
      );
      tx = await this.createTx(options);
      tx = await this.key.signTx(
        tx,
        {
          accountNumber,
          sequence,
          chainID: this.lcd.config.chainID,
          signMode: options.signMode ?? SignModeV2.SIGN_MODE_DIRECT,
        },
        this.lcd.config.isClassic
      );

      const gas = await this.lcd.tx.estimateGas(tx, { gasAdjustment });
      const feeAmount = gasPricesCoins
        ? gasPricesCoins.mul(gas).toIntCeilCoins()
        : '0axpla';
      tx.clearSignatures();
      tx.auth_info.fee = new Fee(gas, feeAmount);
      tx = await this.key.signTx(
        tx,
        {
          accountNumber,
          sequence,
          chainID: this.lcd.config.chainID,
          signMode: options.signMode ?? SignModeV2.SIGN_MODE_DIRECT,
        },
        this.lcd.config.isClassic
      );
    }

    return tx;
  }
}
