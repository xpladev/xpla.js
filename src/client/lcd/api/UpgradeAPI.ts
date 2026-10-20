import { Int64, Int64Input, parseInt64 } from '../../../util/int64';
import { BaseAPI } from './BaseAPI';
import { Plan } from '../../../core';
import { APIParams, CosmosParams, PaginationOptions } from '../APIRequester';
import { LCDClient } from '../LCDClient';

export interface ModuleVersion {
  name: string;
  version: Int64;
}

export namespace ModuleVersion {
  export interface Data {
    name: string;
    version: string;
  }
}

export class UpgradeAPI extends BaseAPI {
  constructor(public lcd: LCDClient) {
    super(lcd.apiRequester);
  }

  /**
   * queries a previously applied upgrade plan by its name.
   * it returns the height of the plan. if there's no plan with given name, it returns 0.
   */
  public async appliedPlan(
    name: string,
    params: Partial<PaginationOptions & APIParams> = {}
  ): Promise<Int64> {
    return this.c
      .get<{ height: string }>(
        `/cosmos/upgrade/v1beta1/applied_plan/${name}`,
        params
      )
      .then(d => parseInt64(d.height));
  }

  /**
   * Look up the current plan
   */
  public async currentPlan(
    params: APIParams | CosmosParams = {}
  ): Promise<Plan | null> {
    if (this.lcd.config.isClassic) {
      throw new Error('Not supported for the network');
    }
    return this.c
      .get<{
        plan: Plan.Data | null;
      }>(`/cosmos/upgrade/v1beta1/current_plan`, params)
      .then(d => (d.plan ? Plan.fromData(d.plan) : null));
  }

  /**
   * Look up the versions of the modules
   */
  public async moduleVersions(
    params: APIParams | CosmosParams = {}
  ): Promise<ModuleVersion[]> {
    if (this.lcd.config.isClassic) {
      throw new Error('Not supported for the network');
    }
    return this.c
      .get<{
        module_versions: ModuleVersion.Data[];
      }>(`/cosmos/upgrade/v1beta1/module_versions`, params)
      .then(d =>
        d.module_versions.map(mv => {
          return { name: mv.name, version: parseInt64(mv.version) };
        })
      );
  }

  public async authority(params: APIParams | CosmosParams = {}): Promise<any> {
    return this.c.get('/cosmos/upgrade/v1beta1/authority', params);
  }

  public async upgradedConsensusState(
    height: Int64Input,
    params: APIParams | CosmosParams = {}
  ): Promise<any> {
    return this.c.get(
      `/cosmos/upgrade/v1beta1/upgraded_consensus_state/${height}`,
      params
    );
  }
}
