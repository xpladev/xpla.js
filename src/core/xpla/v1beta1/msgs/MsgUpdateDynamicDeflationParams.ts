import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgUpdateParams as MsgUpdateDynamicDeflationParamsV1B1_pb } from '@xpla/xpla.proto/xpla/dynamicdeflation/v1beta1/tx';
import { DynamicDeflationParamsV1B1 } from '../DynamicDeflationParams';

export class MsgUpdateDynamicDeflationParamsV1B1 extends JSONSerializable<
  MsgUpdateDynamicDeflationParamsV1B1.Amino,
  MsgUpdateDynamicDeflationParamsV1B1.Data,
  MsgUpdateDynamicDeflationParamsV1B1.Proto
> {
  /**
   * @param authority is the address that controls the module
   * @param params defines the x/dynamicdeflation parameters to update
   */
  constructor(
    public authority: AccAddress,
    public params: DynamicDeflationParamsV1B1 | undefined
  ) {
    super();
  }

  public static fromAmino(
    data: MsgUpdateDynamicDeflationParamsV1B1.Amino,
    _isClassic?: boolean
  ): MsgUpdateDynamicDeflationParamsV1B1 {
    const {
      value: { authority, params },
    } = data;
    return new MsgUpdateDynamicDeflationParamsV1B1(
      authority,
      params ? DynamicDeflationParamsV1B1.fromAmino(params) : undefined
    );
  }

  public toAmino(
    _isClassic?: boolean
  ): MsgUpdateDynamicDeflationParamsV1B1.Amino {
    const { authority, params } = this;
    return {
      type: 'xpladev/x/dynamicdeflation/MsgUpdateParams',
      value: {
        authority,
        params: params ? params.toAmino() : undefined,
      },
    };
  }

  public static fromData(
    data: MsgUpdateDynamicDeflationParamsV1B1.Data,
    _isClassic?: boolean
  ): MsgUpdateDynamicDeflationParamsV1B1 {
    const { authority, params } = data;
    return new MsgUpdateDynamicDeflationParamsV1B1(
      authority,
      params ? DynamicDeflationParamsV1B1.fromData(params) : undefined
    );
  }

  public toData(
    _isClassic?: boolean
  ): MsgUpdateDynamicDeflationParamsV1B1.Data {
    const { authority, params } = this;
    return {
      '@type': '/xpla.dynamicdeflation.v1beta1.MsgUpdateParams',
      authority,
      params: params ? params.toData() : undefined,
    };
  }

  public static fromProto(
    proto: MsgUpdateDynamicDeflationParamsV1B1.Proto,
    _isClassic?: boolean
  ): MsgUpdateDynamicDeflationParamsV1B1 {
    return new MsgUpdateDynamicDeflationParamsV1B1(
      proto.authority,
      proto.params
        ? DynamicDeflationParamsV1B1.fromProto(proto.params)
        : undefined
    );
  }

  public toProto(
    _isClassic?: boolean
  ): MsgUpdateDynamicDeflationParamsV1B1.Proto {
    const { authority, params } = this;
    return MsgUpdateDynamicDeflationParamsV1B1_pb.fromPartial({
      authority,
      params: params ? params.toProto() : undefined,
    });
  }

  public packAny(_isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/xpla.dynamicdeflation.v1beta1.MsgUpdateParams',
      value: MsgUpdateDynamicDeflationParamsV1B1_pb.encode(
        this.toProto()
      ).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    _isClassic?: boolean
  ): MsgUpdateDynamicDeflationParamsV1B1 {
    return MsgUpdateDynamicDeflationParamsV1B1.fromProto(
      MsgUpdateDynamicDeflationParamsV1B1_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgUpdateDynamicDeflationParamsV1B1 {
  export interface Amino {
    type: 'xpladev/x/dynamicdeflation/MsgUpdateParams';
    value: {
      authority: AccAddress;
      params: DynamicDeflationParamsV1B1.Amino | undefined;
    };
  }

  export interface Data {
    '@type': '/xpla.dynamicdeflation.v1beta1.MsgUpdateParams';
    authority: AccAddress;
    params: DynamicDeflationParamsV1B1.Data | undefined;
  }

  export type Proto = MsgUpdateDynamicDeflationParamsV1B1_pb;
}
