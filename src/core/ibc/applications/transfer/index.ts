import { MsgTransferV1 } from './v1/msgs/MsgTransfer';
import { MsgUpdateIbcTransferParamsV1 } from './v1/msgs/MsgUpdateParams';

export * from './v1/msgs/MsgTransfer';
export * from './v1/msgs/MsgUpdateParams';

export type IbcTransferMsgV1 = MsgTransferV1 | MsgUpdateIbcTransferParamsV1;
export namespace IbcTransferMsgV1 {
  export type Amino = MsgTransferV1.Amino;
  export type Data = MsgTransferV1.Data | MsgUpdateIbcTransferParamsV1.Data;
  export type Proto = MsgTransferV1.Proto | MsgUpdateIbcTransferParamsV1.Proto;
}

export { MsgTransferV1 as MsgTransfer } from './v1/msgs/MsgTransfer';
export { MsgUpdateIbcTransferParamsV1 as MsgUpdateIbcTransferParams } from './v1/msgs/MsgUpdateParams';

export type IbcTransferMsg = IbcTransferMsgV1;
export namespace IbcTransferMsg {
  export type Amino = IbcTransferMsgV1.Amino;
  export type Data = IbcTransferMsgV1.Data;
  export type Proto = IbcTransferMsgV1.Proto;
}
