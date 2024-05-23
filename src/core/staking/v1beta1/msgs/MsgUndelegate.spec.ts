import { MsgUndelegateV1B1 } from './MsgUndelegate';
import { Coin } from '../../../Coin';
const MsgUndelegateAmino = require('./MsgUndelegate.data.json');

describe('MsgUndelegate', () => {
  it('legacy deserialize', () => {
    MsgUndelegateAmino.txs.forEach((txinfo: any) => {
      txinfo.tx.value.msg.forEach((msg: any) => {
        if (msg.type == 'staking/MsgUndelegate') {
          const e = MsgUndelegateV1B1.fromAmino(msg);
          expect(e.toAmino(true)).toEqual(msg);
        }
      });
    });
  });

  it('deserialize amino', () => {
    const send = MsgUndelegateV1B1.fromAmino({
      type: 'cosmos-sdk/MsgUndelegate',
      value: {
        delegator_address: 'xpla1y4umfuqfg76t8mfcff6zzx7elvy93jtp4xcdvw',
        validator_address: 'xplavaloper1guxk2q4wn92fw0mchx2rhsenjvq0hj9pzp0ngt',
        amount: {
          denom: 'axpla',
          amount: '8102024952',
        },
      },
    });

    expect(send).toMatchObject({
      delegator_address: 'xpla1y4umfuqfg76t8mfcff6zzx7elvy93jtp4xcdvw',
      validator_address: 'xplavaloper1guxk2q4wn92fw0mchx2rhsenjvq0hj9pzp0ngt',
      amount: new Coin('axpla', '8102024952'),
    });

    expect(send.toAmino()).toMatchObject({
      type: 'cosmos-sdk/MsgUndelegate',
      value: {
        delegator_address: 'xpla1y4umfuqfg76t8mfcff6zzx7elvy93jtp4xcdvw',
        validator_address: 'xplavaloper1guxk2q4wn92fw0mchx2rhsenjvq0hj9pzp0ngt',
        amount: {
          denom: 'axpla',
          amount: '8102024952',
        },
      },
    });
  });
});
