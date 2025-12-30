import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import boardRoutes from "./routes/board.routes.js";
import taskRoutes from "./routes/task.routes.js";

dotenv.config();

const app = express();
app.use(cors({ origin:"https://my-task-board-frontend.onrender.com"}));
app.use(express.json());

app.use("/api/boards", boardRoutes);
app.use("/api/tasks", taskRoutes);

mongoose
  .connect(process.env.MONGO_URI) 
  .then(() => {
    console.log("MongoDB connected");
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
