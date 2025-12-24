import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    icon: String,
    status: {
      type: String,
      enum: ["To Do", "In Progress", "Completed", "Won't do"],
      default: "To Do"
    },
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
