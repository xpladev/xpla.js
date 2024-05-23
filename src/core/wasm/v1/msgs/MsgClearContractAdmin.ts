/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgClearAdmin as MsgClearAdminV1_pb } from '@xpla/xpla.proto/cosmwasm/wasm/v1/tx';

export class MsgClearContractAdminV1 extends JSONSerializable<
  MsgClearContractAdminV1.Amino,
  MsgClearContractAdminV1.Data,
  MsgClearContractAdminV1.Proto
> {
  /**
   * @param admin contract admin
   * @param contract contract address
   */
  constructor(public admin: AccAddress, public contract: AccAddress) {
    super();
  }

  public static fromAmino(
    data: MsgClearContractAdminV1.Amino,
    isClassic?: boolean
  ): MsgClearContractAdminV1 {
    if (isClassic) {
      const {
        value: { admin, contract },
      } = data as MsgClearContractAdminV1.AminoV1;
      return new MsgClearContractAdminV1(admin, contract);
    } else {
      const {
        value: { sender, contract },
      } = data as MsgClearContractAdminV1.AminoV2;
      return new MsgClearContractAdminV1(sender, contract);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public toAmino(isClassic?: boolean): MsgClearContractAdminV1.Amino {
    const { admin, contract } = this;
    if (isClassic) {
      return {
        type: 'wasm/MsgClearContractAdmin',
        value: {
          admin,
          contract,
        },
      };
    } else {
      return {
        type: 'wasm/MsgClearAdmin',
        value: {
          sender: admin,
          contract,
        },
      };
    }
  }

  public static fromProto(
    data: MsgClearContractAdminV1.Proto,
    _?: boolean
  ): MsgClearContractAdminV1 {
    const { sender, contract } = data as MsgClearContractAdminV1.DataV2;
    return new MsgClearContractAdminV1(sender, contract);
  }

  public toProto(_?: boolean): MsgClearContractAdminV1.Proto {
    return MsgClearAdminV1_pb.fromPartial({
      sender: this.admin,
      contract: this.contract,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmwasm.wasm.v1.MsgClearAdmin',
      value: MsgClearAdminV1_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgClearContractAdminV1 {
    return MsgClearContractAdminV1.fromProto(
      MsgClearAdminV1_pb.decode(msgAny.value),
      isClassic
    );
  }

  public static fromData(
    data: MsgClearContractAdminV1.Data,
    _?: boolean
  ): MsgClearContractAdminV1 {
    const { sender, contract } = data;
    return new MsgClearContractAdminV1(sender, contract);
  }

  public toData(_?: boolean): MsgClearContractAdminV1.Data {
    return {
      '@type': '/cosmwasm.wasm.v1.MsgClearAdmin',
      sender: this.admin,
      contract: this.contract,
    };
  }
}

export namespace MsgClearContractAdminV1 {
  export interface AminoV1 {
    type: 'wasm/MsgClearContractAdmin';
    value: {
      admin: AccAddress;
      contract: AccAddress;
    };
  }

  export interface AminoV2 {
    type: 'wasm/MsgClearAdmin';
    value: {
      sender: AccAddress;
      contract: AccAddress;
    };
  }

  export interface DataV2 {
    '@type': '/cosmwasm.wasm.v1.MsgClearAdmin';
    sender: string;
    contract: string;
  }

  export type Amino = AminoV1 | AminoV2;
  export type Data = DataV2;
  export type Proto = MsgClearAdminV1_pb;
}
