import { JSONSerializable } from '../../../../util/json';
import { Int, Numeric } from '../../../../core/numeric';
import { Params as IbcConnectionParamsV1_pb } from '@xpla/xpla.proto/ibc/core/connection/v1/connection';

/**
 * Params defines the set of IBC light client parameters.
 */
export class IbcConnectionParamsV1 extends JSONSerializable<
  IbcConnectionParamsV1.Amino,
  IbcConnectionParamsV1.Data,
  IbcConnectionParamsV1.Proto
> {
  public max_expected_time_per_block: Int;

  /**
   * @param allowed_clients allowed_clients defines the list of allowed client state types.
   */
  constructor(
    max_expected_time_per_block: Numeric.Input,
  ) {
    super();
    this.max_expected_time_per_block = new Int(max_expected_time_per_block);
  }

  public static fromAmino(data: IbcConnectionParamsV1.Amino): IbcConnectionParamsV1 {
    const { max_expected_time_per_block } = data;
    return new IbcConnectionParamsV1(max_expected_time_per_block);
  }

  public toAmino(): IbcConnectionParamsV1.Amino {
    const { max_expected_time_per_block } = this;
    const res: IbcConnectionParamsV1.Amino = {
      max_expected_time_per_block: max_expected_time_per_block.toFixed(),
    };
    return res;
  }

  public static fromData(data: IbcConnectionParamsV1.Data): IbcConnectionParamsV1 {
    const { max_expected_time_per_block } = data;
    return new IbcConnectionParamsV1(max_expected_time_per_block);
  }

  public toData(): IbcConnectionParamsV1.Data {
    const { max_expected_time_per_block } = this;
    const res: IbcConnectionParamsV1.Data = {
      max_expected_time_per_block: max_expected_time_per_block.toFixed(),
    };
    return res;
  }

  public static fromProto(proto: IbcConnectionParamsV1.Proto): IbcConnectionParamsV1 {
    return new IbcConnectionParamsV1(
      proto.maxExpectedTimePerBlock.toString(),
    );
  }

  public toProto(): IbcConnectionParamsV1.Proto {
    const { max_expected_time_per_block } = this;
    return IbcConnectionParamsV1_pb.fromPartial({
      maxExpectedTimePerBlock: max_expected_time_per_block.toFixed(),
    });
  }
}

export namespace IbcConnectionParamsV1 {
  export interface Amino {
    max_expected_time_per_block: string;
  }

  export interface Data {
    max_expected_time_per_block: string;
  }

  export type Proto = IbcConnectionParamsV1_pb;
}
