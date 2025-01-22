import { CircuitMsgV1 } from './v1/msgs';

export * from './v1/msgs';
export * from './v1/Permissions';

export type CircuitMsg = CircuitMsgV1;

export namespace CircuitMsg {
  export type Amino = CircuitMsgV1.Amino;
  export type Data = CircuitMsgV1.Data;
  export type Proto = CircuitMsgV1.Proto;
}

export {
  MsgAuthorizeCircuitBreakerV1 as MsgAuthorizeCircuitBreaker,
  MsgResetCircuitBreakerV1 as MsgResetCircuitBreaker,
  MsgTripCircuitBreakerV1 as MsgTripCircuitBreaker,
} from './v1/msgs';
