import { useState } from "react";
import { useParams } from "react-router-dom";

import "../styles/task.css";

import { useBoard } from "../hooks/useBoard";
import TaskCard from "./TaskCard";
import TaskDrawer from "./TaskDrawer";

const TasksBoard = () => {
  const { boardId } = useParams();
  const { board, tasks, saveTask, deleteTask, error, updateBoardField } = useBoard(boardId);
  const [selectedTask, setSelectedTask] = useState(null);
  const [tooltip, setTooltip] = useState("");
  const showTooltip = (message) => {
    setTooltip(message);
    setTimeout(() => setTooltip(""), 2000);
  };

  const createEmptyTask = () => ({ boardId, name: "", description: "", status: "", icon: "", isNew: true });

  const openTask = (task) => setSelectedTask(task ?? createEmptyTask());
  const closeDrawer = () => setSelectedTask(null);

  if (error) return <p>{error}</p>;

  return (
    <>
      <main className="board-container">
        <header className="board-header">
          <img src="/icons/logo.svg" alt="logo" className="board-logo" />
          <div>
            <input
              className="board-title"
              value={board.name}
              onChange={(e) => updateBoardField("name", e.target.value)}
              aria-label="Board Name"
            />
            <p className="board-subtitle">Tasks to keep organised</p>
          </div>
        </header>
        <section>
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} onSelect={() => openTask(task)} />
          ))}
          <div className="task-card task-card-add" onClick={() => openTask(createEmptyTask())}>
            <div className="add-icon">
              <img src="/icons/add_round_duotone.svg" alt="Add icon" width={25} height={25} />
            </div>
            <h3>Add new task</h3>
          </div>
        </section>
      </main>
      {selectedTask && (
        <TaskDrawer
          task={selectedTask}
          onClose={closeDrawer}
          saveTask={saveTask}
          deleteTask={deleteTask}
          showTooltip={showTooltip}
        />      
      )}
      {tooltip && <div className="drawer-tooltip">{tooltip}</div>}
    </>
  );
};

export default TasksBoard;
