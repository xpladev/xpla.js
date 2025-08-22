import { JSONSerializable } from './json';
import { Dec, Numeric } from '../core/numeric';

export namespace Convert {
  export const id = (c: any): any => c;
  export const toDec = (c: Numeric.Input): Dec => new Dec(c);
  export const toString = (c: any): string => c.toString();
  export const toFixed = (c: number): string => c.toFixed();
  export const toNumber = Number.parseInt;
  export const toData = (c: JSONSerializable<any, any, any>): any => c.toData();

  export const unpadBytes = (d: Uint8Array): Uint8Array => {
    let i = 0;
    while (d[i] == 0 && i < d.length) i++;
    return d.subarray(i);
  };

  export const concatBytes = (chunks: Uint8Array[]): Uint8Array => {
    const totalLength = chunks.reduce((sum, c) => sum + c.length, 0);
    const result = new Uint8Array(totalLength);
    let offset = 0;
    for (const chunk of chunks) {
      result.set(chunk, offset);
      offset += chunk.length;
    }
    return result;
  };

  export let toHex: (bytes: Uint8Array) => string;
  export let fromHex: (hex: string) => Uint8Array;
  export let toBase64: (bytes: Uint8Array) => string;
  export let fromBase64: (b64: string) => Uint8Array;
  export let toUTF8: (bytes: Uint8Array) => string;
  export let fromUTF8: (b64: string) => Uint8Array;
  export let toAscii: (bytes: Uint8Array) => string;
  export let fromAscii: (b64: string) => Uint8Array;
  // Buffer based
  if (typeof Buffer !== 'undefined') {
    toHex = (bytes) => Buffer.from(bytes).toString('hex');
    fromHex = (hex) => {
      if (hex.startsWith('0x')) hex = hex.slice(2);
      if (hex.length % 2 !== 0) hex = '0' + hex;
      return new Uint8Array(Buffer.from(hex, 'hex'));
    };

    toBase64 = (bytes) => Buffer.from(bytes).toString('base64');
    fromBase64 = (b64) => new Uint8Array(Buffer.from(b64, 'base64'));

    toUTF8 = (bytes) => Buffer.from(bytes).toString('utf8');
    fromUTF8 = (utf8) => new Uint8Array(Buffer.from(utf8, 'utf8'));

    toAscii = (bytes) => Buffer.from(bytes).toString('ascii');
    fromAscii = (utf8) => new Uint8Array(Buffer.from(utf8, 'ascii'));
  }
  // without Buffer
  else {
    toHex = (bytes) =>
      Array.from(bytes)
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');

    fromHex = (hex) => {
      if (hex.startsWith('0x')) hex = hex.slice(2);
      if (hex.length % 2 !== 0) hex = '0' + hex;

      const bytes = new Uint8Array(hex.length / 2);
      for (let i = 0; i < bytes.length; i++) {
        const byte = hex.slice(i * 2, i * 2 + 2);
        const val = parseInt(byte, 16);
        if (Number.isNaN(val)) throw new Error(`Invalid hex byte: "${byte}"`);
        bytes[i] = val;
      }
      return bytes;
    };

    toBase64 = (bytes) => {
      let binary = '';
      for (let i = 0; i < bytes.length; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      if (typeof btoa === 'function') return btoa(binary);
      throw new Error('Base64 encoding not supported');
    };

    fromBase64 = (b64) => {
      if (typeof atob !== 'function') throw new Error('Base64 decoding not supported');
      const binary = atob(b64);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      return bytes;
    };

    toUTF8 = (bytes: Uint8Array) => {
      let result = '';
      let i = 0;

      while (i < bytes.length) {
        const byte1 = bytes[i++];

        if ((byte1 & 0x80) === 0x00) {
          // 1-byte (ASCII)
          result += String.fromCharCode(byte1);
        } else if ((byte1 & 0xe0) === 0xc0) {
          // 2-byte sequence
          const byte2 = bytes[i++];
          const codePoint = ((byte1 & 0x1f) << 6) | (byte2 & 0x3f);
          result += String.fromCharCode(codePoint);
        } else if ((byte1 & 0xf0) === 0xe0) {
          // 3-byte sequence
          const byte2 = bytes[i++];
          const byte3 = bytes[i++];
          const codePoint =
            ((byte1 & 0x0f) << 12) |
            ((byte2 & 0x3f) << 6) |
            (byte3 & 0x3f);
          result += String.fromCharCode(codePoint);
        } else if ((byte1 & 0xf8) === 0xf0) {
          // 4-byte sequence (surrogate pair)
          const byte2 = bytes[i++];
          const byte3 = bytes[i++];
          const byte4 = bytes[i++];
          const codePoint =
            ((byte1 & 0x07) << 18) |
            ((byte2 & 0x3f) << 12) |
            ((byte3 & 0x3f) << 6) |
            (byte4 & 0x3f);

          const highSurrogate = ((codePoint - 0x10000) >> 10) + 0xd800;
          const lowSurrogate = ((codePoint - 0x10000) & 0x3ff) + 0xdc00;
          result += String.fromCharCode(highSurrogate, lowSurrogate);
        } else {
          // Invalid byte, skip or replace
          result += '\uFFFD'; // replacement character
        }
      }

      return result;
    };

    fromUTF8 = (utf8: string) => {
      const result = [];
      for (let i = 0; i < utf8.length; i += 1) {
        const hi = utf8.charCodeAt(i);
        if (hi < 0x0080) {
          // code point range: U+0000 - U+007F
          // bytes: 0xxxxxxx
          result.push(hi);
          continue;
        }
        if (hi < 0x0800) {
          // code point range: U+0080 - U+07FF
          // bytes: 110xxxxx 10xxxxxx
          result.push(0xc0 | (hi >> 6), 0x80 | (hi & 0x3f));
          continue;
        }
        if (hi < 0xd800 || hi >= 0xe000) {
          // code point range: U+0800 - U+FFFF
          // bytes: 1110xxxx 10xxxxxx 10xxxxxx
          result.push(
            0xe0 | (hi >> 12),
            0x80 | ((hi >> 6) & 0x3f),
            0x80 | (hi & 0x3f)
          );
          continue;
        }
        i += 1;
        if (i < utf8.length) {
          // surrogate pair
          const lo = utf8.charCodeAt(i);
          const code = ((0x00010000 + (hi & 0x03ff)) << 10) | (lo & 0x03ff);
          // code point range: U+10000 - U+10FFFF
          // bytes: 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
          result.push(
            0xf0 | (code >> 18),
            0x80 | ((code >> 12) & 0x3f),
            0x80 | ((code >> 6) & 0x3f),
            0x80 | (code & 0x3f)
          );
        } else {
          break;
        }
      }
      return Uint8Array.from(result);
    };

    fromAscii = (str: string): Uint8Array => {
      const out = new Uint8Array(str.length);
      for (let i = 0; i < str.length; i++) {
        out[i] = str.charCodeAt(i) & 0x7F; // 7비트 ASCII
      }
      return out;
    };

    toAscii = (bytes: Uint8Array): string => {
      return String.fromCharCode(...bytes);
    };
  }
  
  export const toBytes = (d: Uint8Array | number[] | string): Uint8Array => {
    if (typeof d === 'string') {
      if (d.startsWith('0x')) {
        const hex = d.slice(2);
        if (hex.length % 2 !== 0) throw new Error('Invalid hex string');
        const bytes = new Uint8Array(hex.length / 2);
        for (let i = 0; i < bytes.length; i++) {
          bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
        }
        return bytes;
      }

      try {
        return Convert.fromBase64(d);
      } catch {
        try {
          return new Uint8Array(d.split(',').map(Number.parseInt));
        } catch {
          return new Uint8Array([]);
        }
      }
    }

    return d instanceof Uint8Array ? d : new Uint8Array(d);
  };
}

// Buffer 타입이 있을때만 toBuffer 동적으로 추가
if (typeof Buffer !== 'undefined') {
  (Convert as any).toBuffer = (d: Buffer | Uint8Array | number[] | string): Buffer => {
    if (typeof d === 'string') {
      if (d.startsWith('0x')) return Buffer.from(d.slice(2), 'hex');
      try {
        return Buffer.from(d, 'base64');
      } catch {
        try {
          return Buffer.from(d, 'hex');
        } catch {
          try {
            return Buffer.from(d.split(',').map(Number.parseInt));
          } catch {
            return Buffer.from([]);
          }
        }
      }
    }
    return Buffer.from(d);
  };
}
