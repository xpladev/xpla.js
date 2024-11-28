/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../util/json';
import { Int, Numeric } from '../../../core/numeric';
import { Duration } from '../../../core/Duration';
import {
  BlockParams as BlockParams_pb,
  EvidenceParams as EvidenceParams_pb,
  ValidatorParams as ValidatorParams_pb,
  VersionParams as VersionParams_pb,
  HashedParams as HashedParams_pb,
  ConsensusParams as ConsensusParams_pb,
  ABCIParams as ABCIParams_pb,
} from '@xpla/xpla.proto/tendermint/types/params';

export class BlockParams extends JSONSerializable<
  BlockParams.Amino,
  BlockParams.Data,
  BlockParams.Proto
> {
  public max_bytes: Int;
  public max_gas: Int;

  /**
   * @param max_bytes Max block size, in bytes. must be greater than 0
   * @param max_gas Max gas per block. must be greater or equal to -1
   */
  constructor(max_bytes: Numeric.Input, max_gas: Numeric.Input) {
    super();
    this.max_bytes = new Int(max_bytes);
    this.max_gas = new Int(max_gas);
  }

  public static fromAmino(data: BlockParams.Amino, _?: boolean): BlockParams {
    const { max_bytes, max_gas } = data;
    return new BlockParams(max_bytes ?? 0, max_gas ?? 0);
  }

  public toAmino(_?: boolean): BlockParams.Amino {
    const { max_bytes, max_gas } = this;

    const res: BlockParams.Amino = {
      max_bytes: max_bytes.toFixed(),
      max_gas: max_gas.toFixed(),
    };

    return res;
  }

  public static fromData(data: BlockParams.Data, _?: boolean): BlockParams {
    const { max_bytes, max_gas } = data;
    return new BlockParams(max_bytes, max_gas);
  }

  public toData(_?: boolean): BlockParams.Data {
    const { max_bytes, max_gas } = this;

    const res: BlockParams.Data = {
      '@type': '/tendermint.types.BlockParams',
      max_bytes: max_bytes.toFixed(),
      max_gas: max_gas.toFixed(),
    };

    return res;
  }

  public static fromProto(proto: BlockParams.Proto, _?: boolean): BlockParams {
    return new BlockParams(proto.maxBytes.toString(), proto.maxGas.toString());
  }

  public toProto(_?: boolean): BlockParams.Proto {
    const { max_bytes, max_gas } = this;
    return BlockParams_pb.fromPartial({
      maxBytes: max_bytes.toFixed(),
      maxGas: max_gas.toFixed(),
    });
  }
}

export namespace BlockParams {
  export interface Amino {
    max_bytes: string | undefined;
    max_gas: string | undefined;
  }

  export interface Data {
    '@type': '/tendermint.types.BlockParams';
    max_bytes: string;
    max_gas: string;
  }

  export type Proto = BlockParams_pb;
}

export class EvidenceParams extends JSONSerializable<
  EvidenceParams.Amino,
  EvidenceParams.Data,
  EvidenceParams.Proto
> {
  public max_age_num_blocks: Int;
  public max_bytes: Int;

  /**
   * @param max_bytes Max block size, in bytes. must be greater than 0
   * @param max_gas Max gas per block. must be greater or equal to -1
   */
  constructor(
    max_age_num_blocks: Numeric.Input,
    public max_age_duration: Duration,
    max_bytes: Numeric.Input
  ) {
    super();
    this.max_age_num_blocks = new Int(max_age_num_blocks);
    this.max_bytes = new Int(max_bytes);
  }

  public static fromAmino(
    data: EvidenceParams.Amino,
    _?: boolean
  ): EvidenceParams {
    const { max_age_num_blocks, max_age_duration, max_bytes } = data;
    return new EvidenceParams(
      max_age_num_blocks ?? 0,
      Duration.fromString(max_age_duration ?? '0s'),
      max_bytes ?? 0
    );
  }

  public toAmino(_?: boolean): EvidenceParams.Amino {
    const { max_age_num_blocks, max_age_duration, max_bytes } = this;
    const res: EvidenceParams.Amino = {
      max_age_num_blocks: max_age_num_blocks.toFixed(),
      max_age_duration: max_age_duration.toAmino(),
      max_bytes: max_bytes.toFixed(),
    };

    return res;
  }

  public static fromData(
    data: EvidenceParams.Data,
    _?: boolean
  ): EvidenceParams {
    const { max_age_num_blocks, max_age_duration, max_bytes } = data;
    return new EvidenceParams(
      max_age_num_blocks,
      max_age_duration
        ? Duration.fromData(max_age_duration)
        : Duration.fromString('0s'),
      max_bytes
    );
  }

  public toData(_?: boolean): EvidenceParams.Data {
    const { max_age_num_blocks, max_age_duration, max_bytes } = this;

    const res: EvidenceParams.Data = {
      '@type': '/tendermint.types.EvidenceParams',
      max_age_num_blocks: max_age_num_blocks.toFixed(),
      max_age_duration: max_age_duration.toData(),
      max_bytes: max_bytes.toFixed(),
    };

    return res;
  }

  public static fromProto(
    proto: EvidenceParams.Proto,
    _?: boolean
  ): EvidenceParams {
    return new EvidenceParams(
      proto.maxAgeNumBlocks.toString(),
      proto.maxAgeDuration
        ? Duration.fromProto(proto.maxAgeDuration)
        : Duration.fromString('0s'),
      proto.maxBytes.toString()
    );
  }

  public toProto(_?: boolean): EvidenceParams.Proto {
    const { max_age_num_blocks, max_age_duration, max_bytes } = this;
    return EvidenceParams_pb.fromPartial({
      maxAgeNumBlocks: max_age_num_blocks.toFixed(),
      maxAgeDuration: max_age_duration.toProto(),
      maxBytes: max_bytes.toFixed(),
    });
  }
}

export namespace EvidenceParams {
  export interface Amino {
    max_age_num_blocks: string | undefined;
    max_age_duration: string | undefined;
    max_bytes: string | undefined;
  }

  export interface Data {
    '@type': '/tendermint.types.EvidenceParams';
    max_age_num_blocks: string;
    max_age_duration: object | undefined;
    max_bytes: string;
  }

  export type Proto = EvidenceParams_pb;
}

export class ValidatorParams extends JSONSerializable<
  ValidatorParams.Amino,
  ValidatorParams.Data,
  ValidatorParams.Proto
> {
  /**
   * @param max_bytes Max block size, in bytes. must be greater than 0
   * @param max_gas Max gas per block. must be greater or equal to -1
   */
  constructor(public pub_key_types: string[]) {
    super();
  }

  public static fromAmino(
    data: ValidatorParams.Amino,
    _?: boolean
  ): ValidatorParams {
    const { pub_key_types } = data;
    return new ValidatorParams(pub_key_types);
  }

  public toAmino(_?: boolean): ValidatorParams.Amino {
    const { pub_key_types } = this;
    const res: ValidatorParams.Amino = {
      pub_key_types,
    };

    return res;
  }

  public static fromData(
    data: ValidatorParams.Data,
    _?: boolean
  ): ValidatorParams {
    const { pub_key_types } = data;
    return new ValidatorParams(pub_key_types);
  }

  public toData(_?: boolean): ValidatorParams.Data {
    const { pub_key_types } = this;
    const res: ValidatorParams.Data = {
      '@type': '/tendermint.types.ValidatorParams',
      pub_key_types,
    };

    return res;
  }

  public static fromProto(
    proto: ValidatorParams.Proto,
    _?: boolean
  ): ValidatorParams {
    return new ValidatorParams(proto.pubKeyTypes);
  }

  public toProto(_?: boolean): ValidatorParams.Proto {
    const { pub_key_types } = this;
    return ValidatorParams_pb.fromPartial({
      pubKeyTypes: pub_key_types,
    });
  }
}

export namespace ValidatorParams {
  export interface Amino {
    pub_key_types: string[];
  }

  export interface Data {
    '@type': '/tendermint.types.ValidatorParams';
    pub_key_types: string[];
  }

  export type Proto = ValidatorParams_pb;
}

export class VersionParams extends JSONSerializable<
  VersionParams.Amino,
  VersionParams.Data,
  VersionParams.Proto
> {
  public app: Int;

  constructor(app: Numeric.Input) {
    super();
    this.app = new Int(app);
  }

  public static fromAmino(
    data: VersionParams.Amino,
    _?: boolean
  ): VersionParams {
    const { app } = data;
    return new VersionParams(app ?? 0);
  }

  public toAmino(_?: boolean): VersionParams.Amino {
    const { app } = this;
    const res: VersionParams.Amino = {
      app: app.toFixed(),
    };

    return res;
  }

  public static fromData(data: VersionParams.Data, _?: boolean): VersionParams {
    const { app } = data;
    return new VersionParams(app);
  }

  public toData(_?: boolean): VersionParams.Data {
    const { app } = this;
    const res: VersionParams.Data = {
      '@type': '/tendermint.types.VersionParams',
      app: app.toFixed(),
    };

    return res;
  }

  public static fromProto(
    proto: VersionParams.Proto,
    _?: boolean
  ): VersionParams {
    return new VersionParams(proto.app.toString());
  }

  public toProto(_?: boolean): VersionParams.Proto {
    const { app } = this;
    return VersionParams_pb.fromPartial({
      app: app.toFixed(),
    });
  }
}

export namespace VersionParams {
  export interface Amino {
    app: string | undefined;
  }

  export interface Data {
    '@type': '/tendermint.types.VersionParams';
    app: string;
  }

  export type Proto = VersionParams_pb;
}

export class HashedParams extends JSONSerializable<
  HashedParams.Amino,
  HashedParams.Data,
  HashedParams.Proto
> {
  public block_max_bytes: Int;
  public block_max_gas: Int;

  constructor(block_max_bytes: Numeric.Input, block_max_gas: Numeric.Input) {
    super();
    this.block_max_bytes = new Int(block_max_bytes);
    this.block_max_gas = new Int(block_max_gas);
  }

  public static fromAmino(data: HashedParams.Amino, _?: boolean): HashedParams {
    const { block_max_bytes, block_max_gas } = data;
    return new HashedParams(block_max_bytes ?? 0, block_max_gas ?? 0);
  }

  public toAmino(_?: boolean): HashedParams.Amino {
    const { block_max_bytes, block_max_gas } = this;
    const res: HashedParams.Amino = {
      block_max_bytes: block_max_bytes.toFixed(),
      block_max_gas: block_max_gas.toFixed(),
    };
    return res;
  }

  public static fromData(data: HashedParams.Data, _?: boolean): HashedParams {
    const { block_max_bytes, block_max_gas } = data;
    return new HashedParams(block_max_bytes, block_max_gas);
  }

  public toData(_?: boolean): HashedParams.Data {
    const { block_max_bytes, block_max_gas } = this;
    const res: HashedParams.Data = {
      '@type': '/tendermint.types.HashedParams',
      block_max_bytes: block_max_bytes.toFixed(),
      block_max_gas: block_max_gas.toFixed(),
    };

    return res;
  }

  public static fromProto(
    proto: HashedParams.Proto,
    _?: boolean
  ): HashedParams {
    return new HashedParams(
      proto.blockMaxBytes.toString(),
      proto.blockMaxGas.toString()
    );
  }

  public toProto(_?: boolean): HashedParams.Proto {
    const { block_max_bytes, block_max_gas } = this;
    return HashedParams_pb.fromPartial({
      blockMaxBytes: block_max_bytes.toFixed(),
      blockMaxGas: block_max_gas.toFixed(),
    });
  }
}

export namespace HashedParams {
  export interface Amino {
    block_max_bytes: string | undefined;
    block_max_gas: string | undefined;
  }

  export interface Data {
    '@type': '/tendermint.types.HashedParams';
    block_max_bytes: string;
    block_max_gas: string;
  }

  export type Proto = HashedParams_pb;
}

export class ABCIParams extends JSONSerializable<
  ABCIParams.Amino,
  ABCIParams.Data,
  ABCIParams.Proto
> {
  public voteExtensionsEnableHeight: Int;

  constructor(voteExtensionsEnableHeight: Numeric.Input) {
    super();
    this.voteExtensionsEnableHeight = new Int(voteExtensionsEnableHeight);
  }

  public static fromAmino(
    data: ABCIParams.Amino,
    _?: boolean
  ): ABCIParams {
    const { vote_extensions_enable_height } = data;
    return new ABCIParams(vote_extensions_enable_height ?? 0);
  }

  public toAmino(_?: boolean): ABCIParams.Amino {
    const { voteExtensionsEnableHeight } = this;
    const res: ABCIParams.Amino = {
      vote_extensions_enable_height: voteExtensionsEnableHeight.toFixed(),
    };

    return res;
  }

  public static fromData(data: ABCIParams.Data, _?: boolean): ABCIParams {
    const { vote_extensions_enable_height } = data;
    return new ABCIParams(vote_extensions_enable_height);
  }

  public toData(_?: boolean): ABCIParams.Data {
    const { voteExtensionsEnableHeight } = this;
    const res: ABCIParams.Data = {
      '@type': '/tendermint.types.ABCIParams',
      vote_extensions_enable_height: voteExtensionsEnableHeight.toFixed(),
    };

    return res;
  }

  public static fromProto(
    proto: ABCIParams.Proto,
    _?: boolean
  ): ABCIParams {
    return new ABCIParams(proto.voteExtensionsEnableHeight.toString());
  }

  public toProto(_?: boolean): ABCIParams.Proto {
    const { voteExtensionsEnableHeight } = this;
    return ABCIParams_pb.fromPartial({
      voteExtensionsEnableHeight: voteExtensionsEnableHeight.toFixed(),
    });
  }
}

export namespace ABCIParams {
  export interface Amino {
    vote_extensions_enable_height: string | undefined;
  }

  export interface Data {
    '@type': '/tendermint.types.ABCIParams';
    vote_extensions_enable_height: string;
  }

  export type Proto = ABCIParams_pb;
}

export class ConsensusParams extends JSONSerializable<
  ConsensusParams.Amino,
  ConsensusParams.Data,
  ConsensusParams.Proto
> {
  constructor(
    public block: BlockParams | undefined,
    public evidence: EvidenceParams | undefined,
    public validator: ValidatorParams | undefined,
    public version: VersionParams | undefined,
    public abci: ABCIParams | undefined
  ) {
    super();
  }

  public static fromAmino(
    data: ConsensusParams.Amino,
    _?: boolean
  ): ConsensusParams {
    const { block, evidence, validator, version, abci } = data;
    return new ConsensusParams(
      block ? BlockParams.fromAmino(block) : undefined,
      evidence ? EvidenceParams.fromAmino(evidence) : undefined,
      validator ? ValidatorParams.fromAmino(validator) : undefined,
      version ? VersionParams.fromAmino(version) : undefined,
      abci ? ABCIParams.fromAmino(abci) : undefined,
    );
  }

  public toAmino(_?: boolean): ConsensusParams.Amino {
    const { block, evidence, validator, version, abci } = this;
    const res: ConsensusParams.Amino = {
      block: block?.toAmino(),
      evidence: evidence?.toAmino(),
      validator: validator?.toAmino(),
      version: version?.toAmino(),
      abci: abci?.toAmino(),
    };
    return res;
  }

  public static fromData(
    data: ConsensusParams.Data,
    _?: boolean
  ): ConsensusParams {
    const { block, evidence, validator, version, abci } = data;
    return new ConsensusParams(
      block ? BlockParams.fromData(block) : undefined,
      evidence ? EvidenceParams.fromData(evidence) : undefined,
      validator ? ValidatorParams.fromData(validator) : undefined,
      version ? VersionParams.fromData(version) : undefined,
      abci ? ABCIParams.fromData(abci) : undefined,
    );
  }

  public toData(_?: boolean): ConsensusParams.Data {
    const { block, evidence, validator, version, abci } = this;
    const res: ConsensusParams.Data = {
      '@type': '/tendermint.types.ConsensusParams',
      block: block?.toData(),
      evidence: evidence?.toData(),
      validator: validator?.toData(),
      version: version?.toData(),
      abci: abci?.toData(),
    };

    return res;
  }

  public static fromProto(
    proto: ConsensusParams.Proto,
    _?: boolean
  ): ConsensusParams {
    return new ConsensusParams(
      proto.block ? BlockParams.fromProto(proto.block) : undefined,
      proto.evidence ? EvidenceParams.fromProto(proto.evidence) : undefined,
      proto.validator ? ValidatorParams.fromProto(proto.validator) : undefined,
      proto.version ? VersionParams.fromProto(proto.version) : undefined,
      proto.abci ? ABCIParams.fromProto(proto.abci) : undefined,
    );
  }

  public toProto(_?: boolean): ConsensusParams.Proto {
    const { block, evidence, validator, version, abci } = this;
    return ConsensusParams_pb.fromPartial({
      block: block?.toProto(),
      evidence: evidence?.toProto(),
      validator: validator?.toProto(),
      version: version?.toProto(),
      abci: abci?.toProto(),
    });
  }
}

export namespace ConsensusParams {
  export interface Amino {
    block: BlockParams.Amino | undefined;
    evidence: EvidenceParams.Amino | undefined;
    validator: ValidatorParams.Amino | undefined;
    version: VersionParams.Amino | undefined;
    abci: ABCIParams.Amino | undefined;
  }

  export interface Data {
    '@type': '/tendermint.types.ConsensusParams';
    block: BlockParams.Data | undefined;
    evidence: EvidenceParams.Data | undefined;
    validator: ValidatorParams.Data | undefined;
    version: VersionParams.Data | undefined;
    abci: ABCIParams.Data | undefined;
  }

  export type Proto = ConsensusParams_pb;
}
