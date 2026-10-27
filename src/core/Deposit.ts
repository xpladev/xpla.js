import { Int64, Int64Input, parseInt64 } from '../util/int64';
import { Coins } from './Coins';
import { JSONSerializable } from '../util/json';
import { AccAddress } from './bech32';
import { Deposit as Deposit_pb } from '@xpla/xpla.proto/cosmos/gov/v1/gov';

/**
 * Stores deposit information for a proposal
 */
export class Deposit extends JSONSerializable<
  Deposit.Amino,
  Deposit.Data,
  Deposit.Proto
> {
  public amount: Coins;
  public proposal_id: Int64;
  /**
   * @param proposal_id Id of porposal to deposit to
   * @param depositor depositor's account address
   * @param amount amount to deposit
   */

  constructor(
    proposal_id: Int64Input,
    public depositor: AccAddress,
    amount: Coins.Input
  ) {
    super();
    this.proposal_id = parseInt64(proposal_id);
    this.amount = new Coins(amount);
  }

  public static fromAmino(data: Deposit.Amino): Deposit {
    const { proposal_id, depositor, amount } = data;
    return new Deposit(proposal_id, depositor, Coins.fromAmino(amount));
  }

  public toAmino(): Deposit.Amino {
    const { proposal_id, depositor, amount } = this;
    return {
      proposal_id: proposal_id.toString(),
      depositor,
      amount: amount.toAmino(),
    };
  }

  public static fromData(data: Deposit.Data): Deposit {
    const { proposal_id, depositor, amount } = data;
    return new Deposit(proposal_id, depositor, Coins.fromData(amount));
  }

  public toData(): Deposit.Data {
    const { proposal_id, depositor, amount } = this;
    return {
      proposal_id: proposal_id.toString(),
      depositor,
      amount: amount.toData(),
    };
  }

  public static fromProto(data: Deposit.Proto): Deposit {
    return new Deposit(
      data.proposalId,
      data.depositor,
      Coins.fromProto(data.amount)
    );
  }

  public toProto(): Deposit.Proto {
    const { proposal_id, depositor, amount } = this;
    return Deposit_pb.fromPartial({
      proposalId: proposal_id.toString(),
      depositor: depositor,
      amount: amount.toProto(),
    });
  }
}

export namespace Deposit {
  export interface Amino {
    proposal_id: string;
    depositor: AccAddress;
    amount: Coins.Amino;
  }

  export interface Data {
    proposal_id: string;
    depositor: AccAddress;
    amount: Coins.Data;
  }

  export type Proto = Deposit_pb;
}
