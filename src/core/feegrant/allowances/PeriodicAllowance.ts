import { Duration } from '../../Duration';
import { Timestamp } from '../../Timestamp';

import { JSONSerializable } from '../../../util/json';
import { Coins } from '../../Coins';
import { BasicAllowance } from './BasicAllowance';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { PeriodicAllowance as PeriodicAllowance_pb } from '@xpla/xpla.proto/cosmos/feegrant/v1beta1/feegrant';

/**
 * PeriodicAllowance extends Allowance to allow for both a maximum cap,
 * as well as a limit per time period.
 */
export class PeriodicAllowance extends JSONSerializable<
  PeriodicAllowance.Amino,
  PeriodicAllowance.Data,
  PeriodicAllowance.Proto
> {
  public period: Duration;
  public period_reset: Timestamp | undefined;

  public period_spend_limit: Coins;
  public period_can_spend: Coins;

  /**
   * @param basic basic allowance given per period
   * @param period duration (numeric inputs are seconds); the time duration in which period_spend_limit coins can be spent before that allowance is reset
   * @param period_spend_limit the maximum number of coins that can be spent in the period
   * @param period_can_spend the number of coins left to be spent before the period_reset time
   * @param period_reset the time at which this period resets and a new one begins
   */
  constructor(
    public basic: BasicAllowance,
    period: Duration | number,
    period_spend_limit: Coins.Input,
    period_can_spend: Coins.Input,
    period_reset: Timestamp.Input | undefined
  ) {
    super();
    this.period =
      period instanceof Duration ? period : Duration.fromString(`${period}s`);
    this.period_reset = Timestamp.from(period_reset);

    this.period_spend_limit = new Coins(period_spend_limit);
    this.period_can_spend = new Coins(period_can_spend);
  }

  public static fromAmino(
    data: PeriodicAllowance.Amino,
    isClassic?: boolean
  ): PeriodicAllowance {
    const {
      value: {
        basic,
        period,
        period_spend_limit,
        period_can_spend,
        period_reset,
      },
    } = data;

    return new PeriodicAllowance(
      BasicAllowance.fromAmino(
        { type: 'cosmos-sdk/BasicAllowance', value: basic },
        isClassic
      ),
      Duration.fromAmino(period),
      Coins.fromAmino(period_spend_limit),
      Coins.fromAmino(period_can_spend),
      Timestamp.fromData(period_reset)
    );
  }

  public toAmino(isClassic?: boolean): PeriodicAllowance.Amino {
    const {
      basic,
      period,
      period_spend_limit,
      period_can_spend,
      period_reset,
    } = this;
    return {
      type: isClassic
        ? 'feegrant/PeriodicAllowance'
        : 'cosmos-sdk/PeriodicAllowance',
      value: {
        basic: basic.toAmino(isClassic).value,
        period: period.toAmino(),
        period_spend_limit: period_spend_limit.toAmino(),
        period_can_spend: period_can_spend.toAmino(),
        period_reset: period_reset?.toAmino(),
      },
    };
  }

  public static fromData(
    proto: PeriodicAllowance.Data,
    _isClassic?: boolean
  ): PeriodicAllowance {
    const {
      basic,
      period,
      period_spend_limit,
      period_can_spend,
      period_reset,
    } = proto;
    return new PeriodicAllowance(
      BasicAllowance.fromData({
        '@type': '/cosmos.feegrant.v1beta1.BasicAllowance',
        ...basic,
      }),
      Duration.fromString(period),
      Coins.fromData(period_spend_limit),
      Coins.fromData(period_can_spend),
      Timestamp.fromData(period_reset)
    );
  }

  public toData(_isClassic?: boolean): PeriodicAllowance.Data {
    const {
      basic,
      period,
      period_spend_limit,
      period_can_spend,
      period_reset,
    } = this;
    return {
      '@type': '/cosmos.feegrant.v1beta1.PeriodicAllowance',
      basic: {
        spend_limit: basic.toData().spend_limit,
        expiration: basic.toData().expiration,
      },
      period: period.toString(),
      period_spend_limit: period_spend_limit.toData(),
      period_can_spend: period_can_spend.toData(),
      period_reset: period_reset?.toData(),
    };
  }

  public static fromProto(
    proto: PeriodicAllowance.Proto,
    _isClassic?: boolean
  ): PeriodicAllowance {
    return new PeriodicAllowance(
      BasicAllowance.fromProto(proto.basic as BasicAllowance.Proto),
      proto.period ? Duration.fromProto(proto.period) : new Duration(0),
      Coins.fromProto(proto.periodSpendLimit),
      Coins.fromProto(proto.periodCanSpend),
      Timestamp.fromProto(proto.periodReset)
    );
  }

  public toProto(_isClassic?: boolean): PeriodicAllowance.Proto {
    const {
      basic,
      period,
      period_spend_limit,
      period_can_spend,
      period_reset,
    } = this;

    return PeriodicAllowance_pb.fromPartial({
      basic: basic.toProto(),
      period: period.toProto(),
      periodCanSpend: period_can_spend.toProto(),
      periodReset: period_reset?.toProto(),
      periodSpendLimit: period_spend_limit.toProto(),
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.feegrant.v1beta1.PeriodicAllowance',
      value: PeriodicAllowance_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(msgAny: Any, isClassic?: boolean): PeriodicAllowance {
    return PeriodicAllowance.fromProto(
      PeriodicAllowance_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace PeriodicAllowance {
  export interface Amino {
    type: 'feegrant/PeriodicAllowance' | 'cosmos-sdk/PeriodicAllowance';
    value: {
      basic: BasicAllowance.Amino['value'];
      period: string;
      period_spend_limit: Coins.Amino;
      period_can_spend: Coins.Amino;
      period_reset: string | undefined;
    };
  }

  export interface Data {
    '@type': '/cosmos.feegrant.v1beta1.PeriodicAllowance';
    basic: Omit<BasicAllowance.Data, '@type'>;
    period: string;
    period_spend_limit: Coins.Data;
    period_can_spend: Coins.Data;
    period_reset: string | undefined;
  }

  export type Proto = PeriodicAllowance_pb;
}
