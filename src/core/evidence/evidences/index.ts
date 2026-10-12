import { Equivocation } from './Equivocation';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';

export * from './Equivocation';

export type Evidence = Equivocation;

export namespace Evidence {
  export type Amino = Equivocation.Amino;
  export type Data = Equivocation.Data;
  export type Proto = Equivocation.Proto;

  export function fromAmino(
    data: Evidence.Amino,
    isClassic?: boolean
  ): Evidence {
    switch (data.type) {
      case 'cosmos-sdk/Equivocation':
        return Equivocation.fromAmino(data, isClassic);
      default:
        throw new Error(`not supported evidence ${(data as { type: string }).type}`);
    }
  }

  export function fromData(data: Evidence.Data, isClassic?: boolean): Evidence {
    switch (data['@type']) {
      case '/cosmos.evidence.v1beta1.Equivocation':
        return Equivocation.fromData(data, isClassic);
      default:
        throw new Error(
          `not supported evidence ${(data as { '@type': string })['@type']}`
        );
    }
  }

  export function fromProto(proto: Any, isClassic?: boolean): Evidence {
    switch (proto.typeUrl) {
      case '/cosmos.evidence.v1beta1.Equivocation':
        return Equivocation.unpackAny(proto, isClassic);
      default:
        throw new Error(`not supported evidence ${proto.typeUrl}`);
    }
  }
}
