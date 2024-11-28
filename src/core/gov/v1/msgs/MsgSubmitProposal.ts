/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { Coins } from '../../../Coins';
import { AccAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgSubmitProposal as MsgSubmitProposalV1_pb } from '@xpla/xpla.proto/cosmos/gov/v1/tx';
import { Msg } from '../../../Msg';

/**
 * Submit a proposal alongside an initial deposit.
 */
export class MsgSubmitProposalV1 extends JSONSerializable<
  MsgSubmitProposalV1.Amino,
  MsgSubmitProposalV1.Data,
  MsgSubmitProposalV1.Proto
> {
  public initial_deposit: Coins;

  /**
   * @param messages are the arbitrary messages to be executed if proposal passes
   * @param initial_deposit is the deposit value that must be paid at proposal submission
   * @param proposer is the account address of the proposer
   * @param metadata is any arbitrary metadata attached to the proposal
   * @param title is the title of the proposal
   * @param summary is the summary of the proposal
   * @param expedited is if the proposal is expedited or not
   */
  constructor(
    public messages: Msg[],
    initial_deposit: Coins.Input,
    public proposer: AccAddress,
    public metadata: string,
    public title: string,
    public summary: string,
    public expedited: boolean = false,
  ) {
    super();
    this.initial_deposit = new Coins(initial_deposit);
  }

  public static fromAmino(
    data: MsgSubmitProposalV1.Amino,
    _isClassic?: boolean
  ): MsgSubmitProposalV1 {
    const {
      value: { messages, initial_deposit, proposer, metadata, title, summary, expedited },
    } = data;
    return new MsgSubmitProposalV1(
      messages.map(a => Msg.fromAmino(a)),
      Coins.fromAmino(initial_deposit),
      proposer,
      metadata ?? '',
      title,
      summary,
      expedited,
    );
  }

  public toAmino(_isClassic?: boolean): MsgSubmitProposalV1.Amino {
    const { messages, initial_deposit, proposer, metadata, title, summary, expedited } =
      this;
    return {
      type: 'cosmos-sdk/v1/MsgSubmitProposal',
      value: {
        messages: messages.map(a => a.toAmino()),
        initial_deposit: initial_deposit.toAmino(),
        proposer,
        metadata: metadata ? metadata : undefined,
        title,
        summary,
        expedited,
      },
    };
  }

  public static fromData(
    data: MsgSubmitProposalV1.Data,
    _isClassic?: boolean
  ): MsgSubmitProposalV1 {
    const { messages, initial_deposit, proposer, metadata, title, summary, expedited } =
      data;
    return new MsgSubmitProposalV1(
      messages.map(a => Msg.fromData(a)),
      Coins.fromData(initial_deposit),
      proposer,
      metadata ?? '',
      title,
      summary,
      expedited,
    );
  }

  public toData(_isClassic?: boolean): MsgSubmitProposalV1.Data {
    const { messages, initial_deposit, proposer, metadata, title, summary, expedited } =
      this;
    return {
      '@type': '/cosmos.gov.v1.MsgSubmitProposal',
      messages: messages.map(a => a.toData()),
      initial_deposit: initial_deposit.toData(),
      proposer,
      metadata: metadata ? metadata : undefined,
      title,
      summary,
      expedited,
    };
  }

  public static fromProto(
    proto: MsgSubmitProposalV1.Proto,
    _isClassic?: boolean
  ): MsgSubmitProposalV1 {
    return new MsgSubmitProposalV1(
      proto.messages.map(m => Msg.fromProto(m)),
      Coins.fromProto(proto.initialDeposit),
      proto.proposer,
      proto.metadata,
      proto.title,
      proto.summary,
      proto.expedited,
    );
  }

  public toProto(_isClassic?: boolean): MsgSubmitProposalV1.Proto {
    const { messages, initial_deposit, proposer, metadata, title, summary, expedited } =
      this;
    return MsgSubmitProposalV1_pb.fromPartial({
      messages: messages.map(m => m.packAny()),
      initialDeposit: initial_deposit.toProto(),
      proposer,
      metadata,
      title,
      summary,
      expedited,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.gov.v1.MsgSubmitProposal',
      value: MsgSubmitProposalV1_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgSubmitProposalV1 {
    return MsgSubmitProposalV1.fromProto(
      MsgSubmitProposalV1_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgSubmitProposalV1 {
  export interface Amino {
    type: 'cosmos-sdk/v1/MsgSubmitProposal';
    value: {
      messages: Msg.Amino[];
      initial_deposit: Coins.Amino;
      proposer: AccAddress;
      metadata?: string;
      title: string;
      summary: string;
      expedited: boolean;
    };
  }

  export interface Data {
    '@type': '/cosmos.gov.v1.MsgSubmitProposal';
    messages: Msg.Data[];
    initial_deposit: Coins.Amino;
    proposer: AccAddress;
    metadata?: string;
    title: string;
    summary: string;
    expedited: boolean;
  }

  export type Proto = MsgSubmitProposalV1_pb;
}
