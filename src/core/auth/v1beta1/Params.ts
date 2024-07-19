/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../util/json';
import { Int, Numeric } from '../../numeric';
import { Params as AuthParamsV1B1_pb } from '@xpla/xpla.proto/cosmos/auth/v1beta1/auth';

export class AuthParamsV1B1 extends JSONSerializable<
  AuthParamsV1B1.Amino,
  AuthParamsV1B1.Data,
  AuthParamsV1B1.Proto
> {
  public max_memo_characters: Int;
  public tx_sig_limit: Int;
  public tx_size_cost_per_byte: Int;
  public sig_verify_cost_ed25519: Int;
  public sig_verify_cost_secp256k1: Int;

  /** Params defines the parameters for the auth module. */
  constructor(
    max_memo_characters: Numeric.Input,
    tx_sig_limit: Numeric.Input,
    tx_size_cost_per_byte: Numeric.Input,
    sig_verify_cost_ed25519: Numeric.Input,
    sig_verify_cost_secp256k1: Numeric.Input
  ) {
    super();
    this.max_memo_characters = new Int(max_memo_characters);
    this.tx_sig_limit = new Int(tx_sig_limit);
    this.tx_size_cost_per_byte = new Int(tx_size_cost_per_byte);
    this.sig_verify_cost_ed25519 = new Int(sig_verify_cost_ed25519);
    this.sig_verify_cost_secp256k1 = new Int(sig_verify_cost_secp256k1);
  }

  public static fromAmino(
    data: AuthParamsV1B1.Amino,
    _?: boolean
  ): AuthParamsV1B1 {
    const {
      max_memo_characters,
      tx_sig_limit,
      tx_size_cost_per_byte,
      sig_verify_cost_ed25519,
      sig_verify_cost_secp256k1,
    } = data;
    return new AuthParamsV1B1(
      max_memo_characters ?? 0,
      tx_sig_limit ?? 0,
      tx_size_cost_per_byte ?? 0,
      sig_verify_cost_ed25519 ?? 0,
      sig_verify_cost_secp256k1 ?? 0
    );
  }

  public toAmino(_?: boolean): AuthParamsV1B1.Amino {
    const {
      max_memo_characters,
      tx_sig_limit,
      tx_size_cost_per_byte,
      sig_verify_cost_ed25519,
      sig_verify_cost_secp256k1,
    } = this;

    const res: AuthParamsV1B1.Amino = {
      max_memo_characters: max_memo_characters.toFixed(),
      tx_sig_limit: tx_sig_limit.toFixed(),
      tx_size_cost_per_byte: tx_size_cost_per_byte.toFixed(),
      sig_verify_cost_ed25519: sig_verify_cost_ed25519.toFixed(),
      sig_verify_cost_secp256k1: sig_verify_cost_secp256k1.toFixed(),
    };

    return res;
  }

  public static fromData(
    data: AuthParamsV1B1.Data,
    _?: boolean
  ): AuthParamsV1B1 {
    const {
      max_memo_characters,
      tx_sig_limit,
      tx_size_cost_per_byte,
      sig_verify_cost_ed25519,
      sig_verify_cost_secp256k1,
    } = data;
    return new AuthParamsV1B1(
      max_memo_characters,
      tx_sig_limit,
      tx_size_cost_per_byte,
      sig_verify_cost_ed25519,
      sig_verify_cost_secp256k1
    );
  }

  public toData(_?: boolean): AuthParamsV1B1.Data {
    const {
      max_memo_characters,
      tx_sig_limit,
      tx_size_cost_per_byte,
      sig_verify_cost_ed25519,
      sig_verify_cost_secp256k1,
    } = this;

    const res: AuthParamsV1B1.Data = {
      '@type': '/cosmos.auth.v1beta1.Params',
      max_memo_characters: max_memo_characters.toFixed(),
      tx_sig_limit: tx_sig_limit.toFixed(),
      tx_size_cost_per_byte: tx_size_cost_per_byte.toFixed(),
      sig_verify_cost_ed25519: sig_verify_cost_ed25519.toFixed(),
      sig_verify_cost_secp256k1: sig_verify_cost_secp256k1.toFixed(),
    };

    return res;
  }

  public static fromProto(
    proto: AuthParamsV1B1.Proto,
    _?: boolean
  ): AuthParamsV1B1 {
    return new AuthParamsV1B1(
      proto.maxMemoCharacters.toString(),
      proto.txSigLimit.toString(),
      proto.txSizeCostPerByte.toString(),
      proto.sigVerifyCostEd25519.toString(),
      proto.sigVerifyCostSecp256k1.toString()
    );
  }

  public toProto(_?: boolean): AuthParamsV1B1.Proto {
    const {
      max_memo_characters,
      tx_sig_limit,
      tx_size_cost_per_byte,
      sig_verify_cost_ed25519,
      sig_verify_cost_secp256k1,
    } = this;
    return AuthParamsV1B1_pb.fromPartial({
      maxMemoCharacters: max_memo_characters.toFixed(),
      txSigLimit: tx_sig_limit.toFixed(),
      txSizeCostPerByte: tx_size_cost_per_byte.toFixed(),
      sigVerifyCostEd25519: sig_verify_cost_ed25519.toFixed(),
      sigVerifyCostSecp256k1: sig_verify_cost_secp256k1.toFixed(),
    });
  }
}

export namespace AuthParamsV1B1 {
  export interface Amino {
    max_memo_characters: string | undefined;
    tx_sig_limit: string | undefined;
    tx_size_cost_per_byte: string | undefined;
    sig_verify_cost_ed25519: string | undefined;
    sig_verify_cost_secp256k1: string | undefined;
  }

  export interface Data {
    '@type': '/cosmos.auth.v1beta1.Params';
    max_memo_characters: string;
    tx_sig_limit: string;
    tx_size_cost_per_byte: string;
    sig_verify_cost_ed25519: string;
    sig_verify_cost_secp256k1: string;
  }

  export type Proto = AuthParamsV1B1_pb;
}
