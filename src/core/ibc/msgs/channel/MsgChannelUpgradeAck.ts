/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { Convert } from '../../../../util/convert';
import { AccAddress } from '../../../bech32';
import { Height } from '../../core/client/Height';
import { Upgrade } from '../../core/channel/Upgrade';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgChannelUpgradeAck as MsgChannelUpgradeAck_pb } from '@xpla/xpla.proto/ibc/core/channel/v1/tx';

export class MsgChannelUpgradeAck extends JSONSerializable<
  any,
  MsgChannelUpgradeAck.Data,
  MsgChannelUpgradeAck.Proto
> {
  public proof_channel: Buffer;
  public proof_upgrade: Buffer;

  /**
   * @param port_id
   * @param channel_id
   * @param counterparty_upgrade
   * @param proof_channel
   * @param proof_upgrade
   * @param proof_height
   * @param signer
   */
  constructor(
    public port_id: string,
    public channel_id: string,
    public counterparty_upgrade: Upgrade | undefined,
    proof_channel: Buffer | Uint8Array | number[] | string,
    proof_upgrade: Buffer | Uint8Array | number[] | string,
    public proof_height: Height | undefined,
    public signer: AccAddress,
  ) {
    super();
    this.proof_channel = Convert.toBuffer(proof_channel);
    this.proof_upgrade = Convert.toBuffer(proof_upgrade);
  }

  public static fromAmino(_: any, _isClassic?: boolean): MsgChannelUpgradeAck {
    throw new Error('Amino not supported');
  }

  public toAmino(_?: boolean): any {
    throw new Error('Amino not supported');
  }

  public static fromData(
    data: MsgChannelUpgradeAck.Data,
    _?: boolean
  ): MsgChannelUpgradeAck {
    const {
      port_id,
      channel_id,
      counterparty_upgrade,
      proof_channel,
      proof_upgrade,
      proof_height,
      signer,
    } = data;
    return new MsgChannelUpgradeAck(
      port_id,
      channel_id,
      counterparty_upgrade
        ? Upgrade.fromData(counterparty_upgrade)
        : undefined,
      proof_channel,
      proof_upgrade,
      proof_height ? Height.fromData(proof_height) : undefined,
      signer,
    );
  }

  public toData(_?: boolean): MsgChannelUpgradeAck.Data {
    const {
      port_id,
      channel_id,
      counterparty_upgrade,
      proof_channel,
      proof_upgrade,
      proof_height,
      signer,
    } = this;
    return {
      '@type': '/ibc.core.channel.v1.MsgChannelUpgradeAck',
      port_id,
      channel_id,
      counterparty_upgrade: counterparty_upgrade
        ? counterparty_upgrade.toData()
        : undefined,
      proof_channel: proof_channel.toString('base64'),
      proof_upgrade: proof_upgrade.toString('base64'),
      proof_height: proof_height ? proof_height.toData() : undefined,
      signer,
    };
  }

  public static fromProto(
    proto: MsgChannelUpgradeAck.Proto,
    _?: boolean
  ): MsgChannelUpgradeAck {
    return new MsgChannelUpgradeAck(
      proto.portId,
      proto.channelId,
      proto.counterpartyUpgrade
        ? Upgrade.fromProto(proto.counterpartyUpgrade)
        : undefined,
      proto.proofChannel,
      proto.proofUpgrade,
      proto.proofHeight ? Height.fromProto(proto.proofHeight) : undefined,
      proto.signer,
    );
  }

  public toProto(_?: boolean): MsgChannelUpgradeAck.Proto {
    const {
      port_id,
      channel_id,
      counterparty_upgrade,
      proof_channel,
      proof_upgrade,
      proof_height,
      signer,
    } = this;
    return MsgChannelUpgradeAck_pb.fromPartial({
      portId: port_id,
      channelId: channel_id,
      counterpartyUpgrade: counterparty_upgrade
        ? counterparty_upgrade.toProto()
        : undefined,
      proofChannel: proof_channel,
      proofUpgrade: proof_upgrade,
      proofHeight: proof_height ? proof_height.toProto() : undefined,
      signer,
    });
  }

  public packAny(_?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/ibc.core.channel.v1.MsgChannelUpgradeAck',
      value: MsgChannelUpgradeAck_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgChannelUpgradeAck {
    return MsgChannelUpgradeAck.fromProto(
      MsgChannelUpgradeAck_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgChannelUpgradeAck {
  export interface Data {
    '@type': '/ibc.core.channel.v1.MsgChannelUpgradeAck';
    port_id: string;
    channel_id: string;
    counterparty_upgrade: Upgrade.Data | undefined;
    proof_channel: string; // base64
    proof_upgrade: string; // base64
    proof_height: Height.Data | undefined;
    signer: AccAddress;
  }
  export type Proto = MsgChannelUpgradeAck_pb;
}
