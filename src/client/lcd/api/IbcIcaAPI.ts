import { BaseAPI } from './BaseAPI';
import { APIParams } from '../APIRequester';
import { LCDClient } from '../LCDClient';
import { IcaControllerParamsV1 as ControllerParams } from '../../../core/ibc/applications/interchain-account/controller/v1/Params';
import { IcaHostParamsV1 as HostParams } from '../../../core/ibc/applications/interchain-account/host/v1/Params';

export class IbcIcaAPI extends BaseAPI {
  constructor(public lcd: LCDClient) {
    super(lcd.apiRequester);
  }

  public async icaAddress(
    owner: string,
    connection_id: string,
    params: APIParams = {}
  ): Promise<string> {
    return this.c
      .get<{
        address: string;
      }>(`/ibc/apps/interchain_accounts/controller/v1/owners/${owner}/connections/${connection_id}`, params)
      .then(d => d.address);
  }

  public async controllerParameters(
    params: APIParams = {}
  ): Promise<ControllerParams> {
    return this.c
      .get<{ params: ControllerParams.Data }>(
        '/ibc/apps/interchain_accounts/controller/v1/params',
        params
      )
      .then(({ params: d }) => ControllerParams.fromData(d));
  }

  public async hostParameters(
    params: APIParams = {}
  ): Promise<HostParams> {
    return this.c
      .get<{ params: HostParams.Data }>(
        '/ibc/apps/interchain_accounts/host/v1/params',
        params
      )
      .then(({ params: d }) => HostParams.fromData(d));
  }
}
