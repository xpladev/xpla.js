/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { SendEnabled, Params } from '@xpla/xpla.proto/cosmos/bank/v1beta1/bank';
import { MsgUpdateParams as MsgUpdateBankParamsV1B1_pb } from '@xpla/xpla.proto/cosmos/bank/v1beta1/tx';
import { BankParamsV1B1 } from '../Params';

export class MsgUpdateBankParamsV1B1 extends JSONSerializable<
  MsgUpdateBankParamsV1B1.Amino,
  MsgUpdateBankParamsV1B1.Data,
  MsgUpdateBankParamsV1B1.Proto
> {
  /**
   * @param authority is the address that controls the module
   * @param params defines the x/bank parameters to update
   */
  constructor(
    public authority: AccAddress,
    public params: BankParamsV1B1 | undefined
  ) {
    super();
  }

  public static fromAmino(
    data: MsgUpdateBankParamsV1B1.Amino,
    _isClassic?: boolean
  ): MsgUpdateBankParamsV1B1 {
    const {
      value: { authority, params },
    } = data;
    return new MsgUpdateBankParamsV1B1(
      authority,
      params ? BankParamsV1B1.fromAmino(params) : undefined
    );
  }

  public toAmino(isClassic?: boolean): MsgUpdateBankParamsV1B1.Amino {
    const { authority, params } = this;
    return {
      type: isClassic
        ? 'bank/MsgUpdateParams'
        : 'cosmos-sdk/x/bank/MsgUpdateParams',
      value: {
        authority,
        params: params ? params.toAmino() : undefined,
      },
    };
  }

  public static fromData(
    data: MsgUpdateBankParamsV1B1.Data,
    _isClassic?: boolean
  ): MsgUpdateBankParamsV1B1 {
    const { authority, params } = data;
    return new MsgUpdateBankParamsV1B1(
      authority,
      params ? BankParamsV1B1.fromData(params) : undefined
    );
  }

  public toData(_isClassic?: boolean): MsgUpdateBankParamsV1B1.Data {
    const { authority, params } = this;
    return {
      '@type': '/cosmos.bank.v1beta1.MsgUpdateParams',
      authority,
      params: params ? params.toData() : undefined,
    };
  }

  public static fromProto(
    proto: MsgUpdateBankParamsV1B1.Proto,
    _isClassic?: boolean
  ): MsgUpdateBankParamsV1B1 {
    return new MsgUpdateBankParamsV1B1(
      proto.authority,
      proto.params ? BankParamsV1B1.fromProto(proto.params) : undefined
    );
  }

  public toProto(_isClassic?: boolean): MsgUpdateBankParamsV1B1.Proto {
    const { authority, params } = this;
    return MsgUpdateBankParamsV1B1_pb.fromPartial({
      authority,
      params: params ? params.toProto() : undefined,
    });
  }

  public packAny(_isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.bank.v1beta1.MsgUpdateParams',
      value: MsgUpdateBankParamsV1B1_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    _isClassic?: boolean
  ): MsgUpdateBankParamsV1B1 {
    return MsgUpdateBankParamsV1B1.fromProto(
      MsgUpdateBankParamsV1B1_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgUpdateBankParamsV1B1 {
  export interface Amino {
    type: 'bank/MsgUpdateParams' | 'cosmos-sdk/x/bank/MsgUpdateParams';
    value: {
      authority: AccAddress;
      params: BankParamsV1B1.Amino | undefined;
    };
  }

  export interface Data {
    '@type': '/cosmos.bank.v1beta1.MsgUpdateParams';
    authority: AccAddress;
    params: BankParamsV1B1.Data | undefined;
  }

  export type Proto = MsgUpdateBankParamsV1B1_pb;
}
