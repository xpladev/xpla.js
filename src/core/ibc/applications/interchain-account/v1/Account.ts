import { JSONSerializable } from '../../../../../util/json';
import { BaseAccount } from '../../../../..';
import { InterchainAccount as InterchainAccount_pb } from '@xpla/xpla.proto/ibc/applications/interchain_accounts/v1/account';

/**
 * An InterchainAccount is defined as a BaseAccount & the address of the account owner on the controller chain
 */
export class InterchainAccount extends JSONSerializable<
  any,
  InterchainAccount.Data,
  InterchainAccount.Proto
> {
  /**
   * @param base_account
   * @param account_owner
   */
  constructor(
    public base_account: BaseAccount | undefined,
    public account_owner: string
  ) {
    super();
  }

  public static fromAmino(_: any): InterchainAccount {
    throw new Error('Amino not supported');
  }

  public toAmino(): any {
    throw new Error('Amino not supported');
  }

  public static fromData(data: InterchainAccount.Data): InterchainAccount {
    const { base_account, account_owner } = data;
    return new InterchainAccount(
      base_account ? BaseAccount.fromData(base_account) : undefined,
      account_owner
    );
  }

  public toData(): InterchainAccount.Data {
    const { base_account, account_owner } = this;
    const res: InterchainAccount.Data = {
      base_account: base_account?.toData(),
      account_owner,
    };
    return res;
  }

  public static fromProto(proto: InterchainAccount.Proto): InterchainAccount {
    return new InterchainAccount(
      proto.baseAccount ? BaseAccount.fromProto(proto.baseAccount) : undefined,
      proto.accountOwner
    );
  }

  public toProto(): InterchainAccount.Proto {
    const { base_account, account_owner } = this;
    return InterchainAccount_pb.fromPartial({
      baseAccount: base_account?.toProto(),
      accountOwner: account_owner,
    });
  }
}

export namespace InterchainAccount {
  export interface Data {
    base_account?: BaseAccount.Data;
    account_owner: string;
  }

  export type Proto = InterchainAccount_pb;
}
