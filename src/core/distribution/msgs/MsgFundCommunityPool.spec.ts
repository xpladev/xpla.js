import { Coins } from '../../Coins';
import { MsgFundCommunityPool } from './MsgFundCommunityPool';

describe('MsgFundCommunityPool', () => {
  it('legacy deserialize amino', () => {
    const fund = MsgFundCommunityPool.fromAmino({
      type: 'distribution/MsgFundCommunityPool',
      value: {
        depositor: 'xpla1y4umfuqfg76t8mfcff6zzx7elvy93jtp4xcdvw',
        amount: [
          {
            denom: 'axpla',
            amount: '8102024952',
          },
        ],
      },
    });

    expect(fund).toMatchObject({
      depositor: 'xpla1y4umfuqfg76t8mfcff6zzx7elvy93jtp4xcdvw',
      amount: new Coins({
        uluna: 8102024952,
      }),
    });

    expect(fund.toAmino(true)).toMatchObject({
      type: 'distribution/MsgFundCommunityPool',
      value: {
        depositor: 'xpla1y4umfuqfg76t8mfcff6zzx7elvy93jtp4xcdvw',
        amount: [
          {
            denom: 'axpla',
            amount: '8102024952',
          },
        ],
      },
    });
  });

  it('legacy deserialize proto', () => {
    const fund = MsgFundCommunityPool.fromData({
      '@type': '/cosmos.distribution.v1beta1.MsgFundCommunityPool',
      depositor: 'xpla1y4umfuqfg76t8mfcff6zzx7elvy93jtp4xcdvw',
      amount: [
        {
          denom: 'axpla',
          amount: '8102024952',
        },
      ],
    });

    expect(fund).toMatchObject({
      depositor: 'xpla1y4umfuqfg76t8mfcff6zzx7elvy93jtp4xcdvw',
      amount: new Coins({
        uluna: 8102024952,
      }),
    });

    expect(fund.toData()).toMatchObject({
      '@type': '/cosmos.distribution.v1beta1.MsgFundCommunityPool',
      depositor: 'xpla1y4umfuqfg76t8mfcff6zzx7elvy93jtp4xcdvw',
      amount: [
        {
          denom: 'axpla',
          amount: '8102024952',
        },
      ],
    });
  });

  it('deserialize amino', () => {
    const fund = MsgFundCommunityPool.fromAmino({
      type: 'cosmos-sdk/MsgFundCommunityPool',
      value: {
        depositor: 'xpla1y4umfuqfg76t8mfcff6zzx7elvy93jtp4xcdvw',
        amount: [
          {
            denom: 'axpla',
            amount: '8102024952',
          },
        ],
      },
    });

    expect(fund).toMatchObject({
      depositor: 'xpla1y4umfuqfg76t8mfcff6zzx7elvy93jtp4xcdvw',
      amount: new Coins({
        uluna: 8102024952,
      }),
    });

    expect(fund.toAmino()).toMatchObject({
      type: 'cosmos-sdk/MsgFundCommunityPool',
      value: {
        depositor: 'xpla1y4umfuqfg76t8mfcff6zzx7elvy93jtp4xcdvw',
        amount: [
          {
            denom: 'axpla',
            amount: '8102024952',
          },
        ],
      },
    });
  });
});
