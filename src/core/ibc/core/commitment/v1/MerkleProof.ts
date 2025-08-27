/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../../util/json';
import { MerkleProof as MerkleProofV1_pb } from '@xpla/xpla.proto/ibc/core/commitment/v1/commitment';
import { CommitmentProof } from '@xpla/xpla.proto/cosmos/ics23/v1/proofs';

/**
 * MerkleProof is a wrapper type over a chain of CommitmentProofs.
 */
export class MerkleProofV1 extends JSONSerializable<
  MerkleProofV1.Amino,
  MerkleProofV1.Data,
  MerkleProofV1.Proto
> {
  /**
   * @param proofs
   */
  constructor(public proofs: CommitmentProof[]) {
    super();
  }

  public static fromAmino(_: any): MerkleProofV1 {
    throw new Error('Amino not supported');
  }

  public toAmino(): any {
    throw new Error('Amino not supported');
  }

  public static fromData(data: MerkleProofV1.Data): MerkleProofV1 {
    return new MerkleProofV1(data.proofs.map(CommitmentProof.fromJSON));
  }

  public toData(): MerkleProofV1.Data {
    const res: MerkleProofV1.Data = {
      proofs: this.proofs.map(CommitmentProof.toJSON),
    };
    return res;
  }

  public static fromProto(proto: MerkleProofV1.Proto): MerkleProofV1 {
    return new MerkleProofV1(proto.proofs);
  }

  public toProto(): MerkleProofV1.Proto {
    return MerkleProofV1_pb.fromPartial({
      proofs: this.proofs,
    });
  }
}

export namespace MerkleProofV1 {
  export interface Amino {
    proofs: any[];
  }

  export interface Data {
    proofs: any[];
  }

  export type Proto = MerkleProofV1_pb;
}
