import Decimal from 'decimal.js';
import { JSONSerializable } from '../util/json';
import { Int, Numeric } from './numeric';
import { Timestamp as Timestamp_pb } from '@xpla/xpla.proto/google/protobuf/timestamp';

/** A UTC point in time with nanosecond precision. */
export class Timestamp extends JSONSerializable<
  Timestamp.Amino,
  Timestamp.Data,
  Timestamp.Proto
> {
  private _seconds: Int;
  private _nanos: number;

  /**
   * @param seconds Whole UTC seconds since Unix epoch, within years 0001–9999.
   * @param nanos Non-negative fractional nanoseconds, from 0 to 999,999,999.
   */
  constructor(seconds: Numeric.Input, nanos = 0) {
    super();
    this._seconds = Timestamp.checkedSeconds(seconds);
    this._nanos = Timestamp.checkedNanos(nanos);
  }

  private static checkedSeconds(value: Numeric.Input): Int {
    // Validate before Int can truncate a fractional input.
    const seconds = new Decimal(value);
    if (
      !seconds.isFinite() ||
      !seconds.isInteger() ||
      seconds.lessThan(-62135596800) ||
      seconds.greaterThan(253402300799)
    ) {
      throw new RangeError(
        'Timestamp.seconds must be whole seconds within years 0001–9999'
      );
    }
    return new Int(seconds);
  }

  private static checkedNanos(nanos: number): number {
    if (!Number.isInteger(nanos) || nanos < 0 || nanos > 999999999) {
      throw new RangeError(
        'Timestamp.nanos must be an integer between 0 and 999999999'
      );
    }
    return nanos;
  }

  public get seconds(): Numeric.Output {
    return this._seconds;
  }

  public set seconds(seconds: Numeric.Input) {
    this._seconds = Timestamp.checkedSeconds(seconds);
  }

  public get nanos(): number {
    return this._nanos;
  }

  public set nanos(nanos: number) {
    this._nanos = Timestamp.checkedNanos(nanos);
  }

  /** Normalize constructor inputs; Date inputs have only millisecond precision. */
  public static from(value: Timestamp.Input): Timestamp;
  public static from(value: Timestamp.Input | undefined): Timestamp | undefined;
  public static from(
    value: Timestamp.Input | undefined
  ): Timestamp | undefined {
    if (value === undefined) return undefined;
    if (value instanceof Timestamp) return value;
    if (value instanceof Date) return Timestamp.fromDate(value);
    throw new TypeError('Expected a Timestamp or Date');
  }

  public static fromAmino(data: Timestamp.Amino): Timestamp;
  public static fromAmino(
    data: Timestamp.Amino | undefined
  ): Timestamp | undefined;
  public static fromAmino(
    data: Timestamp.Amino | undefined
  ): Timestamp | undefined {
    return data === undefined ? undefined : Timestamp.fromString(data);
  }

  /** Cosmos Amino uses Go's RFC3339Nano formatting (no trailing fractional zeros). */
  public toAmino(): Timestamp.Amino {
    return this.toString().replace(/(\.\d*?[1-9])0+Z$/, '$1Z');
  }

  public static fromData(data: Timestamp.Data): Timestamp;
  public static fromData(
    data: Timestamp.Data | undefined
  ): Timestamp | undefined;
  public static fromData(
    data: Timestamp.Data | undefined
  ): Timestamp | undefined {
    if (data === undefined) return undefined;
    return typeof data === 'string'
      ? Timestamp.fromString(data)
      : new Timestamp(data.seconds, data.nanos);
  }

  /** Protobuf JSON remains an RFC3339 string, with all nanoseconds preserved. */
  public toData(): string {
    return this.toString();
  }

  public static fromProto(proto: Timestamp.Proto): Timestamp;
  public static fromProto(
    proto: Timestamp.Proto | undefined
  ): Timestamp | undefined;
  public static fromProto(
    proto: Timestamp.Proto | undefined
  ): Timestamp | undefined {
    return proto === undefined
      ? undefined
      : new Timestamp(proto.seconds.toString(), proto.nanos);
  }

  public toProto(): Timestamp.Proto {
    return Timestamp_pb.fromPartial({
      seconds: this._seconds.toFixed(),
      nanos: this._nanos,
    });
  }

  public static fromDate(date: Date): Timestamp {
    const millis = date.getTime();
    const seconds = Math.floor(millis / 1000);
    return new Timestamp(seconds, (millis - seconds * 1000) * 1000000);
  }

  /** Convert for display/Date APIs, explicitly discarding sub-millisecond precision. */
  public toDate(): Date {
    return new Date(
      this._seconds.toNumber() * 1000 + Math.floor(this._nanos / 1000000)
    );
  }

  public static fromString(str: string): Timestamp {
    const match =
      /^(\d{4})-(\d{2})-(\d{2})[Tt](\d{2}):(\d{2}):(\d{2})(?:\.(\d{1,9}))?([Zz]|[+-]\d{2}:\d{2})$/.exec(
        str
      );
    if (!match) throw new RangeError('Invalid RFC3339 Timestamp');
    const [, y, mo, d, h, mi, sec, fraction = '', zone] = match;
    const [year, month, day, hour, minute, second] = [y, mo, d, h, mi, sec].map(
      Number
    );
    if (
      year < 1 ||
      month < 1 ||
      month > 12 ||
      day < 1 ||
      day > 31 ||
      hour > 23 ||
      minute > 59 ||
      second > 59
    ) {
      throw new RangeError('Invalid RFC3339 Timestamp');
    }
    // Date is used only for whole seconds; the fractional digits stay separate.
    // setUTCFullYear avoids Date.UTC's special treatment of years 00 through 99.
    const date = new Date(0);
    date.setUTCFullYear(year, month - 1, day);
    date.setUTCHours(hour, minute, second, 0);
    if (
      date.getUTCFullYear() !== year ||
      date.getUTCMonth() !== month - 1 ||
      date.getUTCDate() !== day
    ) {
      throw new RangeError('Invalid RFC3339 calendar date');
    }
    let offset = 0;
    if (zone !== 'Z' && zone !== 'z') {
      const hours = Number(zone.slice(1, 3));
      const minutes = Number(zone.slice(4, 6));
      if (hours > 23 || minutes > 59)
        throw new RangeError('Invalid RFC3339 UTC offset');
      offset = (hours * 60 + minutes) * 60 * (zone[0] === '+' ? 1 : -1);
    }
    return new Timestamp(
      date.getTime() / 1000 - offset,
      Number(fraction.padEnd(9, '0'))
    );
  }

  public toString(): string {
    const head = new Date(this._seconds.toNumber() * 1000)
      .toISOString()
      .slice(0, -5);
    if (this._nanos === 0) return `${head}Z`;
    const digits =
      this._nanos % 1000000 === 0 ? 3 : this._nanos % 1000 === 0 ? 6 : 9;
    return `${head}.${String(this._nanos).padStart(9, '0').slice(0, digits)}Z`;
  }

  /** RFC3339 alias; unlike Date.toISOString(), this preserves nanoseconds. */
  public toISOString(): string {
    return this.toString();
  }
}

export namespace Timestamp {
  export type Input = Timestamp | Date;
  export type Amino = string;
  export type Data = string | { seconds: string; nanos: number };
  export type Proto = Timestamp_pb;
}
