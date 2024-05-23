/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { Coin } from '../../../Coin';
import { Int } from '../../../numeric';
import { AccAddress, ValAddress } from '../../../bech32';
import { ValidatorV1B1 } from '../Validator';
import { ValConsPublicKey, PublicKey } from '../../../PublicKey';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgCreateValidator as MsgCreateValidatorV1B1_pb } from '@xpla/xpla.proto/cosmos/staking/v1beta1/tx';

/**
 * For new validators, this message registers a validator address to be a delegate on
 * the blockchain.
 */
export class MsgCreateValidatorV1B1 extends JSONSerializable<
  MsgCreateValidatorV1B1.Amino,
  MsgCreateValidatorV1B1.Data,
  MsgCreateValidatorV1B1.Proto
> {
  /**
   *
   * @param description validator's delegate information
   * @param commission validator's commission policy
   * @param min_self_delegation minimum self delegation
   * @param delegator_address validator's account address
   * @param validator_address validator's operator address
   * @param pubkey validator's consensus public key
   * @param value amount to use for self-delegation
   */
  constructor(
    public description: ValidatorV1B1.Description,
    public commission: ValidatorV1B1.CommissionRates,
    public min_self_delegation: Int,
    public delegator_address: AccAddress,
    public validator_address: ValAddress,
    public pubkey: ValConsPublicKey,
    public value: Coin
  ) {
    super();
  }

  public static fromAmino(
    data: MsgCreateValidatorV1B1.Amino,
    _isClassic?: boolean
  ): MsgCreateValidatorV1B1 {
    const {
      value: {
        description,
        commission,
        min_self_delegation,
        delegator_address,
        validator_address,
        pubkey,
        value,
      },
    } = data;
    return new MsgCreateValidatorV1B1(
      description,
      ValidatorV1B1.CommissionRates.fromAmino(commission),
      new Int(min_self_delegation),
      delegator_address,
      validator_address,
      ValConsPublicKey.fromAmino(pubkey),
      Coin.fromAmino(value)
    );
  }

  public toAmino(isClassic?: boolean): MsgCreateValidatorV1B1.Amino {
    const {
      description,
      commission,
      min_self_delegation,
      delegator_address,
      validator_address,
      pubkey,
      value,
    } = this;
    return {
      type: isClassic
        ? 'staking/MsgCreateValidator'
        : 'cosmos-sdk/MsgCreateValidator',
      value: {
        description,
        commission: commission.toAmino(),
        min_self_delegation: min_self_delegation.toString(),
        delegator_address,
        validator_address,
        pubkey: pubkey.toAmino(),
        value: value.toAmino(),
      },
    };
  }

  public static fromData(
    data: MsgCreateValidatorV1B1.Data,
    _isClassic?: boolean
  ): MsgCreateValidatorV1B1 {
    const {
      description,
      commission,
      min_self_delegation,
      delegator_address,
      validator_address,
      pubkey,
      value,
    } = data;
    return new MsgCreateValidatorV1B1(
      description,
      ValidatorV1B1.CommissionRates.fromData(commission),
      new Int(min_self_delegation),
      delegator_address,
      validator_address,
      ValConsPublicKey.fromData(pubkey),
      Coin.fromData(value)
    );
  }

  public toData(_isClassic?: boolean): MsgCreateValidatorV1B1.Data {
    const {
      description,
      commission,
      min_self_delegation,
      delegator_address,
      validator_address,
      pubkey,
      value,
    } = this;
    return {
      '@type': '/cosmos.staking.v1beta1.MsgCreateValidator',
      description,
      commission: commission.toData(),
      min_self_delegation: min_self_delegation.toString(),
      delegator_address,
      validator_address,
      pubkey: pubkey.toData(),
      value: value.toData(),
    };
  }

  public static fromProto(
    proto: MsgCreateValidatorV1B1.Proto,
    _isClassic?: boolean
  ): MsgCreateValidatorV1B1 {
    return new MsgCreateValidatorV1B1(
      ValidatorV1B1.Description.fromProto(
        proto.description as ValidatorV1B1.Description.Proto
      ),
      ValidatorV1B1.CommissionRates.fromProto(
        proto.commission as ValidatorV1B1.CommissionRates.Proto
      ),
      new Int(proto.minSelfDelegation),
      proto.delegatorAddress,
      proto.validatorAddress,
      PublicKey.fromProto(proto.pubkey as Any) as ValConsPublicKey,
      Coin.fromProto(proto.value as Coin.Proto)
    );
  }

  public toProto(_isClassic?: boolean): MsgCreateValidatorV1B1.Proto {
    const {
      description,
      commission,
      min_self_delegation,
      delegator_address,
      validator_address,
      pubkey,
      value,
    } = this;
    return MsgCreateValidatorV1B1_pb.fromPartial({
      commission: commission.toProto(),
      delegatorAddress: delegator_address,
      description: description.toProto(),
      minSelfDelegation: min_self_delegation.toString(),
      pubkey: pubkey.packAny(),
      validatorAddress: validator_address,
      value: value.toProto(),
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.staking.v1beta1.MsgCreateValidator',
      value: MsgCreateValidatorV1B1_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgCreateValidatorV1B1 {
    return MsgCreateValidatorV1B1.fromProto(
      MsgCreateValidatorV1B1_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgCreateValidatorV1B1 {
  export interface Amino {
    type: 'staking/MsgCreateValidator' | 'cosmos-sdk/MsgCreateValidator';
    value: {
      description: ValidatorV1B1.Description;
      commission: ValidatorV1B1.CommissionRates.Amino;
      min_self_delegation: string;
      delegator_address: AccAddress;
      validator_address: ValAddress;
      pubkey: ValConsPublicKey.Amino;
      value: Coin.Amino;
    };
  }

  export interface Data {
    '@type': '/cosmos.staking.v1beta1.MsgCreateValidator';
    description: ValidatorV1B1.Description;
    commission: ValidatorV1B1.CommissionRates.Data;
    min_self_delegation: string;
    delegator_address: AccAddress;
    validator_address: ValAddress;
    pubkey: ValConsPublicKey.Data;
    value: Coin.Data;
  }

  export type Proto = MsgCreateValidatorV1B1_pb;
}
