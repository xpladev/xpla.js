import { MsgUnjailV1B1 } from './MsgUnjail';
const MsgUnjailAmino = require('./MsgUnjail.data.json');

describe('MsgUnjail', () => {
  it('legacy: deserializes', () => {
    MsgUnjailAmino.txs.forEach((txinfo: any) => {
      txinfo.tx.value.msg.forEach((msg: any) => {
        if (msg.type == 'slashing/MsgUnjail') {
          const e = MsgUnjailV1B1.fromAmino(msg, true);
          expect(e.toAmino(true)).toEqual(msg);
        }
      });
    });
  });

  it('deserializes', () => {
    MsgUnjailAmino.txs.forEach((txinfo: any) => {
      txinfo.tx.value.msg.forEach((msg: any) => {
        if (msg.type == 'cosmos-sdk/MsgUnjail') {
          const e = MsgUnjailV1B1.fromAmino(msg);
          expect(e.toAmino()).toEqual(msg);
        }
      });
    });
  });
});
