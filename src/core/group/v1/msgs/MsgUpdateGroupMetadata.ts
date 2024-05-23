/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgUpdateGroupMetadata as MsgUpdateGroupMetadataV1_pb } from '@xpla/xpla.proto/cosmos/group/v1/tx';

export class MsgUpdateGroupMetadataV1 extends JSONSerializable<
  MsgUpdateGroupMetadataV1.Amino,
  MsgUpdateGroupMetadataV1.Data,
  MsgUpdateGroupMetadataV1.Proto
> {
  /**
   * @param authority
   * @param send_enabled is the list of entries to add or update
   * @param use_default_for is a list of denoms that should use the params.default_send_enabled value
   */
  constructor(
    public admin: AccAddress,
    public group_id: number,
    public metadata: string
  ) {
    super();
  }

  public static fromAmino(
    data: MsgUpdateGroupMetadataV1.Amino,
    _isClassic?: boolean
  ): MsgUpdateGroupMetadataV1 {
    const {
      value: { admin, group_id, metadata },
    } = data;
    return new MsgUpdateGroupMetadataV1(
      admin,
      Number.parseInt(group_id),
      metadata
    );
  }

  public toAmino(isClassic?: boolean): MsgUpdateGroupMetadataV1.Amino {
    const { admin, group_id, metadata } = this;
    return {
      type: isClassic
        ? 'group/MsgUpdateGroupMetadata'
        : 'cosmos-sdk/MsgUpdateGroupMetadata',
      value: {
        admin,
        group_id: group_id.toFixed(),
        metadata,
      },
    };
  }

  public static fromData(
    data: MsgUpdateGroupMetadataV1.Data,
    _isClassic?: boolean
  ): MsgUpdateGroupMetadataV1 {
    const { admin, group_id, metadata } = data;
    return new MsgUpdateGroupMetadataV1(
      admin,
      Number.parseInt(group_id),
      metadata
    );
  }

  public toData(_isClassic?: boolean): MsgUpdateGroupMetadataV1.Data {
    const { admin, group_id, metadata } = this;
    return {
      '@type': '/cosmos.group.v1.MsgUpdateGroupMetadata',
      admin,
      group_id: group_id.toFixed(),
      metadata,
    };
  }

  public static fromProto(
    proto: MsgUpdateGroupMetadataV1.Proto,
    _isClassic?: boolean
  ): MsgUpdateGroupMetadataV1 {
    return new MsgUpdateGroupMetadataV1(
      proto.admin,
      proto.groupId.toNumber(),
      proto.metadata
    );
  }

  public toProto(_isClassic?: boolean): MsgUpdateGroupMetadataV1.Proto {
    const { admin, group_id, metadata } = this;
    return MsgUpdateGroupMetadataV1_pb.fromPartial({
      admin,
      groupId: group_id,
      metadata,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.group.v1.MsgUpdateGroupMetadata',
      value: MsgUpdateGroupMetadataV1_pb.encode(
        this.toProto(isClassic)
      ).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgUpdateGroupMetadataV1 {
    return MsgUpdateGroupMetadataV1.fromProto(
      MsgUpdateGroupMetadataV1_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgUpdateGroupMetadataV1 {
  export interface Amino {
    type: 'group/MsgUpdateGroupMetadata' | 'cosmos-sdk/MsgUpdateGroupMetadata';
    value: {
      admin: AccAddress;
      group_id: string;
      metadata: string;
    };
  }

  export interface Data {
    '@type': '/cosmos.group.v1.MsgUpdateGroupMetadata';
    admin: AccAddress;
    group_id: string;
    metadata: string;
  }

  export type Proto = MsgUpdateGroupMetadataV1_pb;
}
