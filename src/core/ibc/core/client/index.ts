export * from './v1/ClientConsensusStates';
export * from './v1/ConsensusStateWithHeight';
export * from './v1/Height';
export * from './v1/IdentifiedClientState';
export * from './v1/Params';

import { MsgCreateClientV1 } from './v1/msgs/MsgCreateClient';
import { MsgUpdateClientV1 } from './v1/msgs/MsgUpdateClient';
import { MsgUpgradeClientV1 } from './v1/msgs/MsgUpgradeClient';
import { MsgSubmitMisbehaviourV1 } from './v1/msgs/MsgSubmitMisbehaviour';
import { MsgRecoverClientV1 } from './v1/msgs/MsgRecoverClient';
import { MsgIbcSoftwareUpgradeV1 } from './v1/msgs/MsgIBCSoftwareUpgrade';
import { MsgUpdateIbcClientParamsV1 } from './v1/msgs/MsgUpdateParams';
import { MsgDeleteClientCreatorV1 } from './v1/msgs/MsgDeleteClientCreator';

export * from './v1/msgs/MsgCreateClient';
export * from './v1/msgs/MsgUpdateClient';
export * from './v1/msgs/MsgUpgradeClient';
export * from './v1/msgs/MsgSubmitMisbehaviour';
export * from './v1/msgs/MsgRecoverClient';
export * from './v1/msgs/MsgIBCSoftwareUpgrade';
export * from './v1/msgs/MsgUpdateParams';
export * from './v1/msgs/MsgDeleteClientCreator';

export type IbcClientMsgV1 =
  | MsgCreateClientV1
  | MsgUpdateClientV1
  | MsgUpgradeClientV1
  | MsgSubmitMisbehaviourV1
  | MsgRecoverClientV1
  | MsgIbcSoftwareUpgradeV1
  | MsgUpdateIbcClientParamsV1
  | MsgDeleteClientCreatorV1;

export namespace IbcClientMsgV1 {
  export type Data =
    | MsgCreateClientV1.Data
    | MsgUpdateClientV1.Data
    | MsgUpgradeClientV1.Data
    | MsgSubmitMisbehaviourV1.Data
    | MsgRecoverClientV1.Data
    | MsgIbcSoftwareUpgradeV1.Data
    | MsgUpdateIbcClientParamsV1.Data
    | MsgDeleteClientCreatorV1.Data;

  export type Proto =
    | MsgCreateClientV1.Proto
    | MsgUpdateClientV1.Proto
    | MsgUpgradeClientV1.Proto
    | MsgSubmitMisbehaviourV1.Proto
    | MsgRecoverClientV1.Proto
    | MsgIbcSoftwareUpgradeV1.Proto
    | MsgUpdateIbcClientParamsV1.Proto
    | MsgDeleteClientCreatorV1.Proto;
}

import { MsgUpdateClientConfigV2 } from './v2/msgs/MsgUpdateClientConfig';
import { MsgRegisterCounterpartyV2 } from './v2/msgs/MsgRegisterCounterparty';

export * from './v2/msgs/MsgUpdateClientConfig';
export * from './v2/msgs/MsgRegisterCounterparty';

export type IbcClientMsgV2 =
  | MsgUpdateClientConfigV2
  | MsgRegisterCounterpartyV2;

export namespace IbcClientMsgV2 {
  export type Data =
    | MsgUpdateClientConfigV2.Data
    | MsgRegisterCounterpartyV2.Data;

  export type Proto =
    | MsgUpdateClientConfigV2.Proto
    | MsgRegisterCounterpartyV2.Proto;
}

export type IbcClientMsg =
  | IbcClientMsgV1
  | IbcClientMsgV2;

export namespace IbcClientMsg {
  export type Data =
    | IbcClientMsgV1.Data
    | IbcClientMsgV2.Data;

  export type Proto =
    | IbcClientMsgV1.Proto
    | IbcClientMsgV2.Proto;
}

export {
  MsgCreateClientV1 as MsgCreateClient,
  MsgUpdateClientV1 as MsgUpdateClient,
  MsgUpgradeClientV1 as MsgUpgradeClient,
  MsgSubmitMisbehaviourV1 as MsgSubmitMisbehaviour,
  MsgRecoverClientV1 as MsgRecoverClient,
  MsgIbcSoftwareUpgradeV1 as MsgIbcSoftwareUpgrade,
  MsgUpdateIbcClientParamsV1 as MsgUpdateIbcClientParams,
  MsgDeleteClientCreatorV1 as MsgDeleteClientCreator,
  MsgUpdateClientConfigV2 as MsgUpdateClientConfig,
  MsgRegisterCounterpartyV2 as MsgRegisterCounterparty,
}
