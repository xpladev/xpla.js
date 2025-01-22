import { JSONSerializable } from '../../../../../util/json';
import { Params as IbcTransferParamsV1_pb } from '@xpla/xpla.proto/ibc/applications/transfer/v1/transfer';

/**
 *  Params defines the set of on-chain interchain accounts parameters.
 *  The following parameters may be used to disable the host submodule.
 */
export class IbcTransferParamsV1 extends JSONSerializable<
  any,
  IbcTransferParamsV1.Data,
  IbcTransferParamsV1.Proto
> {
  /**
   * @param host_enabled host_enabled enables or disables the host submodule.
   */
  constructor(
    public send_enabled: boolean,
    public receive_enabled: boolean,
  ) {
    super();
  }

  public static fromAmino(_: any): IbcTransferParamsV1 {
    throw new Error('Amino not supported');
  }

  public toAmino(): any {
    throw new Error('Amino not supported');
  }

  public static fromData(data: IbcTransferParamsV1.Data): IbcTransferParamsV1 {
    const { send_enabled, receive_enabled } = data;
    return new IbcTransferParamsV1(
      send_enabled,
      receive_enabled,
    );
  }

  public toData(): IbcTransferParamsV1.Data {
    const { send_enabled, receive_enabled } = this;
    const res: IbcTransferParamsV1.Data = {
      send_enabled,
      receive_enabled,      
    };
    return res;
  }

  public static fromProto(proto: IbcTransferParamsV1.Proto): IbcTransferParamsV1 {
    return new IbcTransferParamsV1(
      proto.sendEnabled,
      proto.receiveEnabled,
    );
  }

  public toProto(): IbcTransferParamsV1.Proto {
    const { send_enabled, receive_enabled } = this;
    return IbcTransferParamsV1_pb.fromPartial({
      sendEnabled: send_enabled,
      receiveEnabled: receive_enabled,
    });
  }
}

export namespace IbcTransferParamsV1 {
  export interface Data {
    send_enabled: boolean;
    receive_enabled: boolean;
  }

  export type Proto = IbcTransferParamsV1_pb;
}
