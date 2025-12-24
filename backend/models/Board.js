import mongoose from "mongoose";

const boardSchema = new mongoose.Schema(
  {
    name: { type: String, default: "My Board" },
    description: { type: String, default: "" },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Board", boardSchema);