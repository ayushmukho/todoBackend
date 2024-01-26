const dal = require("../dal/dal");

const addTodoTask = async (
  priority,
  description,
  title,
  taskId,
  dueDate,
  userDetails
) => {
  try {
    let todoTaskDetails = await dal.findTodotask(userDetails.id);

    if (todoTaskDetails) {
      let itemIndex = todoTaskDetails.todoTasks.findIndex(
        (task) => task._id == taskId
      );
      if (itemIndex > -1) {
        let taskItems = todoTaskDetails.todoTasks[itemIndex];
        taskItems.priority = priority;
        taskItems.description = description;
        taskItems.title = title;
        taskItems.dueDate = dueDate; //new Date().toISOString().split("T")[0]
        todoTaskDetails.todoTasks[itemIndex] = taskItems;
      } else {
        todoTaskDetails.todoTasks.push({
          priority: priority,
          description: description,
          title: title,
          dueDate: dueDate,
        });
      }
      todoTaskDetails = await todoTaskDetails.save();
      return todoTaskDetails;
    } else {
      const newTodotask = await dal.createTodoTask(
        userDetails.id,
        priority,
        description,
        title,
        dueDate
      );
      return newTodotask;
    }
  } catch (error) {
    throw { error: "Error in adding the details in the todo task manager" };
  }
};
const getTodoTasks = async (userDetails) => {
  try {
    return await dal.findTodotask(userDetails.id);
  } catch (error) {
    throw { error: "Error in getting todo tasks in task manager" };
  }
};
const removeTodoTask = async (userDetails, taskId) => {
  try {
    let todoTaskDetails = await dal.findTodotask(userDetails.id);
    if (todoTaskDetails) {
      let itemIndex = todoTaskDetails.todoTasks.findIndex(
        (task) => task._id == taskId
      );
      if (itemIndex > -1) {
        const removedData = await dal.removeTodoTask(userDetails.id, taskId);
        return removedData;
      }
    }
  } catch (error) {
    throw { error: "Error in removing todo tasks in task manager" };
  }
};
module.exports = {
  addTodoTask,
  getTodoTasks,
  removeTodoTask,
};
