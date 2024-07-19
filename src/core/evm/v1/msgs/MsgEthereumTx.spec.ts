import { MsgEthereumTxV1 } from './MsgEthereumTx';

describe('MsgEthereumTx', () => {
  it('deserialize correctly', () => {
    const evmtx = MsgEthereumTxV1.fromAmino({
      type: 'evm/MsgEthereumTx',
      value: {
        size: 0,
        hash: '',
        from: '',
        data: undefined,
      },
    });

    expect(evmtx).toMatchObject({
      size: 0,
      hash: '',
      from: '',
      data: undefined,
    });

    expect(evmtx.toAmino(true)).toMatchObject({
      type: 'evm/MsgEthereumTx',
      value: {
        size: 0,
        hash: '',
        from: '',
        data: undefined,
      },
    });
  });

  it('deserialize correctly proto', () => {
    const evmtx = MsgEthereumTxV1.fromData({
      '@type': '/ethermint.evm.v1.MsgEthereumTx',
      size: 0,
      hash: '',
      from: '',
      data: undefined,
    });

    expect(evmtx).toMatchObject({
      size: 0,
      hash: '',
      from: '',
      data: undefined,
    });

    expect(evmtx.toData()).toMatchObject({
      '@type': '/ethermint.evm.v1.MsgEthereumTx',
      size: 0,
      hash: '',
      from: '',
      data: undefined,
    });
  });
});
