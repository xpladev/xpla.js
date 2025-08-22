/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { ToggleTokenConversionProposal as ToggleTokenConversionProposal_pb } from '@xpla/xpla.proto/cosmos/evm/erc20/v1/erc20';

/**
 * erc20 ToggleTokenConversionProposal
 */
export class ToggleTokenConversionProposal extends JSONSerializable<
  ToggleTokenConversionProposal.Amino,
  ToggleTokenConversionProposal.Data,
  ToggleTokenConversionProposal.Proto
> {
  /**
   * @param title title of the proposal
   * @param description proposal description
   * @param token token identifier can be either the hex contract address of the ERC20 or the Cosmos base denomination
   */
  constructor(
    public title: string,
    public description: string,
    public token: string
  ) {
    super();
  }

  public static fromAmino(
    data: ToggleTokenConversionProposal.Amino,
    _isClassic?: boolean
  ): ToggleTokenConversionProposal {
    const {
      value: { title, description, token },
    } = data;
    return new ToggleTokenConversionProposal(title, description, token);
  }

  public toAmino(_isClassic?: boolean): ToggleTokenConversionProposal.Amino {
    const { title, description, token } = this;
    return {
      type: 'erc20/ToggleTokenConversionProposal',
      value: {
        title,
        description,
        token,
      },
    };
  }

  public static fromData(
    data: ToggleTokenConversionProposal.Data,
    _isClassic?: boolean
  ): ToggleTokenConversionProposal {
    const { title, description, token } = data;

    return new ToggleTokenConversionProposal(title, description, token);
  }

  public toData(_isClassic?: boolean): ToggleTokenConversionProposal.Data {
    const { title, description, token } = this;
    return {
      '@type': '/cosmos.evm.erc20.v1.ToggleTokenConversionProposal',
      title,
      description,
      token,
    };
  }

  public static fromProto(
    proto: ToggleTokenConversionProposal.Proto,
    _isClassic?: boolean
  ): ToggleTokenConversionProposal {
    return new ToggleTokenConversionProposal(
      proto.title,
      proto.description,
      proto.token
    );
  }

  public toProto(_isClassic?: boolean): ToggleTokenConversionProposal.Proto {
    const { title, description, token } = this;
    return ToggleTokenConversionProposal_pb.fromPartial({
      title,
      description,
      token,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.evm.erc20.v1.ToggleTokenConversionProposal',
      value: ToggleTokenConversionProposal_pb.encode(
        this.toProto(isClassic)
      ).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): ToggleTokenConversionProposal {
    return ToggleTokenConversionProposal.fromProto(
      ToggleTokenConversionProposal_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace ToggleTokenConversionProposal {
  export interface Amino {
    type: 'erc20/ToggleTokenConversionProposal';
    value: {
      title: string;
      description: string;
      token: string;
    };
  }

  export interface Data {
    '@type':
      | '/ethermint.erc20.v1.ToggleTokenConversionProposal'
      | '/evmos.erc20.v1.ToggleTokenConversionProposal'
      | '/cosmos.evm.erc20.v1.ToggleTokenConversionProposal';
    title: string;
    description: string;
    token: string;
  }

  export type Proto = ToggleTokenConversionProposal_pb;
}
