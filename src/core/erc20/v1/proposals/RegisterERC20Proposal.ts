/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { RegisterERC20Proposal as RegisterERC20Proposal_pb } from '@xpla/xpla.proto/cosmos/evm/erc20/v1/erc20';

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
   * @param erc20addresses contract addresses of ERC20 token
   */
  constructor(
    public title: string,
    public description: string,
    public erc20addresses: string[]
  ) {
    super();
  }

  public static fromAmino(
    data: RegisterERC20Proposal.Amino,
    _isClassic?: boolean
  ): RegisterERC20Proposal {
    const {
      value: { title, description, erc20addresses },
    } = data;
    return new RegisterERC20Proposal(title, description, erc20addresses);
  }

  public toAmino(_isClassic?: boolean): RegisterERC20Proposal.Amino {
    const { title, description, erc20addresses } = this;
    return {
      type: 'erc20/RegisterERC20Proposal',
      value: {
        title,
        description,
        erc20addresses,
      },
    };
  }

  public static fromData(
    data: RegisterERC20Proposal.Data,
    _isClassic?: boolean
  ): RegisterERC20Proposal {
    const { title, description, erc20addresses } = data;

    return new RegisterERC20Proposal(title, description, erc20addresses);
  }

  public toData(_isClassic?: boolean): RegisterERC20Proposal.Data {
    const { title, description, erc20addresses } = this;
    return {
      '@type': '/cosmos.evm.erc20.v1.RegisterERC20Proposal',
      title,
      description,
      erc20addresses,
    };
  }

  public static fromProto(
    proto: RegisterERC20Proposal.Proto,
    _isClassic?: boolean
  ): RegisterERC20Proposal {
    return new RegisterERC20Proposal(
      proto.title,
      proto.description,
      proto.erc20addresses
    );
  }

  public toProto(_isClassic?: boolean): RegisterERC20Proposal.Proto {
    const { title, description, erc20addresses } = this;
    return RegisterERC20Proposal_pb.fromPartial({
      title,
      description,
      erc20addresses,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.evm.erc20.v1.RegisterERC20Proposal',
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
      erc20addresses: string[];
    };
  }

  export interface Data {
    '@type':
      | '/ethermint.erc20.v1.RegisterERC20Proposal'
      | '/evmos.erc20.v1.RegisterERC20Proposal'
      | '/cosmos.evm.erc20.v1.RegisterERC20Proposal';
    title: string;
    description: string;
    erc20addresses: string[];
  }

  export type Proto = RegisterERC20Proposal_pb;
}
