import { ConsensusMsgV1 } from './v1/msgs';

export * from './v1/msgs';
export * from './v1/Params';

export type ConsensusMsg = ConsensusMsgV1;

export namespace ConsensusMsg {
  export type Amino = ConsensusMsgV1.Amino;
  export type Data = ConsensusMsgV1.Data;
  export type Proto = ConsensusMsgV1.Proto;
}

export { MsgUpdateConsensusParamsV1 as MsgUpdateConsensusParams } from './v1/msgs';
