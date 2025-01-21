/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgWithdrawProposal as MsgGroupWithdrawProposalV1_pb } from '@xpla/xpla.proto/cosmos/group/v1/tx';

export class MsgGroupWithdrawProposalV1 extends JSONSerializable<
  MsgGroupWithdrawProposalV1.Amino,
  MsgGroupWithdrawProposalV1.Data,
  MsgGroupWithdrawProposalV1.Proto
> {
  /**
   * @param proposal is the unique ID of the proposal
   * @param address is the admin of the group policy or one of the proposer of the proposal
   */
  constructor(public proposal_id: number, public address: AccAddress) {
    super();
  }

  public static fromAmino(
    data: MsgGroupWithdrawProposalV1.Amino,
    _isClassic?: boolean
  ): MsgGroupWithdrawProposalV1 {
    const {
      value: { proposal_id, address },
    } = data;
    return new MsgGroupWithdrawProposalV1(
      Number.parseInt(proposal_id),
      address
    );
  }

  public toAmino(isClassic?: boolean): MsgGroupWithdrawProposalV1.Amino {
    const { proposal_id, address } = this;
    return {
      type: isClassic
        ? 'group/MsgWithdrawProposal'
        : 'cosmos-sdk/group/MsgWithdrawProposal',
      value: {
        proposal_id: proposal_id.toFixed(),
        address,
      },
    };
  }

  public static fromData(
    data: MsgGroupWithdrawProposalV1.Data,
    _isClassic?: boolean
  ): MsgGroupWithdrawProposalV1 {
    const { proposal_id, address } = data;
    return new MsgGroupWithdrawProposalV1(
      Number.parseInt(proposal_id),
      address
    );
  }

  public toData(_isClassic?: boolean): MsgGroupWithdrawProposalV1.Data {
    const { proposal_id, address } = this;
    return {
      '@type': '/cosmos.group.v1.MsgWithdrawProposal',
      proposal_id: proposal_id.toFixed(),
      address,
    };
  }

  public static fromProto(
    proto: MsgGroupWithdrawProposalV1.Proto,
    _isClassic?: boolean
  ): MsgGroupWithdrawProposalV1 {
    return new MsgGroupWithdrawProposalV1(
      proto.proposalId.toNumber(),
      proto.address
    );
  }

  public toProto(_isClassic?: boolean): MsgGroupWithdrawProposalV1.Proto {
    const { proposal_id, address } = this;
    return MsgGroupWithdrawProposalV1_pb.fromPartial({
      proposalId: proposal_id,
      address,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.group.v1.MsgWithdrawProposal',
      value: MsgGroupWithdrawProposalV1_pb.encode(
        this.toProto(isClassic)
      ).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgGroupWithdrawProposalV1 {
    return MsgGroupWithdrawProposalV1.fromProto(
      MsgGroupWithdrawProposalV1_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgGroupWithdrawProposalV1 {
  export interface Amino {
    type: 'group/MsgWithdrawProposal' | 'cosmos-sdk/group/MsgWithdrawProposal';
    value: {
      proposal_id: string;
      address: AccAddress;
    };
  }

  export interface Data {
    '@type': '/cosmos.group.v1.MsgWithdrawProposal';
    proposal_id: string;
    address: AccAddress;
  }

  export type Proto = MsgGroupWithdrawProposalV1_pb;
}
