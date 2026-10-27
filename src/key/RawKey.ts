import { Key } from './Key';
import { SimplePublicKey } from '../core/PublicKey';
import { Convert } from '../util/convert';

import { secp256k1 } from '@noble/curves/secp256k1.js';
import { keccak_256 } from '@noble/hashes/sha3.js';

/**
 * An implementation of the Key interfaces that uses a raw private key.
 */
export class RawKey extends Key {
  /**
   * Raw private key, in bytes.
   */
  public privateKey: Uint8Array;

  constructor(privateKey: Uint8Array) {
    const publicKey = secp256k1.getPublicKey(privateKey, true);
    super(new SimplePublicKey(publicKey));
    this.privateKey = privateKey;
  }

  public static isValidPrivateKey(privateKey: Uint8Array): boolean {
    return secp256k1.utils.isValidSecretKey(privateKey);
  }

  public isValid(): boolean {
    return secp256k1.utils.isValidSecretKey(this.privateKey);
  }

  public get privateKeyHex(): string {
    return Convert.toHex(this.privateKey);
  }

  public get publicKeyHex(): string {
    return Convert.toHex(
      Convert.fromBase64((this.publicKey as SimplePublicKey).key)
    );
  }

  public async sign(payload: Uint8Array): Promise<Uint8Array> {
    return secp256k1.sign(keccak_256(payload), this.privateKey, {
      prehash: false,
      format: 'compact',
    });
  }
}
