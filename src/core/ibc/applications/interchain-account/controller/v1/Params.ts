import { JSONSerializable } from '../../../../../../util/json';
import { Params as IcaControllerParamsV1_pb } from '@xpla/xpla.proto/ibc/applications/interchain_accounts/controller/v1/controller';

/**
 *  Params defines the set of on-chain interchain accounts parameters.
 *  The following parameters may be used to disable the controller submodule.
 */
export class IcaControllerParamsV1 extends JSONSerializable<
  any,
  IcaControllerParamsV1.Data,
  IcaControllerParamsV1.Proto
> {
  /**
   * @param controller_enabled controller_enabled enables or disables the controller submodule
   */
  constructor(public controller_enabled: boolean) {
    super();
  }

  public static fromAmino(_: any): IcaControllerParamsV1 {
    throw new Error('Amino not supported');
  }

  public toAmino(): any {
    throw new Error('Amino not supported');
  }

  public static fromData(data: IcaControllerParamsV1.Data): IcaControllerParamsV1 {
    const { controller_enabled } = data;
    return new IcaControllerParamsV1(controller_enabled);
  }

  public toData(): IcaControllerParamsV1.Data {
    const { controller_enabled } = this;
    const res: IcaControllerParamsV1.Data = {
      controller_enabled,
    };
    return res;
  }

  public static fromProto(proto: IcaControllerParamsV1.Proto): IcaControllerParamsV1 {
    return new IcaControllerParamsV1(proto.controllerEnabled);
  }

  public toProto(): IcaControllerParamsV1.Proto {
    const { controller_enabled } = this;
    return IcaControllerParamsV1_pb.fromPartial({
      controllerEnabled: controller_enabled,
    });
  }
}

export namespace IcaControllerParamsV1 {
  export interface Data {
    controller_enabled: boolean;
  }

  export type Proto = IcaControllerParamsV1_pb;
}
