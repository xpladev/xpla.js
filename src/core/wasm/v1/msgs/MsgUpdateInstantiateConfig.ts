/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { AccessConfig } from '../AccessConfig';
import { MsgUpdateInstantiateConfig as MsgUpdateInstantiateConfigV1_pb } from '@xpla/xpla.proto/cosmwasm/wasm/v1/tx';

export class MsgUpdateInstantiateConfigV1 extends JSONSerializable<
  MsgUpdateInstantiateConfigV1.Amino,
  MsgUpdateInstantiateConfigV1.Data,
  MsgUpdateInstantiateConfigV1.Proto
> {
  /**
   * @param sender is the that actor that signed the messages
   * @param code_id references the stored WASM code
   * @param new_instantiate_permission is the new access control
   */
  constructor(
    public sender: AccAddress,
    public code_id: number,
    public new_instantiate_permission: AccessConfig | undefined
  ) {
    super();
  }

  public static fromAmino(
    data: MsgUpdateInstantiateConfigV1.Amino,
    _isClassic?: boolean
  ): MsgUpdateInstantiateConfigV1 {
    const {
      value: { sender, code_id, new_instantiate_permission },
    } = data;
    return new MsgUpdateInstantiateConfigV1(
      sender,
      Number.parseInt(code_id),
      new_instantiate_permission
        ? AccessConfig.fromAmino(new_instantiate_permission)
        : undefined
    );
  }

  public toAmino(_isClassic?: boolean): MsgUpdateInstantiateConfigV1.Amino {
    const { sender, code_id, new_instantiate_permission } = this;
    return {
      type: 'wasm/MsgUpdateInstantiateConfig',
      value: {
        sender,
        code_id: code_id.toFixed(),
        new_instantiate_permission: new_instantiate_permission?.toAmino(),
      },
    };
  }

  public static fromProto(
    proto: MsgUpdateInstantiateConfigV1.Proto,
    _isClassic?: boolean
  ): MsgUpdateInstantiateConfigV1 {
    return new MsgUpdateInstantiateConfigV1(
      proto.sender,
      proto.codeId.toNumber(),
      proto.newInstantiatePermission
        ? AccessConfig.fromProto(proto.newInstantiatePermission)
        : undefined
    );
  }

  public toProto(_isClassic?: boolean): MsgUpdateInstantiateConfigV1.Proto {
    const { sender, code_id, new_instantiate_permission } = this;
    return MsgUpdateInstantiateConfigV1_pb.fromPartial({
      sender,
      codeId: code_id,
      newInstantiatePermission: new_instantiate_permission?.toProto(),
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmwasm.wasm.v1.MsgUpdateInstantiateConfig',
      value: MsgUpdateInstantiateConfigV1_pb.encode(
        this.toProto(isClassic)
      ).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgUpdateInstantiateConfigV1 {
    return MsgUpdateInstantiateConfigV1.fromProto(
      MsgUpdateInstantiateConfigV1_pb.decode(msgAny.value),
      isClassic
    );
  }

  public static fromData(
    data: MsgUpdateInstantiateConfigV1.Data,
    _isClassic?: boolean
  ): MsgUpdateInstantiateConfigV1 {
    const { sender, code_id, new_instantiate_permission } = data;
    return new MsgUpdateInstantiateConfigV1(
      sender,
      Number.parseInt(code_id),
      new_instantiate_permission
        ? AccessConfig.fromData(new_instantiate_permission)
        : undefined
    );
  }

  public toData(_isClassic?: boolean): MsgUpdateInstantiateConfigV1.Data {
    const { sender, code_id, new_instantiate_permission } = this;
    return {
      '@type': '/cosmwasm.wasm.v1.MsgUpdateInstantiateConfig',
      sender,
      code_id: code_id.toFixed(),
      new_instantiate_permission: new_instantiate_permission?.toData(),
    };
  }
}

export namespace MsgUpdateInstantiateConfigV1 {
  export interface Amino {
    type: 'wasm/MsgUpdateInstantiateConfig';
    value: {
      sender: AccAddress;
      code_id: string;
      new_instantiate_permission: AccessConfig.Amino | undefined;
    };
  }

  export interface Data {
    '@type': '/cosmwasm.wasm.v1.MsgUpdateInstantiateConfig';
    sender: AccAddress;
    code_id: string;
    new_instantiate_permission: AccessConfig.Data | undefined;
  }

  export type Proto = MsgUpdateInstantiateConfigV1_pb;
}
