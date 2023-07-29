import { JSONSerializable } from '../../../util/json';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { TextProposal as TextProposal_pb } from '@terra-money/terra.proto/cosmos/gov/v1beta1/gov';
import { TextProposal } from './TextProposal';

export interface RegisterVolunteerValidatorProposal_pb extends TextProposal_pb {
  validator_description: {
    moniker: string;
    identity: string;
    website: string;
    security_contact: string;
    details: string;
  };
}

/**
 * Basic proposal which describes the candidate proposition that must be put into effect
 * manually if passed. Used as a general-purpose way of discovering community's
 * sentiment / interest for an arbitrary change.
 */
export class RegisterVolunteerValidatorProposal extends JSONSerializable<
  RegisterVolunteerValidatorProposal.Amino,
  RegisterVolunteerValidatorProposal.Data,
  TextProposal.Proto
> {
  /**
   * @param title proposal's title
   * @param description proposal's description
   */
  constructor(
    public title: string,
    public description: string,
    public validator_description: {
      moniker: string;
      identity: string;
      website: string;
      security_contact: string;
      details: string;
    }
  ) {
    super();
  }

  public static fromAmino(
    data: RegisterVolunteerValidatorProposal.Amino,
    _?: boolean
  ): RegisterVolunteerValidatorProposal {
    _;
    const {
      value: { title, description, validator_description },
    } = data;
    return new RegisterVolunteerValidatorProposal(
      title,
      description,
      validator_description
    );
  }

  public toAmino(_?: boolean): RegisterVolunteerValidatorProposal.Amino {
    _;
    const { title, description, validator_description } = this;
    return {
      type: 'xpla.volunteer.v1beta1.RegisterVolunteerValidatorProposal',
      value: {
        title,
        description,
        validator_description,
      },
    };
  }

  public static fromData(
    proto: RegisterVolunteerValidatorProposal.Data,
    _?: boolean
  ): RegisterVolunteerValidatorProposal {
    _;
    const { title, description, validator_description } = proto;
    return new RegisterVolunteerValidatorProposal(
      title,
      description,
      validator_description
    );
  }

  public toData(_?: boolean): RegisterVolunteerValidatorProposal.Data {
    _;
    const { title, description, validator_description } = this;
    return {
      '@type': '/xpla.volunteer.v1beta1.RegisterVolunteerValidatorProposal',
      title,
      description,
      validator_description,
    };
  }

  public static fromProto(
    proto: RegisterVolunteerValidatorProposal.Proto,
    _?: boolean
  ): RegisterVolunteerValidatorProposal {
    _;
    return new RegisterVolunteerValidatorProposal(
      proto.title,
      proto.description,
      proto.validator_description
    );
  }

  public toProto(_?: boolean): TextProposal.Proto {
    _;
    const { title, description } = this;
    return TextProposal_pb.fromPartial({
      title,
      description: description,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.gov.v1beta1.TextProposal',
      value: TextProposal_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  // public static unpackAny(
  //   msgAny: Any,
  //   isClassic?: boolean
  // ): RegisterVolunteerValidatorProposal {
  //   return RegisterVolunteerValidatorProposal.fromProto(
  //     TextProposal_pb.decode(msgAny.value),
  //     isClassic
  //   );
  // }
}

export namespace RegisterVolunteerValidatorProposal {
  export interface Amino {
    type: 'xpla.volunteer.v1beta1.RegisterVolunteerValidatorProposal';
    value: {
      title: string;
      description: string;
      validator_description: {
        moniker: string;
        identity: string;
        website: string;
        security_contact: string;
        details: string;
      };
    };
  }

  export interface Data {
    '@type': '/xpla.volunteer.v1beta1.RegisterVolunteerValidatorProposal';
    title: string;
    description: string;
    validator_description: {
      moniker: string;
      identity: string;
      website: string;
      security_contact: string;
      details: string;
    };
  }

  export type Proto = RegisterVolunteerValidatorProposal_pb;
}
