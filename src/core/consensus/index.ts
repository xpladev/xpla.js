import { ConsensusMsgV1B1 } from './v1/msgs';

export * from './v1/msgs';
export * from './v1/Params';

export type ConsensusMsg = ConsensusMsgV1B1;

export namespace ConsensusMsg {
  export type Amino = ConsensusMsgV1B1.Amino;
  export type Data = ConsensusMsgV1B1.Data;
  export type Proto = ConsensusMsgV1B1.Proto;
}

export { MsgUpdateConsensusParamsV1B1 as MsgUpdateConsensusParams } from './v1/msgs';
