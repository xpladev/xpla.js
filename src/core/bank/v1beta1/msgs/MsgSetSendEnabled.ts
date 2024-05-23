/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { SendEnabled } from '@xpla/xpla.proto/cosmos/bank/v1beta1/bank';
import { MsgSetSendEnabled as MsgSetSendEnabledV1B1_pb } from '@xpla/xpla.proto/cosmos/bank/v1beta1/tx';

/**
 * A basic message for sending [[Coins]] between Xpla accounts.
 */
export class MsgSetSendEnabledV1B1 extends JSONSerializable<
  MsgSetSendEnabledV1B1.Amino,
  MsgSetSendEnabledV1B1.Data,
  MsgSetSendEnabledV1B1.Proto
> {
  /**
   * @param authority
   * @param send_enabled is the list of entries to add or update
   * @param use_default_for is a list of denoms that should use the params.default_send_enabled value
   */
  constructor(
    public authority: AccAddress,
    public send_enabled: SendEnabled[],
    public use_default_for: string[]
  ) {
    super();
  }

  public static fromAmino(
    data: MsgSetSendEnabledV1B1.Amino,
    _isClassic?: boolean
  ): MsgSetSendEnabledV1B1 {
    const {
      value: { authority, send_enabled, use_default_for },
    } = data;
    return new MsgSetSendEnabledV1B1(authority, send_enabled, use_default_for);
  }

  public toAmino(isClassic?: boolean): MsgSetSendEnabledV1B1.Amino {
    const { authority, send_enabled, use_default_for } = this;
    return {
      type: isClassic
        ? 'bank/MsgSetSendEnabled'
        : 'cosmos-sdk/MsgSetSendEnabled',
      value: {
        authority,
        send_enabled,
        use_default_for,
      },
    };
  }

  public static fromData(
    data: MsgSetSendEnabledV1B1.Data,
    _isClassic?: boolean
  ): MsgSetSendEnabledV1B1 {
    const { authority, send_enabled, use_default_for } = data;
    return new MsgSetSendEnabledV1B1(authority, send_enabled, use_default_for);
  }

  public toData(_isClassic?: boolean): MsgSetSendEnabledV1B1.Data {
    const { authority, send_enabled, use_default_for } = this;
    return {
      '@type': '/cosmos.bank.v1beta1.MsgSetSendEnabled',
      authority,
      send_enabled,
      use_default_for,
    };
  }

  public static fromProto(
    proto: MsgSetSendEnabledV1B1.Proto,
    _isClassic?: boolean
  ): MsgSetSendEnabledV1B1 {
    return new MsgSetSendEnabledV1B1(
      proto.authority,
      proto.sendEnabled,
      proto.useDefaultFor
    );
  }

  public toProto(_isClassic?: boolean): MsgSetSendEnabledV1B1.Proto {
    const { authority, send_enabled, use_default_for } = this;
    return MsgSetSendEnabledV1B1_pb.fromPartial({
      authority: authority,
      sendEnabled: send_enabled,
      useDefaultFor: use_default_for,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.bank.v1beta1.MsgSetSendEnabled',
      value: MsgSetSendEnabledV1B1_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgSetSendEnabledV1B1 {
    return MsgSetSendEnabledV1B1.fromProto(
      MsgSetSendEnabledV1B1_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgSetSendEnabledV1B1 {
  export interface Amino {
    type: 'bank/MsgSetSendEnabled' | 'cosmos-sdk/MsgSetSendEnabled';
    value: {
      authority: AccAddress;
      send_enabled: SendEnabled[];
      use_default_for: string[];
    };
  }

  export interface Data {
    '@type': '/cosmos.bank.v1beta1.MsgSetSendEnabled';
    authority: AccAddress;
    send_enabled: SendEnabled[];
    use_default_for: string[];
  }

  export type Proto = MsgSetSendEnabledV1B1_pb;
}
