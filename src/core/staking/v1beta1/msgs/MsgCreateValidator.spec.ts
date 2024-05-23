import { MsgCreateValidatorV1B1 } from './MsgCreateValidator';
import { ValidatorV1B1 } from '../Validator';
const MsgCreateValidatorAmino = require('./MsgCreateValidator.data.json');

describe('MsgCreateValidator', () => {
  it('legacy deserialize', () => {
    MsgCreateValidatorAmino.txs.forEach((txinfo: any) => {
      txinfo.tx.value.msg.forEach((msg: any) => {
        if (msg.type == 'staking/MsgCreateValidator') {
          const e = MsgCreateValidatorV1B1.fromAmino(msg);
          expect(e.toAmino(true)).toEqual(msg);
        }
      });
    });
  });

  it('deserialize amino', () => {
    const description: ValidatorV1B1.Description.Amino = {
      moniker: 'test',
      website: 'test',
      identity: 'test',
      details: 'test',
      security_contact: 'test',
    };
    const send = MsgCreateValidatorV1B1.fromAmino({
      type: 'cosmos-sdk/MsgCreateValidator',
      value: {
        description: ValidatorV1B1.Description.fromAmino(description),
        commission: {
          rate: '0.100000000000000000',
          max_rate: '0.200000000000000000',
          max_change_rate: '0.010000000000000000',
        },
        min_self_delegation: '1',
        delegator_address: 'xpla1r2kcrnsq8jfu5zyeyqygrj80x6chf82ae50ed5',
        validator_address: 'xplavaloper1r2kcrnsq8jfu5zyeyqygrj80x6chf82aemrya8',
        pubkey: {
          type: 'tendermint/PubKeyEd25519',
          value: 'b8RizVY2WHFTHLU/8HVaJApMAw5bhvdNuJtXPVAS5LA=',
        },
        value: {
          denom: 'axpla',
          amount: '10000000',
        },
      },
    });

    expect(send.toAmino()).toMatchObject({
      type: 'cosmos-sdk/MsgCreateValidator',
      value: {
        description: ValidatorV1B1.Description.fromAmino(description),
        commission: {
          rate: '0.100000000000000000',
          max_rate: '0.200000000000000000',
          max_change_rate: '0.010000000000000000',
        },
        min_self_delegation: '1',
        delegator_address: 'xpla1r2kcrnsq8jfu5zyeyqygrj80x6chf82ae50ed5',
        validator_address: 'xplavaloper1r2kcrnsq8jfu5zyeyqygrj80x6chf82aemrya8',
        pubkey: {
          type: 'tendermint/PubKeyEd25519',
          value: 'b8RizVY2WHFTHLU/8HVaJApMAw5bhvdNuJtXPVAS5LA=',
        },
        value: {
          denom: 'axpla',
          amount: '10000000',
        },
      },
    });
  });
});
