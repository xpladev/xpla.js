/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { Coins } from '../../../Coins';
import { AccAddress, ValAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgDepositValidatorRewardsPool as MsgDepositValidatorRewardsPoolV1B1_pb } from '@xpla/xpla.proto/cosmos/distribution/v1beta1/tx';

export class MsgDepositValidatorRewardsPoolV1B1 extends JSONSerializable<
  MsgDepositValidatorRewardsPoolV1B1.Amino,
  MsgDepositValidatorRewardsPoolV1B1.Data,
  MsgDepositValidatorRewardsPoolV1B1.Proto
> {
  /**
   * value of the transaction
   */
  public amount: Coins;

  /**
   * @param validator_address validator's operator address
   */
  constructor(
    public depositor: AccAddress,
    public validatorAddress: ValAddress,
    amount: Coins.Input
  ) {
    super();
    this.amount = new Coins(amount);
  }

  public static fromAmino(
    amino: MsgDepositValidatorRewardsPoolV1B1.Amino,
    _isClassic?: boolean
  ): MsgDepositValidatorRewardsPoolV1B1 {
    const {
      value: { depositor, validator_address, amount },
    } = amino;
    return new MsgDepositValidatorRewardsPoolV1B1(
      depositor,
      validator_address,
      Coins.fromAmino(amount)
    );
  }

  public toAmino(isClassic?: boolean): MsgDepositValidatorRewardsPoolV1B1.Amino {
    const { depositor, validatorAddress, amount } = this;
    return {
      type: isClassic
        ? 'distribution/MsgDepositValidatorRewardsPool'
        : 'cosmos-sdk/distr/MsgDepositValidatorRewardsPool',
      value: {
        depositor,
        validator_address: validatorAddress,
        amount: amount.toAmino(),
      },
    };
  }

  public static fromData(
    data: MsgDepositValidatorRewardsPoolV1B1.Data,
    _isClassic?: boolean
  ): MsgDepositValidatorRewardsPoolV1B1 {
    const { depositor, validator_address, amount } = data;
    return new MsgDepositValidatorRewardsPoolV1B1(
      depositor,
      validator_address,
      Coins.fromAmino(amount)
    );
  }

  public toData(_isClassic?: boolean): MsgDepositValidatorRewardsPoolV1B1.Data {
    const { depositor, validatorAddress, amount } = this;
    return {
      '@type': '/cosmos.distribution.v1beta1.MsgDepositValidatorRewardsPool',
      depositor,
      validator_address: validatorAddress,
      amount: amount.toData(),
    };
  }

  public static fromProto(
    proto: MsgDepositValidatorRewardsPoolV1B1.Proto,
    _isClassic?: boolean
  ): MsgDepositValidatorRewardsPoolV1B1 {
    return new MsgDepositValidatorRewardsPoolV1B1(
      proto.depositor,
      proto.validatorAddress,
      Coins.fromProto(proto.amount)
    );
  }

  public toProto(_isClassic?: boolean): MsgDepositValidatorRewardsPoolV1B1.Proto {
    const { depositor, validatorAddress, amount } = this;
    return MsgDepositValidatorRewardsPoolV1B1_pb.fromPartial({
      depositor,
      validatorAddress,
      amount: amount.toProto(),
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.distribution.v1beta1.MsgDepositValidatorRewardsPool',
      value: MsgDepositValidatorRewardsPoolV1B1_pb.encode(
        this.toProto(isClassic)
      ).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgDepositValidatorRewardsPoolV1B1 {
    return MsgDepositValidatorRewardsPoolV1B1.fromProto(
      MsgDepositValidatorRewardsPoolV1B1_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgDepositValidatorRewardsPoolV1B1 {
  export interface Amino {
    type:
      | 'distribution/MsgDepositValidatorRewardsPool'
      | 'cosmos-sdk/distr/MsgDepositValidatorRewardsPool';
    value: {
      depositor: AccAddress;
      validator_address: ValAddress;
      amount: Coins.Amino;
    };
  }

  export interface Data {
    '@type': '/cosmos.distribution.v1beta1.MsgDepositValidatorRewardsPool';
    depositor: AccAddress;
    validator_address: ValAddress;
    amount: Coins.Data;
  }

  export type Proto = MsgDepositValidatorRewardsPoolV1B1_pb;
}
