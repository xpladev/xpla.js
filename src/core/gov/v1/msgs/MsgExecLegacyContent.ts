/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgExecLegacyContent as MsgExecLegacyContentV1_pb } from '@xpla/xpla.proto/cosmos/gov/v1/tx';

/**
 * Vote for a proposal
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
  constructor(public authority: AccAddress, public content?: Any | undefined) {
    super();
  }

  public static fromAmino(
    data: MsgExecLegacyContentV1.Amino,
    _isClassic?: boolean
  ): MsgExecLegacyContentV1 {
    const {
      value: { content, authority },
    } = data;
    return new MsgExecLegacyContentV1(authority, content);
  }

  public toAmino(isClassic?: boolean): MsgExecLegacyContentV1.Amino {
    const { content, authority } = this;
    return {
      type: isClassic
        ? 'gov/MsgExecLegacyContent'
        : 'cosmos-sdk/MsgExecLegacyContent',
      value: {
        content,
        authority,
      },
    };
  }

  public static fromData(
    data: MsgExecLegacyContentV1.Data,
    _isClassic?: boolean
  ): MsgExecLegacyContentV1 {
    const { content, authority } = data;
    return new MsgExecLegacyContentV1(authority, content);
  }

  public toData(_isClassic?: boolean): MsgExecLegacyContentV1.Data {
    const { content, authority } = this;
    return {
      '@type': '/cosmos.gov.v1.MsgExecLegacyContent',
      content,
      authority,
    };
  }

  public static fromProto(
    proto: MsgExecLegacyContentV1.Proto,
    _isClassic?: boolean
  ): MsgExecLegacyContentV1 {
    return new MsgExecLegacyContentV1(proto.authority, proto.content);
  }

  public toProto(_isClassic?: boolean): MsgExecLegacyContentV1.Proto {
    const { content, authority } = this;
    return MsgExecLegacyContentV1_pb.fromPartial({
      content,
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
      content: Any | undefined;
      authority: AccAddress;
    };
  }

  export interface Data {
    '@type': '/cosmos.gov.v1.MsgExecLegacyContent';
    content: Any | undefined;
    authority: AccAddress;
  }

  export type Proto = MsgExecLegacyContentV1_pb;
}
