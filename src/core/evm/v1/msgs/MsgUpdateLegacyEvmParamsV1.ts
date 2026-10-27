import type { MsgUpdateEvmParamsV1 } from './MsgUpdateParams';
import { JSONSerializable } from '../../../../util/json';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgUpdateParams as ProtoCodec } from '@xpla/xpla.proto/ethermint/evm/v1/tx';

/** Legacy parameter update. Keeps the original type URL and removed fields. */
export class MsgUpdateLegacyEvmParamsV1 extends JSONSerializable<
  MsgUpdateLegacyEvmParamsV1.Amino,
  MsgUpdateLegacyEvmParamsV1.Data,
  MsgUpdateLegacyEvmParamsV1.Proto
> {
  constructor(
    public authority: string,
    public params: ProtoCodec['params']
  ) {
    super();
  }
  public static fromData(
    data: MsgUpdateLegacyEvmParamsV1.Data | MsgUpdateEvmParamsV1.Data
  ): MsgUpdateLegacyEvmParamsV1 {
    return this.fromProto(ProtoCodec.fromJSON(data));
  }
  public toData(): MsgUpdateLegacyEvmParamsV1.Data {
    const params = this.params;
    return {
      '@type': '/ethermint.evm.v1.MsgUpdateParams',
      authority: this.authority,
      params: params
        ? {
            evm_denom: params.evmDenom,
            enable_create: params.enableCreate,
            enable_call: params.enableCall,
            extra_eips: params.extraEips,
            chain_config: params.chainConfig
              ? {
                  homestead_block: params.chainConfig.homesteadBlock,
                  dao_fork_block: params.chainConfig.daoForkBlock,
                  dao_fork_support: params.chainConfig.daoForkSupport,
                  eip150_block: params.chainConfig.eip150Block,
                  eip150_hash: params.chainConfig.eip150Hash,
                  eip155_block: params.chainConfig.eip155Block,
                  eip158_block: params.chainConfig.eip158Block,
                  byzantium_block: params.chainConfig.byzantiumBlock,
                  constantinople_block: params.chainConfig.constantinopleBlock,
                  petersburg_block: params.chainConfig.petersburgBlock,
                  istanbul_block: params.chainConfig.istanbulBlock,
                  muir_glacier_block: params.chainConfig.muirGlacierBlock,
                  berlin_block: params.chainConfig.berlinBlock,
                  london_block: params.chainConfig.londonBlock,
                  arrow_glacier_block: params.chainConfig.arrowGlacierBlock,
                  gray_glacier_block: params.chainConfig.grayGlacierBlock,
                  merge_netsplit_block: params.chainConfig.mergeNetsplitBlock,
                  shanghai_block: params.chainConfig.shanghaiBlock,
                  cancun_block: params.chainConfig.cancunBlock,
                }
              : undefined,
            allow_unprotected_txs: params.allowUnprotectedTxs,
          }
        : undefined,
    };
  }
  public static fromAmino(
    data: MsgUpdateLegacyEvmParamsV1.Amino | MsgUpdateEvmParamsV1.Amino
  ): MsgUpdateLegacyEvmParamsV1 {
    return this.fromProto(ProtoCodec.fromJSON(data.value));
  }
  public toAmino(): MsgUpdateLegacyEvmParamsV1.Amino {
    const { authority, params } = this.toData();
    const value = { authority, params };
    return { type: 'ethermint/x/evm/MsgUpdateParams', value };
  }
  public static fromProto(proto: ProtoCodec): MsgUpdateLegacyEvmParamsV1 {
    return new MsgUpdateLegacyEvmParamsV1(proto.authority, proto.params);
  }
  public toProto(): ProtoCodec {
    return ProtoCodec.fromPartial({
      authority: this.authority,
      params: this.params,
    });
  }
  public packAny(): Any {
    return {
      typeUrl: '/ethermint.evm.v1.MsgUpdateParams',
      value: ProtoCodec.encode(this.toProto()).finish(),
    };
  }
  public static unpackAny(any: Any): MsgUpdateLegacyEvmParamsV1 {
    return this.fromProto(ProtoCodec.decode(any.value));
  }
}
export namespace MsgUpdateLegacyEvmParamsV1 {
  export interface ChainConfigData {
    homestead_block: string;
    dao_fork_block: string;
    dao_fork_support: boolean;
    eip150_block: string;
    eip150_hash: string;
    eip155_block: string;
    eip158_block: string;
    byzantium_block: string;
    constantinople_block: string;
    petersburg_block: string;
    istanbul_block: string;
    muir_glacier_block: string;
    berlin_block: string;
    london_block: string;
    arrow_glacier_block: string;
    gray_glacier_block: string;
    merge_netsplit_block: string;
    shanghai_block: string;
    cancun_block: string;
  }
  export interface Data {
    '@type': '/ethermint.evm.v1.MsgUpdateParams';
    authority: string;
    params:
      | {
          evm_denom: string;
          enable_create: boolean;
          enable_call: boolean;
          extra_eips: string[];
          chain_config: ChainConfigData | undefined;
          allow_unprotected_txs: boolean;
        }
      | undefined;
  }
  export interface Amino {
    type: 'ethermint/x/evm/MsgUpdateParams';
    value: Omit<Data, '@type'>;
  }
  export type Proto = ProtoCodec;
}
