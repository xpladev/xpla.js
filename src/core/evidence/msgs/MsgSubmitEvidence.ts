/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgSubmitEvidence as MsgSubmitEvidence_pb } from '@xpla/xpla.proto/cosmos/evidence/v1beta1/tx';
import { Evidence } from '../evidences';

/**
 * MsgSubmitEvidence represents a message that supports submitting arbitrary
 * Evidence of misbehavior such as equivocation.
 */
export class MsgSubmitEvidence extends JSONSerializable<
  MsgSubmitEvidence.Amino,
  MsgSubmitEvidence.Data,
  MsgSubmitEvidence.Proto
> {
  /**
   * @param submitter signer account address of evidence
   * @param evidence evidence of misbehavior
   */
  constructor(
    public submitter: AccAddress,
    public evidence: Evidence | undefined
  ) {
    super();
  }

  public static fromAmino(
    data: MsgSubmitEvidence.Amino,
    isClassic?: boolean
  ): MsgSubmitEvidence {
    const {
      value: { submitter, evidence },
    } = data;
    return new MsgSubmitEvidence(
      submitter,
      evidence ? Evidence.fromAmino(evidence, isClassic) : undefined
    );
  }

  public toAmino(isClassic?: boolean): MsgSubmitEvidence.Amino {
    const { submitter, evidence } = this;
    return {
      type: isClassic
        ? 'bank/MsgSubmitEvidence'
        : 'cosmos-sdk/MsgSubmitEvidence',
      value: {
        submitter,
        evidence: evidence?.toAmino(isClassic),
      },
    };
  }

  public static fromData(
    data: MsgSubmitEvidence.Data,
    isClassic?: boolean
  ): MsgSubmitEvidence {
    const { submitter, evidence } = data;
    return new MsgSubmitEvidence(
      submitter,
      evidence ? Evidence.fromData(evidence, isClassic) : undefined
    );
  }

  public toData(isClassic?: boolean): MsgSubmitEvidence.Data {
    const { submitter, evidence } = this;
    return {
      '@type': '/cosmos.evidence.v1beta1.MsgSubmitEvidence',
      submitter,
      evidence: evidence?.toData(isClassic),
    };
  }

  public static fromProto(
    proto: MsgSubmitEvidence.Proto,
    isClassic?: boolean
  ): MsgSubmitEvidence {
    return new MsgSubmitEvidence(
      proto.submitter,
      proto.evidence
        ? Evidence.fromProto(proto.evidence as Any, isClassic)
        : undefined
    );
  }

  public toProto(isClassic?: boolean): MsgSubmitEvidence.Proto {
    const { submitter, evidence } = this;
    return MsgSubmitEvidence_pb.fromPartial({
      submitter,
      evidence: evidence?.packAny(isClassic),
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.evidence.v1beta1.MsgSubmitEvidence',
      value: MsgSubmitEvidence_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(msgAny: Any, isClassic?: boolean): MsgSubmitEvidence {
    return MsgSubmitEvidence.fromProto(
      MsgSubmitEvidence_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgSubmitEvidence {
  export interface Amino {
    type: 'cosmos-sdk/MsgSubmitEvidence' | 'bank/MsgSubmitEvidence';
    value: {
      submitter: AccAddress;
      evidence?: Evidence.Amino;
    };
  }

  export interface Data {
    '@type':
      | '/cosmos.evidence.v1beta1.MsgSubmitEvidence'
      | '/cosmos.bank.v1beta1.MsgSubmitEvidence';
    submitter: AccAddress;
    evidence?: Evidence.Data;
  }

  export type Proto = MsgSubmitEvidence_pb;
}
