//import { Account } from './Account';
//import { LazyGradedVestingAccount } from './LazyGradedVestingAccount';

export * from './Account';
export * from './BaseAccount';
export * from './BaseAccountTerra';
export * from './BaseVestingAccount';
export * from './LazyGradedVestingAccount';
export * from './ContinuousVestingAccount';
export * from './DelayedVestingAccount';
export * from './PeriodicVestingAccount';
export * from './EvmAccount';

// TODO : check whether used or not
// export function isVesting(
//   account: Account
// ): account is LazyGradedVestingAccount {
//   return account instanceof LazyGradedVestingAccount;
// }
