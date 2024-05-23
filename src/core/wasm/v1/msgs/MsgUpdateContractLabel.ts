/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgUpdateContractLabel as MsgUpdateContractLabelV1_pb } from '@xpla/xpla.proto/cosmwasm/wasm/v1/tx';

export class MsgUpdateContractLabelV1 extends JSONSerializable<
  MsgUpdateContractLabelV1.Amino,
  MsgUpdateContractLabelV1.Data,
  MsgUpdateContractLabelV1.Proto
> {
  /**
   * @param sender is the that actor that signed the messages
   * @param new_label string to be set
   * @param contract is the address of the smart contract
   */
  constructor(
    public sender: AccAddress,
    public new_label: string,
    public contract: AccAddress
  ) {
    super();
  }

  public static fromAmino(
    data: MsgUpdateContractLabelV1.Amino,
    _isClassic?: boolean
  ): MsgUpdateContractLabelV1 {
    const {
      value: { sender, new_label, contract },
    } = data;
    return new MsgUpdateContractLabelV1(sender, new_label, contract);
  }

  public toAmino(_isClassic?: boolean): MsgUpdateContractLabelV1.Amino {
    const { sender, new_label, contract } = this;
    return {
      type: 'wasm/MsgUpdateContractLabel',
      value: {
        sender,
        new_label,
        contract,
      },
    };
  }

  public static fromProto(
    proto: MsgUpdateContractLabelV1.Proto,
    _isClassic?: boolean
  ): MsgUpdateContractLabelV1 {
    return new MsgUpdateContractLabelV1(
      proto.sender,
      proto.newLabel,
      proto.contract
    );
  }

  public toProto(_isClassic?: boolean): MsgUpdateContractLabelV1.Proto {
    const { sender, new_label, contract } = this;
    return MsgUpdateContractLabelV1_pb.fromPartial({
      sender,
      newLabel: new_label,
      contract,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmwasm.wasm.v1.MsgUpdateContractLabel',
      value: MsgUpdateContractLabelV1_pb.encode(
        this.toProto(isClassic)
      ).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgUpdateContractLabelV1 {
    return MsgUpdateContractLabelV1.fromProto(
      MsgUpdateContractLabelV1_pb.decode(msgAny.value),
      isClassic
    );
  }

  public static fromData(
    data: MsgUpdateContractLabelV1.Data,
    _isClassic?: boolean
  ): MsgUpdateContractLabelV1 {
    const { sender, new_label, contract } = data;
    return new MsgUpdateContractLabelV1(sender, new_label, contract);
  }

  public toData(_isClassic?: boolean): MsgUpdateContractLabelV1.Data {
    const { sender, new_label, contract } = this;
    return {
      '@type': '/cosmwasm.wasm.v1.MsgUpdateContractLabel',
      sender,
      new_label,
      contract,
    };
  }
}

export namespace MsgUpdateContractLabelV1 {
  export interface Amino {
    type: 'wasm/MsgUpdateContractLabel';
    value: {
      sender: AccAddress;
      new_label: string;
      contract: AccAddress;
    };
  }

  export interface Data {
    '@type': '/cosmwasm.wasm.v1.MsgUpdateContractLabel';
    sender: AccAddress;
    new_label: string;
    contract: AccAddress;
  }

  export type Proto = MsgUpdateContractLabelV1_pb;
}
