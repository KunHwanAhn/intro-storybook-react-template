import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { rest } from 'msw';
import {
  fireEvent,
  within,
  waitFor,
  waitForElementToBeRemoved,
} from '@storybook/testing-library';

import store from '../lib/store.js';
import { MOCKED_STATE } from './TaskList.stories.jsx';

import InboxScreen from './InboxScreen.jsx';

export default {
  component: InboxScreen,
  title: 'InboxScreen',
  decorators: [
    (Story) => (
      <StoreProvider store={store}>
        <Story />
      </StoreProvider>
    ),
  ],
};

const Template = () => <InboxScreen />;

export const Default = Template.bind({});
Default.parameters = {
  msw: {
    handlers: [
      rest.get(
        'https://jsonplaceholder.typicode.com/todos?userId=1',
        (req, res, ctx) => {
          return res(ctx.json(MOCKED_STATE.tasks));
        },
      ),
    ],
  }
};
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await waitForElementToBeRemoved(await canvas.findByTestId('loading'));
  await waitFor(async () => {
    fireEvent.click(canvas.getByLabelText('pinTask-1'));
    fireEvent.click(canvas.getByLabelText('pinTask-3'));
  });
};

export const Error = Template.bind({});
Error.parameters = {
  msw: {
    handlers: [
      rest.get(
        'https://jsonplaceholder.typicode.com/todos?userId=1',
        (req, res, ctx) => {
          return res(ctx.status(403));
        },
      ),
    ],
  }
};
