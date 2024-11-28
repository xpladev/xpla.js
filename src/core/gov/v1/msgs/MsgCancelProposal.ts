/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgCancelProposal as MsgCancelProposalV1_pb } from '@xpla/xpla.proto/cosmos/gov/v1/tx';

/**
 * Add a deposit for a proposal
 */
export class MsgCancelProposalV1 extends JSONSerializable<
  MsgCancelProposalV1.Amino,
  MsgCancelProposalV1.Data,
  MsgCancelProposalV1.Proto
> {
  /**
   * @param proposal_id Id of porposal to deposit to
   * @param proposer proposer's account address
   */
  constructor(
    public proposal_id: number,
    public proposer: AccAddress,
  ) {
    super();
  }

  public static fromAmino(
    data: MsgCancelProposalV1.Amino,
    _isClassic?: boolean
  ): MsgCancelProposalV1 {
    const {
      value: { proposal_id, proposer },
    } = data;
    return new MsgCancelProposalV1(
      Number.parseInt(proposal_id),
      proposer,
    );
  }

  public toAmino(isClassic?: boolean): MsgCancelProposalV1.Amino {
    const { proposal_id, proposer } = this;
    return {
      type: isClassic ? 'gov/MsgCancelProposal' : 'cosmos-sdk/x/gov/v1/MsgCancelProposal',
      value: {
        proposal_id: proposal_id.toString(),
        proposer,
      },
    };
  }

  public static fromData(
    data: MsgCancelProposalV1.Data,
    _isClassic?: boolean
  ): MsgCancelProposalV1 {
    const { proposal_id, proposer } = data;
    return new MsgCancelProposalV1(
      Number.parseInt(proposal_id),
      proposer,
    );
  }

  public toData(_isClassic?: boolean): MsgCancelProposalV1.Data {
    const { proposal_id, proposer } = this;
    return {
      '@type': '/cosmos.gov.v1.MsgCancelProposal',
      proposal_id: proposal_id.toString(),
      proposer,
    };
  }

  public static fromProto(
    proto: MsgCancelProposalV1.Proto,
    _isClassic?: boolean
  ): MsgCancelProposalV1 {
    return new MsgCancelProposalV1(
      proto.proposalId.toNumber(),
      proto.proposer,
    );
  }

  public toProto(_isClassic?: boolean): MsgCancelProposalV1.Proto {
    const { proposal_id, proposer } = this;
    return MsgCancelProposalV1_pb.fromPartial({
      proposalId: proposal_id,
      proposer,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.gov.v1.MsgCancelProposal',
      value: MsgCancelProposalV1_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(msgAny: Any, isClassic?: boolean): MsgCancelProposalV1 {
    return MsgCancelProposalV1.fromProto(
      MsgCancelProposalV1_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgCancelProposalV1 {
  export interface Amino {
    type: 'gov/MsgCancelProposal' | 'cosmos-sdk/x/gov/v1/MsgCancelProposal';
    value: {
      proposal_id: string;
      proposer: AccAddress;
    };
  }

  export interface Data {
    '@type': '/cosmos.gov.v1.MsgCancelProposal';
    proposal_id: string;
    proposer: AccAddress;
  }

  export type Proto = MsgCancelProposalV1_pb;
}
