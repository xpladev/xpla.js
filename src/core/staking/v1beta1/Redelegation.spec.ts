const data = require('./Redelegation.data.json');
import { RedelegationV1B1 } from './Redelegation';

describe('Redelegation', () => {
  it('deserializes', () => {
    data.forEach((redelgExample: RedelegationV1B1.Amino) => {
      RedelegationV1B1.fromAmino(redelgExample);
      // expect(redelg.toAmino()).toMatchObject(redelgExample);
      // JavaScript's Date does not preserve ns precision
    });
  });
});
