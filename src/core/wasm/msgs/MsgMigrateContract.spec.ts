import { MsgMigrateContract } from './MsgMigrateContract';
import { MsgMigrateContract as MsgMigrateContract_pb } from '@xpla/xpla.proto/cosmwasm/wasm/v1/tx';

const msgWithAdmin = new MsgMigrateContract(
  'xpla1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v',
  'xpla1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v',
  2,
  { count: 0 }
);

const msgWithMigrateString = new MsgMigrateContract(
  'xpla1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v',
  'xpla1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v',
  2,
  'migrate_msg_as_string'
);

describe('MsgMigrateContract', () => {
  it('amino', () => {
    const aminoWithAdmin = msgWithAdmin.toAmino(
      false
    ) as MsgMigrateContract.Amino;
    expect(aminoWithAdmin.value.sender).toEqual(msgWithAdmin.admin);

    const aminoWithMigrateString = msgWithMigrateString.toAmino(
      false
    ) as MsgMigrateContract.Amino;
    expect(aminoWithMigrateString.value.msg).toEqual(
      msgWithMigrateString.migrate_msg
    );
  });

  it('proto', () => {
    const protoWithAdmin = msgWithAdmin.toProto(false) as MsgMigrateContract_pb;
    expect(protoWithAdmin.sender).toEqual(msgWithAdmin.admin);

    const protoWithMigrateString = msgWithMigrateString.toProto(
      false
    ) as MsgMigrateContract_pb;
    expect(protoWithMigrateString.msg.toString()).toEqual(
      JSON.stringify(msgWithMigrateString.migrate_msg)
    );
  });

  it('data', () => {
    const dataWithAdmin = msgWithAdmin.toData(false) as MsgMigrateContract.Data;
    expect(dataWithAdmin.sender).toEqual(msgWithAdmin.admin);

    const dataWithMigrateString = msgWithMigrateString.toData(
      false
    ) as MsgMigrateContract.Data;
    expect(dataWithMigrateString.msg).toEqual(msgWithMigrateString.migrate_msg);
  });
});
