/* eslint-disable @typescript-eslint/no-unused-vars */
import { Coin } from '../../Coin';
import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgConvertCoin as MsgConvertCoin_pb } from '@xpla/xpla.proto/evmos/erc20/v1/tx';

/**
 * erc20 MsgConvertCoin
 */
export class MsgConvertCoin extends JSONSerializable<
  MsgConvertCoin.Amino,
  MsgConvertCoin.Data,
  MsgConvertCoin.Proto
> {
  public coin: Coin | undefined;

  /**
   * @param coin Cosmos coin which denomination is registered in a token pair
   * @param receiver recipient hex address to receive ERC20 token
   * @param sender cosmos bech32 address from the owner of the given Cosmos coins
   */
  constructor(
    coin: Coin.Data | undefined,
    public receiver: string,
    public sender: AccAddress
  ) {
    super();
    if (coin) this.coin = Coin.fromData(coin);
  }

  public static fromAmino(
    amino: MsgConvertCoin.Amino,
    _isClassic?: boolean
  ): MsgConvertCoin {
    const {
      value: { coin, receiver, sender },
    } = amino;
    return new MsgConvertCoin(coin, receiver, sender);
  }

  public toAmino(_isClassic?: boolean): MsgConvertCoin.Amino {
    const { coin, receiver, sender } = this;
    return {
      type: 'erc20/MsgConvertCoin',
      value: {
        coin: coin ? coin.toAmino() : undefined,
        receiver,
        sender,
      },
    };
  }

  public static fromData(
    obj: MsgConvertCoin.Data,
    _isClassic?: boolean
  ): MsgConvertCoin {
    const { coin, receiver, sender } = obj;
    return new MsgConvertCoin(coin, receiver, sender);
  }

  public toData(_isClassic?: boolean): MsgConvertCoin.Data {
    const { coin, receiver, sender } = this;
    return {
      '@type': '/evmos.erc20.v1.MsgConvertCoin',
      coin: coin ? coin.toData() : undefined,
      receiver,
      sender,
    };
  }

  public static fromProto(
    proto: MsgConvertCoin.Proto,
    _isClassic?: boolean
  ): MsgConvertCoin {
    return new MsgConvertCoin(proto.coin, proto.receiver, proto.sender);
  }

  public toProto(_isClassic?: boolean): MsgConvertCoin.Proto {
    const { coin, receiver, sender } = this;
    return MsgConvertCoin_pb.fromPartial({
      coin: coin ? coin.toProto() : undefined,
      receiver,
      sender,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/evmos.erc20.v1.MsgConvertCoin',
      value: MsgConvertCoin_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(msgAny: Any, isClassic?: boolean): MsgConvertCoin {
    return MsgConvertCoin.fromProto(
      MsgConvertCoin_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgConvertCoin {
  export interface Amino {
    type: 'erc20/MsgConvertCoin';
    value: {
      coin: Coin.Amino | undefined;
      receiver: string;
      sender: AccAddress;
    };
  }

  export interface Data {
    '@type': '/evmos.erc20.v1.MsgConvertCoin';
    coin: Coin.Data | undefined;
    receiver: string;
    sender: AccAddress;
  }

  export type Proto = MsgConvertCoin_pb;
}
