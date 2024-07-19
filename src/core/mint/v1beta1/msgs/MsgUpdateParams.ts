/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgUpdateParams as MsgUpdateMintParamsV1B1_pb } from '@xpla/xpla.proto/cosmos/mint/v1beta1/tx';
import { MintParamsV1B1 } from '../Params';

export class MsgUpdateMintParamsV1B1 extends JSONSerializable<
  MsgUpdateMintParamsV1B1.Amino,
  MsgUpdateMintParamsV1B1.Data,
  MsgUpdateMintParamsV1B1.Proto
> {
  /**
   * @param authority is the address that controls the module
   * @param params defines the x/bank parameters to update
   */
  constructor(
    public authority: AccAddress,
    public params: MintParamsV1B1 | undefined
  ) {
    super();
  }

  public static fromAmino(
    data: MsgUpdateMintParamsV1B1.Amino,
    _isClassic?: boolean
  ): MsgUpdateMintParamsV1B1 {
    const {
      value: { authority, params },
    } = data;
    return new MsgUpdateMintParamsV1B1(
      authority,
      params ? MintParamsV1B1.fromAmino(params) : undefined
    );
  }

  public toAmino(_isClassic?: boolean): MsgUpdateMintParamsV1B1.Amino {
    const { authority, params } = this;
    return {
      type: 'cosmos-sdk/x/mint/MsgUpdateParams',
      value: {
        authority,
        params: params ? params.toAmino() : undefined,
      },
    };
  }

  public static fromData(
    data: MsgUpdateMintParamsV1B1.Data,
    _isClassic?: boolean
  ): MsgUpdateMintParamsV1B1 {
    const { authority, params } = data;
    return new MsgUpdateMintParamsV1B1(
      authority,
      params ? MintParamsV1B1.fromData(params) : undefined
    );
  }

  public toData(_isClassic?: boolean): MsgUpdateMintParamsV1B1.Data {
    const { authority, params } = this;
    return {
      '@type': '/cosmos.mint.v1beta1.MsgUpdateParams',
      authority,
      params: params ? params.toData() : undefined,
    };
  }

  public static fromProto(
    proto: MsgUpdateMintParamsV1B1.Proto,
    _isClassic?: boolean
  ): MsgUpdateMintParamsV1B1 {
    return new MsgUpdateMintParamsV1B1(
      proto.authority,
      proto.params ? MintParamsV1B1.fromProto(proto.params) : undefined
    );
  }

  public toProto(_isClassic?: boolean): MsgUpdateMintParamsV1B1.Proto {
    const { authority, params } = this;
    return MsgUpdateMintParamsV1B1_pb.fromPartial({
      authority,
      params: params ? params.toProto() : undefined,
    });
  }

  public packAny(_isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.mint.v1beta1.MsgUpdateParams',
      value: MsgUpdateMintParamsV1B1_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    _isClassic?: boolean
  ): MsgUpdateMintParamsV1B1 {
    return MsgUpdateMintParamsV1B1.fromProto(
      MsgUpdateMintParamsV1B1_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgUpdateMintParamsV1B1 {
  export interface Amino {
    type: 'cosmos-sdk/x/mint/MsgUpdateParams';
    value: {
      authority: AccAddress;
      params: MintParamsV1B1.Amino | undefined;
    };
  }

  export interface Data {
    '@type': '/cosmos.mint.v1beta1.MsgUpdateParams';
    authority: AccAddress;
    params: MintParamsV1B1.Data | undefined;
  }

  export type Proto = MsgUpdateMintParamsV1B1_pb;
}
