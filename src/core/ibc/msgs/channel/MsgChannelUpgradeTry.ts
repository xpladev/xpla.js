/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { Convert } from '../../../../util/convert';
import { Int, Numeric } from '../../../../core/numeric';
import { AccAddress } from '../../../bech32';
import { Height } from '../../core/client/Height';
import { UpgradeFields } from '../../core/channel/Upgrade';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgChannelUpgradeTry as MsgChannelUpgradeTry_pb } from '@xpla/xpla.proto/ibc/core/channel/v1/tx';

export class MsgChannelUpgradeTry extends JSONSerializable<
  any,
  MsgChannelUpgradeTry.Data,
  MsgChannelUpgradeTry.Proto
> {
  public counterparty_upgrade_sequence: Int;
  public proof_channel: Buffer;
  public proof_upgrade: Buffer;

  /**
   * @param port_id
   * @param channel_id
   * @param proposed_upgrade_connection_hops
   * @param counterparty_upgrade_fields
   * @param counterparty_upgrade_sequence
   * @param proof_channel
   * @param proof_upgrade
   * @param proof_height
   * @param signer
   */
  constructor(
    public port_id: string,
    public channel_id: string,
    public proposed_upgrade_connection_hops: string[],
    public counterparty_upgrade_fields: UpgradeFields | undefined,
    counterparty_upgrade_sequence: Numeric.Input,
    proof_channel: Buffer | Uint8Array | number[] | string,
    proof_upgrade: Buffer | Uint8Array | number[] | string,
    public proof_height: Height | undefined,
    public signer: AccAddress,
  ) {
    super();
    this.counterparty_upgrade_sequence = new Int(counterparty_upgrade_sequence);
    this.proof_channel = Convert.toBuffer(proof_channel);
    this.proof_upgrade = Convert.toBuffer(proof_upgrade);
  }

  public static fromAmino(_: any, _isClassic?: boolean): MsgChannelUpgradeTry {
    throw new Error('Amino not supported');
  }

  public toAmino(_?: boolean): any {
    throw new Error('Amino not supported');
  }

  public static fromData(
    data: MsgChannelUpgradeTry.Data,
    _?: boolean
  ): MsgChannelUpgradeTry {
    const {
      port_id,
      channel_id,
      proposed_upgrade_connection_hops,
      counterparty_upgrade_fields,
      counterparty_upgrade_sequence,
      proof_channel,
      proof_upgrade,
      proof_height,
      signer,
    } = data;
    return new MsgChannelUpgradeTry(
      port_id,
      channel_id,
      proposed_upgrade_connection_hops,
      counterparty_upgrade_fields
        ? UpgradeFields.fromData(counterparty_upgrade_fields)
        : undefined,
      counterparty_upgrade_sequence,
      proof_channel,
      proof_upgrade,
      proof_height ? Height.fromData(proof_height) : undefined,
      signer,
    );
  }

  public toData(_?: boolean): MsgChannelUpgradeTry.Data {
    const {
      port_id,
      channel_id,
      proposed_upgrade_connection_hops,
      counterparty_upgrade_fields,
      counterparty_upgrade_sequence,
      proof_channel,
      proof_upgrade,
      proof_height,
      signer,
    } = this;
    return {
      '@type': '/ibc.core.channel.v1.MsgChannelUpgradeTry',
      port_id,
      channel_id,
      proposed_upgrade_connection_hops,
      counterparty_upgrade_fields: counterparty_upgrade_fields
        ? counterparty_upgrade_fields.toData()
        : undefined,
      counterparty_upgrade_sequence: counterparty_upgrade_sequence.toString(),
      proof_channel: proof_channel.toString('base64'),
      proof_upgrade: proof_upgrade.toString('base64'),
      proof_height: proof_height ? proof_height.toData() : undefined,
      signer,
    };
  }

  public static fromProto(
    proto: MsgChannelUpgradeTry.Proto,
    _?: boolean
  ): MsgChannelUpgradeTry {
    return new MsgChannelUpgradeTry(
      proto.portId,
      proto.channelId,
      proto.proposedUpgradeConnectionHops,
      proto.counterpartyUpgradeFields
        ? UpgradeFields.fromProto(proto.counterpartyUpgradeFields)
        : undefined,
      proto.counterpartyUpgradeSequence.toString(),
      proto.proofChannel,
      proto.proofUpgrade,
      proto.proofHeight ? Height.fromProto(proto.proofHeight) : undefined,
      proto.signer,
    );
  }

  public toProto(_?: boolean): MsgChannelUpgradeTry.Proto {
    const {
      port_id,
      channel_id,
      proposed_upgrade_connection_hops,
      counterparty_upgrade_fields,
      counterparty_upgrade_sequence,
      proof_channel,
      proof_upgrade,
      proof_height,
      signer,
    } = this;
    return MsgChannelUpgradeTry_pb.fromPartial({
      portId: port_id,
      channelId: channel_id,
      proposedUpgradeConnectionHops: proposed_upgrade_connection_hops,
      counterpartyUpgradeFields: counterparty_upgrade_fields
        ? counterparty_upgrade_fields.toProto()
        : undefined,
      counterpartyUpgradeSequence: counterparty_upgrade_sequence.toFixed(),
      proofChannel: proof_channel,
      proofUpgrade: proof_upgrade,
      proofHeight: proof_height ? proof_height.toProto() : undefined,
      signer,
    });
  }

  public packAny(_?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/ibc.core.channel.v1.MsgChannelUpgradeTry',
      value: MsgChannelUpgradeTry_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgChannelUpgradeTry {
    return MsgChannelUpgradeTry.fromProto(
      MsgChannelUpgradeTry_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgChannelUpgradeTry {
  export interface Data {
    '@type': '/ibc.core.channel.v1.MsgChannelUpgradeTry';
    port_id: string;
    channel_id: string;
    proposed_upgrade_connection_hops: string[];
    counterparty_upgrade_fields: UpgradeFields.Data | undefined;
    counterparty_upgrade_sequence: string;
    proof_channel: string; // base64
    proof_upgrade: string; // base64
    proof_height: Height.Data | undefined;
    signer: AccAddress;
  }
  export type Proto = MsgChannelUpgradeTry_pb;
}
