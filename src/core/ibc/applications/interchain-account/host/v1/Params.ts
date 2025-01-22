import { JSONSerializable } from '../../../../../../util/json';
import { Params as IcaHostParamsV1_pb } from '@xpla/xpla.proto/ibc/applications/interchain_accounts/host/v1/host';

/**
 *  Params defines the set of on-chain interchain accounts parameters.
 *  The following parameters may be used to disable the host submodule.
 */
export class IcaHostParamsV1 extends JSONSerializable<
  any,
  IcaHostParamsV1.Data,
  IcaHostParamsV1.Proto
> {
  /**
   * @param host_enabled host_enabled enables or disables the host submodule.
   */
  constructor(public host_enabled: boolean, public allow_messages: string[]) {
    super();
  }

  public static fromAmino(_: any): IcaHostParamsV1 {
    throw new Error('Amino not supported');
  }

  public toAmino(): any {
    throw new Error('Amino not supported');
  }

  public static fromData(data: IcaHostParamsV1.Data): IcaHostParamsV1 {
    const { host_enabled, allow_messages } = data;
    return new IcaHostParamsV1(host_enabled, allow_messages);
  }

  public toData(): IcaHostParamsV1.Data {
    const { host_enabled, allow_messages } = this;
    const res: IcaHostParamsV1.Data = {
      host_enabled,
      allow_messages: allow_messages,
    };
    return res;
  }

  public static fromProto(proto: IcaHostParamsV1.Proto): IcaHostParamsV1 {
    return new IcaHostParamsV1(proto.hostEnabled, proto.allowMessages);
  }

  public toProto(): IcaHostParamsV1.Proto {
    const { host_enabled, allow_messages } = this;
    return IcaHostParamsV1_pb.fromPartial({
      hostEnabled: host_enabled,
      allowMessages: allow_messages,
    });
  }
}

export namespace IcaHostParamsV1 {
  export interface Data {
    host_enabled: boolean;
    allow_messages: string[];
  }

  export type Proto = IcaHostParamsV1_pb;
}
