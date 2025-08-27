/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../util/json';
import { Params as ERC20ParamsV1_pb } from '@xpla/xpla.proto/cosmos/evm/erc20/v1/genesis';

export class ERC20ParamsV1 extends JSONSerializable<
  ERC20ParamsV1.Amino,
  ERC20ParamsV1.Data,
  ERC20ParamsV1.Proto
> {
  /**
   * @param enable_erc20 is the parameter to enable the conversion of Cosmos coins <--> ERC20 tokens
   * @param enable_evm_hook is deprecated
   * @param permissionless_registration is the parameter that allows ERC20s to be permissionlessly registered to be converted to bank tokens and vice versa
   */
  constructor(public enable_erc20: boolean, public enable_evm_hook: boolean, public permissionless_registration: boolean) {
    super();
    this.enable_evm_hook = false;
  }

  public static fromAmino(
    data: ERC20ParamsV1.Amino,
    _?: boolean
  ): ERC20ParamsV1 {
    const { enable_erc20, permissionless_registration } = data;
    return new ERC20ParamsV1(enable_erc20 ?? false, false, permissionless_registration ?? false);
  }

  public toAmino(_?: boolean): ERC20ParamsV1.Amino {
    const { enable_erc20, permissionless_registration } = this;

    const res: ERC20ParamsV1.Amino = {
      enable_erc20,
      permissionless_registration,
    };

    return res;
  }

  public static fromData(data: ERC20ParamsV1.Data, _?: boolean): ERC20ParamsV1 {
    const { enable_erc20, permissionless_registration } = data;
    return new ERC20ParamsV1(enable_erc20, false, permissionless_registration);
  }

  public toData(_?: boolean): ERC20ParamsV1.Data {
    const { enable_erc20, permissionless_registration } = this;

    const res: ERC20ParamsV1.Data = {
      '@type': '/cosmos.evm.erc20.v1.Params',
      enable_erc20,
      permissionless_registration,
    };

    return res;
  }

  public static fromProto(
    proto: ERC20ParamsV1.Proto,
    _?: boolean
  ): ERC20ParamsV1 {
    return new ERC20ParamsV1(proto.enableErc20, false, proto.permissionlessRegistration);
  }

  public toProto(_?: boolean): ERC20ParamsV1.Proto {
    const { enable_erc20, permissionless_registration } = this;
    return ERC20ParamsV1_pb.fromPartial({
      enableErc20: enable_erc20,
      permissionlessRegistration: permissionless_registration,
    });
  }
}

export namespace ERC20ParamsV1 {
  export interface Amino {
    enable_erc20: boolean | undefined;
    permissionless_registration: boolean | undefined;
  }

  export interface Data {
    '@type': '/cosmos.evm.erc20.v1.Params';
    enable_erc20: boolean;
    permissionless_registration: boolean;
  }

  export type Proto = ERC20ParamsV1_pb;
}
