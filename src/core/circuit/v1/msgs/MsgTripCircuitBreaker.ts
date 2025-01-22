/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgTripCircuitBreaker as MsgTripCircuitBreakerV1_pb } from '@xpla/xpla.proto/cosmos/circuit/v1/tx';

export class MsgTripCircuitBreakerV1 extends JSONSerializable<
  MsgTripCircuitBreakerV1.Amino,
  MsgTripCircuitBreakerV1.Data,
  MsgTripCircuitBreakerV1.Proto
> {
  /**
   * @param authority is the account authorized to trip the circuit breaker
   * @param msg_type_urls specifies a list of type URLs to immediately stop processing
   */
  constructor(
    public authority: AccAddress,
    public msg_type_urls: string[],
  ) {
    super();
  }

  public static fromAmino(
    data: MsgTripCircuitBreakerV1.Amino,
    _isClassic?: boolean
  ): MsgTripCircuitBreakerV1 {
    const {
      value: { authority, msg_type_urls },
    } = data;
    return new MsgTripCircuitBreakerV1(
      authority,
      msg_type_urls,
    );
  }

  public toAmino(isClassic?: boolean): MsgTripCircuitBreakerV1.Amino {
    const { authority, msg_type_urls } = this;
    return {
      type: isClassic
        ? 'circuit/MsgTripCircuitBreaker'
        : 'cosmos-sdk/x/circuit/MsgTripCircuitBreaker',
      value: {
        authority,
        msg_type_urls,
      },
    };
  }

  public static fromData(
    data: MsgTripCircuitBreakerV1.Data,
    _isClassic?: boolean
  ): MsgTripCircuitBreakerV1 {
    const { authority, msg_type_urls } = data;
    return new MsgTripCircuitBreakerV1(
      authority,
      msg_type_urls,
    );
  }

  public toData(_isClassic?: boolean): MsgTripCircuitBreakerV1.Data {
    const { authority, msg_type_urls } = this;
    return {
      '@type': '/cosmos.circuit.v1.MsgTripCircuitBreaker',
      authority,
      msg_type_urls,
    };
  }

  public static fromProto(
    proto: MsgTripCircuitBreakerV1.Proto,
    _isClassic?: boolean
  ): MsgTripCircuitBreakerV1 {
    return new MsgTripCircuitBreakerV1(
      proto.authority,
      proto.msgTypeUrls,
    );
  }

  public toProto(_isClassic?: boolean): MsgTripCircuitBreakerV1.Proto {
    const { authority, msg_type_urls } = this;
    return MsgTripCircuitBreakerV1_pb.fromPartial({
      authority,
      msgTypeUrls: msg_type_urls,
    });
  }

  public packAny(_isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.circuit.v1.MsgTripCircuitBreaker',
      value: MsgTripCircuitBreakerV1_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    _isClassic?: boolean
  ): MsgTripCircuitBreakerV1 {
    return MsgTripCircuitBreakerV1.fromProto(
      MsgTripCircuitBreakerV1_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgTripCircuitBreakerV1 {
  export interface Amino {
    type:
      | 'circuit/MsgTripCircuitBreaker'
      | 'cosmos-sdk/x/circuit/MsgTripCircuitBreaker';
    value: {
      authority: AccAddress;
      msg_type_urls: string[];
      };
  }

  export interface Data {
    '@type': '/cosmos.circuit.v1.MsgTripCircuitBreaker';
    authority: AccAddress;
    msg_type_urls: string[];
  }

  export type Proto = MsgTripCircuitBreakerV1_pb;
}
