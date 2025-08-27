import { JSONSerializable } from '../../../../../util/json';
import { Convert } from '../../../../../util/convert';
import { CounterpartyInfo as CounterpartyInfoV2_pb } from '@xpla/xpla.proto/ibc/core/client/v2/counterparty';

/** CounterpartyInfo defines the key that the counterparty will use to message our client */
export class CounterpartyInfoV2 extends JSONSerializable<
  CounterpartyInfoV2.Amino,
  CounterpartyInfoV2.Data,
  CounterpartyInfoV2.Proto
> {
  /**
   * @param merkle_prefix base64 encoded, merkle prefix key is the prefix that ics provable keys are stored under
   * @param client_id client identifier is the identifier used to send packet messages to our client
   */
  constructor(
    public merkle_prefix: string[],
    public client_id: string,
  ) {
    super();
  }

  public static fromAmino(data: CounterpartyInfoV2.Amino): CounterpartyInfoV2 {
    const { merkle_prefix, client_id } = data;
    return new CounterpartyInfoV2(
      merkle_prefix,
      client_id,
    );
  }

  public toAmino(): CounterpartyInfoV2.Amino {
    const { merkle_prefix, client_id } = this;
    const res: CounterpartyInfoV2.Amino = {
      merkle_prefix,
      client_id,
    };
    return res;
  }

  public static fromData(data: CounterpartyInfoV2.Data): CounterpartyInfoV2 {
    const { merkle_prefix, client_id } = data;
    return new CounterpartyInfoV2(
      merkle_prefix,
      client_id,
    );
  }

  public toData(): CounterpartyInfoV2.Data {
    const { merkle_prefix, client_id } = this;
    const res: CounterpartyInfoV2.Data = {
      merkle_prefix,
      client_id,
    };
    return res;
  }

  public static fromProto(proto: CounterpartyInfoV2.Proto): CounterpartyInfoV2 {
    return new CounterpartyInfoV2(
      proto.merklePrefix.map(Convert.toBase64),
      proto.clientId,
    );
  }

  public toProto(): CounterpartyInfoV2.Proto {
    const { merkle_prefix, client_id } = this;
    return CounterpartyInfoV2_pb.fromPartial({
      merklePrefix: merkle_prefix.map(Convert.fromBase64),
      clientId: client_id,
    });
  }
}

export namespace CounterpartyInfoV2 {
  export interface Amino {
    merkle_prefix: string[];
    client_id: string;
  }

  export interface Data {
    merkle_prefix: string[];
    client_id: string;
  }

  export type Proto = CounterpartyInfoV2_pb;
}
