import { EvmAPI } from './BaseAPI';
import { EvmAddress } from '../../../core/eip55';
import { EvmTx, EvmTxInfo, EvmMessage } from '../msgs/EvmTx';
import { Numeric } from '../../../core';
import { Convert } from '../../../util/convert';
import { ECDClient } from '../ECDClient';
import { EvmWallet } from '../EvmWallet';
import { Key, RawKey } from '../../../key';
import RLP from 'rlp';
import * as secp256k1 from '@noble/secp256k1';
import { keccak_256 } from '@noble/hashes/sha3';

export interface CreateEvmTxOptions {
  msgs: EvmMessage[];
  gasLimit?: string;
  gasPrice?: string;
}

export class EvmTxAPI extends EvmAPI {
  constructor(public ecd: ECDClient) {
    super(ecd.apiRequester);
  }

  public async get(hash: string): Promise<EvmTx> {
    return this.e
      .post(this.ecd.config.id, 'eth_getTransactionByHash', [hash])
      .then(response => {
        if (this.e.isError(response)) {
          throw this.e.getError(response);
        }
        return this.fromParams(response.result);
      });
  }

  public toParams(tx: EvmTx): any {
    const params: Record<string, string | string[]> = {};
    if (tx.chainId) params.chainId = Numeric.parse(tx.chainId).toHex();
    if (tx.blockHash) params.blockHash = tx.blockHash;
    if (tx.blockNumber)
      params.blockNumber = Numeric.parse(tx.blockNumber).toHex();
    if (tx.from) params.from = tx.from;
    if (tx.gasLimit) params.gasLimit = Numeric.parse(tx.gasLimit).toHex();
    if (tx.gasPrice) params.gasPrice = Numeric.parse(tx.gasPrice).toHex();
    if (tx.hash) params.hash = tx.hash;
    if (tx.input) params.input = tx.input;
    if (tx.nonce) params.nonce = Numeric.parse(tx.nonce).toHex();
    if (tx.to) params.to = tx.to;
    if (tx.transactionIndex)
      params.transactionIndex = Numeric.parse(tx.transactionIndex).toHex();
    if (tx.value) params.value = Numeric.parse(tx.value).toHex();
    if (tx.data) params.data = '0x' + Convert.toHex(tx.data);
    if (tx.type) params.type = Numeric.parse(tx.type).toHex();
    if (tx.v) params.v = Numeric.parse(tx.v).toHex();
    if (tx.r) params.r = '0x' + Convert.toHex(tx.r);
    if (tx.s) params.s = '0x' + Convert.toHex(tx.s);
    if (tx.accessList) params.accessList = tx.accessList;
    return params;
  }

  public fromParams(params: any): EvmTx {
    const tx: EvmTx = {};
    if (params.chainId) tx.chainId = Numeric.parse(params.chainId).toNumber();
    if (params.blockHash) tx.blockHash = params.blockHash;
    if (params.blockNumber) tx.blockNumber = Numeric.parse(params.blockNumber);
    if (params.from) tx.from = params.from;
    if (params.gasLimit) tx.gasLimit = Numeric.parse(params.gasLimit);
    if (params.gasPrice) tx.gasPrice = Numeric.parse(params.gasPrice);
    if (params.hash) tx.hash = params.hash;
    if (params.input) tx.input = params.input;
    if (params.nonce) tx.nonce = Numeric.parse(params.nonce);
    if (params.to) tx.to = params.to;
    if (params.transactionIndex)
      tx.transactionIndex = Numeric.parse(params.transactionIndex);
    if (params.value) tx.value = Numeric.parse(params.value);
    if (params.data)
      tx.data = Convert.fromHex(
        params.data.indexOf('0x') == 0 ? params.data.substring(2) : params.data,
      );
    if (params.type) tx.type = Numeric.parse(params.type).toNumber();
    if (params.v) tx.v = Numeric.parse(params.v).toNumber();
    if (params.r)
      tx.r = Convert.fromHex(
        params.r.indexOf('0x') == 0 ? params.r.substring(2) : params.r,
      );
    if (params.s)
      tx.s = Convert.fromHex(
        params.s.indexOf('0x') == 0 ? params.s.substring(2) : params.s,
      );
    if (tx.accessList) params.accessList = tx.accessList;
    return tx;
  }

  public async create(
    by: EvmAddress,
    options: CreateEvmTxOptions & {
      sequence?: number;
    }
  ): Promise<EvmTx> {
    const msg = options.msgs[0];
    const utx = msg.tx();

    if (utx.chainId == undefined) {
      utx.chainId = this.ecd.config.id;
    }

    if (utx.gasLimit == undefined) {
      if (options.gasLimit) {
        utx.gasLimit = Numeric.parse(options.gasLimit);
      } else {
        utx.gasLimit = Numeric.parse(await this.estimateGas(utx));
      }
    }

    if (utx.gasPrice == undefined) {
      if (options.gasPrice) {
        utx.gasPrice = Numeric.parse(options.gasPrice);
      } else {
        const gasPrices = await this.getGasPrices();
        utx.gasPrice = Numeric.parse(gasPrices['axpla']);
      }
    }

    if (utx.nonce == undefined) {
      utx.nonce = options.sequence
        ? Numeric.parse(options.sequence)
        : Numeric.parse(
            (await this.ecd.auth.accountInfo(by)).getSequenceNumber()
          );
    }
    return utx;
  }

  public async getGasPrices(): Promise<{ [denom: string]: string }> {
    return new Promise<{ [denom: string]: string }>((resolve, reject) => {
      this.e
        .post(this.ecd.config.id, 'eth_gasPrice', [])
        .then(response => {
          if (this.e.isError(response)) {
            throw this.e.getError(response);
          }
          resolve({
            axpla: Numeric.parse(response.result).toString(),
          });
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  public async estimateGas(tx: EvmTx): Promise<string> {
    return this.e
      .post(this.ecd.config.id, 'eth_estimateGas', [this.toParams(tx)])
      .then(response => {
        if (this.e.isError(response)) {
          throw this.e.getError(response);
        }
        return Numeric.parse(response.result).toString();
      });
  }

  private async _broadcast(tx: EvmTx) {
    const { chainId, v } = tx;

    const params = this.toParams(tx);

    const v_id =
      chainId && v
        ? BigInt(chainId) * BigInt(2) + BigInt(35 + v - 27)
        : BigInt(0);

    const values: Uint8Array[] = [
      Convert.fromHex(params.nonce ?? '0'),
      Convert.fromHex(params.gasPrice ?? '0'),
      Convert.fromHex(params.gasLimit ?? '0'),
      Convert.unpadBytes(Convert.fromHex(params.to)),
      Convert.fromHex(params.value ?? '0'),
      Convert.unpadBytes(tx.data ?? new Uint8Array(0)),
      Convert.fromHex(v_id.toString(16)),
      Convert.unpadBytes(tx.r ?? new Uint8Array(0)),
      Convert.unpadBytes(tx.s ?? new Uint8Array(0)),
    ];

    const serializedMsg =
      '0x' + Convert.toHex(RLP.encode(values));

    const response = await this.e.post(
      this.ecd.config.id,
      'eth_sendRawTransaction',
      [serializedMsg],
    );

    return response;
  }

  /**
   * Broadcast the transaction using "sync" mode, then wait for its inclusion in a block.
   *
   * This method polls txInfo using the txHash to confirm the transaction's execution.
   *
   * @param tx      transaction to broadcast
   * @param timeout time in milliseconds to wait for transaction to be included in a block. defaults to 30000
   */
  public async broadcast(tx: EvmTx, timeout = 30000): Promise<EvmTxInfo> {
    const POLL_INTERVAL = 500;

    const response = await this._broadcast(tx);

    if (this.e.isError(response)) {
      throw this.e.getError(response);
    }

    const hash = response.result;

    let result: EvmTxInfo | undefined;
    for (let i = 0; i <= timeout / POLL_INTERVAL; i++) {
      try {
        result = await this.txInfo(hash);
      } catch (error) {
        // Errors when transaction is not found.
      }
      if (result) {
        break;
      }
      await new Promise(resolve => setTimeout(resolve, POLL_INTERVAL));
    }

    if (!result) {
      throw new Error(
        `Transaction was not included in a block before timeout of ${timeout}ms`
      );
    }

    return result;
  }

  /**
   * NOTE: This is not a synchronous function and is unconventionally named. This function
   * can be await as it returns a `Promise`.
   *
   * Broadcast the transaction using the "sync" mode, returning after CheckTx() is performed.
   * @param tx transaction to broadcast
   */
  public async broadcastSync(tx: EvmTx): Promise<string> {
    const response = await this._broadcast(tx);

    if (this.e.isError(response)) {
      throw this.e.getError(response);
    }

    return response.result;
  }

  /**
   * Looks up a transaction on the blockchain, addressed by its hash
   * @param txHash transaction's hash
   */
  public async txInfo(hash: string): Promise<EvmTxInfo> {
    return this.e
      .post(this.ecd.config.id, 'eth_getTransactionReceipt', [hash])
      .then(response => {
        if (this.e.isError(response)) {
          throw this.e.getError(response);
        }

        return EvmTxInfo.fromData(response.result);
      });
  }

  public async sign(
    signer: EvmWallet | Key | RawKey,
    tx: EvmTx
  ): Promise<EvmTx> {
    if (
      tx.nonce === undefined ||
      tx.gasPrice === undefined ||
      tx.gasLimit === undefined
    ) {
      throw new Error('tx must have [ nonce, gasLimit, gasPrice ]');
    }

    let privateKey: Uint8Array | null = null;
    if ((signer as EvmWallet).key) {
      signer = (signer as EvmWallet).key;
    }
    if ((signer as RawKey).privateKey) {
      privateKey = (signer as RawKey).privateKey;
    }
    if (privateKey == null) {
      throw new Error('failed to get private key');
    }

    const params = this.toParams(tx);

    const values: Uint8Array[] = [
      params.nonce ? Convert.fromHex(params.nonce) : new Uint8Array(0),
      params.gasPrice
        ? Convert.fromHex(params.gasPrice)
        : new Uint8Array(0),
      params.gasLimit
        ? Convert.fromHex(params.gasLimit)
        : new Uint8Array(0),
      Convert.unpadBytes(Convert.fromHex(params.to)),
      params.value ? Convert.fromHex(params.value) : new Uint8Array(0),
      Convert.unpadBytes(tx.data ?? new Uint8Array(0)),
      params.chainId
        ? Convert.fromHex(params.chainId)
        : new Uint8Array(0),
      new Uint8Array(0),
      new Uint8Array(0),
    ];

    const rlp = RLP.encode(values);
    const msgHash = keccak_256(rlp);

    const [ sig, recid ] = await secp256k1.sign(
      msgHash,
      privateKey,
      {
        recovered: true,
        der: false,
      },
    );
    tx.r = sig.slice(0, 32);
    tx.s = sig.slice(32, 64);
    tx.v = recid ? 0x1c : 0x1b;

    return tx;
  }
}
