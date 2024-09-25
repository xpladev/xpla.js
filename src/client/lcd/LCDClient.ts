import { APIRequester } from './APIRequester';
import {
  AuthAPI,
  BankAPI,
  ConsensusAPI,
  DistributionAPI,
  ERC20API,
  EvmAPI,
  FeeGrantAPI,
  GovAPI,
  MintAPI,
  AuthzAPI,
  SlashingAPI,
  StakingAPI,
  TendermintAPI,
  WasmAPI,
  XplaAPI,
  TxAPI,
  IbcTransferAPI,
  IbcAPI,
} from './api';
import { LCDUtils } from './LCDUtils';
import { Wallet } from './Wallet';
import { Numeric } from '../../core/numeric';
import { Coins } from '../../core/Coins';
import { Key } from '../../key';

export interface LCDClientConfig {
  /**
   * The base URL to which LCD requests will be made.
   */
  URL: string;

  /**
   * Chain ID of the blockchain to connect to.
   */
  chainID: string;

  /**
   * Coins representing the default gas prices to use for fee estimation.
   */
  gasPrices?: Coins.Input;

  /**
   * Number presenting the default gas adjustment value to use for fee estimation.
   */
  gasAdjustment?: Numeric.Input;

  /**
   * is it connected to forked network?
   */
  isClassic?: boolean;
}

const DEFAULT_LCD_OPTIONS: Partial<LCDClientConfig> = {
  gasAdjustment: 1.75,
};

// isClassic network: true
// forked network : false
const DEFAULT_NETWORK_TYPE_BY_CHAIN_ID: { [key: string]: boolean } = {
  default: false,
  'dimension_37-1': false,
  'cube_47-5': false,
};

const DEFAULT_GAS_PRICES_BY_CHAIN_ID: { [key: string]: Coins.Input } = {
  default: {
    axpla: 850000000000,
  },
  'dimension_37-1': {
    axpla: 850000000000,
  },
  'cube_47-5': {
    axpla: 850000000000,
  },
};

/**
 * An object repesenting a connection to a xplad node running the Lite Client Daemon (LCD)
 * server, a REST server providing access to a node.
 *
 * ### Example
 *
 * ```ts
 * import { LCDClient, Coin } from 'xpla.js';
 *
 * const xpla = new LCDClient({
 *    URL: "https://cube-lcd.xpla.dev",
 *    chainID: "cube_47-5"
 * });
 * ```
 */

export class LCDClient {
  public config: LCDClientConfig;
  public apiRequester: APIRequester;

  // API access
  public auth: AuthAPI;
  public bank: BankAPI;
  public consensus: ConsensusAPI;
  public distribution: DistributionAPI;
  public erc20: ERC20API;
  public evm: EvmAPI;
  public feeGrant: FeeGrantAPI;
  public gov: GovAPI;
  public mint: MintAPI;
  public authz: AuthzAPI;
  public slashing: SlashingAPI;
  public staking: StakingAPI;
  public tendermint: TendermintAPI;
  public wasm: WasmAPI;
  public xpla: XplaAPI;
  public tx: TxAPI;
  public ibc: IbcAPI;
  public ibcTransfer: IbcTransferAPI;
  public utils: LCDUtils;

  /**
   * Creates a new LCD client with the specified configuration.
   *
   * @param config LCD configuration
   */
  constructor(config: LCDClientConfig) {
    this.config = {
      ...DEFAULT_LCD_OPTIONS,
      gasPrices:
        DEFAULT_GAS_PRICES_BY_CHAIN_ID[config.chainID] ||
        DEFAULT_GAS_PRICES_BY_CHAIN_ID['default'],
      isClassic:
        DEFAULT_NETWORK_TYPE_BY_CHAIN_ID[config.chainID] ||
        DEFAULT_NETWORK_TYPE_BY_CHAIN_ID['default'],
      ...config,
    };

    this.apiRequester = new APIRequester(this.config.URL);

    // instantiate APIs
    this.auth = new AuthAPI(this);
    this.authz = new AuthzAPI(this);
    this.bank = new BankAPI(this);
    this.consensus = new ConsensusAPI(this);
    this.distribution = new DistributionAPI(this);
    this.erc20 = new ERC20API(this);
    this.evm = new EvmAPI(this);
    this.feeGrant = new FeeGrantAPI(this);
    this.gov = new GovAPI(this);
    this.mint = new MintAPI(this);
    this.slashing = new SlashingAPI(this);
    this.staking = new StakingAPI(this);
    this.tendermint = new TendermintAPI(this);
    this.wasm = new WasmAPI(this);
    this.xpla = new XplaAPI(this);
    this.tx = new TxAPI(this);
    this.ibc = new IbcAPI(this);
    this.ibcTransfer = new IbcTransferAPI(this);
    this.utils = new LCDUtils(this);
  }

  /** Creates a new wallet with the Key. */
  public wallet(key: Key): Wallet {
    key.evm = false;
    return new Wallet(this, key);
  }

  /** Get the LCD node info. */
  public async info(): Promise<any> {
    return this.tendermint.nodeInfo();
  }

  /** Get the latest block height. */
  public async latestHeight(): Promise<number> {
    const latestBlock = await this.tendermint.blockInfo();
    return parseInt(latestBlock.block.header.height);
  }

  /**
   * Wait for new block.
   * If the interval is too short and call api frequently, the LCD may reject the connection.
   * @param interval wait interval in milliseconds. default is 500ms.
   * @returns latest block height
   */
  public async waitForNewHeight(interval: number = 500): Promise<number> {
    const curHeight = await this.latestHeight();
    let newHeight = curHeight;
    while (curHeight === newHeight) {
      await new Promise(resolve => setTimeout(resolve, interval));
      newHeight = await this.latestHeight();
    }
    return newHeight;
  }

  public async baseConfig(): Promise<any> {
    return this.apiRequester.get<any>('/cosmos/base/node/v1beta1/config', {});
  }

  public async parameterKeys(): Promise<any> {
    return this.apiRequester
      .get<{ subspaces: any }>('/cosmos/params/v1beta1/subspaces', {})
      .then(d => d.subspaces);
  }
  public async parameter(subspace: string, key: string): Promise<any> {
    return this.apiRequester
      .get<{ param: any }>('/cosmos/params/v1beta1/params', {
        subspace,
        key,
      })
      .then(d => d.param);
  }

  public async getGasPrices(): Promise<Coins> {
    if (!this.config.gasPrices) {
      return Promise.reject(this.config.gasPrices);
    }
    return Promise.resolve(this.config.gasPrices as Coins);
  }
}
