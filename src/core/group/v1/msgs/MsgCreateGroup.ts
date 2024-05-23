/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MemberRequest } from '@xpla/xpla.proto/cosmos/group/v1/types';
import { MsgCreateGroup as MsgCreateGroupV1_pb } from '@xpla/xpla.proto/cosmos/group/v1/tx';

export class MsgCreateGroupV1 extends JSONSerializable<
  MsgCreateGroupV1.Amino,
  MsgCreateGroupV1.Data,
  MsgCreateGroupV1.Proto
> {
  /**
   * @param admin is the account address of the group admin
   * @param members defines the group members
   * @param metadata is any arbitrary metadata to attached to the group
   */
  constructor(
    public admin: AccAddress,
    public members: MemberRequest[],
    public metadata: string
  ) {
    super();
  }

  public static fromAmino(
    data: MsgCreateGroupV1.Amino,
    _isClassic?: boolean
  ): MsgCreateGroupV1 {
    const {
      value: { admin, members, metadata },
    } = data;
    return new MsgCreateGroupV1(admin, members, metadata);
  }

  public toAmino(isClassic?: boolean): MsgCreateGroupV1.Amino {
    const { admin, members, metadata } = this;
    return {
      type: isClassic ? 'group/MsgCreateGroup' : 'cosmos-sdk/MsgCreateGroup',
      value: {
        admin,
        members,
        metadata,
      },
    };
  }

  public static fromData(
    data: MsgCreateGroupV1.Data,
    _isClassic?: boolean
  ): MsgCreateGroupV1 {
    const { admin, members, metadata } = data;
    return new MsgCreateGroupV1(admin, members, metadata);
  }

  public toData(_isClassic?: boolean): MsgCreateGroupV1.Data {
    const { admin, members, metadata } = this;
    return {
      '@type': '/cosmos.group.v1.MsgCreateGroup',
      admin,
      members,
      metadata,
    };
  }

  public static fromProto(
    proto: MsgCreateGroupV1.Proto,
    _isClassic?: boolean
  ): MsgCreateGroupV1 {
    return new MsgCreateGroupV1(proto.admin, proto.members, proto.metadata);
  }

  public toProto(_isClassic?: boolean): MsgCreateGroupV1.Proto {
    const { admin, members, metadata } = this;
    return MsgCreateGroupV1_pb.fromPartial({
      admin,
      members,
      metadata,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.group.v1.MsgCreateGroup',
      value: MsgCreateGroupV1_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(msgAny: Any, isClassic?: boolean): MsgCreateGroupV1 {
    return MsgCreateGroupV1.fromProto(
      MsgCreateGroupV1_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgCreateGroupV1 {
  export interface Amino {
    type: 'group/MsgCreateGroup' | 'cosmos-sdk/MsgCreateGroup';
    value: {
      admin: string;
      members: MemberRequest[];
      metadata: string;
    };
  }

  export interface Data {
    '@type': '/cosmos.group.v1.MsgCreateGroup';
    admin: string;
    members: MemberRequest[];
    metadata: string;
  }

  export type Proto = MsgCreateGroupV1_pb;
}
