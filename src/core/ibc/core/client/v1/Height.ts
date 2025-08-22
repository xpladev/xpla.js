import { JSONSerializable } from '../../../../../util/json';
import { Height as HeightV1_pb } from '@xpla/xpla.proto/ibc/core/client/v1/client';

/**
 * Height is a monotonically increasing data type
 * that can be compared against another Height for the purposes of updating and
 * freezing clients
 *
 * Normally the RevisionHeight is incremented at each height while keeping
 * RevisionNumber the same. However some consensus algorithms may choose to
 * reset the height in certain conditions e.g. hard forks, state-machine
 * breaking changes In these cases, the RevisionNumber is incremented so that
 * height continues to be monitonically increasing even as the RevisionHeight
 * gets reset
 */
export class HeightV1 extends JSONSerializable<
  HeightV1.Amino,
  HeightV1.Data,
  HeightV1.Proto
> {
  /**
   * @param revision_number the revision that the client is currently on
   * @param revision_height the height within the given revision
   */
  constructor(
    public revision_number: number,
    public revision_height: number,
  ) {
    super();
  }

  public static fromAmino(data: HeightV1.Amino): HeightV1 {
    const { revision_number, revision_height } = data;
    return new HeightV1(
      parseInt(revision_number ?? '0'),
      parseInt(revision_height ?? '0')
    );
  }

  public toAmino(): HeightV1.Amino {
    const { revision_number, revision_height } = this;
    const res: HeightV1.Amino = {
      revision_number:
        revision_number > 0 ? revision_number.toFixed() : undefined,
      revision_height:
        revision_height > 0 ? revision_height.toFixed() : undefined,
    };
    return res;
  }

  public static fromData(data: HeightV1.Data): HeightV1 {
    const { revision_number, revision_height } = data;
    return new HeightV1(
      Number.parseInt(revision_number),
      Number.parseInt(revision_height)
    );
  }

  public toData(): HeightV1.Data {
    const { revision_number, revision_height } = this;
    const res: HeightV1.Data = {
      revision_number: revision_number.toFixed(),
      revision_height: revision_height.toFixed(),
    };
    return res;
  }

  public static fromProto(proto: HeightV1.Proto): HeightV1 {
    return new HeightV1(
      proto.revisionNumber.toNumber(),
      proto.revisionHeight.toNumber()
    );
  }

  public toProto(): HeightV1.Proto {
    const { revision_number, revision_height } = this;
    return HeightV1_pb.fromPartial({
      revisionNumber: revision_number,
      revisionHeight: revision_height,
    });
  }
}

export namespace HeightV1 {
  export interface Amino {
    revision_number?: string;
    revision_height?: string;
  }

  export interface Data {
    revision_number: string;
    revision_height: string;
  }

  export type Proto = HeightV1_pb;
}
