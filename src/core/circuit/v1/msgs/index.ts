import { MsgAuthorizeCircuitBreakerV1 } from './MsgAuthorizeCircuitBreaker';
import { MsgResetCircuitBreakerV1 } from './MsgResetCircuitBreaker';
import { MsgTripCircuitBreakerV1 } from './MsgTripCircuitBreaker';

export * from './MsgAuthorizeCircuitBreaker';
export * from './MsgResetCircuitBreaker';
export * from './MsgTripCircuitBreaker';

export type CircuitMsgV1 = MsgAuthorizeCircuitBreakerV1 | MsgResetCircuitBreakerV1 | MsgTripCircuitBreakerV1;
export namespace CircuitMsgV1 {
  export type Amino = MsgAuthorizeCircuitBreakerV1.Amino | MsgResetCircuitBreakerV1.Amino | MsgTripCircuitBreakerV1.Amino;
  export type Data = MsgAuthorizeCircuitBreakerV1.Data | MsgResetCircuitBreakerV1.Data | MsgTripCircuitBreakerV1.Data;
  export type Proto = MsgAuthorizeCircuitBreakerV1.Proto | MsgResetCircuitBreakerV1.Proto | MsgTripCircuitBreakerV1.Proto;
}
