import { BaseAPI } from './BaseAPI';
import { Coins, AccAddress, BankParamsV1B1 } from '../../../core';
import { APIParams, Pagination, PaginationOptions } from '../APIRequester';
import { LCDClient } from '../LCDClient';

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
