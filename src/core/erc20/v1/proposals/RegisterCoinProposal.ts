/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { Metadata } from '@xpla/xpla.proto/cosmos/bank/v1beta1/bank';
import { RegisterCoinProposal as RegisterCoinProposal_pb } from '@xpla/xpla.proto/cosmos/evm/erc20/v1/erc20';

/**
 * erc20 RegisterCoinProposal
 */
export class RegisterCoinProposal extends JSONSerializable<
  RegisterCoinProposal.Amino,
  RegisterCoinProposal.Data,
  RegisterCoinProposal.Proto
> {
  /**
   * @param title title of the proposal
   * @param description proposal description
   * @param metadata metadata of the native Cosmos coin
   */
  constructor(
    public title: string,
    public description: string,
    public metadata: Metadata[] | undefined
  ) {
    super();
  }

  public static fromAmino(
    data: RegisterCoinProposal.Amino,
    _isClassic?: boolean
  ): RegisterCoinProposal {
    const {
      value: { title, description, metadata },
    } = data;
    return new RegisterCoinProposal(title, description, metadata);
  }

  public toAmino(_isClassic?: boolean): RegisterCoinProposal.Amino {
    const { title, description, metadata } = this;
    return {
      type: 'erc20/RegisterCoinProposal',
      value: {
        title,
        description,
        metadata,
      },
    };
  }

  public static fromData(
    data: RegisterCoinProposal.Data,
    _isClassic?: boolean
  ): RegisterCoinProposal {
    const { title, description, metadata } = data;

    return new RegisterCoinProposal(title, description, metadata);
  }

  public toData(_isClassic?: boolean): RegisterCoinProposal.Data {
    const { title, description, metadata } = this;
    return {
      '@type': '/cosmos.evm.erc20.v1.RegisterCoinProposal',
      title,
      description,
      metadata,
    };
  }

  public static fromProto(
    proto: RegisterCoinProposal.Proto,
    _isClassic?: boolean
  ): RegisterCoinProposal {
    return new RegisterCoinProposal(
      proto.title,
      proto.description,
      proto.metadata
    );
  }

  public toProto(_isClassic?: boolean): RegisterCoinProposal.Proto {
    const { title, description, metadata } = this;
    return RegisterCoinProposal_pb.fromPartial({
      title,
      description,
      metadata,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.evm.erc20.v1.RegisterCoinProposal',
      value: RegisterCoinProposal_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): RegisterCoinProposal {
    return RegisterCoinProposal.fromProto(
      RegisterCoinProposal_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace RegisterCoinProposal {
  export interface Amino {
    type: 'erc20/RegisterCoinProposal';
    value: {
      title: string;
      description: string;
      metadata: Metadata[] | undefined;
    };
  }

  export interface Data {
    '@type':
      | '/ethermint.erc20.v1.RegisterCoinProposal'
      | '/evmos.erc20.v1.RegisterCoinProposal'
      | '/cosmos.evm.erc20.v1.RegisterCoinProposal';
    title: string;
    description: string;
    metadata: Metadata[] | undefined;
  }

  export type Proto = RegisterCoinProposal_pb;
}
