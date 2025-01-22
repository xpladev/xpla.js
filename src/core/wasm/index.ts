import { WasmMsgV1 } from './v1/msgs';

export * from './v1/msgs';
export * from './v1/proposals';
export * from './v1/AbsoluteTxPosition';
export * from './v1/AccessConfig';
export * from './v1/AccessConfigUpdate';
export * from './v1/AccessTypeParam';
export * from './v1/HistoryEntry';
export * from './v1/Params';
export * from './util';

export type WasmMsg = WasmMsgV1;

export namespace WasmMsg {
  export type Amino = WasmMsgV1.Amino;
  export type Data = WasmMsgV1.Data;
  export type Proto = WasmMsgV1.Proto;
}

export {
  MsgStoreCodeV1 as MsgStoreCode,
  MsgInstantiateContractV1 as MsgInstantiateContract,
  MsgInstantiateContract2V1 as MsgInstantiateContract2,
  MsgExecuteContractV1 as MsgExecuteContract,
  MsgMigrateContractV1 as MsgMigrateContract,
  MsgUpdateContractAdminV1 as MsgUpdateContractAdmin,
  MsgClearContractAdminV1 as MsgClearContractAdmin,
  MsgSudoContractV1 as MsgSudoContract,
  MsgPinCodesV1 as MsgPinCodes,
  MsgUnpinCodesV1 as MsgUnpinCodes,
  MsgStoreAndInstantiateContractV1 as MsgStoreAndInstantiateContract,
  MsgAddCodeUploadParamsAddressesV1 as MsgAddCodeUploadParamsAddresses,
  MsgRemoveCodeUploadParamsAddressesV1 as MsgRemoveCodeUploadParamsAddresses,
  MsgStoreAndMigrateContractV1 as MsgStoreAndMigrateContract,
  MsgUpdateContractLabelV1 as MsgUpdateContractLabel,
  MsgUpdateWasmParamsV1 as MsgUpdateWasmParams,
  MsgUpdateInstantiateConfigV1 as MsgUpdateInstantiateConfig,
  MsgIBCSendV1 as MsgIBCSend,
  MsgIBCCloseChannelV1 as MsgIBCCloseChannel,
} from './v1/msgs';
