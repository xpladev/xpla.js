import { MsgGrantAllowance } from './MsgGrantAllowance';
import { MsgRevokeAllowance } from './MsgRevokeAllowance';
import { MsgPruneAllowances } from './MsgPruneAllowances';

export * from './MsgGrantAllowance';
export * from './MsgRevokeAllowance';
export * from './MsgPruneAllowances';
export type FeeGrantMsg = MsgGrantAllowance | MsgRevokeAllowance | MsgPruneAllowances;

export namespace FeeGrantMsg {
  export type Amino = MsgGrantAllowance.Amino | MsgRevokeAllowance.Amino | MsgPruneAllowances.Amino;
  export type Data = MsgGrantAllowance.Data | MsgRevokeAllowance.Data | MsgPruneAllowances.Data;
  export type Proto = MsgGrantAllowance.Proto | MsgRevokeAllowance.Proto | MsgPruneAllowances.Proto;
}
