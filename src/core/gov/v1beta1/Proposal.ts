import { Coins } from '../../Coins';
import { Int } from '../../numeric';
import { JSONSerializable } from '../../../util/json';
import { CommunityPoolSpendProposal } from '../../distribution/v1beta1/proposals';
import {
  RegisterCoinProposal,
  RegisterERC20Proposal,
  ToggleTokenConversionProposal,
} from '../../erc20';
import { ParameterChangeProposal } from '../../params/proposals';
import { ClientUpdateProposal } from '../../ibc/proposals';
import { TextProposal } from './proposals';
import {
  SoftwareUpgradeProposal,
  CancelSoftwareUpgradeProposal,
} from '../../upgrade';
import {
  ClearAdminProposal,
  ExecuteContractProposal,
  InstantiateContractProposal,
  MigrateContractProposal,
  PinCodesProposal,
  StoreCodeProposal,
  SudoContractProposal,
  UnpinCodesProposal,
  UpdateAdminProposal,
  UpdateInstantiateConfigProposal,
} from '../../wasm';
import {
  RegisterVolunteerValidatorProposal,
  RegisterVolunteerValidatorProposalWithDeposit,
  UnregisterVolunteerValidatorProposal,
  UnregisterVolunteerValidatorProposalWithDeposit,
} from '../../xpla';
import {
  Proposal as ProposalV1B1_pb,
  ProposalStatus,
  TallyResult,
  proposalStatusFromJSON,
  proposalStatusToJSON,
} from '@xpla/xpla.proto/cosmos/gov/v1beta1/gov';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';

/**
 * Stores information pertaining to a submitted proposal, such as its status and time of
 * the voting period
 */
export class ProposalV1B1 extends JSONSerializable<
  ProposalV1B1.Amino,
  ProposalV1B1.Data,
  ProposalV1B1.Proto
> {
  /**
   *
   * @param id proposal's ID
   * @param content content of the proposal
   * @param status proposal's status
   * @param final_tally_result tally result
   * @param submit_time time proposal was submitted and deposit period started
   * @param deposit_end_time time deposit period will end
   * @param total_deposit amount of coins deposited by all users
   * @param voting_start_time time voting period will start
   * @param voting_end_time time voting period will end
   */
  constructor(
    public id: number,
    public content: ProposalV1B1.Content,
    public status: ProposalStatus,
    public final_tally_result: ProposalV1B1.FinalTallyResult,
    public submit_time: Date,
    public deposit_end_time: Date,
    public total_deposit: Coins,
    public voting_start_time: Date,
    public voting_end_time: Date
  ) {
    super();
  }

  public static fromAmino(
    data: ProposalV1B1.Amino,
    isClassic?: boolean
  ): ProposalV1B1 {
    const {
      id,
      content,
      status,
      final_tally_result,
      submit_time,
      deposit_end_time,
      total_deposit,
      voting_start_time,
      voting_end_time,
    } = data;

    return new ProposalV1B1(
      Number.parseInt(id),
      ProposalV1B1.Content.fromAmino(content, isClassic),
      status,
      {
        yes: new Int(final_tally_result.yes || 0),
        no: new Int(final_tally_result.no || 0),
        abstain: new Int(final_tally_result.abstain || 0),
        no_with_veto: new Int(final_tally_result.no_with_veto || 0),
      },
      new Date(submit_time),
      new Date(deposit_end_time),
      Coins.fromAmino(total_deposit),
      new Date(voting_start_time),
      new Date(voting_end_time)
    );
  }

  public toAmino(isClassic?: boolean): ProposalV1B1.Amino {
    const { status, final_tally_result } = this;

    return {
      id: this.id.toFixed(),
      content: this.content.toAmino(isClassic),
      status: status,
      final_tally_result: {
        yes: final_tally_result.yes.toFixed(),
        no: final_tally_result.no.toFixed(),
        abstain: final_tally_result.abstain.toFixed(),
        no_with_veto: final_tally_result.no_with_veto.toFixed(),
      },
      submit_time: this.submit_time.toISOString(),
      deposit_end_time: this.deposit_end_time.toISOString(),
      total_deposit: this.total_deposit.toAmino(),
      voting_start_time: this.voting_start_time.toISOString(),
      voting_end_time: this.voting_end_time.toISOString(),
    };
  }

  public static fromData(
    data: ProposalV1B1.Data,
    isClassic?: boolean
  ): ProposalV1B1 {
    const {
      proposal_id,
      content,
      status,
      final_tally_result,
      submit_time,
      deposit_end_time,
      total_deposit,
      voting_start_time,
      voting_end_time,
    } = data;

    return new ProposalV1B1(
      Number.parseInt(proposal_id),
      ProposalV1B1.Content.fromData(content, isClassic),
      proposalStatusFromJSON(status),
      {
        yes: new Int(final_tally_result?.yes || 0),
        no: new Int(final_tally_result?.no || 0),
        abstain: new Int(final_tally_result?.abstain || 0),
        no_with_veto: new Int(final_tally_result?.no_with_veto || 0),
      },
      new Date(submit_time),
      new Date(deposit_end_time),
      Coins.fromData(total_deposit),
      new Date(voting_start_time),
      new Date(voting_end_time)
    );
  }

  public toData(isClassic?: boolean): ProposalV1B1.Data {
    const { status, final_tally_result } = this;

    return {
      proposal_id: this.id.toFixed(),
      content: this.content.toData(isClassic),
      status: proposalStatusToJSON(status),
      final_tally_result: {
        yes: final_tally_result.yes.toString(),
        no: final_tally_result.no.toString(),
        abstain: final_tally_result.abstain.toString(),
        no_with_veto: final_tally_result.no_with_veto.toString(),
      },
      submit_time: this.submit_time.toISOString(),
      deposit_end_time: this.deposit_end_time.toISOString(),
      total_deposit: this.total_deposit.toData(),
      voting_start_time: this.voting_start_time.toISOString(),
      voting_end_time: this.voting_end_time.toISOString(),
    };
  }

  public static fromProto(
    data: ProposalV1B1.Proto,
    isClassic?: boolean
  ): ProposalV1B1 {
    const id = data.proposalId;
    const content = data.content;
    const status = data.status;
    const final_tally_result = data.finalTallyResult;
    const submit_time = data.submitTime;
    const deposit_end_time = data.depositEndTime;
    const total_deposit = data.totalDeposit;
    const voting_start_time = data.votingStartTime;
    const voting_end_time = data.votingEndTime;

    return new ProposalV1B1(
      id.toNumber(),
      ProposalV1B1.Content.fromProto(content as Any, isClassic),
      status,
      {
        yes: new Int(final_tally_result?.yes ?? 0),
        no: new Int(final_tally_result?.no ?? 0),
        abstain: new Int(final_tally_result?.abstain ?? 0),
        no_with_veto: new Int(final_tally_result?.noWithVeto ?? 0),
      },
      submit_time as Date,
      deposit_end_time as Date,
      Coins.fromProto(total_deposit),
      voting_start_time as Date,
      voting_end_time as Date
    );
  }

  public toProto(isClassic?: boolean): ProposalV1B1.Proto {
    const { status, final_tally_result } = this;

    let ftr: TallyResult | undefined;
    if (final_tally_result) {
      ftr = TallyResult.fromPartial({
        yes: final_tally_result.yes.toString(),
        no: final_tally_result.no.toString(),
        abstain: final_tally_result.abstain.toString(),
        noWithVeto: final_tally_result.no_with_veto.toString(),
      });
    }

    return ProposalV1B1_pb.fromPartial({
      proposalId: this.id,
      content: this.content.packAny(isClassic),
      status,
      finalTallyResult: ftr,
      submitTime: this.submit_time,
      depositEndTime: this.deposit_end_time,
      totalDeposit: this.total_deposit.toProto(),
      votingEndTime: this.voting_end_time,
      votingStartTime: this.voting_start_time,
    });
  }
}

export namespace ProposalV1B1 {
  export const Status = ProposalStatus;
  export type Status = ProposalStatus;

  export interface FinalTallyResult {
    yes: Int;
    abstain: Int;
    no: Int;
    no_with_veto: Int;
  }

  export type Content =
    | TextProposal
    | CommunityPoolSpendProposal
    | ParameterChangeProposal
    | SoftwareUpgradeProposal
    | CancelSoftwareUpgradeProposal
    | ClientUpdateProposal
    | ClearAdminProposal
    | ExecuteContractProposal
    | InstantiateContractProposal
    | MigrateContractProposal
    | PinCodesProposal
    | StoreCodeProposal
    | SudoContractProposal
    | UnpinCodesProposal
    | UpdateAdminProposal
    | UpdateInstantiateConfigProposal
    | RegisterCoinProposal
    | RegisterERC20Proposal
    | ToggleTokenConversionProposal
    | RegisterVolunteerValidatorProposal
    | RegisterVolunteerValidatorProposalWithDeposit
    | UnregisterVolunteerValidatorProposal
    | UnregisterVolunteerValidatorProposalWithDeposit;

  export namespace Content {
    export type Amino =
      | TextProposal.Amino
      | CommunityPoolSpendProposal.Amino
      | ParameterChangeProposal.Amino
      | SoftwareUpgradeProposal.Amino
      | CancelSoftwareUpgradeProposal.Amino
      | ClientUpdateProposal.Amino
      | ClearAdminProposal.Amino
      | ExecuteContractProposal.Amino
      | InstantiateContractProposal.Amino
      | MigrateContractProposal.Amino
      | PinCodesProposal.Amino
      | StoreCodeProposal.Amino
      | SudoContractProposal.Amino
      | UnpinCodesProposal.Amino
      | UpdateAdminProposal.Amino
      | UpdateInstantiateConfigProposal.Amino
      | RegisterCoinProposal.Amino
      | RegisterERC20Proposal.Amino
      | ToggleTokenConversionProposal.Amino
      | RegisterVolunteerValidatorProposal.Amino
      | RegisterVolunteerValidatorProposalWithDeposit.Amino
      | UnregisterVolunteerValidatorProposal.Amino
      | UnregisterVolunteerValidatorProposalWithDeposit.Amino;

    export type Data =
      | TextProposal.Data
      | CommunityPoolSpendProposal.Data
      | ParameterChangeProposal.Data
      | SoftwareUpgradeProposal.Data
      | CancelSoftwareUpgradeProposal.Data
      | ClientUpdateProposal.Data
      | ClearAdminProposal.Data
      | ExecuteContractProposal.Data
      | InstantiateContractProposal.Data
      | MigrateContractProposal.Data
      | PinCodesProposal.Data
      | StoreCodeProposal.Data
      | SudoContractProposal.Data
      | UnpinCodesProposal.Data
      | UpdateAdminProposal.Data
      | UpdateInstantiateConfigProposal.Data
      | RegisterCoinProposal.Data
      | RegisterERC20Proposal.Data
      | ToggleTokenConversionProposal.Data
      | RegisterVolunteerValidatorProposal.Data
      | RegisterVolunteerValidatorProposalWithDeposit.Data
      | UnregisterVolunteerValidatorProposal.Data
      | UnregisterVolunteerValidatorProposalWithDeposit.Data;

    export type Proto =
      | TextProposal.Proto
      | CommunityPoolSpendProposal.Proto
      | ParameterChangeProposal.Proto
      | SoftwareUpgradeProposal.Proto
      | CancelSoftwareUpgradeProposal.Proto
      | ClientUpdateProposal.Proto
      | ClearAdminProposal.Proto
      | ExecuteContractProposal.Proto
      | InstantiateContractProposal.Proto
      | MigrateContractProposal.Proto
      | PinCodesProposal.Proto
      | StoreCodeProposal.Proto
      | SudoContractProposal.Proto
      | UnpinCodesProposal.Proto
      | UpdateAdminProposal.Proto
      | UpdateInstantiateConfigProposal.Proto
      | RegisterCoinProposal.Proto
      | RegisterERC20Proposal.Proto
      | ToggleTokenConversionProposal.Proto
      | RegisterVolunteerValidatorProposal.Proto
      | RegisterVolunteerValidatorProposalWithDeposit.Proto
      | UnregisterVolunteerValidatorProposal.Proto
      | UnregisterVolunteerValidatorProposalWithDeposit.Proto;

    export function fromAmino(
      amino: ProposalV1B1.Content.Amino,
      isClassic?: boolean
    ): ProposalV1B1.Content {
      switch (amino.type) {
        case 'gov/TextProposal':
        case 'cosmos-sdk/TextProposal':
          return TextProposal.fromAmino(amino, isClassic);
        case 'distribution/CommunityPoolSpendProposal':
        case 'cosmos-sdk/CommunityPoolSpendProposal':
          return CommunityPoolSpendProposal.fromAmino(amino, isClassic);
        case 'params/ParameterChangeProposal':
        case 'cosmos-sdk/ParameterChangeProposal':
          return ParameterChangeProposal.fromAmino(amino, isClassic);
        case 'upgrade/SoftwareUpgradeProposal':
        case 'cosmos-sdk/SoftwareUpgradeProposal':
          return SoftwareUpgradeProposal.fromAmino(amino, isClassic);
        case 'upgrade/CancelSoftwareUpgradeProposal':
        case 'cosmos-sdk/CancelSoftwareUpgradeProposal':
          return CancelSoftwareUpgradeProposal.fromAmino(amino, isClassic);
        case 'ibc/ClientUpdateProposal':
          return ClientUpdateProposal.fromAmino(amino, isClassic);
        case 'wasm/ClearAdminProposal':
          return ClearAdminProposal.fromAmino(amino, isClassic);
        case 'wasm/ExecuteContractProposal':
          return ExecuteContractProposal.fromAmino(amino, isClassic);
        case 'wasm/InstantiateContractProposal':
          return InstantiateContractProposal.fromAmino(amino, isClassic);
        case 'wasm/MigrateContractProposal':
          return MigrateContractProposal.fromAmino(amino, isClassic);
        case 'wasm/PinCodesProposal':
          return PinCodesProposal.fromAmino(amino, isClassic);
        case 'wasm/StoreCodeProposal':
          return StoreCodeProposal.fromAmino(amino, isClassic);
        case 'wasm/SudoContractProposal':
          return SudoContractProposal.fromAmino(amino, isClassic);
        case 'wasm/UnpinCodesProposal':
          return UnpinCodesProposal.fromAmino(amino, isClassic);
        case 'wasm/UpdateAdminProposal':
          return UpdateAdminProposal.fromAmino(amino, isClassic);
        case 'wasm/UpdateInstantiateConfigProposal':
          return UpdateInstantiateConfigProposal.fromAmino(amino, isClassic);
        case 'erc20/RegisterCoinProposal':
          return RegisterCoinProposal.fromAmino(amino, isClassic);
        case 'erc20/RegisterERC20Proposal':
          return RegisterERC20Proposal.fromAmino(amino, isClassic);
        case 'erc20/ToggleTokenConversionProposal':
          return ToggleTokenConversionProposal.fromAmino(amino, isClassic);
        case 'xpla/RegisterVolunteerValidatorProposal':
          return RegisterVolunteerValidatorProposal.fromAmino(amino, isClassic);
        case 'xpla/RegisterVolunteerValidatorProposalWithDeposit':
          return RegisterVolunteerValidatorProposalWithDeposit.fromAmino(
            amino,
            isClassic
          );
        case 'xpla/UnregisterVolunteerValidatorProposal':
          return UnregisterVolunteerValidatorProposal.fromAmino(
            amino,
            isClassic
          );
        case 'xpla/UnregisterVolunteerValidatorProposalWithDeposit':
          return UnregisterVolunteerValidatorProposalWithDeposit.fromAmino(
            amino,
            isClassic
          );
      }
    }

    export function fromData(
      data: ProposalV1B1.Content.Data,
      isClassic?: boolean
    ): ProposalV1B1.Content {
      switch (data['@type']) {
        case '/cosmos.gov.v1beta1.TextProposal':
          return TextProposal.fromData(data, isClassic);
        case '/cosmos.distribution.v1beta1.CommunityPoolSpendProposal':
          return CommunityPoolSpendProposal.fromData(data, isClassic);
        case '/cosmos.params.v1beta1.ParameterChangeProposal':
          return ParameterChangeProposal.fromData(data, isClassic);
        case '/cosmos.upgrade.v1beta1.SoftwareUpgradeProposal':
          return SoftwareUpgradeProposal.fromData(data, isClassic);
        case '/cosmos.upgrade.v1beta1.CancelSoftwareUpgradeProposal':
          return CancelSoftwareUpgradeProposal.fromData(data, isClassic);
        case '/ibc.core.client.v1.ClientUpdateProposal':
          return ClientUpdateProposal.fromData(data, isClassic);
        case '/cosmwasm.wasm.v1.ClearAdminProposal':
          return ClearAdminProposal.fromData(data, isClassic);
        case '/cosmwasm.wasm.v1.ExecuteContractProposal':
          return ExecuteContractProposal.fromData(data, isClassic);
        case '/cosmwasm.wasm.v1.InstantiateContractProposal':
          return InstantiateContractProposal.fromData(data, isClassic);
        case '/cosmwasm.wasm.v1.MigrateContractProposal':
          return MigrateContractProposal.fromData(data, isClassic);
        case '/cosmwasm.wasm.v1.PinCodesProposal':
          return PinCodesProposal.fromData(data, isClassic);
        case '/cosmwasm.wasm.v1.StoreCodeProposal':
          return StoreCodeProposal.fromData(data, isClassic);
        case '/cosmwasm.wasm.v1.SudoContractProposal':
          return SudoContractProposal.fromData(data, isClassic);
        case '/cosmwasm.wasm.v1.UnpinCodesProposal':
          return UnpinCodesProposal.fromData(data, isClassic);
        case '/cosmwasm.wasm.v1.UpdateAdminProposal':
          return UpdateAdminProposal.fromData(data, isClassic);
        case '/cosmwasm.wasm.v1.UpdateInstantiateConfigProposal':
          return UpdateInstantiateConfigProposal.fromData(data, isClassic);
        case '/ethermint.erc20.v1.RegisterCoinProposal':
        case '/evmos.erc20.v1.RegisterCoinProposal':
          return RegisterCoinProposal.fromData(data, isClassic);
        case '/ethermint.erc20.v1.RegisterERC20Proposal':
        case '/evmos.erc20.v1.RegisterERC20Proposal':
          return RegisterERC20Proposal.fromData(data, isClassic);
        case '/ethermint.erc20.v1.ToggleTokenConversionProposal':
        case '/evmos.erc20.v1.ToggleTokenConversionProposal':
          return ToggleTokenConversionProposal.fromData(data, isClassic);
        case '/xpla.volunteer.v1beta1.RegisterVolunteerValidatorProposal':
          return RegisterVolunteerValidatorProposal.fromData(data, isClassic);
        case '/xpla.volunteer.v1beta1.RegisterVolunteerValidatorProposalWithDeposit':
          return RegisterVolunteerValidatorProposalWithDeposit.fromData(
            data,
            isClassic
          );
        case '/xpla.volunteer.v1beta1.UnregisterVolunteerValidatorProposal':
          return UnregisterVolunteerValidatorProposal.fromData(data, isClassic);
        case '/xpla.volunteer.v1beta1.UnregisterVolunteerValidatorProposalWithDeposit':
          return UnregisterVolunteerValidatorProposalWithDeposit.fromData(
            data,
            isClassic
          );
      }
    }

    export function fromProto(
      anyProto: Any,
      isClassic?: boolean
    ): ProposalV1B1.Content {
      const typeUrl = anyProto.typeUrl;
      switch (typeUrl) {
        case '/cosmos.gov.v1beta1.TextProposal':
          return TextProposal.unpackAny(anyProto, isClassic);
        case '/cosmos.distribution.v1beta1.CommunityPoolSpendProposal':
          return CommunityPoolSpendProposal.unpackAny(anyProto, isClassic);
        case '/cosmos.params.v1beta1.ParameterChangeProposal':
          return ParameterChangeProposal.unpackAny(anyProto, isClassic);
        case '/cosmos.upgrade.v1beta1.SoftwareUpgradeProposal':
          return SoftwareUpgradeProposal.unpackAny(anyProto, isClassic);
        case '/cosmos.upgrade.v1beta1.CancelSoftwareUpgradeProposal':
          return CancelSoftwareUpgradeProposal.unpackAny(anyProto, isClassic);
        case '/ibc.core.client.v1.ClientUpdateProposal':
          return ClientUpdateProposal.unpackAny(anyProto, isClassic);
        case '/cosmwasm.wasm.v1.ClearAdminProposal':
          return ClearAdminProposal.unpackAny(anyProto, isClassic);
        case '/cosmwasm.wasm.v1.ExecuteContractProposal':
          return ExecuteContractProposal.unpackAny(anyProto, isClassic);
        case '/cosmwasm.wasm.v1.InstantiateContractProposal':
          return InstantiateContractProposal.unpackAny(anyProto, isClassic);
        case '/cosmwasm.wasm.v1.MigrateContractProposal':
          return MigrateContractProposal.unpackAny(anyProto, isClassic);
        case '/cosmwasm.wasm.v1.PinCodesProposal':
          return PinCodesProposal.unpackAny(anyProto, isClassic);
        case '/cosmwasm.wasm.v1.StoreCodeProposal':
          return StoreCodeProposal.unpackAny(anyProto, isClassic);
        case '/cosmwasm.wasm.v1.SudoContractProposal':
          return SudoContractProposal.unpackAny(anyProto, isClassic);
        case '/cosmwasm.wasm.v1.UnpinCodesProposal':
          return UnpinCodesProposal.unpackAny(anyProto, isClassic);
        case '/cosmwasm.wasm.v1.UpdateAdminProposal':
          return UpdateAdminProposal.unpackAny(anyProto, isClassic);
        case '/cosmwasm.wasm.v1.UpdateInstantiateConfigProposal':
          return UpdateInstantiateConfigProposal.unpackAny(anyProto, isClassic);
        case '/ethermint.erc20.v1.RegisterCoinProposal':
        case '/evmos.erc20.v1.RegisterCoinProposal':
          return RegisterCoinProposal.unpackAny(anyProto, isClassic);
        case '/ethermint.erc20.v1.RegisterERC20Proposal':
        case '/evmos.erc20.v1.RegisterERC20Proposal':
          return RegisterERC20Proposal.unpackAny(anyProto, isClassic);
        case '/ethermint.erc20.v1.ToggleTokenConversionProposal':
        case '/evmos.erc20.v1.ToggleTokenConversionProposal':
          return ToggleTokenConversionProposal.unpackAny(anyProto, isClassic);
        case '/xpla.volunteer.v1beta1.RegisterVolunteerValidatorProposal':
          return RegisterVolunteerValidatorProposal.unpackAny(
            anyProto,
            isClassic
          );
        case '/xpla.volunteer.v1beta1.RegisterVolunteerValidatorProposalWithDeposit':
          return RegisterVolunteerValidatorProposalWithDeposit.unpackAny(
            anyProto,
            isClassic
          );
        case '/xpla.volunteer.v1beta1.UnregisterVolunteerValidatorProposal':
          return UnregisterVolunteerValidatorProposal.unpackAny(
            anyProto,
            isClassic
          );
        case '/xpla.volunteer.v1beta1.UnregisterVolunteerValidatorProposalWithDeposit':
          return UnregisterVolunteerValidatorProposalWithDeposit.unpackAny(
            anyProto,
            isClassic
          );
      }

      throw `Proposal content ${typeUrl} not recognized`;
    }
  }

  export interface Amino {
    content: Content.Amino;
    id: string;
    status: number;
    final_tally_result: {
      yes: string;
      abstain: string;
      no: string;
      no_with_veto: string;
    };
    submit_time: string;
    deposit_end_time: string;
    total_deposit: Coins.Amino;
    voting_start_time: string;
    voting_end_time: string;
  }

  export interface Data {
    content: Content.Data;
    proposal_id: string;
    status: string;
    final_tally_result: {
      yes: string;
      abstain: string;
      no: string;
      no_with_veto: string;
    };
    submit_time: string;
    deposit_end_time: string;
    total_deposit: Coins.Data;
    voting_start_time: string;
    voting_end_time: string;
  }

  export type Proto = ProposalV1B1_pb;
}
