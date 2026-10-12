import { Duration } from './Duration';

describe('Duration unit parsing', () => {
  test.each([
    ['1m', '60', 0],
    ['10m', '600', 0],
    ['1h', '3600', 0],
    ['24h', '86400', 0],
    ['1d', '86400', 0],
    ['1.5d', '129600', 0],
    ['0.5m', '30', 0],
    ['1ns', '0', 1],
    ['1us', '0', 1000],
    ['1ms', '0', 1000000],
    ['1.123456789s', '1', 123456789],
    ['-1.5s', '-1', -500000000],
  ])('%s preserves seconds and nanos', (input, seconds, nanos) => {
    const duration = Duration.fromString(input as string);
    expect(duration.toProto().seconds.toString()).toBe(seconds);
    expect(duration.toProto().nanos).toBe(nanos);
  });
});
