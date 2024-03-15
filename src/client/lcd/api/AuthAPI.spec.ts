import { AuthAPI } from './AuthAPI';
import { BaseAccount } from '../../../core';
import { MnemonicKey } from '../../../key';
import { LCDClient } from '../LCDClient';

const xpla = new LCDClient({
  chainID: 'cube_47-5',
  URL: 'https://cube-lcd.xpla.dev',
});
const auth = new AuthAPI(xpla);

describe('AuthAPI', () => {
  describe('accounts', () => {
    it('account exists', async () => {
      const acct = await auth.accountInfo(
        'xpla1h8ljdmae7lx05kjj79c9ekscwsyjd3yr8wyvdn'
      );

      expect(acct instanceof BaseAccount).toBe(true);
    });

    it('invalid account', async () => {
      await expect(auth.accountInfo('1234')).rejects.toThrow();
    });

    it("account doesn't exist (valid but new account)", async () => {
      const mk = new MnemonicKey();
      await expect(auth.accountInfo(mk.accAddress)).rejects.toThrow(
        'status code 404'
      );
    });
  });

  describe('parameters', () => {
    it('parameters', async () => {
      const param = await auth.parameters();

      expect(param.max_memo_characters).toBeGreaterThanOrEqual(0);
      expect(param.tx_sig_limit).toBeGreaterThanOrEqual(0);
      expect(param.tx_size_cost_per_byte).toBeGreaterThanOrEqual(0);
      expect(param.sig_verify_cost_ed25519).toBeGreaterThanOrEqual(0);
      expect(param.sig_verify_cost_secp256k1).toBeGreaterThanOrEqual(0);
    });
  });
});
