import { JSONSerializable } from '../../../../../util/json';
import { Convert } from '../../../../../util/convert';
import { MerkleRootV1 } from '../../../core/commitment';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { ConsensusState as ConsensusStateV1_pb } from '@xpla/xpla.proto/ibc/lightclients/tendermint/v1/tendermint';

/**
 * ClientState from Tendermint tracks the current validator set, latest height,
 * and a possible frozen height.
 */
export class ConsensusStateV1 extends JSONSerializable<any, ConsensusStateV1.Data, ConsensusStateV1.Proto> {
  /**
   * @param timestamp
   * @param root
   * @param next_validators_hash base64 encoded
   */
  constructor(
    public timestamp: Date | undefined,
    public root: MerkleRootV1 | undefined,
    public next_validators_hash: string,
  ) {
    super();
  }

  public static fromAmino(_: any): ConsensusStateV1 {
    throw new Error('Amino not supported');
  }

  public toAmino(): any {
    throw new Error('Amino not supported');
  }

  public static fromData(data: ConsensusStateV1.Data): ConsensusStateV1 {
    const {
      timestamp,
      root,
      next_validators_hash,
    } = data;
    return new ConsensusStateV1(
      timestamp ? new Date(timestamp) : undefined,
      root ? MerkleRootV1.fromData(root) : undefined,
      next_validators_hash,
    );
  }

  public toData(): ConsensusStateV1.Data {
    const {
      timestamp,
      root,
      next_validators_hash,
    } = this;
    return {
      '@type': '/ibc.lightclients.tendermint.v1.ConsensusState',
      timestamp: timestamp?.toISOString(),
      root: root?.toData(),
      next_validators_hash,
    };
  }

  public static fromProto(proto: ConsensusStateV1.Proto): ConsensusStateV1 {
    const {
      timestamp,
      root,
      nextValidatorsHash,
    } = proto;
    return new ConsensusStateV1(
      timestamp ? new Date(timestamp) : undefined,
      root ? MerkleRootV1.fromProto(root) : undefined,
      Convert.toBase64(nextValidatorsHash),
    );
  }

  public toProto(): ConsensusStateV1.Proto {
    const {
      timestamp,
      root,
      next_validators_hash,
    } = this;
    return ConsensusStateV1_pb.fromPartial({
      timestamp,
      root: root?.toProto(),
      nextValidatorsHash: Convert.fromBase64(next_validators_hash),
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/ibc.lightclients.tendermint.v1.ConsensusState',
      value: ConsensusStateV1_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any): ConsensusStateV1 {
    return ConsensusStateV1.fromProto(ConsensusStateV1_pb.decode(msgAny.value));
  }
}

export namespace ConsensusStateV1 {
  export interface Data {
    '@type': '/ibc.lightclients.tendermint.v1.ConsensusState';
    timestamp: string | undefined;
    root: MerkleRootV1.Data | undefined;
    next_validators_hash: string;
  }

  export type Proto = ConsensusStateV1_pb;
}
