import { BaseAPI } from './BaseAPI';
import { APIParams, Pagination, PaginationOptions } from '../APIRequester';
import { LCDClient } from '../LCDClient';
import { AccAddress, Coins } from '../../../core';
import { Counterparty as PortChannel, PacketId } from '../../../core/ibc/core/channel';

export interface PacketFee {
  fee: {
    ack_fee: Coins;
    recv_fee: Coins;
    timeout_fee: Coins;
  };
  refund_address: AccAddress;
  relayers: string[];
}
export namespace PacketFee {
  export function fromAny(d: any): PacketFee {
    return {
      fee: {
        ack_fee: Coins.fromData(d.fee?.ack_fee ?? []),
        recv_fee: Coins.fromData(d.fee?.recv_fee ?? []),
        timeout_fee: Coins.fromData(d.fee?.timeout_fee ?? []),
      },
      refund_address: d.refund_address ?? '',
      relayers: d.relayers ?? [],
    };
  }
}

export interface IncentivizedPacket {
  packet_fees: PacketFee[];
  packet_id: PacketId;
}
export namespace IncentivizedPacket {
  export function fromAny(d: any): IncentivizedPacket {
    return {
      packet_fees: d.packet_fees?.map((f: any) => PacketFee.fromAny(f)) ?? [],
      packet_id: PacketId.fromData(d.packet_id),
    };
  }
}

export class IbcFeeAPI extends BaseAPI {
  constructor(public lcd: LCDClient) {
    super(lcd.apiRequester);
  }

  public async feeEnabled(
    port_channel: PortChannel,
    params: APIParams = {}
  ): Promise<boolean> {
    return this.c
      .get<{ fee_enabled: boolean; }>(
        `/ibc/apps/fee/v1/channels/${port_channel.channel_id}/ports/${port_channel.port_id}/fee_enabled`,
        params
      )
      .then(d => d.fee_enabled);
  }

  public async feeEnabledChannels(
    params: Partial<PaginationOptions & APIParams> = {}
  ): Promise<[PortChannel[], Pagination]> {
    return this.c
      .get<{ fee_enabled_channels: PortChannel[]; pagination: Pagination }>(
        '/ibc/apps/fee/v1/fee_enabled',
        params
      )
      .then(d => [d.fee_enabled_channels, d.pagination]);
  }

  public async incentivizedPackets(
    port_channel?: PortChannel,
    params: Partial<PaginationOptions & APIParams> = {}
  ): Promise<[IncentivizedPacket[], Pagination]> {
    let endpoint = '/ibc/apps/fee/v1/incentivized_packets';
    if (port_channel) {
      endpoint = `/ibc/apps/fee/v1/channels/${port_channel.channel_id}/ports/${port_channel.port_id}/incentivized_packets`;
    }
    return this.c
      .get<{ incentivized_packets: any[]; pagination: Pagination }>( endpoint, params )
      .then(d => ([
        d.incentivized_packets.map(p => IncentivizedPacket.fromAny(p)),
        d.pagination,
      ]));
  }

  public async incentivizedPacket(
    packet_id: PacketId,
    params: Partial<{ query_height: number } & APIParams> = {}
  ): Promise<IncentivizedPacket> {
    return this.c
      .get<{ incentivized_packet: any; }>(
        `/ibc/apps/fee/v1/channels/${packet_id.channel_id}/ports/${packet_id.port_id}/sequences/${packet_id.sequence}/incentivized_packet`,
        params
      )
      .then(({ incentivized_packet: d }) => IncentivizedPacket.fromAny(d));
  }

  public async totalAckFees(
    packet_id: PacketId,
    params: Partial<{ query_height: number } & APIParams> = {}
  ): Promise<Coins> {
    return this.c
      .get<{ ack_fees: { amount: string, denom: string }[]; }>(
        `/ibc/apps/fee/v1/channels/${packet_id.channel_id}/ports/${packet_id.port_id}/sequences/${packet_id.sequence}/total_ack_fees`,
        params
      )
      .then(({ ack_fees: d }) => Coins.fromData(d));
  }

  public async totalRecvFees(
    packet_id: PacketId,
    params: Partial<{ query_height: number } & APIParams> = {}
  ): Promise<Coins> {
    return this.c
      .get<{ recv_fees: { amount: string, denom: string }[]; }>(
        `/ibc/apps/fee/v1/channels/${packet_id.channel_id}/ports/${packet_id.port_id}/sequences/${packet_id.sequence}/total_recv_fees`,
        params
      )
      .then(({ recv_fees: d }) => Coins.fromData(d));
  }

  public async totalTimeoutFees(
    packet_id: PacketId,
    params: Partial<{ query_height: number } & APIParams> = {}
  ): Promise<Coins> {
    return this.c
      .get<{ timeout_fees: { amount: string, denom: string }[]; }>(
        `/ibc/apps/fee/v1/channels/${packet_id.channel_id}/ports/${packet_id.port_id}/sequences/${packet_id.sequence}/total_timeout_fees`,
        params
      )
      .then(({ timeout_fees: d }) => Coins.fromData(d));
  }

  public async counterpartyPayee(
    channel_id: string,
    relayer: string,
    params: APIParams = {}
  ): Promise<string> {
    return this.c
      .get<{ counterparty_payee: string; }>(
        `/ibc/apps/fee/v1/channels/${channel_id}/relayers/${relayer}/counterparty_payee`,
        params
      )
      .then(d => d.counterparty_payee);
  }

  public async payeeAddress(
    channel_id: string,
    relayer: string,
    params: APIParams = {}
  ): Promise<string> {
    return this.c
      .get<{ payee_address: string; }>(
        `/ibc/apps/fee/v1/channels/${channel_id}/relayers/${relayer}/payee`,
        params
      )
      .then(d => d.payee_address);
  }
}
