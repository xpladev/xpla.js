import { MsgCreateClient } from './MsgCreateClient';
import { MsgSubmitMisbehaviour } from './MsgSubmitMisbehaviour';
import { MsgUpdateClient } from './MsgUpdateClient';
import { MsgUpgradeClient } from './MsgUpgradeClient';
import { MsgRecoverClient } from './MsgRecoverClient';
import { MsgIbcSoftwareUpgradeV1 } from './MsgIBCSoftwareUpgrade';
import { MsgUpdateIbcClientParamsV1 } from './MsgUpdateParams';

export * from './MsgCreateClient';
export * from './MsgUpdateClient';
export * from './MsgUpgradeClient';
export * from './MsgSubmitMisbehaviour';
export * from './MsgRecoverClient';
export * from './MsgIBCSoftwareUpgrade';
export * from './MsgUpdateParams';
export { MsgIbcSoftwareUpgradeV1 as MsgIbcSoftwareUpgrade } from './MsgIBCSoftwareUpgrade';
export { MsgUpdateIbcClientParamsV1 as MsgUpdateIbcClientParams } from './MsgUpdateParams';

export type IbcClientMsg =
  | MsgCreateClient
  | MsgUpdateClient
  | MsgUpgradeClient
  | MsgSubmitMisbehaviour
  | MsgRecoverClient
  | MsgIbcSoftwareUpgradeV1
  | MsgUpdateIbcClientParamsV1;

export namespace IbcClientMsg {
  export type Data =
    | MsgCreateClient.Data
    | MsgUpdateClient.Data
    | MsgUpgradeClient.Data
    | MsgSubmitMisbehaviour.Data
    | MsgRecoverClient.Data
    | MsgIbcSoftwareUpgradeV1.Data
    | MsgUpdateIbcClientParamsV1.Data;
  export type Proto =
    | MsgCreateClient.Proto
    | MsgUpdateClient.Proto
    | MsgUpgradeClient.Proto
    | MsgSubmitMisbehaviour.Proto
    | MsgRecoverClient.Proto
    | MsgIbcSoftwareUpgradeV1.Proto
    | MsgUpdateIbcClientParamsV1.Proto;
}
