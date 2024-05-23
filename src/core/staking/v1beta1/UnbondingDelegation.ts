import { JSONSerializable } from '../../../util/json';
import { Int } from '../../numeric';
import { AccAddress, ValAddress } from '../../bech32';
import {
  UnbondingDelegation as UnbondingDelegationV1B1_pb,
  UnbondingDelegationEntry as UnbondingDelegationEntryV1B1_pb,
} from '@xpla/xpla.proto/cosmos/staking/v1beta1/staking';

/**
 * When a delegator decides to take out their funds from the staking pool, they must
 * unbond their tokens which takes an amount of time specified by `unbonding_time`
 * parameter in the staking module.
 *
 * An unbonding delegation is implemented through creating [[UnbondingDelegationV1B1.Entry]]
 * objects, limited by the max_entry parameter in the staking module params. You cannot
 * initiate unbonds more times than the amount of entries permitted. Entries are cleared
 * when their unbonding periods are completed and the funds are returned to the
 * delegator's account balance to be spent freely.
 */
export class UnbondingDelegationV1B1 extends JSONSerializable<
  UnbondingDelegationV1B1.Amino,
  UnbondingDelegationV1B1.Data,
  UnbondingDelegationV1B1.Proto
> {
  constructor(
    public delegator_address: AccAddress,
    public validator_address: ValAddress,
    public entries: UnbondingDelegationV1B1.Entry[]
  ) {
    super();
  }

  public static fromAmino(
    data: UnbondingDelegationV1B1.Amino
  ): UnbondingDelegationV1B1 {
    const { delegator_address, validator_address, entries } = data;
    return new UnbondingDelegationV1B1(
      delegator_address,
      validator_address,
      entries.map(e => UnbondingDelegationV1B1.Entry.fromAmino(e))
    );
  }

  public toAmino(): UnbondingDelegationV1B1.Amino {
    const { delegator_address, validator_address, entries } = this;
    return {
      delegator_address,
      validator_address,
      entries: entries.map(e => e.toAmino()),
    };
  }

  public static fromData(
    data: UnbondingDelegationV1B1.Data
  ): UnbondingDelegationV1B1 {
    const { delegator_address, validator_address, entries } = data;
    return new UnbondingDelegationV1B1(
      delegator_address,
      validator_address,
      entries.map(e => UnbondingDelegationV1B1.Entry.fromData(e))
    );
  }

  public toData(): UnbondingDelegationV1B1.Data {
    const { delegator_address, validator_address, entries } = this;
    return {
      delegator_address,
      validator_address,
      entries: entries.map(e => e.toData()),
    };
  }

  public toProto(): UnbondingDelegationV1B1.Proto {
    const { delegator_address, validator_address, entries } = this;
    return UnbondingDelegationV1B1_pb.fromPartial({
      delegatorAddress: delegator_address,
      entries: entries.map(e => e.toProto()),
      validatorAddress: validator_address,
    });
  }

  public static fromProto(
    proto: UnbondingDelegationV1B1.Proto
  ): UnbondingDelegationV1B1 {
    return new UnbondingDelegationV1B1(
      proto.delegatorAddress,
      proto.validatorAddress,
      proto.entries.map(e => UnbondingDelegationV1B1.Entry.fromProto(e))
    );
  }
}

export namespace UnbondingDelegationV1B1 {
  export interface Amino {
    delegator_address: AccAddress;
    validator_address: ValAddress;
    entries: UnbondingDelegationV1B1.Entry.Amino[];
  }

  export interface Data {
    delegator_address: AccAddress;
    validator_address: ValAddress;
    entries: UnbondingDelegationV1B1.Entry.Data[];
  }

  export type Proto = UnbondingDelegationV1B1_pb;

  export class Entry extends JSONSerializable<
    Entry.Amino,
    Entry.Data,
    Entry.Proto
  > {
    /**
     * Note that the size of the undelegation is `initial_balance - balance`
     * @param initial_balance balance of delegation prior to initiating unbond
     * @param balance balance of delegation after initiating unbond
     * @param creation_height height of blockchain when entry was created
     * @param completion_time time when unbonding will be completed
     */
    constructor(
      public initial_balance: Int,
      public balance: Int,
      public creation_height: number,
      public completion_time: Date
    ) {
      super();
    }

    public toAmino(): Entry.Amino {
      return {
        initial_balance: this.initial_balance.toString(),
        balance: this.balance.toString(),
        creation_height: this.creation_height.toFixed(),
        completion_time: this.completion_time.toISOString(),
      };
    }

    public static fromAmino(data: Entry.Amino): Entry {
      const { initial_balance, balance, creation_height, completion_time } =
        data;
      return new Entry(
        new Int(initial_balance),
        new Int(balance),
        Number.parseInt(creation_height),
        new Date(completion_time)
      );
    }

    public toData(): Entry.Data {
      return {
        initial_balance: this.initial_balance.toString(),
        balance: this.balance.toString(),
        creation_height: this.creation_height.toFixed(),
        completion_time: this.completion_time.toISOString(),
      };
    }

    public static fromData(data: Entry.Data): Entry {
      const { initial_balance, balance, creation_height, completion_time } =
        data;
      return new Entry(
        new Int(initial_balance),
        new Int(balance),
        Number.parseInt(creation_height),
        new Date(completion_time)
      );
    }

    public toProto(): Entry.Proto {
      const { initial_balance, balance, creation_height, completion_time } =
        this;
      return UnbondingDelegationEntryV1B1_pb.fromPartial({
        balance: balance.toString(),
        completionTime: completion_time,
        creationHeight: creation_height,
        initialBalance: initial_balance.toString(),
      });
    }

    public static fromProto(proto: Entry.Proto): Entry {
      return new Entry(
        new Int(proto.initialBalance),
        new Int(proto.balance),
        proto.creationHeight.toNumber(),
        proto.completionTime as Date
      );
    }
  }

  export namespace Entry {
    export interface Amino {
      initial_balance: string;
      balance: string;
      creation_height: string;
      completion_time: string;
    }

    export interface Data {
      initial_balance: string;
      balance: string;
      creation_height: string;
      completion_time: string;
    }

    export type Proto = UnbondingDelegationEntryV1B1_pb;
  }
}
