import { JSONSerializable } from './json';
import { Dec, Numeric } from '../core/numeric';

export namespace Convert {
  export const id = (c: any): any => c;
  export const toDec = (c: Numeric.Input): Dec => new Dec(c);
  export const toString = (c: any): string => c.toString();
  export const toFixed = (c: number): string => c.toFixed();
  export const toNumber = Number.parseInt;
  export const toData = (c: JSONSerializable<any, any, any>): any => c.toData();
  export const toBuffer = (d: Buffer | Uint8Array | number[] | string): Buffer => {
    if (typeof d === 'string') {
      if (d.startsWith('0x')) {
        return Buffer.from(d.slice(2), 'hex');
      }
      else {
        try {
          return Buffer.from(d, 'base64');
        } catch {
          try {
            return Buffer.from(d, 'hex');
          } catch {
            try {
              return Buffer.from(d.split(',').map(x => parseInt(x)));
            } catch {
              return Buffer.from([]);
            }
          }
        }
      }
    } else {
      return Buffer.from(d);
    }
  };
}
