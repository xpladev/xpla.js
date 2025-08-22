import { Coins, RewardParamsV1B1 } from '../../../core';
import { APIParams } from '../APIRequester';
import { LCDClient } from '../LCDClient';
import { BaseAPI } from './BaseAPI';
import { BurnProposal } from '../../../core/xpla/v1beta1/proposals';

export class XplaAPI extends BaseAPI {
  constructor(public lcd: LCDClient) {
    super(lcd.apiRequester);
  }

  public async rewardPool(params: APIParams = {}): Promise<Coins> {
    return this.c.get<{ pool: any[] }>('/xpla/reward/v1beta1/pool', params)
      .then(d => Coins.fromData(d.pool));
  }

  public async volunteerValidators(params: APIParams = {}): Promise<string[]> {
    return this.c.get<{ volunteer_validators: string[] }>('/xpla/volunteer/v1beta1/validators', params)
      .then(d => d.volunteer_validators);
  }

  public async burnOngoingProposal(
    proposal_id: number,
    params: APIParams = {},
  ): Promise<BurnProposal> {
    params = { ...params, proposal_id };
    return this.c.get<BurnProposal.Data>(`/xpla/burn/v1beta1/ongoing_proposal`, params)
      .then(d => {
        const b = BurnProposal.fromData(d);
        b.proposal_id = proposal_id;
        return b;
      });
  }

  public async burnOngoingProposals(params: APIParams = {}): Promise<BurnProposal[]> {
    return this.c.get<{ proposals: BurnProposal.Data[] }>('/xpla/burn/v1beta1/ongoing_proposals', params)
      .then(d => d.proposals.map(p => BurnProposal.fromData(p)));
  }

  /**
   * Gets the current xpla reward module's parameters.
   */
  public async parameters(
    module = 'reward',
    params: APIParams = {}
  ): Promise<RewardParamsV1B1 | any> {
    return this.c
      .get<{ params: any }>(`/xpla/${module}/v1beta1/params`, params)
      .then(({ params: d }) => {
        if (d?.reward_distribute_account) {
          return RewardParamsV1B1.fromData(d);
        }
        return d;
      });
  }
}
