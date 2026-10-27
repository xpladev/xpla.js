import { Int64, Int64Input } from '../../util/int64';
import { Key } from '../../key';
import { CreateEvmTxOptions } from './api/TxAPI';
import { ECDClient } from './ECDClient';
import { EvmTx, EvmMessage } from './msgs';

export class EvmWallet {
  constructor(
    public ecd: ECDClient,
    public key: Key
  ) {}

  public accountNumberAndSequence(): Promise<{
    account_number: Int64;
    sequence: Int64;
  }> {
    return this.ecd.auth.accountInfo(this.key.accAddress).then(d => {
      return {
        account_number: d.getAccountNumber(),
        sequence: d.getSequenceNumber(),
      };
    });
  }

  public accountNumber(): Promise<Int64> {
    return this.ecd.auth.accountInfo(this.key.accAddress).then(d => {
      return d.getAccountNumber();
    });
  }

  public nonce(): Promise<Int64> {
    return this.ecd.auth.accountInfo(this.key.accAddress).then(d => {
      return d.getSequenceNumber();
    });
  }

  public async createAndSignTx(
    options: CreateEvmTxOptions & {
      sequence?: Int64Input;
    }
  ): Promise<EvmTx> {
    const msgs = options.msgs;
    if (
      !Array.isArray(msgs) ||
      msgs.length != 1 ||
      !(msgs[0] instanceof EvmMessage)
    ) {
      return Promise.reject('ECDClient must need one EvmMsg');
    }
    const utx = await this.ecd.tx.create(this.key.accAddress, options);
    const stx = await this.ecd.tx.sign(this, utx);
    return stx;
  }
}
