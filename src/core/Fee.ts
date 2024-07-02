import { JSONSerializable } from '../util/json';
import { Coins } from './Coins';
import { Int } from './numeric';
import { AccAddress } from './bech32';
import { Fee as Fee_pb } from '@xpla/xpla.proto/cosmos/tx/v1beta1/tx';

/**
 * A transaction must include a fee, otherwise it will be rejected.
 */
export class Fee extends JSONSerializable<Fee.Amino, Fee.Data, Fee.Proto> {
  /** Fee amount to be paid */
  public readonly amount: Coins;

  /**
   * Creates a new Fee object.
   * @param gas gas limit
   * @param amount amount to be paid to validator
   */
  constructor(
    public readonly gas_limit: number,
    amount: Coins.Input,
    public payer?: AccAddress,
    public granter?: AccAddress
  ) {
    super();
    this.amount = new Coins(amount);
  }

  public static fromAmino(data: Fee.Amino): Fee {
    const { gas, amount, payer, granter } = data;
    return new Fee(
      Number.parseInt(gas),
      Coins.fromAmino(amount),
      payer,
      granter
    );
  }

  public toAmino(): Fee.Amino {
    const { gas_limit, amount, payer, granter } = this;
    return {
      gas: new Int(gas_limit).toString(),
      amount: amount.toAmino(),
      payer,
      granter,
    };
  }

  public static fromData(data: Fee.Data): Fee {
    return new Fee(
      Number.parseInt(data.gas_limit),
      Coins.fromData(data.amount),
      data.payer,
      data.granter
    );
  }

  public toData(): Fee.Data {
    const { gas_limit, amount, payer, granter } = this;
    return {
      gas_limit: gas_limit.toFixed(),
      amount: amount.toData(),
      granter,
      payer,
    };
  }

  public static fromProto(proto: Fee.Proto): Fee {
    return new Fee(
      proto.gasLimit.toNumber(),
      Coins.fromProto(proto.amount),
      proto.payer,
      proto.granter
    );
  }

  public toProto(): Fee.Proto {
    const { gas_limit, amount, payer, granter } = this;
    return Fee_pb.fromPartial({
      gasLimit: gas_limit,
      amount: amount.toProto(),
      granter,
      payer,
    });
  }

  /**
   * Gets the minimum gas prices implied by the fee. Minimum gas prices are `fee amount / gas`.
   */
  public gasPrices(): Coins {
    return this.amount.toDecCoins().div(this.gas_limit);
  }
}

export namespace Fee {
  export interface Amino {
    gas: string;
    amount: Coins.Amino;
    payer?: string;
    granter?: string;
  }

  export interface Data {
    gas_limit: string;
    amount: Coins.Data;
    payer?: string;
    granter?: string;
  }

  export type Proto = Fee_pb;
}
