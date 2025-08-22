/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../../../util/json';
import { AccAddress } from '../../../../../bech32';
import { PlanV1B1 } from '../../../../../upgrade/v1beta1'
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgIBCSoftwareUpgrade as MsgIbcSoftwareUpgradeV1_pb } from '@xpla/xpla.proto/ibc/core/client/v1/tx';

export class MsgIbcSoftwareUpgradeV1 extends JSONSerializable<
  any,
  MsgIbcSoftwareUpgradeV1.Data,
  MsgIbcSoftwareUpgradeV1.Proto
> {
  /**
   * @param plan
   * @param upgraded_client_state must be provided to perform an IBC breaking upgrade
   * @param signer is signer address
   */
  constructor(
    public plan: PlanV1B1 | undefined,
    public upgraded_client_state: any | undefined,
    public signer: AccAddress,
  ) {
    super();
  }

  public static fromAmino(_: any, _isClassic?: boolean): MsgIbcSoftwareUpgradeV1 {
    throw new Error('Amino not supported');
  }

  public toAmino(_?: boolean): any {
    throw new Error('Amino not supported');
  }

  public static fromData(
    data: MsgIbcSoftwareUpgradeV1.Data,
    _?: boolean
  ): MsgIbcSoftwareUpgradeV1 {
    const {
      plan,
      upgraded_client_state,
      signer,
    } = data;
    return new MsgIbcSoftwareUpgradeV1(
      plan ? PlanV1B1.fromData(plan) : undefined,
      upgraded_client_state,
      signer,
    );
  }

  public toData(_?: boolean): MsgIbcSoftwareUpgradeV1.Data {
    const {
      plan,
      upgraded_client_state,
      signer,
    } = this;
    return {
      '@type': '/ibc.core.client.v1.MsgIBCSoftwareUpgrade',
      plan: plan ? plan.toData() : undefined,
      upgraded_client_state,
      signer,
    };
  }

  public static fromProto(
    proto: MsgIbcSoftwareUpgradeV1.Proto,
    _?: boolean
  ): MsgIbcSoftwareUpgradeV1 {
    return new MsgIbcSoftwareUpgradeV1(
      proto.plan ? PlanV1B1.fromProto(proto.plan) : undefined,
      proto.upgradedClientState,
      proto.signer,
    );
  }

  public toProto(_?: boolean): MsgIbcSoftwareUpgradeV1.Proto {
    const {
      plan,
      upgraded_client_state,
      signer,
    } = this;
    return MsgIbcSoftwareUpgradeV1_pb.fromPartial({
      plan: plan ? plan.toProto() : undefined,
      upgradedClientState: upgraded_client_state,
      signer: signer,
    });
  }

  public packAny(_?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/ibc.core.client.v1.MsgIBCSoftwareUpgrade',
      value: MsgIbcSoftwareUpgradeV1_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgIbcSoftwareUpgradeV1 {
    return MsgIbcSoftwareUpgradeV1.fromProto(MsgIbcSoftwareUpgradeV1_pb.decode(msgAny.value));
  }
}

export namespace MsgIbcSoftwareUpgradeV1 {
  export interface Data {
    '@type': '/ibc.core.client.v1.MsgIBCSoftwareUpgrade';
    plan?: PlanV1B1.Data;
    upgraded_client_state: any | undefined;
    signer: AccAddress;
  }
  export type Proto = MsgIbcSoftwareUpgradeV1_pb;
}
