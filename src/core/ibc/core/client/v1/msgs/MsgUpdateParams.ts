/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../../../util/json';
import { AccAddress } from '../../../../../bech32';
import { IbcClientParamsV1 } from '../Params';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgUpdateParams as MsgUpdateIbcClientParamsV1_pb } from '@xpla/xpla.proto/ibc/core/client/v1/tx';

export class MsgUpdateIbcClientParamsV1 extends JSONSerializable<
  any,
  MsgUpdateIbcClientParamsV1.Data,
  MsgUpdateIbcClientParamsV1.Proto
> {
  /**
   * @param signer
   * @param params
   */
  constructor(
    public signer: AccAddress,
    public params: IbcClientParamsV1 | undefined,
  ) {
    super();
  }

  public static fromAmino(_: any, _isClassic?: boolean): MsgUpdateIbcClientParamsV1 {
    throw new Error('Amino not supported');
  }

  public toAmino(_?: boolean): any {
    throw new Error('Amino not supported');
  }

  public static fromData(
    data: MsgUpdateIbcClientParamsV1.Data,
    _?: boolean
  ): MsgUpdateIbcClientParamsV1 {
    const {
      signer,
      params,
    } = data;
    return new MsgUpdateIbcClientParamsV1(
      signer,
      params ? IbcClientParamsV1.fromData(params) : undefined,
    );
  }

  public toData(_?: boolean): MsgUpdateIbcClientParamsV1.Data {
    const {
      signer,
      params,
    } = this;
    return {
      '@type': '/ibc.core.client.v1.MsgUpdateParams',
      signer,
      params: params ? params.toData() : undefined,
    };
  }

  public static fromProto(
    proto: MsgUpdateIbcClientParamsV1.Proto,
    _?: boolean
  ): MsgUpdateIbcClientParamsV1 {
    return new MsgUpdateIbcClientParamsV1(
      proto.signer,
      proto.params ? IbcClientParamsV1.fromProto(proto.params) : undefined,
    );
  }

  public toProto(_?: boolean): MsgUpdateIbcClientParamsV1.Proto {
    const {
      signer,
      params,
    } = this;
    return MsgUpdateIbcClientParamsV1_pb.fromPartial({
      signer: signer,
      params: params ? params.toProto() : undefined,
    });
  }

  public packAny(_?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/ibc.core.client.v1.MsgUpdateParams',
      value: MsgUpdateIbcClientParamsV1_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgUpdateIbcClientParamsV1 {
    return MsgUpdateIbcClientParamsV1.fromProto(MsgUpdateIbcClientParamsV1_pb.decode(msgAny.value));
  }
}

export namespace MsgUpdateIbcClientParamsV1 {
  export interface Data {
    '@type': '/ibc.core.client.v1.MsgUpdateParams';
    signer: AccAddress;
    params: IbcClientParamsV1.Data | undefined;
  }
  export type Proto = MsgUpdateIbcClientParamsV1_pb;
}
