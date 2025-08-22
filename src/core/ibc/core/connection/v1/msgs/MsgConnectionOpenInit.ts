import { JSONSerializable } from '../../../../../../util/json';
import { AccAddress } from '../../../../../bech32';
import { Numeric, Int } from '../../../../../numeric';
import { CounterpartyV1 } from '../Counterparty';
import { VersionV1 } from '../Version';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgConnectionOpenInit as MsgConnectionOpenInitV1_pb } from '@xpla/xpla.proto/ibc/core/connection/v1/tx';

/**
 * MsgConnectionOpenInit defines the msg sent by an account on Chain A to
 * initialize a connection with Chain B.
 */
export class MsgConnectionOpenInitV1 extends JSONSerializable<
  any,
  MsgConnectionOpenInitV1.Data,
  MsgConnectionOpenInitV1.Proto
> {
  public delay_period: Int;
  /**
   * @param client_id
   * @param counterparty
   * @param version
   * @param delay_period
   * @param signer
   */
  constructor(
    public client_id: string,
    public counterparty: CounterpartyV1 | undefined,
    public version: VersionV1 | undefined,
    delay_period: Numeric.Input,
    public signer: AccAddress,
  ) {
    super();
    this.delay_period = new Int(delay_period);
  }

  public static fromAmino(_: any): MsgConnectionOpenInitV1 {
    throw new Error('Amino not supported');
  }

  public toAmino(): any {
    throw new Error('Amino not supported');
  }

  public static fromData(
    data: MsgConnectionOpenInitV1.Data,
  ): MsgConnectionOpenInitV1 {
    const {
      client_id,
      counterparty,
      version,
      delay_period,
      signer,
    } = data;
    return new MsgConnectionOpenInitV1(
      client_id,
      counterparty ? CounterpartyV1.fromData(counterparty) : undefined,
      version ? VersionV1.fromData(version) : undefined,
      delay_period,
      signer,
    );
  }

  public toData(): MsgConnectionOpenInitV1.Data {
    const {
      client_id,
      counterparty,
      version,
      delay_period,
      signer,
    } = this;
    return {
      '@type': '/ibc.core.connection.v1.MsgConnectionOpenInit',
      client_id,
      counterparty: counterparty ? counterparty.toData() : undefined,
      version: version ? version.toData() : undefined,
      delay_period: delay_period.toFixed(0),
      signer,
    };
  }

  public static fromProto(
    proto: MsgConnectionOpenInitV1.Proto,
  ): MsgConnectionOpenInitV1 {
    return new MsgConnectionOpenInitV1(
      proto.clientId,
      proto.counterparty ? CounterpartyV1.fromProto(proto.counterparty) : undefined,
      proto.version ? VersionV1.fromProto(proto.version) : undefined,
      proto.delayPeriod.toString(),
      proto.signer,
    );
  }

  public toProto(): MsgConnectionOpenInitV1.Proto {
    const {
      client_id,
      counterparty,
      version,
      delay_period,
      signer,
    } = this;
    return MsgConnectionOpenInitV1_pb.fromPartial({
      clientId: client_id,
      counterparty: counterparty ? counterparty.toProto() : undefined,
      version: version ? version.toProto() : undefined,
      delayPeriod: delay_period.toFixed(0),
      signer,
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/ibc.core.connection.v1.MsgConnectionOpenInit',
      value: MsgConnectionOpenInitV1_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any): MsgConnectionOpenInitV1 {
    return MsgConnectionOpenInitV1.fromProto(
      MsgConnectionOpenInitV1_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgConnectionOpenInitV1 {
  export interface Data {
    '@type': '/ibc.core.connection.v1.MsgConnectionOpenInit';
    client_id: string;
    counterparty: CounterpartyV1.Data | undefined;
    version: VersionV1.Data | undefined;
    delay_period: string;
    signer: AccAddress;
  }
  export type Proto = MsgConnectionOpenInitV1_pb;
}
