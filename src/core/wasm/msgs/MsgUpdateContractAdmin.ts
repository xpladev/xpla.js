/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgUpdateAdmin as MsgUpdateAdmin_pb } from '@xpla/xpla.proto/cosmwasm/wasm/v1/tx';

export class MsgUpdateContractAdmin extends JSONSerializable<
  MsgUpdateContractAdmin.Amino,
  MsgUpdateContractAdmin.Data,
  MsgUpdateContractAdmin.Proto
> {
  /**
   * @param admin contract admin
   * @param new_admin new admin
   * @param contract contract address
   */
  constructor(
    public admin: AccAddress,
    public new_admin: AccAddress,
    public contract: AccAddress
  ) {
    super();
  }

  public static fromAmino(
    data: MsgUpdateContractAdmin.Amino,
    _isClassic?: boolean
  ): MsgUpdateContractAdmin {
    const {
      value: { sender, new_admin, contract },
    } = data;
    return new MsgUpdateContractAdmin(sender, new_admin, contract);
  }

  public toAmino(_isClassic?: boolean): MsgUpdateContractAdmin.Amino {
    const { admin, new_admin, contract } = this;
    return {
      type: 'wasm/MsgUpdateAdmin',
      value: {
        sender: admin,
        new_admin,
        contract,
      },
    };
  }

  public static fromProto(
    proto: MsgUpdateContractAdmin.Proto,
    _isClassic?: boolean
  ): MsgUpdateContractAdmin {
    return new MsgUpdateContractAdmin(
      proto.sender,
      proto.newAdmin,
      proto.contract
    );
  }

  public toProto(_isClassic?: boolean): MsgUpdateContractAdmin.Proto {
    const { admin, new_admin, contract } = this;
    return MsgUpdateAdmin_pb.fromPartial({
      sender: admin,
      contract,
      newAdmin: new_admin,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmwasm.wasm.v1.MsgUpdateAdmin',
      value: MsgUpdateAdmin_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgUpdateContractAdmin {
    return MsgUpdateContractAdmin.fromProto(
      MsgUpdateAdmin_pb.decode(msgAny.value),
      isClassic
    );
  }

  public static fromData(
    data: MsgUpdateContractAdmin.Data,
    _isClassic?: boolean
  ): MsgUpdateContractAdmin {
    const { sender, new_admin, contract } = data;
    return new MsgUpdateContractAdmin(sender, new_admin, contract);
  }

  public toData(_isClassic?: boolean): MsgUpdateContractAdmin.Data {
    const { admin, new_admin, contract } = this;
    return {
      '@type': '/cosmwasm.wasm.v1.MsgUpdateAdmin',
      sender: admin,
      new_admin,
      contract,
    };
  }
}

export namespace MsgUpdateContractAdmin {
  export interface Amino {
    type: 'wasm/MsgUpdateAdmin';
    value: {
      sender: AccAddress;
      new_admin: AccAddress;
      contract: AccAddress;
    };
  }

  export interface Data {
    '@type': '/cosmwasm.wasm.v1.MsgUpdateAdmin';
    sender: AccAddress;
    new_admin: AccAddress;
    contract: AccAddress;
  }

  export type Proto = MsgUpdateAdmin_pb;
}
