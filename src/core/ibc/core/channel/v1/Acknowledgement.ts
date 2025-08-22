import { JSONSerializable } from '../../../../../util/json';
import { Convert } from '../../../../../util/convert';
import { HeightV1 } from '../../client/v1/Height';
import { Acknowledgement as AcknowledgementV1_pb } from '@xpla/xpla.proto/ibc/core/channel/v1/channel';

/**
 * Acknowledgement is the recommended acknowledgement format to be used by
 * app-specific protocols.
 */
export class AcknowledgementV1 extends JSONSerializable<
  AcknowledgementV1.Amino,
  AcknowledgementV1.Data,
  AcknowledgementV1.Proto
> {
  /**
   * @param result base64 encoded
   * @param error
   */
  constructor(
    public result: string | undefined,
    public error: string | undefined,
  ) {
    super();
  }

  public static fromAmino(_data: AcknowledgementV1.Amino): AcknowledgementV1 {
    const {
      result,
      error,
    } = _data;
    return new AcknowledgementV1(
      result,
      error,
    );
  }

  public toAmino(): AcknowledgementV1.Amino {
    const {
      result,
      error,
    } = this;
    const res: AcknowledgementV1.Amino = {
      result,
      error,
    };
    return res;
  }

  public static fromData(_data: AcknowledgementV1.Data): AcknowledgementV1 {
    const {
      result,
      error,
    } = _data;
    return new AcknowledgementV1(
      result,
      error,
    );
  }

  public toData(): AcknowledgementV1.Data {
    const {
      result,
      error,
    } = this;
    const res: AcknowledgementV1.Data = {
      result,
      error,
    };
    return res;
  }

  public static fromProto(proto: AcknowledgementV1.Proto): AcknowledgementV1 {
    return new AcknowledgementV1(
      proto.result ? Convert.toBase64(proto.result) : undefined,
      proto.error,
    );
  }

  public toProto(): AcknowledgementV1.Proto {
    const {
      result,
      error,
    } = this;
    return AcknowledgementV1_pb.fromPartial({
      result: result ? Convert.fromBase64(result) : undefined,
      error,
    });
  }
}

export namespace AcknowledgementV1 {
  export interface Amino {
    result: string | undefined;
    error: string | undefined;
  }

  export interface Data {
    result: string | undefined;
    error: string | undefined;
  }

  export type Proto = AcknowledgementV1_pb;
}
