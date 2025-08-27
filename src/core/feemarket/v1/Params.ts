/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../util/json';
import { Int, Dec, Numeric } from '../../numeric';
import {
  Params as FeemarketParamsV1_pb,
} from '@xpla/xpla.proto/cosmos/evm/feemarket/v1/feemarket';

export class FeemarketParamsV1 extends JSONSerializable<
  FeemarketParamsV1.Amino,
  FeemarketParamsV1.Data,
  FeemarketParamsV1.Proto
> {
  public enable_height: Int;
  public base_fee: Int;
  public min_gas_price: Dec;
  public min_gas_multiplier: Dec;

  /**
   * @param no_base_fee forces the EIP-1559 base fee to 0 (needed for 0 price calls)
   * @param base_fee_change_denominator bounds the amount the base fee can change between blocks.
   * @param elasticity_multiplier bounds the maximum gas limit an EIP-1559 block may have.
   * @param enable_height defines at which block height the base fee calculation is enabled.
   * @param base_fee for EIP-1559 blocks.
   * @param min_gas_price defines the minimum gas price value for cosmos and eth transactions
   * @param min_gas_multiplier bounds the minimum gas used to be charged to senders based on gas limit
   */
  constructor(
    public no_base_fee: boolean,
    public base_fee_change_denominator: number,
    public elasticity_multiplier: number,
    enable_height: Numeric.Input,
    base_fee: Numeric.Input,
    min_gas_price: Numeric.Input,
    min_gas_multiplier: Numeric.Input,
  ) {
    super();
    this.enable_height = new Int(enable_height);
    this.base_fee = new Int(base_fee);
    this.min_gas_price = new Dec(min_gas_price);
    this.min_gas_multiplier = new Dec(min_gas_multiplier);
  }

  public static fromAmino(data: FeemarketParamsV1.Amino, _?: boolean): FeemarketParamsV1 {
    const {
      no_base_fee,
      base_fee_change_denominator,
      elasticity_multiplier,
      enable_height,
      base_fee,
      min_gas_price,
      min_gas_multiplier,
    } = data;
    return new FeemarketParamsV1(
      no_base_fee ?? false,
      base_fee_change_denominator ?? 1,
      elasticity_multiplier ?? 1,
      enable_height ?? 0,
      base_fee ?? 0,
      min_gas_price ?? 0,
      min_gas_multiplier ?? 0.0,
    );
  }

  public toAmino(_?: boolean): FeemarketParamsV1.Amino {
    const {
      no_base_fee,
      base_fee_change_denominator,
      elasticity_multiplier,
      enable_height,
      base_fee,
      min_gas_price,
      min_gas_multiplier,
    } = this;

    const res: FeemarketParamsV1.Amino = {
      no_base_fee,
      base_fee_change_denominator,
      elasticity_multiplier,
      enable_height: enable_height.toFixed(0),
      base_fee: base_fee.toFixed(0),
      min_gas_price: min_gas_price.toFixed(18),
      min_gas_multiplier: min_gas_multiplier.toFixed(18),
    };

    return res;
  }

  public static fromData(data: FeemarketParamsV1.Data, _?: boolean): FeemarketParamsV1 {
    const {
      no_base_fee,
      base_fee_change_denominator,
      elasticity_multiplier,
      enable_height,
      base_fee,
      min_gas_price,
      min_gas_multiplier,
    } = data;
    return new FeemarketParamsV1(
      no_base_fee,
      base_fee_change_denominator,
      elasticity_multiplier,
      enable_height,
      base_fee,
      min_gas_price,
      min_gas_multiplier,
    );
  }

  public toData(_?: boolean): FeemarketParamsV1.Data {
    const {
      no_base_fee,
      base_fee_change_denominator,
      elasticity_multiplier,
      enable_height,
      base_fee,
      min_gas_price,
      min_gas_multiplier,
    } = this;

    const res: FeemarketParamsV1.Data = {
      '@type': '/cosmos.evm.feemarket.v1.Params',
      no_base_fee,
      base_fee_change_denominator,
      elasticity_multiplier,
      enable_height: enable_height.toFixed(0),
      base_fee: base_fee.toFixed(0),
      min_gas_price: min_gas_price.toFixed(18),
      min_gas_multiplier: min_gas_multiplier.toFixed(18),
    };

    return res;
  }

  public static fromProto(proto: FeemarketParamsV1.Proto, _?: boolean): FeemarketParamsV1 {
    const dec18 = new Dec(10).pow(18);
    return new FeemarketParamsV1(
      proto.noBaseFee,
      proto.baseFeeChangeDenominator,
      proto.elasticityMultiplier,
      proto.enableHeight.toString(),
      proto.baseFee,
      new Dec(proto.minGasPrice).div(dec18), // for cosmos-sdk/types.Dec type
      new Dec(proto.minGasMultiplier).div(dec18), // for cosmos-sdk/types.Dec type
    );
  }

  public toProto(_?: boolean): FeemarketParamsV1.Proto {
    const {
      no_base_fee,
      base_fee_change_denominator,
      elasticity_multiplier,
      enable_height,
      base_fee,
      min_gas_price,
      min_gas_multiplier,
    } = this;
    const dec18 = new Dec(10).pow(18);
    return FeemarketParamsV1_pb.fromPartial({
      noBaseFee: no_base_fee,
      baseFeeChangeDenominator: base_fee_change_denominator,
      elasticityMultiplier: elasticity_multiplier,
      enableHeight: enable_height.toFixed(0),
      baseFee: base_fee.toFixed(0),
      minGasPrice: min_gas_price.mul(dec18).toFixed(0), // for cosmos-sdk/types.Dec type
      minGasMultiplier: min_gas_multiplier.mul(dec18).toFixed(0), // for cosmos-sdk/types.Dec type
    });
  }
}

export namespace FeemarketParamsV1 {
  export interface Amino {
    no_base_fee: boolean | undefined;
    base_fee_change_denominator: number | undefined;
    elasticity_multiplier: number | undefined;
    enable_height: string | undefined;
    base_fee: string | undefined;
    min_gas_price: string | undefined;
    min_gas_multiplier: string | undefined;
  }

  export interface Data {
    '@type':
      | '/ethermint.feemarket.v1.Params'
      | '/cosmos.evm.feemarket.v1.Params';
    no_base_fee: boolean;
    base_fee_change_denominator: number;
    elasticity_multiplier: number;
    enable_height: string;
    base_fee: string;
    min_gas_price: string;
    min_gas_multiplier: string;
  }

  export type Proto = FeemarketParamsV1_pb;
}
