import { JSONSerializable } from '../../../util/json';
import { Plan as PlanV1B1_pb } from '@xpla/xpla.proto/cosmos/upgrade/v1beta1/upgrade';

/*
 * Plan specifies information about a planned upgrade and when it should occur.
 */
export class PlanV1B1 extends JSONSerializable<
  PlanV1B1.Amino,
  PlanV1B1.Data,
  PlanV1B1.Proto
> {
  public name: string;
  public time?: Date;
  public height: string;
  public info: string;
  public upgraded_client_state?: any;
  /**
   * @param name This name will be used by the upgraded  version of the software to apply any special "on-upgrade" commands during the first BeginBlock method after the upgrade is applied.
   * @param time Deprecated
   * @param height  The height at which the upgrade must be performed. Only used if Time is not set.
   * @param info Any application specific upgrade info to be included on-chain such as a git commit that validators could automatically upgrade to
   * @param upgraded_client_state Deprecated
   */
  constructor(
    name: string,
    time: Date | undefined,
    height: string,
    info: string,
    upgraded_client_state: any
  ) {
    super();
    this.name = name;
    this.time = time;
    this.height = height;
    this.info = info;
    this.upgraded_client_state = upgraded_client_state;
  }

  public static fromAmino(data: PlanV1B1.Amino): PlanV1B1 {
    const { name, time, height, info, upgraded_client_state } = data;
    return new PlanV1B1(
      name,
      time ? new Date(time) : undefined,
      height,
      info,
      upgraded_client_state
    );
  }

  public toAmino(): PlanV1B1.Amino {
    const { name, time, height, info, upgraded_client_state } = this;
    const res: PlanV1B1.Amino = {
      name,
      time: time ? time.toISOString().replace(/\.000Z$/, 'Z') : undefined,
      height,
      info,
      upgraded_client_state,
    };
    return res;
  }

  public static fromData(data: PlanV1B1.Data): PlanV1B1 {
    const { name, time, height, info, upgraded_client_state } = data;
    return new PlanV1B1(
      name,
      time ? new Date(time) : undefined,
      height,
      info,
      upgraded_client_state
    );
  }

  public toData(): PlanV1B1.Data {
    const { name, time, height, info, upgraded_client_state } = this;
    const res: PlanV1B1.Data = {
      name,
      time: time ? time.toISOString().replace(/\.000Z$/, 'Z') : undefined,
      height,
      info,
      upgraded_client_state,
    };
    return res;
  }

  public static fromProto(proto: PlanV1B1.Proto): PlanV1B1 {
    return new PlanV1B1(
      proto.name,
      undefined,
      proto.height.toString(),
      proto.info,
      undefined
    );
  }

  public toProto(): PlanV1B1.Proto {
    const { name, time, height, info, upgraded_client_state } = this;
    return PlanV1B1_pb.fromPartial({
      name,
      time,
      height: height,
      info,
      upgradedClientState: upgraded_client_state,
    });
  }
}

export namespace PlanV1B1 {
  export interface Amino {
    name: string;
    time?: string;
    height: string;
    info: string;
    upgraded_client_state?: any;
  }

  export interface Data {
    name: string;
    time?: string;
    height: string;
    info: string;
    upgraded_client_state?: any;
  }

  export type Proto = PlanV1B1_pb;
}
