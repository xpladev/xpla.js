export * from './v1/Channel';
export * from './v1/IdentifiedChannel';
export { CounterpartyV1 as IbcChannelCounterpartyV1 } from './v1/Counterparty';
export * from './v1/Packet';
export * from './v1/PacketState';
export * from './v1/PacketId';
export * from './v1/Acknowledgement';
export * from './v1/Timeout';
export * from './v2/Packet';
export * from './v2/Payload';
export * from './v2/Acknowledgement';
export * from './v2/RecvPacketResult';

import { MsgChannelOpenInitV1 } from './v1/msgs/MsgChannelOpenInit';
import { MsgChannelOpenTryV1 } from './v1/msgs/MsgChannelOpenTry';
import { MsgChannelOpenConfirmV1 } from './v1/msgs/MsgChannelOpenConfirm';
import { MsgChannelOpenAckV1 } from './v1/msgs/MsgChannelOpenAck';
import { MsgChannelCloseInitV1 } from './v1/msgs/MsgChannelCloseInit';
import { MsgChannelCloseConfirmV1 } from './v1/msgs/MsgChannelCloseConfirm';
import { MsgRecvPacketV1 } from './v1/msgs/MsgRecvPacket';
import { MsgAcknowledgementV1 } from './v1/msgs/MsgAcknowledgement';
import { MsgTimeoutV1 } from './v1/msgs/MsgTimeout';
import { MsgTimeoutOnCloseV1 } from './v1/msgs/MsgTimeoutOnClose';

export * from './v1/msgs/MsgChannelOpenInit';
export * from './v1/msgs/MsgChannelOpenTry';
export * from './v1/msgs/MsgChannelOpenConfirm';
export * from './v1/msgs/MsgChannelOpenAck';
export * from './v1/msgs/MsgChannelCloseInit';
export * from './v1/msgs/MsgChannelCloseConfirm';
export * from './v1/msgs/MsgRecvPacket';
export * from './v1/msgs/MsgAcknowledgement';
export * from './v1/msgs/MsgTimeout';
export * from './v1/msgs/MsgTimeoutOnClose';

export type IbcChannelMsgV1 =
  | MsgChannelOpenInitV1
  | MsgChannelOpenTryV1
  | MsgChannelOpenConfirmV1
  | MsgChannelOpenAckV1
  | MsgChannelCloseInitV1
  | MsgChannelCloseConfirmV1
  | MsgRecvPacketV1
  | MsgAcknowledgementV1
  | MsgTimeoutV1
  | MsgTimeoutOnCloseV1;

export namespace IbcChannelMsgV1 {
  export type Data =
    | MsgChannelOpenInitV1.Data
    | MsgChannelOpenTryV1.Data
    | MsgChannelOpenConfirmV1.Data
    | MsgChannelOpenAckV1.Data
    | MsgChannelCloseInitV1.Data
    | MsgChannelCloseConfirmV1.Data
    | MsgRecvPacketV1.Data
    | MsgAcknowledgementV1.Data
    | MsgTimeoutV1.Data
    | MsgTimeoutOnCloseV1.Data;

  export type Proto =
    | MsgChannelOpenInitV1.Proto
    | MsgChannelOpenTryV1.Proto
    | MsgChannelOpenConfirmV1.Proto
    | MsgChannelOpenAckV1.Proto
    | MsgChannelCloseInitV1.Proto
    | MsgChannelCloseConfirmV1.Proto
    | MsgRecvPacketV1.Proto
    | MsgAcknowledgementV1.Proto
    | MsgTimeoutV1.Proto
    | MsgTimeoutOnCloseV1.Proto;
}

import { MsgSendPacketV2 } from './v2/msgs/MsgSendPacket';
import { MsgRecvPacketV2 } from './v2/msgs/MsgRecvPacket';
import { MsgTimeoutV2 } from './v2/msgs/MsgTimeout';
import { MsgAcknowledgementV2 } from './v2/msgs/MsgAcknowledgement';

export * from './v2/msgs/MsgSendPacket';
export * from './v2/msgs/MsgRecvPacket';
export * from './v2/msgs/MsgTimeout';
export * from './v2/msgs/MsgAcknowledgement';

export type IbcChannelMsgV2 =
  | MsgSendPacketV2
  | MsgRecvPacketV2
  | MsgTimeoutV2
  | MsgAcknowledgementV2;

export namespace IbcChannelMsgV2 {
  export type Data =
    | MsgSendPacketV2.Data
    | MsgRecvPacketV2.Data
    | MsgTimeoutV2.Data
    | MsgAcknowledgementV2.Data;

  export type Proto =
    | MsgSendPacketV2.Proto
    | MsgRecvPacketV2.Proto
    | MsgTimeoutV2.Proto
    | MsgAcknowledgementV2.Proto;
}

export type IbcChannelMsg =
  | IbcChannelMsgV1
  | IbcChannelMsgV2;

export namespace IbcChannelMsg {
  export type Data =
    | IbcChannelMsgV1.Data
    | IbcChannelMsgV2.Data;

  export type Proto =
    | IbcChannelMsgV1.Proto
    | IbcChannelMsgV2.Proto;
}

export {
  MsgChannelOpenInitV1 as MsgChannelOpenInit,
  MsgChannelOpenTryV1 as MsgChannelOpenTry,
  MsgChannelOpenConfirmV1 as MsgChannelOpenConfirm,
  MsgChannelOpenAckV1 as MsgChannelOpenAck,
  MsgChannelCloseInitV1 as MsgChannelCloseInit,
  MsgChannelCloseConfirmV1 as MsgChannelCloseConfirm,
  MsgTimeoutOnCloseV1 as MsgTimeoutOnClose,
  MsgSendPacketV2 as MsgSendPacket,
  MsgRecvPacketV2 as MsgRecvPacket,
  MsgTimeoutV2 as MsgTimeout,
  MsgAcknowledgementV2 as MsgAcknowledgement,
}
