import { JSONSerializable } from '../../../../util/json';
import { Params as IbcClientParamsV1_pb } from '@xpla/xpla.proto/ibc/core/client/v1/client';

/**
 * Params defines the set of IBC light client parameters.
 */
export class IbcClientParamsV1 extends JSONSerializable<
  IbcClientParamsV1.Amino,
  IbcClientParamsV1.Data,
  IbcClientParamsV1.Proto
> {
  /**
   * @param allowed_clients allowed_clients defines the list of allowed client state types.
   */
  constructor(public allowed_clients: string[]) {
    super();
  }

  public static fromAmino(data: IbcClientParamsV1.Amino): IbcClientParamsV1 {
    const { allowed_clients } = data;
    return new IbcClientParamsV1(allowed_clients);
  }

  public toAmino(): IbcClientParamsV1.Amino {
    const { allowed_clients } = this;
    const res: IbcClientParamsV1.Amino = {
      allowed_clients: allowed_clients,
    };
    return res;
  }

  public static fromData(data: IbcClientParamsV1.Data): IbcClientParamsV1 {
    const { allowed_clients } = data;
    return new IbcClientParamsV1(allowed_clients);
  }

  public toData(): IbcClientParamsV1.Data {
    const { allowed_clients } = this;
    const res: IbcClientParamsV1.Data = {
      allowed_clients,
    };
    return res;
  }

  public static fromProto(proto: IbcClientParamsV1.Proto): IbcClientParamsV1 {
    return new IbcClientParamsV1(proto.allowedClients);
  }

  public toProto(): IbcClientParamsV1.Proto {
    const { allowed_clients } = this;
    return IbcClientParamsV1_pb.fromPartial({
      allowedClients: allowed_clients,
    });
  }
}

export namespace IbcClientParamsV1 {
  export interface Amino {
    allowed_clients: string[];
  }

  export interface Data {
    allowed_clients: string[];
  }

  export type Proto = IbcClientParamsV1_pb;
}
