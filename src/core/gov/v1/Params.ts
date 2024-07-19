/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../util/json';
import { Coins } from '../../Coins';
import { Dec, Numeric } from '../../numeric';
import { Duration } from '../../../core/Duration';
import { Params as GovParamsV1_pb } from '@xpla/xpla.proto/cosmos/gov/v1/gov';

export class GovParamsV1 extends JSONSerializable<
  GovParamsV1.Amino,
  GovParamsV1.Data,
  GovParamsV1.Proto
> {
  public min_deposit: Coins;
  public quorum: Dec;
  public threshold: Dec;
  public veto_threshold: Dec;
  public min_initial_deposit_ratio: Dec;

  /**
   * @param min_deposit Minimum deposit for a proposal to enter voting period
   * @param max_deposit_period Maximum period for Atom holders to deposit on a proposal. Initial value: 2 months
   * @param voting_period Duration of the voting period
   * @param quorum Minimum percentage of total stake needed to vote for a result to be considered valid
   * @param threshold Minimum proportion of Yes votes for proposal to pass. Default value: 0.5
   * @param veto_threshold Minimum value of Veto votes to Total votes ratio for proposal to be vetoed. Default value: 1/3
   * @param min_initial_deposit_ratio The ratio representing the proportion of the deposit value that must be paid at proposal submission
   * @param burn_vote_quorum burn deposits if a proposal does not meet quorum
   * @param burn_proposal_deposit_prevote burn deposits if the proposal does not enter voting period
   * @param burn_vote_veto burn deposits if quorum with vote type no_veto is met
   */
  constructor(
    min_deposit: Coins.Input,
    public max_deposit_period: Duration | undefined,
    public voting_period: Duration | undefined,
    quorum: Numeric.Input,
    threshold: Numeric.Input,
    veto_threshold: Numeric.Input,
    min_initial_deposit_ratio: Numeric.Input,
    public burn_vote_quorum: boolean,
    public burn_proposal_deposit_prevote: boolean,
    public burn_vote_veto: boolean
  ) {
    super();
    this.min_deposit = new Coins(min_deposit);
    this.quorum = new Dec(quorum);
    this.threshold = new Dec(threshold);
    this.veto_threshold = new Dec(veto_threshold);
    this.min_initial_deposit_ratio = new Dec(min_initial_deposit_ratio);
  }

  public static fromAmino(data: GovParamsV1.Amino, _?: boolean): GovParamsV1 {
    const {
      min_deposit,
      max_deposit_period,
      voting_period,
      quorum,
      threshold,
      veto_threshold,
      min_initial_deposit_ratio,
      burn_vote_quorum,
      burn_proposal_deposit_prevote,
      burn_vote_veto,
    } = data;
    return new GovParamsV1(
      Coins.fromAmino(min_deposit),
      max_deposit_period ? Duration.fromAmino(max_deposit_period) : undefined,
      voting_period ? Duration.fromAmino(voting_period) : undefined,
      quorum ?? '',
      threshold ?? '',
      veto_threshold ?? '',
      min_initial_deposit_ratio ?? '',
      burn_vote_quorum ?? false,
      burn_proposal_deposit_prevote ?? false,
      burn_vote_veto ?? false
    );
  }

  public toAmino(_?: boolean): GovParamsV1.Amino {
    const {
      min_deposit,
      max_deposit_period,
      voting_period,
      quorum,
      threshold,
      veto_threshold,
      min_initial_deposit_ratio,
      burn_vote_quorum,
      burn_proposal_deposit_prevote,
      burn_vote_veto,
    } = this;

    const res: GovParamsV1.Amino = {
      min_deposit: min_deposit.toAmino(),
      max_deposit_period: max_deposit_period
        ? max_deposit_period.toAmino()
        : undefined,
      voting_period: voting_period ? voting_period.toAmino() : undefined,
      quorum: quorum.toFixed(),
      threshold: threshold.toFixed(),
      veto_threshold: veto_threshold.toFixed(),
      min_initial_deposit_ratio: min_initial_deposit_ratio.toFixed(),
      burn_vote_quorum: burn_vote_quorum ? burn_vote_quorum : undefined,
      burn_proposal_deposit_prevote: burn_proposal_deposit_prevote
        ? burn_proposal_deposit_prevote
        : undefined,
      burn_vote_veto: burn_vote_veto ? burn_vote_veto : undefined,
    };

    return res;
  }

  public static fromData(data: GovParamsV1.Data, _?: boolean): GovParamsV1 {
    const {
      min_deposit,
      max_deposit_period,
      voting_period,
      quorum,
      threshold,
      veto_threshold,
      min_initial_deposit_ratio,
      burn_vote_quorum,
      burn_proposal_deposit_prevote,
      burn_vote_veto,
    } = data;
    return new GovParamsV1(
      Coins.fromData(min_deposit),
      max_deposit_period ? Duration.fromData(max_deposit_period) : undefined,
      voting_period ? Duration.fromData(voting_period) : undefined,
      quorum,
      threshold,
      veto_threshold,
      min_initial_deposit_ratio,
      burn_vote_quorum,
      burn_proposal_deposit_prevote,
      burn_vote_veto
    );
  }

  public toData(_?: boolean): GovParamsV1.Data {
    const {
      min_deposit,
      max_deposit_period,
      voting_period,
      quorum,
      threshold,
      veto_threshold,
      min_initial_deposit_ratio,
      burn_vote_quorum,
      burn_proposal_deposit_prevote,
      burn_vote_veto,
    } = this;

    const res: GovParamsV1.Data = {
      '@type': '/cosmos.gov.v1.Params',
      min_deposit: min_deposit.toData(),
      max_deposit_period: max_deposit_period
        ? max_deposit_period.toData()
        : undefined,
      voting_period: voting_period ? voting_period.toData() : undefined,
      quorum: quorum.toFixed(),
      threshold: threshold.toFixed(),
      veto_threshold: veto_threshold.toFixed(),
      min_initial_deposit_ratio: min_initial_deposit_ratio.toFixed(),
      burn_vote_quorum,
      burn_proposal_deposit_prevote,
      burn_vote_veto,
    };

    return res;
  }

  public static fromProto(proto: GovParamsV1.Proto, _?: boolean): GovParamsV1 {
    return new GovParamsV1(
      Coins.fromProto(proto.minDeposit),
      proto.maxDepositPeriod
        ? Duration.fromProto(proto.maxDepositPeriod)
        : undefined,
      proto.votingPeriod ? Duration.fromProto(proto.votingPeriod) : undefined,
      proto.quorum,
      proto.threshold,
      proto.vetoThreshold,
      proto.minInitialDepositRatio,
      proto.burnVoteQuorum,
      proto.burnProposalDepositPrevote,
      proto.burnVoteVeto
    );
  }

  public toProto(_?: boolean): GovParamsV1.Proto {
    const {
      min_deposit,
      max_deposit_period,
      voting_period,
      quorum,
      threshold,
      veto_threshold,
      min_initial_deposit_ratio,
      burn_vote_quorum,
      burn_proposal_deposit_prevote,
      burn_vote_veto,
    } = this;
    return GovParamsV1_pb.fromPartial({
      minDeposit: min_deposit.toProto(),
      maxDepositPeriod: max_deposit_period
        ? max_deposit_period.toProto()
        : undefined,
      votingPeriod: voting_period ? voting_period.toProto() : undefined,
      quorum: quorum.toFixed(),
      threshold: threshold.toFixed(),
      vetoThreshold: veto_threshold.toFixed(),
      minInitialDepositRatio: min_initial_deposit_ratio.toFixed(),
      burnVoteQuorum: burn_vote_quorum,
      burnProposalDepositPrevote: burn_proposal_deposit_prevote,
      burnVoteVeto: burn_vote_veto,
    });
  }
}

export namespace GovParamsV1 {
  export interface Amino {
    min_deposit: Coins.Amino;
    max_deposit_period: string | undefined;
    voting_period: string | undefined;
    quorum: string | undefined;
    threshold: string | undefined;
    veto_threshold: string | undefined;
    min_initial_deposit_ratio: string | undefined;
    burn_vote_quorum: boolean | undefined;
    burn_proposal_deposit_prevote: boolean | undefined;
    burn_vote_veto: boolean | undefined;
  }

  export interface Data {
    '@type': '/cosmos.gov.v1.Params';
    min_deposit: Coins.Data;
    max_deposit_period: object | undefined;
    voting_period: object | undefined;
    quorum: string;
    threshold: string;
    veto_threshold: string;
    min_initial_deposit_ratio: string;
    burn_vote_quorum: boolean;
    burn_proposal_deposit_prevote: boolean;
    burn_vote_veto: boolean;
  }

  export type Proto = GovParamsV1_pb;
}
