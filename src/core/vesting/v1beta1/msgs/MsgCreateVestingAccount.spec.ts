const data = require('./MsgCreateVestingAccount.data.json');
import { Coins } from '../../../Coins';
import { MsgCreateVestingAccountV1B1 } from './MsgCreateVestingAccount';

describe('MsgCreateVestingAccount', () => {
  it('deserializes', () => {
    MsgCreateVestingAccountV1B1.fromData(data);
  });

  it('conversion', () => {
    const obj = MsgCreateVestingAccountV1B1.fromData(data);
    const p = obj.toProto();
    expect(obj.from_address).toStrictEqual(p.fromAddress);
    expect(obj.to_address).toStrictEqual(p.toAddress);
    expect(obj.delayed).toStrictEqual(p.delayed);
    expect(obj.end_time).toStrictEqual(p.endTime.toNumber());
    expect(obj.amount).toStrictEqual(Coins.fromProto(p.amount));

    const d = obj.toData(false);
    expect(obj).toStrictEqual(MsgCreateVestingAccountV1B1.fromData(d));
    const a = obj.toAmino(false);
    expect(obj).toStrictEqual(MsgCreateVestingAccountV1B1.fromAmino(a));
  });
});
