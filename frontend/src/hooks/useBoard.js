import { useState, useEffect } from "react";
import axios from "axios";

export const useBoard = (boardId) => {
  const [board, setBoard] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5001/api/boards/${boardId}`
        );
        setBoard({
          name: res.data.name,
          description: res.data.description,
        });
        setTasks(res.data.tasks);
      } catch {
        setError("Failed to fetch board");
      } finally {
        setLoading(false);
      }
    };

    fetchBoard();
  }, [boardId]);

  const updateBoardField = async (field, value) => {
    setBoard((prev) => ({ ...prev, [field]: value }));
    await axios.put(
      `http://localhost:5001/api/boards/${boardId}`,
      { [field]: value }
    );
  };

  const addTask = async () => {
    const res = await axios.post(`http://localhost:5001/api/tasks`, {
      boardId,
    });
    setTasks((prev) => [...prev, res.data]);
  };

  return {
    board,
    tasks,
    loading,
    error,
    updateBoardField,
    addTask,
  };
};
