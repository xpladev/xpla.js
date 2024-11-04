import { FeemarketMsgV1 } from './v1/msgs';

export * from './v1/msgs';
export * from './v1/Params';

export type FeemarketMsg = FeemarketMsgV1;

export namespace FeemarketMsg {
  export type Amino = FeemarketMsgV1.Amino;
  export type Data = FeemarketMsgV1.Data;
  export type Proto = FeemarketMsgV1.Proto;
}

export {
  MsgUpdateFeemarketParamsV1 as MsgUpdateFeemarketParams,
} from './v1/msgs';
