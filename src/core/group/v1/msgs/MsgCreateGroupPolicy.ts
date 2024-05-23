/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgCreateGroupPolicy as MsgCreateGroupPolicyV1_pb } from '@xpla/xpla.proto/cosmos/group/v1/tx';

export class MsgCreateGroupPolicyV1 extends JSONSerializable<
  MsgCreateGroupPolicyV1.Amino,
  MsgCreateGroupPolicyV1.Data,
  MsgCreateGroupPolicyV1.Proto
> {
  /**
   * @param admin is the account address of the group admin
   * @param group_id is the unique ID of the group
   * @param metadata is any arbitrary metadata attached to the group policy
   * @param decision_policy specifies the group policy's decision policy
   */
  constructor(
    public admin: AccAddress,
    public group_id: number,
    public metadata: string,
    public decision_policy: Any | undefined
  ) {
    super();
  }

  public static fromAmino(
    data: MsgCreateGroupPolicyV1.Amino,
    _isClassic?: boolean
  ): MsgCreateGroupPolicyV1 {
    const {
      value: { admin, group_id, metadata, decision_policy },
    } = data;
    return new MsgCreateGroupPolicyV1(
      admin,
      Number.parseInt(group_id),
      metadata,
      decision_policy
    );
  }

  public toAmino(isClassic?: boolean): MsgCreateGroupPolicyV1.Amino {
    const { admin, group_id, metadata, decision_policy } = this;
    return {
      type: isClassic
        ? 'group/MsgCreateGroupPolicy'
        : 'cosmos-sdk/MsgCreateGroupPolicy',
      value: {
        admin,
        group_id: group_id.toFixed(),
        metadata,
        decision_policy,
      },
    };
  }

  public static fromData(
    data: MsgCreateGroupPolicyV1.Data,
    _isClassic?: boolean
  ): MsgCreateGroupPolicyV1 {
    const { admin, group_id, metadata, decision_policy } = data;
    return new MsgCreateGroupPolicyV1(
      admin,
      Number.parseInt(group_id),
      metadata,
      decision_policy
    );
  }

  public toData(_isClassic?: boolean): MsgCreateGroupPolicyV1.Data {
    const { admin, group_id, metadata, decision_policy } = this;
    return {
      '@type': '/cosmos.group.v1.MsgCreateGroupPolicy',
      admin,
      group_id: group_id.toFixed(),
      metadata,
      decision_policy,
    };
  }

  public static fromProto(
    proto: MsgCreateGroupPolicyV1.Proto,
    _isClassic?: boolean
  ): MsgCreateGroupPolicyV1 {
    return new MsgCreateGroupPolicyV1(
      proto.admin,
      proto.groupId.toNumber(),
      proto.metadata,
      proto.decisionPolicy
    );
  }

  public toProto(_isClassic?: boolean): MsgCreateGroupPolicyV1.Proto {
    const { admin, group_id, metadata, decision_policy } = this;
    return MsgCreateGroupPolicyV1_pb.fromPartial({
      admin,
      groupId: group_id,
      metadata,
      decisionPolicy: decision_policy,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.group.v1.MsgCreateGroupPolicy',
      value: MsgCreateGroupPolicyV1_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgCreateGroupPolicyV1 {
    return MsgCreateGroupPolicyV1.fromProto(
      MsgCreateGroupPolicyV1_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgCreateGroupPolicyV1 {
  export interface Amino {
    type: 'group/MsgCreateGroupPolicy' | 'cosmos-sdk/MsgCreateGroupPolicy';
    value: {
      admin: AccAddress;
      group_id: string;
      metadata: string;
      decision_policy: Any | undefined;
    };
  }

  export interface Data {
    '@type': '/cosmos.group.v1.MsgCreateGroupPolicy';
    admin: AccAddress;
    group_id: string;
    metadata: string;
    decision_policy: Any | undefined;
  }

  export type Proto = MsgCreateGroupPolicyV1_pb;
}
