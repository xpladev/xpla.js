/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { Convert } from '../../../../util/convert';
import { AccAddress } from '../../../bech32';
import { ErrorReceipt } from '../../core/channel/Upgrade';
import { Height } from '../../core/client/Height';
import { Channel } from '../../core/channel/Channel';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgChannelUpgradeCancel as MsgChannelUpgradeCancel_pb } from '@xpla/xpla.proto/ibc/core/channel/v1/tx';

export class MsgChannelUpgradeCancel extends JSONSerializable<
  any,
  MsgChannelUpgradeCancel.Data,
  MsgChannelUpgradeCancel.Proto
> {
  public proof_error_receipt: Buffer;

  /**
   * @param port_id
   * @param channel_id
   * @param error_receipt
   * @param proof_error_receipt
   * @param proof_height
   * @param signer
   */
  constructor(
    public port_id: string,
    public channel_id: string,
    public error_receipt: ErrorReceipt | undefined,
    proof_error_receipt: Buffer | Uint8Array | number[] | string,
    public proof_height: Height | undefined,
    public signer: AccAddress,
  ) {
    super();
    this.proof_error_receipt = Convert.toBuffer(proof_error_receipt);
  }

  public static fromAmino(_: any, _isClassic?: boolean): MsgChannelUpgradeCancel {
    throw new Error('Amino not supported');
  }

  public toAmino(_?: boolean): any {
    throw new Error('Amino not supported');
  }

  public static fromData(
    data: MsgChannelUpgradeCancel.Data,
    _?: boolean
  ): MsgChannelUpgradeCancel {
    const {
      port_id,
      channel_id,
      error_receipt,
      proof_error_receipt,
      proof_height,
      signer,
    } = data;
    return new MsgChannelUpgradeCancel(
      port_id,
      channel_id,
      error_receipt ? ErrorReceipt.fromData(error_receipt) : undefined,
      proof_error_receipt,
      proof_height ? Height.fromData(proof_height) : undefined,
      signer,
    );
  }

  public toData(_?: boolean): MsgChannelUpgradeCancel.Data {
    const {
      port_id,
      channel_id,
      error_receipt,
      proof_error_receipt,
      proof_height,
      signer,
    } = this;
    return {
      '@type': '/ibc.core.channel.v1.MsgChannelUpgradeCancel',
      port_id,
      channel_id,
      error_receipt: error_receipt ? error_receipt.toData() : undefined,
      proof_error_receipt: proof_error_receipt.toString('base64'),
      proof_height: proof_height ? proof_height.toData() : undefined,
      signer,
    };
  }

  public static fromProto(
    proto: MsgChannelUpgradeCancel.Proto,
    _?: boolean
  ): MsgChannelUpgradeCancel {
    return new MsgChannelUpgradeCancel(
      proto.portId,
      proto.channelId,
      proto.errorReceipt ? ErrorReceipt.fromProto(proto.errorReceipt) : undefined,
      proto.proofErrorReceipt,
      proto.proofHeight ? Height.fromProto(proto.proofHeight) : undefined,
      proto.signer,
    );
  }

  public toProto(_?: boolean): MsgChannelUpgradeCancel.Proto {
    const {
      port_id,
      channel_id,
      error_receipt,
      proof_error_receipt,
      proof_height,
      signer,
    } = this;
    return MsgChannelUpgradeCancel_pb.fromPartial({
      portId: port_id,
      channelId: channel_id,
      errorReceipt: error_receipt ? error_receipt.toProto() : undefined,
      proofErrorReceipt: proof_error_receipt,
      proofHeight: proof_height ? proof_height.toProto() : undefined,
      signer,
    });
  }

  public packAny(_?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/ibc.core.channel.v1.MsgChannelUpgradeCancel',
      value: MsgChannelUpgradeCancel_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgChannelUpgradeCancel {
    return MsgChannelUpgradeCancel.fromProto(
      MsgChannelUpgradeCancel_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgChannelUpgradeCancel {
  export interface Data {
    '@type': '/ibc.core.channel.v1.MsgChannelUpgradeCancel';
    port_id: string;
    channel_id: string;
    error_receipt: ErrorReceipt.Data | undefined;
    proof_error_receipt: string; // base64
    proof_height: Height.Data | undefined;
    signer: AccAddress;
  }
  export type Proto = MsgChannelUpgradeCancel_pb;
}
