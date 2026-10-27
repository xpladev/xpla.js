import { JSONSerializable } from '../../../../util/json';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgResetRateLimit as ProtoCodec } from '@xpla/xpla.proto/ratelimit/v1/tx';

export class MsgResetRateLimitV1 extends JSONSerializable<
  MsgResetRateLimitV1.Amino,
  MsgResetRateLimitV1.Data,
  MsgResetRateLimitV1.Proto
> {
  constructor(
    public authority: string,
    public denom: string,
    public channel_or_client_id: string
  ) {
    super();
  }
  public static fromAmino(
    data: MsgResetRateLimitV1.Amino
  ): MsgResetRateLimitV1 {
    return MsgResetRateLimitV1.fromData({
      '@type': '/ratelimit.v1.MsgResetRateLimit',
      ...data.value,
    });
  }
  public toAmino(): MsgResetRateLimitV1.Amino {
    const { authority, denom, channel_or_client_id } = this.toData();
    const value = { authority, denom, channel_or_client_id };
    return { type: 'ratelimit/MsgResetRateLimit', value };
  }
  public static fromData(data: MsgResetRateLimitV1.Data): MsgResetRateLimitV1 {
    return new MsgResetRateLimitV1(
      data.authority,
      data.denom,
      data.channel_or_client_id
    );
  }
  public toData(): MsgResetRateLimitV1.Data {
    return {
      '@type': '/ratelimit.v1.MsgResetRateLimit',
      authority: this.authority,
      denom: this.denom,
      channel_or_client_id: this.channel_or_client_id,
    };
  }
  public static fromProto(
    proto: MsgResetRateLimitV1.Proto
  ): MsgResetRateLimitV1 {
    return new MsgResetRateLimitV1(
      proto.authority,
      proto.denom,
      proto.channelOrClientId
    );
  }
  public toProto(): MsgResetRateLimitV1.Proto {
    return ProtoCodec.fromPartial({
      authority: this.authority,
      denom: this.denom,
      channelOrClientId: this.channel_or_client_id,
    });
  }
  public packAny(): Any {
    return {
      typeUrl: '/ratelimit.v1.MsgResetRateLimit',
      value: ProtoCodec.encode(this.toProto()).finish(),
    };
  }
  public static unpackAny(any: Any): MsgResetRateLimitV1 {
    return MsgResetRateLimitV1.fromProto(ProtoCodec.decode(any.value));
  }
}
export namespace MsgResetRateLimitV1 {
  export interface Data {
    '@type': '/ratelimit.v1.MsgResetRateLimit';
    authority: string;
    denom: string;
    channel_or_client_id: string;
  }
  export interface Amino {
    type: 'ratelimit/MsgResetRateLimit';
    value: Omit<Data, '@type'>;
  }
  export type Proto = ProtoCodec;
}
