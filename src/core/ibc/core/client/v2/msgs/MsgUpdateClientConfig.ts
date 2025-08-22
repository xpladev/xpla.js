/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../../../util/json';
import { Convert } from '../../../../../../util/convert';
import { AccAddress } from '../../../../../bech32';
import { IbcClientConfigV2 } from '../Config';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgUpdateClientConfig as MsgUpdateClientConfigV2_pb } from '@xpla/xpla.proto/ibc/core/client/v2/tx';

/** MsgUpdateClientConfig defines the sdk.Msg type to update the configuration for a given client */
export class MsgUpdateClientConfigV2 extends JSONSerializable<
  any,
  MsgUpdateClientConfigV2.Data,
  MsgUpdateClientConfigV2.Proto
> {
  /**
   * @param client_id client identifier
   * @param config client configuration
   * @param signer signer address
   */
  constructor(
    public client_id: string,
    public config: IbcClientConfigV2 | undefined,
    public signer: AccAddress,
  ) {
    super();
  }

  public static fromAmino(_: any, _isClassic?: boolean): MsgUpdateClientConfigV2 {
    throw new Error('Amino not supported');
  }

  public toAmino(): any {
    throw new Error('Amino not supported');
  }

  public static fromData(
    data: MsgUpdateClientConfigV2.Data,
  ): MsgUpdateClientConfigV2 {
    const { client_id, config, signer } = data;
    return new MsgUpdateClientConfigV2(
      client_id,
      config ? IbcClientConfigV2.fromData(config) : undefined,
      signer,
    );
  }

  public toData(): MsgUpdateClientConfigV2.Data {
    const { client_id, config, signer } = this;
    return {
      '@type': '/ibc.core.client.v2.MsgUpdateClientConfig',
      client_id,
      config: config?.toData(),
      signer,
    };
  }

  public static fromProto(
    proto: MsgUpdateClientConfigV2.Proto,
  ): MsgUpdateClientConfigV2 {
    return new MsgUpdateClientConfigV2(
      proto.clientId,
      proto.config ? IbcClientConfigV2.fromProto(proto.config) : undefined,
      proto.signer
    );
  }

  public toProto(): MsgUpdateClientConfigV2.Proto {
    const { client_id, config, signer } = this;
    return MsgUpdateClientConfigV2_pb.fromPartial({
      clientId: client_id,
      config: config?.toProto(),
      signer,
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/ibc.core.client.v2.MsgUpdateClientConfig',
      value: MsgUpdateClientConfigV2_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any): MsgUpdateClientConfigV2 {
    return MsgUpdateClientConfigV2.fromProto(MsgUpdateClientConfigV2_pb.decode(msgAny.value));
  }
}

export namespace MsgUpdateClientConfigV2 {
  export interface Data {
    '@type': '/ibc.core.client.v2.MsgUpdateClientConfig';
    client_id: string;
    config: IbcClientConfigV2.Data | undefined;
    signer: AccAddress;
  }
  export type Proto = MsgUpdateClientConfigV2_pb;
}
