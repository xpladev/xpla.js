# xpla.js
Xpla.js is a JavaScript SDK for writing applications that interact with the Xpla blockchain from either Node.js, browser, or React Native environments and provides simple abstractions over core data structures, serialization, key management, and API request generation.

## Installation

Grab the latest version off [NPM](https://www.npmjs.com/package/@xpla/xpla.js):

```sh
npm i --save @xpla/xpla.js
```

## Development

Use Node.js 22 (`nvm use` reads the version in `.nvmrc`), then run `npm ci`.
The Node.js distribution requires Node 22.13 or later for CommonJS loading of
the ESM cryptography dependencies. Browser consumers can use `dist/bundle.js`.

- `npm run typecheck`: check library types without generating files.
- `npm run build`: rebuild CommonJS, bundler ESM, and browser/Node bundles.
- `npm run lint` and `npm run format`: check code and formatting separately.
- `npm run analyze`: generate optional browser/Node bundle reports.

Git hooks are not installed automatically; run the checks explicitly.

Behavioral tests are maintained in the separate `test-xpla.js` project, using
packages installed from the private npm registry. This SDK checkout does not
run Jest or reference that project's files. After publishing, reinstall the
package there and run `npm run test:offline`; use `npm run test:all` when the
testnet and transaction prerequisites are configured.

## Gas prices and transaction fees

Gas prices can change over time. Before estimating fees or creating a transaction,
call `getGasPrices()` on your `LCDClient` instance instead of relying on hard-coded
gas prices or startup defaults:

```typescript
// lcd is the LCDClient instance used to create and sign the transaction.
const gasPrices = await lcd.getGasPrices();
lcd.gasPrices(gasPrices);
```

`getGasPrices()` queries the connected chain but does not update the client's
configuration; `gasPrices(gasPrices)` applies the result to subsequent fee
estimation. Refresh it before new transactions, especially in long-running
applications. If the query fails, handle the error before submitting a
transaction rather than silently reusing a fixed price.

An explicitly supplied transaction fee is not recalculated by this update.
Prices may also change between estimation and inclusion, so a queried price
does not guarantee that a transaction will be accepted.

## Safe conversion to JavaScript numbers

Use `Int.isSafeInteger()` or `Dec.isSafeInteger()` before `toNumber()` when a
consumer requires a JavaScript number. It checks that the stored value is an
integer between `Number.MIN_SAFE_INTEGER` and `Number.MAX_SAFE_INTEGER`
(inclusive), and rejects NaN and infinities.

```ts
const sequence = new Int('123');
if (sequence.isSafeInteger()) {
  const numberSequence = sequence.toNumber();
}

new Int('9007199254740992').isSafeInteger(); // false, even though 2^53 is representable
new Int('18446744073709551615').isSafeInteger(); // false: retain Int or a string
new Dec('1.0').isSafeInteger(); // true
new Dec('1.5').isSafeInteger(); // false
new Dec('1.0000000000000000001').isSafeInteger(); // false, although toNumber() rounds to 1
```

This check does not make subsequent number arithmetic safe or recover precision
already lost before constructing an `Int` or `Dec`. Pass large values as strings.
Fractional `Dec` values always return false, even when exactly representable as a
number (such as 0.5). Existing `toNumber()` behavior
is unchanged and does not throw for unsafe integers.

## Smaller application bundles

The package's `module` field points to `dist/esm/index.js`. Bundlers that support
this field (such as webpack) can remove unused SDK modules from named imports:

```ts
import { Coin, Int } from '@xpla/xpla.js';

const coin = new Coin('axpla', new Int('18446744073709551615'));
```

Individual ESM modules are also available to bundler applications:

```ts
import { Coin } from '@xpla/xpla.js/dist/esm/core/Coin';
import { MsgSend } from '@xpla/xpla.js/dist/esm/core/bank/v1beta1/msgs/MsgSend';
```

These ESM files target bundlers and use extensionless module specifiers. For
native Node.js, keep importing `@xpla/xpla.js`; Node continues to load the existing
CommonJS entry, including when called from an ESM application. Existing
`dist/*` CommonJS paths and the `Xpla` UMD global in `dist/bundle.js` remain
available. Avoid mixing `dist/esm/*` with CommonJS `dist/*` paths in one app:
those builds define separate class instances.

Tree shaking requires a production build that preserves ESM imports until the
bundling step. Import named values rather than dynamically looking up exports on
the entire SDK namespace. The numeric initialization is retained in the
`sideEffects` allowlist so decimal precision is not lost during optimization.

The full UMD bundle still includes the complete public API. Keys and transaction
classes also retain the generic message decoder; they will not shrink as much as
standalone amounts or individual message types. Browser applications using Node
APIs may still need the polyfills shown in `webpack.config.js`; the ESM output is
not a pre-polyfilled standalone browser script.

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

Integer IBC packet timeouts and vesting timestamps use `Int` values. RFC3339 parsing and formatting are implemented in xpla.js;
no custom Timestamp JSON helper is required from xpla.proto. SDK `toData()`
continues to emit RFC3339 strings even though the underlying proto's `toJSON()`
uses raw Timestamp objects.

## Supported modules

Cosmos SDK `group` and `nft` modules are not enabled on XPLA and are not exposed
by this SDK. Their message classes, exports, and message dispatch entries have
been removed. Keep these modules excluded from future upgrades unless support
is explicitly enabled. This does not affect EVM NFT APIs or CosmWasm CW721.

## Transaction and allowance serialization

Amino sign documents include `unordered` when true and `timeout_timestamp` when
present, preserving nanoseconds with the core's RFC3339Nano format. Amino signing
rejects protobuf extension options, matching the core; use direct signing for
transactions with extensions.

`PeriodicAllowance.period` is now a `Duration`. Constructor numbers still mean
seconds (including fractional seconds); property assignments should use
`Duration.fromString('60s')`. Read `.period.seconds` and `.period.nanos` for the
components, or `.period.toString()` for the duration. REST data uses duration
strings such as `1.500000001s`; Amino uses total nanoseconds (`1500000001`). The
nested `basic` object has no `@type` or Amino `type`/`value` wrapper.

`TxBody` extension properties still contain protobuf `Any` objects. `fromData()`
and `toData()` convert known Ethereum, Web3 and DynamicFee options to/from LCD
JSON with `@type` and snake_case fields, including the legacy Ethermint types.
Current DynamicFee JSON prices are decimals; legacy Ethermint prices are integers.

Unknown types, or known types with additional wire fields, are preserved as
`{ type_url, value }`, where `value` is base64. This raw representation supports
SDK JSON round trips; it is not expanded LCD JSON. Unsupported expanded `@type`
objects throw instead of silently losing their contents. Supply raw Any bytes
for types without a supported JSON codec.

IBC client messages also accept expanded LCD JSON for Tendermint `Header`,
`ClientState`, `ConsensusState`, and `Misbehaviour`, and Wasm `ClientState`,
`ConsensusState`, and `ClientMessage`. RFC3339 timestamps and duration strings
retain nanosecond precision. Raw `{ typeUrl, value }` Any inputs remain supported;
IBC `toData()` continues to emit that raw representation.

Governance vote queries return empty results for active proposals with no votes.
For finalized or removed proposals, missing votes fall back to indexed transaction
history. Pass the returned `pagination.next_key` unchanged as `pagination.key`:
history cursors are opaque, scoped to the proposal and voter, and continue on the
history endpoint. History still requires retained, indexed transactions and
represents vote actions, including revotes.

## Protobuf 1.14 and 64-bit integers

This development branch uses `@xpla/xpla.proto@1.14.0`. Generated protobuf
64-bit fields are decimal strings. SDK models normalize the migrated fields to
`Int` (`Int64` is a type alias) and serialize them back to strings without
passing through JavaScript numbers.

This changes property and return types for account numbers, sequences, gas
limits, transaction heights, proposal/code IDs, IBC heights and packet
counters, and staking/vesting integer timestamps. Wallet account/sequence
queries and the migrated LCD code/upgrade queries also return `Int` values.
Existing safe number constructor arguments remain supported; use decimal strings
or `Int` for larger values. Unsafe number inputs, fractions, and values outside
the protobuf 64-bit range are rejected. Signed versus unsigned limits are also
checked by the corresponding protobuf encoder.

```typescript
const account = new BaseAccount(address, publicKey, '9007199254740993', '0');
const nextSequence = account.sequence.add(1);
console.log(account.account_number.toFixed()); // exact decimal string
```

Use `.eq()`, `.gt()`, `.add()`, and `.toFixed()` instead of strict number equality,
JavaScript arithmetic, or implicit number conversion. Use `.toNumber()` only when
the value is known to fit within `Number.MAX_SAFE_INTEGER`. JSON/Amino integer
fields remain strings; a few previously numeric IBC and legacy fields now emit
strings consistently as well. `Timestamp` and `Duration` retain their specialized
representations.

Ethereum address checksums now use the existing `@noble/hashes` Keccak implementation;
`eip55` and its separate Keccak dependency are no longer needed. Non-strict EVM
address validation accepts exactly 20 bytes of hexadecimal data after `0x`.

## License

This software is licensed under the MIT license. See [LICENSE](./LICENSE) for full disclosure.

© 2022 Xpla.
