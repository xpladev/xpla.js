import { JSONSerializable } from '../../../../../util/json';
import { Convert } from '../../../../../util/convert';
import { MerklePrefix as MerklePrefixV1_pb } from '@xpla/xpla.proto/ibc/core/commitment/v1/commitment';

/**
 * MerklePrefix is merkle path prefixed to the key.
 */
export class MerklePrefixV1 extends JSONSerializable<
  MerklePrefixV1.Amino,
  MerklePrefixV1.Data,
  MerklePrefixV1.Proto
> {
  /**
   * @param key_prefix
   */
  constructor(public key_prefix: string) {
    super();
  }

  public static fromAmino(data: MerklePrefixV1.Amino): MerklePrefixV1 {
    const { key_prefix } = data;
    return new MerklePrefixV1(key_prefix);
  }

  public toAmino(): MerklePrefixV1.Amino {
    const { key_prefix } = this;
    const res: MerklePrefixV1.Amino = {
      key_prefix,
    };
    return res;
  }

  public static fromData(data: MerklePrefixV1.Data): MerklePrefixV1 {
    const { key_prefix } = data;
    return new MerklePrefixV1(key_prefix);
  }

  public toData(): MerklePrefixV1.Data {
    const { key_prefix } = this;
    const res: MerklePrefixV1.Data = {
      key_prefix,
    };
    return res;
  }

  public static fromProto(proto: MerklePrefixV1.Proto): MerklePrefixV1 {
    return new MerklePrefixV1(Convert.toBase64(proto.keyPrefix));
  }

  public toProto(): MerklePrefixV1.Proto {
    const { key_prefix } = this;
    return MerklePrefixV1_pb.fromPartial({
      keyPrefix: Convert.fromBase64(key_prefix),
    });
  }
}

export namespace MerklePrefixV1 {
  export interface Amino {
    key_prefix: string;
  }

  export interface Data {
    key_prefix: string;
  }

  export type Proto = MerklePrefixV1_pb;
}
