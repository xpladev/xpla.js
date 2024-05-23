/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { Coins } from '../../../Coins';
import { AccAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgDeposit as MsgDepositV1B1_pb } from '@xpla/xpla.proto/cosmos/gov/v1beta1/tx';

/**
 * Add a deposit for a proposal
 */
export class MsgDepositV1B1 extends JSONSerializable<
  MsgDepositV1B1.Amino,
  MsgDepositV1B1.Data,
  MsgDepositV1B1.Proto
> {
  public amount: Coins;
  /**
   * @param proposal_id Id of porposal to deposit to
   * @param depositor depositor's account address
   * @param amount amount to deposit
   */
  constructor(
    public proposal_id: number,
    public depositor: AccAddress,
    amount: Coins.Input
  ) {
    super();
    this.amount = new Coins(amount);
  }

  public static fromAmino(
    data: MsgDepositV1B1.Amino,
    _isClassic?: boolean
  ): MsgDepositV1B1 {
    const {
      value: { proposal_id, depositor, amount },
    } = data;
    return new MsgDepositV1B1(
      Number.parseInt(proposal_id),
      depositor,
      Coins.fromAmino(amount)
    );
  }

  public toAmino(isClassic?: boolean): MsgDepositV1B1.Amino {
    const { proposal_id, depositor, amount } = this;
    return {
      type: isClassic ? 'gov/MsgDeposit' : 'cosmos-sdk/MsgDeposit',
      value: {
        proposal_id: proposal_id.toString(),
        depositor,
        amount: amount.toAmino(),
      },
    };
  }

  public static fromData(
    data: MsgDepositV1B1.Data,
    _isClassic?: boolean
  ): MsgDepositV1B1 {
    const { proposal_id, depositor, amount } = data;
    return new MsgDepositV1B1(
      Number.parseInt(proposal_id),
      depositor,
      Coins.fromData(amount)
    );
  }

  public toData(_isClassic?: boolean): MsgDepositV1B1.Data {
    const { proposal_id, depositor, amount } = this;
    return {
      '@type': '/cosmos.gov.v1beta1.MsgDeposit',
      proposal_id: proposal_id.toString(),
      depositor,
      amount: amount.toData(),
    };
  }

  public static fromProto(
    proto: MsgDepositV1B1.Proto,
    _isClassic?: boolean
  ): MsgDepositV1B1 {
    return new MsgDepositV1B1(
      proto.proposalId.toNumber(),
      proto.depositor,
      Coins.fromProto(proto.amount)
    );
  }

  public toProto(_isClassic?: boolean): MsgDepositV1B1.Proto {
    const { proposal_id, depositor, amount } = this;
    return MsgDepositV1B1_pb.fromPartial({
      amount: amount.toProto(),
      depositor,
      proposalId: proposal_id,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.gov.v1beta1.MsgDeposit',
      value: MsgDepositV1B1_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(msgAny: Any, isClassic?: boolean): MsgDepositV1B1 {
    return MsgDepositV1B1.fromProto(
      MsgDepositV1B1_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgDepositV1B1 {
  export interface Amino {
    type: 'gov/MsgDeposit' | 'cosmos-sdk/MsgDeposit';
    value: {
      proposal_id: string;
      depositor: AccAddress;
      amount: Coins.Amino;
    };
  }

  export interface Data {
    '@type': '/cosmos.gov.v1beta1.MsgDeposit';
    proposal_id: string;
    depositor: AccAddress;
    amount: Coins.Data;
  }

  export type Proto = MsgDepositV1B1_pb;
}
