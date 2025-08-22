/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable, removeNull } from '../../../../util/json';
import { Convert } from '../../../../util/convert';
import { AccAddress } from '../../../bech32';
import { AccessConfig } from '../AccessConfig';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgStoreAndMigrateContract as MsgStoreAndMigrateContractV1_pb } from '@xpla/xpla.proto/cosmwasm/wasm/v1/tx';

export class MsgStoreAndMigrateContractV1 extends JSONSerializable<
  MsgStoreAndMigrateContractV1.Amino,
  MsgStoreAndMigrateContractV1.Data,
  MsgStoreAndMigrateContractV1.Proto
> {
  /**
   * @param authority is the address of the governance account
   * @param wasm_byte_code can be raw or gzip compressed
   * @param instantiate_permission to apply on contract creation, optional
   * @param contract contract address to be migrated from
   * @param migrate_msg JSON message to configure the migrate state of the contract
   */
  constructor(
    public authority: AccAddress,
    public wasm_byte_code: string,
    public instantiate_permission: AccessConfig | undefined,
    public contract: AccAddress,
    public migrate_msg: object | string // json object or string
  ) {
    super();
  }

  public static fromAmino(
    data: MsgStoreAndMigrateContractV1.Amino,
    _isClassic?: boolean
  ): MsgStoreAndMigrateContractV1 {
    const {
      value: {
        authority,
        wasm_byte_code,
        instantiate_permission,
        contract,
        msg,
      },
    } = data;
    return new MsgStoreAndMigrateContractV1(
      authority,
      wasm_byte_code,
      instantiate_permission
        ? AccessConfig.fromAmino(instantiate_permission)
        : undefined,
      contract,
      msg
    );
  }

  public toAmino(_isClassic?: boolean): MsgStoreAndMigrateContractV1.Amino {
    const {
      authority,
      wasm_byte_code,
      instantiate_permission,
      contract,
      migrate_msg,
    } = this;
    return {
      type: 'wasm/MsgStoreAndMigrateContract',
      value: {
        authority,
        wasm_byte_code,
        instantiate_permission: instantiate_permission?.toAmino(),
        contract,
        msg: removeNull(migrate_msg),
      },
    };
  }

  public static fromProto(
    proto: MsgStoreAndMigrateContractV1.Proto,
    _isClassic?: boolean
  ): MsgStoreAndMigrateContractV1 {
    return new MsgStoreAndMigrateContractV1(
      proto.authority,
      Convert.toBase64(proto.wasmByteCode),
      proto.instantiatePermission
        ? AccessConfig.fromProto(proto.instantiatePermission)
        : undefined,
      proto.contract,
      JSON.parse(Convert.toUTF8(proto.msg))
    );
  }

  public toProto(_isClassic?: boolean): MsgStoreAndMigrateContractV1.Proto {
    const {
      authority,
      wasm_byte_code,
      instantiate_permission,
      contract,
      migrate_msg,
    } = this;
    return MsgStoreAndMigrateContractV1_pb.fromPartial({
      authority,
      wasmByteCode: Convert.fromBase64(wasm_byte_code),
      instantiatePermission: instantiate_permission?.toProto(),
      contract,
      msg: Convert.fromUTF8(JSON.stringify(migrate_msg)),
    });
  }
  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmwasm.wasm.v1.MsgStoreAndMigrateContract',
      value: MsgStoreAndMigrateContractV1_pb.encode(
        this.toProto(isClassic)
      ).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgStoreAndMigrateContractV1 {
    return MsgStoreAndMigrateContractV1.fromProto(
      MsgStoreAndMigrateContractV1_pb.decode(msgAny.value),
      isClassic
    );
  }

  public static fromData(
    data: MsgStoreAndMigrateContractV1.Data,
    _isClassic?: boolean
  ): MsgStoreAndMigrateContractV1 {
    const { authority, wasm_byte_code, instantiate_permission, contract, msg } =
      data;
    return new MsgStoreAndMigrateContractV1(
      authority,
      wasm_byte_code,
      instantiate_permission
        ? AccessConfig.fromData(instantiate_permission)
        : undefined,
      contract,
      msg
    );
  }

  public toData(_isClassic?: boolean): MsgStoreAndMigrateContractV1.Data {
    const {
      authority,
      wasm_byte_code,
      instantiate_permission,
      contract,
      migrate_msg,
    } = this;
    return {
      '@type': '/cosmwasm.wasm.v1.MsgStoreAndMigrateContract',
      authority,
      wasm_byte_code,
      instantiate_permission: instantiate_permission?.toData(),
      contract,
      msg: removeNull(migrate_msg),
    };
  }
}

export namespace MsgStoreAndMigrateContractV1 {
  export interface Amino {
    type: 'wasm/MsgStoreAndMigrateContract';
    value: {
      authority: AccAddress;
      wasm_byte_code: string;
      instantiate_permission: AccessConfig.Amino | undefined;
      contract: AccAddress;
      msg: object | string;
    };
  }

  export interface Data {
    '@type': '/cosmwasm.wasm.v1.MsgStoreAndMigrateContract';
    authority: AccAddress;
    wasm_byte_code: string;
    instantiate_permission: AccessConfig.Data | undefined;
    contract: AccAddress;
    msg: object | string;
  }

  export type Proto = MsgStoreAndMigrateContractV1_pb;
}
