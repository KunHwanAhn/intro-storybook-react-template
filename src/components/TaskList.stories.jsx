import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';

import TaskList from './TaskList.jsx';
import { DEFAULT_TASK } from './Task.stories.jsx';

export const MOCKED_STATE = {
  tasks: [
    { ...DEFAULT_TASK, id: '1', title: 'Task 1' },
    { ...DEFAULT_TASK, id: '2', title: 'Task 2' },
    { ...DEFAULT_TASK, id: '3', title: 'Task 3' },
    { ...DEFAULT_TASK, id: '4', title: 'Task 4' },
    { ...DEFAULT_TASK, id: '5', title: 'Task 5' },
    { ...DEFAULT_TASK, id: '6', title: 'Task 6' },
  ],
  status: 'idle',
  error: null,
};

const MockStore = ({ state, children }) => (
  <StoreProvider
    store={configureStore({
      reducer: {
        taskbox: createSlice({
          name: 'taskbox',
          initialState: state,
          reducers: {
            updateTaskState: (state, action) => {
              const { id, newTaskState } = action.payload;
              const taskIndex = state.tasks.findIndex((task)=> task.id === id);

              if (taskIndex >= 0) {
                state.tasks[taskIndex].state = newTaskState;
              }
            }
          }
        }).reducer,
      }
    })}
  >
    {children}
  </StoreProvider>
);

export default {
  component: TaskList,
  title: 'TaskList',
  excludeStories: /.*MOCKED_STATE$/,
}

const Template = (args) => <TaskList />;

export const Default = Template.bind({});
Default.decorators = [
  (Story) => (
    <MockStore state={MOCKED_STATE}>
      <Story />
    </MockStore>
  ),
];

export const WithPinnedTasks = Template.bind({});
WithPinnedTasks.decorators = [
  (Story) => {
    const pinnedTasks = [
      ...MOCKED_STATE.tasks.slice(0, 5),
      { id: '6', title: 'Task 6 (pinned)', state: 'TASK_PINNED' },
    ];

    return (
      <MockStore
        state={{
          ...MOCKED_STATE,
          tasks: pinnedTasks,
        }}
      >
        <Story />
      </MockStore>
    );
  },
];

export const Loading = Template.bind({});
Loading.decorators = [
  (Story) => (
    <MockStore
      state={{
        ...MOCKED_STATE,
        status: 'loading',
      }}
    >
      <Story />
    </MockStore>
  )
];

export const Empty = Template.bind({});
Empty.decorators = [
  (Story) => (
    <MockStore
      state={{
        ...MOCKED_STATE,
        tasks: [],
      }}
    >
      <Story />
    </MockStore>
  )
];
