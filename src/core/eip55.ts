import { keccak_256 } from '@noble/hashes/sha3.js';
import { bytesToHex, utf8ToBytes } from '@noble/hashes/utils.js';

/** `0x-` prefixed account address */
export type EvmAddress = string;

/** Encode an Ethereum address using its EIP-55 checksum. */
export function checksumEvmAddress(address: string): EvmAddress {
  if (!/^(?:0x)?[0-9a-fA-F]{40}$/.test(address)) {
    throw new TypeError('Bad address');
  }
  const lower = address.replace(/^0x/, '').toLowerCase();
  const hash = bytesToHex(keccak_256(utf8ToBytes(lower)));
  return (
    '0x' +
    Array.from(lower, (char, i) =>
      parseInt(hash[i], 16) >= 8 ? char.toUpperCase() : char
    ).join('')
  );
}

export namespace EvmAddress {
  /** Check the address length, hex encoding and, by default, EIP-55 checksum. */
  export function validate(data: string, strict = true): boolean {
    if (typeof data !== 'string' || !/^0x[0-9a-fA-F]{40}$/.test(data)) {
      return false;
    }
    return !strict || checksumEvmAddress(data) === data;
  }
}
