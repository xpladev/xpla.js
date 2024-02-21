/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../util/json';
import { GenericAuthorization as GenericAuthorization_pb } from '@xpla/xpla.proto/cosmos/authz/v1beta1/authz';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';

export class GenericAuthorization extends JSONSerializable<
  GenericAuthorization.Amino,
  GenericAuthorization.Data,
  GenericAuthorization.Proto
> {
  constructor(public msg: string) {
    super();
  }

  public static fromAmino(
    data: GenericAuthorization.Amino,
    _isClassic?: boolean
  ): GenericAuthorization {
    return new GenericAuthorization(data.value.msg);
  }

  public toAmino(isClassic?: boolean): GenericAuthorization.Amino {
    const { msg } = this;
    return {
      type: isClassic
        ? 'msgauth/GenericAuthorization'
        : 'cosmos-sdk/GenericAuthorization',
      value: {
        msg,
      },
    };
  }

  public static fromData(
    data: GenericAuthorization.Data,
    _isClassic?: boolean
  ): GenericAuthorization {
    return new GenericAuthorization(data.msg);
  }

  public toData(_isClassic?: boolean): GenericAuthorization.Data {
    const { msg } = this;
    return {
      '@type': '/cosmos.authz.v1beta1.GenericAuthorization',
      msg,
    };
  }

  public static fromProto(
    data: GenericAuthorization.Proto,
    _isClassic?: boolean
  ): GenericAuthorization {
    return new GenericAuthorization(data.msg);
  }

  public toProto(_isClassic?: boolean): GenericAuthorization.Proto {
    return GenericAuthorization_pb.fromPartial({
      msg: this.msg,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.authz.v1beta1.GenericAuthorization',
      value: GenericAuthorization_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): GenericAuthorization {
    return GenericAuthorization.fromProto(
      GenericAuthorization_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace GenericAuthorization {
  export interface Amino {
    type: 'msgauth/GenericAuthorization' | 'cosmos-sdk/GenericAuthorization';
    value: {
      msg: string;
    };
  }

  export interface Data {
    '@type': '/cosmos.authz.v1beta1.GenericAuthorization';
    msg: string;
  }

  export type Proto = GenericAuthorization_pb;
}
