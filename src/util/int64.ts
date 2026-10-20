import Decimal from 'decimal.js';
import { Int, Numeric } from '../core/numeric';

/** Lossless SDK representation of protobuf int64 and uint64 fields. */
export type Int64 = Int;
export type Int64Input = Numeric.Input;

export function parseInt64(value: Int64Input): Int64 {
  if (typeof value === 'number' && !Number.isSafeInteger(value)) {
    throw new RangeError(
      '64-bit integers outside the safe number range must be supplied as strings'
    );
  }
  const numeric = new Decimal(value);
  if (!numeric.isFinite() || !numeric.isInteger()) {
    throw new RangeError('Expected a finite integer');
  }
  if (
    numeric.lt('-9223372036854775808') ||
    numeric.gt('18446744073709551615')
  ) {
    throw new RangeError('Integer is outside the protobuf 64-bit range');
  }
  return new Int(numeric);
}
