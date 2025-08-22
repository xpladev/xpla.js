import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgCreateContinuousFund as MsgCreateContinuousFundV1_pb } from '@xpla/xpla.proto/cosmos/protocolpool/v1/tx';

/**
 * MsgCommunityPoolSpend defines a message for sending tokens from the community
 * pool to another account. This message is typically executed via a governance
 * proposal with the governance module being the executing authority.
 */
export class MsgCreateContinuousFundV1 extends JSONSerializable<
  MsgCreateContinuousFundV1.Amino,
  MsgCreateContinuousFundV1.Data,
  MsgCreateContinuousFundV1.Proto
> {
  /**
   * @param authority is the address that controls the module (defaults to x/gov unless overwritten).
   * @param recipient is the address of the account receiving funds.
   * @param percentage is the percentage of funds to be allocated from Community pool.
   * @param expiry if expiry is set, removes the state object when expired.
   */
  constructor(
    public authority: AccAddress,
    public recipient: AccAddress,
    public percentage: string,
    public expiry: Date | undefined,
  ) {
    super();
  }

  public static fromAmino(
    data: MsgCreateContinuousFundV1.Amino,
  ): MsgCreateContinuousFundV1 {
    const {
      authority,
      recipient,
      percentage,
      expiry,
    } = data;
    return new MsgCreateContinuousFundV1(
      authority,
      recipient,
      percentage,
      expiry ? new Date(
          parseInt(expiry.seconds) * 1000
        + parseInt(expiry.nanos) / 1e6
      ) : undefined,
    );
  }

  public toAmino(): MsgCreateContinuousFundV1.Amino {
    const {
      authority,
      recipient,
      percentage,
      expiry,
    } = this;
    return {
      type: 'protocolpool/MsgCreateContinuousFund',
      authority,
      recipient,
      percentage,
      expiry: expiry
        ? {
            seconds: Math.trunc(expiry.getTime() / 1000).toString(),
            nanos: Math.trunc(expiry.getTime() % 1000 * 1e6).toString(),
          }
        : undefined,
    };
  }

  public static fromData(
    proto: MsgCreateContinuousFundV1.Data,
  ): MsgCreateContinuousFundV1 {
    const {
      authority,
      recipient,
      percentage,
      expiry,
    } = proto;
    return new MsgCreateContinuousFundV1(
      authority,
      recipient,
      percentage,
      expiry ? new Date(expiry) : undefined,
    );
  }

  public toData(): MsgCreateContinuousFundV1.Data {
    const {
      authority,
      recipient,
      percentage,
      expiry,
    } = this;
    return {
      '@type': '/cosmos.protocolpool.v1.MsgCreateContinuousFund',
      authority,
      recipient,
      percentage,
      expiry: expiry?.toISOString(),
    };
  }

  public static fromProto(
    proto: MsgCreateContinuousFundV1.Proto,
  ): MsgCreateContinuousFundV1 {
    return new MsgCreateContinuousFundV1(
      proto.authority,
      proto.recipient,
      proto.percentage,
      proto.expiry,
    );
  }

  public toProto(): MsgCreateContinuousFundV1.Proto {
    const {
      authority,
      recipient,
      percentage,
      expiry,
    } = this;
    return MsgCreateContinuousFundV1_pb.fromPartial({
      authority,
      recipient,
      percentage,
      expiry,
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.protocolpool.v1.MsgCreateContinuousFund',
      value: MsgCreateContinuousFundV1_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any): MsgCreateContinuousFundV1 {
    return MsgCreateContinuousFundV1.fromProto(
      MsgCreateContinuousFundV1_pb.decode(msgAny.value),
    );
  }
}

export namespace MsgCreateContinuousFundV1 {
  export interface Amino {
    type: 'protocolpool/MsgCreateContinuousFund';
    authority: AccAddress;
    recipient: AccAddress;
    percentage: string;
    expiry: { seconds: string; nanos: string } | undefined;
  }

  export interface Data {
    '@type': '/cosmos.protocolpool.v1.MsgCreateContinuousFund';
    authority: AccAddress;
    recipient: AccAddress;
    percentage: string;
    expiry: string | undefined;
  }

  export type Proto = MsgCreateContinuousFundV1_pb;
}
