const mongoose = require("mongoose");
const completedTaskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    completedTasks: [
      new mongoose.Schema(
        {
          title: String,
          priority: Number,
          description: String,
          dueDate: Date
        },
        {
          timestamps: true,
        }
      ),
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CompletedTask", completedTaskSchema);
