import { useParams } from "react-router-dom";

import "../task.css";

import TaskCard from "./TaskCard";
import { useBoard } from "../hooks/useBoard";

const TasksBoard = () => {
  const { boardId } = useParams();
  const {
    board,
    tasks,
    loading,
    error,
    updateBoardField,
    addTask,
  } = useBoard(boardId);

  const handleTaskClick = (task) => {
    console.log("Task clicked:", task);
    // TODO: open left slide-in editor
  };

  if (loading) return <p>Loading board...</p>;
  if (error) return <p>{error}</p>;
  if (!board) return null;

  return (
    <main className="board-container">
      <header className="board-header">
        <img src="/icons/logo.svg" alt="logo" className="board-logo"/>
        <div>
          <input 
            className="board-title" 
            value={board.name} 
            onChange={(e) => updateBoardField("name", e.target.value)}
          />
          <p className="board-subtitle"> Tasks to keep organised</p>
        </div>
        <img src="/icons/edit_duotone.svg" alt="Edit" width={24} height={24} style={{alignItems: "center"}}/>
      </header>
      <section>
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onClick={handleTaskClick}
          />
        ))}
      </section>
      <div className="task-card task-card-add" onClick={addTask}>
        <div className="add-icon">
          <img src="/icons/add_round_duotone.svg" alt="Add icon" width={25} height={25} />
        </div>
        <h3>Add new task</h3>
      </div>
    </main>
  );
};

export default TasksBoard;
