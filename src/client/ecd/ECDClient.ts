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
import { EvmAddress } from '../../core';
import { Numeric } from '../../core/numeric';
import { encode as eip55 } from 'eip55';

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
 * An object repesenting a connection to a xplad node running the Lite Client Daemon (LCD)
 * server, a REST server providing access to a node.
 *
 * ### Example
 *
 * ```ts
 * import { ECDClient, Coin } from 'xpla.js';
 *
 * const xpla = new ECDClient({
 *    URL: "https://cube-evm-rpc.xpla.dev",
 *    chainID: "cube_47-5",
 *    id: ECDClient.getIDfromChainID("cube_47-5")
 * });
 * ```
 */

export class ECDClient {
  public static getIDfromChainID(chainID: string): number {
    const tok = chainID.split(/[_-]/g);
    return parseInt(tok[1]);
  }

  public static bufferFromHex(hex: string): Buffer {
    if (hex === undefined || hex === '0x' || hex === '0x0' || hex === '0x00') {
      return Buffer.alloc(0);
    }
    if (hex.startsWith('0x')) {
      hex = hex.substring(2);
    }
    if (hex.length % 2 == 1) {
      hex = '0' + hex;
    }
    return Buffer.from(hex, 'hex');
  }

  public static unpadBuffer(d: Buffer): Buffer {
    let i = 0;
    while (d[i] == 0 && i < d.length) i++;
    return d.slice(i);
  }

  public static bufferToAddress(buffer: Buffer): EvmAddress {
    if (buffer.length < 20) throw new Error('Buffer length must be 20');
    else if (buffer.length > 20)
      buffer = buffer.slice(buffer.length - 20, buffer.length);
    return eip55('0x' + buffer.toString('hex'));
  }

  public static bufferFromString(utf8: string): Buffer {
    const result = [];
    for (let i = 0; i < utf8.length; i += 1) {
      const hi = utf8.charCodeAt(i);
      if (hi < 0x0080) {
        // code point range: U+0000 - U+007F
        // bytes: 0xxxxxxx
        result.push(hi);
        continue;
      }
      if (hi < 0x0800) {
        // code point range: U+0080 - U+07FF
        // bytes: 110xxxxx 10xxxxxx
        result.push(0xc0 | (hi >> 6), 0x80 | (hi & 0x3f));
        continue;
      }
      if (hi < 0xd800 || hi >= 0xe000) {
        // code point range: U+0800 - U+FFFF
        // bytes: 1110xxxx 10xxxxxx 10xxxxxx
        result.push(
          0xe0 | (hi >> 12),
          0x80 | ((hi >> 6) & 0x3f),
          0x80 | (hi & 0x3f)
        );
        continue;
      }
      i += 1;
      if (i < utf8.length) {
        // surrogate pair
        const lo = utf8.charCodeAt(i);
        const code = ((0x00010000 + (hi & 0x03ff)) << 10) | (lo & 0x03ff);
        // code point range: U+10000 - U+10FFFF
        // bytes: 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
        result.push(
          0xf0 | (code >> 18),
          0x80 | ((code >> 12) & 0x3f),
          0x80 | ((code >> 6) & 0x3f),
          0x80 | (code & 0x3f)
        );
      } else {
        break;
      }
    }
    return Buffer.from(result);
  }

  public static dataFromParams(types: string[], params: any[]): Buffer {
    if (types.length > params.length)
      throw new Error('The params count should be more or equal than types.');
    const data: Buffer[] = [];
    const dyndata: Buffer[] = [];
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
              if (hex.startsWith('0x')) {
                hex = hex.substring(2);
              }
              if (hex.length % 2 == 1) {
                hex = '0' + hex;
              }
              const buff = Buffer.from(hex, 'hex');
              if (buff.length < 32) {
                const pad = Buffer.alloc(32 - buff.length, 0);
                data.push(pad);
              }
              data.push(buff);
            }
            break;

          case 'bignumber':
          case 'address':
            {
              let hex = Numeric.parse(param).toHex();
              if (hex.startsWith('0x')) {
                hex = hex.substring(2);
              }
              if (hex.length % 2 == 1) {
                hex = '0' + hex;
              }
              const buff = Buffer.from(hex, 'hex');
              if (buff.length < 32) {
                const pad = Buffer.alloc(32 - buff.length, 0);
                data.push(pad);
              }
              data.push(buff);
            }
            break;

          case 'bool':
            {
              const buff = Buffer.alloc(32, 0);
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
                const buff = Buffer.from(pos, 'hex');
                if (buff.length < 32) {
                  const pad = Buffer.alloc(32 - buff.length, 0);
                  data.push(pad);
                }
                data.push(buff);
              }

              const len = param.length.toString(16);
              {
                const buff = Buffer.from(len, 'hex');
                if (buff.length < 32) {
                  const pad = Buffer.alloc(32 - buff.length, 0);
                  dyndata.push(pad);
                }
                dyndata.push(buff);
                dynoffset += 32;
              }

              const buff = ECDClient.bufferFromString(param);
              dyndata.push(buff);
              dynoffset += buff.length;
              if (buff.length % 32 > 0) {
                const pad = Buffer.alloc(32 - (buff.length % 32), 0);
                dyndata.push(pad);
                dynoffset += pad.length;
              }
            }
            break;

          case 'bytes':
            {
              let bytes: Buffer;
              if (typeof param === 'string' && param.startsWith('0x')) {
                bytes = Buffer.from(param.substring(2), 'hex');
              } else if (!(param instanceof Buffer)) {
                throw new Error('not buffer');
              } else {
                bytes = param;
              }

              const pos = dynoffset.toString(16);
              {
                const buff = Buffer.from(pos, 'hex');
                if (buff.length < 32) {
                  const pad = Buffer.alloc(32 - buff.length, 0);
                  data.push(pad);
                }
                data.push(buff);
              }

              const len = bytes.length.toString(16);
              {
                const buff = Buffer.from(len, 'hex');
                if (buff.length < 32) {
                  const pad = Buffer.alloc(32 - buff.length, 0);
                  dyndata.push(pad);
                }
                dyndata.push(buff);
                dynoffset += 32;
              }

              dyndata.push(bytes);
              dynoffset += bytes.length;
              if (bytes.length % 32 > 0) {
                const pad = Buffer.alloc(32 - (bytes.length % 32), 0);
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
    return Buffer.concat(data.concat(dyndata));
  }

  public static dataToParams(types: string[], data: Buffer): any[] {
    const params: any[] = [];
    let idx = 0;
    for (const type of types) {
      const buff = data.slice(idx, idx + 32);
      try {
        switch (type) {
          case 'number':
            {
              const n = parseInt(buff.toString('hex'), 16);
              params.push(n);
            }
            break;

          case 'bignumber':
            {
              const bn = Numeric.parse('0x' + buff.toString('hex'));
              params.push(bn);
            }
            break;

          case 'address':
            {
              const addr = ECDClient.bufferToAddress(buff);
              params.push(addr);
            }
            break;

          case 'bool':
            {
              const n = parseInt(buff.toString('hex'), 16);
              params.push(n != 0);
            }
            break;

          case 'string':
            {
              const pos = parseInt(buff.toString('hex'), 16);
              const len = parseInt(
                data.slice(pos, pos + 32).toString('hex'),
                16
              );
              const str = data.slice(pos + 32, pos + 32 + len).toString('utf8');
              params.push(str);
            }
            break;

          case 'bytes':
            {
              const pos = parseInt(buff.toString('hex'), 16);
              const len = parseInt(
                data.slice(pos, pos + 32).toString('hex'),
                16
              );
              const buf = Buffer.from(data.slice(pos + 32, pos + 32 + len));
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
}
