import { Tx } from './Tx';

describe('Tx', () => {
  it('deserializes', () => {
    const txAmino: Tx.Amino = {
      type: 'core/StdTx',
      value: {
        msg: [
          {
            type: 'wasm/MsgExecuteContract',
            value: {
              sender: 'xpla15d7zke8yrwvz360es5gr97y8upktm79q6j33de',
              contract: 'xpla1a06dgl27rhujjphsn4drl242ufws267qxypptx',
              msg: {
                adjust_premium: {
                  asset_tokens: [
                    'xpla15t9afkpj0wnh8m74n8n2f8tspkn7r65vnru45s',
                    'xpla1qre9crlfnulcg0m68qqywqqstplgvrzywsg3am',
                    'xpla1p50j2k5vyw3q2tgywqvxyz59z8csh9p7x8dk5m',
                    'xpla18gphn8r437p2xmjpw7a79hgsglf5y4t0x7s5ee',
                    'xpla1csr22xvxs6r3gkjsl7pmjkmpt39mwjsrm0e2r8',
                    'xpla1ys4dwwzaenjg2gy02mslmc96f267xvpsjat7gx',
                    'xpla16vfxm98rxlc8erj4g0sj5932dvylgmdufnugk0',
                    'xpla1avryzxnsn2denq7p2d7ukm6nkck9s0rz2llgnc',
                    'xpla1zeyfhurlrun6sgytqfue555e6vw2ndxt2j7jhd',
                    'xpla12saaecsqwxj04fn0jsv4jmdyp6gylptf5tksge',
                    'xpla15dr4ah3kha68kam7a907pje9w6z2lpjpnrkd06',
                    'xpla14gq9wj0tt6vu0m4ec2tkkv4ln3qrtl58lgdl2c',
                    'xpla104tgj4gc3pp5s240a0mzqkhd3jzkn8v0u07hlf',
                    'xpla1qg9ugndl25567u03jrr79xur2yk9d632fke3h2',
                    'xpla13myzfjdmvqkama2tt3v5f7quh75rv78w8kq6u6',
                    'xpla12s2h8vlztjwu440khpc0063p34vm7nhu25w4p9',
                    'xpla1djnlav60utj06kk9dl7defsv8xql5qpryzvm3h',
                    'xpla18yx7ff8knc98p07pdkhm3u36wufaeacv47fuha',
                    'xpla1fdkfhgk433tar72t4edh6p6y9rmjulzc83ljuw',
                    'xpla1nslem9lgwx53rvgqwd8hgq7pepsry6yr3wsen4',
                    'xpla1ax7mhqahj6vcqnnl675nqq2g9wghzuecy923vy',
                    'xpla1fucmfp8x4mpzsydjaxyv26hrkdg4vpdzdvf647',
                    'xpla1ftefjmtpnk2fctsa8xkv8naven65z5qtgq83nu',
                    'xpla1fs6c6y65c65kkjanjwvmnrfvnm2s58ph88t9ky',
                    'xpla18qs6704f4ujnwus9x9vxcxrrm0du0f232kpnd6',
                    'xpla1qk0cd8576fqf33paf40xy3rt82p7yluwtxz7qx',
                    'xpla179na3xcvjastpptnh9g6lnf75hqqjnsv9mqm3j',
                  ],
                },
              },
              funds: [],
            },
          },
        ],
        fee: { amount: [{ denom: 'uusd', amount: '1417500' }], gas: '9450000' },
        signatures: [],
        memo: '',
        timeout_height: '0',
      },
    };

    expect(Tx.fromAmino(txAmino, true)).toBeTruthy();
  });
});
