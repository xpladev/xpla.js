import { MsgWithdrawDelegatorRewardV1B1 } from './MsgWithdrawDelegatorReward';
const MsgWithdrawDelegatorRewardAmino = require('./MsgWithdrawDelegatorReward.data.json');

describe('MsgWithdrawDelegatorReward', () => {
  it('leagacy deserialize', () => {
    MsgWithdrawDelegatorRewardAmino.txs.forEach((txinfo: any) => {
      txinfo.tx.value.msg.forEach((msg: any) => {
        if (msg.type == 'distribution/MsgWithdrawDelegationReward') {
          const e = MsgWithdrawDelegatorRewardV1B1.fromAmino(msg);
          expect(e.toAmino(true)).toEqual(msg);
        }
      });
    });
  });

  it('deserialize amino', () => {
    const fund = MsgWithdrawDelegatorRewardV1B1.fromAmino({
      type: 'cosmos-sdk/MsgWithdrawDelegationReward',
      value: {
        delegator_address: 'xpla1y4umfuqfg76t8mfcff6zzx7elvy93jtp4xcdvw',
        validator_address: 'xplavaloper1pc0gs3n6803x7jqe9m7etegmyx29xw38aaf3u7',
      },
    });

    expect(fund).toMatchObject({
      delegator_address: 'xpla1y4umfuqfg76t8mfcff6zzx7elvy93jtp4xcdvw',
      validator_address: 'xplavaloper1pc0gs3n6803x7jqe9m7etegmyx29xw38aaf3u7',
    });

    expect(fund.toAmino()).toMatchObject({
      type: 'cosmos-sdk/MsgWithdrawDelegationReward',
      value: {
        delegator_address: 'xpla1y4umfuqfg76t8mfcff6zzx7elvy93jtp4xcdvw',
        validator_address: 'xplavaloper1pc0gs3n6803x7jqe9m7etegmyx29xw38aaf3u7',
      },
    });
  });
});
