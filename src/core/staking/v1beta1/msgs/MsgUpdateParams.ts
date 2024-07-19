/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { StakingParamsV1B1 } from '../Params';
import { MsgUpdateParams as MsgStakingUpdateParamsV1B1_pb } from '@xpla/xpla.proto/cosmos/staking/v1beta1/tx';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';

/**
 * A delegator can undelegate an amount of bonded Luna, and will begin the unbonding
 * process for those funds. The unbonding process takes 21 days to complete, during
 * which the Luna cannot be transacted or swapped.
 */
export class MsgUpdateStakingParamsV1B1 extends JSONSerializable<
  MsgUpdateStakingParamsV1B1.Amino,
  MsgUpdateStakingParamsV1B1.Data,
  MsgUpdateStakingParamsV1B1.Proto
> {
  /**
   * @param authority address that controls the module
   * @param params params defines the x/staking parameters to update
   */
  constructor(
    public authority: AccAddress,
    public params: StakingParamsV1B1 | undefined
  ) {
    super();
  }

  public static fromAmino(
    data: MsgUpdateStakingParamsV1B1.Amino,
    _isClassic?: boolean
  ): MsgUpdateStakingParamsV1B1 {
    const { authority, params } = data;
    return new MsgUpdateStakingParamsV1B1(
      authority,
      params ? StakingParamsV1B1.fromAmino(params) : undefined
    );
  }

  public toAmino(_isClassic?: boolean): MsgUpdateStakingParamsV1B1.Amino {
    const { authority, params } = this;
    return {
      type: 'cosmos-sdk/MsgUpdateStakingParams',
      authority,
      params: params ? params.toAmino() : undefined,
    };
  }

  public static fromProto(
    proto: MsgUpdateStakingParamsV1B1.Proto,
    _isClassic?: boolean
  ): MsgUpdateStakingParamsV1B1 {
    return new MsgUpdateStakingParamsV1B1(
      proto.authority,
      proto.params ? StakingParamsV1B1.fromProto(proto.params) : undefined
    );
  }

  public toProto(_isClassic?: boolean): MsgUpdateStakingParamsV1B1.Proto {
    const { authority, params } = this;
    return MsgStakingUpdateParamsV1B1_pb.fromPartial({
      authority,
      params: params ? params.toProto() : undefined,
    });
  }

  public packAny(_isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.staking.v1beta1.MsgUpdateParams',
      value: MsgStakingUpdateParamsV1B1_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    _isClassic?: boolean
  ): MsgUpdateStakingParamsV1B1 {
    return MsgUpdateStakingParamsV1B1.fromProto(
      MsgStakingUpdateParamsV1B1_pb.decode(msgAny.value)
    );
  }

  public static fromData(
    data: MsgUpdateStakingParamsV1B1.Data,
    _isClassic?: boolean
  ): MsgUpdateStakingParamsV1B1 {
    const { authority, params } = data;
    return new MsgUpdateStakingParamsV1B1(
      authority,
      params ? StakingParamsV1B1.fromData(params) : undefined
    );
  }

  public toData(_isClassic?: boolean): MsgUpdateStakingParamsV1B1.Data {
    const { authority, params } = this;
    return {
      '@type': '/cosmos.staking.v1beta1.MsgUpdateParams',
      authority,
      params: params ? params.toData() : undefined,
    };
  }
}

export namespace MsgUpdateStakingParamsV1B1 {
  export type Params = StakingParamsV1B1;

  export interface Amino {
    type: 'cosmos-sdk/MsgUpdateStakingParams';
    authority: AccAddress;
    params: StakingParamsV1B1.Amino | undefined;
  }

  export interface Data {
    '@type': '/cosmos.staking.v1beta1.MsgUpdateParams';
    authority: AccAddress;
    params: StakingParamsV1B1.Data | undefined;
  }

  export type Proto = MsgStakingUpdateParamsV1B1_pb;
}
