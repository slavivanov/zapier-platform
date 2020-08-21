import {
  Bundle,
  HttpRequestOptions,
  ZObject,
  ZapierIntegration,
  BeforeRequestMiddlewareFunction,
  HttpResponse,
  ZObjectMiddleware,
  RawHttpResponse,
  AfterResponseMiddlewareFunction,
  AfterRawResponseMiddlewareFunction,
} from 'zapier-platform-core';

import MovieCreate from './creates/movie';
import MovieTrigger from './triggers/movie';
import { version as platformVersion } from 'zapier-platform-core';

const { version } = require('../package.json');

const addApiKeyHeader: BeforeRequestMiddlewareFunction = (req, z, bundle) => {
  // Hard-coded api key just to demo. DON'T do auth like this for your production app!
  req.headers = req.headers || {};
  req.headers['X-Api-Key'] = 'secret';
  return req;
};

const after: AfterRawResponseMiddlewareFunction = (res, z) => res;

const integration: ZapierIntegration = {
  version,
  platformVersion,

  beforeRequest: [addApiKeyHeader, 'oops'],
  afterResponse: [(res: HttpResponse, z: ZObjectMiddleware) => res, after],

  triggers: {
    [MovieTrigger.key]: MovieTrigger,
  },

  creates: {
    [MovieCreate.key]: MovieCreate,
  },
};

export default integration;
