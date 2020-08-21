// Type definitions for zapier-platform-core
// Project: Zapier's Platform Core
// Definitions by: David Brownman <https://davidbrownman.com>

export * from './common';
export * from './schemas';
export * from './functionSignatures';

import { ZObject, Bundle } from './common';
import { PerformFunc } from './functionSignatures';
import { SerializableFunction, RequestObj, ZapierIntegration } from './schemas';

// The EXPORTED OBJECT
// at runtime, these types represent actual objects/functions that are imported. Therefore, they need to live in a .d.ts file
// everything else is for type info only, so it can be in either a .ts or .d.ts file

export const version: string;
export const tools: { env: { inject: (filename?: string) => void } };

// see: https://github.com/zapier/zapier-platform-cli/issues/339#issue-336888249
export const createAppTester: (
  appRaw: ZapierIntegration,
  options?: { customStoreKey?: string }
  // TODO: widen this
) => <T = PerformFunc | SerializableFunction | RequestObj>(
  func: T,
  bundle?: Partial<Bundle> // partial so we don't have to make a full bundle in tests
  // TODO: update this to match the fact that we got a return type
) => Promise<T extends PerformFunc ? ReturnType<T> : object | object[]>; // appTester always returns a promise
