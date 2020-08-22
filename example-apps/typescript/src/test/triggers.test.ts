/* globals describe, expect, test */

declare var describe: any;
declare var test: any;
declare var expect: any;

import {
  createAppTester,
  tools,
  TriggerOperationPerformFunc,
  ZapierIntegration,
  Bundle,
} from 'zapier-platform-core';

import App from '../index';
import trigger, { perform } from '../triggers/movie';

const appTester = createAppTester(App);
tools.env.inject();

type T = typeof trigger.operation.perform;

describe('movie', () => {
  test('list movies', async () => {
    // TODO: this no longer catches bad inputData keys
    const bundle = {
      inputData: { bad: true },
      // @ts-expect-error
      whack: true,
    };
    const results = (await appTester(
      // TODO: this no longer catches wrong key for movie

      perform,
      // {
      //   inputData: { bad: true },
      //   whack: true,
      // }
      bundle
    )) as Array<{ id: string; title: string }>;

    expect(results.length).toBeGreaterThan(0);

    const firstMovie = results[0];
    expect(firstMovie).toMatchObject({
      id: '1',
      title: 'title 1',
    });
  });
});
