import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    icon: String,
    status: {
      type: String,
      enum: ["In Progress", "Completed", "Will Not Do", ""],
      default: ""
    },
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
      required: true
    },
    status_icon: {
      type: String,
      default: ""
    },
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
