import { JSONSerializable } from '../../../util/json';
import { Dec } from '../../numeric';
import { AccAddress, ValAddress } from '../../bech32';
import { Coin } from '../../Coin';
import {
  DelegationResponse as DelegationResponseV1B1_pb,
  Delegation as DelegationV1B1_pb,
} from '@xpla/xpla.proto/cosmos/staking/v1beta1/staking';

/**
 * Stores information about the status of a delegation between a delegator and validator, fetched from the blockchain.
 */
export class DelegationV1B1 extends JSONSerializable<
  DelegationV1B1.Amino,
  DelegationV1B1.Data,
  DelegationV1B1.Proto
> {
  /**
   * @param delegator_address 	delegator's account address
   * @param validator_address 	validator's operator address
   * @param shares 	delegator's shares
   * @param balance balance of the delegation
   */
  constructor(
    public delegator_address: AccAddress,
    public validator_address: ValAddress,
    public shares: Dec,
    public balance: Coin
  ) {
    super();
  }

  public static fromAmino(data: DelegationV1B1.Amino): DelegationV1B1 {
    const {
      delegation: { delegator_address, validator_address, shares },
      balance,
    } = data;
    return new DelegationV1B1(
      delegator_address,
      validator_address,
      new Dec(shares),
      Coin.fromAmino(balance)
    );
  }

  public toAmino(): DelegationV1B1.Amino {
    const { delegator_address, validator_address, shares, balance } = this;

    return {
      delegation: {
        delegator_address,
        validator_address,
        shares: shares.toString(),
      },
      balance: balance.toAmino(),
    };
  }

  public static fromData(data: DelegationV1B1.Data): DelegationV1B1 {
    const {
      delegation: { delegator_address, validator_address, shares },
      balance,
    } = data;
    return new DelegationV1B1(
      delegator_address,
      validator_address,
      new Dec(shares),
      Coin.fromData(balance)
    );
  }

  public toData(): DelegationV1B1.Data {
    const { delegator_address, validator_address, shares, balance } = this;

    return {
      delegation: {
        delegator_address,
        validator_address,
        shares: shares.toString(),
      },
      balance: balance.toData(),
    };
  }

  public static fromProto(proto: DelegationV1B1.Proto): DelegationV1B1 {
    const delegationProto = proto.delegation as DelegationV1B1_pb;
    return new DelegationV1B1(
      delegationProto.delegatorAddress,
      delegationProto.validatorAddress,
      new Dec(delegationProto.shares),
      Coin.fromProto(proto.balance as Coin.Proto)
    );
  }

  public toProto(): DelegationV1B1.Proto {
    const { delegator_address, validator_address, shares, balance } = this;
    return DelegationResponseV1B1_pb.fromPartial({
      delegation: DelegationV1B1_pb.fromPartial({
        delegatorAddress: delegator_address,
        shares: shares.toString(),
        validatorAddress: validator_address,
      }),
      balance: balance.toProto(),
    });
  }
}

export namespace DelegationV1B1 {
  export interface Amino {
    delegation: {
      delegator_address: AccAddress;
      validator_address: ValAddress;
      shares: string;
    };
    balance: Coin.Amino;
  }

  export interface Data {
    delegation: {
      delegator_address: AccAddress;
      validator_address: ValAddress;
      shares: string;
    };
    balance: Coin.Data;
  }

  export type Proto = DelegationResponseV1B1_pb;
}
