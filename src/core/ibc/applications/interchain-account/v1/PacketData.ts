import { JSONSerializable } from '../../../../../util/json';
import { Convert } from '../../../../../util/convert';
import { BaseAccount } from '../../../../..';
import {
  InterchainAccountPacketData as InterchainAccountPacketDataV1_pb,
  Type as InterchainAccountPacketTypeV1,
  typeFromJSON, typeToJSON,
} from '@xpla/xpla.proto/ibc/applications/interchain_accounts/v1/packet';

/**
 * An InterchainAccount is defined as a BaseAccount & the address of the account owner on the controller chain
 */
export class InterchainAccountPacketDataV1 extends JSONSerializable<
  any,
  InterchainAccountPacketDataV1.Data,
  InterchainAccountPacketDataV1.Proto
> {
  public data: Buffer;

  /**
   * @param type
   * @param data
   * @param memo
   */
  constructor(
    public type: InterchainAccountPacketTypeV1,
    data: Buffer | Uint8Array | number[] | string,
    public memo: string,
  ) {
    super();
    this.data = Convert.toBuffer(data);
  }

  public static fromAmino(_: any): InterchainAccountPacketDataV1 {
    throw new Error('Amino not supported');
  }

  public toAmino(): any {
    throw new Error('Amino not supported');
  }

  public static fromData(data_: InterchainAccountPacketDataV1.Data): InterchainAccountPacketDataV1 {
    const { type, data, memo } = data_;
    return new InterchainAccountPacketDataV1(
      typeFromJSON(type),
      Buffer.from(data, 'base64'),
      memo,
    );
  }

  public toData(): InterchainAccountPacketDataV1.Data {
    const { type, data, memo } = this;
    const res: InterchainAccountPacketDataV1.Data = {
      type: typeToJSON(type),
      data: data.toString('base64'),
      memo,
    };
    return res;
  }

  public static fromProto(proto: InterchainAccountPacketDataV1.Proto): InterchainAccountPacketDataV1 {
    return new InterchainAccountPacketDataV1(
      proto.type,
      proto.data,
      proto.memo,
    );
  }

  public toProto(): InterchainAccountPacketDataV1.Proto {
    const { type, data, memo } = this;
    return InterchainAccountPacketDataV1_pb.fromPartial({
      type, data, memo,
    });
  }
}

export namespace InterchainAccountPacketDataV1 {
  export interface Data {
    type: string;
    data: string; // base64
    memo: string;
  }

  export type Proto = InterchainAccountPacketDataV1_pb;
}
