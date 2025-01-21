import { Key } from './Key';
import { SimplePublicKey } from '../core/PublicKey';

import * as secp256k1 from '@noble/secp256k1';
import { keccak_256 } from '@noble/hashes/sha3';

/**
 * An implementation of the Key interfaces that uses a raw private key.
 */
export class RawKey extends Key {
  /**
   * Raw private key, in bytes.
   */
  public privateKey: Buffer;

  constructor(privateKey: Uint8Array) {
    const publicKey = secp256k1.getPublicKey(
      new Uint8Array(privateKey),
      true
    );
    super(new SimplePublicKey(Buffer.from(publicKey).toString('base64')));
    this.privateKey = Buffer.from(privateKey);
  }

  public static isValidPrivateKey(privateKey: Buffer): boolean {
    return secp256k1.utils.isValidPrivateKey(privateKey);
  }

  public async sign(payload: Buffer): Promise<Buffer> {
    return secp256k1.sign(
      keccak_256(payload),
      this.privateKey,
      { der: false },
    ).then(value => Buffer.from(value));
  }
}
