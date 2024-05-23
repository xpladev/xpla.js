/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { UnregisterVolunteerValidatorProposalWithDeposit as UnregisterVolunteerValidatorProposalWithDeposit_pb } from '@xpla/xpla.proto/xpla/volunteer/v1beta1/proposal';

/**
 * Basic proposal which describes the candidate proposition that must be put into effect
 * manually if passed. Used as a general-purpose way of discovering community's
 * sentiment / interest for an arbitrary change.
 */
export class UnregisterVolunteerValidatorProposalWithDeposit extends JSONSerializable<
  UnregisterVolunteerValidatorProposalWithDeposit.Amino,
  UnregisterVolunteerValidatorProposalWithDeposit.Data,
  UnregisterVolunteerValidatorProposalWithDeposit.Proto
> {
  /**
   * @param title proposal's title
   * @param description proposal's description
   */
  constructor(
    public title: string,
    public description: string,
    public validatorAddress: AccAddress,
    public deposit: string
  ) {
    super();
  }

  public static fromAmino(
    data: UnregisterVolunteerValidatorProposalWithDeposit.Amino,
    _isClassic?: boolean
  ): UnregisterVolunteerValidatorProposalWithDeposit {
    const {
      value: { title, description, validatorAddress, deposit },
    } = data;
    return new UnregisterVolunteerValidatorProposalWithDeposit(
      title,
      description,
      validatorAddress,
      deposit
    );
  }

  public toAmino(
    _isClassic?: boolean
  ): UnregisterVolunteerValidatorProposalWithDeposit.Amino {
    const { title, description, validatorAddress, deposit } = this;
    return {
      type: 'xpla/UnregisterVolunteerValidatorProposalWithDeposit',
      value: {
        title,
        description,
        validatorAddress,
        deposit,
      },
    };
  }

  public static fromData(
    proto: UnregisterVolunteerValidatorProposalWithDeposit.Data,
    _isClassic?: boolean
  ): UnregisterVolunteerValidatorProposalWithDeposit {
    const { title, description, validatorAddress, deposit } = proto;
    return new UnregisterVolunteerValidatorProposalWithDeposit(
      title,
      description,
      validatorAddress,
      deposit
    );
  }

  public toData(
    _isClassic?: boolean
  ): UnregisterVolunteerValidatorProposalWithDeposit.Data {
    const { title, description, validatorAddress, deposit } = this;
    return {
      '@type':
        '/xpla.volunteer.v1beta1.UnregisterVolunteerValidatorProposalWithDeposit',
      title,
      description,
      validatorAddress,
      deposit,
    };
  }

  public static fromProto(
    proto: UnregisterVolunteerValidatorProposalWithDeposit.Proto,
    _isClassic?: boolean
  ): UnregisterVolunteerValidatorProposalWithDeposit {
    return new UnregisterVolunteerValidatorProposalWithDeposit(
      proto.title,
      proto.description,
      proto.validatorAddress,
      proto.deposit
    );
  }

  public toProto(
    _isClassic?: boolean
  ): UnregisterVolunteerValidatorProposalWithDeposit.Proto {
    const { title, description, validatorAddress, deposit } = this;
    return UnregisterVolunteerValidatorProposalWithDeposit_pb.fromPartial({
      title,
      description,
      validatorAddress,
      deposit,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl:
        '/xpla.volunteer.v1beta1.UnregisterVolunteerValidatorProposalWithDeposit',
      value: UnregisterVolunteerValidatorProposalWithDeposit_pb.encode(
        this.toProto(isClassic)
      ).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): UnregisterVolunteerValidatorProposalWithDeposit {
    return UnregisterVolunteerValidatorProposalWithDeposit.fromProto(
      UnregisterVolunteerValidatorProposalWithDeposit_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace UnregisterVolunteerValidatorProposalWithDeposit {
  export interface Amino {
    type: 'xpla/UnregisterVolunteerValidatorProposalWithDeposit';
    value: {
      title: string;
      description: string;
      validatorAddress: AccAddress;
      deposit: string;
    };
  }

  export interface Data {
    '@type': '/xpla.volunteer.v1beta1.UnregisterVolunteerValidatorProposalWithDeposit';
    title: string;
    description: string;
    validatorAddress: AccAddress;
    deposit: string;
  }

  export type Proto = UnregisterVolunteerValidatorProposalWithDeposit_pb;
}
