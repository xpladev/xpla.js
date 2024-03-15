import { SlashingAPI } from './SlashingAPI';
import { Dec } from '../../../core/numeric';
import { LCDClient } from '../LCDClient';

const xpla = new LCDClient({
  chainID: 'cube_47-5',
  URL: 'https://cube-lcd.xpla.dev',
});
const slashing = new SlashingAPI(xpla);

describe('SlashingAPI', () => {
  it('parameters', async () => {
    await expect(slashing.parameters()).resolves.toMatchObject({
      signed_blocks_window: expect.any(Number),
      min_signed_per_window: expect.any(Dec),
      downtime_jail_duration: expect.any(Number),
      slash_fraction_double_sign: expect.any(Dec),
      slash_fraction_downtime: expect.any(Dec),
    });
  });
});
