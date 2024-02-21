/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../util/json';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { RegisterERC20Proposal as RegisterERC20Proposal_pb } from '@xpla/xpla.proto/evmos/erc20/v1/erc20';

/**
 * erc20 RegisterERC20Proposal
 */
export class RegisterERC20Proposal extends JSONSerializable<
  RegisterERC20Proposal.Amino,
  RegisterERC20Proposal.Data,
  RegisterERC20Proposal.Proto
> {
  /**
   * @param title title of the proposal
   * @param description proposal description
   * @param erc20address contract address of ERC20 token
   */
  constructor(
    public title: string,
    public description: string,
    public erc20address: string
  ) {
    super();
  }

  public static fromAmino(
    data: RegisterERC20Proposal.Amino,
    _isClassic?: boolean
  ): RegisterERC20Proposal {
    const {
      value: { title, description, erc20address },
    } = data;
    return new RegisterERC20Proposal(title, description, erc20address);
  }

  public toAmino(_isClassic?: boolean): RegisterERC20Proposal.Amino {
    const { title, description, erc20address } = this;
    return {
      type: 'erc20/RegisterERC20Proposal',
      value: {
        title,
        description,
        erc20address,
      },
    };
  }

  public static fromData(
    data: RegisterERC20Proposal.Data,
    _isClassic?: boolean
  ): RegisterERC20Proposal {
    const { title, description, erc20address } = data;

    return new RegisterERC20Proposal(title, description, erc20address);
  }

  public toData(_isClassic?: boolean): RegisterERC20Proposal.Data {
    const { title, description, erc20address } = this;
    return {
      '@type': '/evmos.erc20.v1.RegisterERC20Proposal',
      title,
      description,
      erc20address,
    };
  }

  public static fromProto(
    proto: RegisterERC20Proposal.Proto,
    _isClassic?: boolean
  ): RegisterERC20Proposal {
    return new RegisterERC20Proposal(
      proto.title,
      proto.description,
      proto.erc20address
    );
  }

  public toProto(_isClassic?: boolean): RegisterERC20Proposal.Proto {
    const { title, description, erc20address } = this;
    return RegisterERC20Proposal_pb.fromPartial({
      title,
      description,
      erc20address,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/evmos.erc20.v1.RegisterERC20Proposal',
      value: RegisterERC20Proposal_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): RegisterERC20Proposal {
    return RegisterERC20Proposal.fromProto(
      RegisterERC20Proposal_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace RegisterERC20Proposal {
  export interface Amino {
    type: 'erc20/RegisterERC20Proposal';
    value: {
      title: string;
      description: string;
      erc20address: string;
    };
  }

  export interface Data {
    '@type': '/evmos.erc20.v1.RegisterERC20Proposal';
    title: string;
    description: string;
    erc20address: string;
  }

  export type Proto = RegisterERC20Proposal_pb;
}
