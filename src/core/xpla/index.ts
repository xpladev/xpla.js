import { XplaMsgV1B1 } from './v1beta1/msgs';

export * from './v1beta1/msgs';
export * from './v1beta1/proposals';

export type XplaMsg = XplaMsgV1B1;

export namespace XplaMsg {
  export type Amino = XplaMsgV1B1.Amino;
  export type Data = XplaMsgV1B1.Data;
  export type Proto = XplaMsgV1B1.Proto;
}

export { MsgFundFeeCollectorV1B1 as MsgFundFeeCollector } from './v1beta1/msgs';
