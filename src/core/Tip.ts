import { JSONSerializable } from '../util/json';
import { Coins } from './Coins';
import { AccAddress } from './bech32';
import { Tip as Tip_pb } from '@xpla/xpla.proto/cosmos/tx/v1beta1/tx';

/**
 * Tip is the tip used for meta-transactions.
 */
export class Tip extends JSONSerializable<Tip.Amino, Tip.Data, Tip.Proto> {
  /** Tip amount */
  public amount: Coins;

  /**
   * Creates a new Tip object.
   * @param amount is the amount of the tip
   * @param tipper is the address of the account paying for the tip
   */
  constructor(amount: Coins.Input, public tipper: AccAddress) {
    super();
    this.amount = new Coins(amount);
  }

  public static fromAmino(data: Tip.Amino): Tip {
    const { amount, tipper } = data;
    return new Tip(Coins.fromAmino(amount), tipper);
  }

  public toAmino(): Tip.Amino {
    return {
      amount: this.amount.toAmino(),
      tipper: this.tipper,
    };
  }

  public static fromData(data: Tip.Data): Tip {
    return new Tip(Coins.fromData(data.amount), data.tipper);
  }

  public toData(): Tip.Data {
    const { amount, tipper } = this;
    return {
      amount: amount.toData(),
      tipper,
    };
  }

  public static fromProto(proto: Tip.Proto): Tip {
    return new Tip(Coins.fromProto(proto.amount), proto.tipper);
  }

  public toProto(): Tip.Proto {
    const { amount, tipper } = this;
    return Tip_pb.fromPartial({
      amount: amount.toProto(),
      tipper,
    });
  }
}

export namespace Tip {
  export interface Amino {
    amount: Coins.Data;
    tipper: AccAddress;
  }

  export interface Data {
    amount: Coins.Data;
    tipper: AccAddress;
  }

  export type Proto = Tip_pb;
}
