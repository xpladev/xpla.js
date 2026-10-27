import { JSONSerializable } from '../../../../util/json';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgUpdateRateLimit as ProtoCodec } from '@xpla/xpla.proto/ratelimit/v1/tx';
import { Int, Numeric } from '../../../numeric';
import { parseInt64 } from '../../../../util/int64';

export class MsgUpdateRateLimitV1 extends JSONSerializable<
  MsgUpdateRateLimitV1.Amino,
  MsgUpdateRateLimitV1.Data,
  MsgUpdateRateLimitV1.Proto
> {
  public max_percent_send: Int;
  public max_percent_recv: Int;
  public duration_hours: Int;
  constructor(
    public authority: string,
    public denom: string,
    public channel_or_client_id: string,
    max_percent_send: Numeric.Input,
    max_percent_recv: Numeric.Input,
    duration_hours: Numeric.Input
  ) {
    super();
    this.max_percent_send = new Int(max_percent_send);
    this.max_percent_recv = new Int(max_percent_recv);
    this.duration_hours = parseInt64(duration_hours);
    if (this.duration_hours.lt(0))
      throw new RangeError('duration_hours must be unsigned');
  }
  public static fromAmino(
    data: MsgUpdateRateLimitV1.Amino
  ): MsgUpdateRateLimitV1 {
    return MsgUpdateRateLimitV1.fromData({
      '@type': '/ratelimit.v1.MsgUpdateRateLimit',
      ...data.value,
    });
  }
  public toAmino(): MsgUpdateRateLimitV1.Amino {
    const {
      authority,
      denom,
      channel_or_client_id,
      max_percent_send,
      max_percent_recv,
      duration_hours,
    } = this.toData();
    const value = {
      authority,
      denom,
      channel_or_client_id,
      max_percent_send,
      max_percent_recv,
      duration_hours,
    };
    return { type: 'ratelimit/MsgUpdateRateLimit', value };
  }
  public static fromData(
    data: MsgUpdateRateLimitV1.Data
  ): MsgUpdateRateLimitV1 {
    return new MsgUpdateRateLimitV1(
      data.authority,
      data.denom,
      data.channel_or_client_id,
      data.max_percent_send,
      data.max_percent_recv,
      data.duration_hours
    );
  }
  public toData(): MsgUpdateRateLimitV1.Data {
    return {
      '@type': '/ratelimit.v1.MsgUpdateRateLimit',
      authority: this.authority,
      denom: this.denom,
      channel_or_client_id: this.channel_or_client_id,
      max_percent_send: this.max_percent_send.toFixed(),
      max_percent_recv: this.max_percent_recv.toFixed(),
      duration_hours: this.duration_hours.toFixed(),
    };
  }
  public static fromProto(
    proto: MsgUpdateRateLimitV1.Proto
  ): MsgUpdateRateLimitV1 {
    return new MsgUpdateRateLimitV1(
      proto.authority,
      proto.denom,
      proto.channelOrClientId,
      proto.maxPercentSend,
      proto.maxPercentRecv,
      proto.durationHours
    );
  }
  public toProto(): MsgUpdateRateLimitV1.Proto {
    return ProtoCodec.fromPartial({
      authority: this.authority,
      denom: this.denom,
      channelOrClientId: this.channel_or_client_id,
      maxPercentSend: this.max_percent_send.toFixed(),
      maxPercentRecv: this.max_percent_recv.toFixed(),
      durationHours: this.duration_hours.toFixed(),
    });
  }
  public packAny(): Any {
    return {
      typeUrl: '/ratelimit.v1.MsgUpdateRateLimit',
      value: ProtoCodec.encode(this.toProto()).finish(),
    };
  }
  public static unpackAny(any: Any): MsgUpdateRateLimitV1 {
    return MsgUpdateRateLimitV1.fromProto(ProtoCodec.decode(any.value));
  }
}
export namespace MsgUpdateRateLimitV1 {
  export interface Data {
    '@type': '/ratelimit.v1.MsgUpdateRateLimit';
    authority: string;
    denom: string;
    channel_or_client_id: string;
    max_percent_send: string;
    max_percent_recv: string;
    duration_hours: string;
  }
  export interface Amino {
    type: 'ratelimit/MsgUpdateRateLimit';
    value: Omit<Data, '@type'>;
  }
  export type Proto = ProtoCodec;
}
