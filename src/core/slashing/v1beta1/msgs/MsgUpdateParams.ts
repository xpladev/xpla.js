/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgUpdateParams as MsgUpdateSlashingParamsV1B1_pb } from '@xpla/xpla.proto/cosmos/slashing/v1beta1/tx';
import { SlashingParamsV1B1 } from '../Params';

export class MsgUpdateSlashingParamsV1B1 extends JSONSerializable<
  MsgUpdateSlashingParamsV1B1.Amino,
  MsgUpdateSlashingParamsV1B1.Data,
  MsgUpdateSlashingParamsV1B1.Proto
> {
  /**
   * @param authority is the address that controls the module
   * @param params defines the x/bank parameters to update
   */
  constructor(
    public authority: AccAddress,
    public params: SlashingParamsV1B1 | undefined
  ) {
    super();
  }

  public static fromAmino(
    data: MsgUpdateSlashingParamsV1B1.Amino,
    _isClassic?: boolean
  ): MsgUpdateSlashingParamsV1B1 {
    const {
      value: { authority, params },
    } = data;
    return new MsgUpdateSlashingParamsV1B1(
      authority,
      params ? SlashingParamsV1B1.fromAmino(params) : undefined
    );
  }

  public toAmino(_isClassic?: boolean): MsgUpdateSlashingParamsV1B1.Amino {
    const { authority, params } = this;
    return {
      type: 'cosmos-sdk/x/slashing/MsgUpdateParams',
      value: {
        authority,
        params: params ? params.toAmino() : undefined,
      },
    };
  }

  public static fromData(
    data: MsgUpdateSlashingParamsV1B1.Data,
    _isClassic?: boolean
  ): MsgUpdateSlashingParamsV1B1 {
    const { authority, params } = data;
    return new MsgUpdateSlashingParamsV1B1(
      authority,
      params ? SlashingParamsV1B1.fromData(params) : undefined
    );
  }

  public toData(_isClassic?: boolean): MsgUpdateSlashingParamsV1B1.Data {
    const { authority, params } = this;
    return {
      '@type': '/cosmos.slashing.v1beta1.MsgUpdateParams',
      authority,
      params: params ? params.toData() : undefined,
    };
  }

  public static fromProto(
    proto: MsgUpdateSlashingParamsV1B1.Proto,
    _isClassic?: boolean
  ): MsgUpdateSlashingParamsV1B1 {
    return new MsgUpdateSlashingParamsV1B1(
      proto.authority,
      proto.params ? SlashingParamsV1B1.fromProto(proto.params) : undefined
    );
  }

  public toProto(_isClassic?: boolean): MsgUpdateSlashingParamsV1B1.Proto {
    const { authority, params } = this;
    return MsgUpdateSlashingParamsV1B1_pb.fromPartial({
      authority,
      params: params ? params.toProto() : undefined,
    });
  }

  public packAny(_isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.slashing.v1beta1.MsgUpdateParams',
      value: MsgUpdateSlashingParamsV1B1_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    _isClassic?: boolean
  ): MsgUpdateSlashingParamsV1B1 {
    return MsgUpdateSlashingParamsV1B1.fromProto(
      MsgUpdateSlashingParamsV1B1_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgUpdateSlashingParamsV1B1 {
  export interface Amino {
    type: 'cosmos-sdk/x/slashing/MsgUpdateParams';
    value: {
      authority: AccAddress;
      params: SlashingParamsV1B1.Amino | undefined;
    };
  }

  export interface Data {
    '@type': '/cosmos.slashing.v1beta1.MsgUpdateParams';
    authority: AccAddress;
    params: SlashingParamsV1B1.Data | undefined;
  }

  export type Proto = MsgUpdateSlashingParamsV1B1_pb;
}
