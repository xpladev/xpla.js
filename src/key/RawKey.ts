import { Key } from './Key';
import { SimplePublicKey } from '../core/PublicKey';

import * as secp256k1 from '@noble/secp256k1';
import { keccak_256 } from '@noble/hashes/sha3';
import * as forge from 'node-forge';

/**
 * An implementation of the Key interfaces that uses a raw private key.
 */
export class RawKey extends Key {
  /**
   * Raw private key, in bytes.
   */
  public privateKey: Buffer;

  constructor(privateKey: Buffer) {
    const publicKey = secp256k1.getPublicKey(
      new Uint8Array(privateKey),
      true
    );
    super(new SimplePublicKey(Buffer.from(publicKey).toString('base64')));
    this.privateKey = privateKey;
  }

  public static isValidPrivateKey(privateKey: Buffer): boolean {
    return secp256k1.utils.isValidPrivateKey(privateKey);
  }

  public async sign(payload: Buffer): Promise<Buffer> {
    return secp256k1.sign(keccak_256(payload), this.privateKey, { der: false }).then(value => Buffer.from(value));
  }

  public generateRSAKeyPair(rsabits: number = 2048): { privateKeyPem: string, publicKeyPem: string } {
    const bytes = this.privateKey.toString('hex');
  
    // Initialize the random byte generator with the seed
    const prng = forge.random.createInstance();
    prng.seedFileSync = () => bytes;

    // Generate the key pair
    const keypair = forge.pki.rsa.generateKeyPair({ bits: rsabits, e: 0x10001, prng });

    return {
      privateKeyPem: forge.pki.privateKeyToPem(keypair.privateKey),
      publicKeyPem:  forge.pki.publicKeyToPem(keypair.publicKey),
    };
  }
}
