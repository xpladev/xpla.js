import Axios, { AxiosInstance } from 'axios';

export type EVMParams = Record<string, string | number | null | undefined>;

// A JSON-RPC payload, which are sent to a JSON-RPC server.
export class JsonRpc2Payload {
  public readonly jsonrpc = '2.0';
  constructor(
    public id: number,
    public method: string,
    public params: Array<any> | Record<string, any>
  ) {}
}

// A JSON-RPC result, which are returned on success from a JSON-RPC server.
export type JsonRpc2Result = {
  id: number;
  result: any;
};

// A JSON-RPC error, which are returned on failure from a JSON-RPC server.
export type JsonRpc2Error = {
  id: number;
  error: {
    code: number;
    message?: string;
    data?: any;
  };
};

export class EVMRequester {
  private axios: AxiosInstance;
  private readonly baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;

    this.axios = Axios.create({
      headers: {
        Accept: 'application/json',
      },
      timeout: 30000,
    });
  }

  public static deepCopy(obj: any) {
    let copy: Record<string, any> = {};

    // Handle the 3 simple types, and null or undefined
    if (null == obj || 'object' != typeof obj) return obj;

    // Keep any Addressable
    if (typeof obj.getAddress === 'function') {
      return obj;
    }

    // Handle Date
    if (obj instanceof Date) {
      copy = new Date();
      copy.setTime(obj.getTime());
      return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
      copy = [];
      for (let i = 0, len = obj.length; i < len; i++) {
        copy[i] = EVMRequester.deepCopy(obj[i]);
      }
      return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
      copy = {};
      for (const attr in obj) {
        if (obj[attr]) copy[attr] = EVMRequester.deepCopy(obj[attr]);
      }
      return copy;
    }

    throw new Error(`should not happen: ${obj} (${typeof obj})`);
  }

  public async post(
    id: number,
    method: string,
    params?: any
  ): Promise<JsonRpc2Result | JsonRpc2Error> {
    const data = new JsonRpc2Payload(id, method, params);
    return this.axios.post(this.baseURL, data).then(d => {
      const response = d.data;
      if (this.isError(response)) {
        return response;
      }
      return response as JsonRpc2Result;
    });
  }

  public isError(
    response: JsonRpc2Result | JsonRpc2Error
  ): response is JsonRpc2Error {
    return (response as JsonRpc2Error).error !== undefined;
  }

  public getError(error: JsonRpc2Error): Error {
    return new Error(
      'evm rpc error: ' + error.error?.code + ': ' + error.error?.message
    );
  }
}
