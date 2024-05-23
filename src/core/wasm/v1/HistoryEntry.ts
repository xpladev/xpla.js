import { JSONSerializable, removeNull } from '../../../util/json';
import { AbsoluteTxPosition } from './AbsoluteTxPosition';
import {
  ContractCodeHistoryEntry as HistoryEntry_pb,
  ContractCodeHistoryOperationType,
  contractCodeHistoryOperationTypeFromJSON,
  contractCodeHistoryOperationTypeToJSON,
} from '@xpla/xpla.proto/cosmwasm/wasm/v1/types';

/**
 *
 */
export class HistoryEntry extends JSONSerializable<
  HistoryEntry.Amino,
  HistoryEntry.Data,
  HistoryEntry.Proto
> {
  /**
   * @param operation access type
   * @param code_id
   */
  constructor(
    public operation: ContractCodeHistoryOperationType,
    public code_id: number,
    public updated: AbsoluteTxPosition | undefined,
    public msg: object | string
  ) {
    super();
  }

  public static fromAmino(data: HistoryEntry.Amino): HistoryEntry {
    return new HistoryEntry(
      contractCodeHistoryOperationTypeFromJSON(data.operation),
      Number.parseInt(data.code_id),
      data.updated ? AbsoluteTxPosition.fromAmino(data.updated) : undefined,
      data.msg
    );
  }

  public toAmino(): HistoryEntry.Amino {
    const res: HistoryEntry.Amino = {
      operation: contractCodeHistoryOperationTypeToJSON(this.operation),
      code_id: this.code_id.toFixed(),
      updated: this.updated?.toAmino(),
      msg: this.msg,
    };
    return res;
  }

  public static fromData(data: HistoryEntry.Data): HistoryEntry {
    return new HistoryEntry(
      contractCodeHistoryOperationTypeFromJSON(data.operation),
      Number.parseInt(data.code_id),
      data.updated ? AbsoluteTxPosition.fromData(data.updated) : undefined,
      data.msg
    );
  }

  public toData(): HistoryEntry.Data {
    const res: HistoryEntry.Data = {
      operation: contractCodeHistoryOperationTypeToJSON(this.operation),
      code_id: this.code_id.toFixed(),
      updated: this.updated?.toData(),
      msg: this.msg,
    };
    return res;
  }

  public static fromProto(proto: HistoryEntry.Proto): HistoryEntry {
    return new HistoryEntry(
      proto.operation,
      proto.codeId.toNumber(),
      proto.updated ? AbsoluteTxPosition.fromProto(proto.updated) : undefined,
      JSON.parse(Buffer.from(proto.msg).toString('utf-8'))
    );
  }

  public toProto(): HistoryEntry.Proto {
    return HistoryEntry_pb.fromPartial({
      operation: this.operation,
      codeId: this.code_id,
      updated: this.updated?.toProto(),
      msg: Buffer.from(JSON.stringify(removeNull(this.msg)), 'utf-8'),
    });
  }
}

export namespace HistoryEntry {
  export interface Amino {
    operation: string;
    code_id: string;
    updated?: AbsoluteTxPosition.Amino;
    msg: object | string;
  }

  export interface Data {
    operation: string;
    code_id: string;
    updated?: AbsoluteTxPosition.Data;
    msg: object | string;
  }

  export type Proto = HistoryEntry_pb;
}
