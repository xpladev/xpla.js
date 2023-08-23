import { EvmAPI } from './BaseAPI';
import { Coins, EvmAddress } from '../../../core';
import { Pagination } from '../../lcd/APIRequester';
import { ECDClient } from '../ECDClient';

export class EvmBankAPI extends EvmAPI {
  constructor(public ecd: ECDClient) {
    super(ecd.apiRequester);
  }

  /**
   * Look up the balance of an account by its address.
   * @param address address of account to look up.
   */
  public async balance(address: EvmAddress): Promise<[Coins, Pagination]> {
    return this.e
      .post(this.ecd.config.id, 'eth_getBalance', [address, 'latest'])
      .then(response => {
        if (this.e.isError(response)) {
          throw this.e.getError(response);
        }
        return [
          Coins.fromData([
            {
              denom: 'axpla',
              amount: response.result,
            },
          ]),
          { next_key: null, total: 0 },
        ];
      });
  }
}
