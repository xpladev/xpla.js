/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { ValAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgWithdrawValidatorCommission as MsgWithdrawValidatorCommissionV1B1_pb } from '@xpla/xpla.proto/cosmos/distribution/v1beta1/tx';

/**
 * A validator can withdraw their outstanding commission rewards accrued from all
 * delegations (not including its self-delegation) into their associated account's
 * withdraw address.
 */
export class MsgWithdrawValidatorCommissionV1B1 extends JSONSerializable<
  MsgWithdrawValidatorCommissionV1B1.Amino,
  MsgWithdrawValidatorCommissionV1B1.Data,
  MsgWithdrawValidatorCommissionV1B1.Proto
> {
  /**
   * @param validator_address validator's operator address
   */
  constructor(public validator_address: ValAddress) {
    super();
  }

  public static fromAmino(
    data: MsgWithdrawValidatorCommissionV1B1.Amino,
    _isClassic?: boolean
  ): MsgWithdrawValidatorCommissionV1B1 {
    const {
      value: { validator_address },
    } = data;
    return new MsgWithdrawValidatorCommissionV1B1(validator_address);
  }

  public toAmino(
    isClassic?: boolean
  ): MsgWithdrawValidatorCommissionV1B1.Amino {
    const { validator_address } = this;
    return {
      type: isClassic
        ? 'distribution/MsgWithdrawValidatorCommission'
        : 'cosmos-sdk/MsgWithdrawValCommission',
      value: {
        validator_address,
      },
    };
  }

  public static fromData(
    proto: MsgWithdrawValidatorCommissionV1B1.Data,
    _isClassic?: boolean
  ): MsgWithdrawValidatorCommissionV1B1 {
    const { validator_address } = proto;
    return new MsgWithdrawValidatorCommissionV1B1(validator_address);
  }

  public toData(_isClassic?: boolean): MsgWithdrawValidatorCommissionV1B1.Data {
    const { validator_address } = this;
    return {
      '@type': '/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission',
      validator_address,
    };
  }

  public static fromProto(
    proto: MsgWithdrawValidatorCommissionV1B1.Proto,
    _isClassic?: boolean
  ): MsgWithdrawValidatorCommissionV1B1 {
    return new MsgWithdrawValidatorCommissionV1B1(proto.validatorAddress);
  }

  public toProto(
    _isClassic?: boolean
  ): MsgWithdrawValidatorCommissionV1B1.Proto {
    const { validator_address } = this;
    return MsgWithdrawValidatorCommissionV1B1_pb.fromPartial({
      validatorAddress: validator_address,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission',
      value: MsgWithdrawValidatorCommissionV1B1_pb.encode(
        this.toProto(isClassic)
      ).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgWithdrawValidatorCommissionV1B1 {
    return MsgWithdrawValidatorCommissionV1B1.fromProto(
      MsgWithdrawValidatorCommissionV1B1_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgWithdrawValidatorCommissionV1B1 {
  export interface Amino {
    type:
      | 'distribution/MsgWithdrawValidatorCommission'
      | 'cosmos-sdk/MsgWithdrawValCommission';
    value: {
      validator_address: ValAddress;
    };
  }

  export interface Data {
    '@type': '/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission';
    validator_address: ValAddress;
  }

  export type Proto = MsgWithdrawValidatorCommissionV1B1_pb;
}
