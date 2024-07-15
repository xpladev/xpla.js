/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgExecLegacyContent as MsgExecLegacyContentV1_pb } from '@xpla/xpla.proto/cosmos/gov/v1/tx';
import { ProposalV1B1 } from '../../v1beta1/Proposal';

/**
 * MsgExecLegacyContent is used to wrap the legacy content field into a message.
 * This ensures backwards compatibility with v1beta1.MsgSubmitProposal.
 */
export class MsgExecLegacyContentV1 extends JSONSerializable<
  MsgExecLegacyContentV1.Amino,
  MsgExecLegacyContentV1.Data,
  MsgExecLegacyContentV1.Proto
> {
  /**
   * @param proposal_id ID of proposal to vote on
   * @param voter voter's account address
   * @param option one of voting options
   */
  constructor(
    public authority: AccAddress,
    public content?: ProposalV1B1.Content | undefined
  ) {
    super();
  }

  public static fromAmino(
    data: MsgExecLegacyContentV1.Amino,
    _isClassic?: boolean
  ): MsgExecLegacyContentV1 {
    const {
      value: { content, authority },
    } = data;
    return new MsgExecLegacyContentV1(
      authority,
      content ? ProposalV1B1.Content.fromAmino(content) : undefined
    );
  }

  public toAmino(isClassic?: boolean): MsgExecLegacyContentV1.Amino {
    const { content, authority } = this;
    return {
      type: isClassic
        ? 'gov/MsgExecLegacyContent'
        : 'cosmos-sdk/MsgExecLegacyContent',
      value: {
        content: content?.toAmino(),
        authority,
      },
    };
  }

  public static fromData(
    data: MsgExecLegacyContentV1.Data,
    _isClassic?: boolean
  ): MsgExecLegacyContentV1 {
    const { content, authority } = data;
    return new MsgExecLegacyContentV1(
      authority,
      content ? ProposalV1B1.Content.fromData(content) : undefined
    );
  }

  public toData(_isClassic?: boolean): MsgExecLegacyContentV1.Data {
    const { content, authority } = this;
    return {
      '@type': '/cosmos.gov.v1.MsgExecLegacyContent',
      content: content?.toData(),
      authority,
    };
  }

  public static fromProto(
    proto: MsgExecLegacyContentV1.Proto,
    _isClassic?: boolean
  ): MsgExecLegacyContentV1 {
    return new MsgExecLegacyContentV1(
      proto.authority,
      proto.content ? ProposalV1B1.Content.fromProto(proto.content) : undefined
    );
  }

  public toProto(_isClassic?: boolean): MsgExecLegacyContentV1.Proto {
    const { content, authority } = this;
    return MsgExecLegacyContentV1_pb.fromPartial({
      content: content?.packAny(),
      authority,
    });
  }

  public packAny(_isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.gov.v1.MsgExecLegacyContent',
      value: MsgExecLegacyContentV1_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    _isClassic?: boolean
  ): MsgExecLegacyContentV1 {
    return MsgExecLegacyContentV1.fromProto(
      MsgExecLegacyContentV1_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgExecLegacyContentV1 {
  export interface Amino {
    type: 'gov/MsgExecLegacyContent' | 'cosmos-sdk/MsgExecLegacyContent';
    value: {
      content: ProposalV1B1.Content.Amino | undefined;
      authority: AccAddress;
    };
  }

  export interface Data {
    '@type': '/cosmos.gov.v1.MsgExecLegacyContent';
    content: ProposalV1B1.Content.Data | undefined;
    authority: AccAddress;
  }

  export type Proto = MsgExecLegacyContentV1_pb;
}
