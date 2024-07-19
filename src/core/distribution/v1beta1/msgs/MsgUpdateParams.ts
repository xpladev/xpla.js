/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { DistributionParamsV1B1 } from '../Params';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgUpdateParams as MsgUpdateDistributionParamsV1B1_pb } from '@xpla/xpla.proto/cosmos/distribution/v1beta1/tx';

export class MsgUpdateDistributionParamsV1B1 extends JSONSerializable<
  MsgUpdateDistributionParamsV1B1.Amino,
  MsgUpdateDistributionParamsV1B1.Data,
  MsgUpdateDistributionParamsV1B1.Proto
> {
  /**
   * @param authority is the address that controls the module (defaults to x/gov unless overwritten)
   * @param params defines the x/gov parameters to update
   */
  constructor(
    public authority: AccAddress,
    public params: DistributionParamsV1B1 | undefined
  ) {
    super();
  }

  public static fromAmino(
    data: MsgUpdateDistributionParamsV1B1.Amino,
    _isClassic?: boolean
  ): MsgUpdateDistributionParamsV1B1 {
    const {
      value: { authority, params },
    } = data;
    return new MsgUpdateDistributionParamsV1B1(
      authority,
      params ? DistributionParamsV1B1.fromAmino(params) : undefined
    );
  }

  public toAmino(isClassic?: boolean): MsgUpdateDistributionParamsV1B1.Amino {
    const { authority, params } = this;
    return {
      type: isClassic
        ? 'distribution/MsgUpdateParams'
        : 'cosmos-sdk/distribution/MsgUpdateParams',
      value: {
        authority,
        params: params ? params.toAmino() : undefined,
      },
    };
  }

  public static fromData(
    data: MsgUpdateDistributionParamsV1B1.Data,
    _isClassic?: boolean
  ): MsgUpdateDistributionParamsV1B1 {
    const { authority, params } = data;
    return new MsgUpdateDistributionParamsV1B1(
      authority,
      params ? DistributionParamsV1B1.fromData(params) : undefined
    );
  }

  public toData(_isClassic?: boolean): MsgUpdateDistributionParamsV1B1.Data {
    const { authority, params } = this;
    return {
      '@type': '/cosmos.distribution.v1beta1.MsgUpdateParams',
      authority,
      params: params ? params.toData() : undefined,
    };
  }

  public static fromProto(
    proto: MsgUpdateDistributionParamsV1B1.Proto,
    _isClassic?: boolean
  ): MsgUpdateDistributionParamsV1B1 {
    return new MsgUpdateDistributionParamsV1B1(
      proto.authority,
      proto.params ? DistributionParamsV1B1.fromProto(proto.params) : undefined
    );
  }

  public toProto(_isClassic?: boolean): MsgUpdateDistributionParamsV1B1.Proto {
    const { authority, params } = this;
    return MsgUpdateDistributionParamsV1B1_pb.fromPartial({
      authority,
      params: params ? params.toProto() : undefined,
    });
  }

  public packAny(_isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.auth.v1beta1.MsgUpdateParams',
      value: MsgUpdateDistributionParamsV1B1_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    _isClassic?: boolean
  ): MsgUpdateDistributionParamsV1B1 {
    return MsgUpdateDistributionParamsV1B1.fromProto(
      MsgUpdateDistributionParamsV1B1_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgUpdateDistributionParamsV1B1 {
  export interface Amino {
    type:
      | 'distribution/MsgUpdateParams'
      | 'cosmos-sdk/distribution/MsgUpdateParams';
    value: {
      authority: AccAddress;
      params: DistributionParamsV1B1.Amino | undefined;
    };
  }

  export interface Data {
    '@type': '/cosmos.distribution.v1beta1.MsgUpdateParams';
    authority: AccAddress;
    params: DistributionParamsV1B1.Data | undefined;
  }

  export type Proto = MsgUpdateDistributionParamsV1B1_pb;
}
