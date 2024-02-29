import { RegisterCoinProposal } from './RegisterCoinProposal';

describe('RegisterCoinProposal', () => {
  it('deserialize correctly', () => {
    const evmtx = RegisterCoinProposal.fromAmino({
      type: 'erc20/RegisterCoinProposal',
      value: {
        title: '',
        description: '',
      },
    });

    expect(evmtx).toMatchObject({
      title: '',
      description: '',
    });

    expect(evmtx.toAmino(true)).toMatchObject({
      type: 'erc20/RegisterCoinProposal',
      value: {
        title: '',
        description: '',
      },
    });
  });

  it('deserialize correctly proto', () => {
    const evmtx = RegisterCoinProposal.fromData({
      '@type': '/evmos.erc20.v1.RegisterCoinProposal',
      title: '',
      description: '',
    });

    expect(evmtx).toMatchObject({
      title: '',
      description: '',
    });

    expect(evmtx.toData()).toMatchObject({
      '@type': '/evmos.erc20.v1.RegisterCoinProposal',
      title: '',
      description: '',
    });
  });
});
