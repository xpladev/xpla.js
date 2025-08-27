import { JSONSerializable } from '../../../../../util/json';
import { HeaderV1 } from './Header';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { Misbehaviour as MisbehaviourV1_pb } from '@xpla/xpla.proto/ibc/lightclients/tendermint/v1/tendermint';

/**
 * Misbehaviour is a wrapper over two conflicting Headers
 * that implements Misbehaviour interface expected by ICS-02
 */
export class MisbehaviourV1 extends JSONSerializable<any, MisbehaviourV1.Data, MisbehaviourV1.Proto> {
  /**
   * @param client_id
   * @param header1
   * @param header2
   */
  constructor(
    public client_id: string,
    public header1: HeaderV1 | undefined,
    public header2: HeaderV1 | undefined,
  ) {
    super();
  }

  public static fromAmino(_: any): MisbehaviourV1 {
    throw new Error('Amino not supported');
  }

  public toAmino(): any {
    throw new Error('Amino not supported');
  }

  public static fromData(data: MisbehaviourV1.Data): MisbehaviourV1 {
    const {
      client_id,
      header1,
      header2,
    } = data;
    return new MisbehaviourV1(
      client_id,
      header1 ? HeaderV1.fromData(header1) : undefined,
      header2 ? HeaderV1.fromData(header2) : undefined,
    );
  }

  public toData(): MisbehaviourV1.Data {
    const {
      client_id,
      header1,
      header2,
    } = this;
    return {
      '@type': '/ibc.lightclients.tendermint.v1.Misbehaviour',
      client_id,
      header1: header1?.toData(),
      header2: header2?.toData(),
    };
  }

  public static fromProto(proto: MisbehaviourV1.Proto): MisbehaviourV1 {
    const {
      clientId,
      header1,
      header2,
    } = proto;
    return new MisbehaviourV1(
      clientId,
      header1 ? HeaderV1.fromProto(header1) : undefined,
      header2 ? HeaderV1.fromProto(header2) : undefined,
    );
  }

  public toProto(): MisbehaviourV1.Proto {
    const {
      client_id,
      header1,
      header2,
    } = this;
    return MisbehaviourV1_pb.fromPartial({
      clientId: client_id,
      header1: header1?.toProto(),
      header2: header2?.toProto(),
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/ibc.lightclients.tendermint.v1.Misbehaviour',
      value: MisbehaviourV1_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any): MisbehaviourV1 {
    return MisbehaviourV1.fromProto(MisbehaviourV1_pb.decode(msgAny.value));
  }
}

export namespace MisbehaviourV1 {
  export interface Data {
    '@type': '/ibc.lightclients.tendermint.v1.Misbehaviour';
    client_id: string;
    header1: HeaderV1.Data | undefined;
    header2: HeaderV1.Data | undefined;
  }

  export type Proto = MisbehaviourV1_pb;
}
