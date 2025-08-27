import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { ProtocolPoolParamsV1 } from '../Params';
import { MsgUpdateParams as MsgUpdateProtocolPoolParamsV1_pb } from '@xpla/xpla.proto/cosmos/protocolpool/v1/tx';

export class MsgUpdateProtocolPoolParamsV1 extends JSONSerializable<
  MsgUpdateProtocolPoolParamsV1.Amino,
  MsgUpdateProtocolPoolParamsV1.Data,
  MsgUpdateProtocolPoolParamsV1.Proto
> {
  constructor(
    public authority: AccAddress,
    public params: ProtocolPoolParamsV1 | undefined,
  ) {
    super();
  }

  public static fromAmino(
    data: MsgUpdateProtocolPoolParamsV1.Amino,
    _isClassic?: boolean
  ): MsgUpdateProtocolPoolParamsV1 {
    const { authority, params } = data;
    return new MsgUpdateProtocolPoolParamsV1(
      authority,
      params ? ProtocolPoolParamsV1.fromAmino(params) : undefined
    );
  }

  public toAmino(_isClassic?: boolean): MsgUpdateProtocolPoolParamsV1.Amino {
    const { authority, params } = this;
    return {
      type: 'protocolpool/MsgUpdateParams',
      authority,
      params: params ? params.toAmino() : undefined,
    };
  }

  public static fromData(
    data: MsgUpdateProtocolPoolParamsV1.Data,
  ): MsgUpdateProtocolPoolParamsV1 {
    const { authority, params } = data;
    return new MsgUpdateProtocolPoolParamsV1(
      authority,
      params ? ProtocolPoolParamsV1.fromData(params) : undefined,
    );
  }

  public toData(): MsgUpdateProtocolPoolParamsV1.Data {
    const { authority, params } = this;
    return {
      '@type': '/cosmos.protocolpool.v1.MsgUpdateParams',
      authority,
      params: params ? params.toData() : undefined,
    };
  }

  public static fromProto(
    proto: MsgUpdateProtocolPoolParamsV1.Proto,
  ): MsgUpdateProtocolPoolParamsV1 {
    return new MsgUpdateProtocolPoolParamsV1(
      proto.authority,
      proto.params ? ProtocolPoolParamsV1.fromProto(proto.params) : undefined,
    );
  }

  public toProto(): MsgUpdateProtocolPoolParamsV1.Proto {
    const { authority, params } = this;
    return MsgUpdateProtocolPoolParamsV1_pb.fromPartial({
      authority,
      params: params?.toProto(),
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.protocolpool.v1.MsgUpdateParams',
      value: MsgUpdateProtocolPoolParamsV1_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
  ): MsgUpdateProtocolPoolParamsV1 {
    return MsgUpdateProtocolPoolParamsV1.fromProto(
      MsgUpdateProtocolPoolParamsV1_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgUpdateProtocolPoolParamsV1 {
  export interface Amino {
    type: 'protocolpool/MsgUpdateParams';
    authority: AccAddress;
    params: ProtocolPoolParamsV1.Amino | undefined;
  }

  export interface Data {
    '@type': '/cosmos.protocolpool.v1.MsgUpdateParams';
    authority: AccAddress;
    params: ProtocolPoolParamsV1.Data | undefined;
  }

  export type Proto = MsgUpdateProtocolPoolParamsV1_pb;
}
