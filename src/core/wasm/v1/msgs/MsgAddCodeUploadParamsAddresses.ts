/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgAddCodeUploadParamsAddresses as MsgAddCodeUploadParamsAddressesV1_pb } from '@xpla/xpla.proto/cosmwasm/wasm/v1/tx';

export class MsgAddCodeUploadParamsAddressesV1 extends JSONSerializable<
  MsgAddCodeUploadParamsAddressesV1.Amino,
  MsgAddCodeUploadParamsAddressesV1.Data,
  MsgAddCodeUploadParamsAddressesV1.Proto
> {
  /**
   * @param authority is the address of the governance account
   * @param addresses
   */
  constructor(public authority: AccAddress, public addresses: AccAddress[]) {
    super();
  }

  public static fromAmino(
    data: MsgAddCodeUploadParamsAddressesV1.Amino,
    _isClassic?: boolean
  ): MsgAddCodeUploadParamsAddressesV1 {
    const {
      value: { authority, addresses },
    } = data;
    return new MsgAddCodeUploadParamsAddressesV1(authority, addresses);
  }

  public toAmino(
    _isClassic?: boolean
  ): MsgAddCodeUploadParamsAddressesV1.Amino {
    const { authority, addresses } = this;
    return {
      type: 'wasm/MsgAddCodeUploadParamsAddresses',
      value: {
        authority,
        addresses,
      },
    };
  }

  public static fromProto(
    proto: MsgAddCodeUploadParamsAddressesV1.Proto,
    _isClassic?: boolean
  ): MsgAddCodeUploadParamsAddressesV1 {
    return new MsgAddCodeUploadParamsAddressesV1(
      proto.authority,
      proto.addresses
    );
  }

  public toProto(
    _isClassic?: boolean
  ): MsgAddCodeUploadParamsAddressesV1.Proto {
    const { authority, addresses } = this;
    return MsgAddCodeUploadParamsAddressesV1_pb.fromPartial({
      authority,
      addresses,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmwasm.wasm.v1.MsgAddCodeUploadParamsAddresses',
      value: MsgAddCodeUploadParamsAddressesV1_pb.encode(
        this.toProto(isClassic)
      ).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgAddCodeUploadParamsAddressesV1 {
    return MsgAddCodeUploadParamsAddressesV1.fromProto(
      MsgAddCodeUploadParamsAddressesV1_pb.decode(msgAny.value),
      isClassic
    );
  }

  public static fromData(
    data: MsgAddCodeUploadParamsAddressesV1.Data,
    _isClassic?: boolean
  ): MsgAddCodeUploadParamsAddressesV1 {
    const { authority, addresses } = data;
    return new MsgAddCodeUploadParamsAddressesV1(authority, addresses);
  }

  public toData(_isClassic?: boolean): MsgAddCodeUploadParamsAddressesV1.Data {
    const { authority, addresses } = this;
    return {
      '@type': '/cosmwasm.wasm.v1.MsgAddCodeUploadParamsAddresses',
      authority,
      addresses,
    };
  }
}

export namespace MsgAddCodeUploadParamsAddressesV1 {
  export interface Amino {
    type: 'wasm/MsgAddCodeUploadParamsAddresses';
    value: {
      authority: AccAddress;
      addresses: AccAddress[];
    };
  }

  export interface Data {
    '@type': '/cosmwasm.wasm.v1.MsgAddCodeUploadParamsAddresses';
    authority: AccAddress;
    addresses: AccAddress[];
  }

  export type Proto = MsgAddCodeUploadParamsAddressesV1_pb;
}
