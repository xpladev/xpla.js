/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { ValAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgUnjail as MsgUnjailV1B1_pb } from '@xpla/xpla.proto/cosmos/slashing/v1beta1/tx';

/**
 * A validator can be jailed by the blockchain if misbehavior is detected, such as
 * double-signing or having missed too many vote periods in the Oracle ballot.
 *
 * This is done to protect delegators' funds from getting slashed further, until the
 * validator's issues have been addressed. A jailed validator cannot participate in
 * block rewards, and must be manually unjailed by submitting this message.
 */
export class MsgUnjailV1B1 extends JSONSerializable<
  MsgUnjailV1B1.Amino,
  MsgUnjailV1B1.Data,
  MsgUnjailV1B1.Proto
> {
  /**
   * @param address validator's operator address
   */
  constructor(public address: ValAddress) {
    super();
  }

  public static fromAmino(
    data: MsgUnjailV1B1.Amino,
    _isClassic?: boolean
  ): MsgUnjailV1B1 {
    const {
      value: { address },
    } = data;
    return new MsgUnjailV1B1(address);
  }

  public toAmino(isClassic?: boolean): MsgUnjailV1B1.Amino {
    const { address } = this;
    return {
      type: isClassic ? 'slashing/MsgUnjail' : 'cosmos-sdk/MsgUnjail',
      value: {
        address,
      },
    };
  }

  public static fromData(
    proto: MsgUnjailV1B1.Data,
    _isClassic?: boolean
  ): MsgUnjailV1B1 {
    const { address } = proto;
    return new MsgUnjailV1B1(address);
  }

  public toData(_isClassic?: boolean): MsgUnjailV1B1.Data {
    const { address } = this;
    return {
      '@type': '/cosmos.slashing.v1beta1.MsgUnjail',
      address,
    };
  }

  public static fromProto(
    proto: MsgUnjailV1B1.Proto,
    _isClassic?: boolean
  ): MsgUnjailV1B1 {
    return new MsgUnjailV1B1(proto.validatorAddr);
  }

  public toProto(_isClassic?: boolean): MsgUnjailV1B1.Proto {
    const { address } = this;
    return MsgUnjailV1B1_pb.fromPartial({
      validatorAddr: address,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.slashing.v1beta1.MsgUnjail',
      value: MsgUnjailV1B1_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(msgAny: Any, isClassic?: boolean): MsgUnjailV1B1 {
    return MsgUnjailV1B1.fromProto(
      MsgUnjailV1B1_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgUnjailV1B1 {
  export interface Amino {
    type: 'slashing/MsgUnjail' | 'cosmos-sdk/MsgUnjail';
    value: {
      address: ValAddress;
    };
  }

  export interface Data {
    '@type': '/cosmos.slashing.v1beta1.MsgUnjail';
    address: ValAddress;
  }

  export type Proto = MsgUnjailV1B1_pb;
}
