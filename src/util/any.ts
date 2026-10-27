import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { Convert } from './convert';
import { Timestamp } from '../core/Timestamp';
import { Duration } from '../core/Duration';
import {
  Header,
  ClientState,
  ConsensusState,
  Misbehaviour,
} from '@xpla/xpla.proto/ibc/lightclients/tendermint/v1/tendermint';
import {
  ClientState as WasmClientState,
  ConsensusState as WasmConsensusState,
  ClientMessage as WasmClientMessage,
} from '@xpla/xpla.proto/ibc/lightclients/wasm/v1/wasm';

export interface ExpandedIBCAnyData {
  '@type': string;
  [key: string]: unknown;
}

const ibcCodecs = new Map([
  ['/ibc.lightclients.tendermint.v1.Header', Header],
  ['/ibc.lightclients.tendermint.v1.ClientState', ClientState],
  ['/ibc.lightclients.tendermint.v1.ConsensusState', ConsensusState],
  ['/ibc.lightclients.tendermint.v1.Misbehaviour', Misbehaviour],
  ['/ibc.lightclients.wasm.v1.ClientState', WasmClientState],
  ['/ibc.lightclients.wasm.v1.ConsensusState', WasmConsensusState],
  ['/ibc.lightclients.wasm.v1.ClientMessage', WasmClientMessage],
] as [
  string,
  { fromJSON(value: any): any; encode(value: any): { finish(): Uint8Array } },
][]);

// Generated codecs accept both field-name styles but require raw WKT objects.
// Parse RFC3339 ourselves rather than losing nanoseconds through JavaScript Date.
function normalizeIBCJSON(value: unknown, field = ''): any {
  if (typeof value === 'string') {
    if (field === 'time' || field === 'timestamp') {
      return Timestamp.fromString(value).toProto();
    }
    if (
      [
        'trusting_period',
        'trustingPeriod',
        'unbonding_period',
        'unbondingPeriod',
        'max_clock_drift',
        'maxClockDrift',
      ].includes(field)
    ) {
      return Duration.fromString(value).toProto();
    }
  }
  if (Array.isArray(value)) return value.map(item => normalizeIBCJSON(item));
  if (value && typeof value === 'object' && !(value instanceof Uint8Array)) {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [
        key,
        normalizeIBCJSON(item, key),
      ])
    );
  }
  return value;
}

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
export function anyFromData(
  value: AnyData | Any | ExpandedIBCAnyData | undefined
): Any | undefined {
  if (!value) return undefined;
  if ('@type' in value) {
    const codec = ibcCodecs.get(value['@type']);
    if (!codec)
      throw new TypeError(`Unsupported expanded Any type: ${value['@type']}`);
    return {
      typeUrl: value['@type'],
      value: codec.encode(codec.fromJSON(normalizeIBCJSON(value))).finish(),
    };
  }
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
