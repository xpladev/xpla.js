import { TxBody } from './Tx';
import { ExtensionOptionsWeb3Tx } from '@xpla/xpla.proto/cosmos/evm/eip712/v1/web3';
import { ExtensionOptionDynamicFeeTx } from '@xpla/xpla.proto/cosmos/evm/ante/v1/dynamic_fee';
import { ExtensionOptionData } from './ExtensionOptions';

const body = (option: ExtensionOptionData) =>
  TxBody.fromData({
    messages: [],
    memo: '',
    timeout_height: '0',
    extension_options: [option],
    non_critical_extension_options: [option],
  });

describe('TxBody extension JSON', () => {
  test.each(['/cosmos.evm.vm.v1', '/ethermint.evm.v1'])(
    'encodes %s Ethereum extension type',
    prefix => {
      const typeUrl = `${prefix}.ExtensionOptionsEthereumTx`;
      const tx = body({ '@type': typeUrl });
      expect(tx.toProto().extensionOptions[0].typeUrl).toBe(typeUrl);
      expect(Array.from(tx.toProto().extensionOptions[0].value)).toEqual([]);
      expect(tx.toProto().nonCriticalExtensionOptions[0].typeUrl).toBe(typeUrl);
      expect(tx.toData().extension_options).toEqual([{ '@type': typeUrl }]);
    }
  );
  test.each(['/cosmos.evm.eip712.v1', '/ethermint.types.v1'])(
    'converts %s Web3 fields',
    prefix => {
      const data = {
        '@type': `${prefix}.ExtensionOptionsWeb3Tx`,
        typed_data_chain_id: '9007199254740993',
        fee_payer: 'payer',
        fee_payer_sig: 'AQID',
      };
      const tx = body(data);
      const decoded = ExtensionOptionsWeb3Tx.decode(
        tx.toProto().extensionOptions[0].value
      );
      expect(decoded.typedDataChainId.toString()).toBe('9007199254740993');
      expect(Array.from(decoded.feePayerSig)).toEqual([1, 2, 3]);
      expect(decoded.feePayer).toBe('payer');
      expect(tx.toData().extension_options).toEqual([data]);
    }
  );
  test.each(['/cosmos.evm.ante.v1'])(
    'scales %s LegacyDec for protobuf',
    prefix => {
      const data = {
        '@type': `${prefix}.ExtensionOptionDynamicFeeTx`,
        max_priority_price: '1.500000000000000001',
      };
      const tx = body(data);
      const decoded = ExtensionOptionDynamicFeeTx.decode(
        tx.toProto().extensionOptions[0].value
      );
      expect(decoded.maxPriorityPrice).toBe('1500000000000000001');
      expect(tx.toData().extension_options).toEqual([data]);
    }
  );
  it('keeps legacy DynamicFee prices as unscaled integers', () => {
    const data = {
      '@type': '/ethermint.types.v1.ExtensionOptionDynamicFeeTx',
      max_priority_price: '1500000000000000001',
    };
    const tx = body(data);
    expect(
      ExtensionOptionDynamicFeeTx.decode(tx.toProto().extensionOptions[0].value)
        .maxPriorityPrice
    ).toBe('1500000000000000001');
    expect(tx.toData().extension_options).toEqual([data]);
  });
  test.each([
    {
      typeUrl: '/custom.Extension',
      value: Uint8Array.from([8, 7, 18, 1, 255]),
    },
    // Unknown protobuf field on a known type must survive too.
    {
      typeUrl: '/cosmos.evm.vm.v1.ExtensionOptionsEthereumTx',
      value: Uint8Array.from([8, 7]),
    },
  ])('preserves raw bytes for $typeUrl across JSON stringify/parse', option => {
    const tx = new TxBody([], '', 0, false, undefined, [option], [option]);
    const json = JSON.parse(JSON.stringify(tx.toData()));
    expect(json.extension_options[0].value).toBe(
      Buffer.from(option.value).toString('base64')
    );
    expect(TxBody.fromData(json).toBytes()).toEqual(tx.toBytes());
  });
  it('rejects unsupported expanded JSON instead of emitting an empty Any', () => {
    expect(() => body({ '@type': '/custom.Extension', custom: 7 })).toThrow(
      'Unsupported extension JSON'
    );
    expect(() =>
      body({
        '@type': '/cosmos.evm.vm.v1.ExtensionOptionsEthereumTx',
        extra: true,
      })
    ).toThrow('Unsupported extension JSON');
  });
  it('rejects precision loss in decimal JSON', () => {
    expect(() =>
      body({
        '@type': '/cosmos.evm.ante.v1.ExtensionOptionDynamicFeeTx',
        max_priority_price: '0.0000000000000000001',
      })
    ).toThrow('18 fractional digits');
  });
});
