import { GraphQLSchema } from 'graphql';

import { SubschemaConfig, Transform, MergedTypeConfig, CreateProxyingResolverFn, BatchingOptions } from './types';

import { applySchemaTransforms } from './applySchemaTransforms';
import { Executor } from '@graphql-tools/utils';

export function isSubschema(value: any): value is Subschema {
  return Boolean(value.transformedSchema);
}

export class Subschema<K = any, V = any, C = K, TContext = Record<string, any>>
  implements SubschemaConfig<K, V, C, TContext>
{
  public schema: GraphQLSchema;

  public executor?: Executor<TContext>;
  public batch?: boolean;
  public batchingOptions?: BatchingOptions<K, V, C>;

  public createProxyingResolver?: CreateProxyingResolverFn<TContext>;
  public transforms: Array<Transform<any, TContext>>;
  public transformedSchema: GraphQLSchema;

  public merge?: Record<string, MergedTypeConfig<any, TContext>>;

  constructor(config: SubschemaConfig<K, V, C, TContext>) {
    this.schema = config.schema;

    this.executor = config.executor;
    this.batch = config.batch;
    this.batchingOptions = config.batchingOptions;

    this.createProxyingResolver = config.createProxyingResolver;
    this.transforms = config.transforms ?? [];
    this.transformedSchema = applySchemaTransforms(this.schema, config);

    this.merge = config.merge;
  }
}
