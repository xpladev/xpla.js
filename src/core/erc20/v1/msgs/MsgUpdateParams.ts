/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgUpdateParams as MsgUpdateERC20ParamsV1_pb } from '@xpla/xpla.proto/cosmos/evm/erc20/v1/tx';
import { ERC20ParamsV1 } from '../Params';

export class MsgUpdateERC20ParamsV1 extends JSONSerializable<
  MsgUpdateERC20ParamsV1.Amino,
  MsgUpdateERC20ParamsV1.Data,
  MsgUpdateERC20ParamsV1.Proto
> {
  /**
   * @param authority is the address that controls the module
   * @param params defines the x/bank parameters to update
   */
  constructor(
    public authority: AccAddress,
    public params: ERC20ParamsV1 | undefined
  ) {
    super();
  }

  public static fromAmino(
    data: MsgUpdateERC20ParamsV1.Amino,
    _isClassic?: boolean
  ): MsgUpdateERC20ParamsV1 {
    const {
      value: { authority, params },
    } = data;
    return new MsgUpdateERC20ParamsV1(
      authority,
      params ? ERC20ParamsV1.fromAmino(params) : undefined
    );
  }

  public toAmino(_isClassic?: boolean): MsgUpdateERC20ParamsV1.Amino {
    const { authority, params } = this;
    return {
      type: 'evm/erc20/MsgUpdateParams',
      value: {
        authority,
        params: params ? params.toAmino() : undefined,
      },
    };
  }

  public static fromData(
    data: MsgUpdateERC20ParamsV1.Data,
    _isClassic?: boolean
  ): MsgUpdateERC20ParamsV1 {
    const { authority, params } = data;
    return new MsgUpdateERC20ParamsV1(
      authority,
      params ? ERC20ParamsV1.fromData(params) : undefined
    );
  }

  public toData(_isClassic?: boolean): MsgUpdateERC20ParamsV1.Data {
    const { authority, params } = this;
    return {
      '@type': '/cosmos.evm.erc20.v1.MsgUpdateParams',
      authority,
      params: params ? params.toData() : undefined,
    };
  }

  public static fromProto(
    proto: MsgUpdateERC20ParamsV1.Proto,
    _isClassic?: boolean
  ): MsgUpdateERC20ParamsV1 {
    return new MsgUpdateERC20ParamsV1(
      proto.authority,
      proto.params ? ERC20ParamsV1.fromProto(proto.params) : undefined
    );
  }

  public toProto(_isClassic?: boolean): MsgUpdateERC20ParamsV1.Proto {
    const { authority, params } = this;
    return MsgUpdateERC20ParamsV1_pb.fromPartial({
      authority,
      params: params ? params.toProto() : undefined,
    });
  }

  public packAny(_isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.evm.erc20.v1.MsgUpdateParams',
      value: MsgUpdateERC20ParamsV1_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    _isClassic?: boolean
  ): MsgUpdateERC20ParamsV1 {
    return MsgUpdateERC20ParamsV1.fromProto(
      MsgUpdateERC20ParamsV1_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgUpdateERC20ParamsV1 {
  export interface Amino {
    type: 'ethermint/erc20/MsgUpdateParams' | 'evmos/erc20/MsgUpdateParams' | 'evm/erc20/MsgUpdateParams';
    value: {
      authority: AccAddress;
      params: ERC20ParamsV1.Amino | undefined;
    };
  }

  export interface Data {
    '@type':
      | '/ethermint.erc20.v1.MsgUpdateParams'
      | '/evmos.erc20.v1.MsgUpdateParams'
      | '/cosmos.evm.erc20.v1.MsgUpdateParams';
    authority: AccAddress;
    params: ERC20ParamsV1.Data | undefined;
  }

  export type Proto = MsgUpdateERC20ParamsV1_pb;
}
