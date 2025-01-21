/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgAuthorizeCircuitBreaker as MsgAuthorizeCircuitBreakerV1_pb } from '@xpla/xpla.proto/cosmos/circuit/v1/tx';
import { PermissionsV1 } from '../Permissions';

export class MsgAuthorizeCircuitBreakerV1 extends JSONSerializable<
  MsgAuthorizeCircuitBreakerV1.Amino,
  MsgAuthorizeCircuitBreakerV1.Data,
  MsgAuthorizeCircuitBreakerV1.Proto
> {
  /**
   * @param granter is the granter of the circuit breaker permissions and must have LEVEL_SUPER_ADMIN
   * @param grantee is the account authorized with the provided permissions
   * @param permissions are the circuit breaker permissions that the grantee receives
   */
  constructor(
    public granter: AccAddress,
    public grantee: AccAddress,
    public permissions: PermissionsV1 | undefined,
  ) {
    super();
  }

  public static fromAmino(
    data: MsgAuthorizeCircuitBreakerV1.Amino,
    _isClassic?: boolean
  ): MsgAuthorizeCircuitBreakerV1 {
    const {
      value: { granter, grantee, permissions },
    } = data;
    return new MsgAuthorizeCircuitBreakerV1(
      granter,
      grantee,
      permissions ? PermissionsV1.fromAmino(permissions) : undefined,
    );
  }

  public toAmino(isClassic?: boolean): MsgAuthorizeCircuitBreakerV1.Amino {
    const { granter, grantee, permissions } = this;
    return {
      type: isClassic
        ? 'circuit/MsgAuthorizeCircuitBreaker'
        : 'cosmos-sdk/x/circuit/MsgAuthorizeCircuitBreaker',
      value: {
        granter,
        grantee,
        permissions: permissions ? permissions.toAmino() : undefined,
      },
    };
  }

  public static fromData(
    data: MsgAuthorizeCircuitBreakerV1.Data,
    _isClassic?: boolean
  ): MsgAuthorizeCircuitBreakerV1 {
    const { granter, grantee, permissions } = data;
    return new MsgAuthorizeCircuitBreakerV1(
      granter,
      grantee,
      permissions ? PermissionsV1.fromData(permissions) : undefined,
    );
  }

  public toData(_isClassic?: boolean): MsgAuthorizeCircuitBreakerV1.Data {
    const { granter, grantee, permissions } = this;
    return {
      '@type': '/cosmos.circuit.v1.MsgAuthorizeCircuitBreaker',
      granter,
      grantee,
      permissions: permissions ? permissions.toData() : undefined,
    };
  }

  public static fromProto(
    proto: MsgAuthorizeCircuitBreakerV1.Proto,
    _isClassic?: boolean
  ): MsgAuthorizeCircuitBreakerV1 {
    return new MsgAuthorizeCircuitBreakerV1(
      proto.granter,
      proto.grantee,
      proto.permissions ? PermissionsV1.fromProto(proto.permissions) : undefined,
    );
  }

  public toProto(_isClassic?: boolean): MsgAuthorizeCircuitBreakerV1.Proto {
    const { granter, grantee, permissions } = this;
    return MsgAuthorizeCircuitBreakerV1_pb.fromPartial({
      granter,
      grantee,
      permissions: permissions ? permissions.toProto() : undefined,
    });
  }

  public packAny(_isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.circuit.v1.MsgAuthorizeCircuitBreaker',
      value: MsgAuthorizeCircuitBreakerV1_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    _isClassic?: boolean
  ): MsgAuthorizeCircuitBreakerV1 {
    return MsgAuthorizeCircuitBreakerV1.fromProto(
      MsgAuthorizeCircuitBreakerV1_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgAuthorizeCircuitBreakerV1 {
  export interface Amino {
    type:
      | 'circuit/MsgAuthorizeCircuitBreaker'
      | 'cosmos-sdk/x/circuit/MsgAuthorizeCircuitBreaker';
    value: {
      granter: AccAddress;
      grantee: AccAddress;
      permissions: PermissionsV1.Amino | undefined;
    };
  }

  export interface Data {
    '@type': '/cosmos.circuit.v1.MsgAuthorizeCircuitBreaker';
    granter: AccAddress;
    grantee: AccAddress;
    permissions: PermissionsV1.Data | undefined;
  }

  export type Proto = MsgAuthorizeCircuitBreakerV1_pb;
}
