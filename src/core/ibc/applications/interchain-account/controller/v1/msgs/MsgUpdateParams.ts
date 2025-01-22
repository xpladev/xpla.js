/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../../../../util/json';
import { AccAddress } from '../../../../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgUpdateParams as MsgUpdateIcaControllerParamsV1_pb } from '@xpla/xpla.proto/ibc/applications/interchain_accounts/controller/v1/tx';
import { IcaControllerParamsV1 } from '../Params';

export class MsgUpdateIcaControllerParamsV1 extends JSONSerializable<
  any,
  MsgUpdateIcaControllerParamsV1.Data,
  MsgUpdateIcaControllerParamsV1.Proto
> {
  /**
   * @param signer is signer address
   * @param params defines the 27-interchain-accounts/controller parameters to update
   */
  constructor(
    public signer: AccAddress,
    public params: IcaControllerParamsV1 | undefined
  ) {
    super();
  }

  public static fromAmino(_: any): MsgUpdateIcaControllerParamsV1 {
    throw new Error('Amino not supported');
  }

  public toAmino(): any {
    throw new Error('Amino not supported');
  }

  public static fromData(
    data: MsgUpdateIcaControllerParamsV1.Data,
  ): MsgUpdateIcaControllerParamsV1 {
    const { signer, params } = data;
    return new MsgUpdateIcaControllerParamsV1(
      signer,
      params ? IcaControllerParamsV1.fromData(params) : undefined
    );
  }

  public toData(): MsgUpdateIcaControllerParamsV1.Data {
    const { signer, params } = this;
    return {
      '@type': '/ibc.applications.interchain_accounts.controller.v1.MsgUpdateParams',
      signer,
      params: params ? params.toData() : undefined,
    };
  }

  public static fromProto(
    proto: MsgUpdateIcaControllerParamsV1.Proto,
  ): MsgUpdateIcaControllerParamsV1 {
    return new MsgUpdateIcaControllerParamsV1(
      proto.signer,
      proto.params ? IcaControllerParamsV1.fromProto(proto.params) : undefined
    );
  }

  public toProto(): MsgUpdateIcaControllerParamsV1.Proto {
    const { signer, params } = this;
    return MsgUpdateIcaControllerParamsV1_pb.fromPartial({
      signer,
      params: params ? params.toProto() : undefined,
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/ibc.applications.interchain_accounts.controller.v1.MsgUpdateParams',
      value: MsgUpdateIcaControllerParamsV1_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
  ): MsgUpdateIcaControllerParamsV1 {
    return MsgUpdateIcaControllerParamsV1.fromProto(
      MsgUpdateIcaControllerParamsV1_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgUpdateIcaControllerParamsV1 {
  export interface Data {
    '@type': '/ibc.applications.interchain_accounts.controller.v1.MsgUpdateParams';
    signer: AccAddress;
    params: IcaControllerParamsV1.Data | undefined;
  }

  export type Proto = MsgUpdateIcaControllerParamsV1_pb;
}
