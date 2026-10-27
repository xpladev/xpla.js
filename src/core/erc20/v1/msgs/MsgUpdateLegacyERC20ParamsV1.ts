import type { MsgUpdateERC20ParamsV1 } from './MsgUpdateParams';
import { JSONSerializable } from '../../../../util/json';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgUpdateParams as ProtoCodec } from '@xpla/xpla.proto/evmos/erc20/v1/tx';

/** Legacy parameter update. Keeps the original type URL and removed fields. */
export class MsgUpdateLegacyERC20ParamsV1 extends JSONSerializable<
  MsgUpdateLegacyERC20ParamsV1.Amino,
  MsgUpdateLegacyERC20ParamsV1.Data,
  MsgUpdateLegacyERC20ParamsV1.Proto
> {
  constructor(
    public authority: string,
    public params: ProtoCodec['params']
  ) {
    super();
  }
  public static fromData(
    data: MsgUpdateLegacyERC20ParamsV1.Data | MsgUpdateERC20ParamsV1.Data
  ): MsgUpdateLegacyERC20ParamsV1 {
    return this.fromProto(ProtoCodec.fromJSON(data));
  }
  public toData(): MsgUpdateLegacyERC20ParamsV1.Data {
    const params = this.params;
    return {
      '@type': '/evmos.erc20.v1.MsgUpdateParams',
      authority: this.authority,
      params: params
        ? {
            enable_erc20: params.enableErc20,
            enable_evm_hook: params.enableEvmHook,
          }
        : undefined,
    };
  }
  public static fromAmino(
    data: MsgUpdateLegacyERC20ParamsV1.Amino | MsgUpdateERC20ParamsV1.Amino
  ): MsgUpdateLegacyERC20ParamsV1 {
    return this.fromProto(ProtoCodec.fromJSON(data.value));
  }
  public toAmino(): MsgUpdateLegacyERC20ParamsV1.Amino {
    const { authority, params } = this.toData();
    const value = { authority, params };
    return { type: 'evmos/erc20/MsgUpdateParams', value };
  }
  public static fromProto(proto: ProtoCodec): MsgUpdateLegacyERC20ParamsV1 {
    return new MsgUpdateLegacyERC20ParamsV1(proto.authority, proto.params);
  }
  public toProto(): ProtoCodec {
    return ProtoCodec.fromPartial({
      authority: this.authority,
      params: this.params,
    });
  }
  public packAny(): Any {
    return {
      typeUrl: '/evmos.erc20.v1.MsgUpdateParams',
      value: ProtoCodec.encode(this.toProto()).finish(),
    };
  }
  public static unpackAny(any: Any): MsgUpdateLegacyERC20ParamsV1 {
    return this.fromProto(ProtoCodec.decode(any.value));
  }
}
export namespace MsgUpdateLegacyERC20ParamsV1 {
  export interface Data {
    '@type': '/evmos.erc20.v1.MsgUpdateParams';
    authority: string;
    params: { enable_erc20: boolean; enable_evm_hook: boolean } | undefined;
  }
  export interface Amino {
    type: 'evmos/erc20/MsgUpdateParams';
    value: Omit<Data, '@type'>;
  }
  export type Proto = ProtoCodec;
}
