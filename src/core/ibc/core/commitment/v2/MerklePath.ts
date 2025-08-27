import { JSONSerializable } from '../../../../../util/json';
import { Convert } from '../../../../../util/convert';
import { MerklePath as MerklePathV2_pb } from '@xpla/xpla.proto/ibc/core/commitment/v2/commitment';

/**
 * MerklePath is the path used to verify commitment proofs, which can be an
 * arbitrary structured object (defined by a commitment type).
 */
export class MerklePathV2 extends JSONSerializable<
  MerklePathV2.Amino,
  MerklePathV2.Data,
  MerklePathV2.Proto
> {
  /**
   * @param key_path base64 encoded
   */
  constructor(public key_path: string[]) {
    super();
  }

  public static fromAmino(data: MerklePathV2.Amino): MerklePathV2 {
    const { key_path } = data;
    return new MerklePathV2(key_path);
  }

  public toAmino(): MerklePathV2.Amino {
    const { key_path } = this;
    const res: MerklePathV2.Amino = {
      key_path,
    };
    return res;
  }

  public static fromData(data: MerklePathV2.Data): MerklePathV2 {
    const { key_path } = data;
    return new MerklePathV2(key_path);
  }

  public toData(): MerklePathV2.Data {
    const { key_path } = this;
    const res: MerklePathV2.Data = {
      key_path,
    };
    return res;
  }

  public static fromProto(proto: MerklePathV2.Proto): MerklePathV2 {
    return new MerklePathV2(
      proto.keyPath.map(Convert.toBase64),
    );
  }

  public toProto(): MerklePathV2.Proto {
    const { key_path } = this;
    return MerklePathV2_pb.fromPartial({
      keyPath: key_path.map(Convert.fromBase64),
    });
  }
}

export namespace MerklePathV2 {
  export interface Amino {
    key_path: string[];
  }

  export interface Data {
    key_path: string[];
  }

  export type Proto = MerklePathV2_pb;
}
