/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../util/json';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { Coin } from '@xpla/xpla.proto/cosmos/base/v1beta1/coin';
import { Description } from '@xpla/xpla.proto/cosmos/staking/v1beta1/staking';
import { RegisterVolunteerValidatorProposal as RegisterVolunteerValidatorProposal_pb } from '@xpla/xpla.proto/xpla/volunteer/v1beta1/proposal';

/**
 * Basic proposal which describes the candidate proposition that must be put into effect
 * manually if passed. Used as a general-purpose way of discovering community's
 * sentiment / interest for an arbitrary change.
 */
export class RegisterVolunteerValidatorProposal extends JSONSerializable<
  RegisterVolunteerValidatorProposal.Amino,
  RegisterVolunteerValidatorProposal.Data,
  RegisterVolunteerValidatorProposal.Proto
> {
  /**
   * @param title proposal's title
   * @param description proposal's description
   */
  constructor(
    public title: string,
    public description: string,
    public validatorDescription: Description | undefined,
    public delegatorAddress: string,
    public validatorAddress: string,
    public pubkey: Any | undefined,
    public amount: Coin | undefined
  ) {
    super();
  }

  public static fromAmino(
    data: RegisterVolunteerValidatorProposal.Amino,
    _isClassic?: boolean
  ): RegisterVolunteerValidatorProposal {
    const {
      value: {
        title,
        description,
        validatorDescription,
        delegatorAddress,
        validatorAddress,
        pubkey,
        amount,
      },
    } = data;
    return new RegisterVolunteerValidatorProposal(
      title,
      description,
      validatorDescription,
      delegatorAddress,
      validatorAddress,
      pubkey,
      amount
    );
  }

  public toAmino(
    _isClassic?: boolean
  ): RegisterVolunteerValidatorProposal.Amino {
    const {
      title,
      description,
      validatorDescription,
      delegatorAddress,
      validatorAddress,
      pubkey,
      amount,
    } = this;
    return {
      type: 'xpla/RegisterVolunteerValidatorProposal',
      value: {
        title,
        description,
        validatorDescription,
        delegatorAddress,
        validatorAddress,
        pubkey,
        amount,
      },
    };
  }

  public static fromData(
    proto: RegisterVolunteerValidatorProposal.Data,
    _isClassic?: boolean
  ): RegisterVolunteerValidatorProposal {
    const {
      title,
      description,
      validatorDescription,
      delegatorAddress,
      validatorAddress,
      pubkey,
      amount,
    } = proto;
    return new RegisterVolunteerValidatorProposal(
      title,
      description,
      validatorDescription,
      delegatorAddress,
      validatorAddress,
      pubkey,
      amount
    );
  }

  public toData(_isClassic?: boolean): RegisterVolunteerValidatorProposal.Data {
    const {
      title,
      description,
      validatorDescription,
      delegatorAddress,
      validatorAddress,
      pubkey,
      amount,
    } = this;
    return {
      '@type': '/xpla.volunteer.v1beta1.RegisterVolunteerValidatorProposal',
      title,
      description,
      validatorDescription,
      delegatorAddress,
      validatorAddress,
      pubkey,
      amount,
    };
  }

  public static fromProto(
    proto: RegisterVolunteerValidatorProposal.Proto,
    _isClassic?: boolean
  ): RegisterVolunteerValidatorProposal {
    return new RegisterVolunteerValidatorProposal(
      proto.title,
      proto.description,
      proto.validatorDescription,
      proto.delegatorAddress,
      proto.validatorAddress,
      proto.pubkey,
      proto.amount
    );
  }

  public toProto(
    _isClassic?: boolean
  ): RegisterVolunteerValidatorProposal.Proto {
    const {
      title,
      description,
      validatorDescription,
      delegatorAddress,
      validatorAddress,
      pubkey,
      amount,
    } = this;
    return RegisterVolunteerValidatorProposal_pb.fromPartial({
      title,
      description,
      validatorDescription,
      delegatorAddress,
      validatorAddress,
      pubkey,
      amount,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/xpla.volunteer.v1beta1.RegisterVolunteerValidatorProposal',
      value: RegisterVolunteerValidatorProposal_pb.encode(
        this.toProto(isClassic)
      ).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): RegisterVolunteerValidatorProposal {
    return RegisterVolunteerValidatorProposal.fromProto(
      RegisterVolunteerValidatorProposal_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace RegisterVolunteerValidatorProposal {
  export interface Amino {
    type: 'xpla/RegisterVolunteerValidatorProposal';
    value: {
      title: string;
      description: string;
      validatorDescription: Description | undefined;
      delegatorAddress: string;
      validatorAddress: string;
      pubkey: Any | undefined;
      amount: Coin | undefined;
    };
  }

  export interface Data {
    '@type': '/xpla.volunteer.v1beta1.RegisterVolunteerValidatorProposal';
    title: string;
    description: string;
    validatorDescription: Description | undefined;
    delegatorAddress: string;
    validatorAddress: string;
    pubkey: Any | undefined;
    amount: Coin | undefined;
  }

  export type Proto = RegisterVolunteerValidatorProposal_pb;
}
