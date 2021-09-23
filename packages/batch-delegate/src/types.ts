import DataLoader from 'dataloader';

import { IDelegateToSchemaOptions } from '@graphql-tools/delegate';

export type BatchDelegateFn<TContext = Record<string, any>, K = any> = (
  batchDelegateOptions: BatchDelegateOptions<TContext, K>
) => any;

export interface CreateBatchDelegateFnOptions<TContext = Record<string, any>, K = any, V = any, C = K>
  extends Partial<Omit<IDelegateToSchemaOptions<TContext>, 'args' | 'info'>> {
  dataLoaderOptions?: DataLoader.Options<K, V, C>;
  argsFromKeys?: (keys: ReadonlyArray<K>) => Record<string, any>;
}

export interface BatchDelegateOptions<TContext = Record<string, any>, K = any, V = any, C = K>
  extends Omit<IDelegateToSchemaOptions<TContext>, 'args'> {
  dataLoaderOptions?: DataLoader.Options<K, V, C>;
  key: K | Array<K>;
  argsFromKeys?: (keys: ReadonlyArray<K>) => Record<string, any>;
}
