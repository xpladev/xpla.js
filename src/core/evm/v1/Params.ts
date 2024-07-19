/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../util/json';
import { Int, Numeric } from '../../../core/numeric';
import { Denom } from '../../../core';
import {
  ChainConfig as EvmChainConfigV1_pb,
  Params as EvmParamsV1_pb,
} from '@xpla/xpla.proto/ethermint/evm/v1/evm';

export class EvmParamsV1 extends JSONSerializable<
  EvmParamsV1.Amino,
  EvmParamsV1.Data,
  EvmParamsV1.Proto
> {
  public extra_eips: Int[];

  /**
   * @param evm_denom represents the token denomination used to run the EVM state transitions
   * @param enable_create toggles state transitions that use the vm.Create function
   * @param enable_call toggles state transitions that use the vm.Call function
   * @param extra_eips defines the additional EIPs for the vm.Config
   * @param chain_config defines the EVM chain configuration parameters
   * @param allow_unprotected_txs defines if replay-protected (i.e non EIP155 signed) transactions can be executed on the state machine
   */
  constructor(
    public evm_denom: Denom,
    public enable_create: boolean,
    public enable_call: boolean,
    extra_eips: Numeric.Input[],
    public chain_config: EvmChainConfigV1 | undefined,
    public allow_unprotected_txs: boolean
  ) {
    super();
    this.extra_eips = extra_eips.map(eip => new Int(eip));
  }

  public static fromAmino(data: EvmParamsV1.Amino, _?: boolean): EvmParamsV1 {
    const {
      evm_denom,
      enable_create,
      enable_call,
      extra_eips,
      chain_config,
      allow_unprotected_txs,
    } = data;
    return new EvmParamsV1(
      evm_denom ?? '',
      enable_create ?? false,
      enable_call ?? false,
      extra_eips ?? [],
      chain_config ? EvmChainConfigV1.fromAmino(chain_config) : undefined,
      allow_unprotected_txs ?? false
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
    } = this;

    const res: EvmParamsV1.Amino = {
      evm_denom,
      enable_create,
      enable_call,
      extra_eips: extra_eips.map(eip => eip.toFixed()),
      chain_config: chain_config?.toAmino(),
      allow_unprotected_txs,
    };

    return res;
  }

  public static fromData(data: EvmParamsV1.Data, _?: boolean): EvmParamsV1 {
    const {
      evm_denom,
      enable_create,
      enable_call,
      extra_eips,
      chain_config,
      allow_unprotected_txs,
    } = data;
    return new EvmParamsV1(
      evm_denom,
      enable_create,
      enable_call,
      extra_eips,
      chain_config ? EvmChainConfigV1.fromData(chain_config) : undefined,
      allow_unprotected_txs
    );
  }

  public toData(_?: boolean): EvmParamsV1.Data {
    const {
      evm_denom,
      enable_create,
      enable_call,
      extra_eips,
      chain_config,
      allow_unprotected_txs,
    } = this;

    const res: EvmParamsV1.Data = {
      '@type': '/ethermint.evm.v1.Params',
      evm_denom,
      enable_create,
      enable_call,
      extra_eips: extra_eips.map(eip => eip.toFixed()),
      chain_config: chain_config?.toData(),
      allow_unprotected_txs,
    };

    return res;
  }

  public static fromProto(proto: EvmParamsV1.Proto, _?: boolean): EvmParamsV1 {
    return new EvmParamsV1(
      proto.evmDenom,
      proto.enableCreate,
      proto.enableCall,
      proto.extraEips.map(eip => new Int(eip.toString())),
      proto.chainConfig
        ? EvmChainConfigV1.fromProto(proto.chainConfig)
        : undefined,
      proto.allowUnprotectedTxs
    );
  }

  public toProto(_?: boolean): EvmParamsV1.Proto {
    const {
      evm_denom,
      enable_create,
      enable_call,
      extra_eips,
      chain_config,
      allow_unprotected_txs,
    } = this;
    return EvmParamsV1_pb.fromPartial({
      evmDenom: evm_denom,
      enableCreate: enable_create,
      enableCall: enable_call,
      extraEips: extra_eips.map(eip => eip.toFixed()),
      chainConfig: chain_config?.toProto(),
      allowUnprotectedTxs: allow_unprotected_txs,
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
  }

  export interface Data {
    '@type': '/ethermint.evm.v1.Params';
    evm_denom: string;
    enable_create: boolean;
    enable_call: boolean;
    extra_eips: string[];
    chain_config: EvmChainConfigV1.Data | undefined;
    allow_unprotected_txs: boolean;
  }

  export type Proto = EvmParamsV1_pb;
}

export class EvmChainConfigV1 extends JSONSerializable<
  EvmChainConfigV1.Amino,
  EvmChainConfigV1.Data,
  EvmChainConfigV1.Proto
> {
  public homestead_block: Int;
  public dao_fork_block: Int;
  public eip150_block: Int;
  public eip155_block: Int;
  public eip158_block: Int;
  public byzantium_block: Int;
  public constantinople_block: Int;
  public petersburg_block: Int;
  public istanbul_block: Int;
  public muir_glacier_block: Int;
  public berlin_block: Int;
  public london_block: Int;
  public arrow_glacier_block: Int;
  public gray_glacier_block: Int;
  public merge_netsplit_block: Int;
  public shanghai_block: Int;
  public cancun_block: Int;

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
    homestead_block: Numeric.Input,
    dao_fork_block: Numeric.Input,
    public dao_fork_support: boolean,
    eip150_block: Numeric.Input,
    public eip150_hash: string,
    eip155_block: Numeric.Input,
    eip158_block: Numeric.Input,
    byzantium_block: Numeric.Input,
    constantinople_block: Numeric.Input,
    petersburg_block: Numeric.Input,
    istanbul_block: Numeric.Input,
    muir_glacier_block: Numeric.Input,
    berlin_block: Numeric.Input,
    london_block: Numeric.Input,
    arrow_glacier_block: Numeric.Input,
    gray_glacier_block: Numeric.Input,
    merge_netsplit_block: Numeric.Input,
    shanghai_block: Numeric.Input,
    cancun_block: Numeric.Input
  ) {
    super();
    this.homestead_block = new Int(homestead_block);
    this.dao_fork_block = new Int(dao_fork_block);
    this.eip150_block = new Int(eip150_block);
    this.eip155_block = new Int(eip155_block);
    this.eip158_block = new Int(eip158_block);
    this.byzantium_block = new Int(byzantium_block);
    this.constantinople_block = new Int(constantinople_block);
    this.petersburg_block = new Int(petersburg_block);
    this.istanbul_block = new Int(istanbul_block);
    this.muir_glacier_block = new Int(muir_glacier_block);
    this.berlin_block = new Int(berlin_block);
    this.london_block = new Int(london_block);
    this.arrow_glacier_block = new Int(arrow_glacier_block);
    this.gray_glacier_block = new Int(gray_glacier_block);
    this.merge_netsplit_block = new Int(merge_netsplit_block);
    this.shanghai_block = new Int(shanghai_block);
    this.cancun_block = new Int(cancun_block);
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
    } = data;
    return new EvmChainConfigV1(
      homestead_block ?? 0,
      dao_fork_block ?? 0,
      dao_fork_support ?? true,
      eip150_block ?? 0,
      eip150_hash ??
        '0x0000000000000000000000000000000000000000000000000000000000000000',
      eip155_block ?? 0,
      eip158_block ?? 0,
      byzantium_block ?? 0,
      constantinople_block ?? 0,
      petersburg_block ?? 0,
      istanbul_block ?? 0,
      muir_glacier_block ?? 0,
      berlin_block ?? 0,
      london_block ?? 0,
      arrow_glacier_block ?? 0,
      gray_glacier_block ?? 0,
      merge_netsplit_block ?? 0,
      shanghai_block ?? 0,
      cancun_block ?? 0
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
    } = this;

    const res: EvmChainConfigV1.Amino = {
      homestead_block: homestead_block.toFixed(),
      dao_fork_block: dao_fork_block.toFixed(),
      dao_fork_support,
      eip150_block: eip150_block.toFixed(),
      eip150_hash,
      eip155_block: eip155_block.toFixed(),
      eip158_block: eip158_block.toFixed(),
      byzantium_block: byzantium_block.toFixed(),
      constantinople_block: constantinople_block.toFixed(),
      petersburg_block: petersburg_block.toFixed(),
      istanbul_block: istanbul_block.toFixed(),
      muir_glacier_block: muir_glacier_block.toFixed(),
      berlin_block: berlin_block.toFixed(),
      london_block: london_block.toFixed(),
      arrow_glacier_block: arrow_glacier_block.toFixed(),
      gray_glacier_block: gray_glacier_block.toFixed(),
      merge_netsplit_block: merge_netsplit_block.toFixed(),
      shanghai_block: shanghai_block.toFixed(),
      cancun_block: cancun_block.toFixed(),
    };

    return res;
  }

  public static fromData(
    data: EvmChainConfigV1.Data,
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
      cancun_block
    );
  }

  public toData(_?: boolean): EvmChainConfigV1.Data {
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
    } = this;

    const res: EvmChainConfigV1.Data = {
      '@type': '/ethermint.evm.v1.Params',
      homestead_block: homestead_block.toFixed(),
      dao_fork_block: dao_fork_block.toFixed(),
      dao_fork_support,
      eip150_block: eip150_block.toFixed(),
      eip150_hash,
      eip155_block: eip155_block.toFixed(),
      eip158_block: eip158_block.toFixed(),
      byzantium_block: byzantium_block.toFixed(),
      constantinople_block: constantinople_block.toFixed(),
      petersburg_block: petersburg_block.toFixed(),
      istanbul_block: istanbul_block.toFixed(),
      muir_glacier_block: muir_glacier_block.toFixed(),
      berlin_block: berlin_block.toFixed(),
      london_block: london_block.toFixed(),
      arrow_glacier_block: arrow_glacier_block.toFixed(),
      gray_glacier_block: gray_glacier_block.toFixed(),
      merge_netsplit_block: merge_netsplit_block.toFixed(),
      shanghai_block: shanghai_block.toFixed(),
      cancun_block: cancun_block.toFixed(),
    };

    return res;
  }

  public static fromProto(
    proto: EvmChainConfigV1.Proto,
    _?: boolean
  ): EvmChainConfigV1 {
    return new EvmChainConfigV1(
      proto.homesteadBlock,
      proto.daoForkBlock,
      proto.daoForkSupport,
      proto.eip150Block,
      proto.eip150Hash,
      proto.eip155Block,
      proto.eip158Block,
      proto.byzantiumBlock,
      proto.constantinopleBlock,
      proto.petersburgBlock,
      proto.istanbulBlock,
      proto.muirGlacierBlock,
      proto.berlinBlock,
      proto.londonBlock,
      proto.arrowGlacierBlock,
      proto.grayGlacierBlock,
      proto.mergeNetsplitBlock,
      proto.shanghaiBlock,
      proto.cancunBlock
    );
  }

  public toProto(_?: boolean): EvmChainConfigV1.Proto {
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
    } = this;
    return EvmChainConfigV1_pb.fromPartial({
      homesteadBlock: homestead_block.toFixed(),
      daoForkBlock: dao_fork_block.toFixed(),
      daoForkSupport: dao_fork_support,
      eip150Block: eip150_block.toFixed(),
      eip150Hash: eip150_hash,
      eip155Block: eip155_block.toFixed(),
      eip158Block: eip158_block.toFixed(),
      byzantiumBlock: byzantium_block.toFixed(),
      constantinopleBlock: constantinople_block.toFixed(),
      petersburgBlock: petersburg_block.toFixed(),
      istanbulBlock: istanbul_block.toFixed(),
      muirGlacierBlock: muir_glacier_block.toFixed(),
      berlinBlock: berlin_block.toFixed(),
      londonBlock: london_block.toFixed(),
      arrowGlacierBlock: arrow_glacier_block.toFixed(),
      grayGlacierBlock: gray_glacier_block.toFixed(),
      mergeNetsplitBlock: merge_netsplit_block.toFixed(),
      shanghaiBlock: shanghai_block.toFixed(),
      cancunBlock: cancun_block.toFixed(),
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
  }

  export interface Data {
    '@type': '/ethermint.evm.v1.Params';
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

  export type Proto = EvmChainConfigV1_pb;
}
