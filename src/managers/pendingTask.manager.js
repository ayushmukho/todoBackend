const dal = require("../dal/dal");
const addToPendingtask = async (todoTaskId, userDetails) => {
  try {
    let todoTaskDetails = await dal.findTodotask(userDetails.id);

    if (todoTaskDetails) {
      let itemIndex = todoTaskDetails.todoTasks.findIndex(
        (task) => task._id == todoTaskId
      );
      if (itemIndex > -1) {
        let taskItems = todoTaskDetails.todoTasks[itemIndex];
        //Push it into Compelte Task
        const detailsCompleteTask = await addToPendingTask(
          taskItems.priority,
          taskItems.description,
          taskItems.title,
          taskItems.dueDate,
          userDetails.id
        );

        await dal.removeTodoTask(userDetails.id, todoTaskId)
        
        todoTaskDetails = await todoTaskDetails.save();
        return detailsCompleteTask;
      }
    }
  } catch (error) {
    throw { error: "Error in adding the details in the complete task manager" };
  }
};
const getPendingTasks = async (userDetails) => {
	try {
    return await dal.findPendingTask(userDetails.id);
  } catch (error) {
    throw { error: "Error in getting todo tasks in task manager" };
  }
}

//helpers
const addToPendingTask = async (
  priority,
  description,
  title,
  dueDate,
  userId
) => {
  try {
    let pendingTaskDetails = await dal.findPendingTask(userId);
    if (pendingTaskDetails) {
      pendingTaskDetails.pendingTasks.push({
        priority: priority,
        description: description,
        title: title,
        dueDate: dueDate,
      });
      pendingTaskDetails = await pendingTaskDetails.save();
      return pendingTaskDetails;
    } else {
      const newPendingTask = await dal.createPendingTask(
        userId,
        priority,
        description,
        title,
        dueDate
      );
      return newPendingTask;
    }
  } catch (error) {
    throw { error: "Error in adding the details in the complete task manager" };
  }
};
module.exports = {
  addToPendingtask,
	getPendingTasks
};
