import { Numeric } from '../../../core/numeric';
import { EvmAddress } from '../../../core/eip55';

export type EvmTx = {
  chainId?: null | number;
  blockHash?: null | string;
  blockNumber?: null | Numeric.Output;
  from?: null | EvmAddress;
  gasLimit?: null | Numeric.Output;
  gasPrice?: null | Numeric.Output;
  hash?: null | string;
  input?: null | string;
  nonce?: null | Numeric.Output;
  to?: null | EvmAddress;
  transactionIndex?: null | Numeric.Output;
  value?: null | Numeric.Output;
  data?: null | Buffer;
  type?: null | number;
  v?: null | number;
  r?: null | Buffer;
  s?: null | Buffer;
  accessList?: null | string[];
};

export class EvmTxInfo {
  constructor(
    public blockHash: string,
    public blockNumber: number,
    public from: string,
    public to: string,
    public contractAddress: string | null,
    public cumulativeGasUsed: number,
    public effectiveGasPrice: number,
    public gasUsed: number,
    public transactionHash: string,
    public transactionIndex: number,
    public type: number,
    public logs: any[],
    public logsBloom: any,
    public root: string,
    public status: number
  ) {}

  public static fromData(data: any): EvmTxInfo {
    return new EvmTxInfo(
      data.blockHash,
      Numeric.parse(data.blockNumber ?? '0x0').toNumber(),
      data.from,
      data.to,
      data.contractAddress,
      Numeric.parse(data.cumulativeGasUsed ?? '0x0').toNumber(),
      Numeric.parse(data.effectiveGasPrice ?? '0x0').toNumber(),
      Numeric.parse(data.gasUsed ?? '0x0').toNumber(),
      data.transactionHash ?? '',
      Numeric.parse(data.transactionIndex ?? '0x0').toNumber(),
      Numeric.parse(data.type ?? '0x0').toNumber(),
      data.logs ?? [],
      data.logsBloom ?? '',
      data.root ?? '',
      Numeric.parse(data.status ?? '0x0').toNumber()
    );
  }
}

export abstract class EvmMessage {
  public abstract tx(): EvmTx;
}
