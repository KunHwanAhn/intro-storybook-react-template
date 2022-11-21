import React from 'react';

import Task from './Task.jsx';

export const DEFAULT_TASK = {
  id: '1',
  title: 'Test Task',
  state: 'TASK_INBOX',
};

export default {
  component: Task,
  title: 'Task',
  excludeStories: /.*DEFAULT_TASK$/,
};

const Template = (args) => <Task {...args} />;

export const Default = Template.bind({});
Default.args = {
  task: {
    ...DEFAULT_TASK,
  },
};

export const Pinned = Template.bind({});
Pinned.args = {
  task: {
    ...DEFAULT_TASK,
    state: 'TASK_PINNED',
  },
};

export const Archived = Template.bind({});
Archived.args = {
  task: {
    ...DEFAULT_TASK,
    state: 'TASK_ARCHIVED',
  },
};
