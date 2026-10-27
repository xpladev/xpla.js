import { Int64, Int64Input, parseInt64 } from '../util/int64';
import { JSONSerializable } from '../util/json';
import { Convert } from '../util/convert';
import { Msg } from './Msg';
import { Fee } from './Fee';
import { Tip } from './Tip';
import { SignDoc as SignDoc_pb } from '@xpla/xpla.proto/cosmos/tx/v1beta1/tx';
import { TxBody, AuthInfo, Tx } from './Tx';

/**
 * A sign message is a data structure that is used to create a [[StdSignature]] to be later
 * appended to the list of signatures in an [[StdTx]]. Essentially, it contains all the
 * information needed to sign and build a transaction, and can be described as an
 * "unsigned transaction."
 */
export class SignDoc extends JSONSerializable<
  SignDoc.Amino,
  SignDoc.Data,
  SignDoc.Proto
> {
  public account_number: Int64;
  public sequence: Int64;
  /**
   *
   * @param chain_id ID of blockchain to submit transaction to
   * @param account_number account number on blockchain
   * @param sequence Sequence number (nonce), number of signed previous transactions by
   *    account included on the blockchain at time of broadcast.
   * @param fee transaction fee
   * @param msgs list of messages to include
   * @param memo optional note
   * @param timeout_height optional transaction timeout height, does not support amino
   * @param public_key Signer's public key, only used at direct sign mode
   */

  constructor(
    public chain_id: string,
    account_number: Int64Input,
    sequence: Int64Input,
    public auth_info: AuthInfo,
    public tx_body: TxBody
  ) {
    super();
    this.account_number = parseInt64(account_number);
    this.sequence = parseInt64(sequence);
  }

  public toAmino(isClassic?: boolean): SignDoc.Amino {
    if (
      this.tx_body.extension_options?.length ||
      this.tx_body.non_critical_extension_options?.length
    ) {
      throw new Error(
        'LEGACY_AMINO_JSON does not support protobuf extension options'
      );
    }
    const {
      chain_id,
      account_number,
      sequence,
      tx_body: { memo, messages, timeout_height, unordered, timeout_timestamp },
      auth_info: { fee, tip },
    } = this;

    return {
      chain_id,
      account_number: account_number.toString(),
      sequence: sequence.toString(),
      timeout_height:
        timeout_height && !timeout_height.isZero()
          ? timeout_height.toString()
          : undefined,
      unordered: unordered || undefined,
      timeout_timestamp: timeout_timestamp?.toAmino(),
      fee: fee ? fee.toAmino() : undefined,
      tip: tip ? tip.toAmino() : undefined,
      msgs: messages.map(m => m.toAmino(isClassic)),
      memo: memo ?? '',
    };
  }

  public toData(isClassic?: boolean): SignDoc.Data {
    const { account_number, chain_id, tx_body, auth_info } = this;
    return {
      body_bytes: Convert.toBase64(tx_body.toBytes(isClassic)),
      auth_info_bytes: Convert.toBase64(auth_info.toBytes()),
      account_number: account_number.toFixed(),
      chain_id,
    };
  }

  public toProto(isClassic?: boolean): SignDoc.Proto {
    const { account_number, chain_id, tx_body, auth_info } = this;
    return SignDoc_pb.fromPartial({
      bodyBytes: tx_body.toBytes(isClassic),
      authInfoBytes: auth_info.toBytes(),
      accountNumber: account_number.toString(),
      chainId: chain_id,
    });
  }

  public toUnSignedTx(): Tx {
    return new Tx(this.tx_body, this.auth_info, []);
  }

  public toBytes(isClassic?: boolean): Uint8Array {
    return SignDoc_pb.encode(this.toProto(isClassic)).finish();
  }
}

export namespace SignDoc {
  export interface Amino {
    chain_id: string;
    account_number: string;
    sequence: string;
    timeout_height?: string;
    unordered?: boolean;
    timeout_timestamp?: string;
    fee: Fee.Amino | undefined;
    tip: Tip.Amino | undefined;
    msgs: Msg.Amino[];
    memo: string;
  }

  export interface Data {
    body_bytes: string;
    auth_info_bytes: string;
    chain_id: string;
    account_number: string;
  }

  export type Proto = SignDoc_pb;
}
