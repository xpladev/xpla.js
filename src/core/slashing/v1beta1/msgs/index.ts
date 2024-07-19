import { MsgUnjailV1B1 } from './MsgUnjail';
import { MsgUpdateSlashingParamsV1B1 } from './MsgUpdateParams';

export * from './MsgUnjail';
export * from './MsgUpdateParams';

export type SlashingMsgV1B1 = MsgUnjailV1B1 | MsgUpdateSlashingParamsV1B1;
export namespace SlashingMsgV1B1 {
  export type Amino = MsgUnjailV1B1.Amino | MsgUpdateSlashingParamsV1B1.Amino;
  export type Data = MsgUnjailV1B1.Data | MsgUpdateSlashingParamsV1B1.Data;
  export type Proto = MsgUnjailV1B1.Proto | MsgUpdateSlashingParamsV1B1.Proto;
}
