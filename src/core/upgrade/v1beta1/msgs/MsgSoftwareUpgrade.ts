/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { PlanV1B1 } from '../Plan';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgSoftwareUpgrade as MsgSoftwareUpgradeV1B1_pb } from '@xpla/xpla.proto/cosmos/upgrade/v1beta1/tx';

export class MsgSoftwareUpgradeV1B1 extends JSONSerializable<
  MsgSoftwareUpgradeV1B1.Amino,
  MsgSoftwareUpgradeV1B1.Data,
  MsgSoftwareUpgradeV1B1.Proto
> {
  /**
   * @param authority is the address that controls the module
   * @param plan is the upgrade plan
   */
  constructor(public authority: AccAddress, public plan: PlanV1B1 | undefined) {
    super();
  }

  public static fromAmino(
    data: MsgSoftwareUpgradeV1B1.Amino,
    _isClassic?: boolean
  ): MsgSoftwareUpgradeV1B1 {
    const {
      value: { authority, plan },
    } = data;
    return new MsgSoftwareUpgradeV1B1(
      authority,
      plan ? PlanV1B1.fromAmino(plan) : undefined
    );
  }

  public toAmino(isClassic?: boolean): MsgSoftwareUpgradeV1B1.Amino {
    const { authority, plan } = this;
    return {
      type: isClassic
        ? 'upgrade/MsgSoftwareUpgrade'
        : 'cosmos-sdk/MsgSoftwareUpgrade',
      value: {
        authority,
        plan: plan ? plan.toAmino() : undefined,
      },
    };
  }

  public static fromData(
    data: MsgSoftwareUpgradeV1B1.Data,
    _isClassic?: boolean
  ): MsgSoftwareUpgradeV1B1 {
    const { authority, plan } = data;
    return new MsgSoftwareUpgradeV1B1(
      authority,
      plan ? PlanV1B1.fromData(plan) : undefined
    );
  }

  public toData(_isClassic?: boolean): MsgSoftwareUpgradeV1B1.Data {
    const { authority, plan } = this;
    return {
      '@type': '/cosmos.upgrade.v1beta1.MsgSoftwareUpgrade',
      authority,
      plan: plan ? plan.toData() : undefined,
    };
  }

  public static fromProto(
    proto: MsgSoftwareUpgradeV1B1.Proto,
    _isClassic?: boolean
  ): MsgSoftwareUpgradeV1B1 {
    return new MsgSoftwareUpgradeV1B1(
      proto.authority,
      proto.plan ? PlanV1B1.fromProto(proto.plan) : undefined
    );
  }

  public toProto(_isClassic?: boolean): MsgSoftwareUpgradeV1B1.Proto {
    const { authority, plan } = this;
    return MsgSoftwareUpgradeV1B1_pb.fromPartial({
      authority,
      plan,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.upgrade.v1beta1.MsgSoftwareUpgrade',
      value: MsgSoftwareUpgradeV1B1_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgSoftwareUpgradeV1B1 {
    return MsgSoftwareUpgradeV1B1.fromProto(
      MsgSoftwareUpgradeV1B1_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgSoftwareUpgradeV1B1 {
  export interface Amino {
    type: 'upgrade/MsgSoftwareUpgrade' | 'cosmos-sdk/MsgSoftwareUpgrade';
    value: {
      authority: AccAddress;
      plan: PlanV1B1.Amino | undefined;
    };
  }

  export interface Data {
    '@type': '/cosmos.upgrade.v1beta1.MsgSoftwareUpgrade';
    authority: AccAddress;
    plan: PlanV1B1.Data | undefined;
  }

  export type Proto = MsgSoftwareUpgradeV1B1_pb;
}
