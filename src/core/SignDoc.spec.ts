import { MsgSendV1B1 } from './bank/v1beta1/msgs/MsgSend';
import { Timestamp } from './Timestamp';
import { SignDoc } from './SignDoc';
import { AuthInfo, TxBody } from './Tx';
import { Fee } from './Fee';

// Golden JSON compared with the core v1.11.4 Amino sign-mode handler.
describe('Amino signing fields', () => {
  const make = (unordered?: boolean, time?: string) =>
    new SignDoc(
      'xpla-test',
      7,
      3,
      new AuthInfo([], new Fee(200000, [])),
      new TxBody(
        [new MsgSendV1B1('from', 'to', { axpla: '10' })],
        '',
        0,
        unordered,
        time ? Timestamp.fromString(time) : undefined
      )
    );
  it('leaves ordinary transaction sign bytes unchanged', () => {
    expect(make(false).toAminoJSON()).toBe(
      '{"account_number":"7","chain_id":"xpla-test","fee":{"amount":[],"gas":"200000"},"memo":"","msgs":[{"type":"cosmos-sdk/MsgSend","value":{"amount":[{"amount":"10","denom":"axpla"}],"from_address":"from","to_address":"to"}}],"sequence":"3"}'
    );
  });
  it('signs unordered and RFC3339Nano timeout fields', () => {
    expect(make(true, '2026-01-01T00:00:00.123456789Z').toAminoJSON()).toBe(
      '{"account_number":"7","chain_id":"xpla-test","fee":{"amount":[],"gas":"200000"},"memo":"","msgs":[{"type":"cosmos-sdk/MsgSend","value":{"amount":[{"amount":"10","denom":"axpla"}],"from_address":"from","to_address":"to"}}],"sequence":"3","timeout_timestamp":"2026-01-01T00:00:00.123456789Z","unordered":true}'
    );
  });
  it('includes a present timeout independently of unordered', () => {
    const data = JSON.parse(make(false, '2026-01-01T00:00:00Z').toAminoJSON());
    expect(data.timeout_timestamp).toBe('2026-01-01T00:00:00Z');
    expect(data).not.toHaveProperty('unordered');
  });
  test.each(['extension_options', 'non_critical_extension_options'] as const)(
    'rejects %s in Amino like the core sign-mode handler',
    field => {
      const doc = make();
      doc.tx_body[field] = [
        {
          typeUrl: '/cosmos.evm.vm.v1.ExtensionOptionsEthereumTx',
          value: new Uint8Array(),
        },
      ];
      expect(() => doc.toAminoJSON()).toThrow(
        'does not support protobuf extension options'
      );
      expect(() => doc.toBytes()).not.toThrow();
    }
  );
});
