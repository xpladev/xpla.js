import { MsgPayPacketFee } from './msgs/MsgPayPacketFee';
import { MsgPayPacketFeeAsync } from './msgs/MsgPayPacketFeeAsync';
import { MsgRegisterCounterpartyAddress } from './msgs/MsgRegisterCounterpartAddress';
import { MsgRegisterPayee } from './msgs/MsgRegisterPayee';

export * from './Metadata';
export * from './IdentifiedPacketFee';
export * from './PacketFee';
export * from './Fee';
export * from './msgs/MsgPayPacketFee';
export * from './msgs/MsgPayPacketFeeAsync';
export * from './msgs/MsgRegisterCounterpartAddress';
export * from './msgs/MsgRegisterPayee';

export type IbcFeeMsg =
  | MsgPayPacketFee
  | MsgPayPacketFeeAsync
  | MsgRegisterCounterpartyAddress
  | MsgRegisterPayee;

export namespace IbcFeeMsg {
  export type Data =
    | MsgPayPacketFee.Data
    | MsgPayPacketFeeAsync.Data
    | MsgRegisterCounterpartyAddress.Data
    | MsgRegisterPayee.Data;

  export type Proto =
    | MsgPayPacketFee.Proto
    | MsgPayPacketFeeAsync.Proto
    | MsgRegisterCounterpartyAddress.Proto
    | MsgRegisterPayee.Proto;
}
