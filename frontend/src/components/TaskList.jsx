import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onToggleComplete, onDelete, onDragEnd }) => {
  if (!tasks.length) {
    return (
      <div className="card empty-state">
        <h3>No tasks yet</h3>
        <p>Add your first task to start planning your day.</p>
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="task-list">
        {(provided, snapshot) => (
          <div
            className={`task-list ${
              snapshot.isDraggingOver ? "task-list--dragging-over" : ""
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map((task, index) => (
              <Draggable key={task._id} draggableId={task._id} index={index}>
                {(provided, snapshot) => (
                  <TaskItem
                    task={task}
                    onToggleComplete={onToggleComplete}
                    onDelete={onDelete}
                    provided={provided}
                    snapshot={snapshot}
                  />
                )}
              </Draggable>
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
export default TaskList;