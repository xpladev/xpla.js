import { JSONSerializable } from '../../../../../util/json';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgRegisterPayee as MsgRegisterPayee_pb } from '@xpla/xpla.proto/ibc/applications/fee/v1/tx';

/**
 * MsgRegisterCounterpartyAddress defines the request type for the RegisterCounterpartyAddress rpc
 */
export class MsgRegisterPayee extends JSONSerializable<
  any,
  MsgRegisterPayee.Data,
  MsgRegisterPayee.Proto
> {
  constructor(
    /** unique port identifier */
    public portId: string,
    /** unique channel identifier */
    public channelId: string,
    /** the relayer address */
    public relayer: string,
    /** the payee address */
    public payee: string
  ) {
    super();
  }

  public static fromAmino(_: any, isClassic?: boolean): MsgRegisterPayee {
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
    data: MsgRegisterPayee.Data,
    isClassic?: boolean
  ): MsgRegisterPayee {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const { portId, channelId, relayer, payee } = data;

    return new MsgRegisterPayee(portId, channelId, relayer, payee);
  }

  public toData(isClassic?: boolean): MsgRegisterPayee.Data {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const { portId, channelId, relayer, payee } = this;
    return {
      '@type': '/ibc.applications.fee.v1.MsgRegisterPayee',
      portId,
      channelId,
      relayer,
      payee,
    };
  }

  public static fromProto(
    proto: MsgRegisterPayee.Proto,
    isClassic?: boolean
  ): MsgRegisterPayee {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    return new MsgRegisterPayee(
      proto.portId,
      proto.channelId,
      proto.relayer,
      proto.payee
    );
  }

  public toProto(isClassic?: boolean): MsgRegisterPayee.Proto {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const { portId, channelId, relayer, payee } = this;
    return MsgRegisterPayee_pb.fromPartial({
      portId,
      channelId,
      relayer,
      payee,
    });
  }

  public packAny(isClassic?: boolean): Any {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    return Any.fromPartial({
      typeUrl: '/ibc.applications.fee.v1.MsgRegisterPayee',
      value: MsgRegisterPayee_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(msgAny: Any, isClassic?: boolean): MsgRegisterPayee {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    return MsgRegisterPayee.fromProto(MsgRegisterPayee_pb.decode(msgAny.value));
  }
}

export namespace MsgRegisterPayee {
  export interface Data {
    '@type': '/ibc.applications.fee.v1.MsgRegisterPayee';
    portId: string;
    channelId: string;
    relayer: string;
    payee: string;
  }

  export type Proto = MsgRegisterPayee_pb;
}
