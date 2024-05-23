/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../util/json';
import { Coins } from '../../Coins';
import { Duration } from '@xpla/xpla.proto/google/protobuf/duration';
import { Params as GovParamsV1_pb } from '@xpla/xpla.proto/cosmos/gov/v1/gov';

export type Params = GovParamsV1;
export namespace Params {
  export type Amino = GovParamsV1.Amino;
  export type Data = GovParamsV1.Data;
  export type Proto = GovParamsV1.Proto;
}

export class GovParamsV1 extends JSONSerializable<
  GovParamsV1.Amino,
  GovParamsV1.Data,
  GovParamsV1.Proto
> {
  public minDeposit: Coins;

  /**
   * @param proposal_id defines the unique id of the proposal
   * @param voter is the voter address of the proposal
   * @param options is the weighted vote options
   * @param metadata is any  arbitrary metadata to attached to the vote
   */
  constructor(
    minDeposit: Coins.Input,
    public maxDepositPeriod: object | undefined,
    public votingPeriod: object | undefined,
    public quorum: string,
    public threshold: string,
    public vetoThreshold: string,
    public minInitialDepositRatio: string,
    public burnVoteQuorum: boolean,
    public burnProposalDepositPrevote: boolean,
    public burnVoteVeto: boolean
  ) {
    super();
    this.minDeposit = new Coins(minDeposit);
  }

  public static fromAmino(data: GovParamsV1.Amino, _?: boolean): GovParamsV1 {
    const {
      minDeposit,
      maxDepositPeriod,
      votingPeriod,
      quorum,
      threshold,
      vetoThreshold,
      minInitialDepositRatio,
      burnVoteQuorum,
      burnProposalDepositPrevote,
      burnVoteVeto,
    } = data;
    return new GovParamsV1(
      Coins.fromAmino(minDeposit),
      maxDepositPeriod,
      votingPeriod,
      quorum,
      threshold,
      vetoThreshold,
      minInitialDepositRatio,
      burnVoteQuorum,
      burnProposalDepositPrevote,
      burnVoteVeto
    );
  }

  public toAmino(_?: boolean): GovParamsV1.Amino {
    const {
      minDeposit,
      maxDepositPeriod,
      votingPeriod,
      quorum,
      threshold,
      vetoThreshold,
      minInitialDepositRatio,
      burnVoteQuorum,
      burnProposalDepositPrevote,
      burnVoteVeto,
    } = this;

    const res: GovParamsV1.Amino = {
      minDeposit: minDeposit.toAmino(),
      maxDepositPeriod,
      votingPeriod,
      quorum,
      threshold,
      vetoThreshold,
      minInitialDepositRatio,
      burnVoteQuorum,
      burnProposalDepositPrevote,
      burnVoteVeto,
    };

    return res;
  }

  public static fromData(data: GovParamsV1.Data, _?: boolean): GovParamsV1 {
    const {
      minDeposit,
      maxDepositPeriod,
      votingPeriod,
      quorum,
      threshold,
      vetoThreshold,
      minInitialDepositRatio,
      burnVoteQuorum,
      burnProposalDepositPrevote,
      burnVoteVeto,
    } = data;
    return new GovParamsV1(
      Coins.fromData(minDeposit),
      maxDepositPeriod,
      votingPeriod,
      quorum,
      threshold,
      vetoThreshold,
      minInitialDepositRatio,
      burnVoteQuorum,
      burnProposalDepositPrevote,
      burnVoteVeto
    );
  }

  public toData(_?: boolean): GovParamsV1.Data {
    const {
      minDeposit,
      maxDepositPeriod,
      votingPeriod,
      quorum,
      threshold,
      vetoThreshold,
      minInitialDepositRatio,
      burnVoteQuorum,
      burnProposalDepositPrevote,
      burnVoteVeto,
    } = this;

    const res: GovParamsV1.Data = {
      '@type': '/cosmos.gov.v1.Params',
      minDeposit: minDeposit.toData(),
      maxDepositPeriod,
      votingPeriod,
      quorum,
      threshold,
      vetoThreshold,
      minInitialDepositRatio,
      burnVoteQuorum,
      burnProposalDepositPrevote,
      burnVoteVeto,
    };

    return res;
  }

  public static fromProto(proto: GovParamsV1.Proto, _?: boolean): GovParamsV1 {
    return new GovParamsV1(
      Coins.fromProto(proto.minDeposit),
      proto.maxDepositPeriod
        ? (Duration.toJSON(proto.maxDepositPeriod) as object)
        : undefined,
      proto.votingPeriod
        ? (Duration.toJSON(proto.votingPeriod) as object)
        : undefined,
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
      minDeposit,
      maxDepositPeriod,
      votingPeriod,
      quorum,
      threshold,
      vetoThreshold,
      minInitialDepositRatio,
      burnVoteQuorum,
      burnProposalDepositPrevote,
      burnVoteVeto,
    } = this;
    return GovParamsV1_pb.fromPartial({
      minDeposit: minDeposit.toProto(),
      maxDepositPeriod: maxDepositPeriod
        ? Duration.fromJSON(maxDepositPeriod)
        : undefined,
      votingPeriod: votingPeriod ? Duration.fromJSON(votingPeriod) : undefined,
      quorum,
      threshold,
      vetoThreshold,
      minInitialDepositRatio,
      burnVoteQuorum,
      burnProposalDepositPrevote,
      burnVoteVeto,
    });
  }
}

export namespace GovParamsV1 {
  export interface Amino {
    minDeposit: Coins.Amino;
    maxDepositPeriod: object | undefined;
    votingPeriod: object | undefined;
    quorum: string;
    threshold: string;
    vetoThreshold: string;
    minInitialDepositRatio: string;
    burnVoteQuorum: boolean;
    burnProposalDepositPrevote: boolean;
    burnVoteVeto: boolean;
  }

  export interface Data {
    '@type': '/cosmos.gov.v1.Params';
    minDeposit: Coins.Data;
    maxDepositPeriod: object | undefined;
    votingPeriod: object | undefined;
    quorum: string;
    threshold: string;
    vetoThreshold: string;
    minInitialDepositRatio: string;
    burnVoteQuorum: boolean;
    burnProposalDepositPrevote: boolean;
    burnVoteVeto: boolean;
  }

  export type Proto = GovParamsV1_pb;
}
