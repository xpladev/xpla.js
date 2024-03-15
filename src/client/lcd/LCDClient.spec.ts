import { LCDClient } from './LCDClient';

describe('LCDClient', () => {
  it('runs', async () => {
    const xpla = new LCDClient({
      chainID: 'cube_47-5',
      URL: 'https://cube-lcd.xpla.dev',
    });
  });
});
