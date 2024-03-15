import { Plan } from '../../../core';
import { LCDClient } from '../LCDClient';
import { UpgradeAPI } from './UpgradeAPI.ts';

const xpla = new LCDClient({
  chainID: 'cube_47-5',
  URL: 'https://cube-lcd.xpla.dev',
});
const upgrade = new UpgradeAPI(xpla);

describe('UpgradeAPI', () => {
  describe('applied_plan', () => {
    it('0 for invalid name', async () => {
      const height = await upgrade.appliedPlan('there_is_no_plan_like_this');
      expect(height).toEqual(0);
    });
  });

  describe('current_plan', () => {
    it('null plan', async () => {
      const plan = await upgrade.currentPlan();
      expect(plan == null || plan instanceof Plan);
    });
  });

  describe('node_versions', () => {
    it('module count', async () => {
      expect(await upgrade.moduleVersions()).toHaveLength(21);
    });
  });
});
