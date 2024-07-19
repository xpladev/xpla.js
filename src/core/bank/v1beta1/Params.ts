/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../util/json';
import { Int, Numeric } from '../../numeric';
import {
  SendEnabled,
  Params as BankParamsV1B1_pb,
} from '@xpla/xpla.proto/cosmos/bank/v1beta1/bank';

export class BankParamsV1B1 extends JSONSerializable<
  BankParamsV1B1.Amino,
  BankParamsV1B1.Data,
  BankParamsV1B1.Proto
> {
  /**
   * @param send_enabled Deprecated: Use of SendEnabled in params is deprecated.
   * @param default_send_enabled
   */
  constructor(
    /** @deprecated */ public send_enabled: SendEnabled[],
    public default_send_enabled: boolean
  ) {
    super();
  }

  public static fromAmino(
    data: BankParamsV1B1.Amino,
    _?: boolean
  ): BankParamsV1B1 {
    const { send_enabled, default_send_enabled } = data;
    return new BankParamsV1B1(
      send_enabled ?? [],
      default_send_enabled ?? false
    );
  }

  public toAmino(_?: boolean): BankParamsV1B1.Amino {
    const { send_enabled, default_send_enabled } = this;

    const res: BankParamsV1B1.Amino = {
      send_enabled,
      default_send_enabled,
    };

    return res;
  }

  public static fromData(
    data: BankParamsV1B1.Data,
    _?: boolean
  ): BankParamsV1B1 {
    const { send_enabled, default_send_enabled } = data;
    return new BankParamsV1B1(send_enabled, default_send_enabled);
  }

  public toData(_?: boolean): BankParamsV1B1.Data {
    const { send_enabled, default_send_enabled } = this;

    const res: BankParamsV1B1.Data = {
      '@type': '/cosmos.bank.v1beta1.Params',
      send_enabled,
      default_send_enabled,
    };

    return res;
  }

  public static fromProto(
    proto: BankParamsV1B1.Proto,
    _?: boolean
  ): BankParamsV1B1 {
    return new BankParamsV1B1(proto.sendEnabled, proto.defaultSendEnabled);
  }

  public toProto(_?: boolean): BankParamsV1B1.Proto {
    const { send_enabled, default_send_enabled } = this;
    return BankParamsV1B1_pb.fromPartial({
      sendEnabled: send_enabled,
      defaultSendEnabled: default_send_enabled,
    });
  }
}

export namespace BankParamsV1B1 {
  export interface Amino {
    send_enabled: SendEnabled[] | undefined;
    default_send_enabled: boolean | undefined;
  }

  export interface Data {
    '@type': '/cosmos.bank.v1beta1.Params';
    send_enabled: SendEnabled[];
    default_send_enabled: boolean;
  }

  export type Proto = BankParamsV1B1_pb;
}
