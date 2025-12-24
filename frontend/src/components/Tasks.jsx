import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import "../task.css";

const TaskCard = ({ task, onClick }) => {
  const { name, description, icon } = task;

  return (
    <div className="task-card" onClick={() => onClick(task)}>
      <div className="task-left">
        <div className="task-icon">{icon || "📌"}</div>
        <div className="task-text">
          <div className="task-name">{name}</div>
          <div className="task-desc">{description || null}</div>
        </div>
      </div>
      <div className="task-right">
      </div>
    </div>
  );
};

const Tasks = () => {
  const { boardId } = useParams();
  const [board, setBoard] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5001/api/boards/${boardId}`);
        setBoard({ name: res.data.name, description: res.data.description });
        setTasks(res.data.tasks);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch board");
      } finally {
        setLoading(false);
      }
    };
    fetchBoard();
  }, [boardId]);

  const updateBoardField = async (field, value) => {
    setBoard(prev => ({ ...prev, [field]: value }));
    try {
      await axios.put(`http://localhost:5001/api/boards/${boardId}`, { [field]: value });
    } catch (err) {
      console.error("Error updating board:", err);
    }
  };

  const handleUpdateTask = async (id, data) => {
    try {
      await axios.put(`http://localhost:5001/api/tasks/${id}`, data);
      setTasks(prev => prev.map(t => t._id === id ? { ...t, ...data } : t));
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/tasks/${id}`);
      setTasks(prev => prev.filter(t => t._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const handleAddTask = async () => {
    try {
      const res = await axios.post(`http://localhost:5001/api/tasks`, {
        boardId,
        name: "New Task",
        status: "In Progress",
        description: "",
        icon: "📌"
      });
      setTasks(prev => [...prev, res.data]);
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  const handleTaskClick = (task) => {
    console.log("Task clicked:", task);
    // TODO: open left slide-in editor
  };

  if (loading) return <p>Loading board...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="tasks-page">
      <div className="board-header">
        <input
          value={board.name}
          onChange={(e) => updateBoardField("name", e.target.value)}
          className="board-name"
        />
        <textarea
          value={board.description}
          onChange={(e) => updateBoardField("description", e.target.value)}
          className="board-description"
        />
      </div>

      <div className="tasks-container">
        {tasks.map(task => (
          <TaskCard
            key={task._id}
            task={task}
            onUpdate={handleUpdateTask}
            onDelete={handleDeleteTask}
            onClick={handleTaskClick}
          />
        ))}
        <button onClick={handleAddTask} className="add-task-btn">+ Add Task</button>
      </div>
    </div>
  );
};

export default Tasks;
