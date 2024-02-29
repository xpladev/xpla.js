/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../util/json';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgEthereumTx as MsgEthereumTx_pb } from '@xpla/xpla.proto/ethermint/evm/v1/tx';

/**
 * evm MsgEthereumTx
 */
export class MsgEthereumTx extends JSONSerializable<
  MsgEthereumTx.Amino,
  MsgEthereumTx.Data,
  MsgEthereumTx.Proto
> {
  /**
   * @param data inner transaction data
   * @param size DEPRECATED: encoded storage size of the transaction
   * @param hash transaction hash in hex format
   * @param from ethereum signer address in hex format
   */
  constructor(
    public hash: string,
    public from: string,
    public size: number,
    public data: Any | undefined
  ) {
    super();
  }

  public static fromAmino(
    amino: MsgEthereumTx.Amino,
    _isClassic?: boolean
  ): MsgEthereumTx {
    const {
      value: { hash, from, size, data },
    } = amino;
    return new MsgEthereumTx(hash, from, size, data);
  }

  public toAmino(_isClassic?: boolean): MsgEthereumTx.Amino {
    const { hash, from, size, data } = this;
    return {
      type: 'evm/MsgEthereumTx',
      value: {
        hash,
        from,
        size,
        data,
      },
    };
  }

  public static fromData(
    obj: MsgEthereumTx.Data,
    _isClassic?: boolean
  ): MsgEthereumTx {
    const { hash, from, size, data } = obj;

    return new MsgEthereumTx(hash, from, size, data);
  }

  public toData(_isClassic?: boolean): MsgEthereumTx.Data {
    const { hash, from, size, data } = this;
    return {
      '@type': '/ethermint.evm.v1.MsgEthereumTx',
      hash,
      from,
      size,
      data,
    };
  }

  public static fromProto(
    proto: MsgEthereumTx.Proto,
    _isClassic?: boolean
  ): MsgEthereumTx {
    return new MsgEthereumTx(proto.hash, proto.from, proto.size, proto.data);
  }

  public toProto(_isClassic?: boolean): MsgEthereumTx.Proto {
    const { hash, from, size, data } = this;
    return MsgEthereumTx_pb.fromPartial({
      data,
      size,
      hash,
      from,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/ethermint.evm.v1.MsgEthereumTx',
      value: MsgEthereumTx_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(msgAny: Any, isClassic?: boolean): MsgEthereumTx {
    return MsgEthereumTx.fromProto(
      MsgEthereumTx_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgEthereumTx {
  export interface Amino {
    type: 'evm/MsgEthereumTx';
    value: {
      data: Any | undefined;
      size: number;
      hash: string;
      from: string;
    };
  }

  export interface Data {
    '@type': '/ethermint.evm.v1.MsgEthereumTx';
    data: Any | undefined;
    size: number;
    hash: string;
    from: string;
  }

  export type Proto = MsgEthereumTx_pb;
}
