/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { Coin } from '../../../Coin';
import { AccAddress, ValAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgCancelUnbondingDelegation as MsgCancelUnbondingDelegationV1B1_pb } from '@xpla/xpla.proto/cosmos/staking/v1beta1/tx';

/**
 * A delegator can undelegate an amount of bonded Luna, and will begin the unbonding
 * process for those funds. The unbonding process takes 21 days to complete, during
 * which the Luna cannot be transacted or swapped.
 */
export class MsgCancelUnbondingDelegationV1B1 extends JSONSerializable<
  MsgCancelUnbondingDelegationV1B1.Amino,
  MsgCancelUnbondingDelegationV1B1.Data,
  MsgCancelUnbondingDelegationV1B1.Proto
> {
  /**
   * @param delegator_address delegator's account address
   * @param validator_address validator's operator address
   * @param amount Luna to be undelegated
   */
  constructor(
    public delegator_address: AccAddress,
    public validator_address: ValAddress,
    public amount: Coin | undefined,
    public creation_height: number
  ) {
    super();
  }

  public static fromAmino(
    data: MsgCancelUnbondingDelegationV1B1.Amino,
    _isClassic?: boolean
  ): MsgCancelUnbondingDelegationV1B1 {
    const {
      value: { delegator_address, validator_address, amount, creation_height },
    } = data;
    return new MsgCancelUnbondingDelegationV1B1(
      delegator_address,
      validator_address,
      amount ? Coin.fromAmino(amount) : undefined,
      Number.parseInt(creation_height)
    );
  }

  public toAmino(isClassic?: boolean): MsgCancelUnbondingDelegationV1B1.Amino {
    const { delegator_address, validator_address, amount, creation_height } =
      this;
    return {
      type: isClassic
        ? 'staking/MsgCancelUnbondingDelegation'
        : 'cosmos-sdk/MsgCancelUnbondingDelegation',
      value: {
        delegator_address,
        validator_address,
        amount: amount ? amount.toAmino() : undefined,
        creation_height: creation_height.toFixed(),
      },
    };
  }

  public static fromProto(
    proto: MsgCancelUnbondingDelegationV1B1.Proto,
    _isClassic?: boolean
  ): MsgCancelUnbondingDelegationV1B1 {
    return new MsgCancelUnbondingDelegationV1B1(
      proto.delegatorAddress,
      proto.validatorAddress,
      proto.amount ? Coin.fromProto(proto.amount as Coin.Proto) : undefined,
      proto.creationHeight.toNumber()
    );
  }

  public toProto(_isClassic?: boolean): MsgCancelUnbondingDelegationV1B1.Proto {
    const { delegator_address, validator_address, amount, creation_height } =
      this;
    return MsgCancelUnbondingDelegationV1B1_pb.fromPartial({
      delegatorAddress: delegator_address,
      validatorAddress: validator_address,
      amount: amount ? amount.toProto() : undefined,
      creationHeight: creation_height,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.staking.v1beta1.MsgCancelUnbondingDelegation',
      value: MsgCancelUnbondingDelegationV1B1_pb.encode(
        this.toProto(isClassic)
      ).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgCancelUnbondingDelegationV1B1 {
    return MsgCancelUnbondingDelegationV1B1.fromProto(
      MsgCancelUnbondingDelegationV1B1_pb.decode(msgAny.value),
      isClassic
    );
  }

  public static fromData(
    data: MsgCancelUnbondingDelegationV1B1.Data,
    _isClassic?: boolean
  ): MsgCancelUnbondingDelegationV1B1 {
    const { delegator_address, validator_address, amount, creation_height } =
      data;
    return new MsgCancelUnbondingDelegationV1B1(
      delegator_address,
      validator_address,
      amount ? Coin.fromData(amount) : undefined,
      Number.parseInt(creation_height)
    );
  }

  public toData(_isClassic?: boolean): MsgCancelUnbondingDelegationV1B1.Data {
    const { delegator_address, validator_address, amount, creation_height } =
      this;
    return {
      '@type': '/cosmos.staking.v1beta1.MsgCancelUnbondingDelegation',
      delegator_address,
      validator_address,
      amount: amount ? amount.toData() : undefined,
      creation_height: creation_height.toFixed(),
    };
  }
}

export namespace MsgCancelUnbondingDelegationV1B1 {
  export interface Amino {
    type:
      | 'staking/MsgCancelUnbondingDelegation'
      | 'cosmos-sdk/MsgCancelUnbondingDelegation';
    value: {
      delegator_address: AccAddress;
      validator_address: ValAddress;
      amount: Coin.Amino | undefined;
      creation_height: string;
    };
  }

  export interface Data {
    '@type': '/cosmos.staking.v1beta1.MsgCancelUnbondingDelegation';
    delegator_address: AccAddress;
    validator_address: ValAddress;
    amount: Coin.Data | undefined;
    creation_height: string;
  }

  export type Proto = MsgCancelUnbondingDelegationV1B1_pb;
}
