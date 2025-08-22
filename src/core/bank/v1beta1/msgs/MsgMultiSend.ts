/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { Coins } from '../../../Coins';
import { AccAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgMultiSend as MsgMultiSendV1B1_pb } from '@xpla/xpla.proto/cosmos/bank/v1beta1/tx';
import {
  Input as InputV1B1_pb,
  Output as OutputV1B1_pb,
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
 *      new Coin('axpla', 123123),
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
export class MsgMultiSendV1B1 extends JSONSerializable<
  MsgMultiSendV1B1.Amino,
  MsgMultiSendV1B1.Data,
  MsgMultiSendV1B1.Proto
> {
  /**
   * @param inputs inputs
   * @param outputs outputs
   */
  constructor(
    public inputs: MsgMultiSendV1B1.Input[],
    public outputs: MsgMultiSendV1B1.Output[]
  ) {
    super();
  }

  public static fromAmino(
    data: MsgMultiSendV1B1.Amino,
    isClassic?: boolean
  ): MsgMultiSendV1B1 {
    const {
      value: { inputs, outputs },
    } = data;
    return new MsgMultiSendV1B1(
      inputs.map(i => MsgMultiSendV1B1.Input.fromAmino(i, isClassic)),
      outputs.map(o => MsgMultiSendV1B1.Output.fromAmino(o, isClassic))
    );
  }

  public toAmino(isClassic?: boolean): MsgMultiSendV1B1.Amino {
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
    data: MsgMultiSendV1B1.Data,
    isClassic?: boolean
  ): MsgMultiSendV1B1 {
    const { inputs, outputs } = data;
    return new MsgMultiSendV1B1(
      inputs.map(i => MsgMultiSendV1B1.Input.fromData(i, isClassic)),
      outputs.map(o => MsgMultiSendV1B1.Output.fromData(o, isClassic))
    );
  }

  public toData(_isClassic?: boolean): MsgMultiSendV1B1.Data {
    const { inputs, outputs } = this;
    return {
      '@type': '/cosmos.bank.v1beta1.MsgMultiSend',
      inputs: inputs.map(i => i.toData()),
      outputs: outputs.map(o => o.toData()),
    };
  }

  public static fromProto(
    proto: MsgMultiSendV1B1.Proto,
    isClassic?: boolean
  ): MsgMultiSendV1B1 {
    return new MsgMultiSendV1B1(
      proto.inputs.map(i => MsgMultiSendV1B1.Input.fromProto(i, isClassic)),
      proto.outputs.map(o => MsgMultiSendV1B1.Output.fromProto(o, isClassic))
    );
  }

  public toProto(_isClassic?: boolean): MsgMultiSendV1B1.Proto {
    const { inputs, outputs } = this;
    return MsgMultiSendV1B1_pb.fromPartial({
      inputs: inputs.map(i => i.toProto()),
      outputs: outputs.map(i => i.toProto()),
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.bank.v1beta1.MsgMultiSend',
      value: MsgMultiSendV1B1_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(msgAny: Any, isClassic?: boolean): MsgMultiSendV1B1 {
    return MsgMultiSendV1B1.fromProto(
      MsgMultiSendV1B1_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgMultiSendV1B1 {
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

  export type Proto = MsgMultiSendV1B1_pb;

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
      return InputV1B1_pb.fromPartial({
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
      return OutputV1B1_pb.fromPartial({
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

    export type Proto = InputV1B1_pb;
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

    export type Proto = OutputV1B1_pb;
  }
}
