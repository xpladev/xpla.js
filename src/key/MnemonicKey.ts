// Adapted from https://github.com/xpla/xpla-js/blob/master/src/utils/keyUtils.ts

import { mnemonicToSeedSync, generateMnemonic, validateMnemonic } from '@scure/bip39';
import { wordlist as engWordlist } from '@scure/bip39/wordlists/english';
import { HDKey } from '@scure/bip32';
import { RawKey } from './RawKey';

export const COIN_TYPE = 60;

interface MnemonicKeyOptions {
  /**
   * Space-separated list of words for the mnemonic key.
   * If not provided, a random mnemonic will be generated.
   */
  mnemonic?: string;

  /**
   * BIP44 account number. Default is 0.
   */
  account?: number;

  /**
   * BIP44 index number. Default is 0.
   */
  index?: number;

  /**
   * Coin type. Default is XPLA, 60.
   */
  coinType?: number;

  /**
   * Wordlist to use for the mnemonic.
   */
  wordlist?: string[];

  /**
   * Passphrase. string that will additionally protect the key.
   */
  passphrase?: string;
}

const DEFAULT_OPTIONS = {
  account: 0,
  index: 0,
  coinType: COIN_TYPE,
  wordlist: engWordlist,
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
    const { account, index, coinType, wordlist, passphrase } = {
      ...DEFAULT_OPTIONS,
      ...options,
    };
    let { mnemonic } = options;
    if (mnemonic === undefined) {
      mnemonic = generateMnemonic(wordlist, 256);
    }
    let seed: Uint8Array;
    try {
      seed = mnemonicToSeedSync(mnemonic, passphrase);
    }
    catch (e) {
      throw new Error('Invalid mnemonic');
    }
    const masterKey = HDKey.fromMasterSeed(seed);
    const hdPathXpla = `m/44'/${coinType}'/${account}'/0/${index}`;
    const xplaHD = masterKey.derive(hdPathXpla);
    const privateKey = xplaHD.privateKey;

    if (!privateKey) {
      throw new Error('Failed to derive key pair');
    }

    super(privateKey);
    this.mnemonic = mnemonic;
  }

  public static isValidMnemonic(mnemonic: string, wordlist?: string[]): boolean {
    return validateMnemonic(mnemonic, wordlist ?? DEFAULT_OPTIONS.wordlist);
  }
}
