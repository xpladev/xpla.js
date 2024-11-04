/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../util/json';
import { Dec, Denom, Duration, Numeric } from '../../../core';
import { Params as StakingParamsV1B1_pb } from '@xpla/xpla.proto/cosmos/staking/v1beta1/staking';

export class StakingParamsV1B1 extends JSONSerializable<
  StakingParamsV1B1.Amino,
  StakingParamsV1B1.Data,
  StakingParamsV1B1.Proto
> {
  public min_commission_rate: Dec;

  /**
   * @param unbonding_time is the time duration of unbonding
   * @param max_validators is the maximum number of validators
   * @param max_entries is the max entries for either unbonding delegation or redelegation (per pair/trio)
   * @param historical_entries is the number of historical entries to persist
   * @param bond_denom defines the bondable coin denomination
   * @param min_commission_rate is the chain-wide minimum commission rate that a validator can charge their delegators
   */
  constructor(
    public unbonding_time: Duration | undefined,
    public max_validators: number,
    public max_entries: number,
    public historical_entries: number,
    public bond_denom: Denom,
    min_commission_rate: Numeric.Input,
  ) {
    super();
    this.min_commission_rate = new Dec(min_commission_rate);
  }

  public static fromAmino(
    data: StakingParamsV1B1.Amino,
    _?: boolean
  ): StakingParamsV1B1 {
    const {
      unbonding_time,
      max_validators,
      max_entries,
      historical_entries,
      bond_denom,
      min_commission_rate,
    } = data;
    return new StakingParamsV1B1(
      unbonding_time ? Duration.fromAmino(unbonding_time) : undefined,
      max_validators ?? 0,
      max_entries ?? 0,
      historical_entries ?? 0,
      bond_denom ?? '',
      min_commission_rate ?? ''
    );
  }

  public toAmino(_?: boolean): StakingParamsV1B1.Amino {
    const {
      unbonding_time,
      max_validators,
      max_entries,
      historical_entries,
      bond_denom,
      min_commission_rate,
    } = this;

    const res: StakingParamsV1B1.Amino = {
      unbonding_time: unbonding_time ? unbonding_time.toAmino() : undefined,
      max_validators,
      max_entries,
      historical_entries,
      bond_denom,
      min_commission_rate: min_commission_rate.toFixed(),
    };

    return res;
  }

  public static fromData(
    data: StakingParamsV1B1.Data,
    _?: boolean
  ): StakingParamsV1B1 {
    const {
      unbonding_time,
      max_validators,
      max_entries,
      historical_entries,
      bond_denom,
      min_commission_rate,
    } = data;
    return new StakingParamsV1B1(
      unbonding_time ? Duration.fromData(unbonding_time) : undefined,
      max_validators,
      max_entries,
      historical_entries,
      bond_denom,
      min_commission_rate
    );
  }

  public toData(_?: boolean): StakingParamsV1B1.Data {
    const {
      unbonding_time,
      max_validators,
      max_entries,
      historical_entries,
      bond_denom,
      min_commission_rate,
    } = this;

    const res: StakingParamsV1B1.Data = {
      '@type': '/cosmos.staking.v1beta1.Params',
      unbonding_time: unbonding_time ? unbonding_time.toData() : undefined,
      max_validators,
      max_entries,
      historical_entries,
      bond_denom,
      min_commission_rate: min_commission_rate.toFixed(),
    };

    return res;
  }

  public static fromProto(
    proto: StakingParamsV1B1.Proto,
    _?: boolean
  ): StakingParamsV1B1 {
    const dec18 = new Dec(10).pow(18);
    return new StakingParamsV1B1(
      proto.unbondingTime ? Duration.fromProto(proto.unbondingTime) : undefined,
      proto.maxValidators,
      proto.maxEntries,
      proto.historicalEntries,
      proto.bondDenom,
      new Dec(proto.minCommissionRate).div(dec18),
    );
  }

  public toProto(_?: boolean): StakingParamsV1B1.Proto {
    const {
      unbonding_time,
      max_validators,
      max_entries,
      historical_entries,
      bond_denom,
      min_commission_rate,
    } = this;
    const dec18 = new Dec(10).pow(18);
    return StakingParamsV1B1_pb.fromPartial({
      unbondingTime: unbonding_time ? unbonding_time.toProto() : undefined,
      maxValidators: max_validators,
      maxEntries: max_entries,
      historicalEntries: historical_entries,
      bondDenom: bond_denom,
      minCommissionRate: min_commission_rate.mul(dec18).toFixed(0),
    });
  }
}

export namespace StakingParamsV1B1 {
  export interface Amino {
    unbonding_time: string | undefined;
    max_validators: number | undefined;
    max_entries: number | undefined;
    historical_entries: number | undefined;
    bond_denom: string | undefined;
    min_commission_rate: string | undefined;
  }

  export interface Data {
    '@type': '/cosmos.staking.v1beta1.Params';
    unbonding_time: object | undefined;
    max_validators: number;
    max_entries: number;
    historical_entries: number;
    bond_denom: string;
    min_commission_rate: string;
  }

  export type Proto = StakingParamsV1B1_pb;
}
