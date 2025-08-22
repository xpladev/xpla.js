import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgCancelContinuousFund as MsgCancelContinuousFundV1_pb } from '@xpla/xpla.proto/cosmos/protocolpool/v1/tx';

/** MsgCancelContinuousFund defines a message to cancel continuous funds for a specific recipient. */
export class MsgCancelContinuousFundV1 extends JSONSerializable<
  MsgCancelContinuousFundV1.Amino,
  MsgCancelContinuousFundV1.Data,
  MsgCancelContinuousFundV1.Proto
> {
  /**
   * @param authority is the account address of authority.
   * @param recipient is the account address string of the recipient whose funds are to be cancelled.
   */
  constructor(
    public authority: AccAddress,
    public recipient: AccAddress,
  ) {
    super();
  }

  public static fromAmino(
    data: MsgCancelContinuousFundV1.Amino,
  ): MsgCancelContinuousFundV1 {
    const {
      authority,
      recipient,
    } = data;
    return new MsgCancelContinuousFundV1(
      authority,
      recipient,
    );
  }

  public toAmino(): MsgCancelContinuousFundV1.Amino {
    const {
      authority,
      recipient,
    } = this;
    return {
      type: 'protocolpool/MsgCancelContinuousFund',
      authority,
      recipient,
    };
  }

  public static fromData(
    proto: MsgCancelContinuousFundV1.Data,
  ): MsgCancelContinuousFundV1 {
    const {
      authority,
      recipient,
    } = proto;
    return new MsgCancelContinuousFundV1(
      authority,
      recipient,
    );
  }

  public toData(): MsgCancelContinuousFundV1.Data {
    const {
      authority,
      recipient,
    } = this;
    return {
      '@type': '/cosmos.protocolpool.v1.MsgCancelContinuousFund',
      authority,
      recipient,
    };
  }

  public static fromProto(
    proto: MsgCancelContinuousFundV1.Proto,
  ): MsgCancelContinuousFundV1 {
    return new MsgCancelContinuousFundV1(
      proto.authority,
      proto.recipient,
    );
  }

  public toProto(): MsgCancelContinuousFundV1.Proto {
    const {
      authority,
      recipient,
    } = this;
    return MsgCancelContinuousFundV1_pb.fromPartial({
      authority,
      recipient,
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.protocolpool.v1.MsgCancelContinuousFund',
      value: MsgCancelContinuousFundV1_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any): MsgCancelContinuousFundV1 {
    return MsgCancelContinuousFundV1.fromProto(
      MsgCancelContinuousFundV1_pb.decode(msgAny.value),
    );
  }
}

export namespace MsgCancelContinuousFundV1 {
  export interface Amino {
    type: 'protocolpool/MsgCancelContinuousFund';
    authority: AccAddress;
    recipient: AccAddress;
  }

  export interface Data {
    '@type': '/cosmos.protocolpool.v1.MsgCancelContinuousFund';
    authority: AccAddress;
    recipient: AccAddress;
  }

  export type Proto = MsgCancelContinuousFundV1_pb;
}
