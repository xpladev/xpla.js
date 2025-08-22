import { LCDClient } from './LCDClient';
import { Validator } from '../../core/staking';
import { Numeric, Dec, Coin } from '../../core';

interface ValidatorWithVotingPower {
  validatorInfo: Validator;
  votingPower: number;
  proposerPriority: number;
}

export interface Cw20TokenInfoResponse {
  name:         string;
  symbol:       string;
  decimals:     number;
  total_supply: string;
}

export interface AmountFormat {
  denom?:    string;                // for native token
  cw20?:     Cw20TokenInfoResponse; // for cw20 token contract
  symbol?:   string;                // symbol
  decimals?: number;                // decimals
  comma?:    string | false;        // with thousand comma
  fixed?:    number | false;        // fixed fraction
  unit?:     boolean;               // display unit
  micro?:    boolean;               // use micro unit
}

const DEFAULT_TOKEN: AmountFormat = {
  denom: 'axpla',
  decimals: 18,
};

const DEFAULT_AMOUNT_FORMAT: AmountFormat = {
  comma: ',',
  unit: true,
};

const EXP_UNIT_PREFIXES: { [key: string]: number } = {
  'Y': 24,  // yotta
  'Z': 21,  // zetta
  'E': 18,  // exa
  'P': 15,  // peta
  'T': 12,  // tera
  'G': 9,   // giga
  'M': 6,   // mega
  'K': 3,   // kilo
  'k': 3,   // kilo
  'H': 2,   // hecto
  'h': 2,   // hecto
  'D': 1,   // deka
  '': 0,    // none
  'd': -1,  // deci
  'c': -2,  // centi
  'm': -3,  // milli
  'u': -6,  // micro
  'μ': -6,  // micro
  'n': -9,  // nano
  'p': -12, // pico
  'f': -15, // femto
  'a': -18, // atto
  'z': -21, // zepto
  'y': -24, // yocto  
};

const rev_EXP_UNIT_PREFIXES = (decimals: number): { unit: string, exp: number } => {
  if (decimals == 0) return { unit: '', exp: 0 };

  if (decimals >= 24) return { unit: 'Y', exp: decimals - 24 };
  if (decimals >= 21) return { unit: 'Z', exp: decimals - 21 };
  if (decimals >= 18) return { unit: 'E', exp: decimals - 18 };
  if (decimals >= 15) return { unit: 'P', exp: decimals - 15 };
  if (decimals >= 12) return { unit: 'T', exp: decimals - 12 };
  if (decimals >= 9) return { unit: 'G', exp: decimals - 9 };
  if (decimals >= 6) return { unit: 'M', exp: decimals - 6 };
  if (decimals >= 3) return { unit: 'K', exp: decimals - 3 };
  if (decimals >= 2) return { unit: 'H', exp: decimals - 2 };
  if (decimals >= 1) return { unit: 'D', exp: decimals - 1 };

  if (decimals >= -1) return { unit: 'd', exp: decimals + 1 };
  if (decimals >= -2) return { unit: 'c', exp: decimals + 2 };
  if (decimals >= -3) return { unit: 'm', exp: decimals + 3 };
  if (decimals >= -6) return { unit: 'u', exp: decimals + 6 };
  if (decimals >= -9) return { unit: 'n', exp: decimals + 9 };
  if (decimals >= -12) return { unit: 'p', exp: decimals + 12 };
  if (decimals >= -15) return { unit: 'f', exp: decimals + 15 };
  if (decimals >= -18) return { unit: 'a', exp: decimals + 18 };
  if (decimals >= -21) return { unit: 'z', exp: decimals + 21 };
  if (decimals >= -24) return { unit: 'y', exp: decimals + 24 };

  return { unit: '?', exp: decimals };
};

const ASIAN_UNITS = {
  ko: ['', '만', '억', '조', '경', '해', '자', '양', '구', '간', '정', '재', '극'],
  cn: ['', '萬', '億', '兆', '京', '垓', '秭', '穰', '溝', '澗', '正', '載', '極'], // 중국 정자
  zh: ['', '万', '亿', '兆', '京', '垓', '秭', '穰', '沟', '涧', '正', '载', '极'], // 중국 간체
  ja: ['', '万', '億', '兆', '京', '垓', '秭', '穰', '溝', '澗', '正', '載', '極'],
};
const UNIT_FORMAT_PRESETS: { [key: string]: keyof typeof ASIAN_UNITS } = {
  '만': 'ko',
  'ko': 'ko',
  'korean': 'ko',

  '萬': 'cn',
  'cn': 'cn',
  'chinese': 'cn',

  '万': 'zh',
  'zh': 'zh',
  'chinese_simplified': 'zh',

  'ja': 'ja',
  'japanese': 'ja',
};
function formatAsianUnits(numStr: string, units: string[]): string {
  const digitsOnly = numStr.replace(/\D/g, '');
  if (!digitsOnly) return '0';

  const reversed = digitsOnly.split('').reverse();
  const groups: string[] = [];

  for (let i = 0; i < reversed.length; i += 4) {
    groups.push(reversed.slice(i, i + 4).reverse().join(''));
  }

  const formatted = groups
    .map((group, i) => {
      if (group === '0000' || group === '0') return null;
      return `${parseInt(group)}${units[i]}`;
    })
    .filter(Boolean)
    .reverse()
    .join('');

  return formatted || '0';
}

export class LCDUtils {
  constructor(public lcd: LCDClient) {}

  public async getCw20TokenInfo(contract: string): Promise<Cw20TokenInfoResponse> {
    return this.lcd.wasm.contractQuery<Cw20TokenInfoResponse>(contract, {
      token_info: {}
    });
  }

  public formatAmount(amount: Numeric.Input, format?: AmountFormat): string {
    const config = {
      ...DEFAULT_AMOUNT_FORMAT,
      ...(!format?.denom && !format?.cw20 ? DEFAULT_TOKEN : {}),
      ...format,
    };

    if (config.cw20) {
      if (!config.symbol)
        config.symbol = config.cw20.symbol;
      if (!config.decimals)
        config.decimals = config.cw20.decimals;
    }
    else if (config.denom) {
      const micro_unit = config.denom.at(0) ?? '';
      if (EXP_UNIT_PREFIXES[micro_unit]) {
        if (!config.decimals)
          config.decimals = -EXP_UNIT_PREFIXES[micro_unit];
        config.symbol = config.denom.slice(1).toUpperCase();
      }
      else {
        if (!config.decimals)
          config.decimals = 0;
        config.symbol = config.denom.toUpperCase();
      }
    }

    const org_amount = new Dec(amount);
    let output: string;
    if (config.micro === true) {
      const micro = rev_EXP_UNIT_PREFIXES(-(config.decimals ?? 18));
      if (micro.exp !== 0) {
        const dec = new Dec(10).pow(micro.exp);
        const val_amount = org_amount.mul(dec);
        output = config.fixed ? val_amount.toFixed(config.fixed) : val_amount.toString();
      }
      else {
        output = config.fixed ? org_amount.toFixed(config.fixed) : org_amount.toString();
      }
      config.symbol = micro.unit + (config.symbol?.toLocaleLowerCase() ?? '');
    }
    else {
      const dec = new Dec(10).pow(config.decimals ?? 18);
      const val_amount = org_amount.div(dec);
      output = config.fixed ? val_amount.toFixed(config.fixed) : val_amount.toString();
    }

    let [ intPart, fracPart ] = output.split('.');
    const preset = typeof config.comma === 'string' && UNIT_FORMAT_PRESETS[config.comma];
    if (preset)
      intPart = formatAsianUnits(intPart, ASIAN_UNITS[preset]);
    else if (typeof config.comma === 'string')
      intPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, config.comma);
    if (typeof config.fixed !== 'number' && fracPart !== undefined)
      fracPart = fracPart.replace(/0+$/, ''); // 뒤쪽 0 제거
    output = fracPart !== undefined && fracPart.length > 0 ? `${intPart}.${fracPart}` : intPart;

    if (config.unit && config.symbol) {
      if (config.micro !== true) {
        output += ' ';
      }
      output += config.symbol ?? '';
    }
    return output;
  }

  public readAmount(micro_unit: Numeric.Input, decimals?: number): Dec {
    if (typeof micro_unit === 'string') {
      micro_unit = micro_unit.replace(/[^0-9.]/g, '');
    }
    let output = new Dec(micro_unit);
    output = output.div(new Dec(10).pow(decimals ?? 18));
    return output;
  }

  public toAmount(macro_unit: Numeric.Input, decimals?: number): Dec {
    if (typeof macro_unit === 'string') {
      macro_unit = macro_unit.replace(/[^0-9.]/g, '');
    }
    let output = new Dec(macro_unit);
    output = output.mul(new Dec(10).pow(decimals ?? 18));
    return output;
  }

  public toCoin(formatted: string, decimals?: number): Coin {
    const numStr = formatted.replace(/[^0-9.]/g, '');
    const unitMatch = formatted.match(/[^0-9.,+\-eE]+$/);
    const unitStr = unitMatch?.[0];

    let output = new Dec(numStr);
    let denom = DEFAULT_TOKEN.denom ?? 'axpla';

    if (unitStr && unitStr.length > 0) {
      const prefix = unitStr.at(0);
      if (prefix && EXP_UNIT_PREFIXES[prefix]) {
        // if (!decimals)
        //   decimals = -EXP_UNIT_PREFIXES[prefix];
        denom = unitStr.trim().toLowerCase();
      }
      else if (decimals) {
        const micro = rev_EXP_UNIT_PREFIXES(-decimals);
        decimals += micro.exp;
        denom = micro.unit + unitStr.trim().toLowerCase();
      }
    }
    if (decimals) {
      output = output.mul(new Dec(10).pow(decimals));
    }

    return new Coin(denom, output);
  }

  /**
   * Gets current validators and merges their voting power from the validator set query.
   */
  public async validatorsWithVotingPower(): Promise<{
    [validatorAddress: string]: ValidatorWithVotingPower;
  }> {
    const [validatorSet] = await this.lcd.tendermint.validatorSet();
    const validatorSetByPubKey = validatorSet.reduce((m: any, o) => {
      m[o.pub_key.key] = o;
      return m;
    }, {});

    const validators: Validator[] = [];
    let next_key: string | undefined;
    for (;;) {
      const validatorsRes = await this.lcd.staking.validators({
        'pagination.key': next_key,
      });

      validators.push(...validatorsRes[0]);

      if (!validatorsRes[1].next_key) break;
      next_key = validatorsRes[1].next_key;
    }

    const res: { [k: string]: ValidatorWithVotingPower } = {};

    for (const v of validators) {
      const delegateInfo =
        validatorSetByPubKey[v.consensus_pubkey.toData().key as string];
      if (delegateInfo === undefined) continue;
      res[v.operator_address] = {
        validatorInfo: v,
        votingPower: Number.parseInt(delegateInfo.voting_power),
        proposerPriority: Number.parseInt(delegateInfo.proposer_priority),
      };
    }

    return res;
  }
}
