/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { GovParamsV1 } from '../Params';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgUpdateParams as MsgUpdateGovParamsV1_pb } from '@xpla/xpla.proto/cosmos/gov/v1/tx';

export class MsgUpdateGovParamsV1 extends JSONSerializable<
  MsgUpdateGovParamsV1.Amino,
  MsgUpdateGovParamsV1.Data,
  MsgUpdateGovParamsV1.Proto
> {
  /**
   * @param authority is the address that controls the module (defaults to x/gov unless overwritten)
   * @param params defines the x/gov parameters to update
   */
  constructor(
    public authority: AccAddress,
    public params: GovParamsV1 | undefined
  ) {
    super();
  }

  public static fromAmino(
    data: MsgUpdateGovParamsV1.Amino,
    _isClassic?: boolean
  ): MsgUpdateGovParamsV1 {
    const {
      value: { authority, params },
    } = data;
    return new MsgUpdateGovParamsV1(
      authority,
      params ? GovParamsV1.fromAmino(params) : undefined
    );
  }

  public toAmino(_isClassic?: boolean): MsgUpdateGovParamsV1.Amino {
    const { authority, params } = this;
    return {
      type: 'cosmos-sdk/x/gov/v1/MsgUpdateParams',
      value: {
        authority,
        params: params ? params.toAmino() : undefined,
      },
    };
  }

  public static fromData(
    data: MsgUpdateGovParamsV1.Data,
    _isClassic?: boolean
  ): MsgUpdateGovParamsV1 {
    const { authority, params } = data;
    return new MsgUpdateGovParamsV1(
      authority,
      params ? GovParamsV1.fromData(params) : undefined
    );
  }

  public toData(_isClassic?: boolean): MsgUpdateGovParamsV1.Data {
    const { authority, params } = this;
    return {
      '@type': '/cosmos.gov.v1.MsgUpdateParams',
      authority,
      params: params ? params.toData() : undefined,
    };
  }

  public static fromProto(
    proto: MsgUpdateGovParamsV1.Proto,
    _isClassic?: boolean
  ): MsgUpdateGovParamsV1 {
    return new MsgUpdateGovParamsV1(
      proto.authority,
      proto.params ? GovParamsV1.fromProto(proto.params) : undefined
    );
  }

  public toProto(_isClassic?: boolean): MsgUpdateGovParamsV1.Proto {
    const { authority, params } = this;
    return MsgUpdateGovParamsV1_pb.fromPartial({
      authority,
      params: params ? params.toProto() : undefined,
    });
  }

  public packAny(_isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.gov.v1.MsgUpdateParams',
      value: MsgUpdateGovParamsV1_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    _isClassic?: boolean
  ): MsgUpdateGovParamsV1 {
    return MsgUpdateGovParamsV1.fromProto(
      MsgUpdateGovParamsV1_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgUpdateGovParamsV1 {
  export interface Amino {
    type: 'gov/MsgUpdateParams' | 'cosmos-sdk/x/gov/v1/MsgUpdateParams';
    value: {
      authority: AccAddress;
      params: GovParamsV1.Amino | undefined;
    };
  }

  export interface Data {
    '@type': '/cosmos.gov.v1.MsgUpdateParams';
    authority: AccAddress;
    params: GovParamsV1.Data | undefined;
  }

  export type Proto = MsgUpdateGovParamsV1_pb;
}
