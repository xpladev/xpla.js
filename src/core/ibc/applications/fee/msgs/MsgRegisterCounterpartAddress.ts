import { JSONSerializable } from '../../../../../util/json';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgRegisterCounterpartyPayee as MsgRegisterCounterpartyAddress_pb } from '@xpla/xpla.proto/ibc/applications/fee/v1/tx';

/**
 * MsgRegisterCounterpartyAddress defines the request type for the RegisterCounterpartyAddress rpc
 */
export class MsgRegisterCounterpartyAddress extends JSONSerializable<
  any,
  MsgRegisterCounterpartyAddress.Data,
  MsgRegisterCounterpartyAddress.Proto
> {
  constructor(
    /** unique port identifier */
    public portId: string,
    /** unique channel identifier */
    public channelId: string,
    /** the relayer address */
    public relayer: string,
    /** the counterparty payee address */
    public counterpartyPayee: string
  ) {
    super();
  }

  public static fromAmino(
    _: any,
    isClassic?: boolean
  ): MsgRegisterCounterpartyAddress {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    throw new Error('Amino not supported');
  }

  public toAmino(isClassic?: boolean): any {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    throw new Error('Amino not supported');
  }

  public static fromData(
    data: MsgRegisterCounterpartyAddress.Data,
    isClassic?: boolean
  ): MsgRegisterCounterpartyAddress {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const { portId, channelId, relayer, counterpartyPayee } = data;

    return new MsgRegisterCounterpartyAddress(
      portId,
      channelId,
      relayer,
      counterpartyPayee
    );
  }

  public toData(isClassic?: boolean): MsgRegisterCounterpartyAddress.Data {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const { portId, channelId, relayer, counterpartyPayee } = this;
    return {
      '@type': '/ibc.applications.fee.v1.MsgRegisterCounterpartyPayee',
      portId,
      channelId,
      relayer,
      counterpartyPayee,
    };
  }

  public static fromProto(
    proto: MsgRegisterCounterpartyAddress.Proto,
    isClassic?: boolean
  ): MsgRegisterCounterpartyAddress {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    return new MsgRegisterCounterpartyAddress(
      proto.portId,
      proto.channelId,
      proto.relayer,
      proto.counterpartyPayee
    );
  }

  public toProto(isClassic?: boolean): MsgRegisterCounterpartyAddress.Proto {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const { portId, channelId, relayer, counterpartyPayee } = this;
    return MsgRegisterCounterpartyAddress_pb.fromPartial({
      portId,
      channelId,
      relayer,
      counterpartyPayee,
    });
  }

  public packAny(isClassic?: boolean): Any {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    return Any.fromPartial({
      typeUrl: '/ibc.applications.fee.v1.MsgRegisterCounterpartyAddress',
      value: MsgRegisterCounterpartyAddress_pb.encode(
        this.toProto(isClassic)
      ).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgRegisterCounterpartyAddress {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    return MsgRegisterCounterpartyAddress.fromProto(
      MsgRegisterCounterpartyAddress_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgRegisterCounterpartyAddress {
  export interface Data {
    '@type': '/ibc.applications.fee.v1.MsgRegisterCounterpartyPayee';
    portId: string;
    channelId: string;
    relayer: string;
    counterpartyPayee: string;
  }

  export type Proto = MsgRegisterCounterpartyAddress_pb;
}
