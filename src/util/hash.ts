import { sha256 as SHA256 } from '@noble/hashes/sha256';
// import { ripemd160 } from '@noble/hashes/ripemd160';

/**
 * Calculates the transaction hash from Amino-encoded string.
 * @param data Amino-encoded string (base64)
 */
export function hashToHex(data: string): string {
  return Buffer.from(SHA256(Buffer.from(data, 'base64'))).toString('hex').toUpperCase();
}
