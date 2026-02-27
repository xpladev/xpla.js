/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import {
  MsgEthereumTx as MsgEthereumTxV1_pb,
} from '@xpla/xpla.proto/cosmos/evm/vm/v1/tx';
import {
  MsgEthereumTx as MsgEthereumTxV1_1_8_pb,
  ExtensionOptionsEthereumTx,
} from '@xpla/xpla.proto-v1_8/cosmos/evm/vm/v1/tx';
import { Convert } from '../../../../util/convert';

/**
 * evm MsgEthereumTx
 */
export class MsgEthereumTxV1 extends JSONSerializable<
  MsgEthereumTxV1.Amino,
  MsgEthereumTxV1.Data,
  MsgEthereumTxV1.Proto
> {
  /**
   * @param data DEPRECATED: inner transaction data
   * @param size DEPRECATED: encoded storage size of the transaction
   * @param hash DEPRECATED: transaction hash in hex format
   * @param from ethereum signer address in hex format
   * @param raw inner transaction data
   */
  constructor(
    public hash?: string,
    public from?: string,
    public size?: number,
    public data?: ExtensionOptionsEthereumTx | Any, // pre v1.9.0
    public raw?: Uint8Array, // post v1.9.0
  ) {
    super();
  }

  public static fromAmino(
    amino: MsgEthereumTxV1.Amino,
    _isClassic?: boolean
  ): MsgEthereumTxV1 {
    const {
      value: { hash, size, data, raw },
    } = amino;
    let from = amino.value.from;
    if (from && from.length > 0) {
      try {
        from = '0x' + Convert.toHex(Convert.fromBase64(from));
      } catch {}
    }
    return new MsgEthereumTxV1(hash, from, size, data, raw ? Convert.fromBase64(raw) : undefined);
  }

  public toAmino(_isClassic?: boolean): MsgEthereumTxV1.Amino {
    const { hash, size, data, raw } = this;
    let from = this.from ?? '';
    if (from && from.length > 0) {
      try {
        from = Convert.toBase64(Convert.fromHex(from));
      } catch {}
    }
    return {
      type: 'cosmos/evm/MsgEthereumTx',
      value: {
        hash,
        from,
        size,
        data,
        raw: raw ? Convert.toBase64(raw) : undefined,
      },
    };
  }

  public static fromData(
    obj: MsgEthereumTxV1.Data,
    _isClassic?: boolean
  ): MsgEthereumTxV1 {
    const { hash, size, data, raw } = obj;
    let from = obj.from;
    if (from && from.length > 0) {
      try {
        from = '0x' + Convert.toHex(Convert.fromBase64(from));
      } catch {}
    }
    return new MsgEthereumTxV1(hash, from, size, data, raw ? Convert.fromHex(raw) : undefined);
  }

  public toData(_isClassic?: boolean): MsgEthereumTxV1.Data {
    const { hash, size, data, raw } = this;
    let from = this.from ?? '';
    if (from && from.length > 0) {
      try {
        from = Convert.toBase64(Convert.fromHex(from));
      } catch {}
    }
    return {
      '@type': '/cosmos.evm.vm.v1.MsgEthereumTx',
      hash,
      from,
      size,
      data,
      raw: raw ? Convert.toHex(raw) : undefined,
    };
  }

  public static fromProto(
    proto: MsgEthereumTxV1.Proto,
    _isClassic?: boolean
  ): MsgEthereumTxV1 {
    if ('raw' in proto) {
      // v1.9.0+ (MsgEthereumTxV1_pb): from is Uint8Array, has raw
      return new MsgEthereumTxV1(undefined, '0x' + Convert.toHex(proto.from), undefined, undefined, Uint8Array.from(proto.raw));
    }
    // pre v1.9.0 (MsgEthereumTxV1_1_8_pb): from is string, has data/hash/size
    let from = proto.from;
    if (from.length > 0) {
      try {
        from = '0x' + Convert.toHex(Convert.fromBase64(from));
      } catch {}
    }
    return new MsgEthereumTxV1(proto.hash, from, proto.size, proto.data);
  }

  public toProto(_isClassic?: boolean): MsgEthereumTxV1.Proto {
    const { hash, from, size, data, raw } = this;
    if (raw !== undefined) {
      return MsgEthereumTxV1_pb.fromPartial({
        raw,
        from: Convert.fromHex(from ?? ''),
      });
    }
    return MsgEthereumTxV1_1_8_pb.fromPartial({
      hash,
      from,
      size,
      data,
    });
  }

  public packAny(_isClassic?: boolean): Any {
    const { hash, from, size, data, raw } = this;
    if (raw !== undefined) {
      const proto: MsgEthereumTxV1_pb = {
        from: Convert.fromHex(from ?? ''),
        raw: raw,
      };
      return Any.fromPartial({
        typeUrl: '/cosmos.evm.vm.v1.MsgEthereumTx',
        value: MsgEthereumTxV1_pb.encode(proto).finish(),
      });
    }
    let packedData: Any | undefined;
    if (data !== undefined && !('typeUrl' in data)) {
      packedData = Any.fromPartial({
        typeUrl: '/cosmos.evm.vm.v1.ExtensionOptionsEthereumTx',
        value: ExtensionOptionsEthereumTx.encode(data).finish(),
      });
    } else {
      packedData = data as Any | undefined;
    }
    const proto: MsgEthereumTxV1_1_8_pb = {
      hash: hash ?? '',
      from: from ?? '',
      size: size ?? 0,
      data: packedData,
    };
    return Any.fromPartial({
      typeUrl: '/cosmos.evm.vm.v1.MsgEthereumTx',
      value: MsgEthereumTxV1_1_8_pb.encode(proto).finish(),
    });
  }

  public static unpackAny(msgAny: Any, isClassic?: boolean): MsgEthereumTxV1 {
    try {
      const protod = MsgEthereumTxV1_1_8_pb.decode(msgAny.value);
      if (protod.data !== undefined && 'typeUrl' in protod.data) {
        return MsgEthereumTxV1.fromProto(protod, isClassic);
      }
    } catch {}
    const protor = MsgEthereumTxV1_pb.decode(msgAny.value);
    return MsgEthereumTxV1.fromProto(protor, isClassic);
  }
}

export namespace MsgEthereumTxV1 {
  export interface Amino {
    type:
      | 'ethermint/MsgEthereumTx'
      | 'evm/MsgEthereumTx'
      | 'cosmos/evm/MsgEthereumTx';
    value: {
      data: ExtensionOptionsEthereumTx | Any | undefined;
      size: number | undefined;
      hash: string | undefined;
      from: string; // base64
      raw: string | undefined; // base64
    };
  }

  export interface Data {
    '@type':
      | '/ethermint.evm.v1.MsgEthereumTx'
      | '/cosmos.evm.vm.v1.MsgEthereumTx';
    data: ExtensionOptionsEthereumTx | Any | undefined;
    size: number | undefined;
    hash: string | undefined;
    from: string; // base64
    raw: string | undefined; // hex
  }

  export type Proto = MsgEthereumTxV1_pb | MsgEthereumTxV1_1_8_pb;
}
