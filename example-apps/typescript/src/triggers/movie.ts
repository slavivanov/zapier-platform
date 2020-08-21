import { TriggerOperationPerformFunc, Trigger } from 'zapier-platform-core';

// empty object denotes that there's no inputData
const perform: TriggerOperationPerformFunc<{ cool: string }> = async (
  z,
  bundle
) => {
  const response = await z.request(
    'https://auth-json-server.zapier-staging.com/movies'
  );

  return response.data as Array<{ id: string; name: string }>;
};

const trigger: Trigger = {
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

export default trigger;
