import { FaTrashAlt, FaCheckCircle, FaRegCircle, FaGripVertical } from "react-icons/fa";

const TaskItem = ({
  task,
  onToggleComplete,
  onDelete,
  provided,
  snapshot,
}) => {
  return (
    <div
      className={`task-item card ${task.completed ? "task-item--done" : ""} ${
        snapshot.isDragging ? "task-item--dragging" : ""
      }`}
      ref={provided.innerRef}
      {...provided.draggableProps}
    >
      <div className="task-item__main">
        <button
          className="task-item__drag-handle"
          type="button"
          aria-label={`Drag task ${task.title}`}
          {...provided.dragHandleProps}
        >
          <FaGripVertical />
        </button>

        <button
          className="task-item__toggle"
          onClick={() => onToggleComplete(task)}
          type="button"
          aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
        >
          {task.completed ? <FaCheckCircle /> : <FaRegCircle />}
        </button>

        <div className="task-item__content">
          <h3>{task.title}</h3>
          {task.description && <p>{task.description}</p>}

          <div className="task-item__meta">
            <span className={`badge badge--${task.category}`}>{task.category}</span>
            <span>{task.dueDate}</span>
            <span>{task.dueTime}</span>
          </div>
        </div>
      </div>

      <button
        className="btn btn--danger"
        onClick={() => onDelete(task._id)}
        type="button"
        aria-label={`Delete task ${task.title}`}
      >
        <FaTrashAlt />
      </button>
    </div>
  );
};

export default TaskItem;
