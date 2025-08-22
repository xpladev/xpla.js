/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgUnpinCodes as MsgUnpinCodesV1_pb } from '@xpla/xpla.proto/cosmwasm/wasm/v1/tx';

export class MsgUnpinCodesV1 extends JSONSerializable<
  MsgUnpinCodesV1.Amino,
  MsgUnpinCodesV1.Data,
  MsgUnpinCodesV1.Proto
> {
  /**
   * @param authority is the address of the governance account
   * @param code_ids references the new WASM codes
   */
  constructor(public authority: AccAddress, public code_ids: number[]) {
    super();
  }

  public static fromAmino(
    data: MsgUnpinCodesV1.Amino,
    _isClassic?: boolean
  ): MsgUnpinCodesV1 {
    const {
      value: { authority, code_ids },
    } = data;
    return new MsgUnpinCodesV1(
      authority,
      code_ids.map(Number.parseInt)
    );
  }

  public toAmino(_isClassic?: boolean): MsgUnpinCodesV1.Amino {
    const { authority, code_ids } = this;
    return {
      type: 'wasm/MsgUnpinCodes',
      value: {
        authority,
        code_ids: code_ids.map(x => x.toFixed()),
      },
    };
  }

  public static fromProto(
    proto: MsgUnpinCodesV1.Proto,
    _isClassic?: boolean
  ): MsgUnpinCodesV1 {
    return new MsgUnpinCodesV1(
      proto.authority,
      proto.codeIds.map(x => x.toNumber())
    );
  }

  public toProto(_isClassic?: boolean): MsgUnpinCodesV1.Proto {
    const { authority, code_ids } = this;
    return MsgUnpinCodesV1_pb.fromPartial({
      authority,
      codeIds: code_ids,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmwasm.wasm.v1.MsgUnpinCodes',
      value: MsgUnpinCodesV1_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(msgAny: Any, isClassic?: boolean): MsgUnpinCodesV1 {
    return MsgUnpinCodesV1.fromProto(
      MsgUnpinCodesV1_pb.decode(msgAny.value),
      isClassic
    );
  }

  public static fromData(
    data: MsgUnpinCodesV1.Data,
    _isClassic?: boolean
  ): MsgUnpinCodesV1 {
    const { authority, code_ids } = data;
    return new MsgUnpinCodesV1(
      authority,
      code_ids.map(Number.parseInt)
    );
  }

  public toData(_isClassic?: boolean): MsgUnpinCodesV1.Data {
    const { authority, code_ids } = this;
    return {
      '@type': '/cosmwasm.wasm.v1.MsgUnpinCodes',
      authority,
      code_ids: code_ids.map(x => x.toFixed()),
    };
  }
}

export namespace MsgUnpinCodesV1 {
  export interface Amino {
    type: 'wasm/MsgUnpinCodes';
    value: {
      authority: AccAddress;
      code_ids: string[];
    };
  }

  export interface Data {
    '@type': '/cosmwasm.wasm.v1.MsgUnpinCodes';
    authority: AccAddress;
    code_ids: string[];
  }

  export type Proto = MsgUnpinCodesV1_pb;
}
