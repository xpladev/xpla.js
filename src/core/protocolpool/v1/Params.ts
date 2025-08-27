import { JSONSerializable } from '../../../util/json';
import { Int, Numeric } from '../../../core/numeric';
import { Params as ProtocolPoolParamsV1_pb } from '@xpla/xpla.proto/cosmos/protocolpool/v1/types';

export class ProtocolPoolParamsV1 extends JSONSerializable<
  ProtocolPoolParamsV1.Amino,
  ProtocolPoolParamsV1.Data,
  ProtocolPoolParamsV1.Proto
> {
  public distribution_frequency: Int;

  /**
   * @param enabled_distribution_denoms lists the denoms that are allowed to be distributed.
   * @param distribution_frequency is the frequency (in terms of blocks) that funds are distributed out from the x/protocolpool module.
   */
  constructor(
    public enabled_distribution_denoms: string[],
    distribution_frequency: Numeric.Input,
  ) {
    super();
    this.distribution_frequency = new Int(distribution_frequency);
  }

  public static fromAmino(
    data: ProtocolPoolParamsV1.Amino,
    _?: boolean
  ): ProtocolPoolParamsV1 {
    const {
      enabled_distribution_denoms,
      distribution_frequency,
    } = data;
    return new ProtocolPoolParamsV1(
      enabled_distribution_denoms,
      distribution_frequency,
    );
  }

  public toAmino(_?: boolean): ProtocolPoolParamsV1.Amino {
    const {
      enabled_distribution_denoms,
      distribution_frequency,
    } = this;

    const res: ProtocolPoolParamsV1.Amino = {
      enabled_distribution_denoms,
      distribution_frequency: distribution_frequency.toFixed(0),
    };

    return res;
  }

  public static fromData(
    data: ProtocolPoolParamsV1.Data,
    _?: boolean
  ): ProtocolPoolParamsV1 {
    const {
      enabled_distribution_denoms,
      distribution_frequency,
    } = data;
    return new ProtocolPoolParamsV1(
      enabled_distribution_denoms,
      distribution_frequency,
    );
  }

  public toData(_?: boolean): ProtocolPoolParamsV1.Data {
    const {
      enabled_distribution_denoms,
      distribution_frequency,
    } = this;

    const res: ProtocolPoolParamsV1.Data = {
      '@type': '/cosmos.protocolpool.v1.Params',
      enabled_distribution_denoms,
      distribution_frequency: distribution_frequency.toFixed(0),
    };

    return res;
  }

  public static fromProto(
    proto: ProtocolPoolParamsV1.Proto,
  ): ProtocolPoolParamsV1 {
    return new ProtocolPoolParamsV1(
      proto.enabledDistributionDenoms,
      proto.distributionFrequency.toString(),
    );
  }

  public toProto(): ProtocolPoolParamsV1.Proto {
    const {
      enabled_distribution_denoms,
      distribution_frequency,
    } = this;
    return ProtocolPoolParamsV1_pb.fromPartial({
      enabledDistributionDenoms: enabled_distribution_denoms,
      distributionFrequency: distribution_frequency.toFixed(0),
    });
  }
}

export namespace ProtocolPoolParamsV1 {
  export interface Amino {
    enabled_distribution_denoms: string[];
    distribution_frequency: string;
  }

  export interface Data {
    '@type': '/cosmos.protocolpool.v1.Params';
    enabled_distribution_denoms: string[];
    distribution_frequency: string;
  }

  export type Proto = ProtocolPoolParamsV1_pb;
}
