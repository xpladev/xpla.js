import { LCDClient } from '../LCDClient';
import { WasmAPI } from './WasmAPI';

const xpla = new LCDClient({
  chainID: 'cube_47-5',
  URL: 'https://cube-lcd.xpla.dev',
});
const wasm = new WasmAPI(xpla);

describe('WasmAPI', () => {
  it('code_info', async () => {
    await expect(wasm.codeInfo(1)).resolves.toMatchObject({
      code_id: 1,
      creator: 'xpla1zpglp37eg85mtwa54ymgj0nzqe37awhsv42yxj',
      code_hash:
        '325A94095F5D98B816AB5192C7771B43D9E45800846B5F2CC96B92E5F3492D45',
      instantiate_permission: {
        permission: 3,
        address: '',
      },
    });
  });
});
