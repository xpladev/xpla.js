import { JSONSerializable } from '../util/json';
import { LegacyAminoPubKey as LegacyAminoPubKey_pb } from '@xpla/xpla.proto/cosmos/crypto/multisig/keys';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { PubKey as PubKey_pb } from '@xpla/xpla.proto/cosmos/crypto/secp256k1/keys';
import { PubKey as ValConsPubKey_pb } from '@xpla/xpla.proto/cosmos/crypto/ed25519/keys';
import { bech32 } from 'bech32';
import { encode as eip55 } from 'eip55';
import * as secp256k1 from '@noble/secp256k1';
import { keccak_256 } from '@noble/hashes/sha3';
import { sha256 } from '@noble/hashes/sha256';

// As discussed in https://github.com/binance-chain/javascript-sdk/issues/163
// Prefixes listed here: https://github.com/tendermint/tendermint/blob/d419fffe18531317c28c29a292ad7d253f6cafdf/docs/spec/blockchain/encoding.md#public-key-cryptography
// Last bytes is varint-encoded length prefix
// const pubkeyAminoPrefixSecp256k1 = Buffer.from(
//   'eb5ae987' + '21' /* fixed length */,
//   'hex'
// );
const pubkeyAminoPrefixEd25519 = Buffer.from(
  '1624de64' + '20' /* fixed length */,
  'hex'
);
/** See https://github.com/tendermint/tendermint/commit/38b401657e4ad7a7eeb3c30a3cbf512037df3740 */
const pubkeyAminoPrefixMultisigThreshold = Buffer.from(
  '22c1f7e2' /* variable length not included */,
  'hex'
);

const encodeUvarint = (value: number | string): number[] => {
  const checked = Number.parseInt(value.toString());
  if (checked > 127) {
    throw new Error(
      'Encoding numbers > 127 is not supported here. Please tell those lazy CosmJS maintainers to port the binary.PutUvarint implementation from the Go standard library and write some tests.'
    );
  }
  return [checked];
};

const isHexPrefixed = (str: string): boolean => {
  if (typeof str !== 'string') {
    throw new Error(
      `[isHexPrefixed] input must be type 'string', received type ${typeof str}`
    );
  }

  return str.startsWith('0x');
};

const stripHexPrefix = (str: string): string => {
  if (typeof str !== 'string')
    throw new Error(
      `[stripHexPrefix] input must be type 'string', received ${typeof str}`
    );

  return isHexPrefixed(str) ? str.slice(2) : str;
};

export type PublicKey =
  | SimplePublicKey
  | LegacyAminoMultisigPublicKey
  | ValConsPublicKey;

export namespace PublicKey {
  export type Amino =
    | SimplePublicKey.Amino
    | LegacyAminoMultisigPublicKey.Amino
    | ValConsPublicKey.Amino;
  export type Data =
    | SimplePublicKey.Data
    | LegacyAminoMultisigPublicKey.Data
    | ValConsPublicKey.Data;
  export type Proto = Any;

  export function fromAmino(data: PublicKey.Amino): PublicKey {
    switch (data.type) {
      case 'tendermint/PubKeySecp256k1':
        return SimplePublicKey.fromAmino(data);
      case 'tendermint/PubKeyMultisigThreshold':
        return LegacyAminoMultisigPublicKey.fromAmino(data);
      case 'tendermint/PubKeyEd25519':
        return ValConsPublicKey.fromAmino(data);
    }
  }

  export function fromData(data: PublicKey.Data): PublicKey {
    switch (data['@type']) {
      case '/ethermint.crypto.v1.ethsecp256k1.PubKey':
      case '/cosmos.crypto.secp256k1.PubKey':
        return SimplePublicKey.fromData(data);
      case '/cosmos.crypto.multisig.LegacyAminoPubKey':
        return LegacyAminoMultisigPublicKey.fromData(data);
      case '/cosmos.crypto.ed25519.PubKey':
        return ValConsPublicKey.fromData(data);
    }
  }

  export function fromProto(pubkeyAny: PublicKey.Proto): PublicKey {
    const typeUrl = pubkeyAny.typeUrl;
    if (
      typeUrl === '/ethermint.crypto.v1.ethsecp256k1.PubKey' ||
      typeUrl === '/cosmos.crypto.secp256k1.PubKey'
    ) {
      return SimplePublicKey.unpackAny(pubkeyAny);
    } else if (typeUrl === '/cosmos.crypto.multisig.LegacyAminoPubKey') {
      return LegacyAminoMultisigPublicKey.unpackAny(pubkeyAny);
    } else if (typeUrl === '/cosmos.crypto.ed25519.PubKey') {
      return ValConsPublicKey.unpackAny(pubkeyAny);
    }

    throw new Error(`Pubkey type ${typeUrl} not recognized`);
  }
}

export class SimplePublicKey extends JSONSerializable<
  SimplePublicKey.Amino,
  SimplePublicKey.Data,
  SimplePublicKey.Proto
> {
  constructor(public key: string) {
    super();
  }

  public static fromAmino(data: SimplePublicKey.Amino): SimplePublicKey {
    return new SimplePublicKey(data.value);
  }

  public toAmino(): SimplePublicKey.Amino {
    return {
      type: 'tendermint/PubKeySecp256k1',
      value: this.key,
    };
  }

  public static fromData(data: SimplePublicKey.Data): SimplePublicKey {
    return new SimplePublicKey(data.key);
  }

  public toData(): SimplePublicKey.Data {
    return {
      '@type': '/ethermint.crypto.v1.ethsecp256k1.PubKey',
      key: this.key,
    };
  }

  public static fromProto(pubkeyProto: SimplePublicKey.Proto): SimplePublicKey {
    return new SimplePublicKey(Buffer.from(pubkeyProto.key).toString('base64'));
  }

  public toProto(): SimplePublicKey.Proto {
    return PubKey_pb.fromPartial({
      key: Buffer.from(this.key, 'base64'),
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/ethermint.crypto.v1.ethsecp256k1.PubKey',
      value: PubKey_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(pubkeyAny: Any): SimplePublicKey {
    return SimplePublicKey.fromProto(PubKey_pb.decode(pubkeyAny.value));
  }

  public encodeAminoPubkey(): Uint8Array {
    return Buffer.from(this.key, 'base64');
  }

  public rawAddress(): Uint8Array {
    const pubkeyData = Buffer.from(this.key, 'base64');
		const x0 = secp256k1.Point.fromHex(pubkeyData).toRawBytes(false);

		const x1 = keccak_256(x0.slice(1));
		const x2 = x1.slice(12);

    return Buffer.from(x2);
  }

  public address(): string {
    return bech32.encode('xpla', bech32.toWords(this.rawAddress()));
  }

  public pubkeyAddress(): string {
    return bech32.encode('xplapub', bech32.toWords(this.encodeAminoPubkey()));
  }

  public evmAddress(): string {
    return eip55('0x' + Buffer.from(this.rawAddress()).toString('hex'));
  }
}

export namespace SimplePublicKey {
  export interface Amino {
    type: 'tendermint/PubKeySecp256k1';
    value: string;
  }

  export interface Data {
    '@type':
      | '/ethermint.crypto.v1.ethsecp256k1.PubKey'
      | '/cosmos.crypto.secp256k1.PubKey';
    key: string;
  }

  export type Proto = PubKey_pb;
}

export class LegacyAminoMultisigPublicKey extends JSONSerializable<
  LegacyAminoMultisigPublicKey.Amino,
  LegacyAminoMultisigPublicKey.Data,
  LegacyAminoMultisigPublicKey.Proto
> {
  constructor(public threshold: number, public pubkeys: SimplePublicKey[]) {
    super();
  }

  public encodeAminoPubkey(): Uint8Array {
    const out = Array.from(pubkeyAminoPrefixMultisigThreshold);
    out.push(0x08);
    out.push(...encodeUvarint(this.threshold));
    for (const pubkeyData of this.pubkeys.map(p => p.encodeAminoPubkey())) {
      out.push(0x12);
      out.push(0x22);
      out.push(...encodeUvarint(pubkeyData.length));
      out.push(...Array.from(pubkeyData));
    }

    return new Uint8Array(out);
  }

  public rawAddress(): Uint8Array {
    const pubkeyData = this.encodeAminoPubkey();
    return sha256(pubkeyData).slice(0, 20);
  }

  public address(): string {
    return bech32.encode('xpla', bech32.toWords(this.rawAddress()));
  }

  public pubkeyAddress(): string {
    return bech32.encode('xplapub', bech32.toWords(this.encodeAminoPubkey()));
  }

  public evmAddress(): string {
    return eip55('0x' + Buffer.from(this.rawAddress()).toString('hex'));
  }

  public static fromAmino(
    data: LegacyAminoMultisigPublicKey.Amino
  ): LegacyAminoMultisigPublicKey {
    return new LegacyAminoMultisigPublicKey(
      Number.parseInt(data.value.threshold),
      data.value.pubkeys.map(p => SimplePublicKey.fromAmino(p))
    );
  }

  public toAmino(): LegacyAminoMultisigPublicKey.Amino {
    return {
      type: 'tendermint/PubKeyMultisigThreshold',
      value: {
        threshold: this.threshold.toFixed(),
        pubkeys: this.pubkeys.map(p => p.toAmino()),
      },
    };
  }

  public static fromData(
    data: LegacyAminoMultisigPublicKey.Data
  ): LegacyAminoMultisigPublicKey {
    return new LegacyAminoMultisigPublicKey(
      Number.parseInt(data.threshold),
      data.public_keys.map(v => SimplePublicKey.fromData(v))
    );
  }

  public toData(): LegacyAminoMultisigPublicKey.Data {
    return {
      '@type': '/cosmos.crypto.multisig.LegacyAminoPubKey',
      threshold: this.threshold.toFixed(),
      public_keys: this.pubkeys.map(p => p.toData()),
    };
  }

  public static fromProto(
    pubkeyProto: LegacyAminoMultisigPublicKey.Proto
  ): LegacyAminoMultisigPublicKey {
    return new LegacyAminoMultisigPublicKey(
      pubkeyProto.threshold,
      pubkeyProto.publicKeys.map(v => SimplePublicKey.unpackAny(v))
    );
  }

  public toProto(): LegacyAminoMultisigPublicKey.Proto {
    return LegacyAminoPubKey_pb.fromPartial({
      threshold: this.threshold,
      publicKeys: this.pubkeys.map(v => v.packAny()),
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.crypto.multisig.LegacyAminoPubKey',
      value: LegacyAminoPubKey_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(pubkeyAny: Any): LegacyAminoMultisigPublicKey {
    return LegacyAminoMultisigPublicKey.fromProto(
      LegacyAminoPubKey_pb.decode(pubkeyAny.value)
    );
  }
}

export namespace LegacyAminoMultisigPublicKey {
  export interface Amino {
    type: 'tendermint/PubKeyMultisigThreshold';
    value: {
      threshold: string;
      pubkeys: SimplePublicKey.Amino[];
    };
  }

  export interface Data {
    '@type': '/cosmos.crypto.multisig.LegacyAminoPubKey';
    threshold: string;
    public_keys: SimplePublicKey.Data[];
  }

  export type Proto = LegacyAminoPubKey_pb;
}

export class ValConsPublicKey extends JSONSerializable<
  ValConsPublicKey.Amino,
  ValConsPublicKey.Data,
  ValConsPublicKey.Proto
> {
  constructor(public key: string) {
    super();
  }

  public static fromAmino(data: ValConsPublicKey.Amino): ValConsPublicKey {
    return new ValConsPublicKey(data.value);
  }

  public toAmino(): ValConsPublicKey.Amino {
    return {
      type: 'tendermint/PubKeyEd25519',
      value: this.key,
    };
  }

  public static fromData(data: ValConsPublicKey.Data): ValConsPublicKey {
    return new ValConsPublicKey(data.key);
  }

  public toData(): ValConsPublicKey.Data {
    return {
      '@type': '/cosmos.crypto.ed25519.PubKey',
      key: this.key,
    };
  }

  public static fromProto(
    pubkeyProto: ValConsPublicKey.Proto
  ): ValConsPublicKey {
    return new ValConsPublicKey(
      Buffer.from(pubkeyProto.key).toString('base64')
    );
  }

  public toProto(): ValConsPublicKey.Proto {
    return PubKey_pb.fromPartial({
      key: Buffer.from(this.key, 'base64'),
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.crypto.ed25519.PubKey',
      value: ValConsPubKey_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(pubkeyAny: Any): ValConsPublicKey {
    return ValConsPublicKey.fromProto(ValConsPubKey_pb.decode(pubkeyAny.value));
  }

  public encodeAminoPubkey(): Uint8Array {
    return Buffer.concat([
      pubkeyAminoPrefixEd25519,
      Buffer.from(this.key, 'base64'),
    ]);
  }

  public rawAddress(): Uint8Array {
    const pubkeyData = Buffer.from(this.key, 'base64');
    return sha256(pubkeyData).slice(0, 20);
  }

  public address(): string {
    return bech32.encode('xplavalcons', bech32.toWords(this.rawAddress()));
  }

  public pubkeyAddress(): string {
    return bech32.encode(
      'xplavalconspub',
      bech32.toWords(this.encodeAminoPubkey())
    );
  }

  public evmAddress(): string {
    return eip55('0x' + Buffer.from(this.rawAddress()).toString('hex'));
  }
}

export namespace ValConsPublicKey {
  export interface Amino {
    type: 'tendermint/PubKeyEd25519';
    value: string;
  }

  export interface Data {
    '@type': '/cosmos.crypto.ed25519.PubKey';
    key: string;
  }

  export type Proto = PubKey_pb;
}
