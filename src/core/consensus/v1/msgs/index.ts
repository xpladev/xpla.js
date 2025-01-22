import { MsgUpdateConsensusParamsV1 } from './MsgUpdateParams';

export * from './MsgUpdateParams';

export type ConsensusMsgV1 = MsgUpdateConsensusParamsV1;
export namespace ConsensusMsgV1 {
  export type Amino = MsgUpdateConsensusParamsV1.Amino;
  export type Data = MsgUpdateConsensusParamsV1.Data;
  export type Proto = MsgUpdateConsensusParamsV1.Proto;
}
