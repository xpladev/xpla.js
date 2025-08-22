import { JSONSerializable } from '../../../../util/json';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { PinCodesProposal as PinCodesProposal_pb } from '@xpla/xpla.proto/cosmwasm/wasm/v1/proposal_legacy';

/**
 * PinCodesProposal gov proposal content type to pin a set of code ids in the
 * wasmvm cache.
 */
export class PinCodesProposal extends JSONSerializable<
  PinCodesProposal.Amino,
  PinCodesProposal.Data,
  PinCodesProposal.Proto
> {
  /**
   * @param title a short summary
   * @param description a human readable text
   * @param code_ids the address of the smart code_ids
   */
  constructor(
    public title: string,
    public description: string,
    public code_ids: number[]
  ) {
    super();
  }

  public static fromAmino(
    data: PinCodesProposal.Amino,
    isClassic?: boolean
  ): PinCodesProposal {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const {
      value: { title, description, code_ids },
    } = data;
    return new PinCodesProposal(
      title,
      description,
      code_ids.map(Number.parseInt)
    );
  }

  public toAmino(isClassic?: boolean): PinCodesProposal.Amino {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const { title, description, code_ids } = this;
    return {
      type: 'wasm/PinCodesProposal',
      value: {
        title,
        description,
        code_ids: code_ids.map(cid => cid.toFixed()),
      },
    };
  }

  public static fromProto(
    proto: PinCodesProposal.Proto,
    isClassic?: boolean
  ): PinCodesProposal {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    return new PinCodesProposal(
      proto.title,
      proto.description,
      proto.codeIds.map(codeId => codeId.toNumber())
    );
  }

  public toProto(isClassic?: boolean): PinCodesProposal.Proto {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const { title, description, code_ids } = this;
    return PinCodesProposal_pb.fromPartial({
      title,
      description,
      codeIds: code_ids,
    });
  }
  public packAny(isClassic?: boolean): Any {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    return Any.fromPartial({
      typeUrl: '/cosmwasm.wasm.v1.PinCodesProposal',
      value: PinCodesProposal_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(msgAny: Any, isClassic?: boolean): PinCodesProposal {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    return PinCodesProposal.fromProto(
      PinCodesProposal_pb.decode(msgAny.value),
      isClassic
    );
  }

  public static fromData(
    data: PinCodesProposal.Data,
    isClassic?: boolean
  ): PinCodesProposal {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const { title, description, code_ids } = data;
    return new PinCodesProposal(
      title,
      description,
      code_ids.map(Number.parseInt)
    );
  }

  public toData(isClassic?: boolean): PinCodesProposal.Data {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const { title, description, code_ids } = this;
    return {
      '@type': '/cosmwasm.wasm.v1.PinCodesProposal',
      title,
      description,
      code_ids: code_ids.map(cid => cid.toFixed()),
    };
  }
}

export namespace PinCodesProposal {
  export interface Amino {
    type: 'wasm/PinCodesProposal';
    value: {
      title: string;
      description: string;
      code_ids: string[];
    };
  }

  export interface Data {
    '@type': '/cosmwasm.wasm.v1.PinCodesProposal';
    title: string;
    description: string;
    code_ids: string[];
  }

  export type Proto = PinCodesProposal_pb;
}
