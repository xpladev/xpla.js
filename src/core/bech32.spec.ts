import {
  AccAddress,
  ValAddress,
  AccPubKey,
  ValPubKey,
  ValConsAddress,
} from './bech32';
import { bech32 } from 'bech32';

describe('AccAddress', () => {
  it('validates account address', () => {
    expect(
      AccAddress.validate('xplavaloper1pdx498r0hrc2fj36sjhs8vuhrz9hd2cw0yhqtk')
    ).toBe(false);

    expect(
      AccAddress.validate('xpla1pdx498r0h7c2fj36sjhs8vu8rz9hd2cw0tmam9')
    ).toBe(false); // bad checksum

    expect(
      AccAddress.validate('cosmos176m2p8l3fps3dal7h8gf9jvrv98tu3rqfdht86')
    ).toBe(false);

    const words = bech32.toWords(Buffer.from('foobar', 'utf8'));
    const badAddress = bech32.encode('xpla', words);

    expect(AccAddress.validate(badAddress)).toBe(false);
    // normal account address
    expect(
      AccAddress.validate('xpla1pdx498r0hrc2fj36sjhs8vuhrz9hd2cw0tmam9')
    ).toBe(true);
    // contract account address
    expect(
      AccAddress.validate(
        'xpla1uj9dm5xdm34fy5xwd84lfakarcnlpxw0ppgy7vpsruj0vtks29cqn0ztcs'
      )
    ).toBe(true);
  });

  it('converts from validator address', () => {
    expect(
      AccAddress.fromValAddress(
        'xplavaloper1pdx498r0hrc2fj36sjhs8vuhrz9hd2cw0yhqtk'
      )
    ).toEqual('xpla1pdx498r0hrc2fj36sjhs8vuhrz9hd2cw0tmam9');
  });
});

describe('ValAddress', () => {
  it('validates validator address', () => {
    const words = bech32.toWords(Buffer.from('foobar', 'utf8'));
    const badAddress = bech32.encode('xplavaloper', words);

    expect(ValAddress.validate(badAddress)).toBe(false);

    expect(
      ValAddress.validate('xplavaloper1pdx498r0hrc2fj36sjhs8vuhrz9hd2cw0yhqtk')
    ).toBe(true);
  });

  it('converts from account address', () => {
    expect(
      ValAddress.fromAccAddress('xpla1pdx498r0hrc2fj36sjhs8vuhrz9hd2cw0tmam9')
    ).toEqual('xplavaloper1pdx498r0hrc2fj36sjhs8vuhrz9hd2cw0yhqtk');
  });
});

describe('AccPubKey', () => {
  it('validates account pubkey', () => {
    expect(
      AccPubKey.validate(
        'xplavaloperpub1addwnpepqt8ha594svjn3nvfk4ggfn5n8xd3sm3cz6ztxyugwcuqzsuuhhfq5y7accr'
      )
    ).toBe(false);

    const words = bech32.toWords(Buffer.from('foobar', 'utf8'));
    const badPubKey = bech32.encode('xplapub', words);

    expect(AccPubKey.validate(badPubKey)).toBe(false);
    expect(
      AccPubKey.validate('xplapub1x46rqay4d3cssq8gxxvqz8xt6nwlz4tdh39t77')
    ).toBe(true);
  });

  it('converts from validator pubkey', () => {
    expect(
      AccPubKey.fromAccAddress('xpla1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v')
    ).toEqual('xplapub1x46rqay4d3cssq8gxxvqz8xt6nwlz4tdh39t77');
  });
});

describe('ValPubKey', () => {
  it('validates validator pubkey', () => {
    expect(
      ValPubKey.validate(
        'xplavaloperpub12g4nkvsjjnl0t7fvq3hdcw7y8dc9fq69gvd5ag'
      )
    ).toBe(true);

    const words = bech32.toWords(Buffer.from('foobar', 'utf8'));
    const badPubKey = bech32.encode('xplapub', words);

    expect(ValPubKey.validate(badPubKey)).toBe(false);
    expect(
      ValPubKey.validate('xplavaloper12g4nkvsjjnl0t7fvq3hdcw7y8dc9fq69nyeu9q')
    ).toBe(false);
  });

  it('converts from validator address', () => {
    expect(
      ValPubKey.fromValAddress(
        'xplavaloper12g4nkvsjjnl0t7fvq3hdcw7y8dc9fq69nyeu9q'
      )
    ).toEqual('xplavaloperpub12g4nkvsjjnl0t7fvq3hdcw7y8dc9fq69gvd5ag');
  });
});

describe('ValConsAddress', () => {
  it('validate validator consensus address', () => {
    expect(
      ValConsAddress.validate(
        'xplavalcons1relcztayk87c3r529rqf3fwdmn8hr6rhcgyrxd'
      )
    ).toBeTruthy();
  });
});
