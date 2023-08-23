import { EVMRequester } from '../APIRequester';

export abstract class EvmAPI {
  constructor(protected e: EVMRequester) {}
}
