import { BaseAPI } from './BaseAPI';
import { LCDClient } from '../LCDClient';

export class CircuitAPI extends BaseAPI {
  constructor(public lcd: LCDClient) {
    super(lcd.apiRequester);
  }
}
