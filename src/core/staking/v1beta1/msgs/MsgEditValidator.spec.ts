import { MsgEditValidatorV1B1 } from './MsgEditValidator';
const MsgEditValidatorAmino = require('./MsgEditValidator.data.json');

describe('MsgEditValidator', () => {
  it('deserializes', () => {
    MsgEditValidatorAmino.txs.forEach((txinfo: any) => {
      txinfo.tx.value.msg.forEach((msg: any) => {
        if (msg.type == 'staking/MsgEditValidator') {
          const e = MsgEditValidatorV1B1.fromAmino(msg, true);
          expect(e.toAmino(true)).toEqual(msg);
        }
      });
    });
  });
});
