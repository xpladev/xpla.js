/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgCancelUpgrade as MsgCancelUpgradeV1B1_pb } from '@xpla/xpla.proto/cosmos/upgrade/v1beta1/tx';

/**
 * Submit a proposal alongside an initial deposit.
 */
export class MsgCancelUpgradeV1B1 extends JSONSerializable<
  MsgCancelUpgradeV1B1.Amino,
  MsgCancelUpgradeV1B1.Data,
  MsgCancelUpgradeV1B1.Proto
> {
  /**
   * @param authority is the address that controls the module
   */
  constructor(public authority: AccAddress) {
    super();
  }

  public static fromAmino(
    data: MsgCancelUpgradeV1B1.Amino,
    _isClassic?: boolean
  ): MsgCancelUpgradeV1B1 {
    const {
      value: { authority },
    } = data;
    return new MsgCancelUpgradeV1B1(authority);
  }

  public toAmino(isClassic?: boolean): MsgCancelUpgradeV1B1.Amino {
    const { authority } = this;
    return {
      type: isClassic
        ? 'upgrade/MsgCancelUpgrade'
        : 'cosmos-sdk/MsgCancelUpgrade',
      value: {
        authority,
      },
    };
  }

  public static fromData(
    data: MsgCancelUpgradeV1B1.Data,
    _isClassic?: boolean
  ): MsgCancelUpgradeV1B1 {
    const { authority } = data;
    return new MsgCancelUpgradeV1B1(authority);
  }

  public toData(_isClassic?: boolean): MsgCancelUpgradeV1B1.Data {
    const { authority } = this;
    return {
      '@type': '/cosmos.upgrade.v1beta1.MsgCancelUpgrade',
      authority,
    };
  }

  public static fromProto(
    proto: MsgCancelUpgradeV1B1.Proto,
    _isClassic?: boolean
  ): MsgCancelUpgradeV1B1 {
    return new MsgCancelUpgradeV1B1(proto.authority);
  }

  public toProto(_isClassic?: boolean): MsgCancelUpgradeV1B1.Proto {
    const { authority } = this;
    return MsgCancelUpgradeV1B1_pb.fromPartial({
      authority,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.upgrade.v1beta1.MsgCancelUpgrade',
      value: MsgCancelUpgradeV1B1_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgCancelUpgradeV1B1 {
    return MsgCancelUpgradeV1B1.fromProto(
      MsgCancelUpgradeV1B1_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgCancelUpgradeV1B1 {
  export interface Amino {
    type: 'upgrade/MsgCancelUpgrade' | 'cosmos-sdk/MsgCancelUpgrade';
    value: {
      authority: AccAddress;
    };
  }

  export interface Data {
    '@type': '/cosmos.upgrade.v1beta1.MsgCancelUpgrade';
    authority: AccAddress;
  }

  export type Proto = MsgCancelUpgradeV1B1_pb;
}
