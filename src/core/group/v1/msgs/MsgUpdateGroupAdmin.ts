/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgUpdateGroupAdmin as MsgUpdateGroupAdminV1_pb } from '@xpla/xpla.proto/cosmos/group/v1/tx';

export class MsgUpdateGroupAdminV1 extends JSONSerializable<
  MsgUpdateGroupAdminV1.Amino,
  MsgUpdateGroupAdminV1.Data,
  MsgUpdateGroupAdminV1.Proto
> {
  /**
   * @param admin is the current account address of the group admin
   * @param group_id is the unique ID of the group
   * @param new_admin is the group new admin account address
   */
  constructor(
    public admin: AccAddress,
    public group_id: number,
    public new_admin: AccAddress
  ) {
    super();
  }

  public static fromAmino(
    data: MsgUpdateGroupAdminV1.Amino,
    _isClassic?: boolean
  ): MsgUpdateGroupAdminV1 {
    const {
      value: { admin, group_id, new_admin },
    } = data;
    return new MsgUpdateGroupAdminV1(
      admin,
      Number.parseInt(group_id),
      new_admin
    );
  }

  public toAmino(isClassic?: boolean): MsgUpdateGroupAdminV1.Amino {
    const { admin, group_id, new_admin } = this;
    return {
      type: isClassic
        ? 'group/MsgUpdateGroupAdmin'
        : 'cosmos-sdk/MsgUpdateGroupAdmin',
      value: {
        admin,
        group_id: group_id.toString(),
        new_admin,
      },
    };
  }

  public static fromData(
    data: MsgUpdateGroupAdminV1.Data,
    _isClassic?: boolean
  ): MsgUpdateGroupAdminV1 {
    const { admin, group_id, new_admin } = data;
    return new MsgUpdateGroupAdminV1(
      admin,
      Number.parseInt(group_id),
      new_admin
    );
  }

  public toData(_isClassic?: boolean): MsgUpdateGroupAdminV1.Data {
    const { admin, group_id, new_admin } = this;
    return {
      '@type': '/cosmos.group.v1.MsgUpdateGroupAdmin',
      admin,
      group_id: group_id.toString(),
      new_admin,
    };
  }

  public static fromProto(
    proto: MsgUpdateGroupAdminV1.Proto,
    _isClassic?: boolean
  ): MsgUpdateGroupAdminV1 {
    return new MsgUpdateGroupAdminV1(
      proto.admin,
      proto.groupId.toNumber(),
      proto.newAdmin
    );
  }

  public toProto(_isClassic?: boolean): MsgUpdateGroupAdminV1.Proto {
    const { admin, group_id, new_admin } = this;
    return MsgUpdateGroupAdminV1_pb.fromPartial({
      admin,
      groupId: group_id,
      newAdmin: new_admin,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.group.v1.MsgUpdateGroupAdmin',
      value: MsgUpdateGroupAdminV1_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgUpdateGroupAdminV1 {
    return MsgUpdateGroupAdminV1.fromProto(
      MsgUpdateGroupAdminV1_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgUpdateGroupAdminV1 {
  export interface Amino {
    type: 'group/MsgUpdateGroupAdmin' | 'cosmos-sdk/MsgUpdateGroupAdmin';
    value: {
      admin: AccAddress;
      group_id: string;
      new_admin: AccAddress;
    };
  }

  export interface Data {
    '@type': '/cosmos.group.v1.MsgUpdateGroupAdmin';
    admin: AccAddress;
    group_id: string;
    new_admin: AccAddress;
  }

  export type Proto = MsgUpdateGroupAdminV1_pb;
}
