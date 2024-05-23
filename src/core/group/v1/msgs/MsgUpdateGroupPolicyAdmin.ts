/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgUpdateGroupPolicyAdmin as MsgUpdateGroupPolicyAdminV1_pb } from '@xpla/xpla.proto/cosmos/group/v1/tx';

export class MsgUpdateGroupPolicyAdminV1 extends JSONSerializable<
  MsgUpdateGroupPolicyAdminV1.Amino,
  MsgUpdateGroupPolicyAdminV1.Data,
  MsgUpdateGroupPolicyAdminV1.Proto
> {
  /**
   * @param admin is the account address of the group admin
   * @param group_policy_address is the account address of the group policy
   * @param new_admin is the new group policy admin
   */
  constructor(
    public admin: AccAddress,
    public group_policy_address: AccAddress,
    public new_admin: AccAddress
  ) {
    super();
  }

  public static fromAmino(
    data: MsgUpdateGroupPolicyAdminV1.Amino,
    _isClassic?: boolean
  ): MsgUpdateGroupPolicyAdminV1 {
    const {
      value: { admin, group_policy_address, new_admin },
    } = data;
    return new MsgUpdateGroupPolicyAdminV1(
      admin,
      group_policy_address,
      new_admin
    );
  }

  public toAmino(isClassic?: boolean): MsgUpdateGroupPolicyAdminV1.Amino {
    const { admin, group_policy_address, new_admin } = this;
    return {
      type: isClassic
        ? 'group/MsgUpdateGroupPolicyAdmin'
        : 'cosmos-sdk/MsgUpdateGroupPolicyAdmin',
      value: {
        admin,
        group_policy_address,
        new_admin,
      },
    };
  }

  public static fromData(
    data: MsgUpdateGroupPolicyAdminV1.Data,
    _isClassic?: boolean
  ): MsgUpdateGroupPolicyAdminV1 {
    const { admin, group_policy_address, new_admin } = data;
    return new MsgUpdateGroupPolicyAdminV1(
      admin,
      group_policy_address,
      new_admin
    );
  }

  public toData(_isClassic?: boolean): MsgUpdateGroupPolicyAdminV1.Data {
    const { admin, group_policy_address, new_admin } = this;
    return {
      '@type': '/cosmos.group.v1.MsgUpdateGroupPolicyAdmin',
      admin,
      group_policy_address,
      new_admin,
    };
  }

  public static fromProto(
    proto: MsgUpdateGroupPolicyAdminV1.Proto,
    _isClassic?: boolean
  ): MsgUpdateGroupPolicyAdminV1 {
    return new MsgUpdateGroupPolicyAdminV1(
      proto.admin,
      proto.groupPolicyAddress,
      proto.newAdmin
    );
  }

  public toProto(_isClassic?: boolean): MsgUpdateGroupPolicyAdminV1.Proto {
    const { admin, group_policy_address, new_admin } = this;
    return MsgUpdateGroupPolicyAdminV1_pb.fromPartial({
      admin: admin,
      groupPolicyAddress: group_policy_address,
      newAdmin: new_admin,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.group.v1.MsgUpdateGroupPolicyAdmin',
      value: MsgUpdateGroupPolicyAdminV1_pb.encode(
        this.toProto(isClassic)
      ).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgUpdateGroupPolicyAdminV1 {
    return MsgUpdateGroupPolicyAdminV1.fromProto(
      MsgUpdateGroupPolicyAdminV1_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgUpdateGroupPolicyAdminV1 {
  export interface Amino {
    type:
      | 'group/MsgUpdateGroupPolicyAdmin'
      | 'cosmos-sdk/MsgUpdateGroupPolicyAdmin';
    value: {
      admin: AccAddress;
      group_policy_address: AccAddress;
      new_admin: AccAddress;
    };
  }

  export interface Data {
    '@type': '/cosmos.group.v1.MsgUpdateGroupPolicyAdmin';
    admin: AccAddress;
    group_policy_address: AccAddress;
    new_admin: AccAddress;
  }

  export type Proto = MsgUpdateGroupPolicyAdminV1_pb;
}
