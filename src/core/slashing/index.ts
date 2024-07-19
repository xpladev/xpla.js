import { SlashingMsgV1B1 } from './v1beta1/msgs';

export * from './v1beta1/msgs';
export * from './v1beta1/Params';

export type SlashingMsg = SlashingMsgV1B1;

export namespace SlashingMsg {
  export type Amino = SlashingMsgV1B1.Amino;
  export type Data = SlashingMsgV1B1.Data;
  export type Proto = SlashingMsgV1B1.Proto;
}

export {
  MsgUnjailV1B1 as MsgUnjail,
  MsgUpdateSlashingParamsV1B1 as MsgUpdateSlashingParams,
} from './v1beta1/msgs';
