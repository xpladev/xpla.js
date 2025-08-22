import { JSONSerializable } from '../../../../../util/json';
import { HeightV1 } from '../../../core/client/v1/Height';
import { Duration } from '../../../../../core';
import { FractionV1 } from './Fraction';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { ProofSpec } from '@xpla/xpla.proto/cosmos/ics23/v1/proofs';
import { ClientState as ClientStateV1_pb } from '@xpla/xpla.proto/ibc/lightclients/tendermint/v1/tendermint';

/**
 * ClientState from Tendermint tracks the current validator set, latest height,
 * and a possible frozen height.
 */
export class ClientStateV1 extends JSONSerializable<any, ClientStateV1.Data, ClientStateV1.Proto> {
  /**
   * @param chain_id
   * @param trust_level
   * @param trusting_period
   * @param unbonding_period
   * @param max_clock_drift
   * @param frozen_height
   * @param latest_height
   * @param proof_specs
   * @param upgrade_path
   * @param allow_update_after_expiry
   * @param allow_update_after_misbehaviour
   */
  constructor(
    public chain_id: string,
    public trust_level: FractionV1 | undefined,
    public trusting_period: Duration | undefined,
    public unbonding_period: Duration | undefined,
    public max_clock_drift: Duration | undefined,
    public frozen_height: HeightV1 | undefined,
    public latest_height: HeightV1 | undefined,
    public proof_specs: ProofSpec[],
    public upgrade_path: string[],
    public allow_update_after_expiry: boolean,
    public allow_update_after_misbehaviour: boolean,
  ) {
    super();
  }

  public static fromAmino(_: any): ClientStateV1 {
    throw new Error('Amino not supported');
  }

  public toAmino(): any {
    throw new Error('Amino not supported');
  }

  public static fromData(data: ClientStateV1.Data): ClientStateV1 {
    const {
      chain_id,
      trust_level,
      trusting_period,
      unbonding_period,
      max_clock_drift,
      frozen_height,
      latest_height,
      proof_specs,
      upgrade_path,
      allow_update_after_expiry,
      allow_update_after_misbehaviour,
    } = data;
    return new ClientStateV1(
      chain_id,
      trust_level ? FractionV1.fromData(trust_level) : undefined,
      trusting_period ? Duration.fromData(trusting_period) : undefined,
      unbonding_period ? Duration.fromData(unbonding_period) : undefined,
      max_clock_drift ? Duration.fromData(max_clock_drift) : undefined,
      frozen_height ? HeightV1.fromData(frozen_height) : undefined,
      latest_height ? HeightV1.fromData(latest_height) : undefined,
      proof_specs.map(ProofSpec.fromJSON),
      upgrade_path,
      allow_update_after_expiry,
      allow_update_after_misbehaviour,
    );
  }

  public toData(): ClientStateV1.Data {
    const {
      chain_id,
      trust_level,
      trusting_period,
      unbonding_period,
      max_clock_drift,
      frozen_height,
      latest_height,
      proof_specs,
      upgrade_path,
      allow_update_after_expiry,
      allow_update_after_misbehaviour,
    } = this;
    return {
      '@type': '/ibc.lightclients.tendermint.v1.ClientState',
      chain_id,
      trust_level: trust_level?.toData(),
      trusting_period: trusting_period?.toData(),
      unbonding_period: unbonding_period?.toData(),
      max_clock_drift: max_clock_drift?.toData(),
      frozen_height: frozen_height?.toData(),
      latest_height: latest_height?.toData(),
      proof_specs: proof_specs.map(ProofSpec.toJSON),
      upgrade_path,
      allow_update_after_expiry,
      allow_update_after_misbehaviour,
    };
  }

  public static fromProto(proto: ClientStateV1.Proto): ClientStateV1 {
    const {
      chainId,
      trustLevel,
      trustingPeriod,
      unbondingPeriod,
      maxClockDrift,
      frozenHeight,
      latestHeight,
      proofSpecs,
      upgradePath,
      allowUpdateAfterExpiry,
      allowUpdateAfterMisbehaviour,
    } = proto;
    return new ClientStateV1(
      chainId,
      trustLevel ? FractionV1.fromProto(trustLevel) : undefined,
      trustingPeriod ? Duration.fromProto(trustingPeriod) : undefined,
      unbondingPeriod ? Duration.fromProto(unbondingPeriod) : undefined,
      maxClockDrift ? Duration.fromProto(maxClockDrift) : undefined,
      frozenHeight ? HeightV1.fromProto(frozenHeight) : undefined,
      latestHeight ? HeightV1.fromProto(latestHeight) : undefined,
      proofSpecs,
      upgradePath,
      allowUpdateAfterExpiry,
      allowUpdateAfterMisbehaviour,
    );
  }

  public toProto(): ClientStateV1.Proto {
    const {
      chain_id,
      trust_level,
      trusting_period,
      unbonding_period,
      max_clock_drift,
      frozen_height,
      latest_height,
      proof_specs,
      upgrade_path,
      allow_update_after_expiry,
      allow_update_after_misbehaviour,
    } = this;
    return ClientStateV1_pb.fromPartial({
      chainId: chain_id,
      trustLevel: trust_level?.toProto(),
      trustingPeriod: trusting_period?.toProto(),
      unbondingPeriod: unbonding_period?.toProto(),
      maxClockDrift: max_clock_drift?.toProto(),
      frozenHeight: frozen_height?.toProto(),
      latestHeight: latest_height?.toProto(),
      proofSpecs: proof_specs,
      upgradePath: upgrade_path,
      allowUpdateAfterExpiry: allow_update_after_expiry,
      allowUpdateAfterMisbehaviour: allow_update_after_misbehaviour,
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/ibc.lightclients.tendermint.v1.ClientState',
      value: ClientStateV1_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any): ClientStateV1 {
    return ClientStateV1.fromProto(ClientStateV1_pb.decode(msgAny.value));
  }
}

export namespace ClientStateV1 {
  export interface Data {
    '@type': '/ibc.lightclients.tendermint.v1.ClientState';
    chain_id: string;
    trust_level: FractionV1.Data | undefined;
    trusting_period: Duration.Data | undefined;
    unbonding_period: Duration.Data | undefined;
    max_clock_drift: Duration.Data | undefined;
    frozen_height: HeightV1.Data | undefined;
    latest_height: HeightV1.Data | undefined;
    proof_specs: any[];
    upgrade_path: string[];
    allow_update_after_expiry: boolean;
    allow_update_after_misbehaviour: boolean;
  }

  export type Proto = ClientStateV1_pb;
}
