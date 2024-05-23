/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgUpdateGroupPolicyDecisionPolicy as MsgUpdateGroupPolicyDecisionPolicyV1_pb } from '@xpla/xpla.proto/cosmos/group/v1/tx';

export class MsgUpdateGroupPolicyDecisionPolicyV1 extends JSONSerializable<
  MsgUpdateGroupPolicyDecisionPolicyV1.Amino,
  MsgUpdateGroupPolicyDecisionPolicyV1.Data,
  MsgUpdateGroupPolicyDecisionPolicyV1.Proto
> {
  /**
   * @param authority
   * @param send_enabled is the list of entries to add or update
   * @param use_default_for is a list of denoms that should use the params.default_send_enabled value
   */
  constructor(
    public admin: AccAddress,
    public group_policy_address: AccAddress,
    public decision_policy: Any | undefined
  ) {
    super();
  }

  public static fromAmino(
    data: MsgUpdateGroupPolicyDecisionPolicyV1.Amino,
    _isClassic?: boolean
  ): MsgUpdateGroupPolicyDecisionPolicyV1 {
    const {
      value: { admin, group_policy_address, decision_policy },
    } = data;
    return new MsgUpdateGroupPolicyDecisionPolicyV1(
      admin,
      group_policy_address,
      decision_policy
    );
  }

  public toAmino(
    isClassic?: boolean
  ): MsgUpdateGroupPolicyDecisionPolicyV1.Amino {
    const { admin, group_policy_address, decision_policy } = this;
    return {
      type: isClassic
        ? 'group/MsgUpdateGroupPolicyDecisionPolicy'
        : 'cosmos-sdk/MsgUpdateGroupPolicyDecisionPolicy',
      value: {
        admin,
        group_policy_address,
        decision_policy,
      },
    };
  }

  public static fromData(
    data: MsgUpdateGroupPolicyDecisionPolicyV1.Data,
    _isClassic?: boolean
  ): MsgUpdateGroupPolicyDecisionPolicyV1 {
    const { admin, group_policy_address, decision_policy } = data;
    return new MsgUpdateGroupPolicyDecisionPolicyV1(
      admin,
      group_policy_address,
      decision_policy
    );
  }

  public toData(
    _isClassic?: boolean
  ): MsgUpdateGroupPolicyDecisionPolicyV1.Data {
    const { admin, group_policy_address, decision_policy } = this;
    return {
      '@type': '/cosmos.group.v1.MsgUpdateGroupPolicyDecisionPolicy',
      admin,
      group_policy_address,
      decision_policy,
    };
  }

  public static fromProto(
    proto: MsgUpdateGroupPolicyDecisionPolicyV1.Proto,
    _isClassic?: boolean
  ): MsgUpdateGroupPolicyDecisionPolicyV1 {
    return new MsgUpdateGroupPolicyDecisionPolicyV1(
      proto.admin,
      proto.groupPolicyAddress,
      proto.decisionPolicy
    );
  }

  public toProto(
    _isClassic?: boolean
  ): MsgUpdateGroupPolicyDecisionPolicyV1.Proto {
    const { admin, group_policy_address, decision_policy } = this;
    return MsgUpdateGroupPolicyDecisionPolicyV1_pb.fromPartial({
      admin,
      groupPolicyAddress: group_policy_address,
      decisionPolicy: decision_policy,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.group.v1.MsgUpdateGroupPolicyDecisionPolicy',
      value: MsgUpdateGroupPolicyDecisionPolicyV1_pb.encode(
        this.toProto(isClassic)
      ).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgUpdateGroupPolicyDecisionPolicyV1 {
    return MsgUpdateGroupPolicyDecisionPolicyV1.fromProto(
      MsgUpdateGroupPolicyDecisionPolicyV1_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgUpdateGroupPolicyDecisionPolicyV1 {
  export interface Amino {
    type:
      | 'group/MsgUpdateGroupPolicyDecisionPolicy'
      | 'cosmos-sdk/MsgUpdateGroupPolicyDecisionPolicy';
    value: {
      admin: AccAddress;
      group_policy_address: AccAddress;
      decision_policy: Any | undefined;
    };
  }

  export interface Data {
    '@type': '/cosmos.group.v1.MsgUpdateGroupPolicyDecisionPolicy';
    admin: AccAddress;
    group_policy_address: AccAddress;
    decision_policy: Any | undefined;
  }

  export type Proto = MsgUpdateGroupPolicyDecisionPolicyV1_pb;
}
