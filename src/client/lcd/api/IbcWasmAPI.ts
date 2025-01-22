import { BaseAPI } from './BaseAPI';
import { LCDClient } from '../LCDClient';

export class IbcWasmAPI extends BaseAPI {
  constructor(public lcd: LCDClient) {
    super(lcd.apiRequester);
  }
}
