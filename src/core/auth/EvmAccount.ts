import { Int64, Int64Input, parseInt64 } from '../../util/int64';
import { JSONSerializable } from '../../util/json';
import { PublicKey } from '../PublicKey';
import { EvmAddress } from '../eip55';

/**
 * Stores information about an account fetched from the blockchain.
 */
export class EvmAccount extends JSONSerializable<
  EvmAccount.Amino,
  EvmAccount.Data,
  EvmAccount.Proto
> {
  public nonce: Int64;

  /**
   * Creates a new Account object, holding information about a basic account.
   *
   * @param address account address
   * @param nonce nonce number, or number of transactions that have been posted
   */
  constructor(
    public address: EvmAddress,
    nonce: Int64Input,
    public code_hash?: string
  ) {
    super();
    this.nonce = parseInt64(nonce);
  }

  public getAccountNumber(): Int64 {
    return parseInt64(0);
  }

  public getSequenceNumber(): Int64 {
    return this.nonce;
  }

  public getPublicKey(): PublicKey | null {
    return null;
  }

  public getCodeHash(): string {
    return this.code_hash ?? '';
  }

  public toAmino(_?: boolean): EvmAccount.Amino {
    const { address, nonce, code_hash } = this;
    return {
      type: 'core/Account',
      value: {
        address,
        nonce: nonce.toFixed(),
        code_hash,
      },
    };
  }

  public static fromAmino(data: EvmAccount.Amino, _?: boolean): EvmAccount {
    const {
      value: { address, nonce, code_hash },
    } = data;

    return new EvmAccount(address || '', nonce ?? '0', code_hash);
  }

  public static fromData(data: EvmAccount.Data, _?: boolean): EvmAccount {
    const { address, nonce, code_hash } = data;

    return new EvmAccount(address || '', nonce ?? '0', code_hash);
  }

  public toData(_?: boolean): EvmAccount.Data {
    const { address, nonce, code_hash } = this;
    return {
      '@type': '/ethermint.types.v1.EthAccount',
      address,
      nonce: nonce.toFixed(),
      code_hash,
    };
  }

  public toProto(_?: boolean): EvmAccount.Proto {
    return {};
  }

  public static fromProto(
    _baseAccountProto: EvmAccount.Proto,
    _?: boolean
  ): EvmAccount {
    return new EvmAccount('', 0);
  }

  public packAny(_?: boolean): any {
    return {};
  }

  public static unpackAny(_pubkeyAny: any, _?: boolean): EvmAccount {
    return new EvmAccount('', 0);
  }
}

export namespace EvmAccount {
  export interface AminoValue {
    address: EvmAddress;
    nonce: string;
    code_hash?: string;
  }

  export interface Amino {
    type: 'core/Account' | 'cosmos-sdk/BaseAccount';
    value: AminoValue;
  }

  export interface DataValue {
    address: EvmAddress;
    nonce: string;
    code_hash?: string;
  }

  export interface Data extends DataValue {
    '@type':
      '/cosmos.auth.v1beta1.BaseAccount' | '/ethermint.types.v1.EthAccount';
  }

  export type Proto = any;
}
