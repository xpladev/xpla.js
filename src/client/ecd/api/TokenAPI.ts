import { EvmAPI } from './BaseAPI';
import { Coins, EvmAddress } from '../../../core';
import { Numeric } from '../../../core/numeric';
import { Pagination } from '../../lcd/APIRequester';
import { ECDClient } from '../ECDClient';

export class EvmTokenAPI extends EvmAPI {
  constructor(public ecd: ECDClient) {
    super(ecd.apiRequester);
  }

  public async name(contract: EvmAddress): Promise<string> {
    return this.e
      .post(this.ecd.config.id, 'eth_call', [
        {
          to: contract,
          data: '0x06fdde03', // keccak256('name()') to 4 bytes
        },
        'latest',
      ])
      .then(response => {
        if (this.e.isError(response)) {
          throw this.e.getError(response);
        }
        const data = ECDClient.bufferFromHex(response.result ?? '0');
        const params = ECDClient.dataToParams(['string'], data);
        return params[0];
      });
  }

  public async symbol(contract: EvmAddress): Promise<string> {
    return this.e
      .post(this.ecd.config.id, 'eth_call', [
        {
          to: contract,
          data: '0x95d89b41', // keccak256('symbol()') to 4 bytes
        },
        'latest',
      ])
      .then(response => {
        if (this.e.isError(response)) {
          throw this.e.getError(response);
        }
        const data = ECDClient.bufferFromHex(response.result ?? '0');
        const params = ECDClient.dataToParams(['string'], data);
        return params[0];
      });
  }

  public async decimals(contract: EvmAddress): Promise<number> {
    return this.e
      .post(this.ecd.config.id, 'eth_call', [
        {
          to: contract,
          data: '0x313ce567', // keccak256('decimals()') to 4 bytes
        },
        'latest',
      ])
      .then(response => {
        if (this.e.isError(response)) {
          throw this.e.getError(response);
        }
        const data = ECDClient.bufferFromHex(response.result ?? '0');
        const params = ECDClient.dataToParams(['number'], data);
        return params[0];
      });
  }

  public async totalSupply(contract: EvmAddress): Promise<Numeric.Output> {
    return this.e
      .post(this.ecd.config.id, 'eth_call', [
        {
          to: contract,
          data: '0x18160ddd', // keccak256('totalSupply()') to 4 bytes
        },
        'latest',
      ])
      .then(response => {
        if (this.e.isError(response)) {
          throw this.e.getError(response);
        }
        const data = ECDClient.bufferFromHex(response.result ?? '0');
        const params = ECDClient.dataToParams(['bignumber'], data);
        return params[0];
      });
  }

  public async balanceOf(
    contract: EvmAddress,
    address: EvmAddress
  ): Promise<Numeric.Output> {
    return this.e
      .post(this.ecd.config.id, 'eth_call', [
        {
          to: contract,
          data:
            '0x70a08231' + // keccak256('balanceOf(address)') to 4 bytes
            ECDClient.dataFromParams(['address'], [address]).toString('hex'),
        },
        'latest',
      ])
      .then(response => {
        if (this.e.isError(response)) {
          throw this.e.getError(response);
        }
        const data = ECDClient.bufferFromHex(response.result ?? '0');
        const params = ECDClient.dataToParams(['bignumber'], data);
        return params[0];
      });
  }

  public async balance(
    contract: EvmAddress,
    address: EvmAddress
  ): Promise<[Coins, Pagination]> {
    const decimals = await this.decimals(contract);
    const symbol = await this.symbol(contract);
    const amount = await this.balanceOf(contract, address);
    let denom = '_';
    switch (decimals) {
      case 24: denom = 'y'; break;
      case 21: denom = 'z'; break;
      case 18: denom = 'a'; break;
      case 15: denom = 'f'; break;
      case 12: denom = 'p'; break;
      case 9: denom = 'n'; break;
      case 6: denom = 'u'; break;
      case 3: denom = 'm'; break;
      case 2: denom = 'c'; break;
      case 1: denom = 'd'; break;
      case 0: denom = ''; break;
    }
    denom += symbol.toLowerCase();
    return [
      Coins.fromData([
        {
          denom,
          amount: amount.toFixed(),
        },
      ]),
      { next_key: null, total: 0 },
    ];
  }

  public async total(contract: EvmAddress): Promise<[Coins, Pagination]> {
    const symbol = await this.symbol(contract);
    const amount = await this.totalSupply(contract);
    return [
      Coins.fromData([
        {
          denom: symbol,
          amount: amount.toString(),
        },
      ]),
      { next_key: null, total: 0 },
    ];
  }
}
