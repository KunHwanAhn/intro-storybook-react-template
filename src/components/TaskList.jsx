import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateTaskState } from '../lib/store.js';

import Task from './Task.jsx';

export default function TaskList() {
  const tasks = useSelector((state) => {
    const tasksInOrder = [
      ...state.taskbox.tasks.filter((task) => task.state === 'TASK_PINNED'),
      ...state.taskbox.tasks.filter((task) => task.state !== 'TASK_PINNED'),
    ];

    return tasksInOrder.filter((task) => task.state === 'TASK_INBOX' || task.state === 'TASK_PINNED');
  });

  const { status } = useSelector((state) => state.taskbox);
  const dispatch = useDispatch();

  const pinTask = (id) => {
    dispatch(updateTaskState({ id, newTaskState: 'TASK_PINNED' }));
  }

  const archiveTask = (id) => {
    dispatch(updateTaskState({ id, newTaskState: 'TASK_ARCHIVED' }));
  }

  const LoadingRow = (
    <div className="loading-item">
      <span className="glow-checkbox" />
      <span className="glow-text">
        <span>Loading</span> <span>cool</span> <span>state</span>
      </span>
    </div>
  );

  if (status === 'loading') {
    return (
      <div
        className="list-items"
        data-testid="loading"
        key={'loading'}
        >
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div
        className="list-items"
        data-testid="empty"
        key={'empty'}
      >
        <div className="wrapper-message">
          <span className="icon-check" />
          <p className="title-message">You have no tasks</p>
          <p className="subtitle-message">Sit back and relax</p>
        </div>
      </div>
    );
  }

  const tasksInOrder = [
    ...tasks.filter((task) => task.state === 'TASK_PINNED'),
    ...tasks.filter((task) => task.state !== 'TASK_PINNED'),
  ];

  return (
    <div className="list-items">
      {tasksInOrder.map((task) => (
        <Task
          key={task.id}
          task={task}
          onPinTask={(id) => { pinTask(id); }}
          onArchiveTask={(id) => { archiveTask(id); }}
        />
      ))}
    </div>
  );
}
