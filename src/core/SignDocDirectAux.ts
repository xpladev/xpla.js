/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../util/json';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import {
  Tip,
  SignDocDirectAux as SignDocDirectAux_pb,
} from '@xpla/xpla.proto/cosmos/tx/v1beta1/tx';
import { Tx } from './Tx';
/**
 * A sign message is a data structure that is used to create a [[StdSignature]] to be later
 * appended to the list of signatures in an [[StdTx]]. Essentially, it contains all the
 * information needed to sign and build a transaction, and can be described as an
 * "unsigned transaction."
 */
export class SignDocDirectAux extends JSONSerializable<
  SignDocDirectAux.Amino,
  SignDocDirectAux.Data,
  SignDocDirectAux.Proto
> {
  /**
   *
   * @param body_bytes is protobuf serialization of a TxBody that matches the representation in TxRaw
   * @param public_key is the public key of the signing account
   * @param chain_id is the identifier of the chain this transaction targets
   * @param account_number is the account number of the account in state
   * @param sequence is the sequence number of the signing account
   * @param tip is the optional tip used for transactions fees paid in another denom
   */
  constructor(
    public body_bytes: Uint8Array,
    public public_key: Any | undefined,
    public chain_id: string,
    public account_number: number,
    public sequence: number,
    public tip: Tip | undefined
  ) {
    super();
  }

  public toAmino(_isClassic?: boolean): SignDocDirectAux.Amino {
    const { body_bytes, public_key, chain_id, account_number, sequence, tip } =
      this;

    return {
      body_bytes,
      public_key,
      chain_id,
      account_number,
      sequence,
      tip,
    };
  }

  public toData(_isClassic?: boolean): SignDocDirectAux.Data {
    const { body_bytes, public_key, chain_id, account_number, sequence, tip } =
      this;
    return {
      body_bytes,
      public_key,
      chain_id,
      account_number,
      sequence,
      tip,
    };
  }

  public toProto(_isClassic?: boolean): SignDocDirectAux.Proto {
    const { body_bytes, public_key, chain_id, account_number, sequence, tip } =
      this;
    return SignDocDirectAux_pb.fromPartial({
      bodyBytes: body_bytes,
      publicKey: public_key,
      chainId: chain_id,
      accountNumber: account_number,
      sequence,
      tip,
    });
  }

  public toUnSignedTx(): Tx {
    throw new Error('Not supported yet');
  }

  public toBytes(isClassic?: boolean): Uint8Array {
    return SignDocDirectAux_pb.encode(this.toProto(isClassic)).finish();
  }
}

export namespace SignDocDirectAux {
  export interface Amino {
    body_bytes: Uint8Array;
    public_key: Any | undefined;
    chain_id: string;
    account_number: number;
    sequence: number;
    tip: Tip | undefined;
  }

  export interface Data {
    body_bytes: Uint8Array;
    public_key: Any | undefined;
    chain_id: string;
    account_number: number;
    sequence: number;
    tip: Tip | undefined;
  }

  export type Proto = SignDocDirectAux_pb;
}
