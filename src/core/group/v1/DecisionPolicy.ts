import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import {
  ThresholdDecisionPolicy,
  PercentageDecisionPolicy,
} from '@xpla/xpla.proto/cosmos/group/v1/types';
import { Duration } from '../../Duration';
import { AnyData, anyFromData, anyToData } from '../../../util/any';

type Windows = { voting_period: string; min_execution_period: string };
export type DecisionPolicyData = {
  '@type': string;
  threshold?: string;
  percentage?: string;
  windows?: Windows;
};
export type DecisionPolicyAmino = {
  type: string;
  value: { threshold?: string; percentage?: string; windows?: Windows };
};

function policyType(type: string) {
  if (
    type === '/cosmos.group.v1.ThresholdDecisionPolicy' ||
    type === 'cosmos-sdk/ThresholdDecisionPolicy'
  ) {
    return {
      codec: ThresholdDecisionPolicy,
      field: 'threshold' as const,
      name: 'ThresholdDecisionPolicy',
    };
  }
  if (
    type === '/cosmos.group.v1.PercentageDecisionPolicy' ||
    type === 'cosmos-sdk/PercentageDecisionPolicy'
  ) {
    return {
      codec: PercentageDecisionPolicy,
      field: 'percentage' as const,
      name: 'PercentageDecisionPolicy',
    };
  }
  throw new Error(`Unsupported group decision policy: ${type}`);
}

export function decisionPolicyToData(
  value: Any | undefined
): DecisionPolicyData | AnyData | undefined {
  if (!value) return undefined;
  // Preserve opaque extension policies without interpreting their bytes.
  if (
    ![
      '/cosmos.group.v1.ThresholdDecisionPolicy',
      '/cosmos.group.v1.PercentageDecisionPolicy',
    ].includes(value.typeUrl)
  )
    return anyToData(value);
  return policyToJSON(value, false) as DecisionPolicyData;
}

export function decisionPolicyFromData(
  value: DecisionPolicyData | AnyData | Any | undefined
): Any | undefined {
  if (!value) return undefined;
  if ('typeUrl' in value) return anyFromData(value);
  return policyFromJSON(value['@type'], value, false);
}

export function decisionPolicyToAmino(
  value: Any | undefined
): DecisionPolicyAmino | undefined {
  if (!value) return undefined;
  return policyToJSON(value, true) as DecisionPolicyAmino;
}

export function decisionPolicyFromAmino(
  value: DecisionPolicyAmino | undefined
): Any | undefined {
  return value && policyFromJSON(value.type, value.value, true);
}

function policyToJSON(
  value: Any,
  amino: boolean
): DecisionPolicyData | DecisionPolicyAmino {
  const { codec, field, name } = policyType(value.typeUrl);
  const decoded = codec.decode(value.value);
  const duration = (d: { seconds: string; nanos: number } | undefined) => {
    const v = Duration.fromProto(d ?? { seconds: '0', nanos: 0 });
    return amino ? v.toAmino() : v.toString();
  };
  const body = {
    [field]:
      field === 'threshold'
        ? (decoded as ThresholdDecisionPolicy).threshold
        : (decoded as PercentageDecisionPolicy).percentage,
    windows: decoded.windows && {
      voting_period: duration(decoded.windows.votingPeriod),
      min_execution_period: duration(decoded.windows.minExecutionPeriod),
    },
  };
  return amino
    ? { type: `cosmos-sdk/${name}`, value: body }
    : { '@type': value.typeUrl, ...body };
}

function policyFromJSON(
  type: string,
  body: { threshold?: string; percentage?: string; windows?: Windows },
  amino: boolean
): Any {
  const { field, name } = policyType(type);
  if (typeof body[field] !== 'string')
    throw new TypeError(`Missing decision policy ${field}`);
  const duration = (value: string) =>
    (amino ? Duration.fromAmino(value) : Duration.fromString(value)).toProto();
  const windows = body.windows && {
    votingPeriod: duration(body.windows.voting_period),
    minExecutionPeriod: duration(body.windows.min_execution_period),
  };
  const value =
    field === 'threshold'
      ? ThresholdDecisionPolicy.encode({
          threshold: body.threshold!,
          windows,
        }).finish()
      : PercentageDecisionPolicy.encode({
          percentage: body.percentage!,
          windows,
        }).finish();
  return { typeUrl: `/cosmos.group.v1.${name}`, value };
}
