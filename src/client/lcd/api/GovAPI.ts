import { BaseAPI } from './BaseAPI';
import {
  ProposalV1,
  AccAddress,
  Coins,
  Dec,
  Int,
  Deposit,
  VoteV1,
  WeightedVoteOptionV1,
  Tx,
  GovParamsV1,
} from '../../../core';

import { APIParams, Pagination, PaginationOptions } from '../APIRequester';
import { TxSearchResult } from './TxAPI';
import { ProposalStatus } from '@xpla/xpla.proto/cosmos/gov/v1/gov';
import { LCDClient } from '../LCDClient';

export interface GovParams {
  deposit_params: DepositParams;
  voting_params: VotingParams;
  tally_params: TallyParams;
}

export interface DepositParams {
  min_deposit: Coins;
  max_deposit_period: number;
}

export interface VotingParams {
  voting_period: number;
}

export interface TallyParams {
  quorum: Dec;
  threshold: Dec;
  veto_threshold: Dec;
}

export interface Tally {
  yes: Int;
  no: Int;
  abstain: Int;
  no_with_veto: Int;
}

export namespace Tally {
  export interface Data {
    yes_count: string;
    no_count: string;
    abstain_count: string;
    no_with_veto_count: string;
  }
}

export class GovAPI extends BaseAPI {
  constructor(public lcd: LCDClient) {
    super(lcd.apiRequester);
  }

  /**
   * Gets all proposals.
   */
  public async proposals(
    params: Partial<PaginationOptions & APIParams> = {}
  ): Promise<[ProposalV1[], Pagination]> {
    return this.c
      .get<{
        proposals: ProposalV1.Data[];
        pagination: Pagination;
      }>(`/cosmos/gov/v1/proposals`, params)
      .then(d => [
        d.proposals.map(prop =>
          ProposalV1.fromData(prop, this.lcd.config.isClassic)
        ),
        d.pagination,
      ]);
  }

  /**
   * Get a specific proposal by its ID
   * @param proposalId proposal's ID
   */
  public async proposal(
    proposalId: number,
    params: APIParams = {}
  ): Promise<ProposalV1> {
    return this.c
      .get<{ proposal: ProposalV1.Data }>(
        `/cosmos/gov/v1/proposals/${proposalId}`,
        params
      )
      .then(d => ProposalV1.fromData(d.proposal));
  }

  /**
   * Get the proposal's proposer
   * @param proposalId proposal's ID
   */
  public async proposer(proposalId: number): Promise<AccAddress> {
    proposalId;
    const creationTx = await this.searchProposalCreationTx(proposalId);
    const msg = creationTx.body.messages.find(
      msg => msg['@type'] === '/cosmos.gov.v1.MsgSubmitProposal'
    );

    if (msg && msg['@type'] === '/cosmos.gov.v1.MsgSubmitProposal') {
      return msg.proposer;
    }

    throw Error('failed to fetch submit_proposer tx');
  }

  /**
   * Get the proposal's initial deposit
   * @param proposalId proposal's ID
   */
  public async initialDeposit(proposalId: number): Promise<Coins> {
    proposalId;
    const creationTx = await this.searchProposalCreationTx(proposalId);
    const msg = creationTx.body.messages.find(
      msg => msg['@type'] === '/cosmos.gov.v1.MsgSubmitProposal'
    );

    if (msg && msg['@type'] === '/cosmos.gov.v1.MsgSubmitProposal') {
      return Coins.fromData(msg.initial_deposit);
    }

    throw Error('failed to fetch submit_proposer tx');
  }

  /**
   * Get the deposits for a proposal
   * @param proposalId proposal's ID
   */
  public async deposits(
    proposalId: number,
    _params: Partial<PaginationOptions & APIParams> = {}
  ): Promise<[Deposit[], Pagination]> {
    proposalId;
    _params;
    const proposal = await this.proposal(proposalId);
    if (
      proposal.status === ProposalStatus.PROPOSAL_STATUS_DEPOSIT_PERIOD ||
      proposal.status === ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD
    ) {
      return this.c
        .get<{ deposits: Deposit.Data[]; pagination: Pagination }>(
          `/cosmos/gov/v1/proposals/${proposalId}/deposits`,
          _params
        )
        .then(d => [
          d.deposits.map(deposit => Deposit.fromData(deposit)),
          d.pagination,
        ]);
    }

    // build search params
    const params = new URLSearchParams();
    params.append('events', `message.action='/cosmos.gov.v1.MsgDeposit'`);
    params.append('events', `proposal_deposit.proposal_id=${proposalId}`);

    Object.entries(_params).forEach(v => {
      params.append(v[0], v[1] as string);
    });

    return this.c
      .get<TxSearchResult.Data>(`/cosmos/tx/v1beta1/txs`, params)
      .then(d => {
        const deposits: Deposit[] = [];
        d.txs.map(tx =>
          tx.body.messages.forEach(msg => {
            if (
              msg['@type'] === '/cosmos.gov.v1.MsgDeposit' &&
              Number.parseInt(msg.proposal_id) == proposalId
            ) {
              deposits.push(
                new Deposit(
                  proposalId,
                  msg.depositor,
                  Coins.fromData(msg.amount)
                )
              );
            }
          }, deposits)
        );
        return [deposits, d.pagination];
      });
  }

  public async searchProposalCreationTx(proposalId: number): Promise<Tx.Data> {
    // build search params
    const params = new URLSearchParams();
    params.append(
      'events',
      `message.action='/cosmos.gov.v1.MsgSubmitProposal'`
    );
    params.append('events', `submit_proposal.proposal_id=${proposalId}`);

    return this.c
      .get<TxSearchResult.Data>(`/cosmos/tx/v1beta1/txs`, params)
      .then(d => {
        if (d.tx_responses.length === 0) {
          throw Error('failed to fetch submit_proposer tx');
        }
        return d.txs[0];
      });
  }

  /**
   * Get the current votes for a proposal
   * @param proposalId proposal's ID
   */
  public async votes(
    proposalId: number,
    voter?: AccAddress,
    params: Partial<PaginationOptions & APIParams> = {}
  ): Promise<[VoteV1[], Pagination]> {
    proposalId;
    const proposal = await this.proposal(proposalId);
    if (proposal.status === ProposalStatus.PROPOSAL_STATUS_DEPOSIT_PERIOD) {
      if (voter !== undefined) {
        return this.c
          .get<{ vote: VoteV1.Data }>(
            `/cosmos/gov/v1/proposals/${proposalId}/votes/${voter}`,
            params
          )
          .then(d => [ [VoteV1.fromData(d.vote)], { next_key: null, total: 1 }]);
      }
      return this.c
        .get<{ votes: VoteV1.Data[]; pagination: Pagination }>(
          `/cosmos/gov/v1/proposals/${proposalId}/votes`,
          params
        )
        .then(d => [d.votes.map(v => VoteV1.fromData(v)), d.pagination]);
    }

    // build search params
    const txparams = new URLSearchParams();
    txparams.append('events', `message.action='/cosmos.gov.v1.MsgVote'`);
    txparams.append('events', `proposal_vote.proposal_id=${proposalId}`);
    if (voter !== undefined) {
      txparams.append('events', `proposal_vote.voter=${voter}`);
    }

    Object.entries(params).forEach(v => {
      txparams.append(v[0], v[1] as string);
    });

    return this.c
      .get<TxSearchResult.Data>(`/cosmos/tx/v1beta1/txs`, txparams)
      .then(d => {
        const votes: VoteV1[] = [];
        d.txs.map(tx =>
          tx.body.messages.forEach(msg => {
            if (
              msg['@type'] === '/cosmos.gov.v1.MsgVote' &&
              Number.parseInt(msg.proposal_id) == proposalId
            ) {
              votes.push(
                new VoteV1(
                  proposalId,
                  msg.voter,
                  [new WeightedVoteOptionV1(msg.option, '1')],
                  msg.metadata
                )
              );
            } else if (
              msg['@type'] === '/cosmos.gov.v1.MsgVoteWeighted' &&
              Number.parseInt(msg.proposal_id) == proposalId
            ) {
              votes.push(
                new VoteV1(
                  proposalId,
                  msg.voter,
                  msg.options.map((o: WeightedVoteOptionV1.Data) =>
                    WeightedVoteOptionV1.fromData(o)
                  ),
                  msg.metadata
                )
              );
            }
          }, votes)
        );

        return [votes, d.pagination];
      });
  }

  /**
   * Gets the current tally for a proposal.
   * @param proposalId proposal's ID
   */
  public async tally(
    proposalId: number,
    params: APIParams = {}
  ): Promise<Tally> {
    return this.c
      .get<{ tally: Tally.Data }>(
        `/cosmos/gov/v1/proposals/${proposalId}/tally`,
        params
      )
      .then(({ tally: d }) => ({
        yes: new Int(d.yes_count),
        no: new Int(d.no_count),
        no_with_veto: new Int(d.no_with_veto_count),
        abstain: new Int(d.abstain_count),
      }));
  }

  /** Gets the Gov module's current parameters  */
  public async parameters(params: APIParams = {}): Promise<GovParamsV1> {
    return this.c
      .get<{ params: any }>(`/cosmos/gov/v1/params/deposit`, params)
      .then(({ params: d }) => GovParamsV1.fromData(d));
  }

  /** Gets the Gov module's deposit parameters */
  public async depositParameters(
    params: APIParams = {}
  ): Promise<DepositParams> {
    const govparams = await this.parameters(params);
    return {
      max_deposit_period: govparams.max_deposit_period?.seconds.toNumber() ?? 0,
      min_deposit: govparams.min_deposit,
    };
  }

  /** Gets the Gov module's voting parameters */
  public async votingParameters(params: APIParams = {}): Promise<VotingParams> {
    const govparams = await this.parameters(params);
    return {
      voting_period: govparams.voting_period?.seconds.toNumber() ?? 0,
    };
  }

  /** Gets teh Gov module's tally parameters */
  public async tallyParameters(params: APIParams = {}): Promise<TallyParams> {
    const govparams = await this.parameters(params);
    return {
      quorum: new Dec(govparams.quorum),
      veto_threshold: new Dec(govparams.veto_threshold),
      threshold: new Dec(govparams.threshold),
    };
  }
}
