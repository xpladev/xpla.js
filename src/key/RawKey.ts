import * as secp256k1 from 'secp256k1';
import { Key } from './Key';
import { SimplePublicKey } from '../core/PublicKey';

import { SigningKey } from '@ethersproject/signing-key';
import { keccak256 } from '@ethersproject/keccak256';

import {
  Signature,
  splitSignature,
  arrayify,
  concat,
} from '@ethersproject/bytes';
/**
 * An implementation of the Key interfaces that uses a raw private key.
 */
export class RawKey extends Key {
  /**
   * Raw private key, in bytes.
   */
  public privateKey: Buffer;

  constructor(privateKey: Buffer) {
    const publicKey = secp256k1.publicKeyCreate(
      new Uint8Array(privateKey),
      true
    );
    super(new SimplePublicKey(Buffer.from(publicKey).toString('base64')));
    this.privateKey = privateKey;
  }

  public ecdsaSign(payload: Buffer): Signature {
    const signingKey = new SigningKey(this.privateKey);
    const signature = signingKey.signDigest(keccak256(payload));

    return signature;
  }

  public async sign(payload: Buffer): Promise<Buffer> {
    const signature = this.ecdsaSign(payload);

    const splite = splitSignature(signature);

    return Buffer.from(arrayify(concat([splite.r, splite.s])));
  }
}
