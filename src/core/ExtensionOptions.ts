import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { ExtensionOptionsEthereumTx } from '@xpla/xpla.proto/cosmos/evm/vm/v1/tx';
import { ExtensionOptionsWeb3Tx } from '@xpla/xpla.proto/cosmos/evm/eip712/v1/web3';
import { ExtensionOptionDynamicFeeTx } from '@xpla/xpla.proto/cosmos/evm/ante/v1/dynamic_fee';
import { Convert } from '../util/convert';
import { Dec } from './numeric';

/** Expanded LCD JSON, or a lossless raw Any for types without a JSON codec.
 * Raw Any JSON is for SDK round trips, not expanded Cosmos LCD requests.
 */
export type ExtensionOptionData =
  | { '@type': string; [field: string]: unknown }
  | { type_url: string; value: string }
  | { typeUrl: string; value: string | Uint8Array };

function kind(
  typeUrl: string
): 'ethereum' | 'web3' | 'fee' | 'legacy-fee' | undefined {
  switch (typeUrl) {
    case '/cosmos.evm.vm.v1.ExtensionOptionsEthereumTx':
    case '/ethermint.evm.v1.ExtensionOptionsEthereumTx':
      return 'ethereum';
    case '/cosmos.evm.eip712.v1.ExtensionOptionsWeb3Tx':
    case '/ethermint.types.v1.ExtensionOptionsWeb3Tx':
      return 'web3';
    case '/cosmos.evm.ante.v1.ExtensionOptionDynamicFeeTx':
      return 'fee';
    case '/ethermint.types.v1.ExtensionOptionDynamicFeeTx':
      return 'legacy-fee';
    default:
      return undefined;
  }
}

export function extensionOptionFromData(data: ExtensionOptionData): Any {
  if (!('@type' in data)) {
    const typeUrl = 'type_url' in data ? data.type_url : data.typeUrl;
    if (
      typeof typeUrl !== 'string' ||
      !typeUrl ||
      !(typeof data.value === 'string' || data.value instanceof Uint8Array)
    ) {
      throw new Error(
        'Raw extension Any requires a type URL and base64 string or Uint8Array value'
      );
    }
    return Any.fromPartial({
      typeUrl,
      value:
        typeof data.value === 'string'
          ? Convert.fromBase64(data.value)
          : data.value,
    });
  }
  const typeUrl = data['@type'];
  const extensionKind = kind(typeUrl);
  const fields =
    extensionKind === 'web3'
      ? ['typed_data_chain_id', 'fee_payer', 'fee_payer_sig']
      : extensionKind === 'fee' || extensionKind === 'legacy-fee'
        ? ['max_priority_price']
        : [];
  if (
    !extensionKind ||
    Object.keys(data).some(k => k !== '@type' && !fields.includes(k))
  ) {
    throw new Error(
      `Unsupported extension JSON: ${typeUrl}; provide raw type_url and base64 value`
    );
  }
  let value: Uint8Array;
  switch (extensionKind) {
    case 'ethereum':
      value = ExtensionOptionsEthereumTx.encode({}).finish();
      break;
    case 'web3': {
      const chainId = data.typed_data_chain_id ?? '0';
      if (
        typeof chainId !== 'string' ||
        !/^\d+$/.test(chainId) ||
        new Dec(chainId).greaterThan('18446744073709551615') ||
        (data.fee_payer !== undefined && typeof data.fee_payer !== 'string') ||
        (data.fee_payer_sig !== undefined &&
          typeof data.fee_payer_sig !== 'string')
      ) {
        throw new Error(
          'Web3 extension requires a uint64 chain ID string and string payer/signature'
        );
      }
      value = ExtensionOptionsWeb3Tx.encode(
        ExtensionOptionsWeb3Tx.fromJSON({
          typedDataChainId: chainId,
          feePayer: data.fee_payer,
          feePayerSig: data.fee_payer_sig,
        })
      ).finish();
      break;
    }
    case 'legacy-fee': {
      const price = data.max_priority_price ?? '0';
      if (typeof price !== 'string' || !/^-?\d+$/.test(price)) {
        throw new Error('legacy max_priority_price must be an integer string');
      }
      value = ExtensionOptionDynamicFeeTx.encode({
        maxPriorityPrice: price,
      }).finish();
      break;
    }
    case 'fee': {
      const price = data.max_priority_price ?? '0';
      if (typeof price !== 'string' || !/^-?\d+(\.\d{1,18})?$/.test(price)) {
        throw new Error(
          'max_priority_price must be a decimal string with at most 18 fractional digits'
        );
      }
      value = ExtensionOptionDynamicFeeTx.encode({
        maxPriorityPrice: new Dec(price).mul('1000000000000000000').toFixed(0),
      }).finish();
      break;
    }
  }
  return Any.fromPartial({ typeUrl, value });
}

export function extensionOptionToData(option: Any): ExtensionOptionData {
  const raw = {
    type_url: option.typeUrl,
    value: Convert.toBase64(option.value),
  };
  let data: ExtensionOptionData;
  try {
    switch (kind(option.typeUrl)) {
      case 'ethereum':
        data = { '@type': option.typeUrl };
        break;
      case 'web3': {
        const decoded = ExtensionOptionsWeb3Tx.decode(option.value);
        data = {
          '@type': option.typeUrl,
          typed_data_chain_id: decoded.typedDataChainId.toString(),
          fee_payer: decoded.feePayer,
          fee_payer_sig: Convert.toBase64(decoded.feePayerSig),
        };
        break;
      }
      case 'legacy-fee': {
        const decoded = ExtensionOptionDynamicFeeTx.decode(option.value);
        data = {
          '@type': option.typeUrl,
          max_priority_price: decoded.maxPriorityPrice || '0',
        };
        break;
      }
      case 'fee': {
        const decoded = ExtensionOptionDynamicFeeTx.decode(option.value);
        data = {
          '@type': option.typeUrl,
          max_priority_price: new Dec(decoded.maxPriorityPrice || '0')
            .div('1000000000000000000')
            .toFixed(18),
        };
        break;
      }
      default:
        return raw;
    }
    // Preserve unknown fields and noncanonical wire encodings, even for known types.
    const encoded = extensionOptionFromData(data).value;
    return encoded.length === option.value.length &&
      encoded.every((byte, index) => byte === option.value[index])
      ? data
      : raw;
  } catch {
    return raw;
  }
}
