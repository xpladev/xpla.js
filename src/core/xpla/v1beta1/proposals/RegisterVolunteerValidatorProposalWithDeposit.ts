/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { Coin } from '@xpla/xpla.proto/cosmos/base/v1beta1/coin';
import { Description } from '@xpla/xpla.proto/cosmos/staking/v1beta1/staking';
import { RegisterVolunteerValidatorProposalWithDeposit as RegisterVolunteerValidatorProposalWithDeposit_pb } from '@xpla/xpla.proto/xpla/volunteer/v1beta1/proposal';

/**
 * Basic proposal which describes the candidate proposition that must be put into effect
 * manually if passed. Used as a general-purpose way of discovering community's
 * sentiment / interest for an arbitrary change.
 */
export class RegisterVolunteerValidatorProposalWithDeposit extends JSONSerializable<
  RegisterVolunteerValidatorProposalWithDeposit.Amino,
  RegisterVolunteerValidatorProposalWithDeposit.Data,
  RegisterVolunteerValidatorProposalWithDeposit.Proto
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
    public amount: Coin | undefined,
    public deposit: string
  ) {
    super();
  }

  public static fromAmino(
    data: RegisterVolunteerValidatorProposalWithDeposit.Amino,
    _isClassic?: boolean
  ): RegisterVolunteerValidatorProposalWithDeposit {
    const {
      value: {
        title,
        description,
        validatorDescription,
        delegatorAddress,
        validatorAddress,
        pubkey,
        amount,
        deposit,
      },
    } = data;
    return new RegisterVolunteerValidatorProposalWithDeposit(
      title,
      description,
      validatorDescription,
      delegatorAddress,
      validatorAddress,
      pubkey,
      amount,
      deposit
    );
  }

  public toAmino(
    _isClassic?: boolean
  ): RegisterVolunteerValidatorProposalWithDeposit.Amino {
    const {
      title,
      description,
      validatorDescription,
      delegatorAddress,
      validatorAddress,
      pubkey,
      amount,
      deposit,
    } = this;
    return {
      type: 'xpla/RegisterVolunteerValidatorProposalWithDeposit',
      value: {
        title,
        description,
        validatorDescription,
        delegatorAddress,
        validatorAddress,
        pubkey,
        amount,
        deposit,
      },
    };
  }

  public static fromData(
    proto: RegisterVolunteerValidatorProposalWithDeposit.Data,
    _isClassic?: boolean
  ): RegisterVolunteerValidatorProposalWithDeposit {
    const {
      title,
      description,
      validatorDescription,
      delegatorAddress,
      validatorAddress,
      pubkey,
      amount,
      deposit,
    } = proto;
    return new RegisterVolunteerValidatorProposalWithDeposit(
      title,
      description,
      validatorDescription,
      delegatorAddress,
      validatorAddress,
      pubkey,
      amount,
      deposit
    );
  }

  public toData(
    _isClassic?: boolean
  ): RegisterVolunteerValidatorProposalWithDeposit.Data {
    const {
      title,
      description,
      validatorDescription,
      delegatorAddress,
      validatorAddress,
      pubkey,
      amount,
      deposit,
    } = this;
    return {
      '@type':
        '/xpla.volunteer.v1beta1.RegisterVolunteerValidatorProposalWithDeposit',
      title,
      description,
      validatorDescription,
      delegatorAddress,
      validatorAddress,
      pubkey,
      amount,
      deposit,
    };
  }

  public static fromProto(
    proto: RegisterVolunteerValidatorProposalWithDeposit.Proto,
    _isClassic?: boolean
  ): RegisterVolunteerValidatorProposalWithDeposit {
    return new RegisterVolunteerValidatorProposalWithDeposit(
      proto.title,
      proto.description,
      proto.validatorDescription,
      proto.delegatorAddress,
      proto.validatorAddress,
      proto.pubkey,
      proto.amount,
      proto.deposit
    );
  }

  public toProto(
    _isClassic?: boolean
  ): RegisterVolunteerValidatorProposalWithDeposit.Proto {
    const {
      title,
      description,
      validatorDescription,
      delegatorAddress,
      validatorAddress,
      pubkey,
      amount,
      deposit,
    } = this;
    return RegisterVolunteerValidatorProposalWithDeposit_pb.fromPartial({
      title,
      description,
      validatorDescription,
      delegatorAddress,
      validatorAddress,
      pubkey,
      amount,
      deposit,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl:
        '/xpla.volunteer.v1beta1.RegisterVolunteerValidatorProposalWithDeposit',
      value: RegisterVolunteerValidatorProposalWithDeposit_pb.encode(
        this.toProto(isClassic)
      ).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): RegisterVolunteerValidatorProposalWithDeposit {
    return RegisterVolunteerValidatorProposalWithDeposit.fromProto(
      RegisterVolunteerValidatorProposalWithDeposit_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace RegisterVolunteerValidatorProposalWithDeposit {
  export interface Amino {
    type: 'xpla/RegisterVolunteerValidatorProposalWithDeposit';
    value: {
      title: string;
      description: string;
      validatorDescription: Description | undefined;
      delegatorAddress: AccAddress;
      validatorAddress: AccAddress;
      pubkey: Any | undefined;
      amount: Coin | undefined;
      deposit: string;
    };
  }

  export interface Data {
    '@type': '/xpla.volunteer.v1beta1.RegisterVolunteerValidatorProposalWithDeposit';
    title: string;
    description: string;
    validatorDescription: Description | undefined;
    delegatorAddress: AccAddress;
    validatorAddress: AccAddress;
    pubkey: Any | undefined;
    amount: Coin | undefined;
    deposit: string;
  }

  export type Proto = RegisterVolunteerValidatorProposalWithDeposit_pb;
}
