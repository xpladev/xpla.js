/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable, removeNull } from '../../../../util/json';
import { Convert } from '../../../../util/convert';
import { AccAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgMigrateContract as MsgMigrateContractV1_pb } from '@xpla/xpla.proto/cosmwasm/wasm/v1/tx';

export class MsgMigrateContractV1 extends JSONSerializable<
  MsgMigrateContractV1.Amino,
  MsgMigrateContractV1.Data,
  MsgMigrateContractV1.Proto
> {
  /**
   * @param admin contract admin
   * @param contract contract address to be migrated from
   * @param new_code_id reference to the new code on the blockchain
   * @param migrate_msg JSON message to configure the migrate state of the contract
   */
  constructor(
    public admin: AccAddress,
    public contract: AccAddress,
    public new_code_id: number,
    public migrate_msg: object | string // json object or string
  ) {
    super();
  }

  public static fromAmino(
    data: MsgMigrateContractV1.Amino,
    _isClassic?: boolean
  ): MsgMigrateContractV1 {
    const {
      value: { sender, contract, code_id, msg },
    } = data;
    return new MsgMigrateContractV1(
      sender,
      contract,
      Number.parseInt(code_id),
      msg
    );
  }

  public toAmino(_isClassic?: boolean): MsgMigrateContractV1.Amino {
    const { admin, contract, new_code_id, migrate_msg } = this;
    return {
      type: 'wasm/MsgMigrateContract',
      value: {
        sender: admin,
        contract,
        code_id: new_code_id.toFixed(),
        msg: removeNull(migrate_msg),
      },
    };
  }

  public static fromProto(
    proto: MsgMigrateContractV1.Proto,
    _isClassic?: boolean
  ): MsgMigrateContractV1 {
    return new MsgMigrateContractV1(
      proto.sender,
      proto.contract,
      proto.codeId.toNumber(),
      JSON.parse(Convert.toUTF8(proto.msg))
    );
  }

  public toProto(_isClassic?: boolean): MsgMigrateContractV1.Proto {
    const { admin, contract, new_code_id, migrate_msg } = this;
    return MsgMigrateContractV1_pb.fromPartial({
      sender: admin,
      contract,
      codeId: new_code_id,
      msg: Convert.fromUTF8(JSON.stringify(migrate_msg)),
    });
  }
  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmwasm.wasm.v1.MsgMigrateContract',
      value: MsgMigrateContractV1_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgMigrateContractV1 {
    return MsgMigrateContractV1.fromProto(
      MsgMigrateContractV1_pb.decode(msgAny.value),
      isClassic
    );
  }

  public static fromData(
    data: MsgMigrateContractV1.Data,
    _isClassic?: boolean
  ): MsgMigrateContractV1 {
    const { sender, contract, code_id, msg } = data;
    return new MsgMigrateContractV1(
      sender,
      contract,
      Number.parseInt(code_id),
      msg
    );
  }

  public toData(_isClassic?: boolean): MsgMigrateContractV1.Data {
    const { admin, contract, new_code_id, migrate_msg } = this;
    return {
      '@type': '/cosmwasm.wasm.v1.MsgMigrateContract',
      sender: admin,
      contract,
      code_id: new_code_id.toFixed(),
      msg: removeNull(migrate_msg),
    };
  }
}

export namespace MsgMigrateContractV1 {
  export interface Amino {
    type: 'wasm/MsgMigrateContract';
    value: {
      sender: AccAddress;
      contract: AccAddress;
      code_id: string;
      msg: object | string;
    };
  }

  export interface Data {
    '@type': '/cosmwasm.wasm.v1.MsgMigrateContract';
    sender: AccAddress;
    contract: AccAddress;
    code_id: string;
    msg: object | string;
  }

  export type Proto = MsgMigrateContractV1_pb;
}
