/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MemberRequest } from '@xpla/xpla.proto/cosmos/group/v1/types';
import { MsgCreateGroupWithPolicy as MsgCreateGroupWithPolicyV1_pb } from '@xpla/xpla.proto/cosmos/group/v1/tx';

export class MsgCreateGroupWithPolicyV1 extends JSONSerializable<
  MsgCreateGroupWithPolicyV1.Amino,
  MsgCreateGroupWithPolicyV1.Data,
  MsgCreateGroupWithPolicyV1.Proto
> {
  /**
   * @param admin is the account address of the group and group policy admin
   * @param members defines the group members
   * @param group_metadata is any arbitrary metadata attached to the group
   * @param group_policy_metadata is any arbitrary metadata attached to the group policy
   * @param group_policy_as_admin is a boolean field, if set to true, the group policy account address will be used as group and group policy admin
   * @param decision_policy specifies the group policy's decision policy
   */
  constructor(
    public admin: AccAddress,
    public members: MemberRequest[],
    public group_metadata: string,
    public group_policy_metadata: string,
    public group_policy_as_admin: boolean,
    public decision_policy: Any | undefined
  ) {
    super();
  }

  public static fromAmino(
    data: MsgCreateGroupWithPolicyV1.Amino,
    _isClassic?: boolean
  ): MsgCreateGroupWithPolicyV1 {
    const {
      value: {
        admin,
        members,
        group_metadata,
        group_policy_metadata,
        group_policy_as_admin,
        decision_policy,
      },
    } = data;
    return new MsgCreateGroupWithPolicyV1(
      admin,
      members,
      group_metadata,
      group_policy_metadata,
      group_policy_as_admin,
      decision_policy
    );
  }

  public toAmino(isClassic?: boolean): MsgCreateGroupWithPolicyV1.Amino {
    const {
      admin,
      members,
      group_metadata,
      group_policy_metadata,
      group_policy_as_admin,
      decision_policy,
    } = this;
    return {
      type: isClassic
        ? 'group/MsgCreateGroupWithPolicy'
        : 'cosmos-sdk/MsgCreateGroupWithPolicy',
      value: {
        admin,
        members,
        group_metadata,
        group_policy_metadata,
        group_policy_as_admin,
        decision_policy,
      },
    };
  }

  public static fromData(
    data: MsgCreateGroupWithPolicyV1.Data,
    _isClassic?: boolean
  ): MsgCreateGroupWithPolicyV1 {
    const {
      admin,
      members,
      group_metadata,
      group_policy_metadata,
      group_policy_as_admin,
      decision_policy,
    } = data;
    return new MsgCreateGroupWithPolicyV1(
      admin,
      members,
      group_metadata,
      group_policy_metadata,
      group_policy_as_admin,
      decision_policy
    );
  }

  public toData(_isClassic?: boolean): MsgCreateGroupWithPolicyV1.Data {
    const {
      admin,
      members,
      group_metadata,
      group_policy_metadata,
      group_policy_as_admin,
      decision_policy,
    } = this;
    return {
      '@type': '/cosmos.group.v1.MsgCreateGroupWithPolicy',
      admin,
      members,
      group_metadata,
      group_policy_metadata,
      group_policy_as_admin,
      decision_policy,
    };
  }

  public static fromProto(
    proto: MsgCreateGroupWithPolicyV1.Proto,
    _isClassic?: boolean
  ): MsgCreateGroupWithPolicyV1 {
    return new MsgCreateGroupWithPolicyV1(
      proto.admin,
      proto.members,
      proto.groupMetadata,
      proto.groupPolicyMetadata,
      proto.groupPolicyAsAdmin,
      proto.decisionPolicy
    );
  }

  public toProto(_isClassic?: boolean): MsgCreateGroupWithPolicyV1.Proto {
    const {
      admin,
      members,
      group_metadata,
      group_policy_metadata,
      group_policy_as_admin,
      decision_policy,
    } = this;
    return MsgCreateGroupWithPolicyV1_pb.fromPartial({
      admin,
      members,
      groupMetadata: group_metadata,
      groupPolicyMetadata: group_policy_metadata,
      groupPolicyAsAdmin: group_policy_as_admin,
      decisionPolicy: decision_policy,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.group.v1.MsgCreateGroupWithPolicy',
      value: MsgCreateGroupWithPolicyV1_pb.encode(
        this.toProto(isClassic)
      ).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgCreateGroupWithPolicyV1 {
    return MsgCreateGroupWithPolicyV1.fromProto(
      MsgCreateGroupWithPolicyV1_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgCreateGroupWithPolicyV1 {
  export interface Amino {
    type:
      | 'group/MsgCreateGroupWithPolicy'
      | 'cosmos-sdk/MsgCreateGroupWithPolicy';
    value: {
      admin: AccAddress;
      members: MemberRequest[];
      group_metadata: string;
      group_policy_metadata: string;
      group_policy_as_admin: boolean;
      decision_policy: Any | undefined;
    };
  }

  export interface Data {
    '@type': '/cosmos.group.v1.MsgCreateGroupWithPolicy';
    admin: AccAddress;
    members: MemberRequest[];
    group_metadata: string;
    group_policy_metadata: string;
    group_policy_as_admin: boolean;
    decision_policy: Any | undefined;
  }

  export type Proto = MsgCreateGroupWithPolicyV1_pb;
}
