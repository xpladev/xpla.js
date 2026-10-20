import { Int64, Int64Input, parseInt64 } from '../../../../util/int64';
import { JSONSerializable } from '../../../../util/json';
import { Coins } from '../../../Coins';
import { AccAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { BurnProposal as BurnProposal_pb } from '@xpla/xpla.proto/xpla/burn/v1beta1/burn';

/** BurnProposal defines a ongoingburn proposal */
export class BurnProposal extends JSONSerializable<
  BurnProposal.Amino,
  BurnProposal.Data,
  BurnProposal.Proto
> {
  public amount: Coins;
  public proposal_id: Int64 | undefined;

  /**
   * @param proposal_id
   * @param proposer
   * @param amount
   */
  constructor(
    proposal_id: Int64Input | undefined,
    public proposer: AccAddress,
    amount: Coins.Input
  ) {
    super();
    this.proposal_id =
      proposal_id === undefined ? undefined : parseInt64(proposal_id);
    this.amount = new Coins(amount);
  }

  public static fromAmino(
    data: BurnProposal.Amino,
    _isClassic?: boolean
  ): BurnProposal {
    const {
      value: { proposal_id, proposer, amount },
    } = data;
    return new BurnProposal(proposal_id, proposer, Coins.fromAmino(amount));
  }

  public toAmino(_isClassic?: boolean): BurnProposal.Amino {
    const { proposal_id, proposer, amount } = this;
    return {
      type: 'xpla/BurnProposal',
      value: {
        proposal_id: proposal_id?.toString(),
        proposer,
        amount: amount.toAmino(),
      },
    };
  }

  public static fromData(
    proto: BurnProposal.Data,
    _isClassic?: boolean
  ): BurnProposal {
    const { proposal_id, proposer, amount } = proto;
    return new BurnProposal(proposal_id, proposer, Coins.fromData(amount));
  }

  public toData(_isClassic?: boolean): BurnProposal.Data {
    const { proposal_id, proposer, amount } = this;
    return {
      '@type': '/xpla.burn.v1beta1.BurnProposal',
      proposal_id: proposal_id?.toString(),
      proposer,
      amount: amount.toData(),
    };
  }

  public static fromProto(
    proto: BurnProposal.Proto,
    _isClassic?: boolean
  ): BurnProposal {
    return new BurnProposal(
      proto.proposalId,
      proto.proposer,
      Coins.fromProto(proto.amount)
    );
  }

  public toProto(_isClassic?: boolean): BurnProposal.Proto {
    const { proposal_id, proposer, amount } = this;
    return BurnProposal_pb.fromPartial({
      proposalId: proposal_id?.toString(),
      proposer,
      amount: amount.toProto(),
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/xpla.burn.v1beta1.BurnProposal',
      value: BurnProposal_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(msgAny: Any, isClassic?: boolean): BurnProposal {
    return BurnProposal.fromProto(
      BurnProposal_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace BurnProposal {
  export interface Amino {
    type: 'xpla/BurnProposal';
    value: {
      proposal_id: string | undefined;
      proposer: AccAddress;
      amount: Coins.Amino;
    };
  }

  export interface Data {
    '@type': '/xpla.burn.v1beta1.BurnProposal';
    proposal_id: string | undefined;
    proposer: AccAddress;
    amount: Coins.Data;
  }

  export type Proto = BurnProposal_pb;
}
