import { Timestamp } from './Timestamp';
import { Int, Dec } from './numeric';
import { ValConsPublicKey } from './PublicKey';
import { Equivocation } from './evidence/evidences/Equivocation';
import { BasicAllowance } from './feegrant/allowances/BasicAllowance';
import { PeriodicAllowance } from './feegrant/allowances/PeriodicAllowance';
import { AuthorizationGrant } from './authz/authorizations/Authorization';
import { GenericAuthorization } from './authz/authorizations/GenericAuthorization';
import {
  AuthzGrant,
  MsgGrantAuthorization,
} from './authz/msgs/MsgGrantAuthorization';
import { UnbondingDelegationV1B1 } from './staking/v1beta1/UnbondingDelegation';
import { RedelegationV1B1 } from './staking/v1beta1/Redelegation';
import { ValidatorV1B1 } from './staking/v1beta1/Validator';
import { Header, CommitSig } from './tendermint/types';
import { ConsensusStateV1 } from './ibc/lightclient/tendermint/v1/ConsensusState';
import { PlanV1B1 } from './upgrade/v1beta1/Plan';
import { MsgSoftwareUpgradeV1B1 } from './upgrade/v1beta1/msgs/MsgSoftwareUpgrade';
import { SlashingAPI } from '../client/lcd/api/SlashingAPI';
import { LCDClient } from '../client/lcd/LCDClient';
import {
  Header as Header_pb,
  CommitSig as CommitSig_pb,
} from '@xpla/xpla.proto/tendermint/types/types';

const iso = '2024-01-01T00:00:00.123456789Z';
const time = Timestamp.fromString(iso);
const auth = new GenericAuthorization('/cosmos.bank.v1beta1.MsgSend');
const rates = () =>
  new ValidatorV1B1.CommissionRates(new Dec(0), new Dec(0), new Dec(0));

// Leaf imports deliberately avoid the missing legacy modules in the full SDK entrypoint.
const cases: [
  string,
  any,
  (t: Timestamp.Input | undefined) => any,
  string[],
][] = [
  [
    'evidence',
    Equivocation,
    t => new Equivocation('1', t, '2', 'address'),
    ['time'],
  ],
  [
    'fee grant',
    BasicAllowance,
    t => new BasicAllowance({ axpla: '100' }, t),
    ['expiration'],
  ],
  [
    'periodic fee grant',
    PeriodicAllowance,
    t =>
      new PeriodicAllowance(
        new BasicAllowance({ axpla: '100' }, t),
        60,
        { axpla: '10' },
        { axpla: '10' },
        t
      ),
    ['period_reset'],
  ],
  ['authorization', AuthzGrant, t => new AuthzGrant(auth, t), ['expiration']],
  [
    'authorization response',
    AuthorizationGrant,
    t => new AuthorizationGrant(auth, t, 'granter', 'grantee'),
    ['expiration'],
  ],
  [
    'unbonding',
    UnbondingDelegationV1B1.Entry,
    t => new UnbondingDelegationV1B1.Entry(new Int(10), new Int(5), 1, t),
    ['completion_time'],
  ],
  [
    'redelegation',
    RedelegationV1B1.Entry,
    t => new RedelegationV1B1.Entry(new Int(10), new Int(5), new Dec(1), 1, t),
    ['completion_time'],
  ],
  [
    'commission',
    ValidatorV1B1.Commission,
    t => new ValidatorV1B1.Commission(rates(), t),
    ['update_time'],
  ],
  [
    'validator',
    ValidatorV1B1,
    t =>
      new ValidatorV1B1(
        'validator',
        new ValConsPublicKey(Buffer.alloc(32, 1).toString('base64')),
        false,
        3,
        10,
        10,
        new ValidatorV1B1.Description('', '', '', '', ''),
        1,
        t,
        new ValidatorV1B1.Commission(rates(), t),
        1
      ),
    ['unbonding_time', 'commission.update_time'],
  ],
  [
    'upgrade',
    PlanV1B1,
    t => new PlanV1B1('upgrade', t, '100', '', undefined),
    ['time'],
  ],
];

function get(value: any, path: string): any {
  return path.split('.').reduce((obj, key) => obj[key], value);
}

describe.each(cases)('%s Timestamp conversion', (_name, Type, make, paths) => {
  it.each(['proto', 'data', 'amino'] as const)(
    'preserves nanos through %s',
    format => {
      const model = make(time);
      const restored =
        format === 'proto'
          ? Type.fromProto(model.toProto())
          : format === 'data'
            ? Type.fromData(model.toData())
            : Type.fromAmino(model.toAmino());
      for (const path of paths) {
        expect(get(restored, path)).toBeInstanceOf(Timestamp);
        expect(get(restored, path).toString()).toBe(iso);
      }
    }
  );

  it('preserves an absent time through protobuf', () => {
    const restored = Type.fromProto(make(undefined).toProto());
    for (const path of paths) expect(get(restored, path)).toBeUndefined();
  });

  it('normalizes existing Date constructor inputs', () => {
    const date = new Date('2024-01-01T00:00:00.123Z');
    const model = make(date);
    for (const path of paths) {
      expect(get(model, path)).toBeInstanceOf(Timestamp);
      expect(get(model, path).toDate()).toEqual(date);
    }
  });
});

it('preserves both nested timestamps in periodic allowance Any bytes', () => {
  const model = new PeriodicAllowance(
    new BasicAllowance({ axpla: '100' }, time),
    60,
    { axpla: '10' },
    { axpla: '10' },
    time
  );
  const restored = PeriodicAllowance.unpackAny(model.packAny());
  expect(restored.basic.expiration?.nanos).toBe(123456789);
  expect(restored.period_reset?.nanos).toBe(123456789);
  expect(restored.basic.spend_limit?.toData()).toEqual([
    { denom: 'axpla', amount: '100' },
  ]);
});

it('uses the complete nested plan codec in software upgrade messages', () => {
  const model = new MsgSoftwareUpgradeV1B1(
    'authority',
    new PlanV1B1('upgrade', time, '100', '', undefined)
  );
  const restored = MsgSoftwareUpgradeV1B1.unpackAny(model.packAny());
  expect(restored.plan?.time?.toString()).toBe(iso);
  expect(restored.plan?.height).toBe('100');
});

it('uses Go RFC3339Nano time strings in authorization Amino sign bytes', () => {
  const model = new MsgGrantAuthorization(
    'granter',
    'grantee',
    new AuthzGrant(auth, Timestamp.fromString('2024-01-01T00:00:00.100Z'))
  );
  expect(model.toAmino().value.grant.expiration).toBe('2024-01-01T00:00:00.1Z');
  expect(model.toData().grant.expiration).toBe('2024-01-01T00:00:00.100Z');
  expect(
    MsgGrantAuthorization.unpackAny(model.packAny()).grant.expiration?.nanos
  ).toBe(100000000);
});

it.each([
  ['header', Header, Header_pb, 'time'],
  ['commit signature', CommitSig, CommitSig_pb, 'timestamp'],
] as const)(
  'preserves %s wire bytes and JSON at nanosecond precision',
  (_name, Type, codec, field) => {
    const pb = (codec as any).fromPartial({ [field]: time.toProto() });
    const bytes = (codec as any).encode(pb).finish();
    const model = (Type as any).fromProto((codec as any).decode(bytes));
    expect(model.toData()[field]).toBe(iso);
    expect((codec as any).encode(model.toProto()).finish()).toEqual(bytes);
    expect((Type as any).fromData(model.toData())[field].toString()).toBe(iso);
    expect(
      (Type as any).fromProto((codec as any).fromPartial({}))[field]
    ).toBeUndefined();
  }
);

it('preserves IBC consensus timestamp through Any and JSON', () => {
  const model = new ConsensusStateV1(time, undefined, '');
  const restored = ConsensusStateV1.unpackAny(model.packAny());
  expect(restored.timestamp?.toString()).toBe(iso);
  expect(ConsensusStateV1.fromData(restored.toData()).timestamp?.nanos).toBe(
    123456789
  );
  expect(
    ConsensusStateV1.fromProto(
      new ConsensusStateV1(undefined, undefined, '').toProto()
    ).timestamp
  ).toBeUndefined();
});

it('retains jail-time nanos in both LCD signing-info methods', async () => {
  const info = {
    address: 'address',
    start_height: '1',
    index_offset: '2',
    jailed_until: iso,
    tombstoned: false,
    missed_blocks_counter: '3',
  };
  const get = jest
    .fn()
    .mockResolvedValueOnce({ val_signing_info: info })
    .mockResolvedValueOnce({ info: [info] });
  const api = new SlashingAPI({
    apiRequester: { get },
  } as unknown as LCDClient);
  expect((await api.signingInfo('address')).jailed_until.nanos).toBe(123456789);
  expect((await api.signingInfos())[0].jailed_until.toString()).toBe(iso);
});
