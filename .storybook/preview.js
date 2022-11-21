import React from 'react';
import {
  initialize as initializeMsw,
  mswDecorator,
} from 'msw-storybook-addon';

import '../src/index.css';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

initializeMsw();
export const decorators = [
  mswDecorator,
  (Story) => (
    <div style={{ padding: '3em' }}>
      <Story />
    </div>
  ),
];
