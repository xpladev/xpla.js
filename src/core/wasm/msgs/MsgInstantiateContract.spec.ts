import { MsgInstantiateContract } from './MsgInstantiateContract';
import { MsgInstantiateContract as MsgInstantiateContract_pb } from '@xpla/xpla.proto/cosmwasm/wasm/v1/tx';

const msgWithAdmin = new MsgInstantiateContract(
  'xpla1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v',
  'xpla1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v',
  1,
  { count: 0 },
  { uluna: 120400 }
);

const msgWithoutAdmin = new MsgInstantiateContract(
  'xpla1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v',
  undefined,
  1,
  { count: 0 },
  { uluna: 120400 }
);

const msgWithInitString = new MsgInstantiateContract(
  'xpla1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v',
  undefined,
  1,
  'init_msg_as_string',
  { uluna: 120400 }
);

describe('MsgInstantiateContract', () => {
  it('amino', () => {
    const aminoWithAdmin = msgWithAdmin.toAmino(false);
    expect(aminoWithAdmin.value.admin).toEqual(msgWithAdmin.admin);

    const aminoWithoutAdmin = msgWithoutAdmin.toAmino(false);
    expect(aminoWithoutAdmin.value.admin).toEqual(msgWithoutAdmin.admin);

    const aminoWithInitString = msgWithInitString.toAmino(
      false
    ) as MsgInstantiateContract.Amino;
    expect(aminoWithInitString.value.msg).toEqual(msgWithInitString.init_msg);
  });

  it('proto', () => {
    const protoWithAdmin = msgWithAdmin.toProto();
    expect(protoWithAdmin.admin).toEqual(msgWithAdmin.admin);

    const protoWithoutAdmin = msgWithoutAdmin.toProto();
    expect(protoWithoutAdmin.admin).toEqual('');

    const protoWithInitString =
      msgWithInitString.toProto() as MsgInstantiateContract_pb;
    expect(protoWithInitString.msg.toString()).toEqual(
      JSON.stringify(msgWithInitString.init_msg)
    );
  });

  it('data', () => {
    const dataWithAdmin2 = msgWithAdmin.toData(false);
    expect(dataWithAdmin2.admin).toEqual(msgWithAdmin.admin);

    const dataWithoutAdmin2 = msgWithoutAdmin.toData(false);
    expect(dataWithoutAdmin2.admin).toEqual('');

    const dataWithInitString2 = msgWithInitString.toData(
      false
    ) as MsgInstantiateContract.Data;
    expect(dataWithInitString2.msg).toEqual(msgWithInitString.init_msg);
  });
});
