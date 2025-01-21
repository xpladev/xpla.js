/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { Convert } from '../../../../util/convert';
import { Int, Numeric } from '../../../../core/numeric';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgIBCSend as MsgIBCSendV1_pb } from '@xpla/xpla.proto/cosmwasm/wasm/v1/ibc';

export class MsgIBCSendV1 extends JSONSerializable<
  MsgIBCSendV1.Amino,
  MsgIBCSendV1.Data,
  MsgIBCSendV1.Proto
> {
  public timeout_height: Int;
  public timeout_timestamp: Int;
  public data: Buffer;

  /**
   * @param channel by which the packet will be sent
   * @param timeout_height relative to the current block height (0 to disable)
   * @param timeout_timestamp (in nanoseconds) relative to the current block timestamp (0 to disable)
   * @param data is the payload to transfer (base64 string or hex string is also available)
   */
  constructor(
    public channel: string,
    timeout_height: Numeric.Input,
    timeout_timestamp: Numeric.Input,
    data: Buffer | Uint8Array | number[] | string,
  ) {
    super();
    this.timeout_height = new Int(timeout_height);
    this.timeout_timestamp = new Int(timeout_timestamp);
    this.data = Convert.toBuffer(data);
  }

  public static fromAmino(
    data_: MsgIBCSendV1.Amino,
    _isClassic?: boolean
  ): MsgIBCSendV1 {
    const {
      channel, timeout_height, timeout_timestamp, data,
    } = data_;
    return new MsgIBCSendV1(
      channel ?? '',
      timeout_height ?? 0,
      timeout_timestamp ?? 0,
      data ?? [],
    );
  }

  public toAmino(_isClassic?: boolean): MsgIBCSendV1.Amino {
    const { channel, timeout_height, timeout_timestamp, data } = this;
    return {
      type: undefined,
      channel: channel.length > 0 ? channel : undefined,
      timeout_height: timeout_height.gt(0) ? timeout_height.toFixed() : undefined,
      timeout_timestamp: timeout_timestamp.gt(0) ? timeout_timestamp.toFixed() : undefined,
      data: data.length > 0 ? data.toString('base64') : undefined,
    };
  }

  public static fromProto(
    proto: MsgIBCSendV1.Proto,
    _isClassic?: boolean
  ): MsgIBCSendV1 {
    return new MsgIBCSendV1(
      proto.channel,
      proto.timeoutHeight.toString(),
      proto.timeoutTimestamp.toString(),
      proto.data,
    );
  }

  public toProto(_isClassic?: boolean): MsgIBCSendV1.Proto {
    const { channel, timeout_height, timeout_timestamp, data } = this;
    return MsgIBCSendV1_pb.fromPartial({
      channel,
      timeoutHeight: timeout_height.toFixed(),
      timeoutTimestamp: timeout_timestamp.toFixed(),
      data,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmwasm.wasm.v1.MsgIBCSend',
      value: MsgIBCSendV1_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(msgAny: Any, isClassic?: boolean): MsgIBCSendV1 {
    return MsgIBCSendV1.fromProto(
      MsgIBCSendV1_pb.decode(msgAny.value),
      isClassic
    );
  }

  public static fromData(
    data_: MsgIBCSendV1.Data,
    _isClassic?: boolean
  ): MsgIBCSendV1 {
    const { channel, timeout_height, timeout_timestamp, data } = data_;
    return new MsgIBCSendV1(
      channel,
      timeout_height,
      timeout_timestamp,
      data,
    );
  }

  public toData(_isClassic?: boolean): MsgIBCSendV1.Data {
    const { channel, timeout_height, timeout_timestamp, data } = this;
    return {
      '@type': '/cosmwasm.wasm.v1.MsgIBCSend',
      channel,
      timeout_height: timeout_height.toFixed(),
      timeout_timestamp: timeout_timestamp.toFixed(),
      data: data.toString('base64'),
    };
  }
}

export namespace MsgIBCSendV1 {
  export interface Amino {
    type: 'wasm/MsgIBCSend' | undefined;
    channel?: string;
    timeout_height?: string;
    timeout_timestamp?: string;
    data?: string; // base64
  }

  export interface Data {
    '@type': '/cosmwasm.wasm.v1.MsgIBCSend';
    channel: string;
    timeout_height: string;
    timeout_timestamp: string;
    data: string; // base64
  }

  export type Proto = MsgIBCSendV1_pb;
}
