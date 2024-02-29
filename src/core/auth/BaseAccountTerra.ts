/* eslint-disable @typescript-eslint/no-unused-vars */
import { PublicKey } from '../PublicKey';
import { JSONSerializable } from '../../util/json';
import { AccAddress } from '../bech32';
import { BaseAccount as BaseAccount_pb } from '@terra-money/terra.proto/cosmos/auth/v1beta1/auth';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import Long from 'long';

/**
 * Stores information about an account fetched from the blockchain.
 */
export class BaseAccountTerra extends JSONSerializable<
  BaseAccountTerra.Amino,
  BaseAccountTerra.Data,
  BaseAccountTerra.Proto
> {
  /**
   * Creates a new Account object, holding information about a basic account.
   *
   * @param address account address
   * @param public_key account's public key information
   * @param account_number account number on the blockchain
   * @param sequence sequence number, or number of transactions that have been posted
   */
  constructor(
    public address: AccAddress,
    public public_key: PublicKey | null,
    public account_number: number,
    public sequence: number
  ) {
    super();
  }

  public getAccountNumber(): number {
    return this.account_number;
  }

  public getSequenceNumber(): number {
    return this.sequence;
  }

  public getPublicKey(): PublicKey | null {
    return this.public_key;
  }

  public toAmino(isClassic?: boolean): BaseAccountTerra.Amino {
    const { address, public_key, account_number, sequence } = this;
    return {
      type: isClassic ? 'core/Account' : 'cosmos-sdk/BaseAccount',
      value: {
        address,
        public_key: public_key ? public_key.toAmino() : null,
        account_number: account_number.toFixed(),
        sequence: sequence.toFixed(),
      },
    };
  }

  public static fromAmino(
    data: BaseAccountTerra.Amino,
    _isClassic?: boolean
  ): BaseAccountTerra {
    const {
      value: { address, public_key, account_number, sequence },
    } = data;

    return new BaseAccountTerra(
      address || '',
      public_key ? PublicKey.fromAmino(public_key) : null,
      Number.parseInt(account_number) || 0,
      Number.parseInt(sequence) || 0
    );
  }

  public static fromData(
    data: BaseAccountTerra.Data,
    _isClassic?: boolean
  ): BaseAccountTerra {
    const { address, pub_key, account_number, sequence } = data;

    return new BaseAccountTerra(
      address || '',
      pub_key ? PublicKey.fromData(pub_key) : null,
      Number.parseInt(account_number) || 0,
      Number.parseInt(sequence) || 0
    );
  }

  public toData(_isClassic?: boolean): BaseAccountTerra.Data {
    const { address, public_key, account_number, sequence } = this;
    return {
      '@type': '/cosmos.auth.v1beta1.BaseAccount',
      address,
      pub_key: public_key ? public_key.toData() : null,
      account_number: account_number.toFixed(),
      sequence: sequence.toFixed(),
    };
  }

  public toProto(_isClassic?: boolean): BaseAccountTerra.Proto {
    const { address, public_key, account_number, sequence } = this;
    return BaseAccount_pb.fromPartial({
      address,
      pubKey: public_key?.packAny(),
      accountNumber: Long.fromNumber(account_number),
      sequence: Long.fromNumber(sequence),
    });
  }

  public static fromProto(
    baseAccountProto: BaseAccountTerra.Proto,
    _isClassic?: boolean
  ): BaseAccountTerra {
    const pubkey = baseAccountProto.pubKey;
    return new BaseAccountTerra(
      baseAccountProto.address,
      pubkey ? PublicKey.fromProto(pubkey) : null,
      baseAccountProto.accountNumber.toNumber(),
      baseAccountProto.sequence.toNumber()
    );
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.auth.v1beta1.BaseAccount',
      value: BaseAccount_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(
    pubkeyAny: Any,
    isClassic?: boolean
  ): BaseAccountTerra {
    return BaseAccountTerra.fromProto(
      BaseAccount_pb.decode(pubkeyAny.value),
      isClassic
    );
  }
}

export namespace BaseAccountTerra {
  export interface AminoValue {
    address: AccAddress;
    public_key: PublicKey.Amino | null;
    account_number: string;
    sequence: string;
  }

  export interface Amino {
    type: 'core/Account' | 'cosmos-sdk/BaseAccount';
    value: AminoValue;
  }

  export interface DataValue {
    address: AccAddress;
    pub_key: PublicKey.Data | null;
    account_number: string;
    sequence: string;
  }

  export interface Data extends DataValue {
    '@type':
      | '/cosmos.auth.v1beta1.BaseAccount'
      | '/ethermint.types.v1.EthAccount';
  }

  export type Proto = BaseAccount_pb;
}
