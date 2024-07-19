/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../util/json';
import { AccAddress } from '../bech32';
import { BaseAccount } from './BaseAccount';
import { ModuleAccount as ModuleAccount_pb } from '@xpla/xpla.proto/cosmos/auth/v1beta1/auth';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';

/**
 * Stores information about an account fetched from the blockchain.
 */
export class ModuleAccount extends JSONSerializable<
  ModuleAccount.Amino,
  ModuleAccount.Data,
  ModuleAccount.Proto
> {
  /**
   * Creates a new Account object, holding information about a basic account.
   *
   * @param base_account
   * @param name
   * @param permissions
   */
  constructor(
    public base_account: BaseAccount | undefined,
    public name: string,
    public permissions: string[]
  ) {
    super();
  }

  public get address(): AccAddress | undefined {
    return this.base_account?.address;
  }

  public hasPermission(permission: string): boolean {
    return this.permissions.includes(permission);
  }

  public toAmino(isClassic?: boolean): ModuleAccount.Amino {
    const { base_account, name, permissions } = this;
    return {
      type: 'cosmos-sdk/ModuleAccount',
      value: {
        base_account: base_account?.toAmino(isClassic),
        name,
        permissions,
      },
    };
  }

  public static fromAmino(
    data: ModuleAccount.Amino,
    _isClassic?: boolean
  ): ModuleAccount {
    const {
      value: { base_account, name, permissions },
    } = data;
    return new ModuleAccount(
      base_account ? BaseAccount.fromAmino(base_account) : undefined,
      name,
      permissions
    );
  }

  public static fromData(
    data: ModuleAccount.Data,
    _isClassic?: boolean
  ): ModuleAccount {
    const { base_account, name, permissions } = data;
    return new ModuleAccount(
      base_account ? BaseAccount.fromData(base_account) : undefined,
      name,
      permissions
    );
  }

  public toData(_isClassic?: boolean): ModuleAccount.Data {
    const { base_account, name, permissions } = this;
    return {
      '@type': '/cosmos.auth.v1beta1.ModuleAccount',
      base_account: base_account?.toData(),
      name,
      permissions,
    };
  }

  public static fromProto(
    proto: ModuleAccount.Proto,
    _isClassic?: boolean
  ): ModuleAccount {
    return new ModuleAccount(
      proto.baseAccount ? BaseAccount.fromProto(proto.baseAccount) : undefined,
      proto.name,
      proto.permissions
    );
  }

  public toProto(_isClassic?: boolean): ModuleAccount.Proto {
    const { base_account, name, permissions } = this;
    return ModuleAccount_pb.fromPartial({
      baseAccount: base_account?.toProto(),
      name,
      permissions,
    });
  }

  public packAny(_isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.auth.v1beta1.ModuleAccount',
      value: ModuleAccount_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(pubkeyAny: Any, _isClassic?: boolean): ModuleAccount {
    return ModuleAccount.fromProto(ModuleAccount_pb.decode(pubkeyAny.value));
  }
}

export namespace ModuleAccount {
  export interface Amino {
    type: 'cosmos-sdk/ModuleAccount';
    value: {
      base_account: BaseAccount.Amino | undefined;
      name: string;
      permissions: string[];
    };
  }

  export interface Data {
    '@type': '/cosmos.auth.v1beta1.ModuleAccount';
    base_account: BaseAccount.Data | undefined;
    name: string;
    permissions: string[];
  }

  export type Proto = ModuleAccount_pb;
}
