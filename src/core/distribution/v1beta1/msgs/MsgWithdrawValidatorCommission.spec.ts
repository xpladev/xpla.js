import { MsgWithdrawValidatorCommissionV1B1 } from './MsgWithdrawValidatorCommission';
const MsgWithdrawValidatorCommissionAmino = require('./MsgWithdrawValidatorCommission.data.json');

describe('MsgWithdrawValidatorCommission', () => {
  it('legacy deserialize', () => {
    MsgWithdrawValidatorCommissionAmino.txs.forEach((txinfo: any) => {
      txinfo.tx.value.msg.forEach((msg: any) => {
        if (msg.type == 'distribution/MsgWithdrawValidatorCommission') {
          const e = MsgWithdrawValidatorCommissionV1B1.fromAmino(msg);
          expect(e.toAmino(true)).toEqual(msg);
        }
      });
    });
  });

  it('deserialize amino', () => {
    const fund = MsgWithdrawValidatorCommissionV1B1.fromAmino({
      type: 'cosmos-sdk/MsgWithdrawValCommission',
      value: {
        validator_address: 'xplavaloper1pc0gs3n6803x7jqe9m7etegmyx29xw38aaf3u7',
      },
    });

    expect(fund).toMatchObject({
      validator_address: 'xplavaloper1pc0gs3n6803x7jqe9m7etegmyx29xw38aaf3u7',
    });

    expect(fund.toAmino()).toMatchObject({
      type: 'cosmos-sdk/MsgWithdrawValCommission',
      value: {
        validator_address: 'xplavaloper1pc0gs3n6803x7jqe9m7etegmyx29xw38aaf3u7',
      },
    });
  });
});
