/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { SendEnabled, Params } from '@xpla/xpla.proto/cosmos/bank/v1beta1/bank';
import { MsgUpdateParams as MsgUpdateBankParamsV1B1_pb } from '@xpla/xpla.proto/cosmos/bank/v1beta1/tx';

export class MsgUpdateBankParamsV1B1 extends JSONSerializable<
  MsgUpdateBankParamsV1B1.Amino,
  MsgUpdateBankParamsV1B1.Data,
  MsgUpdateBankParamsV1B1.Proto
> {
  constructor(
    public authority: AccAddress,
    public sendEnabled: SendEnabled[],
    public defaultSendEnabled: boolean
  ) {
    super();
  }

  public static fromAmino(
    data: MsgUpdateBankParamsV1B1.Amino,
    _isClassic?: boolean
  ): MsgUpdateBankParamsV1B1 {
    const {
      value: { authority, sendEnabled, defaultSendEnabled },
    } = data;
    return new MsgUpdateBankParamsV1B1(
      authority,
      sendEnabled,
      defaultSendEnabled
    );
  }

  public toAmino(isClassic?: boolean): MsgUpdateBankParamsV1B1.Amino {
    const { authority, sendEnabled, defaultSendEnabled } = this;
    return {
      type: isClassic
        ? 'bank/MsgUpdateParamsV1B1'
        : 'cosmos-sdk/MsgUpdateBankParamsV1B1',
      value: {
        authority,
        sendEnabled,
        defaultSendEnabled,
      },
    };
  }

  public static fromData(
    data: MsgUpdateBankParamsV1B1.Data,
    _isClassic?: boolean
  ): MsgUpdateBankParamsV1B1 {
    const { authority, sendEnabled, defaultSendEnabled } = data;
    return new MsgUpdateBankParamsV1B1(
      authority,
      sendEnabled,
      defaultSendEnabled
    );
  }

  public toData(_isClassic?: boolean): MsgUpdateBankParamsV1B1.Data {
    const { authority, sendEnabled, defaultSendEnabled } = this;
    return {
      '@type': '/cosmos.bank.v1beta1.MsgUpdateParams',
      authority,
      sendEnabled,
      defaultSendEnabled,
    };
  }

  public static fromProto(
    proto: MsgUpdateBankParamsV1B1.Proto,
    _isClassic?: boolean
  ): MsgUpdateBankParamsV1B1 {
    return new MsgUpdateBankParamsV1B1(
      proto.authority,
      proto.params?.sendEnabled ?? [],
      proto.params?.defaultSendEnabled ?? false
    );
  }

  public toProto(_isClassic?: boolean): MsgUpdateBankParamsV1B1.Proto {
    const { authority, sendEnabled, defaultSendEnabled } = this;
    return MsgUpdateBankParamsV1B1_pb.fromPartial({
      authority,
      params: Params.fromPartial({
        sendEnabled,
        defaultSendEnabled,
      }),
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
    type: 'bank/MsgUpdateParamsV1B1' | 'cosmos-sdk/MsgUpdateBankParamsV1B1';
    value: {
      authority: AccAddress;
      sendEnabled: SendEnabled[];
      defaultSendEnabled: boolean;
    };
  }

  export interface Data {
    '@type': '/cosmos.bank.v1beta1.MsgUpdateParams';
    authority: AccAddress;
    sendEnabled: SendEnabled[];
    defaultSendEnabled: boolean;
  }

  export type Proto = MsgUpdateBankParamsV1B1_pb;
}
