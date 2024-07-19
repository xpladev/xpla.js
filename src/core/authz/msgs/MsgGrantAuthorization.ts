import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Authorization } from '../authorizations';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { Grant as Grant_pb } from '@xpla/xpla.proto/cosmos/authz/v1beta1/authz';
import { MsgGrant as MsgGrant_pb } from '@xpla/xpla.proto/cosmos/authz/v1beta1/tx';

export class AuthzGrant extends JSONSerializable<
  AuthzGrant.Amino,
  AuthzGrant.Data,
  AuthzGrant.Proto
> {
  constructor(public authorization: Authorization, public expiration: Date) {
    super();
  }

  public static fromAmino(
    data: AuthzGrant.Amino,
    isClassic?: boolean
  ): AuthzGrant {
    const { authorization, expiration } = data;
    return new AuthzGrant(
      Authorization.fromAmino(authorization, isClassic),
      new Date(expiration)
    );
  }

  public toAmino(isClassic?: boolean): AuthzGrant.Amino {
    const { authorization, expiration } = this;
    return {
      authorization: authorization.toAmino(isClassic),
      expiration: expiration.toISOString().replace(/\.000Z$/, 'Z'),
    };
  }

  public static fromData(
    data: AuthzGrant.Data,
    isClassic?: boolean
  ): AuthzGrant {
    const { authorization, expiration } = data;
    return new AuthzGrant(
      Authorization.fromData(authorization, isClassic),
      new Date(expiration)
    );
  }

  public toData(isClassic?: boolean): AuthzGrant.Data {
    const { authorization, expiration } = this;
    return {
      authorization: authorization.toData(isClassic),
      expiration: expiration.toISOString().replace(/\.000Z$/, 'Z'),
    };
  }

  public static fromProto(
    proto: AuthzGrant.Proto,
    isClassic?: boolean
  ): AuthzGrant {
    return new AuthzGrant(
      Authorization.fromProto(proto.authorization as Any, isClassic),
      proto.expiration as Date
    );
  }

  public toProto(isClassic?: boolean): AuthzGrant.Proto {
    const { authorization, expiration } = this;
    return Grant_pb.fromPartial({
      authorization: authorization.packAny(isClassic),
      expiration,
    });
  }
}

export namespace AuthzGrant {
  export interface Amino {
    authorization: Authorization.Amino;
    expiration: string;
  }

  export interface Data {
    authorization: Authorization.Data;
    expiration: string;
  }

  export type Proto = Grant_pb;
}

export class MsgGrantAuthorization extends JSONSerializable<
  MsgGrantAuthorization.Amino,
  MsgGrantAuthorization.Data,
  MsgGrantAuthorization.Proto
> {
  /**
   * @param depositor depositor's account address
   * @param amount coins to fund the community pool
   */
  constructor(
    public granter: AccAddress,
    public grantee: AccAddress,
    public grant: AuthzGrant
  ) {
    super();
  }

  public static fromAmino(
    data: MsgGrantAuthorization.Amino,
    isClassic?: boolean
  ): MsgGrantAuthorization {
    const {
      value: { granter, grantee, grant },
    } = data;
    return new MsgGrantAuthorization(
      granter,
      grantee,
      AuthzGrant.fromAmino(grant, isClassic)
    );
  }

  public toAmino(isClassic?: boolean): MsgGrantAuthorization.Amino {
    const { granter, grantee, grant } = this;
    return {
      type: isClassic ? 'msgauth/MsgGrantAuthorization' : 'cosmos-sdk/MsgGrant',
      value: {
        granter,
        grantee,
        grant: grant.toAmino(isClassic),
      },
    };
  }

  public static fromData(
    data: MsgGrantAuthorization.Data,
    isClassic?: boolean
  ): MsgGrantAuthorization {
    const { granter, grantee, grant } = data;
    return new MsgGrantAuthorization(
      granter,
      grantee,
      AuthzGrant.fromData(grant, isClassic)
    );
  }

  public toData(isClassic?: boolean): MsgGrantAuthorization.Data {
    const { granter, grantee, grant } = this;
    return {
      '@type': '/cosmos.authz.v1beta1.MsgGrant',
      granter,
      grantee,
      grant: grant.toData(isClassic),
    };
  }

  public static fromProto(
    data: MsgGrantAuthorization.Proto,
    isClassic?: boolean
  ): MsgGrantAuthorization {
    return new MsgGrantAuthorization(
      data.granter,
      data.grantee,
      AuthzGrant.fromProto(data.grant as Grant_pb, isClassic)
    );
  }

  public toProto(isClassic?: boolean): MsgGrantAuthorization.Proto {
    const { grant, granter, grantee } = this;
    return MsgGrant_pb.fromPartial({
      grant: grant.toProto(isClassic),
      grantee,
      granter,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.authz.v1beta1.MsgGrant',
      value: MsgGrant_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgGrantAuthorization {
    return MsgGrantAuthorization.fromProto(
      MsgGrant_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgGrantAuthorization {
  export interface Amino {
    type: 'msgauth/MsgGrantAuthorization' | 'cosmos-sdk/MsgGrant';
    value: {
      granter: AccAddress;
      grantee: AccAddress;
      grant: AuthzGrant.Amino;
    };
  }

  export interface Data {
    '@type': '/cosmos.authz.v1beta1.MsgGrant';
    granter: AccAddress;
    grantee: AccAddress;
    grant: AuthzGrant.Data;
  }

  export type Proto = MsgGrant_pb;
}
