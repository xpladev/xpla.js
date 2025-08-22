import { Key } from './Key';
import { SimplePublicKey } from '../core/PublicKey';
import { Convert } from '../util/convert';

import * as secp256k1 from '@noble/secp256k1';
import { keccak_256 } from '@noble/hashes/sha3';

/**
 * An implementation of the Key interfaces that uses a raw private key.
 */
export class RawKey extends Key {
  /**
   * Raw private key, in bytes.
   */
  public privateKey: Uint8Array;

  constructor(privateKey: Uint8Array) {
    const publicKey = secp256k1.getPublicKey(
      privateKey,
      true
    );
    super(new SimplePublicKey(publicKey));
    this.privateKey = privateKey;
  }

  public static isValidPrivateKey(privateKey: Uint8Array): boolean {
    return secp256k1.utils.isValidPrivateKey(privateKey);
  }

  public isValid(): boolean {
    return secp256k1.utils.isValidPrivateKey(this.privateKey);
  }

  public get privateKeyHex(): string {
    return Convert.toHex(this.privateKey);
  }

  public get publicKeyHex(): string {
    return Convert.toHex(Convert.fromBase64((this.publicKey as SimplePublicKey).key));
  }

  public async sign(payload: Uint8Array): Promise<Uint8Array> {
    return secp256k1.sign(
      keccak_256(payload),
      this.privateKey,
      { der: false },
    ).then(value => Uint8Array.from(value));
  }
}
