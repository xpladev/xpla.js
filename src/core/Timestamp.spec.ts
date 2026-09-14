import { Timestamp } from './Timestamp';
import { Dec } from './numeric';

describe('Timestamp', () => {
  it('preserves nanoseconds in RFC3339 round trip', () => {
    const input = '2024-01-01T00:00:00.123456789Z';
    const ts = Timestamp.fromString(input);

    expect(ts.seconds.toFixed()).toEqual('1704067200');
    expect(ts.nanos).toEqual(123456789);
    expect(ts.toString()).toEqual(input);
    expect(ts.toAmino()).toEqual(input);
  });

  it('round-trips proto Timestamp with full nanos', () => {
    const ts = Timestamp.fromString('2024-01-01T00:00:00.123456789Z');
    const proto = ts.toProto();

    expect(proto.nanos).toEqual(123456789);
    expect(Timestamp.fromProto(proto).toString()).toEqual(
      '2024-01-01T00:00:00.123456789Z'
    );
  });

  it('omits fractional seconds when nanos is zero', () => {
    expect(Timestamp.fromString('2024-01-01T00:00:00Z').toString()).toEqual(
      '2024-01-01T00:00:00Z'
    );
  });

  it.each([
    [
      '2024-01-01T00:00:00.1Z',
      '2024-01-01T00:00:00.100Z',
      '2024-01-01T00:00:00.1Z',
    ],
    [
      '2024-01-01T00:00:00.1234Z',
      '2024-01-01T00:00:00.123400Z',
      '2024-01-01T00:00:00.1234Z',
    ],
    [
      '2024-01-01T09:00:00.000000001+09:00',
      '2024-01-01T00:00:00.000000001Z',
      '2024-01-01T00:00:00.000000001Z',
    ],
    ['0001-01-01T00:00:00Z', '0001-01-01T00:00:00Z', '0001-01-01T00:00:00Z'],
    [
      '9999-12-31T23:59:59.999999999Z',
      '9999-12-31T23:59:59.999999999Z',
      '9999-12-31T23:59:59.999999999Z',
    ],
    [
      '1969-12-31T23:59:59.999999999Z',
      '1969-12-31T23:59:59.999999999Z',
      '1969-12-31T23:59:59.999999999Z',
    ],
  ])(
    'uses lossless Protobuf JSON and Amino formats for %s',
    (input, json, amino) => {
      const time = Timestamp.fromString(input);
      expect(time.toData()).toBe(json);
      expect(time.toISOString()).toBe(json);
      expect(time.toJSON()).toBe(JSON.stringify(json));
      expect(time.toAmino()).toBe(amino);
      expect(Timestamp.fromAmino(amino).toProto()).toEqual(time.toProto());
      expect(Timestamp.fromData(json).toProto()).toEqual(time.toProto());
    }
  );

  it('accepts the original seconds/nanos Data input', () => {
    expect(
      Timestamp.fromData({ seconds: '1704067200', nanos: 123456789 }).toData()
    ).toBe('2024-01-01T00:00:00.123456789Z');
  });

  it('normalizes Date inputs before the epoch and makes precision loss explicit', () => {
    const date = new Date(-1);
    const time = Timestamp.from(date);
    expect(time.seconds.toFixed()).toBe('-1');
    expect(time.nanos).toBe(999000000);
    expect(time.toDate()).toEqual(date);
    const nanos = Timestamp.fromString('1969-12-31T23:59:59.999999999Z');
    expect(nanos.toDate().getTime()).toBe(-1);
    expect(Timestamp.from(nanos)).toBe(nanos);
  });

  it('preserves omitted timestamps', () => {
    expect(Timestamp.from(undefined)).toBeUndefined();
    expect(Timestamp.fromData(undefined)).toBeUndefined();
    expect(Timestamp.fromAmino(undefined)).toBeUndefined();
    expect(Timestamp.fromProto(undefined)).toBeUndefined();
  });

  it.each([
    NaN,
    Infinity,
    -Infinity,
    0.5,
    '1.5',
    '-62135596801',
    '253402300800',
    new Dec('0.1'),
  ])('rejects invalid seconds %s before integer conversion', seconds => {
    expect(() => new Timestamp(seconds)).toThrow();
    const time = new Timestamp(0);
    expect(() => {
      time.seconds = seconds;
    }).toThrow();
    expect(time.seconds.toFixed()).toBe('0');
  });

  it.each([NaN, Infinity, -1, 1000000000, 0.5])(
    'rejects invalid nanos %s',
    nanos => {
      expect(() => new Timestamp(0, nanos)).toThrow();
      const time = new Timestamp(0);
      expect(() => {
        time.nanos = nanos;
      }).toThrow();
      expect(time.nanos).toBe(0);
    }
  );

  it.each([
    '2023-02-29T00:00:00Z',
    '2024-01-01T24:00:00Z',
    '2024-01-01T00:00:00.1234567890Z',
  ])('rejects invalid RFC3339 input %s', value => {
    expect(() => Timestamp.fromString(value)).toThrow();
  });

  it('rejects an invalid Date', () => {
    expect(() => Timestamp.fromDate(new Date(NaN))).toThrow();
  });
});
