/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { Coin } from '../../../Coin';
import { AccAddress } from '../../../bech32';
import { ValidatorV1B1 } from '../../../staking/v1beta1/Validator';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgRegisterVolunteerValidator as MsgRegisterVolunteerValidatorV1B1_pb } from '@xpla/xpla.proto/xpla/volunteer/v1beta1/tx';

export class MsgRegisterVolunteerValidatorV1B1 extends JSONSerializable<
  MsgRegisterVolunteerValidatorV1B1.Amino,
  MsgRegisterVolunteerValidatorV1B1.Data,
  MsgRegisterVolunteerValidatorV1B1.Proto
> {
  /**
   * @param authority
   * @param validator_description
   * @param delegator_address
   * @param validator_address
   * @param pubkey
   * @param amount
   */
  constructor(
    public authority: AccAddress,
    public validator_description: ValidatorV1B1.Description | undefined,
    public delegator_address: AccAddress,
    public validator_address: AccAddress,
    public pubkey: Any | undefined,
    public amount: Coin | undefined,
  ) {
    super();
  }

  public static fromAmino(
    data: MsgRegisterVolunteerValidatorV1B1.Amino,
    _isClassic?: boolean
  ): MsgRegisterVolunteerValidatorV1B1 {
    const {
      value: {
        authority,
        validator_description,
        delegator_address,
        validator_address,
        pubkey,
        amount,
      },
    } = data;
    return new MsgRegisterVolunteerValidatorV1B1(
      authority,
      validator_description ? ValidatorV1B1.Description.fromAmino(validator_description) : undefined,
      delegator_address,
      validator_address,
      pubkey ? Any.fromPartial(pubkey): undefined,
      amount ? Coin.fromAmino(amount) : undefined,
    );
  }

  public toAmino(_isClassic?: boolean): MsgRegisterVolunteerValidatorV1B1.Amino {
    const {
      authority,
      validator_description,
      delegator_address,
      validator_address,
      pubkey,
      amount,
    } = this;
    return {
      type: 'xpladev/MsgRegisterVolunteerValidator',
      value: {
        authority,
        validator_description: validator_description?.toAmino(),
        delegator_address,
        validator_address,
        pubkey,
        amount: amount?.toAmino(),
      },
    };
  }

  public static fromData(
    data: MsgRegisterVolunteerValidatorV1B1.Data,
    _isClassic?: boolean
  ): MsgRegisterVolunteerValidatorV1B1 {
    const {
      authority,
      validator_description,
      delegator_address,
      validator_address,
      pubkey,
      amount,
    } = data;

    return new MsgRegisterVolunteerValidatorV1B1(
      authority,
      validator_description ? ValidatorV1B1.Description.fromData(validator_description) : undefined,
      delegator_address,
      validator_address,
      Any.fromJSON(pubkey),
      amount ? Coin.fromData(amount) : undefined,
    );
  }

  public toData(_isClassic?: boolean): MsgRegisterVolunteerValidatorV1B1.Data {
    const {
      authority,
      validator_description,
      delegator_address,
      validator_address,
      pubkey,
      amount,
    } = this;
    return {
      '@type': '/xpla.volunteer.v1beta1.MsgRegisterVolunteerValidator',
      authority,
      validator_description: validator_description?.toData(),
      delegator_address,
      validator_address,
      pubkey: pubkey ? Any.toJSON(pubkey) : undefined,
      amount: amount?.toData(),
    };
  }

  public static fromProto(
    proto: MsgRegisterVolunteerValidatorV1B1.Proto,
    _isClassic?: boolean
  ): MsgRegisterVolunteerValidatorV1B1 {
    return new MsgRegisterVolunteerValidatorV1B1(
      proto.authority,
      proto.validatorDescription ? ValidatorV1B1.Description.fromProto(proto.validatorDescription) : undefined,
      proto.delegatorAddress,
      proto.validatorAddress,
      proto.pubkey,
      proto.amount ? Coin.fromProto(proto.amount) : undefined,
    );
  }

  public toProto(_isClassic?: boolean): MsgRegisterVolunteerValidatorV1B1.Proto {
    const {
      authority,
      validator_description,
      delegator_address,
      validator_address,
      pubkey,
      amount,
    } = this;
    return MsgRegisterVolunteerValidatorV1B1_pb.fromPartial({
      authority,
      validatorDescription: validator_description?.toProto(),
      delegatorAddress: delegator_address,
      validatorAddress: validator_address,
      pubkey,
      amount: amount?.toProto(),
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/xpla.volunteer.v1beta1.MsgRegisterVolunteerValidator',
      value: MsgRegisterVolunteerValidatorV1B1_pb.encode(
        this.toProto(isClassic)
      ).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgRegisterVolunteerValidatorV1B1 {
    return MsgRegisterVolunteerValidatorV1B1.fromProto(
      MsgRegisterVolunteerValidatorV1B1_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgRegisterVolunteerValidatorV1B1 {
  export interface Amino {
    type: 'xpladev/MsgRegisterVolunteerValidator';
    value: {
      authority: AccAddress;
      validator_description?: ValidatorV1B1.Description.Amino;
      delegator_address: AccAddress;
      validator_address: AccAddress;
      pubkey?: any;
      amount?: Coin.Amino;
    };
  }

  export interface Data {
    '@type': '/xpla.volunteer.v1beta1.MsgRegisterVolunteerValidator';
    authority: AccAddress;
    validator_description?: ValidatorV1B1.Description.Data;
    delegator_address: AccAddress;
    validator_address: AccAddress;
    pubkey?: any;
    amount?: Coin.Data;
  }

  export type Proto = MsgRegisterVolunteerValidatorV1B1_pb;
}
