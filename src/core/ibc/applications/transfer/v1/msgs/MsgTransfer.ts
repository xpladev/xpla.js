/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../../../util/json';
import { AccAddress } from '../../../../../bech32';
import { Coin } from '../../../../../Coin';
import { HeightV1 } from '../../../../core/client/v1/Height';
import { Numeric } from '../../../../../numeric';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgTransfer as MsgTransferV1_pb } from '@xpla/xpla.proto/ibc/applications/transfer/v1/tx';

/**
 * A basic message for transfer [[Coin]] via IBC.
 */
export class MsgTransferV1 extends JSONSerializable<
  MsgTransferV1.Amino,
  MsgTransferV1.Data,
  MsgTransferV1.Proto
> {
  public token?: Coin;
  public timeout_height?: HeightV1; // 0 to disable
  public timeout_timestamp?: Numeric.Output; // 0 to disable
  /**
   * @param source_port the port on which the packet will be sent
   * @param source_channel  the channel by which the packet will be sent
   * @param token the tokens to be transferred
   * @param sender the sender address
   * @param receiver the recipient address on the destination chain
   * @param timeout_height Timeout height relative to the current block height. (0 to disable)
   * @param timeout_timestamp Timeout timestamp (in nanoseconds) relative to the current block timestamp. (0 to disable)
   * @param memo optional memo
   * @param encoding optional encoding
   */
  constructor(
    public source_port: string,
    public source_channel: string,
    token: Coin | undefined,
    public sender: AccAddress,
    public receiver: string,
    timeout_height: HeightV1 | undefined,
    timeout_timestamp: Numeric.Input | undefined,
    public memo: string | undefined,
    public encoding: string | undefined,
  ) {
    super();

    if (!timeout_height && !timeout_timestamp) {
      throw 'both of timeout_height and timeout_timestamp are undefined';
    }

    this.token = token;
    this.timeout_height = timeout_height;
    this.timeout_timestamp = timeout_timestamp
      ? Numeric.parse(timeout_timestamp)
      : undefined;
  }

  public static fromAmino(data: MsgTransferV1.Amino, _?: boolean): MsgTransferV1 {
    const {
      value: {
        source_port,
        source_channel,
        token,
        sender,
        receiver,
        timeout_height,
        timeout_timestamp,
        memo,
        encoding,
      },
    } = data;

    if (!timeout_height && !timeout_timestamp) {
      throw 'both of timeout_height and timeout_timestamp are undefined';
    }

    return new MsgTransferV1(
      source_port,
      source_channel,
      token ? Coin.fromAmino(token) : undefined,
      sender,
      receiver,
      timeout_height ? HeightV1.fromAmino(timeout_height) : undefined,
      timeout_timestamp ? Numeric.parse(timeout_timestamp) : undefined,
      memo,
      encoding,
    );
  }

  public toAmino(_?: boolean): MsgTransferV1.Amino {
    const {
      source_port,
      source_channel,
      token,
      sender,
      receiver,
      timeout_height,
      timeout_timestamp,
      memo,
      encoding,
    } = this;
    return {
      type: 'cosmos-sdk/MsgTransfer',
      value: {
        source_port,
        source_channel,
        token: token ? token.toAmino() : undefined,
        sender,
        receiver,
        timeout_height: timeout_height?.toAmino() || {},
        timeout_timestamp: timeout_timestamp?.toFixed() || undefined,
        memo,
        encoding,
      },
    };
  }

  public static fromData(data: MsgTransferV1.Data, _?: boolean): MsgTransferV1 {
    const {
      source_port,
      source_channel,
      token,
      sender,
      receiver,
      timeout_timestamp,
      timeout_height,
      memo,
      encoding,
    } = data;

    if (!timeout_height && !timeout_timestamp) {
      throw 'both of timeout_height and timeout_timestamp are undefined';
    }

    return new MsgTransferV1(
      source_port,
      source_channel,
      token ? Coin.fromData(token) : undefined,
      sender,
      receiver,
      timeout_height ? HeightV1.fromData(timeout_height) : undefined,
      timeout_timestamp ? Number.parseInt(timeout_timestamp) : undefined,
      memo,
      encoding,
    );
  }

  public toData(_?: boolean): MsgTransferV1.Data {
    const {
      source_port,
      source_channel,
      token,
      sender,
      receiver,
      timeout_height,
      timeout_timestamp,
      memo,
      encoding,
    } = this;
    return {
      '@type': '/ibc.applications.transfer.v1.MsgTransfer',
      source_port,
      source_channel,
      token: token ? token.toData() : undefined,
      sender,
      receiver,
      timeout_height: timeout_height
        ? timeout_height.toData()
        : new HeightV1(0, 0).toData(),
      timeout_timestamp: timeout_timestamp?.toFixed() || '0',
      memo,
      encoding,
    };
  }

  public static fromProto(proto: MsgTransferV1.Proto, _?: boolean): MsgTransferV1 {
    if (!proto.timeoutHeight && proto.timeoutTimestamp.toNumber() == 0) {
      throw 'both of timeout_height and timeout_timestamp are empty';
    }

    return new MsgTransferV1(
      proto.sourcePort,
      proto.sourceChannel,
      proto.token ? Coin.fromProto(proto.token) : undefined,
      proto.sender,
      proto.receiver,
      proto.timeoutHeight ? HeightV1.fromProto(proto.timeoutHeight) : undefined,
      proto.timeoutTimestamp.toNumber(),
      proto.memo,
      proto.encoding,
    );
  }

  public toProto(_?: boolean): MsgTransferV1.Proto {
    const {
      source_port,
      source_channel,
      token,
      sender,
      receiver,
      timeout_height,
      timeout_timestamp,
      memo,
      encoding,
    } = this;
    return MsgTransferV1_pb.fromPartial({
      sourcePort: source_port,
      sourceChannel: source_channel,
      token: token ? token.toProto() : undefined,
      sender,
      receiver,
      timeoutHeight: timeout_height ? timeout_height.toProto() : undefined,
      timeoutTimestamp: timeout_timestamp?.toFixed() ?? '0',
      memo,
      encoding,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/ibc.applications.transfer.v1.MsgTransfer',
      value: MsgTransferV1_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(msgAny: Any, isClassic?: boolean): MsgTransferV1 {
    return MsgTransferV1.fromProto(
      MsgTransferV1_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgTransferV1 {
  export interface Amino {
    type: 'cosmos-sdk/MsgTransfer';
    value: {
      source_port: string;
      source_channel: string;
      token?: Coin.Amino;
      sender: AccAddress;
      receiver: string;
      timeout_height: HeightV1.Amino;
      timeout_timestamp?: string;
      memo?: string;
      encoding?: string;
    };
  }
  export interface Data {
    '@type': '/ibc.applications.transfer.v1.MsgTransfer';
    source_port: string;
    source_channel: string;
    token?: Coin.Data;
    sender: AccAddress;
    receiver: string;
    timeout_height: HeightV1.Data;
    timeout_timestamp: string;
    memo?: string;
    encoding?: string;
  }
  export type Proto = MsgTransferV1_pb;
}
