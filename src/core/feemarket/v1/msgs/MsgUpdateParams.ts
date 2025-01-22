/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgUpdateParams as MsgUpdateFeemarketParamsV1_pb } from '@xpla/xpla.proto/ethermint/feemarket/v1/tx';
import { FeemarketParamsV1 } from '../Params';

export class MsgUpdateFeemarketParamsV1 extends JSONSerializable<
  MsgUpdateFeemarketParamsV1.Amino,
  MsgUpdateFeemarketParamsV1.Data,
  MsgUpdateFeemarketParamsV1.Proto
> {
  /**
   * @param authority is the address that controls the module
   * @param params defines the x/bank parameters to update
   */
  constructor(
    public authority: AccAddress,
    public params: FeemarketParamsV1 | undefined
  ) {
    super();
  }

  public static fromAmino(
    data: MsgUpdateFeemarketParamsV1.Amino,
    _isClassic?: boolean
  ): MsgUpdateFeemarketParamsV1 {
    const {
      value: { authority, params },
    } = data;
    return new MsgUpdateFeemarketParamsV1(
      authority,
      params ? FeemarketParamsV1.fromAmino(params) : undefined
    );
  }

  public toAmino(_isClassic?: boolean): MsgUpdateFeemarketParamsV1.Amino {
    const { authority, params } = this;
    return {
      type: 'ethermint/x/feemarket/MsgUpdateParams',
      value: {
        authority,
        params: params ? params.toAmino() : undefined,
      },
    };
  }

  public static fromData(
    data: MsgUpdateFeemarketParamsV1.Data,
    _isClassic?: boolean
  ): MsgUpdateFeemarketParamsV1 {
    const { authority, params } = data;
    return new MsgUpdateFeemarketParamsV1(
      authority,
      params ? FeemarketParamsV1.fromData(params) : undefined
    );
  }

  public toData(_isClassic?: boolean): MsgUpdateFeemarketParamsV1.Data {
    const { authority, params } = this;
    return {
      '@type': '/ethermint.feemarket.v1.MsgUpdateParams',
      authority,
      params: params ? params.toData() : undefined,
    };
  }

  public static fromProto(
    proto: MsgUpdateFeemarketParamsV1.Proto,
    _isClassic?: boolean
  ): MsgUpdateFeemarketParamsV1 {
    return new MsgUpdateFeemarketParamsV1(
      proto.authority,
      proto.params ? FeemarketParamsV1.fromProto(proto.params) : undefined
    );
  }

  public toProto(_isClassic?: boolean): MsgUpdateFeemarketParamsV1.Proto {
    const { authority, params } = this;
    return MsgUpdateFeemarketParamsV1_pb.fromPartial({
      authority,
      params: params ? params.toProto() : undefined,
    });
  }

  public packAny(_isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/ethermint.feemarket.v1.MsgUpdateParams',
      value: MsgUpdateFeemarketParamsV1_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    _isClassic?: boolean
  ): MsgUpdateFeemarketParamsV1 {
    return MsgUpdateFeemarketParamsV1.fromProto(
      MsgUpdateFeemarketParamsV1_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgUpdateFeemarketParamsV1 {
  export interface Amino {
    type: 'ethermint/x/feemarket/MsgUpdateParams';
    value: {
      authority: AccAddress;
      params: FeemarketParamsV1.Amino | undefined;
    };
  }

  export interface Data {
    '@type': '/ethermint.feemarket.v1.MsgUpdateParams';
    authority: AccAddress;
    params: FeemarketParamsV1.Data | undefined;
  }

  export type Proto = MsgUpdateFeemarketParamsV1_pb;
}
