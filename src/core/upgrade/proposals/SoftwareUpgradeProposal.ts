/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../util/json';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { SoftwareUpgradeProposal as SoftwareUpgradeProposal_pb } from '@xpla/xpla.proto/cosmos/upgrade/v1beta1/upgrade';
import { Plan } from '../Plan';

/**
 * Softwareupgradeproposal is a gov Content type for initiating a software upgrade.
 */
export class SoftwareUpgradeProposal extends JSONSerializable<
  SoftwareUpgradeProposal.Amino,
  SoftwareUpgradeProposal.Data,
  SoftwareUpgradeProposal.Proto
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
    public plan?: Plan
  ) {
    super();
  }

  public static fromAmino(
    data: SoftwareUpgradeProposal.Amino,
    _isClassic?: boolean
  ): SoftwareUpgradeProposal {
    const {
      value: { title, description, plan },
    } = data;
    return new SoftwareUpgradeProposal(
      title,
      description,
      plan ? Plan.fromAmino(plan) : undefined
    );
  }

  public toAmino(isClassic?: boolean): SoftwareUpgradeProposal.Amino {
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
    data: SoftwareUpgradeProposal.Data,
    _isClassic?: boolean
  ): SoftwareUpgradeProposal {
    const { title, description, plan } = data;
    return new SoftwareUpgradeProposal(
      title,
      description,
      plan ? Plan.fromData(plan) : undefined
    );
  }

  public toData(_isClassic?: boolean): SoftwareUpgradeProposal.Data {
    const { title, description, plan } = this;
    return {
      '@type': '/cosmos.upgrade.v1beta1.SoftwareUpgradeProposal',
      title,
      description,
      plan: plan ? plan.toData() : undefined,
    };
  }

  public static fromProto(
    proto: SoftwareUpgradeProposal.Proto,
    _isClassic?: boolean
  ): SoftwareUpgradeProposal {
    return new SoftwareUpgradeProposal(
      proto.title,
      proto.description,
      proto.plan ? Plan.fromProto(proto.plan) : undefined
    );
  }

  public toProto(_isClassic?: boolean): SoftwareUpgradeProposal.Proto {
    const { title, description, plan } = this;
    return SoftwareUpgradeProposal_pb.fromPartial({
      title,
      description,
      plan: plan ? plan.toProto() : undefined,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.upgrade.v1beta1.SoftwareUpgradeProposal',
      value: SoftwareUpgradeProposal_pb.encode(
        this.toProto(isClassic)
      ).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): SoftwareUpgradeProposal {
    return SoftwareUpgradeProposal.fromProto(
      SoftwareUpgradeProposal_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace SoftwareUpgradeProposal {
  export interface Amino {
    type:
      | 'upgrade/SoftwareUpgradeProposal'
      | 'cosmos-sdk/SoftwareUpgradeProposal';
    value: {
      title: string;
      description: string;
      plan?: Plan.Amino;
    };
  }

  export interface Data {
    '@type': '/cosmos.upgrade.v1beta1.SoftwareUpgradeProposal';
    title: string;
    description: string;
    plan?: Plan.Data;
  }

  export type Proto = SoftwareUpgradeProposal_pb;
}
