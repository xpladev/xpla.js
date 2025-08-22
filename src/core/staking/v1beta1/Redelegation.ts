import { JSONSerializable } from '../../../util/json';
import { Dec, Int } from '../../numeric';
import { AccAddress, ValAddress } from '../../bech32';
import {
  RedelegationResponse as RedelegationResponseV1B1_pb,
  Redelegation as RedelegationV1B1_pb,
  RedelegationEntry as RedelegationEntryV1B1_pb,
  RedelegationEntryResponse as RedelegationEntryResponseV1B1_pb,
} from '@xpla/xpla.proto/cosmos/staking/v1beta1/staking';

/**
 * A redelegation is when a delegator decides to stop staking with one validator and
 * transfer their delegation to another validator. Rather than unbonding (which takes
 * some time) and re-staking, the funds can be redelegated immediately if a
 * [[RedelegationV1B1.Entry]] can be created.
 *
 * A redelegation, like an unbonding delegation, is implemented through
 * [[RedelegationV1B1.Entry]] objects, limited by the `max_entry` parameter in the staking
 * module params. For each pair of source and target validators, you cannot redelegate
 * more times than the amount of entries. Entries are cleared when the redelegation is
 * completed, the same amount of time as unbonding.
 */
export class RedelegationV1B1 extends JSONSerializable<
  RedelegationV1B1.Amino,
  RedelegationV1B1.Data,
  RedelegationV1B1.Proto
> {
  /**
   *
   * @param delegator_address delegator's account address
   * @param validator_src_address source validator's operator address (from)
   * @param validator_dst_address target validator's operator address (to)
   * @param entries entries
   */
  constructor(
    public delegator_address: AccAddress,
    public validator_src_address: ValAddress,
    public validator_dst_address: ValAddress,
    public entries: RedelegationV1B1.Entry[]
  ) {
    super();
  }

  public static fromAmino(data: RedelegationV1B1.Amino): RedelegationV1B1 {
    const {
      redelegation: {
        delegator_address,
        validator_src_address,
        validator_dst_address,
      },
      entries,
    } = data;
    return new RedelegationV1B1(
      delegator_address,
      validator_src_address,
      validator_dst_address,
      entries.map(RedelegationV1B1.Entry.fromAmino)
    );
  }

  public toAmino(): RedelegationV1B1.Amino {
    const {
      delegator_address,
      validator_src_address,
      validator_dst_address,
      entries,
    } = this;
    return {
      redelegation: {
        delegator_address,
        validator_src_address,
        validator_dst_address,
      },
      entries: entries.map(e => e.toAmino()),
    };
  }

  public static fromData(data: RedelegationV1B1.Data): RedelegationV1B1 {
    const {
      redelegation: {
        delegator_address,
        validator_src_address,
        validator_dst_address,
      },
      entries,
    } = data;
    return new RedelegationV1B1(
      delegator_address,
      validator_src_address,
      validator_dst_address,
      entries.map(RedelegationV1B1.Entry.fromData)
    );
  }

  public toData(): RedelegationV1B1.Data {
    const {
      delegator_address,
      validator_src_address,
      validator_dst_address,
      entries,
    } = this;
    return {
      redelegation: {
        delegator_address,
        validator_src_address,
        validator_dst_address,
      },
      entries: entries.map(e => e.toData()),
    };
  }

  public static fromProto(data: RedelegationV1B1.Proto): RedelegationV1B1 {
    const redelegationProto = data.redelegation as RedelegationV1B1_pb;
    return new RedelegationV1B1(
      redelegationProto.delegatorAddress,
      redelegationProto.validatorDstAddress,
      redelegationProto.validatorDstAddress,
      data.entries.map(RedelegationV1B1.Entry.fromProto)
    );
  }

  public toProto(): RedelegationV1B1.Proto {
    const {
      delegator_address,
      validator_src_address,
      validator_dst_address,
      entries,
    } = this;

    return RedelegationResponseV1B1_pb.fromPartial({
      entries: entries.map(e => e.toProto()),
      redelegation: RedelegationV1B1_pb.fromPartial({
        delegatorAddress: delegator_address,
        entries: entries.map(
          e => e.toProto().redelegationEntry as RedelegationEntryV1B1_pb
        ),
        validatorDstAddress: validator_dst_address,
        validatorSrcAddress: validator_src_address,
      }),
    });
  }
}

export namespace RedelegationV1B1 {
  export interface Amino {
    redelegation: {
      delegator_address: AccAddress;
      validator_src_address: ValAddress;
      validator_dst_address: ValAddress;
    };
    entries: RedelegationV1B1.Entry.Amino[];
  }

  export interface Data {
    redelegation: {
      delegator_address: AccAddress;
      validator_src_address: ValAddress;
      validator_dst_address: ValAddress;
    };
    entries: RedelegationV1B1.Entry.Data[];
  }

  export type Proto = RedelegationResponseV1B1_pb;

  export class Entry extends JSONSerializable<
    Entry.Amino,
    Entry.Data,
    Entry.Proto
  > {
    /**
     *
     * @param initial_balance balance of delegation prior to initiating redelegation
     * @param shares_dst
     * @param creation_height 	height of blockchain when entry was created
     * @param completion_time time when redelegation entry will be removed
     */
    constructor(
      public initial_balance: Int,
      public balance: Int,
      public shares_dst: Dec,
      public creation_height: number,
      public completion_time: Date
    ) {
      super();
    }

    public toAmino(): Entry.Amino {
      return {
        redelegation_entry: {
          initial_balance: this.initial_balance.toString(),
          shares_dst: this.shares_dst.toString(),
          creation_height: this.creation_height,
          completion_time: this.completion_time.toISOString(),
        },
        balance: this.balance.toString(),
      };
    }

    public static fromAmino(data: Entry.Amino): Entry {
      const {
        redelegation_entry: {
          initial_balance,
          shares_dst,
          creation_height,
          completion_time,
        },
        balance,
      } = data;
      return new Entry(
        new Int(initial_balance),
        new Int(balance),
        new Dec(shares_dst),
        creation_height,
        new Date(completion_time)
      );
    }

    public toData(): Entry.Data {
      return {
        redelegation_entry: {
          initial_balance: this.initial_balance.toString(),
          shares_dst: this.shares_dst.toString(),
          creation_height: this.creation_height,
          completion_time: this.completion_time.toISOString(),
        },
        balance: this.balance.toString(),
      };
    }

    public static fromData(data: Entry.Data): Entry {
      const {
        redelegation_entry: {
          initial_balance,
          shares_dst,
          creation_height,
          completion_time,
        },
        balance,
      } = data;
      return new Entry(
        new Int(initial_balance),
        new Int(balance),
        new Dec(shares_dst),
        creation_height,
        new Date(completion_time)
      );
    }

    public toProto(): Entry.Proto {
      const {
        initial_balance,
        balance,
        shares_dst,
        creation_height,
        completion_time,
      } = this;

      return RedelegationEntryResponseV1B1_pb.fromPartial({
        balance: balance.toString(),
        redelegationEntry: RedelegationEntryV1B1_pb.fromPartial({
          completionTime: completion_time,
          creationHeight: creation_height,
          initialBalance: initial_balance.toString(),
          sharesDst: shares_dst.toString(),
        }),
      });
    }

    public static fromProto(proto: Entry.Proto): Entry {
      const redelegationEntryProto =
        proto.redelegationEntry as RedelegationEntryV1B1_pb;

      return new Entry(
        new Int(redelegationEntryProto.initialBalance),
        new Int(proto.balance),
        new Dec(redelegationEntryProto.sharesDst),
        redelegationEntryProto.creationHeight.toNumber(),
        redelegationEntryProto.completionTime as Date
      );
    }
  }

  export namespace Entry {
    export interface Amino {
      redelegation_entry: {
        creation_height: number;
        completion_time: string;
        initial_balance: string;
        shares_dst: string;
      };
      balance: string;
    }

    export interface Data {
      redelegation_entry: {
        creation_height: number;
        completion_time: string;
        initial_balance: string;
        shares_dst: string;
      };
      balance: string;
    }

    export type Proto = RedelegationEntryResponseV1B1_pb;
  }
}
