/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../util/json';
import { Coins } from '../../Coins';
import { AccAddress } from '../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgMultiSend as MsgMultiSend_pb } from '@xpla/xpla.proto/cosmos/bank/v1beta1/tx';
import {
  Input as Input_pb,
  Output as Output_pb,
} from '@xpla/xpla.proto/cosmos/bank/v1beta1/bank';

/**
 * If you have multiple senders and/or multiple recipients, you can use MsgMultiSend,
 * which can batch together the senders and recipients in one message to save on gas
 * fees.
 *
 * Specify the senders and recipients and their corresponding deposit contribution /
 * receiving amounts with [[MsgMultiSend.Input]] or [[MsgMultiSend.Output]].
 *
 * Example:
 *
 * ```ts
 * import { MsgMultiSend } from "@xpla/xpla.js";
 *
 * const inputs: MsgMultiSend.Input[] = [
 *    new MsgMultiSend.Input(
 *      'xpla105rz2q5a4w7nv7239tl9c4px5cjy7axx3axf6p',
 *      {
 *        ukrw: 123123,
 *      })
 *    ),
 *    new MsgMultiSend.Input('xpla105rz2q5a4w7nv7239tl9c4px5cjy7axx3axfad', [
 *      new Coin('uluna', 123123),
 *    ]),
 *  ];
 *   const outputs: MsgMultiSend.Output[] = [
 *    new MsgMultiSend.Output(
 *      'xpla105rz2q5a4w7nv7239tl9c4px5cjy7axx3axfad',
 *        {
 *          ukrw: 123123,
 *        }
 *    ),
 *    new MsgMultiSend.Output('xpla105rz2q5a4w7nv7239tl9c4px5cjy7axx3axfga',
 *      {
 *        uluna: 123123,
 *      }
 *    ),
 *  ];
 *  const multisend = new MsgMultiSend(inputs, outputs);
 * ```
 */
export class MsgMultiSend extends JSONSerializable<
  MsgMultiSend.Amino,
  MsgMultiSend.Data,
  MsgMultiSend.Proto
> {
  /**
   * @param inputs inputs
   * @param outputs outputs
   */
  constructor(
    public inputs: MsgMultiSend.Input[],
    public outputs: MsgMultiSend.Output[]
  ) {
    super();
  }

  public static fromAmino(
    data: MsgMultiSend.Amino,
    _isClassic?: boolean
  ): MsgMultiSend {
    const {
      value: { inputs, outputs },
    } = data;
    return new MsgMultiSend(
      inputs.map(i => MsgMultiSend.Input.fromAmino(i)),
      outputs.map(o => MsgMultiSend.Output.fromAmino(o))
    );
  }

  public toAmino(isClassic?: boolean): MsgMultiSend.Amino {
    const { inputs, outputs } = this;
    return {
      type: isClassic ? 'bank/MsgMultiSend' : 'cosmos-sdk/MsgMultiSend',
      value: {
        inputs: inputs.map(i => i.toAmino()),
        outputs: outputs.map(o => o.toAmino()),
      },
    };
  }

  public static fromData(
    data: MsgMultiSend.Data,
    _isClassic?: boolean
  ): MsgMultiSend {
    const { inputs, outputs } = data;
    return new MsgMultiSend(
      inputs.map(i => MsgMultiSend.Input.fromData(i)),
      outputs.map(o => MsgMultiSend.Output.fromData(o))
    );
  }

  public toData(_isClassic?: boolean): MsgMultiSend.Data {
    const { inputs, outputs } = this;
    return {
      '@type': '/cosmos.bank.v1beta1.MsgMultiSend',
      inputs: inputs.map(i => i.toData()),
      outputs: outputs.map(o => o.toData()),
    };
  }

  public static fromProto(
    proto: MsgMultiSend.Proto,
    _isClassic?: boolean
  ): MsgMultiSend {
    return new MsgMultiSend(
      proto.inputs.map(i => MsgMultiSend.Input.fromProto(i)),
      proto.outputs.map(o => MsgMultiSend.Output.fromProto(o))
    );
  }

  public toProto(_isClassic?: boolean): MsgMultiSend.Proto {
    const { inputs, outputs } = this;
    return MsgMultiSend_pb.fromPartial({
      inputs: inputs.map(i => i.toProto()),
      outputs: outputs.map(i => i.toProto()),
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.bank.v1beta1.MsgMultiSend',
      value: MsgMultiSend_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(msgAny: Any, isClassic?: boolean): MsgMultiSend {
    return MsgMultiSend.fromProto(
      MsgMultiSend_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgMultiSend {
  export interface Amino {
    readonly type: 'bank/MsgMultiSend' | 'cosmos-sdk/MsgMultiSend';
    value: {
      inputs: Input.Amino[];
      outputs: Output.Amino[];
    };
  }

  export interface Data {
    '@type': '/cosmos.bank.v1beta1.MsgMultiSend';
    inputs: Input.Data[];
    outputs: Output.Data[];
  }

  export type Proto = MsgMultiSend_pb;

  export class Input extends JSONSerializable<
    Input.Amino,
    Input.Data,
    Input.Proto
  > {
    /**
     * Value of the transaction
     */
    public coins: Coins;

    /**
     * @param address address
     * @param coinsInput coins-compatible input
     */
    constructor(public address: AccAddress, coinsInput: Coins.Input) {
      super();
      this.coins = new Coins(coinsInput);
    }

    public toAmino(_isClassic?: boolean): Input.Amino {
      const { address, coins } = this;
      return {
        address,
        coins: coins.toAmino(),
      };
    }

    public static fromAmino(data: Input.Amino, _isClassic?: boolean): Input {
      const { address, coins } = data;
      return new Input(address, Coins.fromAmino(coins));
    }

    public toData(_isClassic?: boolean): Input.Data {
      const { address, coins } = this;
      return {
        address,
        coins: coins.toData(),
      };
    }

    public static fromData(data: Input.Data, _isClassic?: boolean): Input {
      const { address, coins } = data;
      return new Input(address, Coins.fromData(coins));
    }

    public toProto(_isClassic?: boolean): Input.Proto {
      const { address, coins } = this;
      return Input_pb.fromPartial({
        address,
        coins: coins.toProto(),
      });
    }

    public static fromProto(proto: Input.Proto, _isClassic?: boolean): Input {
      return new Input(proto.address, Coins.fromProto(proto.coins));
    }
  }

  export class Output extends JSONSerializable<
    Output.Amino,
    Output.Data,
    Output.Proto
  > {
    /**
     * Value of the transaction
     */
    public coins: Coins;

    /**
     * @param address address
     * @param coinsOutput coins-compatible input
     */
    constructor(public address: AccAddress, coinsInput: Coins.Input) {
      super();
      this.coins = new Coins(coinsInput);
    }

    public toAmino(_isClassic?: boolean): Output.Amino {
      const { address, coins } = this;
      return {
        address,
        coins: coins.toAmino(),
      };
    }

    public static fromAmino(data: Output.Amino, _isClassic?: boolean): Output {
      const { address, coins } = data;
      return new Output(address, Coins.fromAmino(coins));
    }

    public toData(_isClassic?: boolean): Output.Data {
      const { address, coins } = this;
      return {
        address,
        coins: coins.toData(),
      };
    }

    public static fromData(data: Output.Data, _isClassic?: boolean): Output {
      const { address, coins } = data;
      return new Output(address, Coins.fromData(coins));
    }

    public toProto(_isClassic?: boolean): Output.Proto {
      const { address, coins } = this;
      return Output_pb.fromPartial({
        address,
        coins: coins.toProto(),
      });
    }

    public static fromProto(proto: Output.Proto, _isClassic?: boolean): Output {
      return new Output(proto.address, Coins.fromProto(proto.coins));
    }
  }

  export namespace Input {
    export interface Amino {
      address: AccAddress;
      coins: Coins.Amino;
    }

    export interface Data {
      address: AccAddress;
      coins: Coins.Data;
    }

    export type Proto = Input_pb;
  }

  export namespace Output {
    export interface Amino {
      address: AccAddress;
      coins: Coins.Amino;
    }

    export interface Data {
      address: AccAddress;
      coins: Coins.Data;
    }

    export type Proto = Output_pb;
  }
}
