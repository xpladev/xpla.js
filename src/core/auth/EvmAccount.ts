import { PublicKey } from '../PublicKey';
import { JSONSerializable } from '../../util/json';
import { EvmAddress } from '../eip55';

/**
 * Stores information about an account fetched from the blockchain.
 */
export class EvmAccount extends JSONSerializable<
  EvmAccount.Amino,
  EvmAccount.Data,
  EvmAccount.Proto
> {
  /**
   * Creates a new Account object, holding information about a basic account.
   *
   * @param address account address
   * @param nonce nonce number, or number of transactions that have been posted
   */
  constructor(public address: EvmAddress, public nonce: number) {
    super();
  }

  public getAccountNumber(): number {
    return 0;
  }

  public getSequenceNumber(): number {
    return this.nonce;
  }

  public getPublicKey(): PublicKey | null {
    return null;
  }

  public toAmino(_?: boolean): EvmAccount.Amino {
    _;
    const { address, nonce } = this;
    return {
      type: 'core/Account',
      value: {
        address,
        nonce: nonce.toFixed(),
      },
    };
  }

  public static fromAmino(data: EvmAccount.Amino, _?: boolean): EvmAccount {
    _;
    const {
      value: { address, nonce },
    } = data;

    return new EvmAccount(address || '', Number.parseInt(nonce) || 0);
  }

  public static fromData(data: EvmAccount.Data, _?: boolean): EvmAccount {
    _;
    const { address, nonce } = data;

    return new EvmAccount(address || '', Number.parseInt(nonce) || 0);
  }

  public toData(_?: boolean): EvmAccount.Data {
    _;
    const { address, nonce } = this;
    return {
      '@type': '/ethermint.types.v1.EthAccount',
      address,
      nonce: nonce.toFixed(),
    };
  }

  public toProto(_?: boolean): EvmAccount.Proto {
    _;
    return {};
  }

  public static fromProto(
    _baseAccountProto: EvmAccount.Proto,
    _?: boolean
  ): EvmAccount {
    _;
    return new EvmAccount('', 0);
  }

  public packAny(_?: boolean): any {
    _;
    return {};
  }

  public static unpackAny(_pubkeyAny: any, _?: boolean): EvmAccount {
    _;
    return new EvmAccount('', 0);
  }
}

export namespace EvmAccount {
  export interface AminoValue {
    address: EvmAddress;
    nonce: string;
  }

  export interface Amino {
    type: 'core/Account' | 'cosmos-sdk/BaseAccount';
    value: AminoValue;
  }

  export interface DataValue {
    address: EvmAddress;
    nonce: string;
  }

  export interface Data extends DataValue {
    '@type':
      | '/cosmos.auth.v1beta1.BaseAccount'
      | '/ethermint.types.v1.EthAccount';
  }

  export type Proto = any;
}
