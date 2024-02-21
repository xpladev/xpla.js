/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgSetWithdrawAddress as MsgSetWithdrawAddress_pb } from '@xpla/xpla.proto/cosmos/distribution/v1beta1/tx';

/**
 * A validator can withdraw their outstanding commission rewards accrued from all
 * delegations (not including its self-delegation) into their associated account's
 * withdraw address.
 */
export class MsgSetWithdrawAddress extends JSONSerializable<
  MsgSetWithdrawAddress.Amino,
  MsgSetWithdrawAddress.Data,
  MsgSetWithdrawAddress.Proto
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
    data: MsgSetWithdrawAddress.Amino,
    _isClassic?: boolean
  ): MsgSetWithdrawAddress {
    const {
      value: { delegator_address, withdraw_address },
    } = data;
    return new MsgSetWithdrawAddress(delegator_address, withdraw_address);
  }

  public toAmino(isClassic?: boolean): MsgSetWithdrawAddress.Amino {
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
    data: MsgSetWithdrawAddress.Data,
    _isClassic?: boolean
  ): MsgSetWithdrawAddress {
    const { delegator_address, withdraw_address } = data;
    return new MsgSetWithdrawAddress(delegator_address, withdraw_address);
  }

  public toData(_isClassic?: boolean): MsgSetWithdrawAddress.Data {
    const { delegator_address, withdraw_address } = this;
    return {
      '@type': '/cosmos.distribution.v1beta1.MsgSetWithdrawAddress',
      delegator_address,
      withdraw_address,
    };
  }

  public static fromProto(
    proto: MsgSetWithdrawAddress.Proto,
    _isClassic?: boolean
  ): MsgSetWithdrawAddress {
    return new MsgSetWithdrawAddress(
      proto.delegatorAddress,
      proto.withdrawAddress
    );
  }

  public toProto(_isClassic?: boolean): MsgSetWithdrawAddress.Proto {
    const { delegator_address, withdraw_address } = this;
    return MsgSetWithdrawAddress_pb.fromPartial({
      delegatorAddress: delegator_address,
      withdrawAddress: withdraw_address,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.distribution.v1beta1.MsgSetWithdrawAddress',
      value: MsgSetWithdrawAddress_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgSetWithdrawAddress {
    return MsgSetWithdrawAddress.fromProto(
      MsgSetWithdrawAddress_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgSetWithdrawAddress {
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

  export type Proto = MsgSetWithdrawAddress_pb;
}
