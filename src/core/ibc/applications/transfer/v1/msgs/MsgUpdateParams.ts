/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../../../util/json';
import { AccAddress } from '../../../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgUpdateParams as MsgUpdateIbcTransferParamsV1_pb } from '@xpla/xpla.proto/ibc/applications/transfer/v1/tx';
import { IbcTransferParamsV1 } from '../Params';

export class MsgUpdateIbcTransferParamsV1 extends JSONSerializable<
  any,
  MsgUpdateIbcTransferParamsV1.Data,
  MsgUpdateIbcTransferParamsV1.Proto
> {
  /**
   * @param signer is signer address
   * @param params defines the transfer parameters to update
   */
  constructor(
    public signer: AccAddress,
    public params: IbcTransferParamsV1 | undefined
  ) {
    super();
  }

  public static fromAmino(_: any): MsgUpdateIbcTransferParamsV1 {
    throw new Error('Amino not supported');
  }

  public toAmino(): any {
    throw new Error('Amino not supported');
  }

  public static fromData(
    data: MsgUpdateIbcTransferParamsV1.Data,
  ): MsgUpdateIbcTransferParamsV1 {
    const { signer, params } = data;
    return new MsgUpdateIbcTransferParamsV1(
      signer,
      params ? IbcTransferParamsV1.fromData(params) : undefined
    );
  }

  public toData(): MsgUpdateIbcTransferParamsV1.Data {
    const { signer, params } = this;
    return {
      '@type': '/ibc.applications.transfer.v1.MsgUpdateParams',
      signer,
      params: params ? params.toData() : undefined,
    };
  }

  public static fromProto(
    proto: MsgUpdateIbcTransferParamsV1.Proto,
  ): MsgUpdateIbcTransferParamsV1 {
    return new MsgUpdateIbcTransferParamsV1(
      proto.signer,
      proto.params ? IbcTransferParamsV1.fromProto(proto.params) : undefined
    );
  }

  public toProto(): MsgUpdateIbcTransferParamsV1.Proto {
    const { signer, params } = this;
    return MsgUpdateIbcTransferParamsV1_pb.fromPartial({
      signer,
      params: params ? params.toProto() : undefined,
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/ibc.applications.transfer.v1.MsgUpdateParams',
      value: MsgUpdateIbcTransferParamsV1_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
  ): MsgUpdateIbcTransferParamsV1 {
    return MsgUpdateIbcTransferParamsV1.fromProto(
      MsgUpdateIbcTransferParamsV1_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgUpdateIbcTransferParamsV1 {
  export interface Data {
    '@type': '/ibc.applications.transfer.v1.MsgUpdateParams';
    signer: AccAddress;
    params: IbcTransferParamsV1.Data | undefined;
  }

  export type Proto = MsgUpdateIbcTransferParamsV1_pb;
}
