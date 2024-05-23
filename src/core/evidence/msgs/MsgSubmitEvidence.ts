/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgSubmitEvidence as MsgSubmitEvidence_pb } from '@xpla/xpla.proto/cosmos/evidence/v1beta1/tx';

/**
 * A basic message for sending [[Coins]] between Xpla accounts.
 */
export class MsgSubmitEvidence extends JSONSerializable<
  MsgSubmitEvidence.Amino,
  MsgSubmitEvidence.Data,
  MsgSubmitEvidence.Proto
> {
  /**
   * @param from_address sender's address
   * @param to_address recipient's address
   * @param amount value of the transaction
   */
  constructor(public submitter: AccAddress, public evidence?: Any | undefined) {
    super();
  }

  public static fromAmino(
    data: MsgSubmitEvidence.Amino,
    _isClassic?: boolean
  ): MsgSubmitEvidence {
    const {
      value: { submitter, evidence },
    } = data;
    return new MsgSubmitEvidence(submitter, evidence);
  }

  public toAmino(isClassic?: boolean): MsgSubmitEvidence.Amino {
    const { submitter, evidence } = this;
    return {
      type: isClassic
        ? 'bank/MsgSubmitEvidence'
        : 'cosmos-sdk/MsgSubmitEvidence',
      value: {
        submitter,
        evidence,
      },
    };
  }

  public static fromData(
    data: MsgSubmitEvidence.Data,
    _isClassic?: boolean
  ): MsgSubmitEvidence {
    const { submitter, evidence } = data;
    return new MsgSubmitEvidence(submitter, evidence);
  }

  public toData(_isClassic?: boolean): MsgSubmitEvidence.Data {
    const { submitter, evidence } = this;
    return {
      '@type': '/cosmos.bank.v1beta1.MsgSubmitEvidence',
      submitter,
      evidence,
    };
  }

  public static fromProto(
    proto: MsgSubmitEvidence.Proto,
    _isClassic?: boolean
  ): MsgSubmitEvidence {
    return new MsgSubmitEvidence(proto.submitter, proto.evidence);
  }

  public toProto(_isClassic?: boolean): MsgSubmitEvidence.Proto {
    const { submitter, evidence } = this;
    return MsgSubmitEvidence_pb.fromPartial({
      submitter,
      evidence,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.bank.v1beta1.MsgSubmitEvidence',
      value: MsgSubmitEvidence_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(msgAny: Any, isClassic?: boolean): MsgSubmitEvidence {
    return MsgSubmitEvidence.fromProto(
      MsgSubmitEvidence_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgSubmitEvidence {
  export interface Amino {
    type: 'bank/MsgSubmitEvidence' | 'cosmos-sdk/MsgSubmitEvidence';
    value: {
      submitter: AccAddress;
      evidence: Any | undefined;
    };
  }

  export interface Data {
    '@type': '/cosmos.bank.v1beta1.MsgSubmitEvidence';
    submitter: AccAddress;
    evidence: Any | undefined;
  }

  export type Proto = MsgSubmitEvidence_pb;
}
