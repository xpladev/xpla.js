/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../../../../util/json';
import { AccAddress } from '../../../../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgUpdateParams as MsgUpdateIcaHostParamsV1_pb } from '@xpla/xpla.proto/ibc/applications/interchain_accounts/host/v1/tx';
import { IcaHostParamsV1 } from '../Params';

export class MsgUpdateIcaHostParamsV1 extends JSONSerializable<
  any,
  MsgUpdateIcaHostParamsV1.Data,
  MsgUpdateIcaHostParamsV1.Proto
> {
  /**
   * @param signer is signer address
   * @param params defines the 27-interchain-accounts/controller parameters to update
   */
  constructor(
    public signer: AccAddress,
    public params: IcaHostParamsV1 | undefined
  ) {
    super();
  }

  public static fromAmino(_: any): MsgUpdateIcaHostParamsV1 {
    throw new Error('Amino not supported');
  }

  public toAmino(): any {
    throw new Error('Amino not supported');
  }

  public static fromData(
    data: MsgUpdateIcaHostParamsV1.Data,
  ): MsgUpdateIcaHostParamsV1 {
    const { signer, params } = data;
    return new MsgUpdateIcaHostParamsV1(
      signer,
      params ? IcaHostParamsV1.fromData(params) : undefined
    );
  }

  public toData(): MsgUpdateIcaHostParamsV1.Data {
    const { signer, params } = this;
    return {
      '@type': '/ibc.applications.interchain_accounts.host.v1.MsgUpdateParams',
      signer,
      params: params ? params.toData() : undefined,
    };
  }

  public static fromProto(
    proto: MsgUpdateIcaHostParamsV1.Proto,
  ): MsgUpdateIcaHostParamsV1 {
    return new MsgUpdateIcaHostParamsV1(
      proto.signer,
      proto.params ? IcaHostParamsV1.fromProto(proto.params) : undefined
    );
  }

  public toProto(): MsgUpdateIcaHostParamsV1.Proto {
    const { signer, params } = this;
    return MsgUpdateIcaHostParamsV1_pb.fromPartial({
      signer,
      params: params ? params.toProto() : undefined,
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/ibc.applications.interchain_accounts.host.v1.MsgUpdateParams',
      value: MsgUpdateIcaHostParamsV1_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
  ): MsgUpdateIcaHostParamsV1 {
    return MsgUpdateIcaHostParamsV1.fromProto(
      MsgUpdateIcaHostParamsV1_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgUpdateIcaHostParamsV1 {
  export interface Data {
    '@type': '/ibc.applications.interchain_accounts.host.v1.MsgUpdateParams';
    signer: AccAddress;
    params: IcaHostParamsV1.Data | undefined;
  }

  export type Proto = MsgUpdateIcaHostParamsV1_pb;
}
