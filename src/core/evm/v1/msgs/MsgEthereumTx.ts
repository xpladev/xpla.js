/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import {
  MsgEthereumTx as MsgEthereumTxV1_pb,
  LegacyTx,
  AccessListTx,
  DynamicFeeTx,
  ExtensionOptionsEthereumTx,
} from '@xpla/xpla.proto/cosmos/evm/vm/v1/tx';

/**
 * evm MsgEthereumTx
 */
export class MsgEthereumTxV1 extends JSONSerializable<
  MsgEthereumTxV1.Amino,
  MsgEthereumTxV1.Data,
  MsgEthereumTxV1.Proto
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
    public data: LegacyTx | AccessListTx | DynamicFeeTx | ExtensionOptionsEthereumTx | Any | undefined
  ) {
    super();
  }

  public static fromAmino(
    amino: MsgEthereumTxV1.Amino,
    _isClassic?: boolean
  ): MsgEthereumTxV1 {
    const {
      value: { hash, from, size, data },
    } = amino;
    return new MsgEthereumTxV1(hash, from, size, data);
  }

  public toAmino(_isClassic?: boolean): MsgEthereumTxV1.Amino {
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
    obj: MsgEthereumTxV1.Data,
    _isClassic?: boolean
  ): MsgEthereumTxV1 {
    const { hash, from, size, data } = obj;

    return new MsgEthereumTxV1(hash, from, size, data);
  }

  public toData(_isClassic?: boolean): MsgEthereumTxV1.Data {
    const { hash, from, size, data } = this;
    return {
      '@type': '/cosmos.evm.vm.v1.MsgEthereumTx',
      hash,
      from,
      size,
      data,
    };
  }

  public static fromProto(
    proto: MsgEthereumTxV1.Proto,
    _isClassic?: boolean
  ): MsgEthereumTxV1 {
    return new MsgEthereumTxV1(proto.hash, proto.from, proto.size, proto.data);
  }

  public toProto(_isClassic?: boolean): MsgEthereumTxV1.Proto {
    const { hash, from, size, data } = this;
    return MsgEthereumTxV1_pb.fromPartial({
      data: data as any,
      size,
      hash,
      from,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.evm.vm.v1.MsgEthereumTx',
      value: MsgEthereumTxV1_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(msgAny: Any, isClassic?: boolean): MsgEthereumTxV1 {
    return MsgEthereumTxV1.fromProto(
      MsgEthereumTxV1_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgEthereumTxV1 {
  export interface Amino {
    type:
      | 'ethermint/MsgEthereumTx'
      | 'evm/MsgEthereumTx';
    value: {
      data: LegacyTx | AccessListTx | DynamicFeeTx | ExtensionOptionsEthereumTx | Any | undefined;
      size: number;
      hash: string;
      from: string;
    };
  }

  export interface Data {
    '@type':
      | '/ethermint.evm.v1.MsgEthereumTx'
      | '/cosmos.evm.vm.v1.MsgEthereumTx';
    data: LegacyTx | AccessListTx | DynamicFeeTx | ExtensionOptionsEthereumTx | Any | undefined;
    size: number;
    hash: string;
    from: string;
  }

  export type Proto = MsgEthereumTxV1_pb;
}
