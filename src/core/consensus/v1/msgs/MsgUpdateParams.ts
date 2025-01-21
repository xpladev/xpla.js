/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgUpdateParams as MsgUpdateConsensusParamsV1_pb } from '@xpla/xpla.proto/cosmos/consensus/v1/tx';
import { BlockParams, EvidenceParams, ValidatorParams, ABCIParams } from '../Params';

export class MsgUpdateConsensusParamsV1 extends JSONSerializable<
  MsgUpdateConsensusParamsV1.Amino,
  MsgUpdateConsensusParamsV1.Data,
  MsgUpdateConsensusParamsV1.Proto
> {
  /**
   * @param authority is the address that controls the module
   */
  constructor(
    public authority: AccAddress,
    public block: BlockParams | undefined,
    public evidence: EvidenceParams | undefined,
    public validator: ValidatorParams | undefined,
    public abci: ABCIParams | undefined,
  ) {
    super();
  }

  public static fromAmino(
    data: MsgUpdateConsensusParamsV1.Amino,
    _isClassic?: boolean
  ): MsgUpdateConsensusParamsV1 {
    const {
      value: { authority, block, evidence, validator, abci },
    } = data;
    return new MsgUpdateConsensusParamsV1(
      authority,
      block ? BlockParams.fromAmino(block) : undefined,
      evidence ? EvidenceParams.fromAmino(evidence) : undefined,
      validator ? ValidatorParams.fromAmino(validator) : undefined,
      abci ? ABCIParams.fromAmino(abci) : undefined,
    );
  }

  public toAmino(isClassic?: boolean): MsgUpdateConsensusParamsV1.Amino {
    const { authority, block, evidence, validator, abci } = this;
    return {
      type: isClassic
        ? 'consensus/MsgUpdateParams'
        : 'cosmos-sdk/x/consensus/MsgUpdateParams',
      value: {
        authority,
        block: block ? block.toAmino() : undefined,
        evidence: evidence ? evidence.toAmino() : undefined,
        validator: validator ? validator.toAmino() : undefined,
        abci: abci ? abci.toAmino() : undefined,
      },
    };
  }

  public static fromData(
    data: MsgUpdateConsensusParamsV1.Data,
    _isClassic?: boolean
  ): MsgUpdateConsensusParamsV1 {
    const { authority, block, evidence, validator, abci } = data;
    return new MsgUpdateConsensusParamsV1(
      authority,
      block ? BlockParams.fromData(block) : undefined,
      evidence ? EvidenceParams.fromData(evidence) : undefined,
      validator ? ValidatorParams.fromData(validator) : undefined,
      abci ? ABCIParams.fromData(abci) : undefined,
    );
  }

  public toData(_isClassic?: boolean): MsgUpdateConsensusParamsV1.Data {
    const { authority, block, evidence, validator, abci } = this;
    return {
      '@type': '/cosmos.consensus.v1.MsgUpdateParams',
      authority,
      block: block ? block.toData() : undefined,
      evidence: evidence ? evidence.toData() : undefined,
      validator: validator ? validator.toData() : undefined,
      abci: abci ? abci.toData() : undefined,
    };
  }

  public static fromProto(
    proto: MsgUpdateConsensusParamsV1.Proto,
    _isClassic?: boolean
  ): MsgUpdateConsensusParamsV1 {
    return new MsgUpdateConsensusParamsV1(
      proto.authority,
      proto.block ? BlockParams.fromProto(proto.block) : undefined,
      proto.evidence ? EvidenceParams.fromProto(proto.evidence) : undefined,
      proto.validator ? ValidatorParams.fromProto(proto.validator) : undefined,
      proto.abci ? ABCIParams.fromProto(proto.abci) : undefined,
    );
  }

  public toProto(_isClassic?: boolean): MsgUpdateConsensusParamsV1.Proto {
    const { authority, block, evidence, validator, abci } = this;
    return MsgUpdateConsensusParamsV1_pb.fromPartial({
      authority,
      block: block ? block.toProto() : undefined,
      evidence: evidence ? evidence.toProto() : undefined,
      validator: validator ? validator.toProto() : undefined,
      abci: abci ? abci.toProto() : undefined,
    });
  }

  public packAny(_isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.consensus.v1.MsgUpdateParams',
      value: MsgUpdateConsensusParamsV1_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    _isClassic?: boolean
  ): MsgUpdateConsensusParamsV1 {
    return MsgUpdateConsensusParamsV1.fromProto(
      MsgUpdateConsensusParamsV1_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgUpdateConsensusParamsV1 {
  export interface Amino {
    type:
      | 'consensus/MsgUpdateParams'
      | 'cosmos-sdk/x/consensus/MsgUpdateParams';
    value: {
      authority: AccAddress;
      block: BlockParams.Amino | undefined;
      evidence: EvidenceParams.Amino | undefined;
      validator: ValidatorParams.Amino | undefined;
      abci: ABCIParams.Amino | undefined;
    };
  }

  export interface Data {
    '@type': '/cosmos.consensus.v1.MsgUpdateParams';
    authority: AccAddress;
    block: BlockParams.Data | undefined;
    evidence: EvidenceParams.Data | undefined;
    validator: ValidatorParams.Data | undefined;
    abci: ABCIParams.Data | undefined;
  }

  export type Proto = MsgUpdateConsensusParamsV1_pb;
}
