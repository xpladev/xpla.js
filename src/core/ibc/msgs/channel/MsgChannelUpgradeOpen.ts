/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { Convert } from '../../../../util/convert';
import { Int, Numeric } from '../../../../core/numeric';
import { AccAddress } from '../../../bech32';
import { Height } from '../../core/client/Height';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { State, stateFromJSON, stateToJSON } from '@xpla/xpla.proto/ibc/core/channel/v1/channel';
import { MsgChannelUpgradeOpen as MsgChannelUpgradeOpen_pb } from '@xpla/xpla.proto/ibc/core/channel/v1/tx';

export class MsgChannelUpgradeOpen extends JSONSerializable<
  any,
  MsgChannelUpgradeOpen.Data,
  MsgChannelUpgradeOpen.Proto
> {
  public counterparty_upgrade_sequence: Int;
  public proof_channel: Buffer;

  /**
   * @param port_id
   * @param channel_id
   * @param counterparty_channel_state
   * @param counterparty_channel_sequence
   * @param proof_channel
   * @param proof_height
   * @param signer
   */
  constructor(
    public port_id: string,
    public channel_id: string,
    public counterparty_channel_state: State,
    counterparty_upgrade_sequence: Numeric.Input,
    proof_channel: Buffer | Uint8Array | number[] | string,
    public proof_height: Height | undefined,
    public signer: AccAddress,
  ) {
    super();
    this.counterparty_upgrade_sequence = new Int(counterparty_upgrade_sequence);
    this.proof_channel = Convert.toBuffer(proof_channel);
  }

  public static fromAmino(_: any, _isClassic?: boolean): MsgChannelUpgradeOpen {
    throw new Error('Amino not supported');
  }

  public toAmino(_?: boolean): any {
    throw new Error('Amino not supported');
  }

  public static fromData(
    data: MsgChannelUpgradeOpen.Data,
    _?: boolean
  ): MsgChannelUpgradeOpen {
    const {
      port_id,
      channel_id,
      counterparty_channel_state,
      counterparty_upgrade_sequence,
      proof_channel,
      proof_height,
      signer,
    } = data;
    return new MsgChannelUpgradeOpen(
      port_id,
      channel_id,
      stateFromJSON(counterparty_channel_state),
      counterparty_upgrade_sequence,
      proof_channel,
      proof_height ? Height.fromData(proof_height) : undefined,
      signer,
    );
  }

  public toData(_?: boolean): MsgChannelUpgradeOpen.Data {
    const {
      port_id,
      channel_id,
      counterparty_channel_state,
      counterparty_upgrade_sequence,
      proof_channel,
      proof_height,
      signer,
    } = this;
    return {
      '@type': '/ibc.core.channel.v1.MsgChannelUpgradeOpen',
      port_id,
      channel_id,
      counterparty_channel_state: stateToJSON(counterparty_channel_state),
      counterparty_upgrade_sequence: counterparty_upgrade_sequence.toFixed(),
      proof_channel: proof_channel.toString('base64'),
      proof_height: proof_height ? proof_height.toData() : undefined,
      signer,
    };
  }

  public static fromProto(
    proto: MsgChannelUpgradeOpen.Proto,
    _?: boolean
  ): MsgChannelUpgradeOpen {
    return new MsgChannelUpgradeOpen(
      proto.portId,
      proto.channelId,
      proto.counterpartyChannelState,
      proto.counterpartyUpgradeSequence.toString(),
      proto.proofChannel,
      proto.proofHeight ? Height.fromProto(proto.proofHeight) : undefined,
      proto.signer,
    );
  }

  public toProto(_?: boolean): MsgChannelUpgradeOpen.Proto {
    const {
      port_id,
      channel_id,
      counterparty_channel_state,
      counterparty_upgrade_sequence,
      proof_channel,
      proof_height,
      signer,
    } = this;
    return MsgChannelUpgradeOpen_pb.fromPartial({
      portId: port_id,
      channelId: channel_id,
      counterpartyChannelState: counterparty_channel_state,
      counterpartyUpgradeSequence: counterparty_upgrade_sequence.toFixed(),
      proofChannel: proof_channel,
      proofHeight: proof_height ? proof_height.toProto() : undefined,
      signer,
    });
  }

  public packAny(_?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/ibc.core.channel.v1.MsgChannelUpgradeOpen',
      value: MsgChannelUpgradeOpen_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgChannelUpgradeOpen {
    return MsgChannelUpgradeOpen.fromProto(
      MsgChannelUpgradeOpen_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgChannelUpgradeOpen {
  export interface Data {
    '@type': '/ibc.core.channel.v1.MsgChannelUpgradeOpen';
    port_id: string;
    channel_id: string;
    counterparty_channel_state: string;
    counterparty_upgrade_sequence: string;
    proof_channel: string; // base64
    proof_height: Height.Data | undefined;
    signer: AccAddress;
  }
  export type Proto = MsgChannelUpgradeOpen_pb;
}
