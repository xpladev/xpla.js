/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../../util/json';
import { Convert } from '../../../../../util/convert';
import { MerkleRoot as MerkleRootV1_pb } from '@xpla/xpla.proto/ibc/core/commitment/v1/commitment';

/**
 * MerkleRoot defines a merkle root hash.
 */
export class MerkleRootV1 extends JSONSerializable<
  MerkleRootV1.Amino,
  MerkleRootV1.Data,
  MerkleRootV1.Proto
> {
  /**
   * @param hash
   */
  constructor(public hash: string) {
    super();
  }

  public static fromAmino(_: any): MerkleRootV1 {
    throw new Error('Amino not supported');
  }

  public toAmino(): any {
    throw new Error('Amino not supported');
  }

  public static fromData(data: MerkleRootV1.Data): MerkleRootV1 {
    return new MerkleRootV1(data.hash);
  }

  public toData(): MerkleRootV1.Data {
    const res: MerkleRootV1.Data = {
      hash: this.hash,
    };
    return res;
  }

  public static fromProto(proto: MerkleRootV1.Proto): MerkleRootV1 {
    return new MerkleRootV1(Convert.toBase64(proto.hash));
  }

  public toProto(): MerkleRootV1.Proto {
    return MerkleRootV1_pb.fromPartial({
      hash: Convert.fromBase64(this.hash),
    });
  }
}

export namespace MerkleRootV1 {
  export interface Amino {
    hash: string;
  }

  export interface Data {
    hash: string;
  }

  export type Proto = MerkleRootV1_pb;
}
