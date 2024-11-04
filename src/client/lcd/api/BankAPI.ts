import { BaseAPI } from './BaseAPI';
import { Coin, Coins, AccAddress, BankParamsV1B1 } from '../../../core';
import { APIParams, Pagination, PaginationOptions } from '../APIRequester';
import { LCDClient } from '../LCDClient';

export interface DenomOwner {
  address: AccAddress;
  balance: Coin;
}

export interface DenomUnit {
  denom: string;
  exponent: number;
  aliases: string[];
}

export interface DenomMetadata {
  description: string;
  denom_units: DenomUnit[];
  base: string;
  display: string;
  name: string;
  symbol: string;
  uri: string | undefined;
  uri_hash: string | undefined;
}

export class BankAPI extends BaseAPI {
  constructor(public lcd: LCDClient) {
    super(lcd.apiRequester);
  }

  /**
   * Look up the balance of an account by its address.
   * @param address address of account to look up.
   */
  public async balance(
    address: AccAddress,
    params: Partial<PaginationOptions & APIParams> = {}
  ): Promise<[Coins, Pagination]> {
    return this.c
      .get<{
        balances: Coins.Data;
        pagination: Pagination;
      }>(`/cosmos/bank/v1beta1/balances/${address}`, params)
      .then(d => [Coins.fromData(d.balances), d.pagination]);
  }

  /**
   * Look up the balance of an account by its address.
   * @param address address of account to look up.
   * @param denom denom to look up.
   */
  public async balanceByDenom(
    address: AccAddress,
    denom: string,
    params: Partial<PaginationOptions & APIParams> = {}
  ): Promise<Coin> {
    return this.c
      .get<{
        balance: Coin.Data;
      }>(`/cosmos/bank/v1beta1/balances/${address}/by_denom`, {denom, ...params})
      .then(d => Coin.fromData(d.balance));
  }

  /**
   * Look up the balance of an account by its address.
   * @param denom denom to look up.
   */
  public async denomOwners(
    denom: string,
    params: Partial<PaginationOptions & APIParams> = {}
  ): Promise<[DenomOwner[], Pagination]> {
    return this.c
      .get<{
        denom_owners: DenomOwner[];
        pagination: Pagination;
      }>(`/cosmos/bank/v1beta1/denom_owners/${denom}`, params)
      .then(d => [d.denom_owners, d.pagination]);
  }

  /**
   * Look up the balance of an account by its address.
   * @param denom denom to look up.
   */
  public async denomsMetadata(
    params: Partial<PaginationOptions & APIParams> = {}
  ): Promise<[DenomMetadata[], Pagination]> {
    return this.c
      .get<{
        metadatas: DenomMetadata[];
        pagination: Pagination;
      }>(`/cosmos/bank/v1beta1/denoms_metadata`, params)
      .then(d => [d.metadatas, d.pagination]);
  }

  /**
   * Get the total supply of tokens in circulation for all denominations.
   */
  public async total(
    params: Partial<PaginationOptions & APIParams> = {}
  ): Promise<[Coins, Pagination]> {
    return this.c
      .get<{ supply: Coins.Data; pagination: Pagination }>(
        `/cosmos/bank/v1beta1/supply`,
        params
      )
      .then(d => [Coins.fromData(d.supply), d.pagination]);
  }

  /**
   * Lqueries the spenable balance of all coins for a single account.
   * @param address address of account to look up.
   */
  public async spendableBalances(
    address: AccAddress,
    params: Partial<PaginationOptions & APIParams> = {}
  ): Promise<[Coins, Pagination]> {
    if (this.lcd.config.isClassic) {
      throw new Error('Not supported for the network');
    }
    return this.c
      .get<{
        balances: Coins.Data;
        pagination: Pagination;
      }>(`/cosmos/bank/v1beta1/spendable_balances/${address}`, params)
      .then(d => [Coins.fromData(d.balances), d.pagination]);
  }

  public async parameters(params: APIParams = {}): Promise<BankParamsV1B1> {
    if (this.lcd.config.isClassic) {
      throw new Error('Not supported for the network');
    }
    return this.c
      .get<{ params: any }>(`/cosmos/bank/v1beta1/params`, params)
      .then(({ params: d }) => BankParamsV1B1.fromData(d));
  }

  // TODO: TBD: implement denoms_medata?
}
