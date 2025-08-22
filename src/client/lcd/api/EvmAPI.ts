import { BaseAPI } from './BaseAPI';
import { Account, Coin, Coins, EvmAccount, EvmParamsV1, EvmChainConfigV1 } from '../../../core';
import { APIParams } from '../APIRequester';
import { LCDClient } from '../LCDClient';

export class EvmAPI extends BaseAPI {
  constructor(public lcd: LCDClient) {
    super(lcd.apiRequester);
  }

  public async account(address: string, params: APIParams = {}): Promise<[EvmAccount, Coin]> {
    try {
      // from 1.8
      return await this.c
        .get<any>(`/cosmos/evm/vm/v1/account/${address}`, params)
        .catch(() => { throw new Error('Not Implemented') })
        .then(d => [
            new EvmAccount(address, d.nonce, d.code_hash),
            d.balance ? new Coin('axpla', d.balance) : new Coin('axpla', 0),
        ]);
    } catch {}
    // for 1.7
    return await this.c
      .get<any>(`/ethermint/evm/v1/account/${address}`, params)
      .then(d => [
          new EvmAccount(address, d.nonce, d.code_hash),
          d.balance ? new Coin('axpla', d.balance) : new Coin('axpla', 0),
      ]);
  }

  public async cosmosAccount(address: string, params: APIParams = {}): Promise<Account> {
    try {
      // from 1.8
      return await this.c
        .get<any>(`/cosmos/evm/vm/v1/cosmos_account/${address}`, params)
        .catch(() => { throw new Error('Not Implemented') })
        .then(d => {
          return Account.fromAmino({
            type: 'cosmos-sdk/BaseAccount',
            value: {
              address: d.cosmos_address,
              public_key: null,
              account_number: d.account_number,
              sequence: d.sequence,
            }
          });
        });
    } catch {}
    // for 1.7
    return await this.c
      .get<any>(`/ethermint/evm/v1/cosmos_account/${address}`, params)
      .then(d => {
        return Account.fromAmino({
          type: 'cosmos-sdk/BaseAccount',
          value: {
            address: d.cosmos_address,
            public_key: null,
            account_number: d.account_number,
            sequence: d.sequence,
          }
        });
      });
  }

  public async validatorAccount(consAddress: string, params: APIParams = {}): Promise<Account> {
    try {
      // from 1.8
      return await this.c
        .get<any>(`/cosmos/evm/vm/v1/validator_account/${consAddress}`, params)
        .catch(() => { throw new Error('Not Implemented') })
        .then(d => {
          return Account.fromAmino({
            type: 'cosmos-sdk/BaseAccount',
            value: {
              address: d.account_address,
              public_key: null,
              account_number: d.account_number,
              sequence: d.sequence,
            }
          });
        });
    } catch {}
    // for 1.7
    return await this.c
      .get<any>(`/ethermint/evm/v1/validator_account/${consAddress}`, params)
      .then(d => {
        return Account.fromAmino({
          type: 'cosmos-sdk/BaseAccount',
          value: {
            address: d.account_address,
            public_key: null,
            account_number: d.account_number,
            sequence: d.sequence,
          }
        });
      });
  }

  public async balances(address: string, params: APIParams = {}): Promise<Coins> {
    try {
      // from 1.8
      return await this.c
        .get<{ balance: string }>(`/cosmos/evm/vm/v1/balances/${address}`, params)
        .catch(() => { throw new Error('Not Implemented') })
        .then(d => {
          return Coins.fromString(d.balance + 'axpla');
        });
    } catch {}
    // for 1.7
    return await this.c
      .get<{ balance: string }>(`/ethermint/evm/v1/balances/${address}`, params)
      .then(d => {
        return Coins.fromString(d.balance + 'axpla');
      });
  }

  public async baseFee(params: APIParams = {}): Promise<string> {
    try {
      // from 1.8
      return await this.c
        .get<{ base_fee: string }>('/cosmos/evm/vm/v1/base_fee', params)
        .catch(() => { throw new Error('Not Implemented') })
        .then(d => d.base_fee ?? '');
    } catch {}
    // for 1.7
    return await this.c
      .get<{ base_fee: string }>('/ethermint/evm/v1/base_fee', params)
      .then(d => d.base_fee ?? '');
  }

  public async codes(address: string, params: APIParams = {}): Promise<string> {
    try {
      // from 1.8
      return await this.c
        .get<{ code: string }>(`/cosmos/evm/vm/v1/codes/${address}`, params)
        .catch(() => { throw new Error('Not Implemented') })
        .then(d => d.code ?? '');
    } catch {}
    // for 1.7
    return await this.c
      .get<{ code: string }>(`/ethermint/evm/v1/codes/${address}`, params)
      .then(d => d.code ?? '');
  }

  public async estimateGas(args?: string, gas_cap?: string, proposer_address?: string, chain_id?: number, params: APIParams = {}): Promise<string> {
    try {
      // from 1.8
      return await this.c
        .get<{ gas: string }>('/cosmos/evm/vm/v1/estimate_gas', { args, gas_cap, proposer_address, chain_id, ...params })
        .catch(() => { throw new Error('Not Implemented') })
        .then(d => d.gas ?? '');
    } catch {}
    // for 1.7
    return await this.c
      .get<{ gas: string }>('/ethermint/evm/v1/estimate_gas', { args, gas_cap, proposer_address, chain_id, ...params })
      .then(d => d.gas ?? '');
  }

  public async ethCall(args?: string, gas_cap?: string, proposer_address?: string, chain_id?: number, params: APIParams = {}): Promise<any> {
    try {
      // from 1.8
      return await this.c.get('/cosmos/evm/vm/v1/eth_call', { args, gas_cap, proposer_address, chain_id, ...params })
        .catch(() => { throw new Error('Not Implemented') });
    } catch {}
    // for 1.7
    return await this.c.get('/ethermint/evm/v1/eth_call', { args, gas_cap, proposer_address, chain_id, ...params });
  }

  public async storage(address: string, key: string, params: APIParams = {}): Promise<string> {
    try {
      // from 1.8
      return await this.c
        .get<{ value: string }>(`/cosmos/evm/vm/v1/storage/${address}/${key}`, params)
        .catch(() => { throw new Error('Not Implemented') })
        .then(d => d.value ?? '');
    } catch {}
    // for 1.7
    return await this.c
      .get<{ value: string }>(`/ethermint/evm/v1/storage/${address}/${key}`, params)
      .then(d => d.value ?? '');
  }

  public async minGasPrice(params: APIParams = {}): Promise<string> {
    try {
      // from 1.8
      return await this.c
        .get<{ min_gas_price: string }>('/cosmos/evm/vm/v1/min_gas_price', params)
        .catch(() => { throw new Error('Not Implemented') })
        .then(d => d.min_gas_price ?? '');
    } catch {}
    // for 1.7
    const min_gas_price = await this.c
      .get<{ params: any }>('/ethermint/feemarket/v1/params')
      .then(({ params: d }) => d.min_gas_price);
    return String(min_gas_price);
  }

  public async config(params: APIParams = {}): Promise<EvmChainConfigV1> {
    return await this.c
      .get<{ config: EvmChainConfigV1 }>('/cosmos/evm/vm/v1/config', params)
      .then(({ config: d }) => d);
  }

  /**
   * Gets the current evm module's parameters.
   */
  public async parameters(params: APIParams = {}): Promise<EvmParamsV1> {
    try {
      // from 1.8
      return await this.c
        .get<{ params: any }>('/cosmos/evm/vm/v1/params', params)
        .catch(() => { throw new Error('Not Implemented') })
        .then(({ params: d }) => EvmParamsV1.fromData(d));
    } catch {}
    // for 1.7
    return await this.c
      .get<{ params: any }>('/ethermint/evm/v1/params', params)
      .then(({ params: d }) => EvmParamsV1.fromData(d));
  }
}
