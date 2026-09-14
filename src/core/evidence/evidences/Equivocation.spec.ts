import { Equivocation } from './Equivocation';
import { MsgSubmitEvidence } from '../msgs/MsgSubmitEvidence';

describe('Equivocation', () => {
  const data: Equivocation.Data = {
    '@type': '/cosmos.evidence.v1beta1.Equivocation',
    height: '123',
    time: '2024-01-01T00:00:00.123456789Z',
    power: '100',
    consensus_address: 'xplaconsensus1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqcrqjpk',
  };

  it('preserves nanoseconds through proto Any round trip', () => {
    const evidence = Equivocation.fromData(data);
    const any = evidence.packAny();

    expect(any.typeUrl).toEqual('/cosmos.evidence.v1beta1.Equivocation');
    expect(any.value.length).toBeGreaterThan(0);

    const unpacked = Equivocation.unpackAny(any);
    expect(unpacked.time?.nanos).toEqual(123456789);
    expect(unpacked.toData()).toEqual(data);
  });

  it('MsgSubmitEvidence packs nested Equivocation into non-empty Any', () => {
    const msg = MsgSubmitEvidence.fromData({
      '@type': '/cosmos.evidence.v1beta1.MsgSubmitEvidence',
      submitter: 'xpla1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqm2r3n',
      evidence: data,
    });

    const proto = msg.toProto();
    expect(proto.evidence?.typeUrl).toEqual(
      '/cosmos.evidence.v1beta1.Equivocation'
    );
    expect(proto.evidence?.value.length).toBeGreaterThan(0);

    const roundTrip = MsgSubmitEvidence.fromProto(proto);
    expect(roundTrip.toData().evidence).toEqual(data);
  });
});
