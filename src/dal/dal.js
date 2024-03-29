const mongoose = require("mongoose");
const User = require("../models/User");
const TodoTask = require("../models/TodoTask");
const CompleteTask = require("../models/CompletedTask.js");
const PendingTask = require("../models/PendingTask");
require("dotenv").config();

async function connecttodb() {
  const connectionUrl = process.env.MONGO_CONNECTION_URL || "mongodb://localhost:27017/todoBackend";
  mongoose.set("strictQuery", true);
  mongoose
    .connect(connectionUrl)
    .then((con) => console.log(`Database connected: ${con.connection.host}`))
    .catch((err) => console.log(err));
}

const findUser = async (email) => {
  connecttodb();
  return await User.findOne({ email });
};

const createUser = async (details) => {
  connecttodb();
  const { name, email, password } = details;

  return await User.create({
    name,
    email,
    password,
  });
};

const findTodotask = async (userId) => {
  connecttodb();
  return await TodoTask.findOne({ userId });
};
const removeTodoTask = async (userId, taskId) => {
  connecttodb();
  return await TodoTask.updateOne(
    { userId: userId },
    { $pull: { todoTasks: { _id: taskId } } }
  );
};
const removePendingTask = async (userId, taskId) => {
  connecttodb();
  return await PendingTask.updateOne(
    { userId: userId },
    { $pull: { pendingTasks: { _id: taskId } } }
  );
};
const findCompleteTask = async (userId) => {
  connecttodb();
  return await CompleteTask.findOne({ userId });
};
const findPendingTask = async (userId) => {
  connecttodb();
  return await PendingTask.findOne({ userId });
};
const createTodoTask = async (
  userId,
  priority,
  description,
  title,
  dueDate
) => {
  connecttodb();
  return await TodoTask.create({
    userId,
    todoTasks: [{ title, priority, description, dueDate }],
  });
};

const createCompletedTask = async (
  userId,
  priority,
  description,
  title,
  dueDate
) => {
  connecttodb();
  return await CompleteTask.create({
    userId,
    completedTasks: [{ title, priority, description, dueDate }],
  });
};

const createPendingTask = async (
  userId,
  priority,
  description,
  title,
  dueDate
) => {
  connecttodb();
  return await PendingTask.create({
    userId,
    pendingTasks: [{ title, priority, description, dueDate }],
  });
};

module.exports = {
  findUser,
  createUser,
  findTodotask,
  createTodoTask,
  findCompleteTask,
  createCompletedTask,
  findPendingTask,
  createPendingTask,
  removeTodoTask,
  removePendingTask
};
