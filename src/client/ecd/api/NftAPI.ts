import { EvmAPI } from './BaseAPI';
import { Coins, EvmAddress } from '../../../core';
import { Numeric } from '../../../core/numeric';
import { Pagination, PaginationOptions } from '../../lcd/APIRequester';
import { ECDClient } from '../ECDClient';

export class EvmNftAPI extends EvmAPI {
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

  public async decimals(_: EvmAddress): Promise<number> {
    _;
    return 0;
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

  public async ownerOf(
    contract: EvmAddress,
    tokenId: Numeric.Input
  ): Promise<EvmAddress> {
    return this.e
      .post(this.ecd.config.id, 'eth_call', [
        {
          to: contract,
          data:
            '0x6352211e' + // keccak256('ownerOf(uint256)') to 4 bytes
            ECDClient.dataFromParams(
              ['bignumber'],
              [tokenId.toString()]
            ).toString('hex'),
        },
        'latest',
      ])
      .then(response => {
        if (this.e.isError(response)) {
          throw this.e.getError(response);
        }
        const data = ECDClient.bufferFromHex(response.result ?? '0');
        const params = ECDClient.dataToParams(['address'], data);
        return params[0];
      });
  }

  public async tokenId(
    contract: EvmAddress,
    index: number,
    owner?: EvmAddress
  ): Promise<Numeric.Output> {
    const params = [];
    if (owner) {
      params.push({
        to: contract,
        data:
          '0x2f745c59' + // keccak256('tokenOfOwnerByIndex(address,uint256)') to 4 bytes
          ECDClient.dataFromParams(
            ['address', 'number'],
            [owner, index]
          ).toString('hex'),
      });
    } else {
      params.push({
        to: contract,
        data:
          '0x4f6ccce7' + // keccak256('tokenByIndex(uint256)') to 4 bytes
          ECDClient.dataFromParams(['bignumber'], [index]).toString('hex'),
      });
    }
    params.push('latest');
    return this.e
      .post(this.ecd.config.id, 'eth_call', params)
      .then(response => {
        if (this.e.isError(response)) {
          throw this.e.getError(response);
        }
        const data = ECDClient.bufferFromHex(response.result ?? '0');
        const params = ECDClient.dataToParams(['bignumber'], data);
        return params[0];
      });
  }

  public async tokenURI(
    contract: EvmAddress,
    tokenId: Numeric.Input
  ): Promise<string> {
    return this.e
      .post(this.ecd.config.id, 'eth_call', [
        {
          to: contract,
          data:
            '0xc87b56dd' + // keccak256('tokenURI(uint256)') to 4 bytes
            ECDClient.dataFromParams(
              ['bignumber'],
              [tokenId.toString()]
            ).toString('hex'),
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

  public async tokens(
    contract: EvmAddress,
    owner: EvmAddress,
    params: Partial<PaginationOptions> = {}
  ): Promise<[number[], Pagination]> {
    const amount = await this.balanceOf(contract, owner);
    const count = amount.toNumber();

    let pageNo = 1;
    let pageLimit = 10;
    let offset = 0;

    if (params['pagination.key']) {
      pageNo = parseInt(params['pagination.key']);
    }

    if (params['pagination.limit']) {
      pageLimit = parseInt(params['pagination.limit']);
    }

    if (params['pagination.offset']) {
      offset = parseInt(params['pagination.offset']);
    } else {
      offset = (pageNo - 1) * pageLimit;
    }

    const start = offset <= count ? offset : count;
    const end = start + pageLimit <= count ? start + pageLimit : count;
    const next_key = end < count ? (pageNo + 1).toString() : null;
    const total = count;

    const tokens: number[] = [];
    for (let i = start; i < end; ++i) {
      try {
        const tokenId = await this.tokenId(contract, i, owner);
        tokens.push(tokenId.toNumber());
      } catch (e) {
        throw new Error((e as Error).message);
      }
    }

    return [tokens, { next_key, total }];
  }

  public async tokensAll(
    contract: EvmAddress,
    params: Partial<PaginationOptions> = {}
  ): Promise<[number[], Pagination]> {
    const amount = await this.totalSupply(contract);
    const count = amount.toNumber();

    let pageNo = 1;
    let pageLimit = 10;
    let offset = 0;

    if (params['pagination.key']) {
      pageNo = parseInt(params['pagination.key']);
    }

    if (params['pagination.limit']) {
      pageLimit = parseInt(params['pagination.limit']);
    }

    if (params['pagination.offset']) {
      offset = parseInt(params['pagination.offset']);
    } else {
      offset = (pageNo - 1) * pageLimit;
    }

    const start = offset <= count ? offset : count;
    const end = start + pageLimit <= count ? start + pageLimit : count;
    const next_key = end < count ? (pageNo + 1).toString() : null;
    const total = count;

    const tokens: number[] = [];
    for (let i = start; i < end; ++i) {
      try {
        const tokenId = await this.tokenId(contract, i);
        tokens.push(tokenId.toNumber());
      } catch (e) {
        throw new Error((e as Error).message);
      }
    }

    return [tokens, { next_key, total }];
  }
}
