import { Int64, Int64Input, parseInt64 } from '../../util/int64';
import { JSONSerializable } from '../../util/json';
import { Consensus as Consensus_pb } from '@xpla/xpla.proto/tendermint/version/types';
import { App as App_pb } from '@xpla/xpla.proto/tendermint/version/types';

/**
 * Consensus captures the consensus rules for processing a block in the blockchain,
 * including all blockchain data structures and the rules of the application's
 * state transition machine.
 */
export class Consensus extends JSONSerializable<
  any,
  Consensus.Data,
  Consensus.Proto
> {
  public block: Int64;
  public app: Int64;
  /**
   * @param block
   * @param app
   */

  constructor(block: Int64Input, app: Int64Input) {
    super();
    this.block = parseInt64(block);
    this.app = parseInt64(app);
  }

  public static fromAmino(_: any): Consensus {
    throw new Error('Amino not supported');
  }

  public toAmino(): any {
    throw new Error('Amino not supported');
  }

  public static fromData(data: Consensus.Data): Consensus {
    const { block, app } = data;
    return new Consensus(block, app);
  }

  public toData(): Consensus.Data {
    const { block, app } = this;
    const res: Consensus.Data = {
      block: block.toFixed(),
      app: app.toFixed(),
    };
    return res;
  }

  public static fromProto(proto: Consensus.Proto): Consensus {
    return new Consensus(proto.block, proto.app);
  }

  public toProto(): Consensus.Proto {
    const { block, app } = this;
    return Consensus_pb.fromPartial({
      block: block.toString(),
      app: app.toString(),
    });
  }
}

export namespace Consensus {
  export interface Data {
    block: string;
    app: string;
  }

  export type Proto = Consensus_pb;
}

/**
 * App captures the consensus rules for processing a block in the blockchain,
 * including all blockchain data structures and the rules of the application's
 * state transition machine.
 */
export class App extends JSONSerializable<any, App.Data, App.Proto> {
  public protocol: Int64;
  /**
   * @param protocol
   * @param software
   */

  constructor(
    protocol: Int64Input,
    public software: string
  ) {
    super();
    this.protocol = parseInt64(protocol);
  }

  public static fromAmino(_: any): App {
    throw new Error('Amino not supported');
  }

  public toAmino(): any {
    throw new Error('Amino not supported');
  }

  public static fromData(data: App.Data): App {
    const { protocol, software } = data;
    return new App(protocol, software);
  }

  public toData(): App.Data {
    const { protocol, software } = this;
    const res: App.Data = {
      protocol: protocol.toFixed(),
      software: software,
    };
    return res;
  }

  public static fromProto(proto: App.Proto): App {
    return new App(proto.protocol, proto.software);
  }

  public toProto(): App.Proto {
    const { protocol, software } = this;
    return App_pb.fromPartial({
      protocol: protocol.toString(),
      software: software,
    });
  }
}

export namespace App {
  export interface Data {
    protocol: string;
    software: string;
  }

  export type Proto = App_pb;
}
