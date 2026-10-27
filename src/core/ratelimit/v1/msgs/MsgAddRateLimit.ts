import { JSONSerializable } from '../../../../util/json';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgAddRateLimit as ProtoCodec } from '@xpla/xpla.proto/ratelimit/v1/tx';
import { Int, Numeric } from '../../../numeric';
import { parseInt64 } from '../../../../util/int64';

export class MsgAddRateLimitV1 extends JSONSerializable<
  MsgAddRateLimitV1.Amino,
  MsgAddRateLimitV1.Data,
  MsgAddRateLimitV1.Proto
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
  public static fromAmino(data: MsgAddRateLimitV1.Amino): MsgAddRateLimitV1 {
    return MsgAddRateLimitV1.fromData({
      '@type': '/ratelimit.v1.MsgAddRateLimit',
      ...data.value,
    });
  }
  public toAmino(): MsgAddRateLimitV1.Amino {
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
    return { type: 'ratelimit/MsgAddRateLimit', value };
  }
  public static fromData(data: MsgAddRateLimitV1.Data): MsgAddRateLimitV1 {
    return new MsgAddRateLimitV1(
      data.authority,
      data.denom,
      data.channel_or_client_id,
      data.max_percent_send,
      data.max_percent_recv,
      data.duration_hours
    );
  }
  public toData(): MsgAddRateLimitV1.Data {
    return {
      '@type': '/ratelimit.v1.MsgAddRateLimit',
      authority: this.authority,
      denom: this.denom,
      channel_or_client_id: this.channel_or_client_id,
      max_percent_send: this.max_percent_send.toFixed(),
      max_percent_recv: this.max_percent_recv.toFixed(),
      duration_hours: this.duration_hours.toFixed(),
    };
  }
  public static fromProto(proto: MsgAddRateLimitV1.Proto): MsgAddRateLimitV1 {
    return new MsgAddRateLimitV1(
      proto.authority,
      proto.denom,
      proto.channelOrClientId,
      proto.maxPercentSend,
      proto.maxPercentRecv,
      proto.durationHours
    );
  }
  public toProto(): MsgAddRateLimitV1.Proto {
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
      typeUrl: '/ratelimit.v1.MsgAddRateLimit',
      value: ProtoCodec.encode(this.toProto()).finish(),
    };
  }
  public static unpackAny(any: Any): MsgAddRateLimitV1 {
    return MsgAddRateLimitV1.fromProto(ProtoCodec.decode(any.value));
  }
}
export namespace MsgAddRateLimitV1 {
  export interface Data {
    '@type': '/ratelimit.v1.MsgAddRateLimit';
    authority: string;
    denom: string;
    channel_or_client_id: string;
    max_percent_send: string;
    max_percent_recv: string;
    duration_hours: string;
  }
  export interface Amino {
    type: 'ratelimit/MsgAddRateLimit';
    value: Omit<Data, '@type'>;
  }
  export type Proto = ProtoCodec;
}
