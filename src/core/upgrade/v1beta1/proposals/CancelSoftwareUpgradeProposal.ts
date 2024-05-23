/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { CancelSoftwareUpgradeProposal as CancelSoftwareUpgradeProposalV1B1_pb } from '@xpla/xpla.proto/cosmos/upgrade/v1beta1/upgrade';

/**
 *  CancelSoftwareUpgradeProposal is a gov Content type for cancelling a software upgrade
 */
export class CancelSoftwareUpgradeProposalV1B1 extends JSONSerializable<
  CancelSoftwareUpgradeProposalV1B1.Amino,
  CancelSoftwareUpgradeProposalV1B1.Data,
  CancelSoftwareUpgradeProposalV1B1.Proto
> {
  /**
   *
   * @param title
   * @param description
   */
  constructor(public title: string, public description: string) {
    super();
  }

  public static fromAmino(
    data: CancelSoftwareUpgradeProposalV1B1.Amino,
    _isClassic?: boolean
  ): CancelSoftwareUpgradeProposalV1B1 {
    const {
      value: { title, description },
    } = data;
    return new CancelSoftwareUpgradeProposalV1B1(title, description);
  }

  public toAmino(isClassic?: boolean): CancelSoftwareUpgradeProposalV1B1.Amino {
    const { title, description } = this;
    return {
      type: isClassic
        ? 'upgrade/CancelSoftwareUpgradeProposal'
        : 'cosmos-sdk/CancelSoftwareUpgradeProposal',
      value: {
        title,
        description,
      },
    };
  }

  public static fromData(
    data: CancelSoftwareUpgradeProposalV1B1.Data,
    _isClassic?: boolean
  ): CancelSoftwareUpgradeProposalV1B1 {
    const { title, description } = data;
    return new CancelSoftwareUpgradeProposalV1B1(title, description);
  }

  public toData(_isClassic?: boolean): CancelSoftwareUpgradeProposalV1B1.Data {
    const { title, description } = this;
    return {
      '@type': '/cosmos.upgrade.v1beta1.CancelSoftwareUpgradeProposal',
      title,
      description,
    };
  }

  public static fromProto(
    proto: CancelSoftwareUpgradeProposalV1B1.Proto,
    _isClassic?: boolean
  ): CancelSoftwareUpgradeProposalV1B1 {
    return new CancelSoftwareUpgradeProposalV1B1(
      proto.title,
      proto.description
    );
  }

  public toProto(
    _isClassic?: boolean
  ): CancelSoftwareUpgradeProposalV1B1.Proto {
    const { title, description } = this;
    return CancelSoftwareUpgradeProposalV1B1_pb.fromPartial({
      title,
      description,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.upgrade.v1beta1.CancelSoftwareUpgradeProposal',
      value: CancelSoftwareUpgradeProposalV1B1_pb.encode(
        this.toProto(isClassic)
      ).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): CancelSoftwareUpgradeProposalV1B1 {
    return CancelSoftwareUpgradeProposalV1B1.fromProto(
      CancelSoftwareUpgradeProposalV1B1_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace CancelSoftwareUpgradeProposalV1B1 {
  export interface Amino {
    type:
      | 'upgrade/CancelSoftwareUpgradeProposal'
      | 'cosmos-sdk/CancelSoftwareUpgradeProposal';
    value: {
      title: string;
      description: string;
    };
  }

  export interface Data {
    '@type': '/cosmos.upgrade.v1beta1.CancelSoftwareUpgradeProposal';
    title: string;
    description: string;
  }

  export type Proto = CancelSoftwareUpgradeProposalV1B1_pb;
}
