import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Coins } from '../../../Coins';
import { ProposalV1B1 } from '../Proposal';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgSubmitProposal as MsgSubmitProposalV1B1_pb } from '@xpla/xpla.proto/cosmos/gov/v1beta1/tx';

/**
 * Submit a proposal alongside an initial deposit.
 */
export class MsgSubmitProposalV1B1 extends JSONSerializable<
  MsgSubmitProposalV1B1.Amino,
  MsgSubmitProposalV1B1.Data,
  MsgSubmitProposalV1B1.Proto
> {
  public initial_deposit: Coins;

  /**
   * @param content proposal content to submit
   * @param initial_deposit deposit provided
   * @param proposer proposer's account address
   */
  constructor(
    public content: ProposalV1B1.Content,
    initial_deposit: Coins.Input,
    public proposer: AccAddress
  ) {
    super();
    this.initial_deposit = new Coins(initial_deposit);
  }

  public static fromAmino(
    data: MsgSubmitProposalV1B1.Amino,
    isClassic?: boolean
  ): MsgSubmitProposalV1B1 {
    const {
      value: { content, initial_deposit, proposer },
    } = data;
    return new MsgSubmitProposalV1B1(
      ProposalV1B1.Content.fromAmino(content, isClassic),
      Coins.fromAmino(initial_deposit),
      proposer
    );
  }

  public toAmino(isClassic?: boolean): MsgSubmitProposalV1B1.Amino {
    const { content, initial_deposit, proposer } = this;
    return {
      type: isClassic
        ? 'gov/MsgSubmitProposal'
        : 'cosmos-sdk/MsgSubmitProposal',
      value: {
        content: content.toAmino(isClassic),
        initial_deposit: initial_deposit.toAmino(),
        proposer,
      },
    };
  }

  public static fromData(
    data: MsgSubmitProposalV1B1.Data,
    isClassic?: boolean
  ): MsgSubmitProposalV1B1 {
    const { content, initial_deposit, proposer } = data;
    return new MsgSubmitProposalV1B1(
      ProposalV1B1.Content.fromData(content, isClassic),
      Coins.fromData(initial_deposit),
      proposer
    );
  }

  public toData(isClassic?: boolean): MsgSubmitProposalV1B1.Data {
    const { content, initial_deposit, proposer } = this;
    return {
      '@type': '/cosmos.gov.v1beta1.MsgSubmitProposal',
      content: content.toData(isClassic),
      initial_deposit: initial_deposit.toData(),
      proposer,
    };
  }

  public static fromProto(
    proto: MsgSubmitProposalV1B1.Proto,
    isClassic?: boolean
  ): MsgSubmitProposalV1B1 {
    return new MsgSubmitProposalV1B1(
      ProposalV1B1.Content.fromProto(proto.content as any, isClassic),
      Coins.fromProto(proto.initialDeposit),
      proto.proposer
    );
  }

  public toProto(isClassic?: boolean): MsgSubmitProposalV1B1.Proto {
    const { content, initial_deposit, proposer } = this;
    return MsgSubmitProposalV1B1_pb.fromPartial({
      content: content.packAny(isClassic),
      initialDeposit: initial_deposit.toProto(),
      proposer,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.gov.v1beta1.MsgSubmitProposal',
      value: MsgSubmitProposalV1B1_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgSubmitProposalV1B1 {
    return MsgSubmitProposalV1B1.fromProto(
      MsgSubmitProposalV1B1_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgSubmitProposalV1B1 {
  export interface Amino {
    type: 'gov/MsgSubmitProposal' | 'cosmos-sdk/MsgSubmitProposal';
    value: {
      content: ProposalV1B1.Content.Amino;
      initial_deposit: Coins.Amino;
      proposer: AccAddress;
    };
  }

  export interface Data {
    '@type': '/cosmos.gov.v1beta1.MsgSubmitProposal';
    content: ProposalV1B1.Content.Data;
    initial_deposit: Coins.Data;
    proposer: AccAddress;
  }

  export type Proto = MsgSubmitProposalV1B1_pb;
}
