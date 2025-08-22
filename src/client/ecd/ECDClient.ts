import { EVMRequester } from './APIRequester';
import {
  EvmAuthAPI,
  EvmTxAPI,
  EvmBankAPI,
  EvmTokenAPI,
  EvmNftAPI,
} from './api';
import { EvmWallet } from './EvmWallet';
import { Key } from '../../key';
import { Coins, EvmAddress } from '../../core';
import { Numeric } from '../../core/numeric';
import { encode as eip55 } from 'eip55';
import { Convert } from '../../util/convert';

export interface ECDClientConfig {
  /**
   * The base URL to which EVM LCD requests will be made.
   */
  URL: string;

  /**
   * Chain ID of the blockchain to connect to.
   */
  chainID: string;

  id: number;
}

const DEFAULT_ECD_OPTIONS: Partial<ECDClientConfig> = {};

/**
 * An object repesenting a connection to a xplad node running the EVM Client Daemon (ECD)
 * server, a REST server providing access to a node.
 *
 * ### Example
 *
 * ```ts
 * import { ECDClient, Coin } from 'xpla.js';
 *
 * const URL = "https://cube-evm-rpc.xpla.dev";
 * const chainID = "cube_47-5";
 * 
 * const ecd = new ECDClient({
 *   chainID,
 *   URL,
 *   id: ECDClient.getIDfromChainID(chainID),
 * });
 * console.debug('ecd:', await ecd.info());
 * ```
 */

export class ECDClient {
  public static getIDfromChainID(chainID: string): number {
    const tok = chainID.split(/[_-]/g);
    return parseInt(tok[1]);
  }

  public static decimalFromHex(hex: string): string {
    if (hex.startsWith('0x')) {
      hex = hex.substring(2);
    }
    const add = (x: string, y: string): string => {
        let c = 0;
        let r = [];
        let lx = x.split('').map(Number);
        let ly = y.split('').map(Number);
        while(lx.length || ly.length) {
            const s = (lx.pop() || 0) + (ly.pop() || 0) + c;
            r.unshift(s < 10 ? s : s - 10); 
            c = s < 10 ? 0 : 1;
        }
        if(c) r.unshift(c);
        return r.join('');
    }

    let dec = '0';
    hex.split('').forEach(chr => {
        const n = parseInt(chr, 16);
        for(let t = 8; t > 0; t >>= 1) {
            dec = add(dec, dec);
            if(n & t) dec = add(dec, '1');
        }
    });
    return dec;
  }

  public static bytesToAddress(buffer: Uint8Array): EvmAddress {
    if (buffer.length < 20) throw new Error('Bytes length must be 20');
    else if (buffer.length > 20)
      buffer = buffer.subarray(buffer.length - 20, buffer.length);
    return eip55('0x' + Convert.toHex(buffer));
  }

  public static dataFromParams(types: string[], params: any[]): Uint8Array {
    if (types.length > params.length)
      throw new Error('The params count should be more or equal than types.');
    const data: Uint8Array[] = [];
    const dyndata: Uint8Array[] = [];
    let idx = 0;
    let dynoffset = types.length * 32;
    for (const type of types) {
      const param = params[idx];
      try {
        switch (type) {
          case 'number':
            {
              let hex;
              if (typeof param === 'string' && param.startsWith('0x')) {
                hex = param.substring(2);
              } else {
                hex = parseInt(param).toString(16);
              }
              const buff = Convert.fromHex(hex);
              if (buff.length < 32) {
                const pad = new Uint8Array(32 - buff.length);
                data.push(pad);
              }
              data.push(buff);
            }
            break;

          case 'bignumber':
          case 'address':
            {
              let hex = Numeric.parse(param).toHex();
              const buff = Convert.fromHex(hex);
              if (buff.length < 32) {
                const pad = new Uint8Array(32 - buff.length);
                data.push(pad);
              }
              data.push(buff);
            }
            break;

          case 'bool':
            {
              const buff = new Uint8Array(32);
              if (param) buff[31] = 1;
              data.push(buff);
            }
            break;

          case 'string':
            {
              if (typeof param !== 'string') {
                throw new Error('not string');
              }

              const pos = dynoffset.toString(16);
              {
                const buff = Convert.fromHex(pos);
                if (buff.length < 32) {
                  const pad = new Uint8Array(32 - buff.length);
                  data.push(pad);
                }
                data.push(buff);
              }

              const len = param.length.toString(16);
              {
                const buff = Convert.fromHex(len);
                if (buff.length < 32) {
                  const pad = new Uint8Array(32 - buff.length);
                  dyndata.push(pad);
                }
                dyndata.push(buff);
                dynoffset += 32;
              }

              const buff = Convert.fromUTF8(param);
              dyndata.push(buff);
              dynoffset += buff.length;
              if (buff.length % 32 > 0) {
                const pad = new Uint8Array(32 - (buff.length % 32));
                dyndata.push(pad);
                dynoffset += pad.length;
              }
            }
            break;

          case 'bytes':
            {
              let bytes: Uint8Array;
              if (typeof param === 'string') {
                bytes = Convert.fromHex(param);
              } else if (!(param instanceof Uint8Array)) {
                throw new Error('not bytes');
              } else {
                bytes = param;
              }

              const pos = dynoffset.toString(16);
              {
                const buff = Convert.fromHex(pos);
                if (buff.length < 32) {
                  const pad = new Uint8Array(32 - buff.length);
                  data.push(pad);
                }
                data.push(buff);
              }

              const len = bytes.length.toString(16);
              {
                const buff = Convert.fromHex(len);
                if (buff.length < 32) {
                  const pad = new Uint8Array(32 - buff.length);
                  dyndata.push(pad);
                }
                dyndata.push(buff);
                dynoffset += 32;
              }

              dyndata.push(bytes);
              dynoffset += bytes.length;
              if (bytes.length % 32 > 0) {
                const pad = new Uint8Array(32 - (bytes.length % 32));
                dyndata.push(pad);
                dynoffset += pad.length;
              }
            }
            break;

          default:
            break;
        }
      } catch (e) {
        let message = 'Unknown Error';
        if (e instanceof Error) message = e.message;
        throw new Error(
          'Cannot parse params: ' + idx + ' type ' + type + '\n' + message
        );
      }
      ++idx;
    }
    return Convert.concatBytes(data.concat(dyndata));
  }

  public static dataToParams(types: string[], data: Uint8Array): any[] {
    const params: any[] = [];
    let idx = 0;
    for (const type of types) {
      const buff = data.subarray(idx, idx + 32);
      try {
        switch (type) {
          case 'number':
            {
              const n = parseInt(Convert.toHex(buff), 16);
              params.push(n);
            }
            break;

          case 'bignumber':
            {
              const bn = Numeric.parse(Convert.toHex(buff));
              params.push(bn);
            }
            break;

          case 'address':
            {
              const addr = ECDClient.bytesToAddress(buff);
              params.push(addr);
            }
            break;

          case 'bool':
            {
              const n = parseInt(Convert.toHex(buff), 16);
              params.push(n != 0);
            }
            break;

          case 'string':
            {
              const pos = parseInt(Convert.toHex(buff), 16);
              const len = parseInt(
                Convert.toHex(data.subarray(pos, pos + 32)),
                16
              );
              const str = Convert.toUTF8(data.subarray(pos + 32, pos + 32 + len));
              params.push(str);
            }
            break;

          case 'bytes':
            {
              const pos = parseInt(Convert.toHex(buff), 16);
              const len = parseInt(
                Convert.toHex(data.subarray(pos, pos + 32)),
                16
              );
              const buf = data.subarray(pos + 32, pos + 32 + len);
              params.push(buf);
            }
            break;

          default:
            break;
        }
      } catch (e) {
        let message = 'Unknown Error';
        if (e instanceof Error) message = e.message;
        idx /= 32;
        throw new Error(
          'Cannot parse params: ' + idx + ' type ' + type + '\n' + message
        );
      }
      idx += 32;
    }
    return params;
  }

  public config: ECDClientConfig;
  public apiRequester: EVMRequester;

  // API access
  public auth: EvmAuthAPI;
  public bank: EvmBankAPI;
  public token: EvmTokenAPI;
  public nft: EvmNftAPI;
  public tx: EvmTxAPI;

  /**
   * Creates a new EVM client with the specified configuration.
   *
   * @param config ECD configuration
   */
  constructor(config: ECDClientConfig) {
    this.config = {
      ...DEFAULT_ECD_OPTIONS,
      ...config,
    };

    this.apiRequester = new EVMRequester(this.config.URL);

    // instantiate APIs
    this.auth = new EvmAuthAPI(this);
    this.bank = new EvmBankAPI(this);
    this.token = new EvmTokenAPI(this);
    this.nft = new EvmNftAPI(this);
    this.tx = new EvmTxAPI(this);
  }

  /** Creates a new wallet with the Key. */
  public wallet(key: Key): EvmWallet {
    key.evm = true;
    return new EvmWallet(this, key);
  }

  public async info(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const info = {
        clientVersion: null,
        netVersion: null,
        netListening: null,
        peerCount: null,
        protocolVersion: null,
        syncing: null,
        mining: null,
        hashrate: 0,
        gasPrice: 0,
        blockNumber: 0,
      };
      this.apiRequester
        .post(this.config.id, 'web3_clientVersion', [])
        .then(response => {
          if (this.apiRequester.isError(response)) {
            throw this.apiRequester.getError(response);
          }
          info.clientVersion = response.result;
          return this.apiRequester.post(this.config.id, 'net_version', []);
        })
        .then(response => {
          if (this.apiRequester.isError(response)) {
            throw this.apiRequester.getError(response);
          }
          info.netVersion = response.result;
          return this.apiRequester.post(this.config.id, 'net_listening', []);
        })
        .then(response => {
          if (this.apiRequester.isError(response)) {
            throw this.apiRequester.getError(response);
          }
          info.netListening = response.result;
          return this.apiRequester.post(this.config.id, 'net_peerCount', []);
        })
        .then(response => {
          if (this.apiRequester.isError(response)) {
            throw this.apiRequester.getError(response);
          }
          info.peerCount = response.result;
          return this.apiRequester.post(
            this.config.id,
            'eth_protocolVersion',
            []
          );
        })
        .then(response => {
          if (this.apiRequester.isError(response)) {
            throw this.apiRequester.getError(response);
          }
          info.protocolVersion = response.result;
          return this.apiRequester.post(this.config.id, 'eth_syncing', []);
        })
        .then(response => {
          if (this.apiRequester.isError(response)) {
            throw this.apiRequester.getError(response);
          }
          info.syncing = response.result;
          return this.apiRequester.post(this.config.id, 'eth_mining', []);
        })
        .then(response => {
          if (this.apiRequester.isError(response)) {
            throw this.apiRequester.getError(response);
          }
          info.mining = response.result;
          return this.apiRequester.post(this.config.id, 'eth_hashrate', []);
        })
        .then(response => {
          if (this.apiRequester.isError(response)) {
            throw this.apiRequester.getError(response);
          }
          info.hashrate = parseInt(response.result, 16);
          return this.apiRequester.post(this.config.id, 'eth_gasPrice', []);
        })
        .then(response => {
          if (this.apiRequester.isError(response)) {
            throw this.apiRequester.getError(response);
          }
          info.gasPrice = parseInt(response.result, 16);
          return this.apiRequester.post(this.config.id, 'eth_blockNumber', []);
        })
        .then(response => {
          if (this.apiRequester.isError(response)) {
            throw this.apiRequester.getError(response);
          }
          info.blockNumber = parseInt(response.result, 16);
          resolve(info);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  /** Get the latest block height. */
  public async latestHeight(): Promise<number> {
    return await this.apiRequester
      .post(this.config.id, 'eth_blockNumber', [])
      .then(response => {
        if (this.apiRequester.isError(response)) {
          throw this.apiRequester.getError(response);
        }
        if (response.result.startsWith('0x')) {
          response.result = response.result.substring(2);
        }
        return parseInt(response.result, 16);
      });
  }

  public static async getGasPricesFromURL(URL: string): Promise<Coins> {
    const apiReq = new EVMRequester(URL);
    const chain_id: number = await apiReq
      .post(0, 'eth_chainId', [])
      .then(response => {
        if (apiReq.isError(response)) {
          throw apiReq.getError(response);
        }
        if (response.result.startsWith('0x')) {
          response.result = response.result.substring(2);
        }
        return parseInt(response.result, 16);
      });
    const gas_price: string = await apiReq
      .post(chain_id, 'eth_gasPrice', [])
      .then(response => {
        if (apiReq.isError(response)) {
          throw apiReq.getError(response);
        }
        return ECDClient.decimalFromHex(response.result);
      });
    const coins: any = {};
    coins['axpla'] = gas_price;
    return new Coins(coins);
  }

  public async getGasPrices(): Promise<Coins> {
    return new Promise<Coins>((resolve, reject) => {
      this.apiRequester
        .post(this.config.id, 'eth_gasPrice', [])
        .then(response => {
          if (this.apiRequester.isError(response)) {
            throw this.apiRequester.getError(response);
          }
          const coins: any = {};
          coins['axpla'] = ECDClient.decimalFromHex(response.result);
          resolve(new Coins(coins));
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}
