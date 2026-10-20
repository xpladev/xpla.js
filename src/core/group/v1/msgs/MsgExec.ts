import { Int64, Int64Input, parseInt64 } from '../../../../util/int64';
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgExec as MsgGroupExecV1_pb } from '@xpla/xpla.proto/cosmos/group/v1/tx';

export class MsgGroupExecV1 extends JSONSerializable<
  MsgGroupExecV1.Amino,
  MsgGroupExecV1.Data,
  MsgGroupExecV1.Proto
> {
  public proposal_id: Int64;
  /**
   * @param proposal_id is the unique ID of the proposal
   * @param executor is the account address used to execute the proposal
   */

  constructor(
    proposal_id: Int64Input,
    public executor: AccAddress
  ) {
    super();
    this.proposal_id = parseInt64(proposal_id);
  }

  public static fromAmino(
    data: MsgGroupExecV1.Amino,
    _isClassic?: boolean
  ): MsgGroupExecV1 {
    const {
      value: { proposal_id, executor },
    } = data;
    return new MsgGroupExecV1(proposal_id, executor);
  }

  public toAmino(isClassic?: boolean): MsgGroupExecV1.Amino {
    const { proposal_id, executor } = this;
    return {
      type: isClassic ? 'group/MsgExec' : 'cosmos-sdk/group/MsgExec',
      value: {
        proposal_id: proposal_id.toFixed(),
        executor,
      },
    };
  }

  public static fromData(
    data: MsgGroupExecV1.Data,
    _isClassic?: boolean
  ): MsgGroupExecV1 {
    const { proposal_id, executor } = data;
    return new MsgGroupExecV1(proposal_id, executor);
  }

  public toData(_isClassic?: boolean): MsgGroupExecV1.Data {
    const { proposal_id, executor } = this;
    return {
      '@type': '/cosmos.group.v1.MsgExec',
      proposal_id: proposal_id.toFixed(),
      executor,
    };
  }

  public static fromProto(
    proto: MsgGroupExecV1.Proto,
    _isClassic?: boolean
  ): MsgGroupExecV1 {
    return new MsgGroupExecV1(proto.proposalId, proto.executor);
  }

  public toProto(_isClassic?: boolean): MsgGroupExecV1.Proto {
    const { proposal_id, executor } = this;
    return MsgGroupExecV1_pb.fromPartial({
      proposalId: proposal_id.toString(),
      executor,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.group.v1.MsgExec',
      value: MsgGroupExecV1_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(msgAny: Any, isClassic?: boolean): MsgGroupExecV1 {
    return MsgGroupExecV1.fromProto(
      MsgGroupExecV1_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgGroupExecV1 {
  export interface Amino {
    type: 'group/MsgExec' | 'cosmos-sdk/group/MsgExec';
    value: {
      proposal_id: string;
      executor: AccAddress;
    };
  }

  export interface Data {
    '@type': '/cosmos.group.v1.MsgExec';
    proposal_id: string;
    executor: AccAddress;
  }

  export type Proto = MsgGroupExecV1_pb;
}
