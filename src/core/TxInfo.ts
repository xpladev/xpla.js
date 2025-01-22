import { Tx } from './Tx';
import {
  ABCIMessageLog as ABCIMessageLog_pb,
  TxResponse as TxResponse_pb,
} from '@xpla/xpla.proto/cosmos/base/abci/v1beta1/abci';
import {
  Event as Event_pb,
  EventAttribute as EventAttribute_pb,
} from '@xpla/xpla.proto/tendermint/abci/types';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';

/**
 * A TxInfo data structure is used to capture information from a transaction lookup for
 * a transaction already included in a block
 * TxResponse
 */
export class TxInfo {
  public eventsByType: TxEventsByType;

  /**
   *
   * @param height height of the block in which the transaction was included.
   * @param txhash transaction's hash.
   * @param raw_log raw log information, as a string.
   * @param logs log information
   * @param gas_wanted gas limited submitted in fee
   * @param gas_used actual gas consumption
   * @param tx transaction content
   * @param timestamp time of inclusion
   * @param events list of events
   * @param code error code
   */
  constructor(
    public height: number,
    public txhash: string,
    public raw_log: string,
    public logs: TxLog[] | undefined,
    public gas_wanted: number,
    public gas_used: number,
    public tx: Tx,
    public timestamp: string,
    public events: TxEvent[] | undefined,
    public code?: number,
    public codespace?: string,
    public data?: string,
    public info?: string,
  ) {
    if (!Array.isArray(this.events)) this.events = [];
    this.eventsByType = TxEventsByType.parse(this.events);
    if (!Array.isArray(this.logs) || this.logs.length === 0)
      this.logs = TxLog.fromEvents(this.events);
  }

  public static fromProto(proto: TxInfo.Proto): TxInfo {
    return new TxInfo(
      proto.height.toNumber(),
      proto.txhash,
      proto.rawLog,
      proto.logs.map(log => TxLog.fromProto(log)),
      proto.gasWanted.toNumber(),
      proto.gasUsed.toNumber(),
      Tx.unpackAny(proto.tx as Any),
      proto.timestamp,
      proto.events.map(evt => TxEvent.fromProto(evt)),
      proto.code,
      proto.codespace,
      proto.data,
      proto.info,
    );
  }

  public static fromData(data: TxInfo.Data, isClassic?: boolean): TxInfo {
    return new TxInfo(
      Number.parseInt(data.height),
      data.txhash,
      data.raw_log,
      data.logs.map(log => TxLog.fromData(log)),
      Number.parseInt(data.gas_wanted),
      Number.parseInt(data.gas_used),
      Tx.fromData(data.tx, isClassic),
      data.timestamp,
      data.events.map(evt => TxEvent.fromData(evt)),
      data.code,
      data.codespace,
      data.data,
      data.info,
    );
  }

  public toData(): TxInfo.Data {
    const { height, txhash, codespace, code, data, raw_log, logs, info, gas_wanted, gas_used, tx, timestamp, events } = this;
    return {
      height: height.toFixed(),
      txhash,
      codespace,
      code,
      data,
      raw_log,
      logs: logs?.map(log => log.toData()) ?? [],
      info,
      gas_wanted: gas_wanted.toFixed(),
      gas_used: gas_used.toFixed(),
      tx: tx.toData(),
      timestamp,
      events: events?.map(evt => evt.toData()) ?? [],
    };
  }

  public getEventAttributes(type: string, msg_index?: number): EventAttributesByKey[] {
    const attrs: {
      [key: string]: string;
    }[] = [];
    if (msg_index !== undefined) {
      if (isNaN(msg_index) || msg_index < 0)
        msg_index = -1;
      if (type in this.eventsByType[msg_index]) {
        this.eventsByType[msg_index][type].forEach(attr => {
          attrs.push(attr);
        });
      }
    }
    else {
      for (const msg_index in this.eventsByType) {
        if (type in this.eventsByType[msg_index]) {
          this.eventsByType[msg_index][type].forEach(attr => {
            attrs.push(attr);
          });
        }
      }
    }
    return attrs;
  }

  public getEventAttributeValues(type: string, key: string, msg_index?: number): string[] {
    const values: string[] = [];
    if (msg_index !== undefined) {
      if (isNaN(msg_index) || msg_index < 0)
        msg_index = -1;
      if (msg_index in this.eventsByType) {
        if (type in this.eventsByType[msg_index]) {
          this.eventsByType[msg_index][type].forEach(ev => {
            if (key in ev) {
              values.push(ev[key]);
            }
          })
        }
      }
    } else {
      this.events?.forEach(ev => {
        if (ev.type === type) {
          ev.attributes.forEach(attr => {
            if (attr.key === key) {
              values.push(attr.value);
            }
          })
        }
      })
    }
    return values;
  }
}

export interface EventKV {
  key: string;
  value: string;
}

export interface Event {
  type: string;
  attributes: EventKV[];
}

export interface EventsByType {
  [type: string]: {
    [key: string]: string[];
  };
}

export namespace EventsByType {
  export function parse(eventAmino: Event[]): EventsByType {
    const events: EventsByType = {};
    eventAmino.forEach(ev => {
      ev.attributes.forEach(attr => {
        if (!(ev.type in events)) {
          events[ev.type] = {};
        }

        if (!(attr.key in events[ev.type])) {
          events[ev.type][attr.key] = [];
        }

        events[ev.type][attr.key].push(attr.value);
      });
    });
    return events;
  }
}

export class TxLog {
  public eventsByType: EventsByType;

  constructor(
    public msg_index: number,
    public log: string,
    public events: Event[]
  ) {
    this.eventsByType = EventsByType.parse(this.events);
  }

  public static fromEvents(events: TxEvent[]): TxLog[] {
    if (events.length === 0) {
      return [];
    }

    const logs: TxLog[] = [];
    events.forEach(evt => {
      let msg_index: number = -1;
      for (const attr of evt.attributes) {
        if (attr.key === 'msg_index') {
          msg_index = parseInt(attr.value);
          if (isNaN(msg_index) || msg_index < 0)
            msg_index = -1;
          break;
        }
      }
      if (msg_index < 0)
        return;

      if (msg_index >= logs.length) {
        for (let i = logs.length; i <= msg_index; ++i) {
          logs.push(new TxLog(i, '', []));
        }
      }

      let type_found: Event | undefined;
      for (const e of logs[msg_index].events) {
        if (e.type === evt.type) {
          type_found = e;
          break;
        }
      }
      if (type_found === undefined) {
        type_found = {
          type: evt.type,
          attributes: [],
        };
        logs[msg_index].events.push(type_found);
      }
      for (const attr of evt.attributes) {
        if (attr.key === 'msg_index')
          continue;
        let exist = false;
        for (const a of type_found.attributes) {
          if (a.key === attr.key && a.value === attr.value) {
            exist = true;
            break;
          }
        }
        if (!exist) {
          const a: EventKV = {
            key: attr.key,
            value: attr.value,
          };
          type_found.attributes.push(a);
        }
      }
    });

    for (const log of logs) {
      log.eventsByType = EventsByType.parse(log.events);
    }

    return logs;
  }

  public static fromData(data: TxLog.Data): TxLog {
    return new TxLog(
      data.msg_index,
      data.log,
      data.events.map(e => {
        return {
          type: e.type,
          attributes: e.attributes.map(attr => {
            return {
              key: attr.key,
              value: attr.value,
            };
          }),
        };
      })
    );
  }

  public toData(): TxLog.Data {
    const { msg_index, log, events } = this;
    return {
      msg_index,
      log,
      events,
    };
  }

  public static fromProto(proto: TxLog.Proto): TxLog {
    return new TxLog(
      proto.msgIndex,
      proto.log,
      proto.events.map(e => {
        return {
          type: e.type,
          attributes: e.attributes.map(attr => {
            return {
              key: attr.key,
              value: attr.value,
            };
          }),
        };
      })
    );
  }

  public toProto(): TxLog.Proto {
    const { msg_index, log, events } = this;
    return ABCIMessageLog_pb.fromPartial({
      msgIndex: msg_index,
      log: log,
      events,
    });
  }
}

export namespace TxLog {
  export interface Data {
    msg_index: number;
    log: string;
    events: { type: string; attributes: { key: string; value: string }[] }[];
  }
  export type Proto = ABCIMessageLog_pb;
}

export class EventAttribute {
  constructor(
    public key: string,
    public value: string,
    public index: boolean,
  ) {}

  public static fromData(data: EventAttribute.Data): EventAttribute {
    return new EventAttribute(
      data.key,
      data.value,
      data.index,
    );
  }

  public toData(): EventAttribute.Data {
    const { key, value, index } = this;
    return {
      key, value, index,
    };
  }

  public static fromProto(proto: EventAttribute.Proto): EventAttribute {
    return new EventAttribute(
      proto.key,
      proto.value,
      proto.index,
    );
  }

  public toProto(): EventAttribute.Proto {
    const { key, value, index } = this;
    return EventAttribute_pb.fromPartial({
      key, value, index,
    });
  }
}

export namespace EventAttribute {
  export interface Data {
    key: string;
    value: string;
    index: boolean;
  }
  export type Proto = EventAttribute_pb;
}

export class TxEvent {
  constructor(
    public type: string,
    public attributes: EventAttribute[]
  ) {}

  public static fromData(data: TxEvent.Data): TxEvent {
    return new TxEvent(
      data.type,
      data.attributes.map(attr => EventAttribute.fromData(attr))
    );
  }

  public toData(): TxEvent.Data {
    const { type, attributes } = this;
    return {
      type, attributes,
    };
  }

  public static fromProto(proto: TxEvent.Proto): TxEvent {
    return new TxEvent(
      proto.type,
      proto.attributes.map(attr => EventAttribute.fromProto(attr))
    );
  }

  public toProto(): TxEvent.Proto {
    const { type, attributes } = this;
    return Event_pb.fromPartial({
      type,
      attributes,
    });
  }
}

export namespace TxEvent {
  export interface Data {
    type: string;
    attributes: EventAttribute[];
  }
  export type Proto = Event_pb;
}

export interface EventAttributesByKey {
  [key: string]: string;
}

export interface TxEventsByType {
  [msg_index: number]: {
    [type: string]: EventAttributesByKey[];
  };
}

export namespace TxEventsByType {
  export function parse(events: TxEvent[]): TxEventsByType {
    const byTypes: TxEventsByType = {};
    if (events.length === 0) {
      return byTypes;
    }
    events.forEach(ev => {
      let msg_index: number = -1;
      for (const attr of ev.attributes) {
        if (attr.key === 'msg_index') {
          msg_index = parseInt(attr.value);
          if (isNaN(msg_index) || msg_index < 0)
            msg_index = -1;
          break;
        }
      }

      if (!(msg_index in byTypes)) {
        byTypes[msg_index] = {};
      }

      if (!(ev.type in byTypes[msg_index])) {
        byTypes[msg_index][ev.type] = [];
      }

      const type_index = byTypes[msg_index][ev.type].length;
      byTypes[msg_index][ev.type].push({});

      ev.attributes.forEach(attr => {
        if (!(attr.key in byTypes[msg_index][ev.type])) {
          byTypes[msg_index][ev.type][type_index][attr.key] = '';
        }
        else {
          byTypes[msg_index][ev.type][type_index][attr.key] = ',';
        }
        byTypes[msg_index][ev.type][type_index][attr.key] += attr.value;
      });
    });
    return byTypes;
  }
}

export namespace TxInfo {
  export interface Data {
    height: string;
    txhash: string;
    codespace: string | undefined;
    code: number | undefined;
    data: string | undefined;
    raw_log: string;
    logs: TxLog.Data[];
    info: string | undefined;
    gas_wanted: string;
    gas_used: string;
    tx: Tx.Data;
    timestamp: string;
    events: TxEvent.Data[];
  }
  export type Proto = TxResponse_pb;
}
