import express from "express";
import Task from "../models/Task.js";
import Board from "../models/Board.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { boardId } = req.body;
    if (!boardId) return res.status(400).json({ message: "boardId is required" });

    const board = await Board.findById(boardId);
    if (!board) return res.status(404).json({ message: "Board not found" });

    const task = await Task.create({
      boardId,
      name: "",
      description: "",
      icon: "",
      status: null,
      statusIcon: null,
    });

    board.tasks.push(task._id);
    await board.save();

    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
