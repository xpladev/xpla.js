/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../../../util/json';
import { Convert } from '../../../../../../util/convert';
import { AccAddress } from '../../../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgRegisterCounterparty as MsgRegisterCounterpartyV2_pb } from '@xpla/xpla.proto/ibc/core/client/v2/tx';

/** MsgRegisterCounterparty defines a message to register a counterparty on a client */
export class MsgRegisterCounterpartyV2 extends JSONSerializable<
  any,
  MsgRegisterCounterpartyV2.Data,
  MsgRegisterCounterpartyV2.Proto
> {
  /**
   * @param client_id client identifier
   * @param counterparty_merkle_prefix counterparty merkle prefix
   * @param counterparty_client_id counterparty client identifier
   * @param signer signer address
   */
  constructor(
    public client_id: string,
    public counterparty_merkle_prefix: string[],
    public counterparty_client_id: string,
    public signer: AccAddress,
  ) {
    super();
  }

  public static fromAmino(_: any, _isClassic?: boolean): MsgRegisterCounterpartyV2 {
    throw new Error('Amino not supported');
  }

  public toAmino(): any {
    throw new Error('Amino not supported');
  }

  public static fromData(
    data: MsgRegisterCounterpartyV2.Data,
  ): MsgRegisterCounterpartyV2 {
    const { client_id, counterparty_merkle_prefix, counterparty_client_id, signer } = data;
    return new MsgRegisterCounterpartyV2(client_id, counterparty_merkle_prefix, counterparty_client_id, signer);
  }

  public toData(): MsgRegisterCounterpartyV2.Data {
    const { client_id, counterparty_merkle_prefix, counterparty_client_id, signer } = this;
    return {
      '@type': '/ibc.core.client.v2.MsgRegisterCounterparty',
      client_id,
      counterparty_merkle_prefix,
      counterparty_client_id,
      signer,
    };
  }

  public static fromProto(
    proto: MsgRegisterCounterpartyV2.Proto,
  ): MsgRegisterCounterpartyV2 {
    return new MsgRegisterCounterpartyV2(
      proto.clientId,
      proto.counterpartyMerklePrefix.map(Convert.toBase64),
      proto.counterpartyClientId,
      proto.signer
    );
  }

  public toProto(): MsgRegisterCounterpartyV2.Proto {
    const { client_id, counterparty_merkle_prefix, counterparty_client_id, signer } = this;
    return MsgRegisterCounterpartyV2_pb.fromPartial({
      clientId: client_id,
      counterpartyMerklePrefix: counterparty_merkle_prefix.map(Convert.fromBase64),
      counterpartyClientId: counterparty_client_id,
      signer,
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/ibc.core.client.v2.MsgRegisterCounterparty',
      value: MsgRegisterCounterpartyV2_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any): MsgRegisterCounterpartyV2 {
    return MsgRegisterCounterpartyV2.fromProto(MsgRegisterCounterpartyV2_pb.decode(msgAny.value));
  }
}

export namespace MsgRegisterCounterpartyV2 {
  export interface Data {
    '@type': '/ibc.core.client.v2.MsgRegisterCounterparty';
    client_id: string;
    counterparty_merkle_prefix: string[];
    counterparty_client_id: string;
    signer: AccAddress;
  }
  export type Proto = MsgRegisterCounterpartyV2_pb;
}
