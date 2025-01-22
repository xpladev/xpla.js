/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../../../../util/json';
import { AccAddress } from '../../../../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgModuleQuerySafe as MsgModuleQuerySafeV1_pb } from '@xpla/xpla.proto/ibc/applications/interchain_accounts/host/v1/tx';
import { QueryRequestV1 } from '../QueryRequest';

export class MsgModuleQuerySafeV1 extends JSONSerializable<
  any,
  MsgModuleQuerySafeV1.Data,
  MsgModuleQuerySafeV1.Proto
> {
  /**
   * @param signer is signer address.
   * @param requests defines the module safe queries to execute.
   */
  constructor(
    public signer: AccAddress,
    public requests: QueryRequestV1[],
  ) {
    super();
  }

  public static fromAmino(_: any): MsgModuleQuerySafeV1 {
    throw new Error('Amino not supported');
  }

  public toAmino(): any {
    throw new Error('Amino not supported');
  }

  public static fromData(
    data: MsgModuleQuerySafeV1.Data,
    _isClassic?: boolean
  ): MsgModuleQuerySafeV1 {
    const { signer, requests } = data;
    return new MsgModuleQuerySafeV1(
      signer,
      requests.map((r) => QueryRequestV1.fromData(r)),
    );
  }

  public toData(_isClassic?: boolean): MsgModuleQuerySafeV1.Data {
    const { signer, requests } = this;
    return {
      '@type': '/ibc.applications.interchain_accounts.host.v1.MsgModuleQuerySafe',
      signer,
      requests: requests.map((r) => r.toData()),
    };
  }

  public static fromProto(
    proto: MsgModuleQuerySafeV1.Proto,
    _isClassic?: boolean
  ): MsgModuleQuerySafeV1 {
    return new MsgModuleQuerySafeV1(
      proto.signer,
      proto.requests.map((r) => QueryRequestV1.fromProto(r)),
    );
  }

  public toProto(_isClassic?: boolean): MsgModuleQuerySafeV1.Proto {
    const { signer, requests } = this;
    return MsgModuleQuerySafeV1_pb.fromPartial({
      signer,
      requests: requests.map((r) => r.toProto()),
    });
  }

  public packAny(_isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/ibc.applications.interchain_accounts.host.v1.MsgModuleQuerySafe',
      value: MsgModuleQuerySafeV1_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    _isClassic?: boolean
  ): MsgModuleQuerySafeV1 {
    return MsgModuleQuerySafeV1.fromProto(
      MsgModuleQuerySafeV1_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgModuleQuerySafeV1 {
  export interface Data {
    '@type': '/ibc.applications.interchain_accounts.host.v1.MsgModuleQuerySafe';
    signer: AccAddress;
    requests: QueryRequestV1.Data[];
  }

  export type Proto = MsgModuleQuerySafeV1_pb;
}
