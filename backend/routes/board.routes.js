import express from "express";
import Board from "../models/Board.js";
import Task from "../models/Task.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const board = await Board.create({
      name: "My Task Board",
      description: "Tasks to keep organised",
    });

    const defaultTasks = await Task.insertMany([
      { name: "Task in Progress", status: "In Progress", icon: "⏰", boardId: board._id },
      { name: "Task Completed", status: "Completed", icon: "🏆", boardId: board._id },
      { name: "Task Won't Do", status: "Won't do", icon: "☕", boardId: board._id },
    ]);

    board.tasks = defaultTasks.map(task => task._id);
    await board.save();

    res.status(201).json({ board, tasks: defaultTasks });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const board = await Board.findById(req.params.id).populate("tasks");

    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    res.json(board);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const board = await Board.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    res.json(board);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Task.deleteMany({ boardId: req.params.id });
    await Board.findByIdAndDelete(req.params.id);

    res.json({ message: "Board deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
