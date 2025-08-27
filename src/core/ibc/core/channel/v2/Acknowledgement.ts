import { JSONSerializable } from '../../../../../util/json';
import { Convert } from '../../../../../util/convert';
import { Acknowledgement as AcknowledgementV2_pb } from '@xpla/xpla.proto/ibc/core/channel/v2/packet';

/**
 * Acknowledgement contains a list of all ack results associated with a single packet.
 */
export class AcknowledgementV2 extends JSONSerializable<
  AcknowledgementV2.Amino,
  AcknowledgementV2.Data,
  AcknowledgementV2.Proto
> {
  /**
   * @param app_acknowledgements base64 encoded,
   */
  constructor(
    public app_acknowledgements: string[],
  ) {
    super();
  }

  public static fromAmino(_data: AcknowledgementV2.Amino): AcknowledgementV2 {
    const {
      app_acknowledgements,
    } = _data;
    return new AcknowledgementV2(
      app_acknowledgements,
    );
  }

  public toAmino(): AcknowledgementV2.Amino {
    const {
      app_acknowledgements,
    } = this;
    const res: AcknowledgementV2.Amino = {
      app_acknowledgements,
    };
    return res;
  }

  public static fromData(_data: AcknowledgementV2.Data): AcknowledgementV2 {
    const {
      app_acknowledgements,
    } = _data;
    return new AcknowledgementV2(
      app_acknowledgements,
    );
  }

  public toData(): AcknowledgementV2.Data {
    const {
      app_acknowledgements,
    } = this;
    const res: AcknowledgementV2.Data = {
      app_acknowledgements,
    };
    return res;
  }

  public static fromProto(proto: AcknowledgementV2.Proto): AcknowledgementV2 {
    return new AcknowledgementV2(
      proto.appAcknowledgements.map(Convert.toBase64),
    );
  }

  public toProto(): AcknowledgementV2.Proto {
    const {
      app_acknowledgements,
    } = this;
    return AcknowledgementV2_pb.fromPartial({
      appAcknowledgements: app_acknowledgements.map(Convert.fromBase64),
    });
  }
}

export namespace AcknowledgementV2 {
  export interface Amino {
    app_acknowledgements: string[];
  }

  export interface Data {
    app_acknowledgements: string[];
  }

  export type Proto = AcknowledgementV2_pb;
}
