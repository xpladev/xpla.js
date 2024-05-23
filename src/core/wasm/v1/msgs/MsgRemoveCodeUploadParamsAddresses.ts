/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgRemoveCodeUploadParamsAddresses as MsgRemoveCodeUploadParamsAddressesV1_pb } from '@xpla/xpla.proto/cosmwasm/wasm/v1/tx';

export class MsgRemoveCodeUploadParamsAddressesV1 extends JSONSerializable<
  MsgRemoveCodeUploadParamsAddressesV1.Amino,
  MsgRemoveCodeUploadParamsAddressesV1.Data,
  MsgRemoveCodeUploadParamsAddressesV1.Proto
> {
  /**
   * @param authority is the address of the governance account
   * @param addresses
   */
  constructor(public authority: AccAddress, public addresses: AccAddress[]) {
    super();
  }

  public static fromAmino(
    data: MsgRemoveCodeUploadParamsAddressesV1.Amino,
    _isClassic?: boolean
  ): MsgRemoveCodeUploadParamsAddressesV1 {
    const {
      value: { authority, addresses },
    } = data;
    return new MsgRemoveCodeUploadParamsAddressesV1(authority, addresses);
  }

  public toAmino(
    _isClassic?: boolean
  ): MsgRemoveCodeUploadParamsAddressesV1.Amino {
    const { authority, addresses } = this;
    return {
      type: 'wasm/MsgRemoveCodeUploadParamsAddresses',
      value: {
        authority,
        addresses,
      },
    };
  }

  public static fromProto(
    proto: MsgRemoveCodeUploadParamsAddressesV1.Proto,
    _isClassic?: boolean
  ): MsgRemoveCodeUploadParamsAddressesV1 {
    return new MsgRemoveCodeUploadParamsAddressesV1(
      proto.authority,
      proto.addresses
    );
  }

  public toProto(
    _isClassic?: boolean
  ): MsgRemoveCodeUploadParamsAddressesV1.Proto {
    const { authority, addresses } = this;
    return MsgRemoveCodeUploadParamsAddressesV1_pb.fromPartial({
      authority,
      addresses,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmwasm.wasm.v1.MsgRemoveCodeUploadParamsAddresses',
      value: MsgRemoveCodeUploadParamsAddressesV1_pb.encode(
        this.toProto(isClassic)
      ).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgRemoveCodeUploadParamsAddressesV1 {
    return MsgRemoveCodeUploadParamsAddressesV1.fromProto(
      MsgRemoveCodeUploadParamsAddressesV1_pb.decode(msgAny.value),
      isClassic
    );
  }

  public static fromData(
    data: MsgRemoveCodeUploadParamsAddressesV1.Data,
    _isClassic?: boolean
  ): MsgRemoveCodeUploadParamsAddressesV1 {
    const { authority, addresses } = data;
    return new MsgRemoveCodeUploadParamsAddressesV1(authority, addresses);
  }

  public toData(
    _isClassic?: boolean
  ): MsgRemoveCodeUploadParamsAddressesV1.Data {
    const { authority, addresses } = this;
    return {
      '@type': '/cosmwasm.wasm.v1.MsgRemoveCodeUploadParamsAddresses',
      authority,
      addresses,
    };
  }
}

export namespace MsgRemoveCodeUploadParamsAddressesV1 {
  export interface Amino {
    type: 'wasm/MsgRemoveCodeUploadParamsAddresses';
    value: {
      authority: AccAddress;
      addresses: AccAddress[];
    };
  }

  export interface Data {
    '@type': '/cosmwasm.wasm.v1.MsgRemoveCodeUploadParamsAddresses';
    authority: AccAddress;
    addresses: AccAddress[];
  }

  export type Proto = MsgRemoveCodeUploadParamsAddressesV1_pb;
}
