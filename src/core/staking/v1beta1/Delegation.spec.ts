const delgsAmino = require('./Delegation.data.json');
import { DelegationV1B1 } from './Delegation';

describe('Delegation', () => {
  it('deserializes', () => {
    delgsAmino.forEach((delgExample: DelegationV1B1.Amino) => {
      const delg = DelegationV1B1.fromAmino(delgExample);
      expect(delg.toAmino()).toMatchObject(delgExample);
    });
  });
});
