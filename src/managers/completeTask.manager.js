const dal = require("../dal/dal");

const addCompleteTask = async (taskId, userDetails) => {
  try {
    let todoTaskDetails = await dal.findTodotask(userDetails.id);
    let pendingTaskDetails = await dal.findPendingTask(userDetails.id);
    let priority, description, title, dueDate, id;
    if (todoTaskDetails || pendingTaskDetails) {
      let itemIndex = todoTaskDetails.todoTasks.findIndex(
        (task) => task._id == taskId
      );
      if (itemIndex > -1) {
        let taskItems = todoTaskDetails.todoTasks[itemIndex];

        priority = taskItems.priority;
        description = taskItems.description;
        title = taskItems.title;
        dueDate = taskItems.dueDate;
        id = userDetails.id;

        await dal.removeTodoTask(userDetails.id, taskId);
        
        todoTaskDetails = await todoTaskDetails.save();
      } else {
        let itemPendingIndex = pendingTaskDetails.pendingTasks.findIndex(
          (task) => task._id == taskId
        );
        if (itemPendingIndex > -1) {
          let taskItems = pendingTaskDetails.pendingTasks[itemPendingIndex];

          priority = taskItems.priority;
          description = taskItems.description;
          title = taskItems.title;
          dueDate = taskItems.dueDate;
          id = userDetails.id;

          // pendingTaskDetails.pendingTasks.splice(
          //   pendingTaskDetails.pendingTasks.findIndex(
          //     (task) => task._id === taskId
          //   ),
          //   1
          // );
          await dal.removePendingTask(userDetails.id, taskId);
          pendingTaskDetails = await pendingTaskDetails.save();
        }
      }
    }
    const detailsCompleteTask = await addToCompleteTask(
      priority,
      description,
      title,
      dueDate,
      id
    );
    return detailsCompleteTask;
  } catch (error) {
    throw { error: "Error in adding the details in the complete task manager" };
  }
};
const getCompletedTasks = async (userDetails) => {
  try {
    return await dal.findCompleteTask(userDetails.id);
  } catch (error) {
    throw { error: "Error in getting todo tasks in task manager" };
  }
};

//helpers
const addToCompleteTask = async (
  priority,
  description,
  title,
  dueDate,
  userId
) => {
  try {
    let completeTaskDetails = await dal.findCompleteTask(userId);
    if (completeTaskDetails) {
      completeTaskDetails.completedTasks.push({
        priority: priority,
        description: description,
        title: title,
        dueDate: dueDate,
      });
      completeTaskDetails = await completeTaskDetails.save();
      return completeTaskDetails;
    } else {
      const newCompleteTask = await dal.createCompletedTask(
        userId,
        priority,
        description,
        title,
        dueDate
      );
      return newCompleteTask;
    }
  } catch (error) {
    throw { error: "Error in adding the details in the complete task manager" };
  }
};

module.exports = {
  addCompleteTask,
  getCompletedTasks,
};
