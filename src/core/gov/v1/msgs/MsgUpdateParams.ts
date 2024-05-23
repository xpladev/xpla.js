/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Coins } from '../../../Coins';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { Duration } from '@xpla/xpla.proto/google/protobuf/duration';
import { Params } from '@xpla/xpla.proto/cosmos/gov/v1/gov';
import { MsgUpdateParams as MsgUpdateGovParamsV1_pb } from '@xpla/xpla.proto/cosmos/gov/v1/tx';

export class MsgUpdateGovParamsV1 extends JSONSerializable<
  MsgUpdateGovParamsV1.Amino,
  MsgUpdateGovParamsV1.Data,
  MsgUpdateGovParamsV1.Proto
> {
  public minDeposit: Coins;

  /**
   * @param authority is the address that controls the module (defaults to x/gov unless overwritten)
   * @param minDeposit minimum deposit for a proposal to enter voting period
   * @param maxDepositPeriod maximum period for Atom holders to deposit on a proposal. Initial value: 2 months
   * @param votingPeriod duration of the voting period
   * @param quorum minimum percentage of total stake needed to vote for a result to be considered valid
   * @param threshold minimum proportion of Yes votes for proposal to pass. Default value: 0.5
   * @param vetoThreshold minimum value of Veto votes to Total votes ratio for proposal to be vetoed. Default value: 1/3
   * @param minInitialDepositRatio the ratio representing the proportion of the deposit value that must be paid at proposal submission
   * @param burnVoteQuorum burn deposits if a proposal does not meet quorum
   * @param burnProposalDepositPrevote burn deposits if the proposal does not enter voting period
   * @param burnVoteVeto burn deposits if quorum with vote type no_veto is met
   */
  constructor(
    public authority: AccAddress,
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

  public static fromAmino(
    data: MsgUpdateGovParamsV1.Amino,
    _isClassic?: boolean
  ): MsgUpdateGovParamsV1 {
    const {
      value: {
        authority,
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
      },
    } = data;
    return new MsgUpdateGovParamsV1(
      authority,
      Coins.fromAmino(minDeposit),
      maxDepositPeriod
        ? (Duration.toJSON(Duration.fromJSON(maxDepositPeriod)) as object)
        : undefined,
      votingPeriod
        ? (Duration.toJSON(Duration.fromJSON(votingPeriod)) as object)
        : undefined,
      quorum,
      threshold,
      vetoThreshold,
      minInitialDepositRatio,
      burnVoteQuorum,
      burnProposalDepositPrevote,
      burnVoteVeto
    );
  }

  public toAmino(isClassic?: boolean): MsgUpdateGovParamsV1.Amino {
    const {
      authority,
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
    return {
      type: isClassic
        ? 'gov/MsgUpdateParamsV1'
        : 'cosmos-sdk/MsgUpdateGovParamsV1',
      value: {
        authority,
        minDeposit: minDeposit.toAmino(),
        maxDepositPeriod: maxDepositPeriod
          ? (Duration.toJSON(Duration.fromJSON(maxDepositPeriod)) as object)
          : undefined,
        votingPeriod: votingPeriod
          ? (Duration.toJSON(Duration.fromJSON(votingPeriod)) as object)
          : undefined,
        quorum,
        threshold,
        vetoThreshold,
        minInitialDepositRatio,
        burnVoteQuorum,
        burnProposalDepositPrevote,
        burnVoteVeto,
      },
    };
  }

  public static fromData(
    data: MsgUpdateGovParamsV1.Data,
    _isClassic?: boolean
  ): MsgUpdateGovParamsV1 {
    const {
      authority,
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
    return new MsgUpdateGovParamsV1(
      authority,
      Coins.fromData(minDeposit),
      maxDepositPeriod
        ? (Duration.toJSON(Duration.fromJSON(maxDepositPeriod)) as object)
        : undefined,
      votingPeriod
        ? (Duration.toJSON(Duration.fromJSON(votingPeriod)) as object)
        : undefined,
      quorum,
      threshold,
      vetoThreshold,
      minInitialDepositRatio,
      burnVoteQuorum,
      burnProposalDepositPrevote,
      burnVoteVeto
    );
  }

  public toData(_isClassic?: boolean): MsgUpdateGovParamsV1.Data {
    const {
      authority,
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
    return {
      '@type': '/cosmos.gov.v1.MsgUpdateParams',
      authority,
      minDeposit: minDeposit.toData(),
      maxDepositPeriod: maxDepositPeriod
        ? (Duration.toJSON(Duration.fromJSON(maxDepositPeriod)) as object)
        : undefined,
      votingPeriod: votingPeriod
        ? (Duration.toJSON(Duration.fromJSON(votingPeriod)) as object)
        : undefined,
      quorum,
      threshold,
      vetoThreshold,
      minInitialDepositRatio,
      burnVoteQuorum,
      burnProposalDepositPrevote,
      burnVoteVeto,
    };
  }

  public static fromProto(
    proto: MsgUpdateGovParamsV1.Proto,
    _isClassic?: boolean
  ): MsgUpdateGovParamsV1 {
    return new MsgUpdateGovParamsV1(
      proto.authority,
      Coins.fromProto(proto.params?.minDeposit ?? null),
      proto.params?.maxDepositPeriod,
      proto.params?.votingPeriod,
      proto.params?.quorum ?? '',
      proto.params?.threshold ?? '',
      proto.params?.vetoThreshold ?? '',
      proto.params?.minInitialDepositRatio ?? '',
      proto.params?.burnVoteQuorum ?? false,
      proto.params?.burnProposalDepositPrevote ?? false,
      proto.params?.burnVoteVeto ?? false
    );
  }

  public toProto(_isClassic?: boolean): MsgUpdateGovParamsV1.Proto {
    const {
      authority,
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
    return MsgUpdateGovParamsV1_pb.fromPartial({
      authority,
      params: Params.fromPartial({
        minDeposit: minDeposit.toProto(),
        maxDepositPeriod: maxDepositPeriod
          ? Duration.fromJSON(maxDepositPeriod)
          : undefined,
        votingPeriod: votingPeriod
          ? Duration.fromJSON(votingPeriod)
          : undefined,
        quorum,
        threshold,
        vetoThreshold,
        minInitialDepositRatio,
        burnVoteQuorum,
        burnProposalDepositPrevote,
        burnVoteVeto,
      }),
    });
  }

  public packAny(_isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.gov.v1.MsgUpdateParams',
      value: MsgUpdateGovParamsV1_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    _isClassic?: boolean
  ): MsgUpdateGovParamsV1 {
    return MsgUpdateGovParamsV1.fromProto(
      MsgUpdateGovParamsV1_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgUpdateGovParamsV1 {
  export interface Amino {
    type: 'gov/MsgUpdateParamsV1' | 'cosmos-sdk/MsgUpdateGovParamsV1';
    value: {
      authority: AccAddress;
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
    };
  }

  export interface Data {
    '@type': '/cosmos.gov.v1.MsgUpdateParams';
    authority: AccAddress;
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

  export type Proto = MsgUpdateGovParamsV1_pb;
}
