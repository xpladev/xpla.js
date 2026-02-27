import Axios, { AxiosInstance } from 'axios';
import { OrderBy as OrderBy_pb } from '@xpla/xpla.proto/cosmos/tx/v1beta1/service';

export type APIParams = Record<string, string | number | null | undefined>;

export interface CosmosParams {
  block_height?: string|number;
}

export interface Pagination {
  next_key: string | null;
  total: number;
}

export const OrderBy = OrderBy_pb;
export type OrderBy = OrderBy_pb;

export interface PaginationOptions {
  'pagination.limit': string;
  'pagination.offset': string;
  'pagination.key': string;
  'pagination.count_total': 'true' | 'false';
  'pagination.reverse': 'true' | 'false';
  order_by: keyof typeof OrderBy;
}

export class ApiResponseError extends Error {
  data: any;
  constructor(message?: string, data?: any) {
    super(message);
    this.data = data;
  }
}

export class APIRequester {
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

  private computeEndpoint(endpoint: string) {
    return this.computeEndpointFrom(this.baseURL, endpoint);
  }

  private computeEndpointFrom(base: string, endpoint: string) {
    const url = new URL(base);

    if (url.pathname === '/') {
      url.pathname = endpoint;
    } else {
      url.pathname += endpoint;
    }

    return url.toString();
  }

  private buildConfig(
    params: URLSearchParams | APIParams | CosmosParams
  ): { params: URLSearchParams | APIParams; headers?: Record<string, string> } {
    if (
      params instanceof URLSearchParams ||
      (params as CosmosParams).block_height == null
    ) {
      return { params: params as URLSearchParams | APIParams };
    }
    const { block_height, ...rest } = params as CosmosParams &
      Record<string, any>;
    return {
      params: rest,
      headers: { 'x-cosmos-block-height': String(block_height) },
    };
  }

  public async getRaw(
    endpoint: string,
    params: URLSearchParams | APIParams | CosmosParams = {}
  ): Promise<any> {
    const url = this.computeEndpoint(endpoint);
    const config = this.buildConfig(params);
    return this.axios.get(
      url, config,
    ).then(d => {
      d.data.http_status = d.status;
      return d.data;
    }).catch(error => {
      if (error.response?.data) {
        error.response.data.http_status = error.response.status;
        return error.response.data;
      }
      throw error;
    });
  }

  public async get<T>(
    endpoint: string,
    params: URLSearchParams | APIParams | CosmosParams = {}
  ): Promise<T> {
    const url = this.computeEndpoint(endpoint);
    const config = this.buildConfig(params);
    return this.axios.get(url, config).then(d => d.data);
  }

  public async postRaw(endpoint: string, data?: any): Promise<any> {
    const url = this.computeEndpoint(endpoint);
    return this.axios.post(
      url, data,
    ).then(d => {
      d.data.http_status = d.status;
      return d.data;
    }).catch(error => {
      if (error.response?.data) {
        error.response.data.http_status = error.response.status;
        return error.response.data;
      }
      throw error;
    });
  }

  public async post<T>(endpoint: string, data?: any): Promise<T> {
    const url = this.computeEndpoint(endpoint);
    return this.axios.post(url, data).then(d => d.data);
  }

  public async getFcd<T>(
    endpoint: string,
    params: URLSearchParams | APIParams = {},
    fcdURL?: string
  ): Promise<T> {
    const url = this.computeEndpointFrom(
      fcdURL ?? this.baseURL.replace('lcd', 'fcd'),
      endpoint
    );
    return this.axios.get(url, { params }).then(d => d.data).catch(error => {
      if (error.response?.data) {
        error.response.data.http_status = error.response.status;
        return error.response.data;
      }
      throw error;
    });
  }
}
