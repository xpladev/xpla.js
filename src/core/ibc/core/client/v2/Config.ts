import { JSONSerializable } from '../../../../../util/json';
import { Config as IbcClientConfigV2_pb } from '@xpla/xpla.proto/ibc/core/client/v2/config';

/**
 * Config is a **per-client** configuration struct that sets which relayers are allowed to relay v2 IBC messages
 * for a given client.
 */
export class IbcClientConfigV2 extends JSONSerializable<
  IbcClientConfigV2.Amino,
  IbcClientConfigV2.Data,
  IbcClientConfigV2.Proto
> {
  /**
   * @param allowed_relayers defines the set of allowed relayers for IBC V2 protocol for the given client
   */
  constructor(
    public allowed_relayers: string[],
  ) {
    super();
  }

  public static fromAmino(data: IbcClientConfigV2.Amino): IbcClientConfigV2 {
    const { allowed_relayers } = data;
    return new IbcClientConfigV2(
      allowed_relayers,
    );
  }

  public toAmino(): IbcClientConfigV2.Amino {
    const { allowed_relayers } = this;
    const res: IbcClientConfigV2.Amino = {
      allowed_relayers,
    };
    return res;
  }

  public static fromData(data: IbcClientConfigV2.Data): IbcClientConfigV2 {
    const { allowed_relayers } = data;
    return new IbcClientConfigV2(
      allowed_relayers,
    );
  }

  public toData(): IbcClientConfigV2.Data {
    const { allowed_relayers } = this;
    const res: IbcClientConfigV2.Data = {
      allowed_relayers,
    };
    return res;
  }

  public static fromProto(proto: IbcClientConfigV2.Proto): IbcClientConfigV2 {
    return new IbcClientConfigV2(
      proto.allowedRelayers,
    );
  }

  public toProto(): IbcClientConfigV2.Proto {
    const { allowed_relayers } = this;
    return IbcClientConfigV2_pb.fromPartial({
      allowedRelayers: allowed_relayers,
    });
  }
}

export namespace IbcClientConfigV2 {
  export interface Amino {
    allowed_relayers: string[];
  }

  export interface Data {
    allowed_relayers: string[];
  }

  export type Proto = IbcClientConfigV2_pb;
}
