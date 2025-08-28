import { AuthMsgV1B1, MsgUpdateAuthParamsV1B1 } from './auth';
import {
  BankMsgV1B1,
  MsgMultiSendV1B1,
  MsgSendV1B1,
  MsgSetSendEnabledV1B1,
  MsgUpdateBankParamsV1B1,
} from './bank';
import {
  CircuitMsgV1,
  MsgAuthorizeCircuitBreakerV1,
  MsgResetCircuitBreakerV1,
  MsgTripCircuitBreakerV1,
} from './circuit';
import { ConsensusMsgV1, MsgUpdateConsensusParamsV1 } from './consensus';
import {
  DistributionMsgV1B1,
  MsgSetWithdrawAddressV1B1,
  MsgWithdrawDelegatorRewardV1B1,
  MsgWithdrawValidatorCommissionV1B1,
  MsgFundCommunityPoolV1B1,
  MsgCommunityPoolSpendV1B1,
  MsgDepositValidatorRewardsPoolV1B1,
  MsgUpdateDistributionParamsV1B1,
} from './distribution/v1beta1/msgs';
import {
  Erc20MsgV1,
  MsgConvertCoinV1,
  MsgConvertERC20V1,
  MsgUpdateERC20ParamsV1,
} from './erc20';
import { EvmMsgV1, MsgEthereumTxV1, MsgUpdateEvmParamsV1 } from './evm';
import {
  FeeGrantMsg,
  MsgGrantAllowance,
  MsgRevokeAllowance,
  MsgPruneAllowances,
} from './feegrant/msgs';
import { FeemarketMsgV1, MsgUpdateFeemarketParamsV1 } from './feemarket';
import {
  GovMsgV1,
  MsgDepositV1B1,
  MsgSubmitProposalV1B1,
  MsgVoteV1B1,
  MsgVoteWeightedV1B1,
  GovMsgV1B1,
  MsgDepositV1,
  MsgSubmitProposalV1,
  MsgVoteV1,
  MsgVoteWeightedV1,
  MsgExecLegacyContentV1,
  MsgUpdateGovParamsV1,
  MsgCancelProposalV1,
} from './gov';
import {
  GroupMsgV1,
  MsgCreateGroupV1,
  MsgUpdateGroupMembersV1,
  MsgUpdateGroupAdminV1,
  MsgUpdateGroupMetadataV1,
  MsgCreateGroupPolicyV1,
  MsgUpdateGroupPolicyAdminV1,
  MsgCreateGroupWithPolicyV1,
  MsgUpdateGroupPolicyDecisionPolicyV1,
  MsgUpdateGroupPolicyMetadataV1,
  MsgGroupSubmitProposalV1,
  MsgGroupWithdrawProposalV1,
  MsgGroupVoteV1,
  MsgGroupExecV1,
  MsgLeaveGroupV1,
} from './group';
import { MintMsgV1B1, MsgUpdateMintParamsV1B1 } from './mint';
import { NftMsgV1B1, MsgNftSendV1B1 } from './nft';
import {
  AuthzMsg,
  MsgGrantAuthorization,
  MsgRevokeAuthorization,
  MsgExecAuthorized,
} from './authz/msgs';
import {
  SlashingMsgV1B1,
  MsgUnjailV1B1,
  MsgUpdateSlashingParamsV1B1,
} from './slashing';
import {
  StakingMsgV1B1,
  MsgBeginRedelegateV1B1,
  MsgCreateValidatorV1B1,
  MsgDelegateV1B1,
  MsgEditValidatorV1B1,
  MsgUndelegateV1B1,
  MsgCancelUnbondingDelegationV1B1,
  MsgUpdateStakingParamsV1B1,
} from './staking';
import {
  VestingMsgV1B1,
  MsgCreateVestingAccountV1B1,
  MsgCreatePermanentLockedAccountV1B1,
  MsgCreatePeriodicVestingAccountV1B1,
} from './vesting';
import {
  UpgradeMsgV1B1,
  MsgSoftwareUpgradeV1B1,
  MsgCancelUpgradeV1B1,
} from './upgrade';
import {
  WasmMsgV1,
  MsgStoreCodeV1,
  MsgInstantiateContractV1,
  MsgInstantiateContract2V1,
  MsgExecuteContractV1,
  MsgMigrateContractV1,
  MsgUpdateContractAdminV1,
  MsgClearContractAdminV1,
  MsgSudoContractV1,
  MsgPinCodesV1,
  MsgUnpinCodesV1,
  MsgStoreAndInstantiateContractV1,
  MsgAddCodeUploadParamsAddressesV1,
  MsgRemoveCodeUploadParamsAddressesV1,
  MsgStoreAndMigrateContractV1,
  MsgUpdateContractLabelV1,
  MsgUpdateWasmParamsV1,
  MsgUpdateInstantiateConfigV1,
  MsgIBCSendV1,
  MsgIBCCloseChannelV1,
} from './wasm';
import {
  IcaMsgV1,
  MsgRegisterInterchainAccountV1,
  MsgSendTxV1,
  MsgUpdateIcaControllerParamsV1,
  MsgModuleQuerySafeV1,
  MsgUpdateIcaHostParamsV1,
} from './ibc/applications/interchain-account';
import {
  IbcTransferMsgV1,
  MsgTransferV1,
  MsgUpdateIbcTransferParamsV1,
} from './ibc/applications/transfer';
import {
  IbcConnectionMsgV1,
  MsgConnectionOpenInitV1,
  MsgConnectionOpenTryV1,
  MsgConnectionOpenConfirmV1,
  MsgConnectionOpenAckV1,
  MsgUpdateIbcConnectionParamsV1,
} from './ibc/core/connection';
import {
  IbcChannelMsgV1,
  IbcChannelMsgV2,
  MsgChannelOpenInitV1,
  MsgChannelOpenTryV1,
  MsgChannelOpenConfirmV1,
  MsgChannelOpenAckV1,
  MsgChannelCloseInitV1,
  MsgChannelCloseConfirmV1,
  MsgRecvPacketV1,
  MsgAcknowledgementV1,
  MsgTimeoutV1,
  MsgTimeoutOnCloseV1,
  MsgSendPacketV2,
  MsgRecvPacketV2,
  MsgTimeoutV2,
  MsgAcknowledgementV2,
} from './ibc/core/channel';
import {
  IbcClientMsgV1,
  IbcClientMsgV2,
  MsgCreateClientV1,
  MsgUpdateClientV1,
  MsgUpgradeClientV1,
  MsgSubmitMisbehaviourV1,
  MsgRecoverClientV1,
  MsgIbcSoftwareUpgradeV1,
  MsgUpdateIbcClientParamsV1,
  MsgDeleteClientCreatorV1,
  MsgUpdateClientConfigV2,
  MsgRegisterCounterpartyV2,
} from './ibc/core/client';
import { CrisisMsg, MsgVerifyInvariant } from './crisis';
import {
  XplaMsgV1B1,
  MsgFundRewardPoolV1B1,
  MsgUpdateRewardParamsV1B1,
  MsgRegisterVolunteerValidatorV1B1,
  MsgUnregisterVolunteerValidatorV1B1,
  MsgBurnV1B1,
} from './xpla';
import {
  ProtocolPoolMsgV1,
  MsgFundCommunityPoolV1,
  MsgCommunityPoolSpendV1,
  MsgCreateContinuousFundV1,
  MsgCancelContinuousFundV1,
  MsgUpdateProtocolPoolParamsV1,
} from './protocolpool';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';

export type Msg =
  | AuthMsgV1B1
  | BankMsgV1B1
  | CircuitMsgV1
  | ConsensusMsgV1
  | DistributionMsgV1B1
  | FeeGrantMsg
  | FeemarketMsgV1
  | GovMsgV1B1
  | GovMsgV1
  | GroupMsgV1
  | MintMsgV1B1
  | NftMsgV1B1
  | AuthzMsg
  | SlashingMsgV1B1
  | StakingMsgV1B1
  | VestingMsgV1B1
  | UpgradeMsgV1B1
  | WasmMsgV1
  | IcaMsgV1
  | IbcTransferMsgV1
  | IbcClientMsgV1
  | IbcClientMsgV2
  | IbcConnectionMsgV1
  | IbcChannelMsgV1
  | IbcChannelMsgV2
  | CrisisMsg
  | Erc20MsgV1
  | EvmMsgV1
  | XplaMsgV1B1
  | ProtocolPoolMsgV1;

export namespace Msg {
  export type Amino =
    | AuthMsgV1B1.Amino
    | BankMsgV1B1.Amino
    | CircuitMsgV1.Amino
    | ConsensusMsgV1.Amino
    | DistributionMsgV1B1.Amino
    | FeeGrantMsg.Amino
    | FeemarketMsgV1.Amino
    | GovMsgV1B1.Amino
    | GovMsgV1.Amino
    | GroupMsgV1.Amino
    | MintMsgV1B1.Amino
    | AuthzMsg.Amino
    | SlashingMsgV1B1.Amino
    | StakingMsgV1B1.Amino
    | VestingMsgV1B1.Amino
    | UpgradeMsgV1B1.Amino
    | WasmMsgV1.Amino
    | IbcTransferMsgV1.Amino
    | CrisisMsg.Amino
    | Erc20MsgV1.Amino
    | EvmMsgV1.Amino
    | XplaMsgV1B1.Amino
    | ProtocolPoolMsgV1.Amino;

  export type Data =
    | AuthMsgV1B1.Data
    | BankMsgV1B1.Data
    | CircuitMsgV1.Data
    | ConsensusMsgV1.Data
    | DistributionMsgV1B1.Data
    | FeeGrantMsg.Data
    | FeemarketMsgV1.Data
    | GovMsgV1B1.Data
    | GovMsgV1.Data
    | GroupMsgV1.Data
    | MintMsgV1B1.Data
    | NftMsgV1B1.Data
    | AuthzMsg.Data
    | SlashingMsgV1B1.Data
    | StakingMsgV1B1.Data
    | VestingMsgV1B1.Data
    | UpgradeMsgV1B1.Data
    | WasmMsgV1.Data
    | IcaMsgV1.Data
    | IbcTransferMsgV1.Data
    | IbcClientMsgV1.Data
    | IbcClientMsgV2.Data
    | IbcConnectionMsgV1.Data
    | IbcChannelMsgV1.Data
    | IbcChannelMsgV2.Data
    | CrisisMsg.Data
    | Erc20MsgV1.Data
    | EvmMsgV1.Data
    | XplaMsgV1B1.Data
    | ProtocolPoolMsgV1.Data;

  export type Proto =
    | AuthMsgV1B1.Proto
    | BankMsgV1B1.Proto
    | CircuitMsgV1.Proto
    | ConsensusMsgV1.Proto
    | DistributionMsgV1B1.Proto
    | FeeGrantMsg.Proto
    | FeemarketMsgV1.Proto
    | GovMsgV1B1.Proto
    | GovMsgV1.Proto
    | GroupMsgV1.Proto
    | MintMsgV1B1.Proto
    | NftMsgV1B1.Proto
    | AuthzMsg.Proto
    | SlashingMsgV1B1.Proto
    | StakingMsgV1B1.Proto
    | VestingMsgV1B1.Proto
    | UpgradeMsgV1B1.Proto
    | WasmMsgV1.Proto
    | IcaMsgV1.Proto
    | IbcTransferMsgV1.Proto
    | IbcClientMsgV1.Proto
    | IbcClientMsgV2.Proto
    | IbcConnectionMsgV1.Proto
    | IbcChannelMsgV1.Proto
    | IbcChannelMsgV2.Proto
    | CrisisMsg.Proto
    | Erc20MsgV1.Proto
    | EvmMsgV1.Proto
    | XplaMsgV1B1.Proto
    | ProtocolPoolMsgV1.Proto;

  export function fromAmino(data: Msg.Amino, isClassic?: boolean): Msg {
    switch (data.type) {
      // auth
      case 'cosmos-sdk/x/auth/MsgUpdateParams':
        return MsgUpdateAuthParamsV1B1.fromAmino(data, isClassic);

      // bank
      case 'bank/MsgSend':
      case 'cosmos-sdk/MsgSend':
        return MsgSendV1B1.fromAmino(<MsgSendV1B1.Amino>data, isClassic);
      case 'bank/MsgMultiSend':
      case 'cosmos-sdk/MsgMultiSend':
        return MsgMultiSendV1B1.fromAmino(data, isClassic);
      case 'bank/MsgSetSendEnabled':
      case 'cosmos-sdk/MsgSetSendEnabled':
        return MsgSetSendEnabledV1B1.fromAmino(data, isClassic);
      case 'bank/MsgUpdateParams':
      case 'cosmos-sdk/x/bank/MsgUpdateParams':
        return MsgUpdateBankParamsV1B1.fromAmino(data, isClassic);

      // circuit
      case 'circuit/MsgAuthorizeCircuitBreaker':
      case 'cosmos-sdk/x/circuit/MsgAuthorizeCircuitBreaker':
        return MsgAuthorizeCircuitBreakerV1.fromAmino(data, isClassic);
      case 'circuit/MsgResetCircuitBreaker':
      case 'cosmos-sdk/x/circuit/MsgResetCircuitBreaker':
        return MsgResetCircuitBreakerV1.fromAmino(data, isClassic);
      case 'circuit/MsgTripCircuitBreaker':
      case 'cosmos-sdk/x/circuit/MsgTripCircuitBreaker':
        return MsgTripCircuitBreakerV1.fromAmino(data, isClassic);
      
      // consensus
      case 'consensus/MsgUpdateParams':
      case 'cosmos-sdk/x/consensus/MsgUpdateParams':
        return MsgUpdateConsensusParamsV1.fromAmino(data, isClassic);

      // distribution
      case 'distribution/MsgModifyWithdrawAddress':
      case 'cosmos-sdk/MsgModifyWithdrawAddress':
        return MsgSetWithdrawAddressV1B1.fromAmino(data, isClassic);
      case 'distribution/MsgWithdrawDelegationReward':
      case 'cosmos-sdk/MsgWithdrawDelegationReward':
        return MsgWithdrawDelegatorRewardV1B1.fromAmino(data, isClassic);
      case 'distribution/MsgWithdrawValidatorCommission':
      case 'cosmos-sdk/MsgWithdrawValCommission':
        return MsgWithdrawValidatorCommissionV1B1.fromAmino(data, isClassic);
      case 'distribution/MsgFundCommunityPool':
      case 'cosmos-sdk/MsgFundCommunityPool':
        return MsgFundCommunityPoolV1B1.fromAmino(data, isClassic);
      case 'distribution/MsgCommunityPoolSpend':
      case 'cosmos-sdk/distr/MsgCommunityPoolSpend':
        return MsgCommunityPoolSpendV1B1.fromAmino(data, isClassic);
      case 'distribution/MsgDepositValidatorRewardsPool':
      case 'cosmos-sdk/distr/MsgDepositValidatorRewardsPool':
        return MsgDepositValidatorRewardsPoolV1B1.fromAmino(data, isClassic);
      case 'distribution/MsgUpdateParams':
      case 'cosmos-sdk/distribution/MsgUpdateParams':
        return MsgUpdateDistributionParamsV1B1.fromAmino(data, isClassic);

      // feegrant
      case 'feegrant/MsgGrantAllowance':
      case 'cosmos-sdk/MsgGrantAllowance':
        return MsgGrantAllowance.fromAmino(data, isClassic);
      case 'feegrant/MsgRevokeAllowance':
      case 'cosmos-sdk/MsgRevokeAllowance':
        return MsgRevokeAllowance.fromAmino(data, isClassic);
      case 'feegrant/MsgPruneAllowances':
      case 'cosmos-sdk/MsgPruneAllowances':
        return MsgPruneAllowances.fromAmino(data, isClassic);

      // feemarket
      case 'ethermint/x/feemarket/MsgUpdateParams':
        return MsgUpdateFeemarketParamsV1.fromAmino(data, isClassic);

      // gov
      case 'gov/MsgDeposit':
      case 'cosmos-sdk/MsgDeposit':
        return MsgDepositV1B1.fromAmino(<MsgDepositV1B1.Amino>data, isClassic);
      case 'cosmos-sdk/v1/MsgDeposit':
        return MsgDepositV1.fromAmino(<MsgDepositV1.Amino>data, isClassic);
      case 'gov/MsgSubmitProposal':
      case 'cosmos-sdk/MsgSubmitProposal':
        return MsgSubmitProposalV1B1.fromAmino(
          <MsgSubmitProposalV1B1.Amino>data,
          isClassic
        );
      case 'cosmos-sdk/v1/MsgSubmitProposal':
        return MsgSubmitProposalV1.fromAmino(<MsgSubmitProposalV1.Amino>data);
      case 'gov/MsgVote':
      case 'cosmos-sdk/MsgVote':
        return MsgVoteV1B1.fromAmino(<MsgVoteV1B1.Amino>data, isClassic);
      case 'cosmos-sdk/v1/MsgVote':
        return MsgVoteV1.fromAmino(<MsgVoteV1.Amino>data, isClassic);
      case 'gov/MsgVoteWeighted':
      case 'cosmos-sdk/MsgVoteWeighted':
        return MsgVoteWeightedV1B1.fromAmino(<MsgVoteWeightedV1B1.Amino>data, isClassic);
      case 'cosmos-sdk/v1/MsgVoteWeighted':
        return MsgVoteWeightedV1.fromAmino(<MsgVoteWeightedV1.Amino>data, isClassic);
      case 'cosmos-sdk/v1/MsgExecLegacyContent':
        return MsgExecLegacyContentV1.fromAmino(data, isClassic);
      case 'cosmos-sdk/x/gov/v1/MsgUpdateParams':
        return MsgUpdateGovParamsV1.fromAmino(data, isClassic);
      case 'cosmos-sdk/v1/MsgCancelProposal':
        return MsgCancelProposalV1.fromAmino(data, isClassic);

      // group
      case 'group/MsgCreateGroup':
      case 'cosmos-sdk/MsgCreateGroup':
        return MsgCreateGroupV1.fromAmino(data, isClassic);
      case 'group/MsgUpdateGroupMembers':
      case 'cosmos-sdk/MsgUpdateGroupMembers':
        return MsgUpdateGroupMembersV1.fromAmino(data, isClassic);
      case 'group/MsgUpdateGroupAdmin':
      case 'cosmos-sdk/MsgUpdateGroupAdmin':
        return MsgUpdateGroupAdminV1.fromAmino(data, isClassic);
      case 'group/MsgUpdateGroupMetadata':
      case 'cosmos-sdk/MsgUpdateGroupMetadata':
        return MsgUpdateGroupMetadataV1.fromAmino(data, isClassic);
      case 'group/MsgCreateGroupPolicy':
      case 'cosmos-sdk/MsgCreateGroupPolicy':
        return MsgCreateGroupPolicyV1.fromAmino(data, isClassic);
      case 'group/MsgUpdateGroupPolicyAdmin':
      case 'cosmos-sdk/MsgUpdateGroupPolicyAdmin':
        return MsgUpdateGroupPolicyAdminV1.fromAmino(data, isClassic);
      case 'group/MsgCreateGroupWithPolicy':
      case 'cosmos-sdk/MsgCreateGroupWithPolicy':
        return MsgCreateGroupWithPolicyV1.fromAmino(data, isClassic);
      case 'group/MsgUpdateGroupDecisionPolicy':
      case 'cosmos-sdk/MsgUpdateGroupDecisionPolicy':
        return MsgUpdateGroupPolicyDecisionPolicyV1.fromAmino(data, isClassic);
      case 'group/MsgUpdateGroupPolicyMetadata':
      case 'cosmos-sdk/MsgUpdateGroupPolicyMetadata':
        return MsgUpdateGroupPolicyMetadataV1.fromAmino(data, isClassic);
      case 'group/MsgSubmitProposal':
      case 'cosmos-sdk/group/MsgSubmitProposal':
        return MsgGroupSubmitProposalV1.fromAmino(data, isClassic);
      case 'group/MsgWithdrawProposal':
      case 'cosmos-sdk/group/MsgWithdrawProposal':
        return MsgGroupWithdrawProposalV1.fromAmino(data, isClassic);
      case 'group/MsgVote':
      case 'cosmos-sdk/group/MsgVote':
        return MsgGroupVoteV1.fromAmino(data, isClassic);
      case 'group/MsgExec':
      case 'cosmos-sdk/group/MsgExec':
        return MsgGroupExecV1.fromAmino(data, isClassic);
      case 'group/MsgLeaveGroup':
      case 'cosmos-sdk/group/MsgLeaveGroup':
        return MsgLeaveGroupV1.fromAmino(data, isClassic);

      // mint
      case 'cosmos-sdk/x/mint/MsgUpdateParams':
        return MsgUpdateMintParamsV1B1.fromAmino(data, isClassic);

      // msgauth
      case 'msgauth/MsgGrantAuthorization':
      case 'cosmos-sdk/MsgGrant':
        return MsgGrantAuthorization.fromAmino(data, isClassic);
      case 'msgauth/MsgRevokeAuthorization':
      case 'cosmos-sdk/MsgRevoke':
        return MsgRevokeAuthorization.fromAmino(data, isClassic);
      case 'msgauth/MsgExecAuthorized':
      case 'cosmos-sdk/MsgExec':
        return MsgExecAuthorized.fromAmino(data, isClassic);

      // slashing
      case 'slashing/MsgUnjail':
      case 'cosmos-sdk/MsgUnjail':
        return MsgUnjailV1B1.fromAmino(data, isClassic);
      case 'cosmos-sdk/x/slashing/MsgUpdateParams':
        return MsgUpdateSlashingParamsV1B1.fromAmino(data, isClassic);

      // staking
      case 'staking/MsgDelegate':
      case 'cosmos-sdk/MsgDelegate':
        return MsgDelegateV1B1.fromAmino(data, isClassic);
      case 'staking/MsgUndelegate':
      case 'cosmos-sdk/MsgUndelegate':
        return MsgUndelegateV1B1.fromAmino(data, isClassic);
      case 'staking/MsgBeginRedelegate':
      case 'cosmos-sdk/MsgBeginRedelegate':
        return MsgBeginRedelegateV1B1.fromAmino(data, isClassic);
      case 'staking/MsgCreateValidator':
      case 'cosmos-sdk/MsgCreateValidator':
        return MsgCreateValidatorV1B1.fromAmino(data, isClassic);
      case 'staking/MsgEditValidator':
      case 'cosmos-sdk/MsgEditValidator':
        return MsgEditValidatorV1B1.fromAmino(data, isClassic);
      case 'staking/MsgCancelUnbondingDelegation':
      case 'cosmos-sdk/MsgCancelUnbondingDelegation':
        return MsgCancelUnbondingDelegationV1B1.fromAmino(data, isClassic);
      case 'cosmos-sdk/x/staking/MsgUpdateParams':
        return MsgUpdateStakingParamsV1B1.fromAmino(data, isClassic);

      // vesting
      case 'vesting/MsgCreateVestingAccount':
      case 'cosmos-sdk/MsgCreateVestingAccount':
        return MsgCreateVestingAccountV1B1.fromAmino(data, isClassic);
      case 'vesting/MsgCreatePermanentLockedAccount':
      case 'cosmos-sdk/MsgCreatePermanentLockedAccount':
        return MsgCreatePermanentLockedAccountV1B1.fromAmino(data, isClassic);
      case 'vesting/MsgCreatePeriodicVestingAccount':
      case 'cosmos-sdk/MsgCreatePeriodicVestingAccount':
        return MsgCreatePeriodicVestingAccountV1B1.fromAmino(data, isClassic);

      // upgrade
      case 'upgrade/MsgSoftwareUpgrade':
      case 'cosmos-sdk/MsgSoftwareUpgrade':
        return MsgSoftwareUpgradeV1B1.fromAmino(data, isClassic);
      case 'upgrade/MsgCancelUpgrade':
      case 'cosmos-sdk/MsgCancelUpgrade':
        return MsgCancelUpgradeV1B1.fromAmino(data, isClassic);

      // wasm
      case 'wasm/MsgStoreCode':
        return MsgStoreCodeV1.fromAmino(data, isClassic);
      case 'wasm/MsgInstantiateContract':
        return MsgInstantiateContractV1.fromAmino(data, isClassic);
      case 'wasm/MsgInstantiateContract2':
        return MsgInstantiateContract2V1.fromAmino(data, isClassic);
      case 'wasm/MsgExecuteContract':
        return MsgExecuteContractV1.fromAmino(data, isClassic);
      case 'wasm/MsgMigrateContract':
        return MsgMigrateContractV1.fromAmino(data, isClassic);
      case 'wasm/MsgUpdateAdmin':
        return MsgUpdateContractAdminV1.fromAmino(data, isClassic);
      case 'wasm/MsgClearContractAdmin':
      case 'wasm/MsgClearAdmin':
        return MsgClearContractAdminV1.fromAmino(data, isClassic);
      case 'wasm/MsgSudoContract':
        return MsgSudoContractV1.fromAmino(data, isClassic);
      case 'wasm/MsgPinCodes':
        return MsgPinCodesV1.fromAmino(data, isClassic);
      case 'wasm/MsgUnpinCodes':
        return MsgUnpinCodesV1.fromAmino(data, isClassic);
      case 'wasm/MsgStoreAndInstantiateContract':
        return MsgStoreAndInstantiateContractV1.fromAmino(data, isClassic);
      case 'wasm/MsgAddCodeUploadParamsAddresses':
        return MsgAddCodeUploadParamsAddressesV1.fromAmino(data, isClassic);
      case 'wasm/MsgRemoveCodeUploadParamsAddresses':
        return MsgRemoveCodeUploadParamsAddressesV1.fromAmino(data, isClassic);
      case 'wasm/MsgStoreAndMigrateContract':
        return MsgStoreAndMigrateContractV1.fromAmino(data, isClassic);
      case 'wasm/MsgUpdateContractLabel':
        return MsgUpdateContractLabelV1.fromAmino(data, isClassic);
      case 'wasm/MsgUpdateInstantiateConfig':
        return MsgUpdateInstantiateConfigV1.fromAmino(data, isClassic);
      case 'wasm/MsgUpdateParams':
        return MsgUpdateWasmParamsV1.fromAmino(data, isClassic);

      // ibc-transfer
      case 'cosmos-sdk/MsgTransfer':
        return MsgTransferV1.fromAmino(data, isClassic);

      // crisis
      case 'crisis/MsgVerifyInvariant':
      case 'cosmos-sdk/MsgVerifyInvariant':
        return MsgVerifyInvariant.fromAmino(data, isClassic);

      // erc20
      case 'ethermint/MsgConvertCoin':
      case 'evmos/MsgConvertCoin':
        return MsgConvertCoinV1.fromAmino(data);
      case 'ethermint/MsgConvertERC20':
      case 'evmos/MsgConvertERC20':
        return MsgConvertERC20V1.fromAmino(data);
      case 'ethermint/erc20/MsgUpdateParams':
      case 'evmos/erc20/MsgUpdateParams':
        return MsgUpdateERC20ParamsV1.fromAmino(data);

      // evm
      case 'ethermint/MsgEthereumTx':
        return MsgEthereumTxV1.fromAmino(data);
      case 'ethermint/x/evm/MsgUpdateParams':
        return MsgUpdateEvmParamsV1.fromAmino(data);

      // xpla
      case 'xpladev/MsgFundFeeCollector':
      case 'xpladev/MsgFundRewardPool':
        return MsgFundRewardPoolV1B1.fromAmino(data);
      case 'xpladev/x/reward/MsgUpdateParams':
        return MsgUpdateRewardParamsV1B1.fromAmino(data);
      case 'xpladev/MsgRegisterVolunteerValidator':
        return MsgRegisterVolunteerValidatorV1B1.fromAmino(data);
      case 'xpladev/MsgUnregisterVolunteerValidator':
        return MsgUnregisterVolunteerValidatorV1B1.fromAmino(data);

      // protocolpool
      case 'protocolpool/MsgFundCommunityPool':
        return MsgFundCommunityPoolV1.fromAmino(data);
      case 'protocolpool/MsgCommunityPoolSpend':
        return MsgCommunityPoolSpendV1.fromAmino(data);
      case 'protocolpool/MsgCreateContinuousFund':
        return MsgCreateContinuousFundV1.fromAmino(data);
      case 'protocolpool/MsgCancelContinuousFund':
        return MsgCancelContinuousFundV1.fromAmino(data);
      case 'protocolpool/MsgUpdateParams':
        return MsgUpdateProtocolPoolParamsV1.fromAmino(data);

      default:
        throw Error(`not supported msg ${data['type']}`);
    }
  }
  export function fromData(data: Msg.Data, isClassic?: boolean): Msg {
    switch (data['@type']) {
      // auth
      case '/cosmos.auth.v1beta1.MsgUpdateParams':
        return MsgUpdateAuthParamsV1B1.fromData(data, isClassic);

      // bank
      case '/cosmos.bank.v1beta1.MsgSend':
        return MsgSendV1B1.fromData(data, isClassic);
      case '/cosmos.bank.v1beta1.MsgMultiSend':
        return MsgMultiSendV1B1.fromData(data, isClassic);
      case '/cosmos.bank.v1beta1.MsgSetSendEnabled':
        return MsgSetSendEnabledV1B1.fromData(data, isClassic);
      case '/cosmos.bank.v1beta1.MsgUpdateParams':
        return MsgUpdateBankParamsV1B1.fromData(data, isClassic);

      // circuit
      case '/cosmos.circuit.v1.MsgAuthorizeCircuitBreaker':
        return MsgAuthorizeCircuitBreakerV1.fromData(data, isClassic);
      case '/cosmos.circuit.v1.MsgResetCircuitBreaker':
        return MsgResetCircuitBreakerV1.fromData(data, isClassic);
      case '/cosmos.circuit.v1.MsgTripCircuitBreaker':
        return MsgTripCircuitBreakerV1.fromData(data, isClassic);
      
      // consensus
      case '/cosmos.consensus.v1.MsgUpdateParams':
        return MsgUpdateConsensusParamsV1.fromData(data, isClassic);

      // distribution
      case '/cosmos.distribution.v1beta1.MsgSetWithdrawAddress':
        return MsgSetWithdrawAddressV1B1.fromData(data, isClassic);
      case '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward':
        return MsgWithdrawDelegatorRewardV1B1.fromData(data, isClassic);
      case '/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission':
        return MsgWithdrawValidatorCommissionV1B1.fromData(data, isClassic);
      case '/cosmos.distribution.v1beta1.MsgFundCommunityPool':
        return MsgFundCommunityPoolV1B1.fromData(data, isClassic);
      case '/cosmos.distribution.v1beta1.MsgCommunityPoolSpend':
        return MsgCommunityPoolSpendV1B1.fromData(data, isClassic);
      case '/cosmos.distribution.v1beta1.MsgDepositValidatorRewardsPool':
        return MsgDepositValidatorRewardsPoolV1B1.fromData(data, isClassic);
      case '/cosmos.distribution.v1beta1.MsgUpdateParams':
        return MsgUpdateDistributionParamsV1B1.fromData(data, isClassic);

      // feegrant
      case '/cosmos.feegrant.v1beta1.MsgGrantAllowance':
        return MsgGrantAllowance.fromData(data, isClassic);
      case '/cosmos.feegrant.v1beta1.MsgRevokeAllowance':
        return MsgRevokeAllowance.fromData(data, isClassic);
      case '/cosmos.feegrant.v1beta1.MsgPruneAllowances':
        return MsgPruneAllowances.fromData(data, isClassic);

      // feemarket
      case '/ethermint.feemarket.v1.MsgUpdateParams':
        return MsgUpdateFeemarketParamsV1.fromData(data, isClassic);

      // gov
      case '/cosmos.gov.v1beta1.MsgDeposit':
        return MsgDepositV1B1.fromData(data, isClassic);
      case '/cosmos.gov.v1beta1.MsgSubmitProposal':
        return MsgSubmitProposalV1B1.fromData(data, isClassic);
      case '/cosmos.gov.v1beta1.MsgVote':
        return MsgVoteV1B1.fromData(data, isClassic);
      case '/cosmos.gov.v1beta1.MsgVoteWeighted':
        return MsgVoteWeightedV1B1.fromData(data, isClassic);
      case '/cosmos.gov.v1.MsgDeposit':
        return MsgDepositV1.fromData(data, isClassic);
      case '/cosmos.gov.v1.MsgSubmitProposal':
        return MsgSubmitProposalV1.fromData(data, isClassic);
      case '/cosmos.gov.v1.MsgVote':
        return MsgVoteV1.fromData(data, isClassic);
      case '/cosmos.gov.v1.MsgVoteWeighted':
        return MsgVoteWeightedV1.fromData(data, isClassic);
      case '/cosmos.gov.v1.MsgExecLegacyContent':
        return MsgExecLegacyContentV1.fromData(data, isClassic);
      case '/cosmos.gov.v1.MsgUpdateParams':
        return MsgUpdateGovParamsV1.fromData(data, isClassic);
      case '/cosmos.gov.v1.MsgCancelProposal':
        return MsgCancelProposalV1.fromData(data, isClassic);

      // group
      case '/cosmos.group.v1.MsgCreateGroup':
        return MsgCreateGroupV1.fromData(data, isClassic);
      case '/cosmos.group.v1.MsgUpdateGroupMembers':
        return MsgUpdateGroupMembersV1.fromData(data, isClassic);
      case '/cosmos.group.v1.MsgUpdateGroupAdmin':
        return MsgUpdateGroupAdminV1.fromData(data, isClassic);
      case '/cosmos.group.v1.MsgUpdateGroupMetadata':
        return MsgUpdateGroupMetadataV1.fromData(data, isClassic);
      case '/cosmos.group.v1.MsgCreateGroupPolicy':
        return MsgCreateGroupPolicyV1.fromData(data, isClassic);
      case '/cosmos.group.v1.MsgUpdateGroupPolicyAdmin':
        return MsgUpdateGroupPolicyAdminV1.fromData(data, isClassic);
      case '/cosmos.group.v1.MsgCreateGroupWithPolicy':
        return MsgCreateGroupWithPolicyV1.fromData(data, isClassic);
      case '/cosmos.group.v1.MsgUpdateGroupPolicyDecisionPolicy':
        return MsgUpdateGroupPolicyDecisionPolicyV1.fromData(data, isClassic);
      case '/cosmos.group.v1.MsgUpdateGroupPolicyMetadata':
        return MsgUpdateGroupPolicyMetadataV1.fromData(data, isClassic);
      case '/cosmos.group.v1.MsgSubmitProposal':
        return MsgGroupSubmitProposalV1.fromData(data, isClassic);
      case '/cosmos.group.v1.MsgWithdrawProposal':
        return MsgGroupWithdrawProposalV1.fromData(data, isClassic);
      case '/cosmos.group.v1.MsgVote':
        return MsgGroupVoteV1.fromData(data, isClassic);
      case '/cosmos.group.v1.MsgExec':
        return MsgGroupExecV1.fromData(data, isClassic);
      case '/cosmos.group.v1.MsgLeaveGroup':
        return MsgLeaveGroupV1.fromData(data, isClassic);

      // mint
      case '/cosmos.mint.v1beta1.MsgUpdateParams':
        return MsgUpdateMintParamsV1B1.fromData(data, isClassic);

      // nft
      case '/cosmos.nft.v1beta1.MsgSend':
        return MsgNftSendV1B1.fromData(data, isClassic);

      // authz
      case '/cosmos.authz.v1beta1.MsgGrant':
        return MsgGrantAuthorization.fromData(data, isClassic);
      case '/cosmos.authz.v1beta1.MsgRevoke':
        return MsgRevokeAuthorization.fromData(data, isClassic);
      case '/cosmos.authz.v1beta1.MsgExec':
        return MsgExecAuthorized.fromData(data, isClassic);

      // slashing
      case '/cosmos.slashing.v1beta1.MsgUnjail':
        return MsgUnjailV1B1.fromData(data, isClassic);
      case '/cosmos.slashing.v1beta1.MsgUpdateParams':
        return MsgUpdateSlashingParamsV1B1.fromData(data, isClassic);

      // staking
      case '/cosmos.staking.v1beta1.MsgDelegate':
        return MsgDelegateV1B1.fromData(data, isClassic);
      case '/cosmos.staking.v1beta1.MsgUndelegate':
        return MsgUndelegateV1B1.fromData(data, isClassic);
      case '/cosmos.staking.v1beta1.MsgBeginRedelegate':
        return MsgBeginRedelegateV1B1.fromData(data, isClassic);
      case '/cosmos.staking.v1beta1.MsgCreateValidator':
        return MsgCreateValidatorV1B1.fromData(data, isClassic);
      case '/cosmos.staking.v1beta1.MsgEditValidator':
        return MsgEditValidatorV1B1.fromData(data, isClassic);
      case '/cosmos.staking.v1beta1.MsgCancelUnbondingDelegation':
        return MsgCancelUnbondingDelegationV1B1.fromData(data, isClassic);
      case '/cosmos.staking.v1beta1.MsgUpdateParams':
        return MsgUpdateStakingParamsV1B1.fromData(data, isClassic);

      // vesting
      case '/cosmos.vesting.v1beta1.MsgCreateVestingAccount':
        return MsgCreateVestingAccountV1B1.fromData(data, isClassic);
      case '/cosmos.vesting.v1beta1.MsgCreatePermanentLockedAccount':
        return MsgCreatePermanentLockedAccountV1B1.fromData(data, isClassic);
      case '/cosmos.vesting.v1beta1.MsgCreatePeriodicVestingAccount':
        return MsgCreatePeriodicVestingAccountV1B1.fromData(data, isClassic);

      // upgrade
      case '/cosmos.upgrade.v1beta1.MsgSoftwareUpgrade':
        return MsgSoftwareUpgradeV1B1.fromData(data, isClassic);
      case '/cosmos.upgrade.v1beta1.MsgCancelUpgrade':
        return MsgCancelUpgradeV1B1.fromData(data, isClassic);

      // wasm
      case '/cosmwasm.wasm.v1.MsgStoreCode':
        return MsgStoreCodeV1.fromData(data, isClassic);
      case '/cosmwasm.wasm.v1.MsgInstantiateContract':
        return MsgInstantiateContractV1.fromData(data, isClassic);
      case '/cosmwasm.wasm.v1.MsgExecuteContract':
        return MsgExecuteContractV1.fromData(data, isClassic);
      case '/cosmwasm.wasm.v1.MsgMigrateContract':
        return MsgMigrateContractV1.fromData(data, isClassic);
      case '/cosmwasm.wasm.v1.MsgUpdateAdmin':
        return MsgUpdateContractAdminV1.fromData(data, isClassic);
      case '/cosmwasm.wasm.v1.MsgClearAdmin':
        return MsgClearContractAdminV1.fromData(data, isClassic);
      case '/cosmwasm.wasm.v1.MsgSudoContract':
        return MsgSudoContractV1.fromData(data, isClassic);
      case '/cosmwasm.wasm.v1.MsgPinCodes':
        return MsgPinCodesV1.fromData(data, isClassic);
      case '/cosmwasm.wasm.v1.MsgUnpinCodes':
        return MsgUnpinCodesV1.fromData(data, isClassic);
      case '/cosmwasm.wasm.v1.MsgStoreAndInstantiateContract':
        return MsgStoreAndInstantiateContractV1.fromData(data, isClassic);
      case '/cosmwasm.wasm.v1.MsgAddCodeUploadParamsAddresses':
        return MsgAddCodeUploadParamsAddressesV1.fromData(data, isClassic);
      case '/cosmwasm.wasm.v1.MsgRemoveCodeUploadParamsAddresses':
        return MsgRemoveCodeUploadParamsAddressesV1.fromData(data, isClassic);
      case '/cosmwasm.wasm.v1.MsgStoreAndMigrateContract':
        return MsgStoreAndMigrateContractV1.fromData(data, isClassic);
      case '/cosmwasm.wasm.v1.MsgUpdateContractLabel':
        return MsgUpdateContractLabelV1.fromData(data, isClassic);
      case '/cosmwasm.wasm.v1.MsgUpdateParams':
        return MsgUpdateWasmParamsV1.fromData(data, isClassic);
      case '/cosmwasm.wasm.v1.MsgUpdateInstantiateConfig':
        return MsgUpdateInstantiateConfigV1.fromData(data, isClassic);
      case '/cosmwasm.wasm.v1.MsgIBCSend':
        return MsgIBCSendV1.fromData(data, isClassic);
      case '/cosmwasm.wasm.v1.MsgIBCCloseChannel':
        return MsgIBCCloseChannelV1.fromData(data, isClassic);

      // ibc-ica
      case '/ibc.applications.interchain_accounts.controller.v1.MsgRegisterInterchainAccount':
        return MsgRegisterInterchainAccountV1.fromData(data);
      case '/ibc.applications.interchain_accounts.controller.v1.MsgSendTx':
        return MsgSendTxV1.fromData(data);
      case '/ibc.applications.interchain_accounts.controller.v1.MsgUpdateParams':
        return MsgUpdateIcaControllerParamsV1.fromData(data);
      case '/ibc.applications.interchain_accounts.host.v1.MsgModuleQuerySafe':
        return MsgModuleQuerySafeV1.fromData(data, isClassic);
      case '/ibc.applications.interchain_accounts.host.v1.MsgUpdateParams':
        return MsgUpdateIcaHostParamsV1.fromData(data);

      // ibc-transfer
      case '/ibc.applications.transfer.v1.MsgTransfer':
        return MsgTransferV1.fromData(data, isClassic);
      case '/ibc.applications.transfer.v1.MsgUpdateParams':
        return MsgUpdateIbcTransferParamsV1.fromData(data);

      // ibc-client
      case '/ibc.core.client.v1.MsgCreateClient':
        return MsgCreateClientV1.fromData(data, isClassic);
      case '/ibc.core.client.v1.MsgUpdateClient':
        return MsgUpdateClientV1.fromData(data, isClassic);
      case '/ibc.core.client.v1.MsgUpgradeClient':
        return MsgUpgradeClientV1.fromData(data, isClassic);
      case '/ibc.core.client.v1.MsgSubmitMisbehaviour':
        return MsgSubmitMisbehaviourV1.fromData(data, isClassic);
      case '/ibc.core.client.v1.MsgRecoverClient':
        return MsgRecoverClientV1.fromData(data, isClassic);
      case '/ibc.core.client.v1.MsgIBCSoftwareUpgrade':
        return MsgIbcSoftwareUpgradeV1.fromData(data, isClassic);
      case '/ibc.core.client.v1.MsgUpdateParams':
        return MsgUpdateIbcClientParamsV1.fromData(data, isClassic);
      case '/ibc.core.client.v1.MsgDeleteClientCreator':
        return MsgDeleteClientCreatorV1.fromData(data, isClassic);
      case '/ibc.core.client.v2.MsgUpdateClientConfig':
        return MsgUpdateClientConfigV2.fromData(data);
      case '/ibc.core.client.v2.MsgRegisterCounterparty':
        return MsgRegisterCounterpartyV2.fromData(data);

      // ibc-connection
      case '/ibc.core.connection.v1.MsgConnectionOpenInit':
        return MsgConnectionOpenInitV1.fromData(data);
      case '/ibc.core.connection.v1.MsgConnectionOpenTry':
        return MsgConnectionOpenTryV1.fromData(data);
      case '/ibc.core.connection.v1.MsgConnectionOpenConfirm':
        return MsgConnectionOpenConfirmV1.fromData(data);
      case '/ibc.core.connection.v1.MsgConnectionOpenAck':
        return MsgConnectionOpenAckV1.fromData(data);
      case '/ibc.core.connection.v1.MsgUpdateParams':
        return MsgUpdateIbcConnectionParamsV1.fromData(data);

      // ibc-channel
      case '/ibc.core.channel.v1.MsgChannelOpenInit':
        return MsgChannelOpenInitV1.fromData(data);
      case '/ibc.core.channel.v1.MsgChannelOpenTry':
        return MsgChannelOpenTryV1.fromData(data);
      case '/ibc.core.channel.v1.MsgChannelOpenConfirm':
        return MsgChannelOpenConfirmV1.fromData(data);
      case '/ibc.core.channel.v1.MsgChannelOpenAck':
        return MsgChannelOpenAckV1.fromData(data);
      case '/ibc.core.channel.v1.MsgChannelCloseInit':
        return MsgChannelCloseInitV1.fromData(data);
      case '/ibc.core.channel.v1.MsgChannelCloseConfirm':
        return MsgChannelCloseConfirmV1.fromData(data);
      case '/ibc.core.channel.v1.MsgRecvPacket':
        return MsgRecvPacketV1.fromData(data);
      case '/ibc.core.channel.v1.MsgAcknowledgement':
        return MsgAcknowledgementV1.fromData(data);
      case '/ibc.core.channel.v1.MsgTimeout':
        return MsgTimeoutV1.fromData(data);
      case '/ibc.core.channel.v1.MsgTimeoutOnClose':
        return MsgTimeoutOnCloseV1.fromData(data);
      case '/ibc.core.channel.v2.MsgSendPacket':
        return MsgSendPacketV2.fromData(data);
      case '/ibc.core.channel.v2.MsgRecvPacket':
        return MsgRecvPacketV2.fromData(data);
      case '/ibc.core.channel.v2.MsgAcknowledgement':
        return MsgAcknowledgementV2.fromData(data);
      case '/ibc.core.channel.v2.MsgTimeout':
        return MsgTimeoutV2.fromData(data);

      // crisis
      case '/cosmos.crisis.v1beta1.MsgVerifyInvariant':
        return MsgVerifyInvariant.fromData(data, isClassic);

      // erc20
      case '/ethermint.erc20.v1.MsgConvertCoin':
      case '/evmos.erc20.v1.MsgConvertCoin':
        return MsgConvertCoinV1.fromData(data);
      case '/ethermint.erc20.v1.MsgConvertERC20':
      case '/evmos.erc20.v1.MsgConvertERC20':
        return MsgConvertERC20V1.fromData(data);

      // evm
      case '/ethermint.evm.v1.MsgEthereumTx':
        return MsgEthereumTxV1.fromData(data);
      case '/cosmos.evm.vm.v1.MsgEthereumTx':
        return MsgEthereumTxV1.fromData(data);

      // xpla
      case '/xpla.reward.v1beta1.MsgFundFeeCollector':
      case '/xpla.reward.v1beta1.MsgFundRewardPool':
        return MsgFundRewardPoolV1B1.fromData(data);
      case '/xpla.reward.v1beta1.MsgUpdateParams':
        return MsgUpdateRewardParamsV1B1.fromData(data);
      case '/xpla.volunteer.v1beta1.MsgRegisterVolunteerValidator':
        return MsgRegisterVolunteerValidatorV1B1.fromData(data);
      case '/xpla.volunteer.v1beta1.MsgUnregisterVolunteerValidator':
        return MsgUnregisterVolunteerValidatorV1B1.fromData(data);
      case '/xpla.burn.v1beta1.MsgBurn':
        return MsgBurnV1B1.fromData(data);

      // protocolpool
      case '/cosmos.protocolpool.v1.MsgFundCommunityPool':
        return MsgFundCommunityPoolV1.fromData(data);
      case '/cosmos.protocolpool.v1.MsgCommunityPoolSpend':
        return MsgCommunityPoolSpendV1.fromData(data);
      case '/cosmos.protocolpool.v1.MsgCreateContinuousFund':
        return MsgCreateContinuousFundV1.fromData(data);
      case '/cosmos.protocolpool.v1.MsgCancelContinuousFund':
        return MsgCancelContinuousFundV1.fromData(data);
      case '/cosmos.protocolpool.v1.MsgUpdateParams':
        return MsgUpdateProtocolPoolParamsV1.fromData(data);

      default:
        throw Error(`not supported msg ${data['@type']}`);
    }
  }

  export function fromProto(proto: Any, isClassic?: boolean): Msg {
    switch (proto.typeUrl) {
      // auth
      case '/cosmos.auth.v1beta1.MsgUpdateParams':
        return MsgUpdateAuthParamsV1B1.unpackAny(proto, isClassic);

      // bank
      case '/cosmos.bank.v1beta1.MsgSend':
        return MsgSendV1B1.unpackAny(proto, isClassic);
      case '/cosmos.bank.v1beta1.MsgMultiSend':
        return MsgMultiSendV1B1.unpackAny(proto, isClassic);
      case '/cosmos.bank.v1beta1.MsgSetSendEnabled':
        return MsgSetSendEnabledV1B1.unpackAny(proto, isClassic);
      case '/cosmos.bank.v1beta1.MsgUpdateParams':
        return MsgUpdateBankParamsV1B1.unpackAny(proto, isClassic);

      // circuit
      case '/cosmos.circuit.v1.MsgAuthorizeCircuitBreaker':
        return MsgAuthorizeCircuitBreakerV1.unpackAny(proto, isClassic);
      case '/cosmos.circuit.v1.MsgResetCircuitBreaker':
        return MsgResetCircuitBreakerV1.unpackAny(proto, isClassic);
      case '/cosmos.circuit.v1.MsgTripCircuitBreaker':
        return MsgTripCircuitBreakerV1.unpackAny(proto, isClassic);

      // consensus
      case '/cosmos.consensus.v1.MsgUpdateParams':
        return MsgUpdateConsensusParamsV1.unpackAny(proto, isClassic);

      // distribution
      case '/cosmos.distribution.v1beta1.MsgSetWithdrawAddress':
        return MsgSetWithdrawAddressV1B1.unpackAny(proto, isClassic);
      case '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward':
        return MsgWithdrawDelegatorRewardV1B1.unpackAny(proto, isClassic);
      case '/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission':
        return MsgWithdrawValidatorCommissionV1B1.unpackAny(proto, isClassic);
      case '/cosmos.distribution.v1beta1.MsgFundCommunityPool':
        return MsgFundCommunityPoolV1B1.unpackAny(proto, isClassic);
      case '/cosmos.distribution.v1beta1.MsgCommunityPoolSpend':
        return MsgCommunityPoolSpendV1B1.unpackAny(proto, isClassic);
      case '/cosmos.distribution.v1beta1.MsgDepositValidatorRewardsPool':
        return MsgDepositValidatorRewardsPoolV1B1.unpackAny(proto, isClassic);
      case '/cosmos.distribution.v1beta1.MsgUpdateParams':
        return MsgUpdateDistributionParamsV1B1.unpackAny(proto, isClassic);

      // feegrant
      case '/cosmos.feegrant.v1beta1.MsgGrantAllowance':
        return MsgGrantAllowance.unpackAny(proto, isClassic);
      case '/cosmos.feegrant.v1beta1.MsgRevokeAllowance':
        return MsgRevokeAllowance.unpackAny(proto, isClassic);
      case '/cosmos.feegrant.v1beta1.MsgPruneAllowances':
        return MsgPruneAllowances.unpackAny(proto, isClassic);

      // feemarket
      case '/ethermint.feemarket.v1.MsgUpdateParams':
        return MsgUpdateFeemarketParamsV1.unpackAny(proto, isClassic);

      // gov
      case '/cosmos.gov.v1beta1.MsgDeposit':
        return MsgDepositV1B1.unpackAny(proto, isClassic);
      case '/cosmos.gov.v1beta1.MsgSubmitProposal':
        return MsgSubmitProposalV1B1.unpackAny(proto, isClassic);
      case '/cosmos.gov.v1beta1.MsgVote':
        return MsgVoteV1B1.unpackAny(proto, isClassic);
      case '/cosmos.gov.v1beta1.MsgVoteWeighted':
        return MsgVoteWeightedV1B1.unpackAny(proto, isClassic);
      case '/cosmos.gov.v1.MsgDeposit':
        return MsgDepositV1.unpackAny(proto, isClassic);
      case '/cosmos.gov.v1.MsgSubmitProposal':
        return MsgSubmitProposalV1.unpackAny(proto, isClassic);
      case '/cosmos.gov.v1.MsgVote':
        return MsgVoteV1.unpackAny(proto, isClassic);
      case '/cosmos.gov.v1.MsgVoteWeighted':
        return MsgVoteWeightedV1.unpackAny(proto, isClassic);
      case '/cosmos.gov.v1.MsgExecLegacyContent':
        return MsgExecLegacyContentV1.unpackAny(proto, isClassic);
      case '/cosmos.gov.v1.MsgUpdateParams':
        return MsgUpdateGovParamsV1.unpackAny(proto, isClassic);
      case '/cosmos.gov.v1.MsgCancelProposal':
        return MsgCancelProposalV1.unpackAny(proto, isClassic);

      // group
      case '/cosmos.group.v1.MsgCreateGroup':
        return MsgCreateGroupV1.unpackAny(proto, isClassic);
      case '/cosmos.group.v1.MsgUpdateGroupMembers':
        return MsgUpdateGroupMembersV1.unpackAny(proto, isClassic);
      case '/cosmos.group.v1.MsgUpdateGroupAdmin':
        return MsgUpdateGroupAdminV1.unpackAny(proto, isClassic);
      case '/cosmos.group.v1.MsgUpdateGroupMetadata':
        return MsgUpdateGroupMetadataV1.unpackAny(proto, isClassic);
      case '/cosmos.group.v1.MsgCreateGroupPolicy':
        return MsgCreateGroupPolicyV1.unpackAny(proto, isClassic);
      case '/cosmos.group.v1.MsgUpdateGroupPolicyAdmin':
        return MsgUpdateGroupPolicyAdminV1.unpackAny(proto, isClassic);
      case '/cosmos.group.v1.MsgCreateGroupWithPolicy':
        return MsgCreateGroupWithPolicyV1.unpackAny(proto, isClassic);
      case '/cosmos.group.v1.MsgUpdateGroupPolicyDecisionPolicy':
        return MsgUpdateGroupPolicyDecisionPolicyV1.unpackAny(proto, isClassic);
      case '/cosmos.group.v1.MsgUpdateGroupPolicyMetadata':
        return MsgUpdateGroupPolicyMetadataV1.unpackAny(proto, isClassic);
      case '/cosmos.group.v1.MsgSubmitProposal':
        return MsgGroupSubmitProposalV1.unpackAny(proto, isClassic);
      case '/cosmos.group.v1.MsgWithdrawProposal':
        return MsgGroupWithdrawProposalV1.unpackAny(proto, isClassic);
      case '/cosmos.group.v1.MsgVote':
        return MsgGroupVoteV1.unpackAny(proto, isClassic);
      case '/cosmos.group.v1.MsgExec':
        return MsgGroupExecV1.unpackAny(proto, isClassic);
      case '/cosmos.group.v1.MsgLeaveGroup':
        return MsgLeaveGroupV1.unpackAny(proto, isClassic);

      // mint
      case '/cosmos.mint.v1beta1.MsgUpdateParams':
        return MsgUpdateMintParamsV1B1.unpackAny(proto, isClassic);

      // nft
      case '/cosmos.nft.v1beta1.MsgSend':
        return MsgNftSendV1B1.unpackAny(proto, isClassic);

      // authz
      case '/cosmos.authz.v1beta1.MsgGrant':
        return MsgGrantAuthorization.unpackAny(proto, isClassic);
      case '/cosmos.authz.v1beta1.MsgRevoke':
        return MsgRevokeAuthorization.unpackAny(proto, isClassic);
      case '/cosmos.authz.v1beta1.MsgExec':
        return MsgExecAuthorized.unpackAny(proto, isClassic);

      // slashing
      case '/cosmos.slashing.v1beta1.MsgUnjail':
        return MsgUnjailV1B1.unpackAny(proto, isClassic);
      case '/cosmos.slashing.v1beta1.MsgUpdateParams':
        return MsgUpdateSlashingParamsV1B1.unpackAny(proto, isClassic);

      // staking
      case '/cosmos.staking.v1beta1.MsgDelegate':
        return MsgDelegateV1B1.unpackAny(proto, isClassic);
      case '/cosmos.staking.v1beta1.MsgUndelegate':
        return MsgUndelegateV1B1.unpackAny(proto, isClassic);
      case '/cosmos.staking.v1beta1.MsgBeginRedelegate':
        return MsgBeginRedelegateV1B1.unpackAny(proto, isClassic);
      case '/cosmos.staking.v1beta1.MsgCreateValidator':
        return MsgCreateValidatorV1B1.unpackAny(proto, isClassic);
      case '/cosmos.staking.v1beta1.MsgEditValidator':
        return MsgEditValidatorV1B1.unpackAny(proto, isClassic);
      case '/cosmos.staking.v1beta1.MsgCancelUnbondingDelegation':
        return MsgCancelUnbondingDelegationV1B1.unpackAny(proto, isClassic);
      case '/cosmos.staking.v1beta1.MsgUpdateParams':
        return MsgUpdateStakingParamsV1B1.unpackAny(proto, isClassic);

      // vesting
      case '/cosmos.vesting.v1beta1.MsgCreateVestingAccount':
        return MsgCreateVestingAccountV1B1.unpackAny(proto, isClassic);
      case '/cosmos.vesting.v1beta1.MsgCreatePermanentLockedAccount':
        return MsgCreatePermanentLockedAccountV1B1.unpackAny(proto, isClassic);
      case '/cosmos.vesting.v1beta1.MsgCreatePeriodicVestingAccount':
        return MsgCreatePeriodicVestingAccountV1B1.unpackAny(proto, isClassic);

      // upgrade
      case '/cosmos.upgrade.v1beta1.MsgSoftwareUpgrade':
        return MsgSoftwareUpgradeV1B1.unpackAny(proto, isClassic);
      case '/cosmos.upgrade.v1beta1.MsgCancelUpgrade':
        return MsgCancelUpgradeV1B1.unpackAny(proto, isClassic);

      // wasm
      case '/cosmwasm.wasm.v1.MsgStoreCode':
        return MsgStoreCodeV1.unpackAny(proto, isClassic);
      case '/cosmwasm.wasm.v1.MsgInstantiateContract':
        return MsgInstantiateContractV1.unpackAny(proto, isClassic);
      case '/cosmwasm.wasm.v1.MsgExecuteContract':
        return MsgExecuteContractV1.unpackAny(proto, isClassic);
      case '/cosmwasm.wasm.v1.MsgMigrateContract':
        return MsgMigrateContractV1.unpackAny(proto, isClassic);
      case '/cosmwasm.wasm.v1.MsgUpdateAdmin':
        return MsgUpdateContractAdminV1.unpackAny(proto, isClassic);
      case '/cosmwasm.wasm.v1.MsgClearAdmin':
        return MsgClearContractAdminV1.unpackAny(proto, isClassic);
      case '/cosmwasm.wasm.v1.MsgSudoContract':
        return MsgSudoContractV1.unpackAny(proto, isClassic);
      case '/cosmwasm.wasm.v1.MsgPinCodes':
        return MsgPinCodesV1.unpackAny(proto, isClassic);
      case '/cosmwasm.wasm.v1.MsgUnpinCodes':
        return MsgUnpinCodesV1.unpackAny(proto, isClassic);
      case '/cosmwasm.wasm.v1.MsgStoreAndInstantiateContract':
        return MsgStoreAndInstantiateContractV1.unpackAny(proto, isClassic);
      case '/cosmwasm.wasm.v1.MsgAddCodeUploadParamsAddresses':
        return MsgAddCodeUploadParamsAddressesV1.unpackAny(proto, isClassic);
      case '/cosmwasm.wasm.v1.MsgRemoveCodeUploadParamsAddresses':
        return MsgRemoveCodeUploadParamsAddressesV1.unpackAny(proto, isClassic);
      case '/cosmwasm.wasm.v1.MsgStoreAndMigrateContract':
        return MsgStoreAndMigrateContractV1.unpackAny(proto, isClassic);
      case '/cosmwasm.wasm.v1.MsgUpdateContractLabel':
        return MsgUpdateContractLabelV1.unpackAny(proto, isClassic);
      case '/cosmwasm.wasm.v1.MsgUpdateParams':
        return MsgUpdateWasmParamsV1.unpackAny(proto, isClassic);
      case '/cosmwasm.wasm.v1.MsgUpdateInstantiateConfig':
        return MsgUpdateInstantiateConfigV1.unpackAny(proto, isClassic);
      case '/cosmwasm.wasm.v1.MsgIBCSend':
        return MsgIBCSendV1.unpackAny(proto, isClassic);
      case '/cosmwasm.wasm.v1.MsgIBCCloseChannel':
        return MsgIBCCloseChannelV1.unpackAny(proto, isClassic);

      // ibc-ica
      case '/ibc.applications.interchain_accounts.controller.v1.MsgRegisterInterchainAccount':
        return MsgRegisterInterchainAccountV1.unpackAny(proto);
      case '/ibc.applications.interchain_accounts.controller.v1.MsgSendTx':
        return MsgSendTxV1.unpackAny(proto);
      case '/ibc.applications.interchain_accounts.controller.v1.MsgUpdateParams':
        return MsgUpdateIcaControllerParamsV1.unpackAny(proto);
      case '/ibc.applications.interchain_accounts.host.v1.MsgModuleQuerySafe':
        return MsgModuleQuerySafeV1.unpackAny(proto, isClassic);
      case '/ibc.applications.interchain_accounts.host.v1.MsgUpdateParams':
        return MsgUpdateIcaHostParamsV1.unpackAny(proto);

      // ibc-transfer
      case '/ibc.applications.transfer.v1.MsgTransfer':
        return MsgTransferV1.unpackAny(proto, isClassic);
      case '/ibc.applications.transfer.v1.MsgUpdateParams':
        return MsgUpdateIbcTransferParamsV1.unpackAny(proto);

      // ibc-client
      case '/ibc.core.client.v1.MsgCreateClient':
        return MsgCreateClientV1.unpackAny(proto, isClassic);
      case '/ibc.core.client.v1.MsgUpdateClient':
        return MsgUpdateClientV1.unpackAny(proto, isClassic);
      case '/ibc.core.client.v1.MsgUpgradeClient':
        return MsgUpgradeClientV1.unpackAny(proto, isClassic);
      case '/ibc.core.client.v1.MsgSubmitMisbehaviour':
        return MsgSubmitMisbehaviourV1.unpackAny(proto, isClassic);
      case '/ibc.core.client.v1.MsgRecoverClient':
        return MsgRecoverClientV1.unpackAny(proto, isClassic);
      case '/ibc.core.client.v1.MsgIBCSoftwareUpgrade':
        return MsgIbcSoftwareUpgradeV1.unpackAny(proto, isClassic);
      case '/ibc.core.client.v1.MsgUpdateParams':
        return MsgUpdateIbcClientParamsV1.unpackAny(proto, isClassic);
      case '/ibc.core.client.v1.MsgDeleteClientCreator':
        return MsgDeleteClientCreatorV1.unpackAny(proto, isClassic);
      case '/ibc.core.client.v2.MsgUpdateClientConfig':
        return MsgUpdateClientConfigV2.unpackAny(proto);
      case '/ibc.core.client.v2.MsgRegisterCounterparty':
        return MsgRegisterCounterpartyV2.unpackAny(proto);

      // ibc-connection
      case '/ibc.core.connection.v1.MsgConnectionOpenInit':
        return MsgConnectionOpenInitV1.unpackAny(proto);
      case '/ibc.core.connection.v1.MsgConnectionOpenTry':
        return MsgConnectionOpenTryV1.unpackAny(proto);
      case '/ibc.core.connection.v1.MsgConnectionOpenConfirm':
        return MsgConnectionOpenConfirmV1.unpackAny(proto);
      case '/ibc.core.connection.v1.MsgConnectionOpenAck':
        return MsgConnectionOpenAckV1.unpackAny(proto);
      case '/ibc.core.connection.v1.MsgUpdateParams':
        return MsgUpdateIbcConnectionParamsV1.unpackAny(proto);

      // ibc-channel
      case '/ibc.core.channel.v1.MsgChannelOpenInit':
        return MsgChannelOpenInitV1.unpackAny(proto);
      case '/ibc.core.channel.v1.MsgChannelOpenTry':
        return MsgChannelOpenTryV1.unpackAny(proto);
      case '/ibc.core.channel.v1.MsgChannelOpenConfirm':
        return MsgChannelOpenConfirmV1.unpackAny(proto);
      case '/ibc.core.channel.v1.MsgChannelOpenAck':
        return MsgChannelOpenAckV1.unpackAny(proto);
      case '/ibc.core.channel.v1.MsgChannelCloseInit':
        return MsgChannelCloseInitV1.unpackAny(proto);
      case '/ibc.core.channel.v1.MsgChannelCloseConfirm':
        return MsgChannelCloseConfirmV1.unpackAny(proto);
      case '/ibc.core.channel.v1.MsgRecvPacket':
        return MsgRecvPacketV1.unpackAny(proto);
      case '/ibc.core.channel.v1.MsgAcknowledgement':
        return MsgAcknowledgementV1.unpackAny(proto);
      case '/ibc.core.channel.v1.MsgTimeout':
        return MsgTimeoutV1.unpackAny(proto);
      case '/ibc.core.channel.v1.MsgTimeoutOnClose':
        return MsgTimeoutOnCloseV1.unpackAny(proto);
      case '/ibc.core.channel.v2.MsgSendPacket':
        return MsgSendPacketV2.unpackAny(proto);
      case '/ibc.core.channel.v2.MsgRecvPacket':
        return MsgRecvPacketV2.unpackAny(proto);
      case '/ibc.core.channel.v2.MsgAcknowledgement':
        return MsgAcknowledgementV2.unpackAny(proto);
      case '/ibc.core.channel.v2.MsgTimeout':
        return MsgTimeoutV2.unpackAny(proto);

      // crisis
      case '/cosmos.crisis.v1beta1.MsgVerifyInvariant':
        return MsgVerifyInvariant.unpackAny(proto, isClassic);

      // erc20
      case '/ethermint.erc20.v1.MsgConvertCoin':
      case '/evmos.erc20.v1.MsgConvertCoin':
        return MsgConvertCoinV1.unpackAny(proto);
      case '/ethermint.erc20.v1.MsgConvertERC20':
      case '/evmos.erc20.v1.MsgConvertERC20':
        return MsgConvertERC20V1.unpackAny(proto);

      // evm
      case '/ethermint.evm.v1.MsgEthereumTx':
        return MsgEthereumTxV1.unpackAny(proto);

      // xpla
      case '/xpla.reward.v1beta1.MsgFundFeeCollector':
      case '/xpla.reward.v1beta1.MsgFundRewardPool':
        return MsgFundRewardPoolV1B1.unpackAny(proto);
      case '/xpla.reward.v1beta1.MsgUpdateParams':
        return MsgUpdateRewardParamsV1B1.unpackAny(proto);
      case '/xpla.volunteer.v1beta1.MsgRegisterVolunteerValidator':
        return MsgRegisterVolunteerValidatorV1B1.unpackAny(proto);
      case '/xpla.volunteer.v1beta1.MsgUnregisterVolunteerValidator':
        return MsgUnregisterVolunteerValidatorV1B1.unpackAny(proto);
      case '/xpla.burn.v1beta1.MsgBurn':
        return MsgBurnV1B1.unpackAny(proto);

      // protocolpool
      case '/cosmos.protocolpool.v1.MsgFundCommunityPool':
        return MsgFundCommunityPoolV1.unpackAny(proto);
      case '/cosmos.protocolpool.v1.MsgCommunityPoolSpend':
        return MsgCommunityPoolSpendV1.unpackAny(proto);
      case '/cosmos.protocolpool.v1.MsgCreateContinuousFund':
        return MsgCreateContinuousFundV1.unpackAny(proto);
      case '/cosmos.protocolpool.v1.MsgCancelContinuousFund':
        return MsgCancelContinuousFundV1.unpackAny(proto);
      case '/cosmos.protocolpool.v1.MsgUpdateParams':
        return MsgUpdateProtocolPoolParamsV1.unpackAny(proto);

      default:
        throw Error(`not supported msg ${proto.typeUrl}`);
    }
  }
}
