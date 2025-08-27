/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { Coin } from '../../../Coin';
import { AccAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgConvertCoin as MsgConvertCoinV1_pb } from '@xpla/xpla.proto/cosmos/evm/erc20/v1/tx';

/**
 * erc20 MsgConvertCoin
 */
export class MsgConvertCoinV1 extends JSONSerializable<
  MsgConvertCoinV1.Amino,
  MsgConvertCoinV1.Data,
  MsgConvertCoinV1.Proto
> {
  public coin: Coin | undefined;

  /**
   * @param coin Cosmos coin which denomination is registered in a token pair
   * @param receiver recipient hex address to receive ERC20 token
   * @param sender cosmos bech32 address from the owner of the given Cosmos coins
   */
  constructor(
    coin: Coin.Data | undefined,
    public receiver: AccAddress,
    public sender: AccAddress
  ) {
    super();
    if (coin) this.coin = Coin.fromData(coin);
  }

  public static fromAmino(
    amino: MsgConvertCoinV1.Amino,
    _isClassic?: boolean
  ): MsgConvertCoinV1 {
    const {
      value: { coin, receiver, sender },
    } = amino;
    return new MsgConvertCoinV1(coin, receiver, sender);
  }

  public toAmino(_isClassic?: boolean): MsgConvertCoinV1.Amino {
    const { coin, receiver, sender } = this;
    return {
      type: 'evm/MsgConvertCoin',
      value: {
        coin: coin ? coin.toAmino() : undefined,
        receiver,
        sender,
      },
    };
  }

  public static fromData(
    obj: MsgConvertCoinV1.Data,
    _isClassic?: boolean
  ): MsgConvertCoinV1 {
    const { coin, receiver, sender } = obj;
    return new MsgConvertCoinV1(coin, receiver, sender);
  }

  public toData(_isClassic?: boolean): MsgConvertCoinV1.Data {
    const { coin, receiver, sender } = this;
    return {
      '@type': '/cosmos.evm.erc20.v1.MsgConvertCoin',
      coin: coin ? coin.toData() : undefined,
      receiver,
      sender,
    };
  }

  public static fromProto(
    proto: MsgConvertCoinV1.Proto,
    _isClassic?: boolean
  ): MsgConvertCoinV1 {
    return new MsgConvertCoinV1(proto.coin, proto.receiver, proto.sender);
  }

  public toProto(_isClassic?: boolean): MsgConvertCoinV1.Proto {
    const { coin, receiver, sender } = this;
    return MsgConvertCoinV1_pb.fromPartial({
      coin: coin ? coin.toProto() : undefined,
      receiver,
      sender,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.evm.erc20.v1.MsgConvertCoin',
      value: MsgConvertCoinV1_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(msgAny: Any, isClassic?: boolean): MsgConvertCoinV1 {
    return MsgConvertCoinV1.fromProto(
      MsgConvertCoinV1_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgConvertCoinV1 {
  export interface Amino {
    type: 'ethermint/MsgConvertCoin' | 'evmos/MsgConvertCoin' | 'evm/MsgConvertCoin';
    value: {
      coin: Coin.Amino | undefined;
      receiver: AccAddress;
      sender: AccAddress;
    };
  }

  export interface Data {
    '@type':
      | '/ethermint.erc20.v1.MsgConvertCoin'
      | '/evmos.erc20.v1.MsgConvertCoin'
      | '/cosmos.evm.erc20.v1.MsgConvertCoin';
    coin: Coin.Data | undefined;
    receiver: AccAddress;
    sender: AccAddress;
  }

  export type Proto = MsgConvertCoinV1_pb;
}
