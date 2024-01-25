const mongoose = require("mongoose");
const todoTasksSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    todoTasks: [
      new mongoose.Schema(
        {
          title: String,
          priority: Number,
          description: String,
          dueDate: Date
        }
      ),
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("TodoTask", todoTasksSchema);
