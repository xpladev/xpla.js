import { MsgSetWithdrawAddressV1B1 } from './MsgSetWithdrawAddress';
const MsgSetWithdrawAddressAmino = require('./MsgSetWithdrawAddress.data.json');

describe('MsgSetWithdrawAddress', () => {
  it('legacy deserialize amino', () => {
    MsgSetWithdrawAddressAmino.txs.forEach((txinfo: any) => {
      txinfo.tx.value.msg.forEach((msg: any) => {
        if (msg.type == 'distribution/MsgModifyWithdrawAddress') {
          const e = MsgSetWithdrawAddressV1B1.fromAmino(msg);
          expect(e.toAmino(true)).toEqual(msg);
        }
      });
    });
  });

  it('deserialize amino', () => {
    const fund = MsgSetWithdrawAddressV1B1.fromAmino({
      type: 'cosmos-sdk/MsgModifyWithdrawAddress',
      value: {
        delegator_address: 'xpla1y4umfuqfg76t8mfcff6zzx7elvy93jtp4xcdvw',
        withdraw_address: 'xpla1rf9xakxf97a49qa5svsf7yypjswzkutqfclur8',
      },
    });

    expect(fund).toMatchObject({
      delegator_address: 'xpla1y4umfuqfg76t8mfcff6zzx7elvy93jtp4xcdvw',
      withdraw_address: 'xpla1rf9xakxf97a49qa5svsf7yypjswzkutqfclur8',
    });

    expect(fund.toAmino()).toMatchObject({
      type: 'cosmos-sdk/MsgModifyWithdrawAddress',
      value: {
        delegator_address: 'xpla1y4umfuqfg76t8mfcff6zzx7elvy93jtp4xcdvw',
        withdraw_address: 'xpla1rf9xakxf97a49qa5svsf7yypjswzkutqfclur8',
      },
    });
  });
});
