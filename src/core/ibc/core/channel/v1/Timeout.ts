import { Int64, Int64Input, parseInt64 } from '../../../../../util/int64';
import { JSONSerializable } from '../../../../../util/json';
import { HeightV1 } from '../../client/v1/Height';
import { Timeout as TimeoutV1_pb } from '@xpla/xpla.proto/ibc/core/channel/v1/channel';

/**
 * Timeout defines an execution deadline structure for 04-channel handlers.
 */
export class TimeoutV1 extends JSONSerializable<
  TimeoutV1.Amino,
  TimeoutV1.Data,
  TimeoutV1.Proto
> {
  public timestamp: Int64;
  /**
   * @param height block height after which the packet times out
   * @param timestamp block timestamp (in nanoseconds) after which the packet times out
   */

  constructor(
    public height: HeightV1 | undefined,
    timestamp: Int64Input
  ) {
    super();
    this.timestamp = parseInt64(timestamp);
  }

  public static fromAmino(_data: TimeoutV1.Amino): TimeoutV1 {
    const { height, timestamp } = _data;
    return new TimeoutV1(
      height ? HeightV1.fromAmino(height) : undefined,
      timestamp
    );
  }

  public toAmino(): TimeoutV1.Amino {
    const { height, timestamp } = this;
    const res: TimeoutV1.Amino = {
      height: height ? height.toAmino() : undefined,
      timestamp: timestamp.toString(),
    };
    return res;
  }

  public static fromData(data: TimeoutV1.Data): TimeoutV1 {
    const { height, timestamp } = data;
    return new TimeoutV1(
      height ? HeightV1.fromData(height) : undefined,
      timestamp
    );
  }

  public toData(): TimeoutV1.Data {
    const { height, timestamp } = this;
    const res: TimeoutV1.Data = {
      height: height ? height.toData() : undefined,
      timestamp: timestamp.toFixed(),
    };
    return res;
  }

  public static fromProto(proto: TimeoutV1.Proto): TimeoutV1 {
    return new TimeoutV1(
      proto.height ? HeightV1.fromProto(proto.height) : undefined,
      proto.timestamp
    );
  }

  public toProto(): TimeoutV1.Proto {
    const { height, timestamp } = this;
    return TimeoutV1_pb.fromPartial({
      height: height ? height.toProto() : undefined,
      timestamp: timestamp.toString(),
    });
  }
}

export namespace TimeoutV1 {
  export interface Amino {
    height?: HeightV1.Amino;
    timestamp: string;
  }

  export interface Data {
    height?: HeightV1.Data;
    timestamp: string;
  }

  export type Proto = TimeoutV1_pb;
}
