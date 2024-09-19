// Adapted from https://github.com/xpla/xpla-js/blob/master/src/utils/keyUtils.ts

import ecc from '@bitcoinerlab/secp256k1';
import BIP32Factory from 'bip32';
import * as bip39 from 'bip39';
import { RawKey } from './RawKey';

export const COIN_TYPE = 60;
const bip32 = BIP32Factory(ecc);

interface MnemonicKeyOptions {
  /**
   * Space-separated list of words for the mnemonic key.
   */
  mnemonic?: string;

  /**
   * BIP44 account number.
   */
  account?: number;

  /**
   * BIP44 index number
   */
  index?: number;

  /**
   * Coin type. Default is LUNA, 330.
   */
  coinType?: number;
}

const DEFAULT_OPTIONS = {
  account: 0,
  index: 0,
  coinType: COIN_TYPE,
};

/**
 * Implements a BIP39 mnemonic wallet with standard key derivation from a word list. Note
 * that this implementation exposes the private key in memory, so it is not advised to use
 * for applications requiring high security.
 */
export class MnemonicKey extends RawKey {
  /**
   * Space-separated mnemonic phrase.
   */
  public mnemonic: string;

  /**
   * Creates a new signing key from a mnemonic phrase. If no mnemonic is provided, one
   * will be automatically generated.
   *
   * ### Providing a mnemonic
   *
   * ```ts
   * import { MnemonicKey } from 'xpla.js';
   *
   * const mk = new MnemonicKey({ mnemonic: '...' });
   * console.log(mk.accAddress);
   * ```
   *
   * ### Generating a random mnemonic
   *
   * ```ts
   * const mk2 = new MnemonicKey();
   * console.log(mk2.mnemonic);
   * ```
   *
   * @param options
   */
  constructor(options: MnemonicKeyOptions = {}) {
    const { account, index, coinType } = {
      ...DEFAULT_OPTIONS,
      ...options,
    };
    let { mnemonic } = options;
    if (mnemonic === undefined) {
      mnemonic = bip39.generateMnemonic(256);
    }
    const seed: Buffer = bip39.mnemonicToSeedSync(mnemonic);
    const masterKey = bip32.fromSeed(seed);
    const hdPathXpla = `m/44'/${coinType}'/${account}'/0/${index}`;
    const xplaHD = masterKey.derivePath(hdPathXpla);
    const privateKey = xplaHD.privateKey;

    if (!privateKey) {
      throw new Error('Failed to derive key pair');
    }

    super(privateKey);
    this.mnemonic = mnemonic;
  }

  public static isValidMnemonic(mnemonic: string): boolean {
    return bip39.validateMnemonic(mnemonic);
  }
}
