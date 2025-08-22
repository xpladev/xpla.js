/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../../../util/json';
import { AccAddress } from '../../../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgDeleteClientCreator as MsgDeleteClientCreatorV1_pb } from '@xpla/xpla.proto/ibc/core/client/v1/tx';

/** MsgDeleteClientCreator defines a message to delete the client creator of a client */
export class MsgDeleteClientCreatorV1 extends JSONSerializable<
  any,
  MsgDeleteClientCreatorV1.Data,
  MsgDeleteClientCreatorV1.Proto
> {
  /**
   * @param client_id client unique identifier
   * @param signer signer address
   */
  constructor(
    public client_id: string,
    public signer: AccAddress
  ) {
    super();
  }

  public static fromAmino(_: any, _isClassic?: boolean): MsgDeleteClientCreatorV1 {
    throw new Error('Amino not supported');
  }

  public toAmino(_?: boolean): any {
    throw new Error('Amino not supported');
  }

  public static fromData(
    data: MsgDeleteClientCreatorV1.Data,
    _?: boolean
  ): MsgDeleteClientCreatorV1 {
    const {
      client_id,
      signer,
    } = data;
    return new MsgDeleteClientCreatorV1(
      client_id,
      signer
    );
  }

  public toData(_?: boolean): MsgDeleteClientCreatorV1.Data {
    const {
      client_id,
      signer,
    } = this;
    return {
      '@type': '/ibc.core.client.v1.MsgDeleteClientCreator',
      client_id,
      signer,
    };
  }

  public static fromProto(
    proto: MsgDeleteClientCreatorV1.Proto,
    _?: boolean
  ): MsgDeleteClientCreatorV1 {
    return new MsgDeleteClientCreatorV1(
      proto.clientId,
      proto.signer
    );
  }

  public toProto(_?: boolean): MsgDeleteClientCreatorV1.Proto {
    const {
      client_id,
      signer,
    } = this;
    return MsgDeleteClientCreatorV1_pb.fromPartial({
      clientId: client_id,
      signer: signer,
    });
  }

  public packAny(_?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/ibc.core.client.v1.MsgUpgradeClient',
      value: MsgDeleteClientCreatorV1_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgDeleteClientCreatorV1 {
    return MsgDeleteClientCreatorV1.fromProto(MsgDeleteClientCreatorV1_pb.decode(msgAny.value));
  }
}

export namespace MsgDeleteClientCreatorV1 {
  export interface Data {
    '@type': '/ibc.core.client.v1.MsgDeleteClientCreator';
    client_id: string;
    signer: AccAddress;
  }
  export type Proto = MsgDeleteClientCreatorV1_pb;
}
