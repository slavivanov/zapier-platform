/* globals describe, expect, test */

declare var describe: any;
declare var test: any;
declare var expect: any;

import {
  Bundle,
  createAppTester,
  tools,
  PerformFunc,
  TriggerOperationPerformFunc,
} from 'zapier-platform-core';

import App from '../index';

const appTester = createAppTester(App);
tools.env.inject();

describe('movie', () => {
  test('list movies', async () => {
    // TODO: this no longer catches bad inputData keys
    const bundle = { inputData: { bad: true } };
    const results = await appTester(
      // TODO: this no longer catches wrong key for movie
      App.triggers?.movie.operation.perform as TriggerOperationPerformFunc,
      bundle
    );

    expect(results.length).toBeGreaterThan(0);

    const firstMovie = results[0];
    expect(firstMovie).toMatchObject({
      id: '1',
      title: 'title 1',
    });
  });
});
