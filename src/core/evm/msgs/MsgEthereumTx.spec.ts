import { MsgEthereumTx } from './MsgEthereumTx';
import { Any } from '@bufbuild/protobuf';

describe('MsgEthereumTx', () => {
  it('deserialize correctly', () => {
    const evmtx = MsgEthereumTx.fromAmino({
      type: 'evm/MsgEthereumTx',
      value: {
        size: 0,
        hash: '',
        from: '',
      },
    });

    expect(evmtx).toMatchObject({
      size: 0,
      hash: '',
      from: '',
    });

    expect(evmtx.toAmino(true)).toMatchObject({
      type: 'evm/MsgEthereumTx',
      value: {
        size: 0,
        hash: '',
        from: '',
      },
    });
  });

  it('deserialize correctly proto', () => {
    const evmtx = MsgEthereumTx.fromData({
      '@type': '/ethermint.evm.v1.MsgEthereumTx',
      size: 0,
      hash: '',
      from: '',
    });

    expect(evmtx).toMatchObject({
      size: 0,
      hash: '',
      from: '',
    });

    expect(evmtx.toData()).toMatchObject({
      '@type': '/ethermint.evm.v1.MsgEthereumTx',
      size: 0,
      hash: '',
      from: '',
    });
  });
});
