import { MsgEthereumTxV1 } from './MsgEthereumTx';

describe('MsgEthereumTx', () => {
  it('deserialize correctly', () => {
    const evmtx = MsgEthereumTxV1.fromAmino({
      type: 'cosmos/evm/MsgEthereumTx',
      value: {
        size: 0,
        hash: '',
        from: '',
        data: undefined,
        raw: undefined,
      },
    });

    expect(evmtx).toMatchObject({
      size: 0,
      hash: '',
      from: '',
      data: undefined,
      raw: undefined,
    });

    expect(evmtx.toAmino(true)).toMatchObject({
      type: 'cosmos/evm/MsgEthereumTx',
      value: {
        size: 0,
        hash: '',
        from: '',
        data: undefined,
        raw: undefined,
      },
    });
  });

  it('deserialize correctly proto', () => {
    const evmtx = MsgEthereumTxV1.fromData({
      '@type': '/cosmos.evm.vm.v1.MsgEthereumTx',
      size: 0,
      hash: '',
      from: '',
      data: undefined,
      raw: undefined,
    });

    expect(evmtx).toMatchObject({
      size: 0,
      hash: '',
      from: '',
      data: undefined,
      raw: undefined,
    });

    expect(evmtx.toData()).toMatchObject({
      '@type': '/cosmos.evm.vm.v1.MsgEthereumTx',
      size: 0,
      hash: '',
      from: '',
      data: undefined,
      raw: undefined,
    });
  });
});
