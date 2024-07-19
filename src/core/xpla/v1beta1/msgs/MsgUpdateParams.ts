/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgUpdateParams as MsgUpdateRewardParamsV1B1_pb } from '@xpla/xpla.proto/xpla/reward/v1beta1/tx';
import { RewardParamsV1B1 } from '../Params';

export class MsgUpdateRewardParamsV1B1 extends JSONSerializable<
  MsgUpdateRewardParamsV1B1.Amino,
  MsgUpdateRewardParamsV1B1.Data,
  MsgUpdateRewardParamsV1B1.Proto
> {
  /**
   * @param authority is the address that controls the module
   * @param params defines the x/bank parameters to update
   */
  constructor(
    public authority: AccAddress,
    public params: RewardParamsV1B1 | undefined
  ) {
    super();
  }

  public static fromAmino(
    data: MsgUpdateRewardParamsV1B1.Amino,
    _isClassic?: boolean
  ): MsgUpdateRewardParamsV1B1 {
    const {
      value: { authority, params },
    } = data;
    return new MsgUpdateRewardParamsV1B1(
      authority,
      params ? RewardParamsV1B1.fromAmino(params) : undefined
    );
  }

  public toAmino(_isClassic?: boolean): MsgUpdateRewardParamsV1B1.Amino {
    const { authority, params } = this;
    return {
      type: 'xpladev/reward/MsgUpdateParams',
      value: {
        authority,
        params: params ? params.toAmino() : undefined,
      },
    };
  }

  public static fromData(
    data: MsgUpdateRewardParamsV1B1.Data,
    _isClassic?: boolean
  ): MsgUpdateRewardParamsV1B1 {
    const { authority, params } = data;
    return new MsgUpdateRewardParamsV1B1(
      authority,
      params ? RewardParamsV1B1.fromData(params) : undefined
    );
  }

  public toData(_isClassic?: boolean): MsgUpdateRewardParamsV1B1.Data {
    const { authority, params } = this;
    return {
      '@type': '/xpla.reward.v1beta1.MsgUpdateParams',
      authority,
      params: params ? params.toData() : undefined,
    };
  }

  public static fromProto(
    proto: MsgUpdateRewardParamsV1B1.Proto,
    _isClassic?: boolean
  ): MsgUpdateRewardParamsV1B1 {
    return new MsgUpdateRewardParamsV1B1(
      proto.authority,
      proto.params ? RewardParamsV1B1.fromProto(proto.params) : undefined
    );
  }

  public toProto(_isClassic?: boolean): MsgUpdateRewardParamsV1B1.Proto {
    const { authority, params } = this;
    return MsgUpdateRewardParamsV1B1_pb.fromPartial({
      authority,
      params: params ? params.toProto() : undefined,
    });
  }

  public packAny(_isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/xpla.reward.v1beta1.MsgUpdateParams',
      value: MsgUpdateRewardParamsV1B1_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    _isClassic?: boolean
  ): MsgUpdateRewardParamsV1B1 {
    return MsgUpdateRewardParamsV1B1.fromProto(
      MsgUpdateRewardParamsV1B1_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgUpdateRewardParamsV1B1 {
  export interface Amino {
    type: 'xpladev/reward/MsgUpdateParams';
    value: {
      authority: AccAddress;
      params: RewardParamsV1B1.Amino | undefined;
    };
  }

  export interface Data {
    '@type': '/xpla.reward.v1beta1.MsgUpdateParams';
    authority: AccAddress;
    params: RewardParamsV1B1.Data | undefined;
  }

  export type Proto = MsgUpdateRewardParamsV1B1_pb;
}
