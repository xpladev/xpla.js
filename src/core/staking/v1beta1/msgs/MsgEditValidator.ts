/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { Dec, Int } from '../../../numeric';
import { ValAddress } from '../../../bech32';
import { ValidatorV1B1 } from '../Validator';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgEditValidator as MsgEditValidatorV1B1_pb } from '@xpla/xpla.proto/cosmos/staking/v1beta1/tx';

/**
 * A validator can edit its delegate information, such as moniker, website, commission
 * rate, etc.
 *
 * You must use special or sentinel values to inform that you want to leave the current
 * field untouched. For `Description`,` you should start with [[MsgEditValidatorV1B1.DESC_DO_NOT_MODIFY]] and
 * change each field you wish to modify individually.
 */
export class MsgEditValidatorV1B1 extends JSONSerializable<
  MsgEditValidatorV1B1.Amino,
  MsgEditValidatorV1B1.Data,
  MsgEditValidatorV1B1.Proto
> {
  /**
   * @param Description new description to apply
   * @param address new address to apply
   * @param commission_rate new commission rates to apply
   * @param min_self_delegation new min self delegation
   */
  constructor(
    public description: ValidatorV1B1.Description,
    public validator_address: ValAddress,
    public commission_rate?: Dec,
    public min_self_delegation?: Int
  ) {
    super();
  }

  public static fromAmino(
    data: MsgEditValidatorV1B1.Amino,
    _isClassic?: boolean
  ): MsgEditValidatorV1B1 {
    const {
      value: {
        description,
        validator_address,
        commission_rate,
        min_self_delegation,
      },
    } = data;
    return new MsgEditValidatorV1B1(
      ValidatorV1B1.Description.fromAmino(description),
      validator_address,
      commission_rate ? new Dec(commission_rate) : undefined,
      min_self_delegation ? new Int(min_self_delegation) : undefined
    );
  }

  public toAmino(isClassic?: boolean): MsgEditValidatorV1B1.Amino {
    const {
      description,
      validator_address,
      commission_rate,
      min_self_delegation,
    } = this;
    return {
      type: isClassic
        ? 'staking/MsgEditValidator'
        : 'cosmos-sdk/MsgEditValidator',
      value: {
        description,
        validator_address,
        commission_rate: commission_rate
          ? commission_rate.toString()
          : undefined,
        min_self_delegation: min_self_delegation
          ? min_self_delegation.toString()
          : undefined,
      },
    };
  }

  public static fromProto(
    data: MsgEditValidatorV1B1.Proto,
    _isClassic?: boolean
  ): MsgEditValidatorV1B1 {
    return new MsgEditValidatorV1B1(
      ValidatorV1B1.Description.fromProto(
        data.description as ValidatorV1B1.Description.Proto
      ),
      data.validatorAddress,
      data.commissionRate !== '' ? new Dec(data.commissionRate) : undefined,
      data.minSelfDelegation !== ''
        ? new Int(data.minSelfDelegation)
        : undefined
    );
  }

  public toProto(_isClassic?: boolean): MsgEditValidatorV1B1.Proto {
    const {
      description,
      validator_address,
      commission_rate,
      min_self_delegation,
    } = this;
    return MsgEditValidatorV1B1_pb.fromPartial({
      description: description.toProto(),
      commissionRate: commission_rate?.toString() ?? '',
      minSelfDelegation: min_self_delegation?.toString() ?? '',
      validatorAddress: validator_address,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.staking.v1beta1.MsgEditValidator',
      value: MsgEditValidatorV1B1_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgEditValidatorV1B1 {
    return MsgEditValidatorV1B1.fromProto(
      MsgEditValidatorV1B1_pb.decode(msgAny.value),
      isClassic
    );
  }

  public static fromData(
    data: MsgEditValidatorV1B1.Data,
    _isClassic?: boolean
  ): MsgEditValidatorV1B1 {
    const {
      description,
      validator_address,
      commission_rate,
      min_self_delegation,
    } = data;
    return new MsgEditValidatorV1B1(
      ValidatorV1B1.Description.fromData(description),
      validator_address,
      commission_rate ? new Dec(commission_rate) : undefined,
      min_self_delegation ? new Int(min_self_delegation) : undefined
    );
  }

  public toData(_isClassic?: boolean): MsgEditValidatorV1B1.Data {
    const {
      description,
      validator_address,
      commission_rate,
      min_self_delegation,
    } = this;
    return {
      '@type': '/cosmos.staking.v1beta1.MsgEditValidator',
      description,
      validator_address,
      commission_rate: commission_rate ? commission_rate.toString() : undefined,
      min_self_delegation: min_self_delegation
        ? min_self_delegation.toString()
        : undefined,
    };
  }
}

export namespace MsgEditValidatorV1B1 {
  export const DESC_DO_NOT_MODIFY: ValidatorV1B1.Description.Amino = {
    moniker: '[do-not-modify]',
    website: '[do-not-modify]',
    identity: '[do-not-modify]',
    details: '[do-not-modify]',
    security_contact: '[do-not-modify]',
  };

  export interface Amino {
    type: 'staking/MsgEditValidator' | 'cosmos-sdk/MsgEditValidator';
    value: {
      description: ValidatorV1B1.Description.Amino;
      validator_address: ValAddress;
      commission_rate?: string;
      min_self_delegation?: string;
    };
  }

  export interface Data {
    '@type': '/cosmos.staking.v1beta1.MsgEditValidator';
    description: ValidatorV1B1.Description.Data;
    validator_address: ValAddress;
    commission_rate?: string;
    min_self_delegation?: string;
  }

  export type Proto = MsgEditValidatorV1B1_pb;
}
