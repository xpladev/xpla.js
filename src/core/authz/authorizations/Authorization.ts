import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { GenericAuthorization } from './GenericAuthorization';
import { SendAuthorization } from './SendAuthorization';
import { StakeAuthorization } from './StakeAuthorization';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { GrantAuthorization as Grant_pb } from '@xpla/xpla.proto/cosmos/authz/v1beta1/authz';

export class AuthorizationGrant extends JSONSerializable<
  AuthorizationGrant.Amino,
  AuthorizationGrant.Data,
  AuthorizationGrant.Proto
> {
  constructor(
    public authorization: Authorization,
    public expiration: Date,
    public granter: AccAddress | undefined,
    public grantee: AccAddress | undefined
  ) {
    super();
  }

  public static fromAmino(
    data: AuthorizationGrant.Amino,
    isClassic?: boolean
  ): AuthorizationGrant {
    const { authorization, expiration, granter, grantee } = data;
    return new AuthorizationGrant(
      Authorization.fromAmino(authorization, isClassic),
      new Date(expiration),
      granter,
      grantee
    );
  }

  public toAmino(isClassic?: boolean): AuthorizationGrant.Amino {
    const { authorization, expiration, granter, grantee } = this;
    return {
      authorization: authorization.toAmino(isClassic),
      expiration: expiration.toISOString().replace(/\.000Z$/, 'Z'),
      granter,
      grantee,
    };
  }

  public static fromData(
    data: AuthorizationGrant.Data,
    isClassic?: boolean
  ): AuthorizationGrant {
    const { authorization, expiration, granter, grantee } = data;
    return new AuthorizationGrant(
      Authorization.fromData(authorization, isClassic),
      new Date(expiration),
      granter,
      grantee
    );
  }

  public toData(isClassic?: boolean): AuthorizationGrant.Data {
    const { authorization, expiration, granter, grantee } = this;
    return {
      authorization: authorization.toData(isClassic),
      expiration: expiration.toISOString().replace(/\.000Z$/, 'Z'),
      granter,
      grantee,
    };
  }

  public static fromProto(
    proto: AuthorizationGrant.Proto,
    isClassic?: boolean
  ): AuthorizationGrant {
    return new AuthorizationGrant(
      Authorization.fromProto(proto.authorization as Any, isClassic),
      proto.expiration as Date,
      proto.granter,
      proto.grantee
    );
  }

  public toProto(isClassic?: boolean): AuthorizationGrant.Proto {
    const { authorization, expiration, granter, grantee } = this;
    return Grant_pb.fromPartial({
      authorization: authorization.packAny(isClassic),
      expiration,
      granter,
      grantee,
    });
  }
}

export namespace AuthorizationGrant {
  export interface Amino {
    authorization: Authorization.Amino;
    expiration: string;
    granter: string | undefined;
    grantee: string | undefined;
  }

  export interface Data {
    authorization: Authorization.Data;
    expiration: string;
    granter: string | undefined;
    grantee: string | undefined;
  }

  export type Proto = Grant_pb;
}

export type Authorization =
  | SendAuthorization
  | GenericAuthorization
  | StakeAuthorization;

export namespace Authorization {
  export type Amino = SendAuthorization.Amino | GenericAuthorization.Amino;
  export type Data =
    | SendAuthorization.Data
    | GenericAuthorization.Data
    | StakeAuthorization.Data;
  export type Proto = Any;
  export function fromAmino(
    data: Authorization.Amino,
    isClassic?: boolean
  ): Authorization {
    switch (data.type) {
      case 'msgauth/SendAuthorization':
      case 'cosmos-sdk/SendAuthorization':
        return SendAuthorization.fromAmino(data, isClassic);
      case 'msgauth/GenericAuthorization':
      case 'cosmos-sdk/GenericAuthorization':
        return GenericAuthorization.fromAmino(data, isClassic);
    }
  }

  export function fromData(
    data: Authorization.Data,
    isClassic?: boolean
  ): Authorization {
    switch (data['@type']) {
      case '/cosmos.authz.v1beta1.GenericAuthorization':
        return GenericAuthorization.fromData(data, isClassic);
      case '/cosmos.bank.v1beta1.SendAuthorization':
        return SendAuthorization.fromData(data, isClassic);
      case '/cosmos.staking.v1beta1.StakeAuthorization':
        return StakeAuthorization.fromData(data, isClassic);
    }
  }

  export function fromProto(
    proto: Authorization.Proto,
    isClassic?: boolean
  ): Authorization {
    const typeUrl = proto.typeUrl;
    switch (typeUrl) {
      case '/cosmos.authz.v1beta1.GenericAuthorization':
        return GenericAuthorization.unpackAny(proto, isClassic);

      case '/cosmos.bank.v1beta1.SendAuthorization':
        return SendAuthorization.unpackAny(proto, isClassic);
      case '/cosmos.staking.v1beta1.StakeAuthorization':
        return StakeAuthorization.unpackAny(proto, isClassic);
    }

    throw new Error(`Authorization type ${typeUrl} not recognized`);
  }
}
