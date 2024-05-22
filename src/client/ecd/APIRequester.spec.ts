import axios from 'axios';
import { EVMRequester } from './APIRequester';

jest.mock('axios');
const mockedAxios = jest.mocked(axios, true);

describe('EVMRequester', () => {
  beforeAll(() => {
    // @ts-expect-error
    axios.create.mockReturnThis();
  });
});
