import { BaseAPI } from './BaseAPI';
import { Account, Coin, Coins, EvmAccount, EvmParamsV1 } from '../../../core';
import { APIParams } from '../APIRequester';
import { LCDClient } from '../LCDClient';

export class EvmAPI extends BaseAPI {
  constructor(public lcd: LCDClient) {
    super(lcd.apiRequester);
  }

  public async account(address: string, params: APIParams = {}): Promise<[EvmAccount, Coin]> {
    return this.c
      .get<any>(`/ethermint/evm/v1/account/${address}`, params)
      .then(d => [
          new EvmAccount(address, d.nonce, d.code_hash),
          d.balance ? new Coin('axpla', d.balance) : new Coin('axpla', 0),
      ]);
  }

  public async cosmosAccount(address: string, params: APIParams = {}): Promise<Account> {
    return this.c
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
    return this.c
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
    return this.c
      .get<{ balance: string }>(`/ethermint/evm/v1/balances/${address}`, params)
      .then(d => {
        return Coins.fromString(d.balance + 'axpla');
      });
  }

  public async baseFee(params: APIParams = {}): Promise<string> {
    return this.c
      .get<{ base_fee: string }>('/ethermint/evm/v1/base_fee', params)
      .then(d => d.base_fee ?? '');
  }

  public async codes(address: string, params: APIParams = {}): Promise<string> {
    return this.c
      .get<{ code: string }>(`/ethermint/evm/v1/codes/${address}`, params)
      .then(d => d.code ?? '');
  }

  public async estimateGas(args?: string, gas_cap?: string, proposer_address?: string, chain_id?: number, params: APIParams = {}): Promise<string> {
    return this.c
      .get<{ gas: string }>('/ethermint/evm/v1/estimate_gas', { args, gas_cap, proposer_address, chain_id, ...params })
      .then(d => d.gas ?? '');
  }

  public async ethCall(args?: string, gas_cap?: string, proposer_address?: string, chain_id?: number, params: APIParams = {}): Promise<any> {
    return this.c.get('/ethermint/evm/v1/eth_call', { args, gas_cap, proposer_address, chain_id, ...params });
  }

  public async storage(address: string, key: string, params: APIParams = {}): Promise<string> {
    return this.c
      .get<{ value: string }>(`/ethermint/evm/v1/storage/${address}/${key}`, params)
      .then(d => d.value ?? '');
  }

  /**
   * Gets the current evm module's parameters.
   */
  public async parameters(params: APIParams = {}): Promise<EvmParamsV1> {
    return this.c
      .get<{ params: any }>('/ethermint/evm/v1/params', params)
      .then(({ params: d }) => EvmParamsV1.fromData(d));
  }
}
