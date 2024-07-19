import { JSONSerializable } from '../util/json';
import { Dec, Int, Numeric } from './numeric';
import { Duration as Duration_pb } from '@xpla/xpla.proto/google/protobuf/duration';

/**
 * A Duration represents a signed, fixed-length span of time represented
 * as a count of seconds and fractions of seconds at nanosecond
 * resolution.
 */
export class Duration extends JSONSerializable<
  Duration.Amino,
  Duration.Data,
  Duration.Proto
> {
  private _seconds: Int;
  private _nanos: number;

  /**
   * @param seconds Signed seconds of the span of time. Must be from -315,576,000,000 to +315,576,000,000 inclusive.
   * @param nanos Signed fractions of a second at nanosecond resolution of the span of time. Must be from -999,999,999 to +999,999,999 inclusive.
   */
  constructor(seconds: Numeric.Input, nanos = 0) {
    super();
    if (nanos < -999999999 || nanos > 999999999) {
      throw new Error(
        'Duration.nanos must be between -999999999 and 999999999'
      );
    }
    this._seconds = new Int(seconds);
    this._nanos = nanos;
  }

  public get seconds(): Numeric.Output {
    return this._seconds;
  }

  public set seconds(seconds: Numeric.Input) {
    this._seconds = new Int(seconds);
  }

  public get nanos(): number {
    return this._nanos;
  }

  public set nanos(nanos: number) {
    if (nanos < -999999999 || nanos > 999999999) {
      throw new Error(
        'Duration.nanos must be between -999999999 and 999999999'
      );
    }
    this._nanos = nanos;
  }

  public static fromAmino(data: Duration.Amino | object | string): Duration {
    if (typeof data === 'string') {
      let dec = new Dec(data);
      dec = dec.div(1000000000);
      return new Duration(
        dec.divToInt(1),
        dec.mod(1).mul(1000000000).divToInt(1).toNumber()
      );
    } else if (typeof data === 'object') {
      return Duration.fromData(data);
    }
    const { seconds, nanos } = data;
    return new Duration(seconds, nanos);
  }

  public toAmino(): Duration.Amino {
    let dec = new Dec(this._seconds);
    dec = dec.mul(1000000000);
    dec = dec.add(this._nanos);
    return dec.divToInt(1).toFixed();
  }

  public static fromData(data: Duration.Data | object | string): Duration {
    if (typeof data === 'string') {
      return Duration.fromString(data);
    } else if (typeof data === 'object') {
      const data_ = data as any;
      return new Duration(data_.seconds ?? '0', data_.nanos ?? 0);
    }
    const { seconds, nanos } = data;
    return new Duration(seconds, nanos);
  }

  public toData(): Duration.Data {
    const { seconds, nanos } = this;
    return {
      seconds: seconds.toFixed(),
      nanos,
    };
  }

  public static parse(str: string): Duration {
    return Duration.fromString(str);
  }

  public static fromString(str: string): Duration {
    let dec = new Dec(0);
    if (str.endsWith('ns')) {
      dec = new Dec(str.substring(0, str.length - 2));
      dec = dec.div(1000000000);
    } else if (str.endsWith('us')) {
      dec = new Dec(str.substring(0, str.length - 2));
      dec = dec.div(1000000);
    } else if (str.endsWith('ms')) {
      dec = new Dec(str.substring(0, str.length - 2));
      dec = dec.div(1000);
    } else if (str.endsWith('s')) {
      dec = new Dec(str.substring(0, str.length - 1));
    } else if (str.endsWith('m')) {
      dec = new Dec(str.substring(0, str.length - 2));
      dec = dec.mul(60);
    } else if (str.endsWith('h')) {
      dec = new Dec(str.substring(0, str.length - 2));
      dec = dec.mul(60 * 60);
    } else if (str.endsWith('d')) {
      dec = new Dec(str.substring(0, str.length - 2));
      dec = dec.mul(60 * 60 * 24);
    } else {
      throw new Error(`failed to parse to Duration: ${str}`);
    }
    return new Duration(
      dec.divToInt(1),
      dec.mod(1).mul(1000000000).divToInt(1).toNumber()
    );
  }

  public toString(unit?: string): string {
    let dec = new Dec(this._seconds);
    dec = dec.mul(1000000000);
    dec = dec.add(this._nanos);

    if (unit === 'ns') {
      // do nothing
    } else if (unit === 'us') {
      dec = dec.div(1000);
    } else if (unit === 'ms') {
      dec = dec.div(1000000);
    } else if (unit === 'm') {
      dec = dec.div(1000000000 * 60);
    } else if (unit === 'h') {
      dec = dec.div(1000000000 * 60 * 60);
    } else if (unit === 'd') {
      dec = dec.div(1000000000 * 60 * 60 * 24);
    } else {
      dec = dec.div(1000000000);
      unit = 's';
    }
    return `${dec.toFixed()}${unit}`;
  }

  public static fromProto(data: Duration.Proto): Duration {
    return new Duration(data.seconds.toString(), data.nanos);
  }

  public toProto(): Duration.Proto {
    const { seconds, nanos } = this;
    return Duration_pb.fromPartial({
      seconds: seconds.toFixed(),
      nanos,
    });
  }
}

export namespace Duration {
  export type Amino = string;

  export interface Data {
    seconds: string;
    nanos: number;
  }

  export type Proto = Duration_pb;
}
