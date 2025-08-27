import { JSONSerializable } from '../../../../../util/json';
import { Numeric, Int } from '../../../../numeric';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { Fraction as FractionV1_pb } from '@xpla/xpla.proto/ibc/lightclients/tendermint/v1/tendermint';

/**
 * Header defines the Tendermint client consensus Header.
 */
export class FractionV1 extends JSONSerializable<any, FractionV1.Data, FractionV1.Proto> {
  public numerator: Int;
  public denominator: Int;

  /**
   * @param numerator
   * @param denominator
   */
  constructor(
    numerator: Numeric.Input,
    denominator: Numeric.Input,
  ) {
    super();
    this.numerator = new Int(numerator);
    this.denominator = new Int(denominator);
  }

  public static fromAmino(_: any): FractionV1 {
    throw new Error('Amino not supported');
  }

  public toAmino(): any {
    throw new Error('Amino not supported');
  }

  public static fromData(data: FractionV1.Data): FractionV1 {
    const { numerator, denominator } = data;
    return new FractionV1(numerator, denominator);
  }

  public toData(): FractionV1.Data {
    const { numerator, denominator } = this;
    return {
      '@type': '/ibc.lightclients.tendermint.v1.Fraction',
      numerator: numerator.toFixed(0),
      denominator: denominator.toFixed(0),
    };
  }

  public static fromProto(proto: FractionV1.Proto): FractionV1 {
    const { numerator, denominator } = proto;
    return new FractionV1(numerator.toString(), denominator.toString());
  }

  public toProto(): FractionV1.Proto {
    const { numerator, denominator } = this;
    return FractionV1_pb.fromPartial({
      numerator: numerator.toFixed(0),
      denominator: denominator.toFixed(0),
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/ibc.lightclients.tendermint.v1.Fraction',
      value: FractionV1_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any): FractionV1 {
    return FractionV1.fromProto(FractionV1_pb.decode(msgAny.value));
  }
}

export namespace FractionV1 {
  export interface Data {
    '@type': '/ibc.lightclients.tendermint.v1.Fraction';
    numerator: string;
    denominator: string;
  }

  export type Proto = FractionV1_pb;
}
