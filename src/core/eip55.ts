import { verify } from 'eip55';

/** `0x-` prefixed account address */
export type EvmAddress = string;

function checkPrefixAndLength(
  data: string,
  length: number,
  strict = true
): boolean {
  if (strict) {
    return verify(data);
  }

  if (data.startsWith('0x')) {
    const address = data.substring(2);

    try {
      const bytes = Buffer.from(address, 'hex');
      return bytes.length === length;
    } catch {
      return false;
    }
  }

  return false;
}

export namespace EvmAddress {
  /**
   * Checks if a string is a valid evm account address.
   *
   * @param data string to check
   */
  export function validate(data: string, strict = true): boolean {
    return checkPrefixAndLength(data, 42, strict);
  }
}
