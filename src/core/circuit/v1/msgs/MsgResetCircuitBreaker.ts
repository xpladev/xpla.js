/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgResetCircuitBreaker as MsgResetCircuitBreakerV1_pb } from '@xpla/xpla.proto/cosmos/circuit/v1/tx';

export class MsgResetCircuitBreakerV1 extends JSONSerializable<
  MsgResetCircuitBreakerV1.Amino,
  MsgResetCircuitBreakerV1.Data,
  MsgResetCircuitBreakerV1.Proto
> {
  /**
   * @param authority is the account authorized to trip or reset the circuit breaker
   * @param msg_type_urls specifies a list of Msg type URLs to resume processing
   */
  constructor(
    public authority: AccAddress,
    public msg_type_urls: string[],
  ) {
    super();
  }

  public static fromAmino(
    data: MsgResetCircuitBreakerV1.Amino,
    _isClassic?: boolean
  ): MsgResetCircuitBreakerV1 {
    const {
      value: { authority, msg_type_urls },
    } = data;
    return new MsgResetCircuitBreakerV1(
      authority,
      msg_type_urls,
    );
  }

  public toAmino(isClassic?: boolean): MsgResetCircuitBreakerV1.Amino {
    const { authority, msg_type_urls } = this;
    return {
      type: isClassic
        ? 'circuit/MsgResetCircuitBreaker'
        : 'cosmos-sdk/x/circuit/MsgResetCircuitBreaker',
      value: {
        authority,
        msg_type_urls,
      },
    };
  }

  public static fromData(
    data: MsgResetCircuitBreakerV1.Data,
    _isClassic?: boolean
  ): MsgResetCircuitBreakerV1 {
    const { authority, msg_type_urls } = data;
    return new MsgResetCircuitBreakerV1(
      authority,
      msg_type_urls,
    );
  }

  public toData(_isClassic?: boolean): MsgResetCircuitBreakerV1.Data {
    const { authority, msg_type_urls } = this;
    return {
      '@type': '/cosmos.circuit.v1.MsgResetCircuitBreaker',
      authority,
      msg_type_urls,
    };
  }

  public static fromProto(
    proto: MsgResetCircuitBreakerV1.Proto,
    _isClassic?: boolean
  ): MsgResetCircuitBreakerV1 {
    return new MsgResetCircuitBreakerV1(
      proto.authority,
      proto.msgTypeUrls,
    );
  }

  public toProto(_isClassic?: boolean): MsgResetCircuitBreakerV1.Proto {
    const { authority, msg_type_urls } = this;
    return MsgResetCircuitBreakerV1_pb.fromPartial({
      authority,
      msgTypeUrls: msg_type_urls,
    });
  }

  public packAny(_isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.circuit.v1.MsgResetCircuitBreaker',
      value: MsgResetCircuitBreakerV1_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    _isClassic?: boolean
  ): MsgResetCircuitBreakerV1 {
    return MsgResetCircuitBreakerV1.fromProto(
      MsgResetCircuitBreakerV1_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgResetCircuitBreakerV1 {
  export interface Amino {
    type:
      | 'circuit/MsgResetCircuitBreaker'
      | 'cosmos-sdk/x/circuit/MsgResetCircuitBreaker';
    value: {
      authority: AccAddress;
      msg_type_urls: string[];
      };
  }

  export interface Data {
    '@type': '/cosmos.circuit.v1.MsgResetCircuitBreaker';
    authority: AccAddress;
    msg_type_urls: string[];
  }

  export type Proto = MsgResetCircuitBreakerV1_pb;
}
