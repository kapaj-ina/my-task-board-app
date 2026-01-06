import { useState, useEffect } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export const useBoard = (boardId) => {
  const [board, setBoard] = useState({ name: "", description: "" });
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  const handleError = (err, fallback) => {
    setError(err?.message || fallback);
  };

  useEffect(() => {
    if (!boardId) return;
    (async () => {
      try {
        const { data } = await axios.get(`${API}/boards/${boardId}`);
        setBoard({ name: data.name, description: data.description });
        setTasks(data.tasks || []);
      } catch (err) {
        handleError(err, "Failed to fetch board");
      }
    })();
  }, [boardId]);

  const updateBoardField = async (field, value) => {
    setBoard((prev) => ({ ...prev, [field]: value }));
    try {
      await axios.put(`${API}/boards/${boardId}`, { [field]: value });
    } catch (err) {
      handleError(err, "Failed to update board");
    }
  };

  const saveTask = async (taskData) => {
    try {
      const { data } = taskData.isNew
        ? await axios.post(`${API}/tasks`, taskData)
        : await axios.put(`${API}/tasks/${taskData._id}`, taskData);

      setTasks((prev) =>
        taskData.isNew
          ? [...prev, data]
          : prev.map((t) => (t._id === data._id ? data : t))
      );

      return data;
    } catch (err) {
      handleError(err, "Failed to save task");
      throw err;
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${API}/tasks/${taskId}`);
      setTasks((prev) => prev.filter((t) => t._id !== taskId));
    } catch (err) {
      handleError(err, "Failed to delete task");
      throw err;
    }
  };

  return {
    board,
    tasks,
    error,
    updateBoardField,
    deleteTask,
    saveTask
  };
};
