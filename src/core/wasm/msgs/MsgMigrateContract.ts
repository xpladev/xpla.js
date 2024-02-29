/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable, removeNull } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgMigrateContract as MsgMigrateContract_pb } from '@xpla/xpla.proto/cosmwasm/wasm/v1/tx';

export class MsgMigrateContract extends JSONSerializable<
  MsgMigrateContract.Amino,
  MsgMigrateContract.Data,
  MsgMigrateContract.Proto
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
    data: MsgMigrateContract.Amino,
    _isClassic?: boolean
  ): MsgMigrateContract {
    const {
      value: { sender, contract, code_id, msg },
    } = data;
    return new MsgMigrateContract(
      sender,
      contract,
      Number.parseInt(code_id),
      msg
    );
  }

  public toAmino(_isClassic?: boolean): MsgMigrateContract.Amino {
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
    proto: MsgMigrateContract.Proto,
    _isClassic?: boolean
  ): MsgMigrateContract {
    return new MsgMigrateContract(
      proto.sender,
      proto.contract,
      proto.codeId.toNumber(),
      JSON.parse(Buffer.from(proto.msg).toString('utf-8'))
    );
  }

  public toProto(_isClassic?: boolean): MsgMigrateContract.Proto {
    const { admin, contract, new_code_id, migrate_msg } = this;
    return MsgMigrateContract_pb.fromPartial({
      sender: admin,
      contract,
      codeId: new_code_id,
      msg: Buffer.from(JSON.stringify(migrate_msg), 'utf-8'),
    });
  }
  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmwasm.wasm.v1.MsgMigrateContract',
      value: MsgMigrateContract_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgMigrateContract {
    return MsgMigrateContract.fromProto(
      MsgMigrateContract_pb.decode(msgAny.value),
      isClassic
    );
  }

  public static fromData(
    data: MsgMigrateContract.Data,
    _isClassic?: boolean
  ): MsgMigrateContract {
    const { sender, contract, code_id, msg } = data;
    return new MsgMigrateContract(
      sender,
      contract,
      Number.parseInt(code_id),
      msg
    );
  }

  public toData(_isClassic?: boolean): MsgMigrateContract.Data {
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

export namespace MsgMigrateContract {
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

  export type Proto = MsgMigrateContract_pb;
}
