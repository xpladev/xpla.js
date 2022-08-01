import { bech32 } from 'bech32';

/** `xpla-` prefixed account address */
export type AccAddress = string;

/** `xplavaloper-` prefixed validator operator address */
export type ValAddress = string;

/** `xplavalcons-` prefixed validator consensus address */
export type ValConsAddress = string;

/** `xplapub-` prefixed account public key */
export type AccPubKey = string;

/** `xplavaloperpub-` prefixed validator public key */
export type ValPubKey = string;

function checkPrefixAndLength(
  prefix: string,
  data: string,
  length: number
): boolean {
  try {
    const vals = bech32.decode(data);
    return vals.prefix === prefix && data.length == length;
  } catch (e) {
    return false;
  }
}

export namespace AccAddress {
  /**
   * Checks if a string is a valid Xpla account address.
   *
   * @param data string to check
   */
  export function validate(data: string): boolean {
    // 44 for normal account and 64 for contract account
    return (
      checkPrefixAndLength('xpla', data, 43) ||
      checkPrefixAndLength('xpla', data, 63)
    );
  }

  /**
   * Converts a validator address into an account address
   *
   * @param address validator address
   */
  export function fromValAddress(address: ValAddress): AccAddress {
    const vals = bech32.decode(address);
    return bech32.encode('xpla', vals.words);
  }
}

export namespace AccPubKey {
  /**
   * Checks if a string is a Xpla account's public key
   * @param data string to check
   */

  export function validate(data: string): boolean {
    return checkPrefixAndLength('xplapub', data, 46);
  }

  /**
   * Converts a Xpla validator pubkey to an account pubkey.
   * @param address validator pubkey to convert
   */
  export function fromAccAddress(address: AccAddress): AccPubKey {
    const vals = bech32.decode(address);
    return bech32.encode('xplapub', vals.words);
  }
}

export namespace ValAddress {
  /**
   * Checks if a string is a Xpla validator address.
   *
   * @param data string to check
   */
  export function validate(data: string): boolean {
    return checkPrefixAndLength('xplavaloper', data, 50);
  }

  /**
   * Converts a Xpla account address to a validator address.
   * @param address account address to convert
   */
  export function fromAccAddress(address: AccAddress): ValAddress {
    const vals = bech32.decode(address);
    return bech32.encode('xplavaloper', vals.words);
  }
}

export namespace ValPubKey {
  /**
   * Checks if a string is a Xpla validator pubkey
   * @param data string to check
   */
  export function validate(data: string): boolean {
    return checkPrefixAndLength('xplavaloperpub', data, 53);
  }

  /**
   * Converts a Xpla validator operator address to a validator pubkey.
   * @param valAddress account pubkey
   */
  export function fromValAddress(valAddress: ValAddress): ValPubKey {
    const vals = bech32.decode(valAddress);
    return bech32.encode('xplavaloperpub', vals.words);
  }
}

export namespace ValConsAddress {
  /**
   * Checks if a string is a Xpla validator consensus address
   * @param data string to check
   */

  export function validate(data: string): boolean {
    return checkPrefixAndLength('xplavalcons', data, 50);
  }
}
