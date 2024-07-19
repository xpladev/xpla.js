/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../util/json';
import { Dec, Int, Numeric } from '../../../core/numeric';
import { Denom } from '../../../core';
import { Params as MintParamsV1B1_pb } from '@xpla/xpla.proto/cosmos/mint/v1beta1/mint';

export class MintParamsV1B1 extends JSONSerializable<
  MintParamsV1B1.Amino,
  MintParamsV1B1.Data,
  MintParamsV1B1.Proto
> {
  public inflation_rate_change: Dec;
  public inflation_max: Dec;
  public inflation_min: Dec;
  public goal_bonded: Dec;
  public blocks_per_year: Int;

  /**
   * @param mint_denom type of coin to mint
   * @param inflation_rate_change maximum annual change in inflation rate
   * @param inflation_max maximum inflation rate
   * @param inflation_min minimum inflation rate
   * @param goal_bonded goal of percent bonded atoms
   * @param blocks_per_year expected blocks per year
   */
  constructor(
    public mint_denom: Denom,
    inflation_rate_change: Numeric.Input,
    inflation_max: Numeric.Input,
    inflation_min: Numeric.Input,
    goal_bonded: Numeric.Input,
    blocks_per_year: Numeric.Input
  ) {
    super();
    this.inflation_rate_change = new Dec(inflation_rate_change);
    this.inflation_max = new Dec(inflation_max);
    this.inflation_min = new Dec(inflation_min);
    this.goal_bonded = new Dec(goal_bonded);
    this.blocks_per_year = new Int(blocks_per_year);
  }

  public static fromAmino(
    data: MintParamsV1B1.Amino,
    _?: boolean
  ): MintParamsV1B1 {
    const {
      mint_denom,
      inflation_rate_change,
      inflation_max,
      inflation_min,
      goal_bonded,
      blocks_per_year,
    } = data;
    return new MintParamsV1B1(
      mint_denom ?? '',
      inflation_rate_change ?? 0,
      inflation_max ?? 0,
      inflation_min ?? 0,
      goal_bonded ?? 0,
      blocks_per_year ?? 0
    );
  }

  public toAmino(_?: boolean): MintParamsV1B1.Amino {
    const {
      mint_denom,
      inflation_rate_change,
      inflation_max,
      inflation_min,
      goal_bonded,
      blocks_per_year,
    } = this;

    const res: MintParamsV1B1.Amino = {
      mint_denom,
      inflation_rate_change: inflation_rate_change.toFixed(),
      inflation_max: inflation_max.toFixed(),
      inflation_min: inflation_min.toFixed(),
      goal_bonded: goal_bonded.toFixed(),
      blocks_per_year: blocks_per_year.toFixed(),
    };

    return res;
  }

  public static fromData(
    data: MintParamsV1B1.Data,
    _?: boolean
  ): MintParamsV1B1 {
    const {
      mint_denom,
      inflation_rate_change,
      inflation_max,
      inflation_min,
      goal_bonded,
      blocks_per_year,
    } = data;
    return new MintParamsV1B1(
      mint_denom,
      inflation_rate_change,
      inflation_max,
      inflation_min,
      goal_bonded,
      blocks_per_year
    );
  }

  public toData(_?: boolean): MintParamsV1B1.Data {
    const {
      mint_denom,
      inflation_rate_change,
      inflation_max,
      inflation_min,
      goal_bonded,
      blocks_per_year,
    } = this;

    const res: MintParamsV1B1.Data = {
      '@type': '/cosmos.mint.v1beta1.Params',
      mint_denom,
      inflation_rate_change: inflation_rate_change.toFixed(),
      inflation_max: inflation_max.toFixed(),
      inflation_min: inflation_min.toFixed(),
      goal_bonded: goal_bonded.toFixed(),
      blocks_per_year: blocks_per_year.toFixed(),
    };

    return res;
  }

  public static fromProto(
    proto: MintParamsV1B1.Proto,
    _?: boolean
  ): MintParamsV1B1 {
    return new MintParamsV1B1(
      proto.mintDenom,
      proto.inflationRateChange,
      proto.inflationMax,
      proto.inflationMin,
      proto.goalBonded,
      proto.blocksPerYear.toString()
    );
  }

  public toProto(_?: boolean): MintParamsV1B1.Proto {
    const {
      mint_denom,
      inflation_rate_change,
      inflation_max,
      inflation_min,
      goal_bonded,
      blocks_per_year,
    } = this;
    return MintParamsV1B1_pb.fromPartial({
      mintDenom: mint_denom,
      inflationRateChange: inflation_rate_change.toString(),
      inflationMax: inflation_max.toString(),
      inflationMin: inflation_min.toString(),
      goalBonded: goal_bonded.toString(),
      blocksPerYear: blocks_per_year.toString(),
    });
  }
}

export namespace MintParamsV1B1 {
  export interface Amino {
    mint_denom: string | undefined;
    inflation_rate_change: string | undefined;
    inflation_max: string | undefined;
    inflation_min: string | undefined;
    goal_bonded: string | undefined;
    blocks_per_year: string | undefined;
  }

  export interface Data {
    '@type': '/cosmos.mint.v1beta1.Params';
    mint_denom: string;
    inflation_rate_change: string;
    inflation_max: string;
    inflation_min: string;
    goal_bonded: string;
    blocks_per_year: string;
  }

  export type Proto = MintParamsV1B1_pb;
}
