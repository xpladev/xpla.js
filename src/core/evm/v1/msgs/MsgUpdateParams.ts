/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgUpdateParams as MsgUpdateEvmParamsV1L_pb } from '@xpla/xpla.proto/ethermint/evm/v1/tx';
import { MsgUpdateParams as MsgUpdateEvmParamsV1_pb } from '@xpla/xpla.proto/cosmos/evm/vm/v1/tx';
import { EvmParamsV1 } from '../Params';

export class MsgUpdateEvmParamsV1 extends JSONSerializable<
  MsgUpdateEvmParamsV1.Amino,
  MsgUpdateEvmParamsV1.Data,
  MsgUpdateEvmParamsV1.Proto
> {
  /**
   * @param authority is the address that controls the module
   * @param params defines the x/bank parameters to update
   */
  constructor(
    public authority: AccAddress,
    public params: EvmParamsV1 | undefined
  ) {
    super();
  }

  public static fromAmino(
    data: MsgUpdateEvmParamsV1.Amino,
    _isClassic?: boolean
  ): MsgUpdateEvmParamsV1 {
    const {
      value: { authority, params },
    } = data;
    return new MsgUpdateEvmParamsV1(
      authority,
      params ? EvmParamsV1.fromAmino(params) : undefined
    );
  }

  public toAmino(_isClassic?: boolean): MsgUpdateEvmParamsV1.Amino {
    const { authority, params } = this;
    return {
      type: 'evm/MsgUpdateParams',
      value: {
        authority,
        params: params ? params.toAmino() : undefined,
      },
    };
  }

  public static fromData(
    data: MsgUpdateEvmParamsV1.Data,
    _isClassic?: boolean
  ): MsgUpdateEvmParamsV1 {
    const { authority, params } = data;
    return new MsgUpdateEvmParamsV1(
      authority,
      params ? EvmParamsV1.fromData(params) : undefined
    );
  }

  public toData(_isClassic?: boolean): MsgUpdateEvmParamsV1.Data {
    const { authority, params } = this;
    return {
      '@type': '/cosmos.evm.vm.v1.MsgUpdateParams',
      authority,
      params: params ? params.toData() : undefined,
    };
  }

  public static fromProto(
    proto: MsgUpdateEvmParamsV1.Proto,
    _isClassic?: boolean
  ): MsgUpdateEvmParamsV1 {
    return new MsgUpdateEvmParamsV1(
      proto.authority,
      proto.params ? EvmParamsV1.fromProto(proto.params) : undefined
    );
  }

  public toProto(_isClassic?: boolean): MsgUpdateEvmParamsV1.Proto {
    const { authority, params } = this;
    return MsgUpdateEvmParamsV1_pb.fromPartial({
      authority,
      params: params ? params.toProto() : undefined,
    });
  }

  public packAny(_isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.evm.vm.v1.MsgUpdateParams',
      value: MsgUpdateEvmParamsV1_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    _isClassic?: boolean
  ): MsgUpdateEvmParamsV1 {
    return MsgUpdateEvmParamsV1.fromProto(
      MsgUpdateEvmParamsV1_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgUpdateEvmParamsV1 {
  export interface Amino {
    type:
      | 'ethermint/x/evm/MsgUpdateParams'
      | 'evm/MsgUpdateParams';
    value: {
      authority: AccAddress;
      params: EvmParamsV1.Amino | undefined;
    };
  }

  export interface Data {
    '@type':
      | '/ethermint.evm.v1.MsgUpdateParams'
      | '/cosmos.evm.vm.v1.MsgUpdateParams';
    authority: AccAddress;
    params: EvmParamsV1.Data | undefined;
  }

  export type Proto = MsgUpdateEvmParamsV1_pb;
}
