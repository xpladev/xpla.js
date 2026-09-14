# xpla.js
Xpla.js is a JavaScript SDK for writing applications that interact with the Xpla blockchain from either Node.js, browser, or React Native environments and provides simple abstractions over core data structures, serialization, key management, and API request generation.

## Installation

Grab the latest version off [NPM](https://www.npmjs.com/package/@xpla/xpla.js):

```sh
npm i --save @xpla/xpla.js
```

## Timestamp migration

With `@xpla/xpla.proto` 1.11.0, Protobuf timestamps are represented by
`Timestamp` objects rather than `Date`. SDK wrappers now retain seconds and
nanoseconds internally, including transaction timeouts, evidence, authorization
and fee grants, governance, staking, Tendermint, IBC consensus state, and upgrade
plans. LCD signing-info jail times also return `Timestamp`.

```ts
import { BasicAllowance, Timestamp } from '@xpla/xpla.js';

const expiry = Timestamp.fromString('2024-01-01T00:00:00.123456789Z');
const allowance = new BasicAllowance({ axpla: '100' }, expiry);
allowance.expiration?.nanos; // 123456789
allowance.expiration?.toDate(); // Explicit conversion; loses sub-millisecond precision

// Existing Date constructor inputs are still supported and normalized to Timestamp.
new BasicAllowance({ axpla: '100' }, new Date());
```

Use `Timestamp.fromDate(date)` when assigning to a timestamp property. Use
`.toDate()` before calling Date methods such as `.getTime()`. Timestamp's
`.toISOString()` alias preserves all nanoseconds, unlike Date's implementation.
Missing timestamp values remain `undefined`; handle them with optional chaining.

`toData()` and `toString()` emit Protobuf JSON RFC3339 strings with zero, three,
six, or nine fractional digits. `toAmino()` follows the core's RFC3339Nano encoding,
removing trailing fractional zeros. Both preserve nanoseconds. Timestamp also
accepts the original `{ seconds, nanos }` object in `fromData()`, but `toData()`
now emits a string. Invalid dates, fractional/out-of-range seconds and nanos, and
RFC3339 fractions exceeding nine digits are rejected.

Integer IBC packet timeouts, vesting timestamps and Duration values keep their
existing types. RFC3339 parsing and formatting are implemented in xpla.js;
no custom Timestamp JSON helper is required from xpla.proto. SDK `toData()`
continues to emit RFC3339 strings even though the underlying proto's `toJSON()`
uses raw Timestamp objects.

## License

This software is licensed under the MIT license. See [LICENSE](./LICENSE) for full disclosure.

© 2022 Xpla.
