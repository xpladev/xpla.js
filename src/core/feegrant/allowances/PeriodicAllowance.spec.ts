import { Timestamp } from '../../Timestamp';
import { PeriodicAllowance } from './PeriodicAllowance';
import { BasicAllowance } from './BasicAllowance';
import { Duration } from '../../Duration';

const reset = '2026-01-01T00:00:00.123456789Z';
const coins = [{ denom: 'axpla', amount: '10' }];
const make = (period: number | Duration) =>
  new PeriodicAllowance(
    new BasicAllowance({ axpla: '100' }),
    period,
    { axpla: '10' },
    { axpla: '10' },
    Timestamp.fromString(reset)
  );

describe('PeriodicAllowance core serialization', () => {
  it('keeps numeric constructor periods in seconds', () => {
    expect(make(60).toProto().period?.seconds.toString()).toBe('60');
    expect(make(60).toAmino().value.period).toBe('60000000000');
    expect(make(60).toData().period).toBe('60s');
    expect(make(1.5).toProto().period?.nanos).toBe(500000000);
  });
  it('uses unwrapped BasicAllowance and nanoseconds in Amino', () => {
    const amino: PeriodicAllowance.Amino = {
      type: 'cosmos-sdk/PeriodicAllowance',
      value: {
        basic: { spend_limit: [{ denom: 'axpla', amount: '100' }] },
        period: '1500000001',
        period_spend_limit: coins,
        period_can_spend: coins,
        period_reset: reset,
      },
    };
    const allowance = PeriodicAllowance.fromAmino(amino);
    expect(allowance.toAmino()).toEqual(amino);
    expect(allowance.toProto().period?.seconds.toString()).toBe('1');
    expect(allowance.toProto().period?.nanos).toBe(500000001);
    expect(allowance.toAmino(true).value.basic).not.toHaveProperty('type');
  });
  it('reads canonical REST duration and typed nested basic', () => {
    const data: PeriodicAllowance.Data = {
      '@type': '/cosmos.feegrant.v1beta1.PeriodicAllowance',
      basic: { spend_limit: [{ denom: 'axpla', amount: '100' }] },
      period: '1.500000001s',
      period_spend_limit: coins,
      period_can_spend: coins,
      period_reset: reset,
    };
    const allowance = PeriodicAllowance.fromData(data);
    expect(allowance.toData()).toEqual(data);
    expect(allowance.toData().basic).not.toHaveProperty('@type');
    const decoded = PeriodicAllowance.unpackAny(allowance.packAny());
    expect(decoded.period.toAmino()).toBe('1500000001');
    expect(decoded.toData()).toEqual(data);
  });
  it('keeps protobuf nanoseconds', () => {
    const allowance = make(new Duration(60, 123456789));
    expect(PeriodicAllowance.fromProto(allowance.toProto()).period.nanos).toBe(
      123456789
    );
  });
});
