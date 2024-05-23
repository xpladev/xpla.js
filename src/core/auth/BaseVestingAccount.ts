/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../util/json';
import { Coins } from '../Coins';
import { BaseAccount } from './BaseAccount';
import { PublicKey } from '../PublicKey';
import { BaseAccount as BaseAccount_pb } from '@xpla/xpla.proto/cosmos/auth/v1beta1/auth';
import { BaseVestingAccount as BaseVestingAccount_pb } from '@xpla/xpla.proto/cosmos/vesting/v1beta1/vesting';

/**
 * Holds information about a Account which has vesting information.
 */
export class BaseVestingAccount extends JSONSerializable<
  BaseVestingAccount.Amino,
  BaseVestingAccount.Data,
  BaseVestingAccount.Proto
> {
  /**
   *
   * @param base_account account information
   * @param original_vesting initial vesting amount
   * @param delegated_free
   * @param delegated_vesting
   * @param end_time
   */
  constructor(
    public base_account: BaseAccount,
    public original_vesting: Coins,
    public delegated_free: Coins,
    public delegated_vesting: Coins,
    public end_time: number
  ) {
    super();
  }

  public getAccountNumber(): number {
    return this.base_account.account_number;
  }

  public getSequenceNumber(): number {
    return this.base_account.sequence;
  }

  public getPublicKey(): PublicKey | null {
    return this.base_account.public_key;
  }

  public toAmino(isClassic?: boolean): BaseVestingAccount.Amino {
    const {
      base_account,
      original_vesting,
      delegated_free,
      delegated_vesting,
      end_time,
    } = this;

    return {
      type: isClassic
        ? 'core/BaseVestingAccount'
        : 'cosmos-sdk/BaseVestingAccount',
      value: {
        base_account: base_account.toAmino().value,
        delegated_free: delegated_free.toAmino(),
        delegated_vesting: delegated_vesting.toAmino(),
        end_time: end_time.toFixed(),
        original_vesting: original_vesting.toAmino(),
      },
    };
  }

  public static fromAmino(
    amino: BaseVestingAccount.Amino,
    isClassic?: boolean
  ): BaseVestingAccount {
    const base_account = BaseAccount.fromAmino({
      type: isClassic ? 'core/Account' : 'cosmos-sdk/BaseAccount',
      value: amino.value.base_account,
    });

    return new BaseVestingAccount(
      base_account,
      Coins.fromAmino(amino.value.original_vesting),
      Coins.fromAmino(amino.value.delegated_free),
      Coins.fromAmino(amino.value.delegated_vesting),
      Number.parseInt(amino.value.end_time)
    );
  }

  public toData(_isClassic?: boolean): BaseVestingAccount.Data {
    const {
      base_account,
      original_vesting,
      delegated_free,
      delegated_vesting,
      end_time,
    } = this;

    return {
      '@type': '/cosmos.vesting.v1beta1.BaseVestingAccount',
      base_account: base_account.toData(),
      delegated_free: delegated_free.toData(),
      delegated_vesting: delegated_vesting.toData(),
      end_time: end_time.toFixed(),
      original_vesting: original_vesting.toData(),
    };
  }

  public static fromData(
    data: BaseVestingAccount.Data,
    _isClassic?: boolean
  ): BaseVestingAccount {
    const base_account = BaseAccount.fromData({
      '@type': '/cosmos.auth.v1beta1.BaseAccount',
      ...data.base_account,
    });

    return new BaseVestingAccount(
      base_account,
      Coins.fromData(data.original_vesting),
      Coins.fromData(data.delegated_free),
      Coins.fromData(data.delegated_vesting),
      Number.parseInt(data.end_time)
    );
  }

  public toProto(_isClassic?: boolean): BaseVestingAccount.Proto {
    const {
      base_account,
      original_vesting,
      delegated_free,
      delegated_vesting,
      end_time,
    } = this;

    return BaseVestingAccount_pb.fromPartial({
      baseAccount: base_account.toProto(),
      delegatedFree: delegated_free.toProto(),
      delegatedVesting: delegated_vesting.toProto(),
      endTime: end_time,
      originalVesting: original_vesting.toProto(),
    });
  }

  public static fromProto(
    proto: BaseVestingAccount.Proto,
    _isClassic?: boolean
  ): BaseVestingAccount {
    const baseAccount = BaseAccount.fromProto(
      proto.baseAccount as BaseAccount_pb
    );

    return new BaseVestingAccount(
      baseAccount,
      Coins.fromProto(proto.originalVesting),
      Coins.fromProto(proto.delegatedFree),
      Coins.fromProto(proto.delegatedVesting),
      proto.endTime.toNumber()
    );
  }
}

export namespace BaseVestingAccount {
  export interface AminoValue {
    base_account: BaseAccount.AminoValue;
    original_vesting: Coins.Amino;
    delegated_free: Coins.Amino;
    delegated_vesting: Coins.Amino;
    end_time: string;
  }

  export interface Amino {
    type: 'core/BaseVestingAccount' | 'cosmos-sdk/BaseVestingAccount';
    value: AminoValue;
  }

  export interface DataValue {
    base_account: BaseAccount.DataValue;
    original_vesting: Coins.Amino;
    delegated_free: Coins.Amino;
    delegated_vesting: Coins.Amino;
    end_time: string;
  }

  export interface Data extends DataValue {
    '@type': '/cosmos.vesting.v1beta1.BaseVestingAccount';
  }

  export type Proto = BaseVestingAccount_pb;
}
