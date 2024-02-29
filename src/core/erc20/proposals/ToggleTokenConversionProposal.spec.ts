import { RegisterERC20Proposal } from './RegisterERC20Proposal';

describe('RegisterERC20Proposal', () => {
  it('deserialize correctly', () => {
    const evmtx = RegisterERC20Proposal.fromAmino({
      type: 'erc20/RegisterERC20Proposal',
      value: {
        title: '',
        description: '',
        erc20addresses: [],
      },
    });

    expect(evmtx).toMatchObject({
      title: '',
      description: '',
    });

    expect(evmtx.toAmino(true)).toMatchObject({
      type: 'erc20/RegisterERC20Proposal',
      value: {
        title: '',
        description: '',
        erc20addresses: [],
      },
    });
  });

  it('deserialize correctly proto', () => {
    const evmtx = RegisterERC20Proposal.fromData({
      '@type': '/evmos.erc20.v1.RegisterERC20Proposal',
      title: '',
      description: '',
      erc20addresses: [],
    });

    expect(evmtx).toMatchObject({
      title: '',
      description: '',
      erc20addresses: [],
    });

    expect(evmtx.toData()).toMatchObject({
      '@type': '/evmos.erc20.v1.RegisterERC20Proposal',
      title: '',
      description: '',
      erc20addresses: [],
    });
  });
});
