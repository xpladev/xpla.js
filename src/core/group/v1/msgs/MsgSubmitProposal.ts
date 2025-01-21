/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import {
  Exec,
  MsgSubmitProposal as MsgGroupSubmitProposalV1_pb,
} from '@xpla/xpla.proto/cosmos/group/v1/tx';

export class MsgGroupSubmitProposalV1 extends JSONSerializable<
  MsgGroupSubmitProposalV1.Amino,
  MsgGroupSubmitProposalV1.Data,
  MsgGroupSubmitProposalV1.Proto
> {
  /**
   * @param group_policy_address is the account address of group policy
   * @param proposers are the account addresses of the proposers
   * @param metadata is any arbitrary metadata attached to the proposal
   * @param messages is a list of `sdk.Msg`s that will be executed if the proposal passes
   * @param exec defines the mode of execution of the proposal, whether it should be executed immediately on creation or not
   * @param title is the title of the proposal
   * @param summary is the summary of the proposal
   */
  constructor(
    public group_policy_address: AccAddress,
    public proposers: AccAddress[],
    public metadata: string,
    public messages: Any[],
    public exec: Exec,
    public title: string,
    public summary: string
  ) {
    super();
  }

  public static fromAmino(
    data: MsgGroupSubmitProposalV1.Amino,
    _isClassic?: boolean
  ): MsgGroupSubmitProposalV1 {
    const {
      value: {
        group_policy_address,
        proposers,
        metadata,
        messages,
        exec,
        title,
        summary,
      },
    } = data;
    return new MsgGroupSubmitProposalV1(
      group_policy_address,
      proposers,
      metadata,
      messages,
      exec,
      title,
      summary
    );
  }

  public toAmino(isClassic?: boolean): MsgGroupSubmitProposalV1.Amino {
    const {
      group_policy_address,
      proposers,
      metadata,
      messages,
      exec,
      title,
      summary,
    } = this;
    return {
      type: isClassic
        ? 'group/MsgSubmitProposal'
        : 'cosmos-sdk/group/MsgSubmitProposal',
      value: {
        group_policy_address,
        proposers,
        metadata,
        messages,
        exec,
        title,
        summary,
      },
    };
  }

  public static fromData(
    data: MsgGroupSubmitProposalV1.Data,
    _isClassic?: boolean
  ): MsgGroupSubmitProposalV1 {
    const {
      group_policy_address,
      proposers,
      metadata,
      messages,
      exec,
      title,
      summary,
    } = data;
    return new MsgGroupSubmitProposalV1(
      group_policy_address,
      proposers,
      metadata,
      messages,
      exec,
      title,
      summary
    );
  }

  public toData(_isClassic?: boolean): MsgGroupSubmitProposalV1.Data {
    const {
      group_policy_address,
      proposers,
      metadata,
      messages,
      exec,
      title,
      summary,
    } = this;
    return {
      '@type': '/cosmos.group.v1.MsgSubmitProposal',
      group_policy_address,
      proposers,
      metadata,
      messages,
      exec,
      title,
      summary,
    };
  }

  public static fromProto(
    proto: MsgGroupSubmitProposalV1.Proto,
    _isClassic?: boolean
  ): MsgGroupSubmitProposalV1 {
    return new MsgGroupSubmitProposalV1(
      proto.groupPolicyAddress,
      proto.proposers,
      proto.metadata,
      proto.messages,
      proto.exec,
      proto.title,
      proto.summary
    );
  }

  public toProto(_isClassic?: boolean): MsgGroupSubmitProposalV1.Proto {
    const {
      group_policy_address,
      proposers,
      metadata,
      messages,
      exec,
      title,
      summary,
    } = this;
    return MsgGroupSubmitProposalV1_pb.fromPartial({
      groupPolicyAddress: group_policy_address,
      proposers,
      metadata,
      messages,
      exec,
      title,
      summary,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.group.v1.MsgSubmitProposal',
      value: MsgGroupSubmitProposalV1_pb.encode(
        this.toProto(isClassic)
      ).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgGroupSubmitProposalV1 {
    return MsgGroupSubmitProposalV1.fromProto(
      MsgGroupSubmitProposalV1_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgGroupSubmitProposalV1 {
  export interface Amino {
    type: 'group/MsgSubmitProposal' | 'cosmos-sdk/group/MsgSubmitProposal';
    value: {
      group_policy_address: AccAddress;
      proposers: AccAddress[];
      metadata: string;
      messages: Any[];
      exec: Exec;
      title: string;
      summary: string;
    };
  }

  export interface Data {
    '@type': '/cosmos.group.v1.MsgSubmitProposal';
    group_policy_address: AccAddress;
    proposers: AccAddress[];
    metadata: string;
    messages: Any[];
    exec: Exec;
    title: string;
    summary: string;
  }

  export type Proto = MsgGroupSubmitProposalV1_pb;
}
