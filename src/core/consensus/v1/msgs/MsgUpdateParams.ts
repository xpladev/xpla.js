/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgUpdateParams as MsgUpdateConsensusParamsV1B1_pb } from '@xpla/xpla.proto/cosmos/consensus/v1/tx';
import { BlockParams, EvidenceParams, ValidatorParams } from '../Params';

export class MsgUpdateConsensusParamsV1B1 extends JSONSerializable<
  MsgUpdateConsensusParamsV1B1.Amino,
  MsgUpdateConsensusParamsV1B1.Data,
  MsgUpdateConsensusParamsV1B1.Proto
> {
  /**
   * @param authority is the address that controls the module
   */
  constructor(
    public authority: AccAddress,
    public block: BlockParams | undefined,
    public evidence: EvidenceParams | undefined,
    public validator: ValidatorParams | undefined
  ) {
    super();
  }

  public static fromAmino(
    data: MsgUpdateConsensusParamsV1B1.Amino,
    _isClassic?: boolean
  ): MsgUpdateConsensusParamsV1B1 {
    const {
      value: { authority, block, evidence, validator },
    } = data;
    return new MsgUpdateConsensusParamsV1B1(
      authority,
      block ? BlockParams.fromAmino(block) : undefined,
      evidence ? EvidenceParams.fromAmino(evidence) : undefined,
      validator ? ValidatorParams.fromAmino(validator) : undefined
    );
  }

  public toAmino(isClassic?: boolean): MsgUpdateConsensusParamsV1B1.Amino {
    const { authority, block, evidence, validator } = this;
    return {
      type: isClassic
        ? 'consensus/MsgUpdateParams'
        : 'cosmos-sdk/x/consensus/MsgUpdateParams',
      value: {
        authority,
        block: block ? block.toAmino() : undefined,
        evidence: evidence ? evidence.toAmino() : undefined,
        validator: validator ? validator.toAmino() : undefined,
      },
    };
  }

  public static fromData(
    data: MsgUpdateConsensusParamsV1B1.Data,
    _isClassic?: boolean
  ): MsgUpdateConsensusParamsV1B1 {
    const { authority, block, evidence, validator } = data;
    return new MsgUpdateConsensusParamsV1B1(
      authority,
      block ? BlockParams.fromData(block) : undefined,
      evidence ? EvidenceParams.fromData(evidence) : undefined,
      validator ? ValidatorParams.fromData(validator) : undefined
    );
  }

  public toData(_isClassic?: boolean): MsgUpdateConsensusParamsV1B1.Data {
    const { authority, block, evidence, validator } = this;
    return {
      '@type': '/cosmos.consensus.v1.MsgUpdateParams',
      authority,
      block: block ? block.toData() : undefined,
      evidence: evidence ? evidence.toData() : undefined,
      validator: validator ? validator.toData() : undefined,
    };
  }

  public static fromProto(
    proto: MsgUpdateConsensusParamsV1B1.Proto,
    _isClassic?: boolean
  ): MsgUpdateConsensusParamsV1B1 {
    return new MsgUpdateConsensusParamsV1B1(
      proto.authority,
      proto.block ? BlockParams.fromProto(proto.block) : undefined,
      proto.evidence ? EvidenceParams.fromProto(proto.evidence) : undefined,
      proto.validator ? ValidatorParams.fromProto(proto.validator) : undefined
    );
  }

  public toProto(_isClassic?: boolean): MsgUpdateConsensusParamsV1B1.Proto {
    const { authority, block, evidence, validator } = this;
    return MsgUpdateConsensusParamsV1B1_pb.fromPartial({
      authority,
      block: block ? block.toProto() : undefined,
      evidence: evidence ? evidence.toProto() : undefined,
      validator: validator ? validator.toProto() : undefined,
    });
  }

  public packAny(_isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.bank.v1beta1.MsgUpdateParams',
      value: MsgUpdateConsensusParamsV1B1_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    _isClassic?: boolean
  ): MsgUpdateConsensusParamsV1B1 {
    return MsgUpdateConsensusParamsV1B1.fromProto(
      MsgUpdateConsensusParamsV1B1_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgUpdateConsensusParamsV1B1 {
  export interface Amino {
    type:
      | 'consensus/MsgUpdateParams'
      | 'cosmos-sdk/x/consensus/MsgUpdateParams';
    value: {
      authority: AccAddress;
      block: BlockParams.Amino | undefined;
      evidence: EvidenceParams.Amino | undefined;
      validator: ValidatorParams.Amino | undefined;
    };
  }

  export interface Data {
    '@type': '/cosmos.consensus.v1.MsgUpdateParams';
    authority: AccAddress;
    block: BlockParams.Data | undefined;
    evidence: EvidenceParams.Data | undefined;
    validator: ValidatorParams.Data | undefined;
  }

  export type Proto = MsgUpdateConsensusParamsV1B1_pb;
}
