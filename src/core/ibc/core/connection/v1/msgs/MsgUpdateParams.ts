import { JSONSerializable } from '../../../../../../util/json';
import { AccAddress } from '../../../../../bech32';
import { IbcConnectionParamsV1 } from '../Params';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgUpdateParams as MsgUpdateIbcConnectionParamsV1_pb } from '@xpla/xpla.proto/ibc/core/connection/v1/tx';

/** MsgUpdateParams defines the sdk.Msg type to update the connection parameters. */
export class MsgUpdateIbcConnectionParamsV1 extends JSONSerializable<
  any,
  MsgUpdateIbcConnectionParamsV1.Data,
  MsgUpdateIbcConnectionParamsV1.Proto
> {
  /**
   * @param signer
   */
  constructor(
    public signer: AccAddress,
    public params: IbcConnectionParamsV1 | undefined,
  ) {
    super();
  }

  public static fromAmino(_: any): MsgUpdateIbcConnectionParamsV1 {
    throw new Error('Amino not supported');
  }

  public toAmino(): any {
    throw new Error('Amino not supported');
  }

  public static fromData(
    data: MsgUpdateIbcConnectionParamsV1.Data,
  ): MsgUpdateIbcConnectionParamsV1 {
    const {
      signer,
      params,
    } = data;
    return new MsgUpdateIbcConnectionParamsV1(
      signer,
      params ? IbcConnectionParamsV1.fromData(params) : undefined,
    );
  }

  public toData(): MsgUpdateIbcConnectionParamsV1.Data {
    const {
      signer,
      params,
    } = this;
    return {
      '@type': '/ibc.core.connection.v1.MsgUpdateParams',
      signer,
      params: params?.toData(),
    };
  }

  public static fromProto(
    proto: MsgUpdateIbcConnectionParamsV1.Proto,
  ): MsgUpdateIbcConnectionParamsV1 {
    return new MsgUpdateIbcConnectionParamsV1(
      proto.signer,
      proto.params ? IbcConnectionParamsV1.fromProto(proto.params) : undefined,
    );
  }

  public toProto(): MsgUpdateIbcConnectionParamsV1.Proto {
    const {
      signer,
      params,
    } = this;
    return MsgUpdateIbcConnectionParamsV1_pb.fromPartial({
      signer,
      params: params?.toProto(),
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/ibc.core.connection.v1.MsgUpdateParams',
      value: MsgUpdateIbcConnectionParamsV1_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any): MsgUpdateIbcConnectionParamsV1 {
    return MsgUpdateIbcConnectionParamsV1.fromProto(
      MsgUpdateIbcConnectionParamsV1_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgUpdateIbcConnectionParamsV1 {
  export interface Data {
    '@type': '/ibc.core.connection.v1.MsgUpdateParams';
    signer: AccAddress;
    params: IbcConnectionParamsV1.Data | undefined;
  }
  export type Proto = MsgUpdateIbcConnectionParamsV1_pb;
}
