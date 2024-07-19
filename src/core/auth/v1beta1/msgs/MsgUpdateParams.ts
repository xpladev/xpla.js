/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { AuthParamsV1B1 } from '../Params';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgUpdateParams as MsgUpdateAuthParamsV1B1_pb } from '@xpla/xpla.proto/cosmos/auth/v1beta1/tx';

export class MsgUpdateAuthParamsV1B1 extends JSONSerializable<
  MsgUpdateAuthParamsV1B1.Amino,
  MsgUpdateAuthParamsV1B1.Data,
  MsgUpdateAuthParamsV1B1.Proto
> {
  /**
   * @param authority is the address that controls the module (defaults to x/gov unless overwritten)
   * @param params defines the x/gov parameters to update
   */
  constructor(
    public authority: AccAddress,
    public params: AuthParamsV1B1 | undefined
  ) {
    super();
  }

  public static fromAmino(
    data: MsgUpdateAuthParamsV1B1.Amino,
    _isClassic?: boolean
  ): MsgUpdateAuthParamsV1B1 {
    const {
      value: { authority, params },
    } = data;
    return new MsgUpdateAuthParamsV1B1(
      authority,
      params ? AuthParamsV1B1.fromAmino(params) : undefined
    );
  }

  public toAmino(_isClassic?: boolean): MsgUpdateAuthParamsV1B1.Amino {
    const { authority, params } = this;
    return {
      type: 'cosmos-sdk/x/auth/MsgUpdateParams',
      value: {
        authority,
        params: params ? params.toAmino() : undefined,
      },
    };
  }

  public static fromData(
    data: MsgUpdateAuthParamsV1B1.Data,
    _isClassic?: boolean
  ): MsgUpdateAuthParamsV1B1 {
    const { authority, params } = data;
    return new MsgUpdateAuthParamsV1B1(
      authority,
      params ? AuthParamsV1B1.fromData(params) : undefined
    );
  }

  public toData(_isClassic?: boolean): MsgUpdateAuthParamsV1B1.Data {
    const { authority, params } = this;
    return {
      '@type': '/cosmos.auth.v1beta1.MsgUpdateParams',
      authority,
      params: params ? params.toData() : undefined,
    };
  }

  public static fromProto(
    proto: MsgUpdateAuthParamsV1B1.Proto,
    _isClassic?: boolean
  ): MsgUpdateAuthParamsV1B1 {
    return new MsgUpdateAuthParamsV1B1(
      proto.authority,
      proto.params ? AuthParamsV1B1.fromProto(proto.params) : undefined
    );
  }

  public toProto(_isClassic?: boolean): MsgUpdateAuthParamsV1B1.Proto {
    const { authority, params } = this;
    return MsgUpdateAuthParamsV1B1_pb.fromPartial({
      authority,
      params: params ? params.toProto() : undefined,
    });
  }

  public packAny(_isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.auth.v1beta1.MsgUpdateParams',
      value: MsgUpdateAuthParamsV1B1_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    _isClassic?: boolean
  ): MsgUpdateAuthParamsV1B1 {
    return MsgUpdateAuthParamsV1B1.fromProto(
      MsgUpdateAuthParamsV1B1_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgUpdateAuthParamsV1B1 {
  export interface Amino {
    type: 'cosmos-sdk/x/auth/MsgUpdateParams';
    value: {
      authority: AccAddress;
      params: AuthParamsV1B1.Amino | undefined;
    };
  }

  export interface Data {
    '@type': '/cosmos.auth.v1beta1.MsgUpdateParams';
    authority: AccAddress;
    params: AuthParamsV1B1.Data | undefined;
  }

  export type Proto = MsgUpdateAuthParamsV1B1_pb;
}
