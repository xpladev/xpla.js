import { JSONSerializable } from '../../../../util/json';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgRemoveRateLimit as ProtoCodec } from '@xpla/xpla.proto/ratelimit/v1/tx';

export class MsgRemoveRateLimitV1 extends JSONSerializable<
  MsgRemoveRateLimitV1.Amino,
  MsgRemoveRateLimitV1.Data,
  MsgRemoveRateLimitV1.Proto
> {
  constructor(
    public authority: string,
    public denom: string,
    public channel_or_client_id: string
  ) {
    super();
  }
  public static fromAmino(
    data: MsgRemoveRateLimitV1.Amino
  ): MsgRemoveRateLimitV1 {
    return MsgRemoveRateLimitV1.fromData({
      '@type': '/ratelimit.v1.MsgRemoveRateLimit',
      ...data.value,
    });
  }
  public toAmino(): MsgRemoveRateLimitV1.Amino {
    const { authority, denom, channel_or_client_id } = this.toData();
    const value = { authority, denom, channel_or_client_id };
    return { type: 'ratelimit/MsgRemoveRateLimit', value };
  }
  public static fromData(
    data: MsgRemoveRateLimitV1.Data
  ): MsgRemoveRateLimitV1 {
    return new MsgRemoveRateLimitV1(
      data.authority,
      data.denom,
      data.channel_or_client_id
    );
  }
  public toData(): MsgRemoveRateLimitV1.Data {
    return {
      '@type': '/ratelimit.v1.MsgRemoveRateLimit',
      authority: this.authority,
      denom: this.denom,
      channel_or_client_id: this.channel_or_client_id,
    };
  }
  public static fromProto(
    proto: MsgRemoveRateLimitV1.Proto
  ): MsgRemoveRateLimitV1 {
    return new MsgRemoveRateLimitV1(
      proto.authority,
      proto.denom,
      proto.channelOrClientId
    );
  }
  public toProto(): MsgRemoveRateLimitV1.Proto {
    return ProtoCodec.fromPartial({
      authority: this.authority,
      denom: this.denom,
      channelOrClientId: this.channel_or_client_id,
    });
  }
  public packAny(): Any {
    return {
      typeUrl: '/ratelimit.v1.MsgRemoveRateLimit',
      value: ProtoCodec.encode(this.toProto()).finish(),
    };
  }
  public static unpackAny(any: Any): MsgRemoveRateLimitV1 {
    return MsgRemoveRateLimitV1.fromProto(ProtoCodec.decode(any.value));
  }
}
export namespace MsgRemoveRateLimitV1 {
  export interface Data {
    '@type': '/ratelimit.v1.MsgRemoveRateLimit';
    authority: string;
    denom: string;
    channel_or_client_id: string;
  }
  export interface Amino {
    type: 'ratelimit/MsgRemoveRateLimit';
    value: Omit<Data, '@type'>;
  }
  export type Proto = ProtoCodec;
}
