import { Int64, Int64Input, parseInt64 } from '../../../util/int64';
import { JSONSerializable } from '../../../util/json';
import { AbsoluteTxPosition as AbsoluteTxPosition_pb } from '@xpla/xpla.proto/cosmwasm/wasm/v1/types';

/**
 *
 */
export class AbsoluteTxPosition extends JSONSerializable<
  AbsoluteTxPosition.Amino,
  AbsoluteTxPosition.Data,
  AbsoluteTxPosition.Proto
> {
  public block_height: Int64;
  public tx_index: Int64;
  /**
   * @param block_height
   * @param tx_index
   */

  constructor(block_height: Int64Input, tx_index: Int64Input) {
    super();
    this.block_height = parseInt64(block_height);
    this.tx_index = parseInt64(tx_index);
  }

  public static fromAmino(data: AbsoluteTxPosition.Amino): AbsoluteTxPosition {
    return new AbsoluteTxPosition(data.block_height, data.tx_index);
  }

  public toAmino(): AbsoluteTxPosition.Amino {
    const res: AbsoluteTxPosition.Amino = {
      block_height: this.block_height.toFixed(),
      tx_index: this.tx_index.toFixed(),
    };
    return res;
  }

  public static fromData(data: AbsoluteTxPosition.Data): AbsoluteTxPosition {
    return new AbsoluteTxPosition(data.block_height, data.tx_index);
  }

  public toData(): AbsoluteTxPosition.Data {
    const res: AbsoluteTxPosition.Data = {
      block_height: this.block_height.toFixed(),
      tx_index: this.tx_index.toFixed(),
    };
    return res;
  }

  public static fromProto(proto: AbsoluteTxPosition.Proto): AbsoluteTxPosition {
    return new AbsoluteTxPosition(proto.blockHeight, proto.txIndex);
  }

  public toProto(): AbsoluteTxPosition.Proto {
    return AbsoluteTxPosition_pb.fromPartial({
      blockHeight: this.block_height.toString(),
      txIndex: this.tx_index.toString(),
    });
  }
}

export namespace AbsoluteTxPosition {
  export interface Amino {
    block_height: string;
    tx_index: string;
  }

  export interface Data {
    block_height: string;
    tx_index: string;
  }

  export type Proto = AbsoluteTxPosition_pb;
}
