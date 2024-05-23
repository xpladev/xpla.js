import { MsgBeginRedelegateV1B1 } from './MsgBeginRedelegate';

import { Coin } from '../../../Coin';
const MsgBeginRedelegateAmino = require('./MsgBeginRedelegate.data.json');

describe('MsgBeginRedelegate', () => {
  it('legacy deserialize', () => {
    MsgBeginRedelegateAmino.txs.forEach((txinfo: any) => {
      txinfo.tx.value.msg.forEach((msg: any) => {
        if (msg.type == 'staking/MsgBeginRedelegate') {
          const e = MsgBeginRedelegateV1B1.fromAmino(msg);
          expect(e.toAmino(true)).toEqual(msg);
        }
      });
    });
  });

  it('deserialize amino', () => {
    const send = MsgBeginRedelegateV1B1.fromAmino({
      type: 'cosmos-sdk/MsgBeginRedelegate',
      value: {
        delegator_address: 'xpla1y4umfuqfg76t8mfcff6zzx7elvy93jtp4xcdvw',
        validator_src_address:
          'xplavaloper1guxk2q4wn92fw0mchx2rhsenjvq0hj9pzp0ngt',
        validator_dst_address:
          'xplavaloper1fa2gmum9kl9ms73hnrhvg0rkk0s9jvqxpunyr3',
        amount: {
          denom: 'axpla',
          amount: '8102024952',
        },
      },
    });

    expect(send).toMatchObject({
      delegator_address: 'xpla1y4umfuqfg76t8mfcff6zzx7elvy93jtp4xcdvw',
      validator_src_address:
        'xplavaloper1guxk2q4wn92fw0mchx2rhsenjvq0hj9pzp0ngt',
      validator_dst_address:
        'xplavaloper1fa2gmum9kl9ms73hnrhvg0rkk0s9jvqxpunyr3',
      amount: new Coin('axpla', '8102024952'),
    });

    expect(send.toAmino()).toMatchObject({
      type: 'cosmos-sdk/MsgBeginRedelegate',
      value: {
        delegator_address: 'xpla1y4umfuqfg76t8mfcff6zzx7elvy93jtp4xcdvw',
        validator_src_address:
          'xplavaloper1guxk2q4wn92fw0mchx2rhsenjvq0hj9pzp0ngt',
        validator_dst_address:
          'xplavaloper1fa2gmum9kl9ms73hnrhvg0rkk0s9jvqxpunyr3',
        amount: {
          denom: 'axpla',
          amount: '8102024952',
        },
      },
    });
  });
});
