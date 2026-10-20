import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { Convert } from './convert';

/** JSON-safe representation for opaque protobuf Any values. */
export interface AnyData {
  typeUrl: string;
  value: string;
}

export function anyToData(value: Any | undefined): AnyData | undefined {
  return (
    value && { typeUrl: value.typeUrl, value: Convert.toBase64(value.value) }
  );
}

/** Accept existing in-memory Any inputs as well as their JSON representation. */
export function anyFromData(value: AnyData | Any | undefined): Any | undefined {
  if (!value) return undefined;
  if (
    typeof value.typeUrl !== 'string' ||
    !(typeof value.value === 'string' || value.value instanceof Uint8Array)
  ) {
    throw new TypeError(
      'Expected Any with a typeUrl and base64 string or Uint8Array value'
    );
  }
  return {
    typeUrl: value.typeUrl,
    value:
      typeof value.value === 'string'
        ? Convert.fromBase64(value.value)
        : value.value,
  };
}
