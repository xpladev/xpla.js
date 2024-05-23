/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgLeaveGroup as MsgLeaveGroupV1_pb } from '@xpla/xpla.proto/cosmos/group/v1/tx';

export class MsgLeaveGroupV1 extends JSONSerializable<
  MsgLeaveGroupV1.Amino,
  MsgLeaveGroupV1.Data,
  MsgLeaveGroupV1.Proto
> {
  /**
   * @param address is the account address of the group member
   * @param group_id is the unique ID of the group
   */
  constructor(public address: AccAddress, public group_id: number) {
    super();
  }

  public static fromAmino(
    data: MsgLeaveGroupV1.Amino,
    _isClassic?: boolean
  ): MsgLeaveGroupV1 {
    const {
      value: { address, group_id },
    } = data;
    return new MsgLeaveGroupV1(address, Number.parseInt(group_id));
  }

  public toAmino(isClassic?: boolean): MsgLeaveGroupV1.Amino {
    const { address, group_id } = this;
    return {
      type: isClassic ? 'group/MsgLeaveGroup' : 'cosmos-sdk/MsgLeaveGroup',
      value: {
        address,
        group_id: group_id.toFixed(),
      },
    };
  }

  public static fromData(
    data: MsgLeaveGroupV1.Data,
    _isClassic?: boolean
  ): MsgLeaveGroupV1 {
    const { address, group_id } = data;
    return new MsgLeaveGroupV1(address, Number.parseInt(group_id));
  }

  public toData(_isClassic?: boolean): MsgLeaveGroupV1.Data {
    const { address, group_id } = this;
    return {
      '@type': '/cosmos.group.v1.MsgLeaveGroup',
      address,
      group_id: group_id.toFixed(),
    };
  }

  public static fromProto(
    proto: MsgLeaveGroupV1.Proto,
    _isClassic?: boolean
  ): MsgLeaveGroupV1 {
    return new MsgLeaveGroupV1(proto.address, proto.groupId.toNumber());
  }

  public toProto(_isClassic?: boolean): MsgLeaveGroupV1.Proto {
    const { address, group_id } = this;
    return MsgLeaveGroupV1_pb.fromPartial({
      address,
      groupId: group_id,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.group.v1.MsgLeaveGroup',
      value: MsgLeaveGroupV1_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(msgAny: Any, isClassic?: boolean): MsgLeaveGroupV1 {
    return MsgLeaveGroupV1.fromProto(
      MsgLeaveGroupV1_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgLeaveGroupV1 {
  export interface Amino {
    type: 'group/MsgLeaveGroup' | 'cosmos-sdk/MsgLeaveGroup';
    value: {
      address: AccAddress;
      group_id: string;
    };
  }

  export interface Data {
    '@type': '/cosmos.group.v1.MsgLeaveGroup';
    address: AccAddress;
    group_id: string;
  }

  export type Proto = MsgLeaveGroupV1_pb;
}
