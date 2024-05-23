import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { PeriodV1B1 } from '../Period';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { Period } from '@xpla/xpla.proto/cosmos/vesting/v1beta1/vesting';
import { MsgCreatePeriodicVestingAccount as MsgCreatePeriodicVestingAccountV1B1_pb } from '@xpla/xpla.proto/cosmos/vesting/v1beta1/tx';

export class MsgCreatePeriodicVestingAccountV1B1 extends JSONSerializable<
  MsgCreatePeriodicVestingAccountV1B1.Amino,
  MsgCreatePeriodicVestingAccountV1B1.Data,
  MsgCreatePeriodicVestingAccountV1B1.Proto
> {
  /**
   * @param from_address sender's address
   * @param to_address recipient's address
   * @param start of vesting as unix time (in seconds)
   */
  constructor(
    public from_address: AccAddress,
    public to_address: AccAddress,
    public start_time: number,
    public vesting_periods: PeriodV1B1[]
  ) {
    super();
  }

  public static fromAmino(
    data: MsgCreatePeriodicVestingAccountV1B1.Amino,
    isClassic?: boolean
  ): MsgCreatePeriodicVestingAccountV1B1 {
    const {
      value: { from_address, to_address, start_time, vesting_periods },
    } = data;
    return new MsgCreatePeriodicVestingAccountV1B1(
      from_address,
      to_address,
      Number.parseInt(start_time),
      vesting_periods.map(x => PeriodV1B1.fromAmino(x, isClassic))
    );
  }

  public toAmino(
    isClassic?: boolean
  ): MsgCreatePeriodicVestingAccountV1B1.Amino {
    const { from_address, to_address, start_time, vesting_periods } = this;
    return {
      type: isClassic
        ? 'vesting/MsgCreatePeriodicVestingAccount'
        : 'cosmos-sdk/MsgCreatePeriodicVestingAccount',
      value: {
        from_address,
        to_address,
        start_time: start_time.toFixed(),
        vesting_periods: vesting_periods.map(msg => {
          return msg.toAmino(isClassic);
        }),
      },
    };
  }

  public static fromData(
    data: MsgCreatePeriodicVestingAccountV1B1.Data,
    isClassic?: boolean
  ): MsgCreatePeriodicVestingAccountV1B1 {
    const { from_address, to_address, start_time, vesting_periods } = data;

    return new MsgCreatePeriodicVestingAccountV1B1(
      from_address,
      to_address,
      Number.parseInt(start_time),
      vesting_periods.map(x => PeriodV1B1.fromData(x, isClassic))
    );
  }

  public toData(isClassic?: boolean): MsgCreatePeriodicVestingAccountV1B1.Data {
    const { from_address, to_address, start_time, vesting_periods } = this;
    return {
      '@type': '/cosmos.vesting.v1beta1.MsgCreatePeriodicVestingAccount',
      from_address,
      to_address,
      start_time: start_time.toFixed(),
      vesting_periods: vesting_periods.map(msg => msg.toData(isClassic)),
    };
  }

  public static fromProto(
    proto: MsgCreatePeriodicVestingAccountV1B1.Proto,
    isClassic?: boolean
  ): MsgCreatePeriodicVestingAccountV1B1 {
    return new MsgCreatePeriodicVestingAccountV1B1(
      proto.fromAddress,
      proto.toAddress,
      proto.startTime.toNumber(),
      proto.vestingPeriods.map(x => PeriodV1B1.fromProto(x, isClassic))
    );
  }

  public toProto(
    isClassic?: boolean
  ): MsgCreatePeriodicVestingAccountV1B1.Proto {
    const { from_address, to_address, start_time, vesting_periods } = this;
    return MsgCreatePeriodicVestingAccountV1B1_pb.fromPartial({
      fromAddress: from_address,
      toAddress: to_address,
      startTime: start_time,
      vestingPeriods: vesting_periods.map(x =>
        Period.decode(x.packAny(isClassic).value)
      ),
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.vesting.v1beta1.MsgCreatePeriodicVestingAccount',
      value: MsgCreatePeriodicVestingAccountV1B1_pb.encode(
        this.toProto(isClassic)
      ).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgCreatePeriodicVestingAccountV1B1 {
    return MsgCreatePeriodicVestingAccountV1B1.fromProto(
      MsgCreatePeriodicVestingAccountV1B1_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgCreatePeriodicVestingAccountV1B1 {
  export interface Amino {
    type:
      | 'vesting/MsgCreatePeriodicVestingAccount'
      | 'cosmos-sdk/MsgCreatePeriodicVestingAccount';
    value: {
      from_address: AccAddress;
      to_address: AccAddress;
      start_time: string;
      vesting_periods: PeriodV1B1.Amino[];
    };
  }

  export interface Data {
    '@type': '/cosmos.vesting.v1beta1.MsgCreatePeriodicVestingAccount';
    from_address: AccAddress;
    to_address: AccAddress;
    start_time: string;
    vesting_periods: PeriodV1B1.Data[];
  }

  export type Proto = MsgCreatePeriodicVestingAccountV1B1_pb;
}
