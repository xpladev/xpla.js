import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { convertAccessTypeFromJSON } from '../util';
import {
  AccessType,
  accessTypeToJSON,
  AccessConfig as AccessConfig_pb,
} from '@xpla/xpla.proto/cosmwasm/wasm/v1/types';

export { AccessType };

/**
 *
 */
export class AccessConfig extends JSONSerializable<
  AccessConfig.Amino,
  AccessConfig.Data,
  AccessConfig.Proto
> {
  /**
   * @param permission access type
   * @param addresses
   */
  constructor(public permission: AccessType, public addresses: AccAddress[]) {
    super();
  }

  public static fromAmino(data: AccessConfig.Amino): AccessConfig {
    return new AccessConfig(
      convertAccessTypeFromJSON(data.permission),
      data.addresses
    );
  }

  public toAmino(): AccessConfig.Amino {
    const res: AccessConfig.Amino = {
      permission: accessTypeToJSON(this.permission),
      addresses: this.addresses,
    };
    return res;
  }

  public static fromData(data: AccessConfig.Data): AccessConfig {
    // FIXME: new core returns human-friendly string like 'Everybody'.
    // but convertAccessTypeFromJSON requires "ACCESS_TYPE_EVERYBODY"
    // TODO: find out why the strings arent't matching
    return new AccessConfig(
      convertAccessTypeFromJSON(data.permission),
      data.addresses
    );
  }

  public toData(): AccessConfig.Data {
    const res: AccessConfig.Data = {
      permission: accessTypeToJSON(this.permission),
      addresses: this.addresses,
    };
    return res;
  }

  public static fromProto(proto: AccessConfig.Proto): AccessConfig {
    return new AccessConfig(proto.permission, proto.addresses);
  }

  public toProto(): AccessConfig.Proto {
    return AccessConfig_pb.fromPartial({
      permission: this.permission,
      addresses: this.addresses,
    });
  }
}

export namespace AccessConfig {
  export interface Amino {
    permission: string;
    addresses: string[];
  }

  export interface Data {
    permission: string;
    addresses: string[];
  }

  export type Proto = AccessConfig_pb;
}
