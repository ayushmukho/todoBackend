const mongoose = require("mongoose");
const pendingTaskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    pendingTasks: [
      new mongoose.Schema({
        title: String,
        priority: Number,
        description: String,
        dueDate: Date,
      }),
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("PendingTask", pendingTaskSchema);
