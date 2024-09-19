/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../util/json';
import { Params as ERC20ParamsV1_pb } from '@xpla/xpla.proto/evmos/erc20/v1/genesis';

export class ERC20ParamsV1 extends JSONSerializable<
  ERC20ParamsV1.Amino,
  ERC20ParamsV1.Data,
  ERC20ParamsV1.Proto
> {
  /**
   * @param enable_erc20 is the parameter to enable the conversion of Cosmos coins <--> ERC20 tokens
   * @param enable_evm_hook is the parameter to enable the EVM hook that converts an ERC20 token to a Cosmos Coin by transferring the Tokens through a MsgEthereumTx to the ModuleAddress Ethereum address
   */
  constructor(public enable_erc20: boolean, public enable_evm_hook: boolean) {
    super();
  }

  public static fromAmino(
    data: ERC20ParamsV1.Amino,
    _?: boolean
  ): ERC20ParamsV1 {
    const { enable_erc20, enable_evm_hook } = data;
    return new ERC20ParamsV1(enable_erc20 ?? false, enable_evm_hook ?? false);
  }

  public toAmino(_?: boolean): ERC20ParamsV1.Amino {
    const { enable_erc20, enable_evm_hook } = this;

    const res: ERC20ParamsV1.Amino = {
      enable_erc20,
      enable_evm_hook,
    };

    return res;
  }

  public static fromData(data: ERC20ParamsV1.Data, _?: boolean): ERC20ParamsV1 {
    const { enable_erc20, enable_evm_hook } = data;
    return new ERC20ParamsV1(enable_erc20, enable_evm_hook);
  }

  public toData(_?: boolean): ERC20ParamsV1.Data {
    const { enable_erc20, enable_evm_hook } = this;

    const res: ERC20ParamsV1.Data = {
      '@type': '/ethermint.erc20.v1.Params',
      enable_erc20,
      enable_evm_hook,
    };

    return res;
  }

  public static fromProto(
    proto: ERC20ParamsV1.Proto,
    _?: boolean
  ): ERC20ParamsV1 {
    return new ERC20ParamsV1(proto.enableErc20, proto.enableEvmHook);
  }

  public toProto(_?: boolean): ERC20ParamsV1.Proto {
    const { enable_erc20, enable_evm_hook } = this;
    return ERC20ParamsV1_pb.fromPartial({
      enableErc20: enable_erc20,
      enableEvmHook: enable_evm_hook,
    });
  }
}

export namespace ERC20ParamsV1 {
  export interface Amino {
    enable_erc20: boolean | undefined;
    enable_evm_hook: boolean | undefined;
  }

  export interface Data {
    '@type': '/ethermint.erc20.v1.Params';
    enable_erc20: boolean;
    enable_evm_hook: boolean;
  }

  export type Proto = ERC20ParamsV1_pb;
}
