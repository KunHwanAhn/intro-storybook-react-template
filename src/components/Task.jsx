import React from 'react';
import PropTypes from 'prop-types';

/**
 *
 * @param {object} props
 * @param {object} props.task
 * @param {string} props.task.id
 * @param {string} props.task.title
 * @param {string} props.task.state
 * @param {function} props.onArchiveTask
 * @param {function} props.onPinTask
 * @returns
 */
export default function Task({ task: { id, title, state }, onArchiveTask, onPinTask }) {
  return (
    <div className={`list-item ${state}`}>
      <label
        htmlFor="checked"
        aria-label={`archiveTask-${id}`}
        className="checkbox"
      >
        <input
          type="checkbox"
          disabled={true}
          name="checked"
          id={`archiveTask-${id}`}
          checked={state === 'TASK_ARCHIVED'}
        />
        <span
          className="checkbox-custom"
          onClick={() => { onArchiveTask(id); }}
        />
      </label>

      <label
        htmlFor="title"
        aria-label={title}
        className="title"
      >
        <input
          type="text"
          value={title}
          readOnly={true}
          name="title"
          placeholder="Input title"
          style={{ textOverflow: 'ellipsis' }}
        />
      </label>

      {state !== 'TASK_ARCHIVED' && (
        <button
          key={`pinTask-${id}`}
          className="pin-button"
          id={`pinTask-${id}`}
          aria-label={`pinTask-${id}`}
          onClick={() => { onPinTask(id); }}
        >
          <span className="icon-star" />
        </button>
      )}
    </div>
  );
}

Task.propTypes = {
  /** Composition of task */
  task: PropTypes.shape({
    /** Id of the task */
    id: PropTypes.string.isRequired,
    /** Title of the task */
    title: PropTypes.string.isRequired,
    /** Current state of the task */
    state: PropTypes.string.isRequired,
  }).isRequired,
  /** Event to change the task to archived */
  onArchiveTask: PropTypes.func,
  /** Event to change the task to pinned */
  onPinTask: PropTypes.func,
};
