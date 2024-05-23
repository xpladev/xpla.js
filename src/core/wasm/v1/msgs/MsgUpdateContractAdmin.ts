/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgUpdateAdmin as MsgUpdateAdminV1_pb } from '@xpla/xpla.proto/cosmwasm/wasm/v1/tx';

export class MsgUpdateContractAdminV1 extends JSONSerializable<
  MsgUpdateContractAdminV1.Amino,
  MsgUpdateContractAdminV1.Data,
  MsgUpdateContractAdminV1.Proto
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
    data: MsgUpdateContractAdminV1.Amino,
    _isClassic?: boolean
  ): MsgUpdateContractAdminV1 {
    const {
      value: { sender, new_admin, contract },
    } = data;
    return new MsgUpdateContractAdminV1(sender, new_admin, contract);
  }

  public toAmino(_isClassic?: boolean): MsgUpdateContractAdminV1.Amino {
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
    proto: MsgUpdateContractAdminV1.Proto,
    _isClassic?: boolean
  ): MsgUpdateContractAdminV1 {
    return new MsgUpdateContractAdminV1(
      proto.sender,
      proto.newAdmin,
      proto.contract
    );
  }

  public toProto(_isClassic?: boolean): MsgUpdateContractAdminV1.Proto {
    const { admin, new_admin, contract } = this;
    return MsgUpdateAdminV1_pb.fromPartial({
      sender: admin,
      contract,
      newAdmin: new_admin,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmwasm.wasm.v1.MsgUpdateAdmin',
      value: MsgUpdateAdminV1_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgUpdateContractAdminV1 {
    return MsgUpdateContractAdminV1.fromProto(
      MsgUpdateAdminV1_pb.decode(msgAny.value),
      isClassic
    );
  }

  public static fromData(
    data: MsgUpdateContractAdminV1.Data,
    _isClassic?: boolean
  ): MsgUpdateContractAdminV1 {
    const { sender, new_admin, contract } = data;
    return new MsgUpdateContractAdminV1(sender, new_admin, contract);
  }

  public toData(_isClassic?: boolean): MsgUpdateContractAdminV1.Data {
    const { admin, new_admin, contract } = this;
    return {
      '@type': '/cosmwasm.wasm.v1.MsgUpdateAdmin',
      sender: admin,
      new_admin,
      contract,
    };
  }
}

export namespace MsgUpdateContractAdminV1 {
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

  export type Proto = MsgUpdateAdminV1_pb;
}
