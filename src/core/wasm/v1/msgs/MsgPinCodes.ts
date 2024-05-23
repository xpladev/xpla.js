/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgPinCodes as MsgPinCodesV1_pb } from '@xpla/xpla.proto/cosmwasm/wasm/v1/tx';

export class MsgPinCodesV1 extends JSONSerializable<
  MsgPinCodesV1.Amino,
  MsgPinCodesV1.Data,
  MsgPinCodesV1.Proto
> {
  /**
   * @param authority is the address of the governance account
   * @param code_ids references the new WASM codes
   */
  constructor(public authority: AccAddress, public code_ids: number[]) {
    super();
  }

  public static fromAmino(
    data: MsgPinCodesV1.Amino,
    _isClassic?: boolean
  ): MsgPinCodesV1 {
    const {
      value: { authority, code_ids },
    } = data;
    return new MsgPinCodesV1(
      authority,
      code_ids.map(x => Number.parseInt(x))
    );
  }

  public toAmino(_isClassic?: boolean): MsgPinCodesV1.Amino {
    const { authority, code_ids } = this;
    return {
      type: 'wasm/MsgPinCodes',
      value: {
        authority,
        code_ids: code_ids.map(x => x.toFixed()),
      },
    };
  }

  public static fromProto(
    proto: MsgPinCodesV1.Proto,
    _isClassic?: boolean
  ): MsgPinCodesV1 {
    return new MsgPinCodesV1(
      proto.authority,
      proto.codeIds.map(x => x.toNumber())
    );
  }

  public toProto(_isClassic?: boolean): MsgPinCodesV1.Proto {
    const { authority, code_ids } = this;
    return MsgPinCodesV1_pb.fromPartial({
      authority,
      codeIds: code_ids,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmwasm.wasm.v1.MsgPinCodes',
      value: MsgPinCodesV1_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(msgAny: Any, isClassic?: boolean): MsgPinCodesV1 {
    return MsgPinCodesV1.fromProto(
      MsgPinCodesV1_pb.decode(msgAny.value),
      isClassic
    );
  }

  public static fromData(
    data: MsgPinCodesV1.Data,
    _isClassic?: boolean
  ): MsgPinCodesV1 {
    const { authority, code_ids } = data;
    return new MsgPinCodesV1(
      authority,
      code_ids.map(x => Number.parseInt(x))
    );
  }

  public toData(_isClassic?: boolean): MsgPinCodesV1.Data {
    const { authority, code_ids } = this;
    return {
      '@type': '/cosmwasm.wasm.v1.MsgPinCodes',
      authority,
      code_ids: code_ids.map(x => x.toFixed()),
    };
  }
}

export namespace MsgPinCodesV1 {
  export interface Amino {
    type: 'wasm/MsgPinCodes';
    value: {
      authority: AccAddress;
      code_ids: string[];
    };
  }

  export interface Data {
    '@type': '/cosmwasm.wasm.v1.MsgPinCodes';
    authority: AccAddress;
    code_ids: string[];
  }

  export type Proto = MsgPinCodesV1_pb;
}
