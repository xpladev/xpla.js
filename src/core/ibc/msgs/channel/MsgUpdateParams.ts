/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { IbcChannelParamsV1 } from '../../core/channel/Params';
import { MsgUpdateParams as MsgUpdateIbcChannelParamsV1_pb } from '@xpla/xpla.proto/ibc/core/channel/v1/tx';

export class MsgUpdateIbcChannelParamsV1 extends JSONSerializable<
  any,
  MsgUpdateIbcChannelParamsV1.Data,
  MsgUpdateIbcChannelParamsV1.Proto
> {
  /**
   * @param authority
   * @param params
   */
  constructor(
    public authority: AccAddress,
    public params: IbcChannelParamsV1 | undefined,
  ) {
    super();
  }

  public static fromAmino(_: any, _isClassic?: boolean): MsgUpdateIbcChannelParamsV1 {
    throw new Error('Amino not supported');
  }

  public toAmino(_?: boolean): any {
    throw new Error('Amino not supported');
  }

  public static fromData(
    data: MsgUpdateIbcChannelParamsV1.Data,
    _?: boolean
  ): MsgUpdateIbcChannelParamsV1 {
    const { authority, params } = data;
    return new MsgUpdateIbcChannelParamsV1(
      authority,
      params ? IbcChannelParamsV1.fromData(params) : undefined,
    );
  }

  public toData(_?: boolean): MsgUpdateIbcChannelParamsV1.Data {
    const { authority, params } = this;
    return {
      '@type': '/ibc.core.channel.v1.MsgUpdateParams',
      authority,
      params: params ? params.toData() : undefined,
    };
  }

  public static fromProto(
    proto: MsgUpdateIbcChannelParamsV1.Proto,
    _?: boolean
  ): MsgUpdateIbcChannelParamsV1 {
    return new MsgUpdateIbcChannelParamsV1(
      proto.authority,
      proto.params ? IbcChannelParamsV1.fromProto(proto.params) : undefined,
    );
  }

  public toProto(_?: boolean): MsgUpdateIbcChannelParamsV1.Proto {
    const { authority, params } = this;
    return MsgUpdateIbcChannelParamsV1_pb.fromPartial({
      authority,
      params: params ? params.toProto() : undefined,
    });
  }

  public packAny(_?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/ibc.core.channel.v1.MsgUpdateParams',
      value: MsgUpdateIbcChannelParamsV1_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgUpdateIbcChannelParamsV1 {
    return MsgUpdateIbcChannelParamsV1.fromProto(
      MsgUpdateIbcChannelParamsV1_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgUpdateIbcChannelParamsV1 {
  export interface Data {
    '@type': '/ibc.core.channel.v1.MsgUpdateParams';
    authority: AccAddress,
    params?: IbcChannelParamsV1.Data,
  }
  export type Proto = MsgUpdateIbcChannelParamsV1_pb;
}
