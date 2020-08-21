import {
  Bundle,
  ZObject,
  TriggerOperationPerformFunc,
  AfterResponseMiddlewareFunction,
} from 'zapier-platform-core';

const perform: TriggerOperationPerformFunc = async (z, bundle) => {
  const response = await z.request(
    'https://auth-json-server.zapier-staging.com/movies'
  );
  bundle.inputData.genre;
  return response.data as Array<{ name: string; id: string }>;
};

export default {
  key: 'movie',
  noun: 'Movie',

  display: {
    label: 'New Movie',
    description: 'Triggers when a new movie is created.',
  },

  operation: {
    perform,
    sample: {
      id: '1',
      title: 'example',
    },
  },
};
