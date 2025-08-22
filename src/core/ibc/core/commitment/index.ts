export * from './v1/MerklePrefix';
export * from './v1/MerkleRoot';
export * from './v1/MerkleProof';
export * from './v2/MerklePath';

import { MerklePrefixV1 } from './v1/MerklePrefix';
import { MerkleRootV1 } from './v1/MerkleRoot';
import { MerkleProofV1 } from './v1/MerkleProof';
import { MerklePathV2 } from './v2/MerklePath';

export {
    MerklePrefixV1 as MerklePrefix,
    MerkleRootV1 as MerkleRoot,
    MerkleProofV1 as MerkleProof,
    MerklePathV2 as MerklePath,
}
