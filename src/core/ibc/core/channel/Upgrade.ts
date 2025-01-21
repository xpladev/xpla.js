import { JSONSerializable } from '../../../../util/json';
import { Int, Numeric } from '../../../../core/numeric';
import { Timeout } from './Timeout';
import {
  UpgradeFields as UpgradeFields_pb,
  Upgrade as Upgrade_pb,
  ErrorReceipt as ErrorReceipt_pb,
} from '@xpla/xpla.proto/ibc/core/channel/v1/upgrade';
import { Order, orderFromJSON, orderToJSON } from '@xpla/xpla.proto/ibc/core/channel/v1/channel';

export class UpgradeFields extends JSONSerializable<
  UpgradeFields.Amino,
  UpgradeFields.Data,
  UpgradeFields.Proto
> {
  public ordering: Order;

  /**
   * @param ordering
   * @param connection_hops
   * @param version
   */
  constructor(
    ordering: string | number,
    public connection_hops: string[],
    public version: string,
  ) {
    super();
    this.ordering = orderFromJSON(ordering);
  }

  public static fromAmino(_data: UpgradeFields.Amino): UpgradeFields {
    const { ordering, connection_hops, version } = _data;
    return new UpgradeFields(
      orderFromJSON(ordering),
      connection_hops,
      version,
    );
  }

  public toAmino(): UpgradeFields.Amino {
    const { ordering, connection_hops, version } = this;
    const res: UpgradeFields.Amino = {
      ordering: orderToJSON(ordering),
      connection_hops,
      version
    };
    return res;
  }

  public static fromData(data: UpgradeFields.Data): UpgradeFields {
    const { ordering, connection_hops, version } = data;
    return new UpgradeFields(
      orderFromJSON(ordering),
      connection_hops,
      version,
    );
  }

  public toData(): UpgradeFields.Data {
    const { ordering, connection_hops, version } = this;
    const res: UpgradeFields.Data = {
      ordering: orderToJSON(ordering),
      connection_hops,
      version,
    };
    return res;
  }

  public static fromProto(proto: UpgradeFields.Proto): UpgradeFields {
    return new UpgradeFields(
      proto.ordering,
      proto.connectionHops,
      proto.version,
    );
  }

  public toProto(): UpgradeFields.Proto {
    const { ordering, connection_hops, version } = this;
    return UpgradeFields_pb.fromPartial({
      ordering,
      connectionHops: connection_hops,
      version,
    });
  }
}

export namespace UpgradeFields {
  export interface Amino {
    ordering: string;
    connection_hops: string[];
    version: string;
  }

  export interface Data {
    ordering: string;
    connection_hops: string[];
    version: string;
  }

  export type Proto = UpgradeFields_pb;
}

export class Upgrade extends JSONSerializable<
  Upgrade.Amino,
  Upgrade.Data,
  Upgrade.Proto
> {
  public next_sequence_send: Int;

  /**
   * @param fields
   * @param timeout
   * @param next_sequence_send
   */
  constructor(
    public fields: UpgradeFields | undefined,
    public timeout: Timeout | undefined,
    next_sequence_send: Numeric.Input,
  ) {
    super();
    this.next_sequence_send = new Int(next_sequence_send);
  }

  public static fromAmino(_data: Upgrade.Amino): Upgrade {
    const { fields, timeout, next_sequence_send } = _data;
    return new Upgrade(
      fields ? UpgradeFields.fromAmino(fields) : undefined,
      timeout ? Timeout.fromAmino(timeout) : undefined,
      next_sequence_send,
    );
  }

  public toAmino(): Upgrade.Amino {
    const { fields, timeout, next_sequence_send } = this;
    const res: Upgrade.Amino = {
      fields: fields?.toAmino(),
      timeout: timeout?.toAmino(),
      next_sequence_send: next_sequence_send.toFixed(),
    };
    return res;
  }

  public static fromData(data: Upgrade.Data): Upgrade {
    const { fields, timeout, next_sequence_send } = data;
    return new Upgrade(
      fields ? UpgradeFields.fromData(fields) : undefined,
      timeout ? Timeout.fromData(timeout) : undefined,
      next_sequence_send,
    );
  }

  public toData(): Upgrade.Data {
    const { fields, timeout, next_sequence_send } = this;
    const res: Upgrade.Data = {
      fields: fields?.toData(),
      timeout: timeout?.toData(),
      next_sequence_send: next_sequence_send.toFixed(),
    };
    return res;
  }

  public static fromProto(proto: Upgrade.Proto): Upgrade {
    return new Upgrade(
      proto.fields ? UpgradeFields.fromProto(proto.fields) : undefined,
      proto.timeout ? Timeout.fromProto(proto.timeout) : undefined,
      proto.nextSequenceSend.toString(),
    );
  }

  public toProto(): Upgrade.Proto {
    const { fields, timeout, next_sequence_send } = this;
    return Upgrade_pb.fromPartial({
      fields: fields?.toProto(),
      timeout: timeout?.toProto(),
      nextSequenceSend: next_sequence_send.toFixed(),
    });
  }
}

export namespace Upgrade {
  export interface Amino {
    fields?: UpgradeFields.Amino,
    timeout?: Timeout.Amino,
    next_sequence_send: string,
  }

  export interface Data {
    fields?: UpgradeFields.Data,
    timeout?: Timeout.Data,
    next_sequence_send: string,
  }

  export type Proto = Upgrade_pb;
}

export class ErrorReceipt extends JSONSerializable<
  ErrorReceipt.Amino,
  ErrorReceipt.Data,
  ErrorReceipt.Proto
> {
  public sequence: Int;

  /**
   * @param sequence
   * @param message
   */
  constructor(
    sequence: Numeric.Input,
    public message: string,
  ) {
    super();
    this.sequence = new Int(sequence);
  }

  public static fromAmino(_data: ErrorReceipt.Amino): ErrorReceipt {
    const { sequence, message } = _data;
    return new ErrorReceipt(
      sequence,
      message,
    );
  }

  public toAmino(): ErrorReceipt.Amino {
    const { sequence, message } = this;
    const res: ErrorReceipt.Amino = {
      sequence: sequence.toFixed(),
      message,
    };
    return res;
  }

  public static fromData(data: ErrorReceipt.Data): ErrorReceipt {
    const { sequence, message } = data;
    return new ErrorReceipt(
      sequence,
      message,
    );
  }

  public toData(): ErrorReceipt.Data {
    const { sequence, message } = this;
    const res: ErrorReceipt.Data = {
      sequence: sequence.toFixed(),
      message,
    };
    return res;
  }

  public static fromProto(proto: ErrorReceipt.Proto): ErrorReceipt {
    return new ErrorReceipt(
      proto.sequence.toString(),
      proto.message,
    );
  }

  public toProto(): ErrorReceipt.Proto {
    const { sequence, message } = this;
    return ErrorReceipt_pb.fromPartial({
      sequence: sequence.toFixed(),
      message,
    });
  }
}

export namespace ErrorReceipt {
  export interface Amino {
    sequence: string,
    message: string,
  }

  export interface Data {
    sequence: string,
    message: string,
  }

  export type Proto = ErrorReceipt_pb;
}
