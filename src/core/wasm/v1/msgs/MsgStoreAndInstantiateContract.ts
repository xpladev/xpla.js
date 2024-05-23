/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable, removeNull } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Coins } from '../../../Coins';
import { AccessConfig } from '../AccessConfig';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgStoreAndInstantiateContract as MsgStoreAndInstantiateContractV1_pb } from '@xpla/xpla.proto/cosmwasm/wasm/v1/tx';

export class MsgStoreAndInstantiateContractV1 extends JSONSerializable<
  MsgStoreAndInstantiateContractV1.Amino,
  MsgStoreAndInstantiateContractV1.Data,
  MsgStoreAndInstantiateContractV1.Proto
> {
  public funds: Coins;

  /**
   * @param authority is the address of the governance account
   * @param wasm_byte_code base64-encoded bytecode contents
   * @param instantiate_permission to apply on contract creation, optional
   * @param unpin_code code on upload, optional. As default the uploaded contract is pinned to cache
   * @param admin is an optional address that can execute migrations
   * @param label is metadata to be stored with a constract instance
   * @param msg json encoded message to be passed to the contract on instantiation
   * @param funds coins that are transferred from the authority account to the contract on instantiation
   * @param source is the URL where the code is hosted
   * @param builder is the docker image used to build the code deterministically, used for smart contract verification
   * @param code_hash is the SHA256 sum of the code outputted by builder, used for smart contract verification
   */
  constructor(
    public authority: AccAddress,
    public wasm_byte_code: string,
    public instantiate_permission: AccessConfig | undefined,
    public unpin_code: boolean,
    public admin: AccAddress,
    public label: string,
    public msg: object | string,
    funds: Coins.Input = {},
    public source: string,
    public builder: string,
    public code_hash: string
  ) {
    super();
    this.funds = new Coins(funds);
  }

  public static fromAmino(
    data: MsgStoreAndInstantiateContractV1.Amino,
    _isClassic?: boolean
  ): MsgStoreAndInstantiateContractV1 {
    const {
      value: {
        authority,
        wasm_byte_code,
        instantiate_permission,
        unpin_code,
        admin,
        label,
        msg,
        funds,
        source,
        builder,
        code_hash,
      },
    } = data;
    return new MsgStoreAndInstantiateContractV1(
      authority,
      wasm_byte_code,
      instantiate_permission
        ? AccessConfig.fromAmino(instantiate_permission)
        : undefined,
      unpin_code,
      admin,
      label,
      msg,
      Coins.fromAmino(funds),
      source,
      builder,
      code_hash
    );
  }

  public toAmino(_isClassic?: boolean): MsgStoreAndInstantiateContractV1.Amino {
    const {
      authority,
      wasm_byte_code,
      instantiate_permission,
      unpin_code,
      admin,
      label,
      msg,
      funds,
      source,
      builder,
      code_hash,
    } = this;
    return {
      type: 'wasm/MsgStoreAndInstantiateContract',
      value: {
        authority,
        wasm_byte_code,
        instantiate_permission: instantiate_permission?.toAmino(),
        unpin_code,
        admin,
        label,
        msg,
        funds: funds.toAmino(),
        source,
        builder,
        code_hash,
      },
    };
  }

  public static fromProto(
    proto: MsgStoreAndInstantiateContractV1.Proto,
    _isClassic?: boolean
  ): MsgStoreAndInstantiateContractV1 {
    return new MsgStoreAndInstantiateContractV1(
      proto.authority,
      Buffer.from(proto.wasmByteCode).toString('base64'),
      proto.instantiatePermission
        ? AccessConfig.fromProto(proto.instantiatePermission)
        : undefined,
      proto.unpinCode,
      proto.admin,
      proto.label,
      proto.msg,
      Coins.fromProto(proto.funds),
      proto.source,
      proto.builder,
      Buffer.from(proto.codeHash).toString('hex')
    );
  }

  public toProto(_isClassic?: boolean): MsgStoreAndInstantiateContractV1.Proto {
    const {
      authority,
      wasm_byte_code,
      instantiate_permission,
      unpin_code,
      admin,
      label,
      msg,
      funds,
      source,
      builder,
      code_hash,
    } = this;
    return MsgStoreAndInstantiateContractV1_pb.fromPartial({
      authority,
      wasmByteCode: Buffer.from(wasm_byte_code, 'base64'),
      instantiatePermission: instantiate_permission?.toProto(),
      unpinCode: unpin_code,
      admin,
      label,
      msg: Buffer.from(JSON.stringify(msg), 'utf-8'),
      funds: funds.toProto(),
      source,
      builder,
      codeHash: Buffer.from(code_hash, 'hex'),
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmwasm.wasm.v1.MsgStoreAndInstantiateContract',
      value: MsgStoreAndInstantiateContractV1_pb.encode(
        this.toProto(isClassic)
      ).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgStoreAndInstantiateContractV1 {
    return MsgStoreAndInstantiateContractV1.fromProto(
      MsgStoreAndInstantiateContractV1_pb.decode(msgAny.value),
      isClassic
    );
  }

  public static fromData(
    data: MsgStoreAndInstantiateContractV1.Data,
    _isClassic?: boolean
  ): MsgStoreAndInstantiateContractV1 {
    const {
      authority,
      wasm_byte_code,
      instantiate_permission,
      unpin_code,
      admin,
      label,
      msg,
      funds,
      source,
      builder,
      code_hash,
    } = data;
    return new MsgStoreAndInstantiateContractV1(
      authority,
      wasm_byte_code,
      instantiate_permission
        ? AccessConfig.fromData(instantiate_permission)
        : undefined,
      unpin_code,
      admin,
      label,
      msg,
      Coins.fromData(funds),
      source,
      builder,
      code_hash
    );
  }

  public toData(_isClassic?: boolean): MsgStoreAndInstantiateContractV1.Data {
    const {
      authority,
      wasm_byte_code,
      instantiate_permission,
      unpin_code,
      admin,
      label,
      msg,
      funds,
      source,
      builder,
      code_hash,
    } = this;
    return {
      '@type': '/cosmwasm.wasm.v1.MsgStoreAndInstantiateContract',
      authority,
      wasm_byte_code,
      instantiate_permission: instantiate_permission?.toData(),
      unpin_code,
      admin,
      label,
      msg: removeNull(msg),
      funds: funds.toData(),
      source,
      builder,
      code_hash,
    };
  }
}

export namespace MsgStoreAndInstantiateContractV1 {
  export interface Amino {
    type: 'wasm/MsgStoreAndInstantiateContract';
    value: {
      authority: AccAddress;
      wasm_byte_code: string;
      instantiate_permission: AccessConfig.Data | undefined;
      unpin_code: boolean;
      admin: AccAddress;
      label: string;
      msg: object | string;
      funds: Coins.Data;
      source: string;
      builder: string;
      code_hash: string;
    };
  }

  export interface Data {
    '@type': '/cosmwasm.wasm.v1.MsgStoreAndInstantiateContract';
    authority: AccAddress;
    wasm_byte_code: string;
    instantiate_permission: AccessConfig.Data | undefined;
    unpin_code: boolean;
    admin: AccAddress;
    label: string;
    msg: object | string;
    funds: Coins.Data;
    source: string;
    builder: string;
    code_hash: string;
  }

  export type Proto = MsgStoreAndInstantiateContractV1_pb;
}
