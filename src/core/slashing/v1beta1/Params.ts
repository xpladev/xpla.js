/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../util/json';
import { Dec, Int, Numeric } from '../../../core/numeric';
import { Duration } from '../../../core';
import { Params as SlashingParamsV1B1_pb } from '@xpla/xpla.proto/cosmos/slashing/v1beta1/slashing';

export class SlashingParamsV1B1 extends JSONSerializable<
  SlashingParamsV1B1.Amino,
  SlashingParamsV1B1.Data,
  SlashingParamsV1B1.Proto
> {
  public signed_blocks_window: Int;
  public min_signed_per_window: Dec;
  public slash_fraction_double_sign: Dec;
  public slash_fraction_downtime: Dec;

  /**
   * @param signed_blocks_window
   * @param min_signed_per_window
   * @param downtime_jail_duration
   * @param slash_fraction_double_sign
   * @param slash_fraction_downtime
   */
  constructor(
    signed_blocks_window: Numeric.Input,
    min_signed_per_window: Numeric.Input,
    public downtime_jail_duration: Duration | undefined,
    slash_fraction_double_sign: Numeric.Input,
    slash_fraction_downtime: Numeric.Input
  ) {
    super();
    this.signed_blocks_window = new Int(signed_blocks_window);
    this.min_signed_per_window = new Dec(min_signed_per_window);
    this.slash_fraction_double_sign = new Dec(slash_fraction_double_sign);
    this.slash_fraction_downtime = new Dec(slash_fraction_downtime);
  }

  public static fromAmino(
    data: SlashingParamsV1B1.Amino,
    _?: boolean
  ): SlashingParamsV1B1 {
    const {
      signed_blocks_window,
      min_signed_per_window,
      downtime_jail_duration,
      slash_fraction_double_sign,
      slash_fraction_downtime,
    } = data;
    return new SlashingParamsV1B1(
      signed_blocks_window ?? 0,
      min_signed_per_window ?? 0,
      downtime_jail_duration
        ? Duration.fromAmino(downtime_jail_duration)
        : undefined,
      slash_fraction_double_sign ?? 0,
      slash_fraction_downtime ?? 0
    );
  }

  public toAmino(_?: boolean): SlashingParamsV1B1.Amino {
    const {
      signed_blocks_window,
      min_signed_per_window,
      downtime_jail_duration,
      slash_fraction_double_sign,
      slash_fraction_downtime,
    } = this;

    const res: SlashingParamsV1B1.Amino = {
      signed_blocks_window: signed_blocks_window.toFixed(),
      min_signed_per_window: min_signed_per_window.toFixed(),
      downtime_jail_duration: downtime_jail_duration
        ? downtime_jail_duration.toAmino()
        : undefined,
      slash_fraction_double_sign: slash_fraction_double_sign.toFixed(),
      slash_fraction_downtime: slash_fraction_downtime.toFixed(),
    };

    return res;
  }

  public static fromData(
    data: SlashingParamsV1B1.Data,
    _?: boolean
  ): SlashingParamsV1B1 {
    const {
      signed_blocks_window,
      min_signed_per_window,
      downtime_jail_duration,
      slash_fraction_double_sign,
      slash_fraction_downtime,
    } = data;
    return new SlashingParamsV1B1(
      signed_blocks_window,
      min_signed_per_window,
      downtime_jail_duration
        ? Duration.fromData(downtime_jail_duration)
        : undefined,
      slash_fraction_double_sign,
      slash_fraction_downtime
    );
  }

  public toData(_?: boolean): SlashingParamsV1B1.Data {
    const {
      signed_blocks_window,
      min_signed_per_window,
      downtime_jail_duration,
      slash_fraction_double_sign,
      slash_fraction_downtime,
    } = this;

    const res: SlashingParamsV1B1.Data = {
      '@type': '/cosmos.slashing.v1beta1.Params',
      signed_blocks_window: signed_blocks_window.toFixed(),
      min_signed_per_window: min_signed_per_window.toFixed(),
      downtime_jail_duration: downtime_jail_duration?.toData(),
      slash_fraction_double_sign: slash_fraction_double_sign.toFixed(),
      slash_fraction_downtime: slash_fraction_downtime.toFixed(),
    };

    return res;
  }

  public static fromProto(
    proto: SlashingParamsV1B1.Proto,
    _?: boolean
  ): SlashingParamsV1B1 {
    return new SlashingParamsV1B1(
      proto.signedBlocksWindow.toString(),
      Buffer.from(proto.minSignedPerWindow).toString('ascii'),
      proto.downtimeJailDuration
        ? Duration.fromProto(proto.downtimeJailDuration)
        : undefined,
      Buffer.from(proto.slashFractionDoubleSign).toString('ascii'),
      Buffer.from(proto.slashFractionDowntime).toString('ascii')
    );
  }

  public toProto(_?: boolean): SlashingParamsV1B1.Proto {
    const {
      signed_blocks_window,
      min_signed_per_window,
      downtime_jail_duration,
      slash_fraction_double_sign,
      slash_fraction_downtime,
    } = this;
    return SlashingParamsV1B1_pb.fromPartial({
      signedBlocksWindow: signed_blocks_window.toFixed(),
      minSignedPerWindow: Buffer.from(min_signed_per_window.toFixed(), 'ascii'),
      downtimeJailDuration: downtime_jail_duration
        ? downtime_jail_duration.toProto()
        : undefined,
      slashFractionDoubleSign: Buffer.from(
        slash_fraction_double_sign.toFixed(),
        'ascii'
      ),
      slashFractionDowntime: Buffer.from(
        slash_fraction_downtime.toFixed(),
        'ascii'
      ),
    });
  }
}

export namespace SlashingParamsV1B1 {
  export interface Amino {
    signed_blocks_window: string | undefined;
    min_signed_per_window: string | undefined;
    downtime_jail_duration: string | undefined;
    slash_fraction_double_sign: string | undefined;
    slash_fraction_downtime: string | undefined;
  }

  export interface Data {
    '@type': '/cosmos.slashing.v1beta1.Params';
    signed_blocks_window: string;
    min_signed_per_window: string;
    downtime_jail_duration: object | undefined;
    slash_fraction_double_sign: string;
    slash_fraction_downtime: string;
  }

  export type Proto = SlashingParamsV1B1_pb;
}
