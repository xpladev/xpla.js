/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { PlanV1B1 } from '../Plan';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { SoftwareUpgradeProposal as SoftwareUpgradeProposalV1B1_pb } from '@xpla/xpla.proto/cosmos/upgrade/v1beta1/upgrade';

/**
 * Softwareupgradeproposal is a gov Content type for initiating a software upgrade.
 */
export class SoftwareUpgradeProposalV1B1 extends JSONSerializable<
  SoftwareUpgradeProposalV1B1.Amino,
  SoftwareUpgradeProposalV1B1.Data,
  SoftwareUpgradeProposalV1B1.Proto
> {
  /**
   *
   * @param title
   * @param description
   * @param plan
   */
  constructor(
    public title: string,
    public description: string,
    public plan?: PlanV1B1
  ) {
    super();
  }

  public static fromAmino(
    data: SoftwareUpgradeProposalV1B1.Amino,
    _isClassic?: boolean
  ): SoftwareUpgradeProposalV1B1 {
    const {
      value: { title, description, plan },
    } = data;
    return new SoftwareUpgradeProposalV1B1(
      title,
      description,
      plan ? PlanV1B1.fromAmino(plan) : undefined
    );
  }

  public toAmino(isClassic?: boolean): SoftwareUpgradeProposalV1B1.Amino {
    const { title, description, plan } = this;
    return {
      type: isClassic
        ? 'upgrade/SoftwareUpgradeProposal'
        : 'cosmos-sdk/SoftwareUpgradeProposal',
      value: {
        title,
        description,
        plan: plan ? plan.toAmino() : undefined,
      },
    };
  }

  public static fromData(
    data: SoftwareUpgradeProposalV1B1.Data,
    _isClassic?: boolean
  ): SoftwareUpgradeProposalV1B1 {
    const { title, description, plan } = data;
    return new SoftwareUpgradeProposalV1B1(
      title,
      description,
      plan ? PlanV1B1.fromData(plan) : undefined
    );
  }

  public toData(_isClassic?: boolean): SoftwareUpgradeProposalV1B1.Data {
    const { title, description, plan } = this;
    return {
      '@type': '/cosmos.upgrade.v1beta1.SoftwareUpgradeProposal',
      title,
      description,
      plan: plan ? plan.toData() : undefined,
    };
  }

  public static fromProto(
    proto: SoftwareUpgradeProposalV1B1.Proto,
    _isClassic?: boolean
  ): SoftwareUpgradeProposalV1B1 {
    return new SoftwareUpgradeProposalV1B1(
      proto.title,
      proto.description,
      proto.plan ? PlanV1B1.fromProto(proto.plan) : undefined
    );
  }

  public toProto(_isClassic?: boolean): SoftwareUpgradeProposalV1B1.Proto {
    const { title, description, plan } = this;
    return SoftwareUpgradeProposalV1B1_pb.fromPartial({
      title,
      description,
      plan: plan ? plan.toProto() : undefined,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.upgrade.v1beta1.SoftwareUpgradeProposal',
      value: SoftwareUpgradeProposalV1B1_pb.encode(
        this.toProto(isClassic)
      ).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): SoftwareUpgradeProposalV1B1 {
    return SoftwareUpgradeProposalV1B1.fromProto(
      SoftwareUpgradeProposalV1B1_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace SoftwareUpgradeProposalV1B1 {
  export interface Amino {
    type:
      | 'upgrade/SoftwareUpgradeProposal'
      | 'cosmos-sdk/SoftwareUpgradeProposal';
    value: {
      title: string;
      description: string;
      plan?: PlanV1B1.Amino;
    };
  }

  export interface Data {
    '@type': '/cosmos.upgrade.v1beta1.SoftwareUpgradeProposal';
    title: string;
    description: string;
    plan?: PlanV1B1.Data;
  }

  export type Proto = SoftwareUpgradeProposalV1B1_pb;
}
