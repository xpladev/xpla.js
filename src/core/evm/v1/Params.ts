/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../util/json';
import { Int, Numeric } from '../../../core/numeric';
import { Denom } from '../../../core';
import {
  ChainConfig as EvmChainConfigV1L_pb,
  Params as EvmParamsV1L_pb,
} from '@xpla/xpla.proto/ethermint/evm/v1/evm';
import {
  ChainConfig as EvmChainConfigV1_pb,
  Params as EvmParamsV1_pb,
  AccessControl,
} from '@xpla/xpla.proto/cosmos/evm/vm/v1/evm';

export class EvmParamsV1 extends JSONSerializable<
  EvmParamsV1.Amino,
  EvmParamsV1.Data,
  EvmParamsV1.Proto
> {
  public extra_eips: Int[] | undefined;

  /**
   * @param evm_denom represents the token denomination used to run the EVM state transitions
   * @param enable_create toggles state transitions that use the vm.Create function
   * @param enable_call toggles state transitions that use the vm.Call function
   * @param extra_eips defines the additional EIPs for the vm.Config
   * @param chain_config defines the EVM chain configuration parameters
   * @param allow_unprotected_txs defines if replay-protected (i.e non EIP155 signed) transactions can be executed on the state machine
   */
  constructor(
    public evm_denom: Denom | undefined,
    public enable_create: boolean | undefined,
    public enable_call: boolean | undefined,
    extra_eips: Numeric.Input[] | undefined,
    public chain_config: EvmChainConfigV1 | undefined,
    public allow_unprotected_txs: boolean | undefined,
    public evm_channels: string[] | undefined,
    public access_control: AccessControl | undefined,
    public active_static_precompiles: string[] | undefined,
  ) {
    super();
    this.extra_eips = extra_eips?.map(eip => new Int(eip));
  }

  public static fromAmino(data: EvmParamsV1.Amino, _?: boolean): EvmParamsV1 {
    const {
      evm_denom,
      enable_create,
      enable_call,
      extra_eips,
      chain_config,
      allow_unprotected_txs,
      evm_channels,
      access_control,
      active_static_precompiles,
    } = data;
    return new EvmParamsV1(
      evm_denom,
      enable_create,
      enable_call,
      extra_eips,
      chain_config ? EvmChainConfigV1.fromAmino(chain_config) : undefined,
      allow_unprotected_txs,
      evm_channels,
      access_control ? AccessControl.fromPartial(access_control) : undefined,
      active_static_precompiles,
    );
  }

  public toAmino(_?: boolean): EvmParamsV1.Amino {
    const {
      evm_denom,
      enable_create,
      enable_call,
      extra_eips,
      chain_config,
      allow_unprotected_txs,
      evm_channels,
      access_control,
      active_static_precompiles,
    } = this;

    const res: EvmParamsV1.Amino = {
      evm_denom,
      enable_create,
      enable_call,
      extra_eips: extra_eips?.map(eip => eip.toFixed()),
      chain_config: chain_config?.toAmino(),
      allow_unprotected_txs,
      evm_channels,
      access_control,
      active_static_precompiles,
    };

    return res;
  }

  public static fromData(data: EvmParamsV1.DataL | EvmParamsV1.Data, _?: boolean): EvmParamsV1 {
    if ('chain_config' in data) {
      const p = data as EvmParamsV1.DataL;
      return new EvmParamsV1(
        p.evm_denom,
        p.enable_create,
        p.enable_call,
        p.extra_eips,
        p.chain_config ? EvmChainConfigV1.fromData(p.chain_config) : undefined,
        p.allow_unprotected_txs,
        undefined,
        undefined,
        undefined,
      );
    }
    const p = data as EvmParamsV1.Data;
    return new EvmParamsV1(
      p.evm_denom,
      undefined,
      undefined,
      p.extra_eips,
      undefined,
      p.allow_unprotected_txs,
      p.evm_channels,
      p.access_control,
      p.active_static_precompiles,
    );
  }

  public toData(_?: boolean): EvmParamsV1.Data {
    const {
      evm_denom,
      extra_eips,
      allow_unprotected_txs,
      evm_channels,
      access_control,
      active_static_precompiles,
    } = this;

    const res: EvmParamsV1.Data = {
      '@type': '/cosmos.evm.vm.v1.Params',
      evm_denom: evm_denom ?? 'axpla',
      extra_eips: extra_eips?.map(eip => eip.toFixed()) ?? [],
      allow_unprotected_txs: allow_unprotected_txs ?? false,
      evm_channels: evm_channels ?? [],
      access_control: access_control,
      active_static_precompiles: active_static_precompiles ?? [],
    };

    return res;
  }

  public static fromProto(proto: EvmParamsV1.ProtoL | EvmParamsV1.Proto, _?: boolean): EvmParamsV1 {
    if ('chain_config' in proto) {
      const p = proto as EvmParamsV1.ProtoL;
      return new EvmParamsV1(
        p.evmDenom,
        p.enableCreate,
        p.enableCall,
        p.extraEips.map(eip => new Int(eip.toString())),
        p.chainConfig
          ? EvmChainConfigV1.fromProto(p.chainConfig)
          : undefined,
        p.allowUnprotectedTxs,
        undefined,
        undefined,
        undefined,
      );
    }
    const p = proto as EvmParamsV1.Proto;
    return new EvmParamsV1(
      p.evmDenom,
      undefined,
      undefined,
      p.extraEips.map(eip => new Int(eip.toString())),
      undefined,
      p.allowUnprotectedTxs,
      p.evmChannels,
      p.accessControl,
      p.activeStaticPrecompiles,
    );
  }

  public toProto(_?: boolean): EvmParamsV1.Proto {
    const {
      evm_denom,
      extra_eips,
      allow_unprotected_txs,
      evm_channels,
      access_control,
      active_static_precompiles,
    } = this;
    return EvmParamsV1_pb.fromPartial({
      evmDenom: evm_denom,
      extraEips: extra_eips?.map(eip => eip.toFixed()),
      allowUnprotectedTxs: allow_unprotected_txs ?? false,
      evmChannels: evm_channels ?? [],
      accessControl: access_control,
      activeStaticPrecompiles: active_static_precompiles,
    });
  }
}

export namespace EvmParamsV1 {
  export interface Amino {
    evm_denom: string | undefined;
    enable_create: boolean | undefined;
    enable_call: boolean | undefined;
    extra_eips: string[] | undefined;
    chain_config: EvmChainConfigV1.Amino | undefined;
    allow_unprotected_txs: boolean | undefined;
    evm_channels: string[] | undefined;
    access_control: object | undefined;
    active_static_precompiles: string[] | undefined;
  }

  export interface DataL {
    '@type': '/ethermint.evm.v1.Params';
    evm_denom: string;
    enable_create: boolean;
    enable_call: boolean;
    extra_eips: string[];
    chain_config: EvmChainConfigV1.DataL | undefined;
    allow_unprotected_txs: boolean;
  }
  export interface Data {
    '@type': '/cosmos.evm.vm.v1.Params';
    evm_denom: string;
    extra_eips: string[];
    allow_unprotected_txs: boolean;
    evm_channels: string[];
    access_control: AccessControl | undefined;
    active_static_precompiles: string[];
  }

  export type ProtoL = EvmParamsV1L_pb;
  export type Proto = EvmParamsV1_pb;
}

export class EvmChainConfigV1 extends JSONSerializable<
  EvmChainConfigV1.Amino,
  EvmChainConfigV1.Data,
  EvmChainConfigV1.Proto
> {
  public homestead_block: Int | undefined;
  public dao_fork_block: Int | undefined;
  public eip150_block: Int | undefined;
  public eip155_block: Int | undefined;
  public eip158_block: Int | undefined;
  public byzantium_block: Int | undefined;
  public constantinople_block: Int | undefined;
  public petersburg_block: Int | undefined;
  public istanbul_block: Int | undefined;
  public muir_glacier_block: Int | undefined;
  public berlin_block: Int | undefined;
  public london_block: Int | undefined;
  public arrow_glacier_block: Int | undefined;
  public gray_glacier_block: Int | undefined;
  public merge_netsplit_block: Int | undefined;
  public shanghai_block: Int | undefined;
  public cancun_block: Int | undefined;
  public chain_id: Int | undefined;
  public decimals: Int | undefined;

  /**
   * @param homestead_block switch (nil no fork, 0 = already homestead)
   * @param dao_fork_block corresponds to TheDAO hard-fork switch block (nil no fork)
   * @param dao_fork_support defines whether the nodes supports or opposes the DAO hard-fork
   * @param eip150_block EIP150 implements the Gas price changes
   * @param eip150_hash EIP150 HF hash (needed for header only clients as only gas pricing changed)
   * @param eip155_block EIP155Block HF block
   * @param eip158_block EIP158 HF block
   * @param byzantium_block Byzantium switch block (nil no fork, 0 = already on byzantium)
   * @param constantinople_block Constantinople switch block (nil no fork, 0 = already activated)
   * @param petersburg_block Petersburg switch block (nil same as Constantinople)
   * @param istanbul_block Istanbul switch block (nil no fork, 0 = already on istanbul)
   * @param muir_glacier_block Eip-2384 (bomb delay) switch block (nil no fork, 0 = already activated)
   * @param berlin_block Berlin switch block (nil = no fork, 0 = already on berlin)
   * @param london_block London switch block (nil = no fork, 0 = already on london)
   * @param arrow_glacier_block Eip-4345 (bomb delay) switch block (nil = no fork, 0 = already activated)
   * @param gray_glacier_block EIP-5133 (bomb delay) switch block (nil = no fork, 0 = already activated)
   * @param merge_netsplit_block Virtual fork after The Merge to use as a network splitter
   * @param shanghai_block switch block (nil = no fork, 0 = already on shanghai)
   * @param cancun_block switch block (nil = no fork, 0 = already on cancun)
   */
  constructor(
    homestead_block: Numeric.Input | undefined,
    dao_fork_block: Numeric.Input | undefined,
    public dao_fork_support: boolean | undefined,
    eip150_block: Numeric.Input | undefined,
    public eip150_hash: string | undefined,
    eip155_block: Numeric.Input | undefined,
    eip158_block: Numeric.Input | undefined,
    byzantium_block: Numeric.Input | undefined,
    constantinople_block: Numeric.Input | undefined,
    petersburg_block: Numeric.Input | undefined,
    istanbul_block: Numeric.Input | undefined,
    muir_glacier_block: Numeric.Input | undefined,
    berlin_block: Numeric.Input | undefined,
    london_block: Numeric.Input | undefined,
    arrow_glacier_block: Numeric.Input | undefined,
    gray_glacier_block: Numeric.Input | undefined,
    merge_netsplit_block: Numeric.Input | undefined,
    shanghai_block: Numeric.Input | undefined,
    cancun_block: Numeric.Input | undefined,
    chain_id: Numeric.Input | undefined,
    public denom: string | undefined,
    decimals: Numeric.Input | undefined,
    public shanghai_time: string | undefined,
    public cancun_time: string | undefined,
    public prague_time: string | undefined,
    public verkle_time: string | undefined,
    public osaka_time: string | undefined,
  ) {
    super();
    this.homestead_block = homestead_block ? new Int(homestead_block) : undefined;
    this.dao_fork_block = dao_fork_block ? new Int(dao_fork_block) : undefined;
    this.eip150_block = eip150_block ? new Int(eip150_block) : undefined;
    this.eip155_block = eip155_block ? new Int(eip155_block) : undefined;
    this.eip158_block = eip158_block ? new Int(eip158_block) : undefined;
    this.byzantium_block = byzantium_block ? new Int(byzantium_block) : undefined;
    this.constantinople_block = constantinople_block ? new Int(constantinople_block) : undefined;
    this.petersburg_block = petersburg_block ? new Int(petersburg_block) : undefined;
    this.istanbul_block = istanbul_block ? new Int(istanbul_block) : undefined;
    this.muir_glacier_block = muir_glacier_block ? new Int(muir_glacier_block) : undefined;
    this.berlin_block = berlin_block ? new Int(berlin_block) : undefined;
    this.london_block = london_block ? new Int(london_block) : undefined;
    this.arrow_glacier_block = arrow_glacier_block ? new Int(arrow_glacier_block) : undefined;
    this.gray_glacier_block = gray_glacier_block ? new Int(gray_glacier_block) : undefined;
    this.merge_netsplit_block = merge_netsplit_block ? new Int(merge_netsplit_block) : undefined;
    this.shanghai_block = shanghai_block ? new Int(shanghai_block) : undefined;
    this.cancun_block = cancun_block ? new Int(cancun_block) : undefined;
    this.chain_id = chain_id ? new Int(chain_id) : undefined;
    this.decimals = decimals ? new Int(decimals) : undefined;
  }

  public static fromAmino(
    data: EvmChainConfigV1.Amino,
    _?: boolean
  ): EvmChainConfigV1 {
    const {
      homestead_block,
      dao_fork_block,
      dao_fork_support,
      eip150_block,
      eip150_hash,
      eip155_block,
      eip158_block,
      byzantium_block,
      constantinople_block,
      petersburg_block,
      istanbul_block,
      muir_glacier_block,
      berlin_block,
      london_block,
      arrow_glacier_block,
      gray_glacier_block,
      merge_netsplit_block,
      shanghai_block,
      cancun_block,
      chain_id,
      denom,
      decimals,
      shanghai_time,
      cancun_time,
      prague_time,
      verkle_time,
      osaka_time,
    } = data;
    return new EvmChainConfigV1(
      homestead_block,
      dao_fork_block,
      dao_fork_support,
      eip150_block,
      eip150_hash,
      eip155_block,
      eip158_block,
      byzantium_block,
      constantinople_block,
      petersburg_block,
      istanbul_block,
      muir_glacier_block,
      berlin_block,
      london_block,
      arrow_glacier_block,
      gray_glacier_block,
      merge_netsplit_block,
      shanghai_block,
      cancun_block,
      chain_id,
      denom,
      decimals,
      shanghai_time,
      cancun_time,
      prague_time,
      verkle_time,
      osaka_time,
    );
  }

  public toAmino(_?: boolean): EvmChainConfigV1.Amino {
    const {
      homestead_block,
      dao_fork_block,
      dao_fork_support,
      eip150_block,
      eip150_hash,
      eip155_block,
      eip158_block,
      byzantium_block,
      constantinople_block,
      petersburg_block,
      istanbul_block,
      muir_glacier_block,
      berlin_block,
      london_block,
      arrow_glacier_block,
      gray_glacier_block,
      merge_netsplit_block,
      shanghai_block,
      cancun_block,
      chain_id,
      denom,
      decimals,
      shanghai_time,
      cancun_time,
      prague_time,
      verkle_time,
      osaka_time,
    } = this;

    const res: EvmChainConfigV1.Amino = {
      homestead_block: homestead_block?.toFixed(0),
      dao_fork_block: dao_fork_block?.toFixed(0),
      dao_fork_support,
      eip150_block: eip150_block?.toFixed(0),
      eip150_hash,
      eip155_block: eip155_block?.toFixed(0),
      eip158_block: eip158_block?.toFixed(0),
      byzantium_block: byzantium_block?.toFixed(0),
      constantinople_block: constantinople_block?.toFixed(0),
      petersburg_block: petersburg_block?.toFixed(0),
      istanbul_block: istanbul_block?.toFixed(0),
      muir_glacier_block: muir_glacier_block?.toFixed(0),
      berlin_block: berlin_block?.toFixed(0),
      london_block: london_block?.toFixed(0),
      arrow_glacier_block: arrow_glacier_block?.toFixed(0),
      gray_glacier_block: gray_glacier_block?.toFixed(0),
      merge_netsplit_block: merge_netsplit_block?.toFixed(0),
      shanghai_block: shanghai_block?.toFixed(0),
      cancun_block: cancun_block?.toFixed(0),
      chain_id: chain_id?.toFixed(0),
      denom,
      decimals: decimals?.toFixed(0),
      shanghai_time,
      cancun_time,
      prague_time,
      verkle_time,
      osaka_time,
    };

    return res;
  }

  public static fromData(
    data: EvmChainConfigV1.DataL | EvmChainConfigV1.Data,
    _?: boolean
  ): EvmChainConfigV1 {
    if ('eip150_hash' in data) {
      const {
        homestead_block,
        dao_fork_block,
        dao_fork_support,
        eip150_block,
        eip150_hash,
        eip155_block,
        eip158_block,
        byzantium_block,
        constantinople_block,
        petersburg_block,
        istanbul_block,
        muir_glacier_block,
        berlin_block,
        london_block,
        arrow_glacier_block,
        gray_glacier_block,
        merge_netsplit_block,
        shanghai_block,
        cancun_block,
      } = data;
      return new EvmChainConfigV1(
        homestead_block,
        dao_fork_block,
        dao_fork_support,
        eip150_block,
        eip150_hash,
        eip155_block,
        eip158_block,
        byzantium_block,
        constantinople_block,
        petersburg_block,
        istanbul_block,
        muir_glacier_block,
        berlin_block,
        london_block,
        arrow_glacier_block,
        gray_glacier_block,
        merge_netsplit_block,
        shanghai_block,
        cancun_block,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      );
    }

    const {
      homestead_block,
      dao_fork_block,
      dao_fork_support,
      eip150_block,
      eip155_block,
      eip158_block,
      byzantium_block,
      constantinople_block,
      petersburg_block,
      istanbul_block,
      muir_glacier_block,
      berlin_block,
      london_block,
      arrow_glacier_block,
      gray_glacier_block,
      merge_netsplit_block,
      chain_id,
      denom,
      decimals,
      shanghai_time,
      cancun_time,
      prague_time,
      verkle_time,
      osaka_time,
    } = data;
    return new EvmChainConfigV1(
      homestead_block,
      dao_fork_block,
      dao_fork_support,
      eip150_block,
      undefined,
      eip155_block,
      eip158_block,
      byzantium_block,
      constantinople_block,
      petersburg_block,
      istanbul_block,
      muir_glacier_block,
      berlin_block,
      london_block,
      arrow_glacier_block,
      gray_glacier_block,
      merge_netsplit_block,
      undefined,
      undefined,
      chain_id,
      denom,
      decimals,
      shanghai_time,
      cancun_time,
      prague_time,
      verkle_time,
      osaka_time,
    );
  }

  public toData(_?: boolean): EvmChainConfigV1.Data {
    const {
      homestead_block,
      dao_fork_block,
      dao_fork_support,
      eip150_block,
      eip155_block,
      eip158_block,
      byzantium_block,
      constantinople_block,
      petersburg_block,
      istanbul_block,
      muir_glacier_block,
      berlin_block,
      london_block,
      arrow_glacier_block,
      gray_glacier_block,
      merge_netsplit_block,
      chain_id,
      denom,
      decimals,
      shanghai_time,
      cancun_time,
      prague_time,
      verkle_time,
      osaka_time,
    } = this;

    const res: EvmChainConfigV1.Data = {
      '@type': '/cosmos.evm.vm.v1.ChainConfig',
      homestead_block: homestead_block?.toFixed(0) ?? '0',
      dao_fork_block: dao_fork_block?.toFixed(0) ?? '0',
      dao_fork_support: dao_fork_support ?? false,
      eip150_block: eip150_block?.toFixed(0) ?? '0',
      eip155_block: eip155_block?.toFixed(0) ?? '0',
      eip158_block: eip158_block?.toFixed(0) ?? '0',
      byzantium_block: byzantium_block?.toFixed(0) ?? '0',
      constantinople_block: constantinople_block?.toFixed(0) ?? '0',
      petersburg_block: petersburg_block?.toFixed(0) ?? '0',
      istanbul_block: istanbul_block?.toFixed(0) ?? '0',
      muir_glacier_block: muir_glacier_block?.toFixed(0) ?? '0',
      berlin_block: berlin_block?.toFixed(0) ?? '0',
      london_block: london_block?.toFixed(0) ?? '0',
      arrow_glacier_block: arrow_glacier_block?.toFixed(0) ?? '0',
      gray_glacier_block: gray_glacier_block?.toFixed(0) ?? '0',
      merge_netsplit_block: merge_netsplit_block?.toFixed(0) ?? '0',
      chain_id: chain_id?.toFixed(0) ?? '0',
      denom: denom ?? 'axpla',
      decimals: decimals?.toFixed(0) ?? '0',
      shanghai_time: shanghai_time ?? '',
      cancun_time: cancun_time ?? '',
      prague_time: prague_time ?? '',
      verkle_time: verkle_time ?? '',
      osaka_time: osaka_time ?? '',
    };

    return res;
  }

  public static fromProto(
    proto: EvmChainConfigV1.ProtoL | EvmChainConfigV1.Proto,
    _?: boolean
  ): EvmChainConfigV1 {
    if ('eip150_hash' in proto) {
      const p = proto as EvmChainConfigV1.ProtoL;
      return new EvmChainConfigV1(
        p.homesteadBlock,
        p.daoForkBlock,
        p.daoForkSupport,
        p.eip150Block,
        p.eip150Hash,
        p.eip155Block,
        p.eip158Block,
        p.byzantiumBlock,
        p.constantinopleBlock,
        p.petersburgBlock,
        p.istanbulBlock,
        p.muirGlacierBlock,
        p.berlinBlock,
        p.londonBlock,
        p.arrowGlacierBlock,
        p.grayGlacierBlock,
        p.mergeNetsplitBlock,
        p.shanghaiBlock,
        p.cancunBlock,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      );
    }
    
    const p = proto as EvmChainConfigV1.Proto;
    return new EvmChainConfigV1(
      p.homesteadBlock,
      p.daoForkBlock,
      p.daoForkSupport,
      p.eip150Block,
      undefined,
      p.eip155Block,
      p.eip158Block,
      p.byzantiumBlock,
      p.constantinopleBlock,
      p.petersburgBlock,
      p.istanbulBlock,
      p.muirGlacierBlock,
      p.berlinBlock,
      p.londonBlock,
      p.arrowGlacierBlock,
      p.grayGlacierBlock,
      p.mergeNetsplitBlock,
      undefined,
      undefined,
      p.chainId.toString(),
      p.denom,
      p.decimals.toString(),
      p.shanghaiTime,
      p.cancunTime,
      p.pragueTime,
      p.verkleTime,
      p.osakaTime,
    );
  }

  public toProto(_?: boolean): EvmChainConfigV1.Proto {
    const {
      homestead_block,
      dao_fork_block,
      dao_fork_support,
      eip150_block,
      eip155_block,
      eip158_block,
      byzantium_block,
      constantinople_block,
      petersburg_block,
      istanbul_block,
      muir_glacier_block,
      berlin_block,
      london_block,
      arrow_glacier_block,
      gray_glacier_block,
      merge_netsplit_block,
      chain_id,
      denom,
      decimals,
      shanghai_time,
      cancun_time,
      prague_time,
      verkle_time,
      osaka_time,
    } = this;
    return EvmChainConfigV1_pb.fromPartial({
      homesteadBlock: homestead_block?.toFixed(0) ?? '0',
      daoForkBlock: dao_fork_block?.toFixed(0) ?? '0',
      daoForkSupport: dao_fork_support,
      eip150Block: eip150_block?.toFixed(0) ?? '0',
      eip155Block: eip155_block?.toFixed(0) ?? '0',
      eip158Block: eip158_block?.toFixed(0) ?? '0',
      byzantiumBlock: byzantium_block?.toFixed(0) ?? '0',
      constantinopleBlock: constantinople_block?.toFixed(0) ?? '0',
      petersburgBlock: petersburg_block?.toFixed(0) ?? '0',
      istanbulBlock: istanbul_block?.toFixed(0) ?? '0',
      muirGlacierBlock: muir_glacier_block?.toFixed(0) ?? '0',
      berlinBlock: berlin_block?.toFixed(0) ?? '0',
      londonBlock: london_block?.toFixed(0) ?? '0',
      arrowGlacierBlock: arrow_glacier_block?.toFixed(0) ?? '0',
      grayGlacierBlock: gray_glacier_block?.toFixed(0) ?? '0',
      mergeNetsplitBlock: merge_netsplit_block?.toFixed(0) ?? '0',
      chainId: chain_id?.toFixed(0) ?? '0',
      denom: denom ?? 'axpla',
      decimals: decimals?.toFixed(0) ?? '0',
      shanghaiTime: shanghai_time ?? '',
      cancunTime: cancun_time ?? '',
      pragueTime: prague_time ?? '',
      verkleTime: verkle_time ?? '',
      osakaTime: osaka_time ?? '',
    });
  }
}

export namespace EvmChainConfigV1 {
  export interface Amino {
    homestead_block: string | undefined;
    dao_fork_block: string | undefined;
    dao_fork_support: boolean | undefined;
    eip150_block: string | undefined;
    eip150_hash: string | undefined;
    eip155_block: string | undefined;
    eip158_block: string | undefined;
    byzantium_block: string | undefined;
    constantinople_block: string | undefined;
    petersburg_block: string | undefined;
    istanbul_block: string | undefined;
    muir_glacier_block: string | undefined;
    berlin_block: string | undefined;
    london_block: string | undefined;
    arrow_glacier_block: string | undefined;
    gray_glacier_block: string | undefined;
    merge_netsplit_block: string | undefined;
    shanghai_block: string | undefined;
    cancun_block: string | undefined;
    chain_id: string | undefined;
    denom: string | undefined;
    decimals: string | undefined;
    shanghai_time: string | undefined;
    cancun_time: string | undefined;
    prague_time: string | undefined;
    verkle_time: string | undefined;
    osaka_time: string | undefined;
  }

  export interface DataL {
    '@type': '/ethermint.evm.v1.ChainConfig';
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
    '@type': '/cosmos.evm.vm.v1.ChainConfig';
    homestead_block: string;
    dao_fork_block: string;
    dao_fork_support: boolean;
    eip150_block: string;
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
    chain_id: string;
    denom: string;
    decimals: string;
    shanghai_time: string;
    cancun_time: string;
    prague_time: string;
    verkle_time: string;
    osaka_time: string;
  }

  export type ProtoL = EvmChainConfigV1L_pb;
  export type Proto = EvmChainConfigV1_pb;
}
