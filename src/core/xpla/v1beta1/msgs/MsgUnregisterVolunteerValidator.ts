/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgUnregisterVolunteerValidator as MsgUnregisterVolunteerValidatorV1B1_pb } from '@xpla/xpla.proto/xpla/volunteer/v1beta1/tx';

export class MsgUnregisterVolunteerValidatorV1B1 extends JSONSerializable<
  MsgUnregisterVolunteerValidatorV1B1.Amino,
  MsgUnregisterVolunteerValidatorV1B1.Data,
  MsgUnregisterVolunteerValidatorV1B1.Proto
> {
  /**
   * @param authority
   * @param validator_address
   */
  constructor(
    public authority: AccAddress,
    public validator_address: AccAddress,
  ) {
    super();
  }

  public static fromAmino(
    data: MsgUnregisterVolunteerValidatorV1B1.Amino,
    _isClassic?: boolean
  ): MsgUnregisterVolunteerValidatorV1B1 {
    const {
      value: {
        authority,
        validator_address,
      },
    } = data;
    return new MsgUnregisterVolunteerValidatorV1B1(
      authority,
      validator_address,
    );
  }

  public toAmino(_isClassic?: boolean): MsgUnregisterVolunteerValidatorV1B1.Amino {
    const {
      authority,
      validator_address,
    } = this;
    return {
      type: 'xpladev/MsgUnregisterVolunteerValidator',
      value: {
        authority,
        validator_address,
      },
    };
  }

  public static fromData(
    data: MsgUnregisterVolunteerValidatorV1B1.Data,
    _isClassic?: boolean
  ): MsgUnregisterVolunteerValidatorV1B1 {
    const {
      authority,
      validator_address,
    } = data;

    return new MsgUnregisterVolunteerValidatorV1B1(
      authority,
      validator_address,
    );
  }

  public toData(_isClassic?: boolean): MsgUnregisterVolunteerValidatorV1B1.Data {
    const {
      authority,
      validator_address,
    } = this;
    return {
      '@type': '/xpla.volunteer.v1beta1.MsgUnregisterVolunteerValidator',
      authority,
      validator_address,
    };
  }

  public static fromProto(
    proto: MsgUnregisterVolunteerValidatorV1B1.Proto,
    _isClassic?: boolean
  ): MsgUnregisterVolunteerValidatorV1B1 {
    return new MsgUnregisterVolunteerValidatorV1B1(
      proto.authority,
      proto.validatorAddress,
    );
  }

  public toProto(_isClassic?: boolean): MsgUnregisterVolunteerValidatorV1B1.Proto {
    const {
      authority,
      validator_address,
    } = this;
    return MsgUnregisterVolunteerValidatorV1B1_pb.fromPartial({
      authority,
      validatorAddress: validator_address,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/xpla.volunteer.v1beta1.MsgUnregisterVolunteerValidator',
      value: MsgUnregisterVolunteerValidatorV1B1_pb.encode(
        this.toProto(isClassic)
      ).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgUnregisterVolunteerValidatorV1B1 {
    return MsgUnregisterVolunteerValidatorV1B1.fromProto(
      MsgUnregisterVolunteerValidatorV1B1_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgUnregisterVolunteerValidatorV1B1 {
  export interface Amino {
    type: 'xpladev/MsgUnregisterVolunteerValidator';
    value: {
      authority: AccAddress;
      validator_address: AccAddress;
    };
  }

  export interface Data {
    '@type': '/xpla.volunteer.v1beta1.MsgUnregisterVolunteerValidator';
    authority: AccAddress;
    validator_address: AccAddress;
  }

  export type Proto = MsgUnregisterVolunteerValidatorV1B1_pb;
}
