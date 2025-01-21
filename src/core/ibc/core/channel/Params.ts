import { JSONSerializable } from '../../../../util/json';
import { Timeout } from './Timeout';
import { Params as IbcChannelParamsV1_pb } from '@xpla/xpla.proto/ibc/core/channel/v1/channel';

/** Packet defines a type that carries data across different chains through IBC */
export class IbcChannelParamsV1 extends JSONSerializable<
  IbcChannelParamsV1.Amino,
  IbcChannelParamsV1.Data,
  IbcChannelParamsV1.Proto
> {
  /**
   * @param upgrade_timeout
   */
  constructor(
    public upgrade_timeout: Timeout | undefined,
  ) {
    super();
  }

  public static fromAmino(data: IbcChannelParamsV1.Amino): IbcChannelParamsV1 {
    const { upgrade_timeout } = data;
    return new IbcChannelParamsV1(
      upgrade_timeout ? Timeout.fromAmino(upgrade_timeout) : undefined,
    );
  }

  public toAmino(): IbcChannelParamsV1.Amino {
    const { upgrade_timeout } = this;
    const res: IbcChannelParamsV1.Amino = {
      upgrade_timeout: upgrade_timeout
        ? upgrade_timeout.toAmino()
        : undefined,
    };
    return res;
  }

  public static fromData(data: IbcChannelParamsV1.Data): IbcChannelParamsV1 {
    const { upgrade_timeout } = data;
    return new IbcChannelParamsV1(
      upgrade_timeout ? Timeout.fromData(upgrade_timeout) : undefined,
    );
  }

  public toData(): IbcChannelParamsV1.Data {
    const { upgrade_timeout } = this;
    const res: IbcChannelParamsV1.Data = {
      upgrade_timeout: upgrade_timeout
        ? upgrade_timeout.toData()
        : undefined,
    };
    return res;
  }

  public static fromProto(proto: IbcChannelParamsV1.Proto): IbcChannelParamsV1 {
    return new IbcChannelParamsV1(
      proto.upgradeTimeout ? Timeout.fromProto(proto.upgradeTimeout) : undefined,
    );
  }

  public toProto(): IbcChannelParamsV1.Proto {
    const { upgrade_timeout } = this;
    return IbcChannelParamsV1_pb.fromPartial({
      upgradeTimeout: upgrade_timeout ? upgrade_timeout.toProto() : undefined,
    });
  }
}

export namespace IbcChannelParamsV1 {
  export interface Amino {
    upgrade_timeout?: Timeout.Amino;
  }

  export interface Data {
    upgrade_timeout?: Timeout.Data;
  }

  export type Proto = IbcChannelParamsV1_pb;
}
