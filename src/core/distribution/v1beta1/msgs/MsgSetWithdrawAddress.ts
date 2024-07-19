/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgSetWithdrawAddress as MsgSetWithdrawAddressV1B1_pb } from '@xpla/xpla.proto/cosmos/distribution/v1beta1/tx';

/**
 * A validator can withdraw their outstanding commission rewards accrued from all
 * delegations (not including its self-delegation) into their associated account's
 * withdraw address.
 */
export class MsgSetWithdrawAddressV1B1 extends JSONSerializable<
  MsgSetWithdrawAddressV1B1.Amino,
  MsgSetWithdrawAddressV1B1.Data,
  MsgSetWithdrawAddressV1B1.Proto
> {
  /**
   * @param delegator_address delegator's account address
   * @param withdraw_address desired new withdraw address
   */
  constructor(
    public delegator_address: AccAddress,
    public withdraw_address: AccAddress
  ) {
    super();
  }

  public static fromAmino(
    data: MsgSetWithdrawAddressV1B1.Amino,
    _isClassic?: boolean
  ): MsgSetWithdrawAddressV1B1 {
    const {
      value: { delegator_address, withdraw_address },
    } = data;
    return new MsgSetWithdrawAddressV1B1(delegator_address, withdraw_address);
  }

  public toAmino(isClassic?: boolean): MsgSetWithdrawAddressV1B1.Amino {
    const { delegator_address, withdraw_address } = this;
    return {
      type: isClassic
        ? 'distribution/MsgModifyWithdrawAddress'
        : 'cosmos-sdk/MsgModifyWithdrawAddress',
      value: {
        delegator_address,
        withdraw_address,
      },
    };
  }

  public static fromData(
    data: MsgSetWithdrawAddressV1B1.Data,
    _isClassic?: boolean
  ): MsgSetWithdrawAddressV1B1 {
    const { delegator_address, withdraw_address } = data;
    return new MsgSetWithdrawAddressV1B1(delegator_address, withdraw_address);
  }

  public toData(_isClassic?: boolean): MsgSetWithdrawAddressV1B1.Data {
    const { delegator_address, withdraw_address } = this;
    return {
      '@type': '/cosmos.distribution.v1beta1.MsgSetWithdrawAddress',
      delegator_address,
      withdraw_address,
    };
  }

  public static fromProto(
    proto: MsgSetWithdrawAddressV1B1.Proto,
    _isClassic?: boolean
  ): MsgSetWithdrawAddressV1B1 {
    return new MsgSetWithdrawAddressV1B1(
      proto.delegatorAddress,
      proto.withdrawAddress
    );
  }

  public toProto(_isClassic?: boolean): MsgSetWithdrawAddressV1B1.Proto {
    const { delegator_address, withdraw_address } = this;
    return MsgSetWithdrawAddressV1B1_pb.fromPartial({
      delegatorAddress: delegator_address,
      withdrawAddress: withdraw_address,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.distribution.v1beta1.MsgSetWithdrawAddress',
      value: MsgSetWithdrawAddressV1B1_pb.encode(
        this.toProto(isClassic)
      ).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgSetWithdrawAddressV1B1 {
    return MsgSetWithdrawAddressV1B1.fromProto(
      MsgSetWithdrawAddressV1B1_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgSetWithdrawAddressV1B1 {
  export interface Amino {
    type:
      | 'distribution/MsgModifyWithdrawAddress'
      | 'cosmos-sdk/MsgModifyWithdrawAddress';
    value: {
      delegator_address: AccAddress;
      withdraw_address: AccAddress;
    };
  }

  export interface Data {
    '@type': '/cosmos.distribution.v1beta1.MsgSetWithdrawAddress';
    delegator_address: AccAddress;
    withdraw_address: AccAddress;
  }

  export type Proto = MsgSetWithdrawAddressV1B1_pb;
}
