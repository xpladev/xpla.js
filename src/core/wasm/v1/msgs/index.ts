import { MsgStoreCodeV1 } from './MsgStoreCode';
import { MsgInstantiateContractV1 } from './MsgInstantiateContract';
import { MsgInstantiateContract2V1 } from './MsgInstantiateContract2';
import { MsgExecuteContractV1 } from './MsgExecuteContract';
import { MsgMigrateContractV1 } from './MsgMigrateContract';
import { MsgUpdateContractAdminV1 } from './MsgUpdateContractAdmin';
import { MsgClearContractAdminV1 } from './MsgClearContractAdmin';
import { MsgSudoContractV1 } from './MsgSudoContract';
import { MsgPinCodesV1 } from './MsgPinCodes';
import { MsgUnpinCodesV1 } from './MsgUnpinCodes';
import { MsgStoreAndInstantiateContractV1 } from './MsgStoreAndInstantiateContract';
import { MsgAddCodeUploadParamsAddressesV1 } from './MsgAddCodeUploadParamsAddresses';
import { MsgRemoveCodeUploadParamsAddressesV1 } from './MsgRemoveCodeUploadParamsAddresses';
import { MsgStoreAndMigrateContractV1 } from './MsgStoreAndMigrateContract';
import { MsgUpdateContractLabelV1 } from './MsgUpdateContractLabel';
import { MsgUpdateWasmParamsV1 } from './MsgUpdateParams';
import { MsgUpdateInstantiateConfigV1 } from './MsgUpdateInstantiateConfig';
import { MsgIBCSendV1 } from './MsgIBCSend';
import { MsgIBCCloseChannelV1 } from './MsgIBCCloseChannel';

export * from './MsgStoreCode';
export * from './MsgInstantiateContract';
export * from './MsgInstantiateContract2';
export * from './MsgExecuteContract';
export * from './MsgMigrateContract';
export * from './MsgUpdateContractAdmin';
export * from './MsgClearContractAdmin';
export * from './MsgSudoContract';
export * from './MsgPinCodes';
export * from './MsgUnpinCodes';
export * from './MsgStoreAndInstantiateContract';
export * from './MsgAddCodeUploadParamsAddresses';
export * from './MsgRemoveCodeUploadParamsAddresses';
export * from './MsgStoreAndMigrateContract';
export * from './MsgUpdateContractLabel';
export * from './MsgUpdateParams';
export * from './MsgUpdateInstantiateConfig';
export * from './MsgIBCSend';
export * from './MsgIBCCloseChannel';

export type WasmMsgV1 =
  | MsgStoreCodeV1
  | MsgInstantiateContractV1
  | MsgInstantiateContract2V1
  | MsgExecuteContractV1
  | MsgMigrateContractV1
  | MsgUpdateContractAdminV1
  | MsgClearContractAdminV1
  | MsgSudoContractV1
  | MsgPinCodesV1
  | MsgUnpinCodesV1
  | MsgStoreAndInstantiateContractV1
  | MsgAddCodeUploadParamsAddressesV1
  | MsgRemoveCodeUploadParamsAddressesV1
  | MsgStoreAndMigrateContractV1
  | MsgUpdateContractLabelV1
  | MsgUpdateWasmParamsV1
  | MsgUpdateInstantiateConfigV1
  | MsgIBCSendV1
  | MsgIBCCloseChannelV1;

export namespace WasmMsgV1 {
  export type Amino =
    | MsgStoreCodeV1.Amino
    | MsgInstantiateContractV1.Amino
    | MsgInstantiateContract2V1.Amino
    | MsgExecuteContractV1.Amino
    | MsgMigrateContractV1.Amino
    | MsgUpdateContractAdminV1.Amino
    | MsgClearContractAdminV1.Amino
    | MsgSudoContractV1.Amino
    | MsgPinCodesV1.Amino
    | MsgUnpinCodesV1.Amino
    | MsgStoreAndInstantiateContractV1.Amino
    | MsgAddCodeUploadParamsAddressesV1.Amino
    | MsgRemoveCodeUploadParamsAddressesV1.Amino
    | MsgStoreAndMigrateContractV1.Amino
    | MsgUpdateContractLabelV1.Amino
    | MsgUpdateWasmParamsV1.Amino
    | MsgUpdateInstantiateConfigV1.Amino
    | MsgIBCSendV1.Amino
    | MsgIBCCloseChannelV1.Amino;
  export type Data =
    | MsgStoreCodeV1.Data
    | MsgInstantiateContractV1.Data
    | MsgInstantiateContract2V1.Data
    | MsgExecuteContractV1.Data
    | MsgMigrateContractV1.Data
    | MsgUpdateContractAdminV1.Data
    | MsgClearContractAdminV1.Data
    | MsgSudoContractV1.Data
    | MsgPinCodesV1.Data
    | MsgUnpinCodesV1.Data
    | MsgStoreAndInstantiateContractV1.Data
    | MsgAddCodeUploadParamsAddressesV1.Data
    | MsgRemoveCodeUploadParamsAddressesV1.Data
    | MsgStoreAndMigrateContractV1.Data
    | MsgUpdateContractLabelV1.Data
    | MsgUpdateWasmParamsV1.Data
    | MsgUpdateInstantiateConfigV1.Data
    | MsgIBCSendV1.Data
    | MsgIBCCloseChannelV1.Data;
  export type Proto =
    | MsgStoreCodeV1.Proto
    | MsgInstantiateContractV1.Proto
    | MsgInstantiateContract2V1.Proto
    | MsgExecuteContractV1.Proto
    | MsgMigrateContractV1.Proto
    | MsgUpdateContractAdminV1.Proto
    | MsgClearContractAdminV1.Proto
    | MsgSudoContractV1.Proto
    | MsgPinCodesV1.Proto
    | MsgUnpinCodesV1.Proto
    | MsgStoreAndInstantiateContractV1.Proto
    | MsgAddCodeUploadParamsAddressesV1.Proto
    | MsgRemoveCodeUploadParamsAddressesV1.Proto
    | MsgStoreAndMigrateContractV1.Proto
    | MsgUpdateContractLabelV1.Proto
    | MsgUpdateWasmParamsV1.Proto
    | MsgUpdateInstantiateConfigV1.Proto
    | MsgIBCSendV1.Proto
    | MsgIBCCloseChannelV1.Proto;
}
