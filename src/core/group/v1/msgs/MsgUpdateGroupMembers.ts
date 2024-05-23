/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MemberRequest } from '@xpla/xpla.proto/cosmos/group/v1/types';
import { MsgUpdateGroupMembers as MsgUpdateGroupMembersV1_pb } from '@xpla/xpla.proto/cosmos/group/v1/tx';

export class MsgUpdateGroupMembersV1 extends JSONSerializable<
  MsgUpdateGroupMembersV1.Amino,
  MsgUpdateGroupMembersV1.Data,
  MsgUpdateGroupMembersV1.Proto
> {
  /**
   * @param admin is the account address of the group admin
   * @param group_id is the unique ID of the group
   * @param member_updates is the list of members to update
   */
  constructor(
    public admin: AccAddress,
    public group_id: number,
    public member_updates: MemberRequest[]
  ) {
    super();
  }

  public static fromAmino(
    data: MsgUpdateGroupMembersV1.Amino,
    _isClassic?: boolean
  ): MsgUpdateGroupMembersV1 {
    const {
      value: { admin, group_id, member_updates },
    } = data;
    return new MsgUpdateGroupMembersV1(
      admin,
      Number.parseInt(group_id),
      member_updates
    );
  }

  public toAmino(isClassic?: boolean): MsgUpdateGroupMembersV1.Amino {
    const { admin, group_id, member_updates } = this;
    return {
      type: isClassic
        ? 'group/MsgUpdateGroupMembers'
        : 'cosmos-sdk/MsgUpdateGroupMembers',
      value: {
        admin,
        group_id: group_id.toFixed(),
        member_updates,
      },
    };
  }

  public static fromData(
    data: MsgUpdateGroupMembersV1.Data,
    _isClassic?: boolean
  ): MsgUpdateGroupMembersV1 {
    const { admin, group_id, member_updates } = data;
    return new MsgUpdateGroupMembersV1(
      admin,
      Number.parseInt(group_id),
      member_updates
    );
  }

  public toData(_isClassic?: boolean): MsgUpdateGroupMembersV1.Data {
    const { admin, group_id, member_updates } = this;
    return {
      '@type': '/cosmos.group.v1.MsgUpdateGroupMembers',
      admin,
      group_id: group_id.toFixed(),
      member_updates,
    };
  }

  public static fromProto(
    proto: MsgUpdateGroupMembersV1.Proto,
    _isClassic?: boolean
  ): MsgUpdateGroupMembersV1 {
    return new MsgUpdateGroupMembersV1(
      proto.admin,
      proto.groupId.toNumber(),
      proto.memberUpdates
    );
  }

  public toProto(_isClassic?: boolean): MsgUpdateGroupMembersV1.Proto {
    const { admin, group_id, member_updates } = this;
    return MsgUpdateGroupMembersV1_pb.fromPartial({
      admin,
      groupId: group_id,
      memberUpdates: member_updates,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.group.v1.MsgUpdateGroupMembers',
      value: MsgUpdateGroupMembersV1_pb.encode(
        this.toProto(isClassic)
      ).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgUpdateGroupMembersV1 {
    return MsgUpdateGroupMembersV1.fromProto(
      MsgUpdateGroupMembersV1_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgUpdateGroupMembersV1 {
  export interface Amino {
    type: 'group/MsgUpdateGroupMembers' | 'cosmos-sdk/MsgUpdateGroupMembers';
    value: {
      admin: AccAddress;
      group_id: string;
      member_updates: MemberRequest[];
    };
  }

  export interface Data {
    '@type': '/cosmos.group.v1.MsgUpdateGroupMembers';
    admin: AccAddress;
    group_id: string;
    member_updates: MemberRequest[];
  }

  export type Proto = MsgUpdateGroupMembersV1_pb;
}
