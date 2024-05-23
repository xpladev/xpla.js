/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { UnregisterVolunteerValidatorProposal as UnregisterVolunteerValidatorProposal_pb } from '@xpla/xpla.proto/xpla/volunteer/v1beta1/proposal';

/**
 * Basic proposal which describes the candidate proposition that must be put into effect
 * manually if passed. Used as a general-purpose way of discovering community's
 * sentiment / interest for an arbitrary change.
 */
export class UnregisterVolunteerValidatorProposal extends JSONSerializable<
  UnregisterVolunteerValidatorProposal.Amino,
  UnregisterVolunteerValidatorProposal.Data,
  UnregisterVolunteerValidatorProposal.Proto
> {
  /**
   * @param title proposal's title
   * @param description proposal's description
   */
  constructor(
    public title: string,
    public description: string,
    public validatorAddress: AccAddress
  ) {
    super();
  }

  public static fromAmino(
    data: UnregisterVolunteerValidatorProposal.Amino,
    _isClassic?: boolean
  ): UnregisterVolunteerValidatorProposal {
    const {
      value: { title, description, validatorAddress },
    } = data;
    return new UnregisterVolunteerValidatorProposal(
      title,
      description,
      validatorAddress
    );
  }

  public toAmino(
    _isClassic?: boolean
  ): UnregisterVolunteerValidatorProposal.Amino {
    const { title, description, validatorAddress } = this;
    return {
      type: 'xpla/UnregisterVolunteerValidatorProposal',
      value: {
        title,
        description,
        validatorAddress,
      },
    };
  }

  public static fromData(
    proto: UnregisterVolunteerValidatorProposal.Data,
    _isClassic?: boolean
  ): UnregisterVolunteerValidatorProposal {
    const { title, description, validatorAddress } = proto;
    return new UnregisterVolunteerValidatorProposal(
      title,
      description,
      validatorAddress
    );
  }

  public toData(
    _isClassic?: boolean
  ): UnregisterVolunteerValidatorProposal.Data {
    const { title, description, validatorAddress } = this;
    return {
      '@type': '/xpla.volunteer.v1beta1.UnregisterVolunteerValidatorProposal',
      title,
      description,
      validatorAddress,
    };
  }

  public static fromProto(
    proto: UnregisterVolunteerValidatorProposal.Proto,
    _isClassic?: boolean
  ): UnregisterVolunteerValidatorProposal {
    return new UnregisterVolunteerValidatorProposal(
      proto.title,
      proto.description,
      proto.validatorAddress
    );
  }

  public toProto(
    _isClassic?: boolean
  ): UnregisterVolunteerValidatorProposal.Proto {
    const { title, description, validatorAddress } = this;
    return UnregisterVolunteerValidatorProposal_pb.fromPartial({
      title,
      description,
      validatorAddress,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/xpla.volunteer.v1beta1.UnregisterVolunteerValidatorProposal',
      value: UnregisterVolunteerValidatorProposal_pb.encode(
        this.toProto(isClassic)
      ).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): UnregisterVolunteerValidatorProposal {
    return UnregisterVolunteerValidatorProposal.fromProto(
      UnregisterVolunteerValidatorProposal_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace UnregisterVolunteerValidatorProposal {
  export interface Amino {
    type: 'xpla/UnregisterVolunteerValidatorProposal';
    value: {
      title: string;
      description: string;
      validatorAddress: AccAddress;
    };
  }

  export interface Data {
    '@type': '/xpla.volunteer.v1beta1.UnregisterVolunteerValidatorProposal';
    title: string;
    description: string;
    validatorAddress: AccAddress;
  }

  export type Proto = UnregisterVolunteerValidatorProposal_pb;
}
