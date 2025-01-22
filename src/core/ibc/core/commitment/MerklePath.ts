/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { MerklePath as MerklePath_pb } from '@xpla/xpla.proto/ibc/core/commitment/v1/commitment';

// MerkleRoot defines a merkle root hash.
// In the Cosmos SDK, the AppHash of a block header becomes the root.
export class MerklePath extends JSONSerializable<
  MerklePath.Amino,
  MerklePath.Data,
  MerklePath.Proto
> {
  /**
   * @param hash
   */
  constructor(public keyPath: string[]) {
    super();
  }

  public static fromAmino(_: any): MerklePath {
    throw new Error('Amino not supported');
  }

  public toAmino(): any {
    throw new Error('Amino not supported');
  }

  public static fromData(data: MerklePath.Data): MerklePath {
    return new MerklePath(data.key_path);
  }

  public toData(): MerklePath.Data {
    const res: MerklePath.Data = {
      key_path: this.keyPath,
    };
    return res;
  }

  public static fromProto(proto: MerklePath.Proto): MerklePath {
    return new MerklePath(proto.keyPath);
  }

  public toProto(): MerklePath.Proto {
    return MerklePath_pb.fromPartial({
      keyPath: this.keyPath,
    });
  }
}

export namespace MerklePath {
  export interface Amino {
    key_path: string[];
  }

  export interface Data {
    key_path: string[];
  }

  export type Proto = MerklePath_pb;
}
