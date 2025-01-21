import { JSONSerializable } from '../../../../util/json';
import { Height } from '../client/Height';
import { Timeout as Timeout_pb } from '@xpla/xpla.proto/ibc/core/channel/v1/channel';

/** Packet defines a type that carries data across different chains through IBC */
export class Timeout extends JSONSerializable<
  Timeout.Amino,
  Timeout.Data,
  Timeout.Proto
> {
  /**
   * @param port_id port on the counterparty chain which owns the other end of the channel.
   * @param channel_id channel end on the counterparty chain
   */
  constructor(
    public height: Height | undefined,
    public timestamp: number
  ) {
    super();
  }

  public static fromAmino(_data: Timeout.Amino): Timeout {
    const {
      height,
      timestamp,
    } = _data;
    return new Timeout(
      height ? Height.fromAmino(height) : undefined,
      timestamp
    );
  }

  public toAmino(): Timeout.Amino {
    const {
      height,
      timestamp,
    } = this;
    const res: Timeout.Amino = {
      height: height ? height.toAmino() : undefined,
      timestamp,
    };
    return res;
  }

  public static fromData(data: Timeout.Data): Timeout {
    const {
      height,
      timestamp,
    } = data;
    return new Timeout(
      height ? Height.fromData(height) : undefined,
      Number.parseInt(timestamp)
    );
  }

  public toData(): Timeout.Data {
    const {
      height,
      timestamp,
    } = this;
    const res: Timeout.Data = {
      height: height ? height.toData() : undefined,
      timestamp: timestamp.toFixed(),
    };
    return res;
  }

  public static fromProto(proto: Timeout.Proto): Timeout {
    return new Timeout(
      proto.height ? Height.fromProto(proto.height) : undefined,
      proto.timestamp.toNumber()
    );
  }

  public toProto(): Timeout.Proto {
    const { height, timestamp } = this;
    return Timeout_pb.fromPartial({
      height: height ? height.toProto() : undefined,
      timestamp: timestamp,
    });
  }
}

export namespace Timeout {
  export interface Amino {
    height?: Height.Amino;
    timestamp: number;
  }

  export interface Data {
    height?: Height.Data;
    timestamp: string;
  }

  export type Proto = Timeout_pb;
}
