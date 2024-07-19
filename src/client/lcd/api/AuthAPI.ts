import {
  AccAddress,
  Account,
  DelayedVestingAccount,
  PeriodicVestingAccount,
  ContinuousVestingAccount,
  BaseAccount,
  ModuleAccount,
  AuthParamsV1B1,
} from '../../../core';
import { BaseAPI } from './BaseAPI';
import { APIParams } from '../APIRequester';
import { LCDClient } from '../LCDClient';

export class AuthAPI extends BaseAPI {
  constructor(public lcd: LCDClient) {
    super(lcd.apiRequester);
  }

  /**
   * Looks up the account information using its Xpla account address. If the account has
   * vesting, it will be one of [LazyGradedVestingAccount, DelayedVestingAccount, PeriodicVestingAccount, ContinuousVestingAccount]
   *
   * @param address address of account to look up
   */
  public async accountInfo(
    address: AccAddress,
    params: APIParams = {}
  ): Promise<Account> {
    const { account } = await this.c.get<{
      account:
        | BaseAccount.Data
        | DelayedVestingAccount.Data
        | PeriodicVestingAccount.Data
        | ContinuousVestingAccount.Data;
    }>(`/cosmos/auth/v1beta1/accounts/${address}`, params);
    return Account.fromData(account, this.lcd.config.isClassic);
  }

  public async moduleAccount(
    name: string,
    params: APIParams = {}
  ): Promise<ModuleAccount> {
    const { account } = await this.c.get<{
      account: ModuleAccount.Data;
    }>(`/cosmos/auth/v1beta1/module_accounts/${name}`, params);
    return ModuleAccount.fromData(account);
  }

  public async moduleAccounts(
    params: APIParams = {}
  ): Promise<ModuleAccount[]> {
    const { accounts } = await this.c.get<{
      accounts: ModuleAccount.Data[];
    }>('/cosmos/auth/v1beta1/module_accounts', params);
    return accounts.map(acc => ModuleAccount.fromData(acc));
  }

  public async parameters(params: APIParams = {}): Promise<AuthParamsV1B1> {
    if (this.lcd.config.isClassic) {
      throw new Error('Not supported for the network');
    }
    return this.c
      .get<{ params: any }>(`/cosmos/auth/v1beta1/params`, params)
      .then(({ params: d }) => AuthParamsV1B1.fromData(d));
  }
}
