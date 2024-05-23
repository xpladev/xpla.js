/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgUpdateGroupPolicyMetadata as MsgUpdateGroupPolicyMetadataV1_pb } from '@xpla/xpla.proto/cosmos/group/v1/tx';

export class MsgUpdateGroupPolicyMetadataV1 extends JSONSerializable<
  MsgUpdateGroupPolicyMetadataV1.Amino,
  MsgUpdateGroupPolicyMetadataV1.Data,
  MsgUpdateGroupPolicyMetadataV1.Proto
> {
  /**
   * @param admin is the account address of the group admin
   * @param group_policy_address is the account address of group policy
   * @param metadata is the group policy metadata to be updated
   */
  constructor(
    public admin: AccAddress,
    public group_policy_address: AccAddress,
    public metadata: string
  ) {
    super();
  }

  public static fromAmino(
    data: MsgUpdateGroupPolicyMetadataV1.Amino,
    _isClassic?: boolean
  ): MsgUpdateGroupPolicyMetadataV1 {
    const {
      value: { admin, group_policy_address, metadata },
    } = data;
    return new MsgUpdateGroupPolicyMetadataV1(
      admin,
      group_policy_address,
      metadata
    );
  }

  public toAmino(isClassic?: boolean): MsgUpdateGroupPolicyMetadataV1.Amino {
    const { admin, group_policy_address, metadata } = this;
    return {
      type: isClassic
        ? 'group/MsgUpdateGroupPolicyMetadata'
        : 'cosmos-sdk/MsgUpdateGroupPolicyMetadata',
      value: {
        admin,
        group_policy_address,
        metadata,
      },
    };
  }

  public static fromData(
    data: MsgUpdateGroupPolicyMetadataV1.Data,
    _isClassic?: boolean
  ): MsgUpdateGroupPolicyMetadataV1 {
    const { admin, group_policy_address, metadata } = data;
    return new MsgUpdateGroupPolicyMetadataV1(
      admin,
      group_policy_address,
      metadata
    );
  }

  public toData(_isClassic?: boolean): MsgUpdateGroupPolicyMetadataV1.Data {
    const { admin, group_policy_address, metadata } = this;
    return {
      '@type': '/cosmos.group.v1.MsgUpdateGroupPolicyMetadata',
      admin,
      group_policy_address,
      metadata,
    };
  }

  public static fromProto(
    proto: MsgUpdateGroupPolicyMetadataV1.Proto,
    _isClassic?: boolean
  ): MsgUpdateGroupPolicyMetadataV1 {
    return new MsgUpdateGroupPolicyMetadataV1(
      proto.admin,
      proto.groupPolicyAddress,
      proto.metadata
    );
  }

  public toProto(_isClassic?: boolean): MsgUpdateGroupPolicyMetadataV1.Proto {
    const { admin, group_policy_address, metadata } = this;
    return MsgUpdateGroupPolicyMetadataV1_pb.fromPartial({
      admin,
      groupPolicyAddress: group_policy_address,
      metadata,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.group.v1.MsgUpdateGroupPolicyMetadata',
      value: MsgUpdateGroupPolicyMetadataV1_pb.encode(
        this.toProto(isClassic)
      ).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgUpdateGroupPolicyMetadataV1 {
    return MsgUpdateGroupPolicyMetadataV1.fromProto(
      MsgUpdateGroupPolicyMetadataV1_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgUpdateGroupPolicyMetadataV1 {
  export interface Amino {
    type:
      | 'group/MsgUpdateGroupPolicyMetadata'
      | 'cosmos-sdk/MsgUpdateGroupPolicyMetadata';
    value: {
      admin: AccAddress;
      group_policy_address: AccAddress;
      metadata: string;
    };
  }

  export interface Data {
    '@type': '/cosmos.group.v1.MsgUpdateGroupPolicyMetadata';
    admin: AccAddress;
    group_policy_address: AccAddress;
    metadata: string;
  }

  export type Proto = MsgUpdateGroupPolicyMetadataV1_pb;
}
