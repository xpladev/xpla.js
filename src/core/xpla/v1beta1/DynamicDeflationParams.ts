import { JSONSerializable } from '../../../util/json';
import { Params as ProtoCodec } from '@xpla/xpla.proto/xpla/dynamicdeflation/v1beta1/dynamic_deflation';
import { Coin } from '../../Coin';
import { Dec, Int, Numeric } from '../../numeric';
import { parseInt64 } from '../../../util/int64';

export class DynamicDeflationParamsV1B1 extends JSONSerializable<
  DynamicDeflationParamsV1B1.Amino,
  DynamicDeflationParamsV1B1.Data,
  DynamicDeflationParamsV1B1.Proto
> {
  public allocation_rate: Dec;
  public settlement_interval_blocks: Int;
  constructor(
    public enabled: boolean,
    allocation_rate: Numeric.Input,
    settlement_interval_blocks: Numeric.Input,
    public min_fee_amount: Coin | undefined,
    public max_fee_amount: Coin | undefined
  ) {
    super();
    this.allocation_rate = new Dec(allocation_rate);
    this.settlement_interval_blocks = parseInt64(settlement_interval_blocks);
    if (this.settlement_interval_blocks.lt(0))
      throw new RangeError('settlement_interval_blocks must be unsigned');
  }
  public static fromData(
    data: DynamicDeflationParamsV1B1.Data
  ): DynamicDeflationParamsV1B1 {
    return new DynamicDeflationParamsV1B1(
      data.enabled,
      data.allocation_rate,
      data.settlement_interval_blocks,
      data.min_fee_amount ? Coin.fromData(data.min_fee_amount) : undefined,
      data.max_fee_amount ? Coin.fromData(data.max_fee_amount) : undefined
    );
  }
  public toData(): DynamicDeflationParamsV1B1.Data {
    return {
      enabled: this.enabled,
      allocation_rate: this.allocation_rate.toFixed(18),
      settlement_interval_blocks: this.settlement_interval_blocks.toFixed(),
      min_fee_amount: this.min_fee_amount?.toData(),
      max_fee_amount: this.max_fee_amount?.toData(),
    };
  }
  public static fromAmino(
    data: DynamicDeflationParamsV1B1.Amino
  ): DynamicDeflationParamsV1B1 {
    return this.fromData(data);
  }
  public toAmino(): DynamicDeflationParamsV1B1.Amino {
    return this.toData();
  }
  public static fromProto(proto: ProtoCodec): DynamicDeflationParamsV1B1 {
    return new DynamicDeflationParamsV1B1(
      proto.enabled,
      new Dec(proto.allocationRate).div('1000000000000000000'),
      proto.settlementIntervalBlocks,
      proto.minFeeAmount ? Coin.fromProto(proto.minFeeAmount) : undefined,
      proto.maxFeeAmount ? Coin.fromProto(proto.maxFeeAmount) : undefined
    );
  }
  public toProto(): ProtoCodec {
    return ProtoCodec.fromPartial({
      enabled: this.enabled,
      allocationRate: this.allocation_rate
        .mul('1000000000000000000')
        .toFixed(0),
      settlementIntervalBlocks: this.settlement_interval_blocks.toFixed(),
      minFeeAmount: this.min_fee_amount?.toProto(),
      maxFeeAmount: this.max_fee_amount?.toProto(),
    });
  }
}
export namespace DynamicDeflationParamsV1B1 {
  export interface Data {
    enabled: boolean;
    allocation_rate: string;
    settlement_interval_blocks: string;
    min_fee_amount: Coin.Data | undefined;
    max_fee_amount: Coin.Data | undefined;
  }
  export type Amino = Data;
  export type Proto = ProtoCodec;
}
