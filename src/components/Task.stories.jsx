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

export const LongTitle = Template.bind({});
const longTitleString = `This task's name is absurdly large. In fact, I think if I keep going I might end up with content overflow. What will happen? The star that represents a pinned task could have text overlapping. The text could cut-off abruptly when it reaches the star. I hope not!`;
LongTitle.args = {
  task: {
    ...DEFAULT_TASK,
    title: longTitleString,
  },
};
