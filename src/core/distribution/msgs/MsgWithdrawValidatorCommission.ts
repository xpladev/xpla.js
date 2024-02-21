/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../util/json';
import { ValAddress } from '../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgWithdrawValidatorCommission as MsgWithdrawValidatorCommission_pb } from '@xpla/xpla.proto/cosmos/distribution/v1beta1/tx';

/**
 * A validator can withdraw their outstanding commission rewards accrued from all
 * delegations (not including its self-delegation) into their associated account's
 * withdraw address.
 */
export class MsgWithdrawValidatorCommission extends JSONSerializable<
  MsgWithdrawValidatorCommission.Amino,
  MsgWithdrawValidatorCommission.Data,
  MsgWithdrawValidatorCommission.Proto
> {
  /**
   * @param validator_address validator's operator address
   */
  constructor(public validator_address: ValAddress) {
    super();
  }

  public static fromAmino(
    data: MsgWithdrawValidatorCommission.Amino,
    _isClassic?: boolean
  ): MsgWithdrawValidatorCommission {
    const {
      value: { validator_address },
    } = data;
    return new MsgWithdrawValidatorCommission(validator_address);
  }

  public toAmino(isClassic?: boolean): MsgWithdrawValidatorCommission.Amino {
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
    proto: MsgWithdrawValidatorCommission.Data,
    _isClassic?: boolean
  ): MsgWithdrawValidatorCommission {
    const { validator_address } = proto;
    return new MsgWithdrawValidatorCommission(validator_address);
  }

  public toData(_isClassic?: boolean): MsgWithdrawValidatorCommission.Data {
    const { validator_address } = this;
    return {
      '@type': '/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission',
      validator_address,
    };
  }

  public static fromProto(
    proto: MsgWithdrawValidatorCommission.Proto,
    _isClassic?: boolean
  ): MsgWithdrawValidatorCommission {
    return new MsgWithdrawValidatorCommission(proto.validatorAddress);
  }

  public toProto(_isClassic?: boolean): MsgWithdrawValidatorCommission.Proto {
    const { validator_address } = this;
    return MsgWithdrawValidatorCommission_pb.fromPartial({
      validatorAddress: validator_address,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission',
      value: MsgWithdrawValidatorCommission_pb.encode(
        this.toProto(isClassic)
      ).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgWithdrawValidatorCommission {
    return MsgWithdrawValidatorCommission.fromProto(
      MsgWithdrawValidatorCommission_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgWithdrawValidatorCommission {
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

  export type Proto = MsgWithdrawValidatorCommission_pb;
}
