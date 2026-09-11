/* eslint-disable @typescript-eslint/no-unused-vars */
import Long from 'long';
import { JSONSerializable } from '../../../util/json';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { Equivocation as Equivocation_pb } from '@xpla/xpla.proto/cosmos/evidence/v1beta1/evidence';

/**
 * Equivocation implements the Evidence interface and defines evidence of
 * double signing misbehavior.
 */
export class Equivocation extends JSONSerializable<
  Equivocation.Amino,
  Equivocation.Data,
  Equivocation.Proto
> {
  public height: Long;
  public power: Long;

  /**
   * @param height equivocation height
   * @param time equivocation time
   * @param power equivocation validator power
   * @param consensus_address equivocation validator consensus address
   */
  constructor(
    height: string | number | Long,
    public time: Date | undefined,
    power: string | number | Long,
    public consensus_address: string
  ) {
    super();
    this.height = Long.fromValue(height);
    this.power = Long.fromValue(power);
  }

  public static fromAmino(
    data: Equivocation.Amino,
    _isClassic?: boolean
  ): Equivocation {
    const {
      value: { height, time, power, consensus_address },
    } = data;
    return new Equivocation(
      height,
      time ? new Date(time) : undefined,
      power,
      consensus_address
    );
  }

  public toAmino(_isClassic?: boolean): Equivocation.Amino {
    const { height, time, power, consensus_address } = this;
    return {
      type: 'cosmos-sdk/Equivocation',
      value: {
        height: height.toString(),
        time: time?.toISOString().replace(/\.000Z$/, 'Z') ?? undefined,
        power: power.toString(),
        consensus_address,
      },
    };
  }

  public static fromData(
    data: Equivocation.Data,
    _isClassic?: boolean
  ): Equivocation {
    const { height, time, power, consensus_address } = data;
    return new Equivocation(
      height,
      time ? new Date(time) : undefined,
      power,
      consensus_address
    );
  }

  public toData(_isClassic?: boolean): Equivocation.Data {
    const { height, time, power, consensus_address } = this;
    return {
      '@type': '/cosmos.evidence.v1beta1.Equivocation',
      height: height.toString(),
      time: time?.toISOString().replace(/\.000Z$/, 'Z') ?? undefined,
      power: power.toString(),
      consensus_address,
    };
  }

  public static fromProto(
    proto: Equivocation.Proto,
    _isClassic?: boolean
  ): Equivocation {
    return new Equivocation(
      proto.height,
      proto.time ?? undefined,
      proto.power,
      proto.consensusAddress
    );
  }

  public toProto(_isClassic?: boolean): Equivocation.Proto {
    const { height, time, power, consensus_address } = this;
    return Equivocation_pb.fromPartial({
      height,
      time,
      power,
      consensusAddress: consensus_address,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.evidence.v1beta1.Equivocation',
      value: Equivocation_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(msgAny: Any, isClassic?: boolean): Equivocation {
    return Equivocation.fromProto(
      Equivocation_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace Equivocation {
  export interface Amino {
    type: 'cosmos-sdk/Equivocation';
    value: {
      height: string;
      time?: string;
      power: string;
      consensus_address: string;
    };
  }

  export interface Data {
    '@type': '/cosmos.evidence.v1beta1.Equivocation';
    height: string;
    time?: string;
    power: string;
    consensus_address: string;
  }

  export type Proto = Equivocation_pb;
}
