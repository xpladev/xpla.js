import { EvmAPI } from './BaseAPI';
import { Account, EvmAddress, EvmAccount } from '../../../core';
import { ECDClient } from '../ECDClient';

export class EvmAuthAPI extends EvmAPI {
  constructor(public ecd: ECDClient) {
    super(ecd.apiRequester);
  }

  /**
   * Looks up the account information using its Xpla account address. If the account has
   * vesting, it will be one of [LazyGradedVestingAccount, DelayedVestingAccount, PeriodicVestingAccount, ContinuousVestingAccount]
   *
   * @param address address of account to look up
   */
  public async accountInfo(address: EvmAddress): Promise<Account> {
    return this.e
      .post(this.ecd.config.id, 'eth_getTransactionCount', [address, 'latest'])
      .then(response => {
        if (this.e.isError(response)) {
          throw this.e.getError(response);
        }
        return new EvmAccount(
          address,
          response.result
        );
      });
  }
}
