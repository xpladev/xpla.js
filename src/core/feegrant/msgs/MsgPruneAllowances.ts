import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgPruneAllowances as MsgPruneAllowances_pb } from '@xpla/xpla.proto/cosmos/feegrant/v1beta1/tx';

/**
 * MsgGrantAllowance adds permission for Grantee to spend up to Allowance
 * of fees from the account of Granter.
 */
export class MsgPruneAllowances extends JSONSerializable<
  MsgPruneAllowances.Amino,
  MsgPruneAllowances.Data,
  MsgPruneAllowances.Proto
> {
  /**
   *
   * @param pruner the address of the user pruning expired allowances.
   */
  constructor(
    public pruner: AccAddress,
  ) {
    super();
  }

  public static fromAmino(
    data: MsgPruneAllowances.Amino,
    _?: boolean
  ): MsgPruneAllowances {
    const {
      value: { pruner },
    } = data;
    return new MsgPruneAllowances(
      pruner,
    );
  }

  public toAmino(isClassic?: boolean): MsgPruneAllowances.Amino {
    const { pruner } = this;
    return {
      type: isClassic
        ? 'feegrant/MsgPruneAllowances'
        : 'cosmos-sdk/MsgPruneAllowances',
      value: {
        pruner,
      },
    };
  }

  public static fromData(
    data: MsgPruneAllowances.Data,
    _?: boolean
  ): MsgPruneAllowances {
    const { pruner } = data;
    return new MsgPruneAllowances(
      pruner,
    );
  }

  public toData(_?: boolean): MsgPruneAllowances.Data {
    const { pruner } = this;
    return {
      '@type': '/cosmos.feegrant.v1beta1.MsgPruneAllowances',
      pruner,
    };
  }

  public static fromProto(
    proto: MsgPruneAllowances.Proto,
    _?: boolean
  ): MsgPruneAllowances {
    return new MsgPruneAllowances(
      proto.pruner,
    );
  }

  public toProto(_?: boolean): MsgPruneAllowances.Proto {
    const { pruner } = this;
    return MsgPruneAllowances_pb.fromPartial({
      pruner,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.feegrant.v1beta1.MsgPruneAllowances',
      value: MsgPruneAllowances_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(msgAny: Any, isClassic?: boolean): MsgPruneAllowances {
    return MsgPruneAllowances.fromProto(
      MsgPruneAllowances_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgPruneAllowances {
  export interface Amino {
    type: 'feegrant/MsgPruneAllowances' | 'cosmos-sdk/MsgPruneAllowances';
    value: {
      pruner: AccAddress;
    };
  }

  export interface Data {
    '@type': '/cosmos.feegrant.v1beta1.MsgPruneAllowances';
    pruner: AccAddress;
  }

  export type Proto = MsgPruneAllowances_pb;
}
