/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import {
  MsgRegisterPreinstalls as MsgRegisterPreinstallsV1_pb,
} from '@xpla/xpla.proto/cosmos/evm/vm/v1/tx';
import {
  Preinstall,
} from '@xpla/xpla.proto/cosmos/evm/vm/v1/evm';

/**
 * evm MsgRegisterPreinstalls
 */
export class MsgRegisterPreinstallsV1 extends JSONSerializable<
  MsgRegisterPreinstallsV1.Amino,
  MsgRegisterPreinstallsV1.Data,
  MsgRegisterPreinstallsV1.Proto
> {
  public preinstalls: Preinstall[];
  
  /**
   * @param authority is the address of the governance account.
   * @param preinstalls defines the preinstalls to create.
   */
  constructor(
    /** authority is the address of the governance account. */
    public authority: string,
    /** preinstalls defines the preinstalls to create. */
    preinstalls: any[]
  ) {
    super();
    this.preinstalls = preinstalls.map((p) => Preinstall.fromJSON(p));
  }

  public static fromAmino(
    amino: MsgRegisterPreinstallsV1.Amino,
    _isClassic?: boolean
  ): MsgRegisterPreinstallsV1 {
    const {
      value: { authority, preinstalls },
    } = amino;
    return new MsgRegisterPreinstallsV1(authority, preinstalls);
  }

  public toAmino(_isClassic?: boolean): MsgRegisterPreinstallsV1.Amino {
    const { authority, preinstalls } = this;
    return {
      type: 'cosmos/evm/MsgRegisterPreinstalls',
      value: {
        authority,
        preinstalls: preinstalls.map((p) => Preinstall.toJSON(p)),
      },
    };
  }

  public static fromData(
    obj: MsgRegisterPreinstallsV1.Data,
    _isClassic?: boolean
  ): MsgRegisterPreinstallsV1 {
    const { authority, preinstalls } = obj;
    return new MsgRegisterPreinstallsV1(authority, preinstalls);
  }

  public toData(_isClassic?: boolean): MsgRegisterPreinstallsV1.Data {
    const { authority, preinstalls } = this;
    return {
      '@type': '/cosmos.evm.vm.v1.MsgRegisterPreinstalls',
      authority,
      preinstalls: preinstalls.map((p) => Preinstall.toJSON(p)),
    };
  }

  public static fromProto(
    proto: MsgRegisterPreinstallsV1.Proto,
    _isClassic?: boolean
  ): MsgRegisterPreinstallsV1 {
    return new MsgRegisterPreinstallsV1(proto.authority, proto.preinstalls);
  }

  public toProto(_isClassic?: boolean): MsgRegisterPreinstallsV1.Proto {
    const { authority, preinstalls } = this;
    if (preinstalls !== undefined) {
      return MsgRegisterPreinstallsV1_pb.fromPartial({
        authority,
        preinstalls,
      });
    }
    return MsgRegisterPreinstallsV1_pb.fromPartial({
      authority,
      preinstalls,
    });
  }

  public packAny(_isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.evm.vm.v1.MsgRegisterPreinstalls',
      value: MsgRegisterPreinstallsV1_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _isClassic?: boolean): MsgRegisterPreinstallsV1 {
    return MsgRegisterPreinstallsV1.fromProto(
      MsgRegisterPreinstallsV1_pb.decode(msgAny.value),
    );
  }
}

export namespace MsgRegisterPreinstallsV1 {
  export interface Amino {
    type:
      | 'ethermint/MsgRegisterPreinstalls'
      | 'evm/MsgRegisterPreinstalls'
      | 'cosmos/evm/MsgRegisterPreinstalls';
    value: {
      authority: string;
      preinstalls: any[];
    };
  }

  export interface Data {
    '@type': '/cosmos.evm.vm.v1.MsgRegisterPreinstalls';
    authority: string;
    preinstalls: any[];
  }

  export type Proto = MsgRegisterPreinstallsV1_pb;
}
