// custom set of functions that can't be represented by a jsonschema
// IMPORTANT: they're referenced by name in the schema files, so don't rename these

import {
  ZObject,
  Bundle,
  HttpResponse,
  RawHttpResponse,
  HttpRequestOptions,
} from './common';

// import { RequestObj, SerializableFunction } from './schemas';

// HELPERS //
type MaybePromise<T> = T | Promise<T>;
type OperationFunc<T> = (
  z: ZObject,
  bundle: Bundle<{ genre: string }>
) => MaybePromise<T>;

// weird corner case to disallow serialized strings
export type NoStrings<T> = Exclude<T, string>;

// OPERATION //
type ArrayOfObjectsWithId = Array<{
  id: string | number;
  [k: string]: unknown;
}>;
export type TriggerOperationPerformFunc = OperationFunc<ArrayOfObjectsWithId>;
export type SearchOperationPerformFunc<B> = OperationFunc<Array<object>, B>;
export type CreateOperationPerformFunc<B> = OperationFunc<object, B>;
export type GenericFunction<B> = OperationFunc<unknown, B>;
export type PerformFunc = TriggerOperationPerformFunc;
// | SearchOperationPerformFunc
// | CreateOperationPerformFunc;

// MIDDLEWARE //

/**
 * A slimmed version of `ZObject` that can't make requests
 * as doing so in middleware would cause a loop
 */
export type ZObjectMiddleware = Omit<ZObject, 'request'>;

export type BeforeRequestMiddlewareFunction = (
  request: HttpRequestOptions,
  z: ZObjectMiddleware,
  bundle: Bundle
) => MaybePromise<HttpRequestOptions>;

export type AfterResponseMiddlewareFunction<T = HttpResponse> = (
  response: T,
  z: ZObjectMiddleware
) => MaybePromise<T>;

export type AfterRawResponseMiddlewareFunction = AfterResponseMiddlewareFunction<
  RawHttpResponse
>;

export type AfterMiddlewareFunction =
  | AfterResponseMiddlewareFunction
  | AfterRawResponseMiddlewareFunction;
