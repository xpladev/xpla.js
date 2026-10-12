import { Timestamp } from './Timestamp';
import { TxBody } from './Tx';
import { ProposalV1 } from './gov/v1/Proposal';
import { ProposalV1B1 } from './gov/v1beta1/Proposal';
import { TextProposal } from './gov/v1beta1/proposals/TextProposal';
import { MsgSubmitEvidence } from './evidence/msgs/MsgSubmitEvidence';
import { Equivocation } from './evidence/evidences/Equivocation';
import { TxBody as TxBody_pb } from '@xpla/xpla.proto/cosmos/tx/v1beta1/tx';
import { Proposal as ProposalV1_pb } from '@xpla/xpla.proto/cosmos/gov/v1/gov';
import { Proposal as ProposalV1B1_pb } from '@xpla/xpla.proto/cosmos/gov/v1beta1/gov';

// Exercise the full Msg dispatcher with the pinned proto module set.
const iso = '2024-01-01T00:00:00.123456789Z';
const time = Timestamp.fromString(iso);

it('preserves a transaction timeout and nested evidence through bytes and JSON', () => {
  const msg = new MsgSubmitEvidence(
    'submitter',
    new Equivocation(1, time, 2, 'address')
  );
  const body = new TxBody([msg], 'timestamp regression', 0, true, time);
  const bytes = body.toBytes();
  const restored = TxBody.fromProto(TxBody_pb.decode(bytes));
  expect(restored.timeout_timestamp?.toString()).toBe(iso);
  expect(
    (restored.messages[0] as MsgSubmitEvidence).evidence?.time?.nanos
  ).toBe(123456789);
  expect(restored.toBytes()).toEqual(bytes);
  expect(TxBody.fromData(restored.toData()).toBytes()).toEqual(bytes);
});

it('normalizes transaction Date inputs and preserves an absent timeout', () => {
  expect(
    new TxBody([], '', 0, true, new Date('2024-01-01T00:00:00.123Z'))
      .timeout_timestamp?.nanos
  ).toBe(123000000);
  expect(
    TxBody.fromProto(new TxBody([]).toProto()).timeout_timestamp
  ).toBeUndefined();
  expect(
    TxBody.fromData(new TxBody([]).toData()).timeout_timestamp
  ).toBeUndefined();
});

const fields = [
  'submit_time',
  'deposit_end_time',
  'voting_start_time',
  'voting_end_time',
];
const protoTimes = {
  submitTime: time.toProto(),
  depositEndTime: time.toProto(),
  votingStartTime: time.toProto(),
  votingEndTime: time.toProto(),
};

describe.each([
  ['gov v1', ProposalV1, ProposalV1_pb, {}],
  [
    'gov v1beta1',
    ProposalV1B1,
    ProposalV1B1_pb,
    { content: new TextProposal('title', 'description').packAny() },
  ],
] as const)('%s timestamps', (_name, Type, codec, extra) => {
  it.each(['proto', 'data', 'amino'] as const)(
    'retains all four timestamps through %s',
    format => {
      const model = (Type as any).fromProto(
        (codec as any).fromPartial({ ...extra, ...protoTimes })
      );
      const restored =
        format === 'proto'
          ? (Type as any).fromProto(model.toProto())
          : format === 'data'
            ? (Type as any).fromData(model.toData())
            : (Type as any).fromAmino(model.toAmino());
      for (const field of fields) expect(restored[field].toString()).toBe(iso);
      expect((codec as any).encode(restored.toProto()).finish()).toEqual(
        (codec as any).encode(model.toProto()).finish()
      );
    }
  );

  it('preserves absent governance times', () => {
    const model = (Type as any).fromProto((codec as any).fromPartial(extra));
    const restored = (Type as any).fromProto(model.toProto());
    for (const field of fields) expect(restored[field]).toBeUndefined();
  });
});
