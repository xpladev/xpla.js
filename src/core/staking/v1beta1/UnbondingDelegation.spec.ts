const data = require('./UnbondingDelegation.data.json');
import { UnbondingDelegationV1B1 } from './UnbondingDelegation';

describe('UnbondingDelegation', () => {
  it('deserializes', () => {
    data.forEach((udelgExample: UnbondingDelegationV1B1.Amino) => {
      UnbondingDelegationV1B1.fromAmino(udelgExample);
      // expect(udelg.toAmino()).toMatchObject(udelgExample);
      // JavaScript's Date does not preserve ns precision
    });
  });
});
