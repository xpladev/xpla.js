/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgSend as MsgNftSendV1B1_pb } from '@xpla/xpla.proto/cosmos/nft/v1beta1/tx';

export class MsgNftSendV1B1 extends JSONSerializable<
  any,
  MsgNftSendV1B1.Data,
  MsgNftSendV1B1.Proto
> {
  /**
   * @param class_id defines the unique identifier of the nft classification, similar to the contract address of ERC721
   * @param id defines the unique identification of nft
   * @param sender is the address of the owner of nft
   * @param receiver is the receiver address of nft
   */
  constructor(
    public class_id: string,
    public id: string,
    public sender: AccAddress,
    public receiver: AccAddress
  ) {
    super();
  }

  public static fromAmino(
    _: any,
    _isClassic?: boolean
  ): MsgNftSendV1B1 {
    throw new Error('Amino not supported');
  }

  public toAmino(_isClassic?: boolean): any {
    throw new Error('Amino not supported');
  }

  public static fromData(
    data: MsgNftSendV1B1.Data,
    _isClassic?: boolean
  ): MsgNftSendV1B1 {
    const { class_id, id, sender, receiver } = data;
    return new MsgNftSendV1B1(class_id, id, sender, receiver);
  }

  public toData(_isClassic?: boolean): MsgNftSendV1B1.Data {
    const { class_id, id, sender, receiver } = this;
    return {
      '@type': '/cosmos.nft.v1beta1.MsgSend',
      class_id,
      id,
      sender,
      receiver,
    };
  }

  public static fromProto(
    proto: MsgNftSendV1B1.Proto,
    _isClassic?: boolean
  ): MsgNftSendV1B1 {
    return new MsgNftSendV1B1(
      proto.classId,
      proto.id,
      proto.sender,
      proto.receiver
    );
  }

  public toProto(_isClassic?: boolean): MsgNftSendV1B1.Proto {
    const { class_id, id, sender, receiver } = this;
    return MsgNftSendV1B1_pb.fromPartial({
      classId: class_id,
      id,
      sender,
      receiver,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.nft.v1beta1.MsgSend',
      value: MsgNftSendV1B1_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(msgAny: Any, isClassic?: boolean): MsgNftSendV1B1 {
    return MsgNftSendV1B1.fromProto(
      MsgNftSendV1B1_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgNftSendV1B1 {
  export interface Data {
    '@type': '/cosmos.nft.v1beta1.MsgSend';
    class_id: string;
    id: string;
    sender: AccAddress;
    receiver: AccAddress;
  }

  export type Proto = MsgNftSendV1B1_pb;
}
