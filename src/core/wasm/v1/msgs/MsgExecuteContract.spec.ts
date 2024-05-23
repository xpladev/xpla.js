import { MsgExecuteContractV1 } from './MsgExecuteContract';
import { MsgExecuteContract as MsgExecuteContract_pb } from '@xpla/xpla.proto/cosmwasm/wasm/v1/tx';

describe('MsgExecuteContract', () => {
  it('works when execute_msg is not JSON', () => {
    const msg1 = MsgExecuteContractV1.fromAmino(
      {
        type: 'wasm/MsgExecuteContract',
        value: {
          sender: 'xpla16xw94u0jgmuaz8zs54xn9x96lxew74gs05gs4h',
          contract: 'xpla15gwkyepfc6xgca5t5zefzwy42uts8l2m4g40k6',
          msg: {
            transfer: {
              recipient: 'xpla13jqgrtqwucx4jdvhg0d4tc80892fscx54298yt',
              amount: 10000,
            },
          },
          funds: [],
        },
      },
      false
    );

    expect(msg1.execute_msg).toMatchObject({
      transfer: {
        recipient: 'xpla13jqgrtqwucx4jdvhg0d4tc80892fscx54298yt',
        amount: 10000,
      },
    });
  });

  it('proto', () => {
    const msg1 = MsgExecuteContractV1.fromData(
      {
        '@type': '/cosmwasm.wasm.v1.MsgExecuteContract',
        sender: 'xpla16xw94u0jgmuaz8zs54xn9x96lxew74gs05gs4h',
        contract: 'xpla15gwkyepfc6xgca5t5zefzwy42uts8l2m4g40k6',
        msg: {
          transfer: {
            recipient: 'xpla13jqgrtqwucx4jdvhg0d4tc80892fscx54298yt',
            amount: 10000,
          },
        },
        funds: [],
      },
      false
    );

    expect(msg1.execute_msg).toMatchObject({
      transfer: {
        recipient: 'xpla13jqgrtqwucx4jdvhg0d4tc80892fscx54298yt',
        amount: 10000,
      },
    });
  });

  it('with string msg', () => {
    const msgWithExecuteString = new MsgExecuteContractV1(
      'xpla1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v',
      'xpla1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v',
      'execute_msg_as_string',
      { uluna: 120400 }
    );
    const aminoWithExecuteString = msgWithExecuteString.toAmino(
      false
    ) as MsgExecuteContractV1.Amino;
    expect(aminoWithExecuteString.value.msg).toEqual(
      msgWithExecuteString.execute_msg
    );
    const protoWithExecuteString = msgWithExecuteString.toProto(
      false
    ) as MsgExecuteContract_pb;
    expect(protoWithExecuteString.msg.toString()).toEqual(
      JSON.stringify(msgWithExecuteString.execute_msg)
    );
    const dataWithExecuteString = msgWithExecuteString.toData(
      false
    ) as MsgExecuteContractV1.Data;
    expect(dataWithExecuteString.msg).toEqual(msgWithExecuteString.execute_msg);
  });
});
