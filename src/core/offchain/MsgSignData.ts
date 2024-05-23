/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../util/json';
import { AccAddress } from '../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgSignData as MsgSignData_pb } from '@xpla/xpla.proto/offchain/msg';

export class MsgSignData extends JSONSerializable<
  MsgSignData.Amino,
  MsgSignData.Data,
  MsgSignData.Proto
> {
  /**
   * @param signer is the bech32 representation of the signer's account address
   * @param data represents the raw bytes of the content that is signed (text, json, etc)
   */
  constructor(public signer: AccAddress, public raw_data: Uint8Array) {
    super();
  }

  public static fromAmino(
    data: MsgSignData.Amino,
    _isClassic?: boolean
  ): MsgSignData {
    const {
      value: { signer, raw_data },
    } = data;
    return new MsgSignData(signer, raw_data);
  }

  public toAmino(_isClassic?: boolean): MsgSignData.Amino {
    const { signer, raw_data } = this;
    return {
      type: 'xpla/MsgSignData',
      value: {
        signer,
        raw_data,
      },
    };
  }

  public static fromData(
    data: MsgSignData.Data,
    _isClassic?: boolean
  ): MsgSignData {
    const { signer, raw_data } = data;

    return new MsgSignData(signer, raw_data);
  }

  public toData(_isClassic?: boolean): MsgSignData.Data {
    const { signer, raw_data } = this;
    return {
      '@type': '/xpla.offchain.auth.MsgSignData',
      signer,
      raw_data,
    };
  }

  public static fromProto(
    proto: MsgSignData.Proto,
    _isClassic?: boolean
  ): MsgSignData {
    return new MsgSignData(proto.signer, proto.data);
  }

  public toProto(_isClassic?: boolean): MsgSignData.Proto {
    const { signer, raw_data } = this;
    return MsgSignData_pb.fromPartial({
      signer,
      data: raw_data,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/xpla.offchain.auth.MsgSignData',
      value: MsgSignData_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(msgAny: Any, isClassic?: boolean): MsgSignData {
    return MsgSignData.fromProto(
      MsgSignData_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgSignData {
  export interface Amino {
    type: 'xpla/MsgSignData';
    value: {
      signer: AccAddress;
      raw_data: Uint8Array;
    };
  }

  export interface Data {
    '@type': '/xpla.offchain.auth.MsgSignData';
    signer: AccAddress;
    raw_data: Uint8Array;
  }

  export type Proto = MsgSignData_pb;
}
