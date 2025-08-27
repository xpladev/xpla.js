import { JSONSerializable } from '../../../../../util/json';
import { HeightV1 } from '../../../core/client/v1/Height';
import { SignedHeader, ValidatorSet } from '../../../../tendermint/types';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { Header as HeaderV1_pb } from '@xpla/xpla.proto/ibc/lightclients/tendermint/v1/tendermint';

/**
 * Header defines the Tendermint client consensus Header.
 */
export class HeaderV1 extends JSONSerializable<any, HeaderV1.Data, HeaderV1.Proto> {
  /**
   * @param signed_header
   * @param validator_set
   * @param trusted_height
   * @param trusted_validators
   */
  constructor(
    public signed_header: SignedHeader | undefined,
    public validator_set: ValidatorSet | undefined,
    public trusted_height: HeightV1 | undefined,
    public trusted_validators: ValidatorSet | undefined,
  ) {
    super();
  }

  public static fromAmino(_: any): HeaderV1 {
    throw new Error('Amino not supported');
  }

  public toAmino(): any {
    throw new Error('Amino not supported');
  }

  public static fromData(data: HeaderV1.Data): HeaderV1 {
    const {
      signed_header,
      validator_set,
      trusted_height,
      trusted_validators,
    } = data;
    return new HeaderV1(
      signed_header ? SignedHeader.fromData(signed_header) : undefined,
      validator_set ? ValidatorSet.fromData(validator_set) : undefined,
      trusted_height ? HeightV1.fromData(trusted_height) : undefined,
      trusted_validators ? ValidatorSet.fromData(trusted_validators) : undefined,
    );
  }

  public toData(): HeaderV1.Data {
    const {
      signed_header,
      validator_set,
      trusted_height,
      trusted_validators,
    } = this;
    return {
      '@type': '/ibc.lightclients.tendermint.v1.Header',
      signed_header: signed_header?.toData(),
      validator_set: validator_set?.toData(),
      trusted_height: trusted_height?.toData(),
      trusted_validators: trusted_validators?.toData(),
    };
  }

  public static fromProto(proto: HeaderV1.Proto): HeaderV1 {
    const {
      signedHeader,
      validatorSet,
      trustedHeight,
      trustedValidators,
    } = proto;
    return new HeaderV1(
      signedHeader ? SignedHeader.fromProto(signedHeader) : undefined,
      validatorSet ? ValidatorSet.fromProto(validatorSet) : undefined,
      trustedHeight ? HeightV1.fromProto(trustedHeight) : undefined,
      trustedValidators ? ValidatorSet.fromProto(trustedValidators) : undefined,
    );
  }

  public toProto(): HeaderV1.Proto {
    const {
      signed_header,
      validator_set,
      trusted_height,
      trusted_validators,
    } = this;
    return HeaderV1_pb.fromPartial({
      signedHeader: signed_header?.toProto(),
      validatorSet: validator_set?.toProto(),
      trustedHeight: trusted_height?.toProto(),
      trustedValidators: trusted_validators?.toProto(),
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/ibc.lightclients.tendermint.v1.Header',
      value: HeaderV1_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any): HeaderV1 {
    return HeaderV1.fromProto(HeaderV1_pb.decode(msgAny.value));
  }
}

export namespace HeaderV1 {
  export interface Data {
    '@type': '/ibc.lightclients.tendermint.v1.Header';
    signed_header: SignedHeader.Data | undefined;
    validator_set: ValidatorSet.Data | undefined;
    trusted_height: HeightV1.Data | undefined;
    trusted_validators: ValidatorSet.Data | undefined;
  }

  export type Proto = HeaderV1_pb;
}
