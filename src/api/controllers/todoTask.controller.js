const taskManger = require("../../managers/todoTask.manager");
const addTodoTask = async function (req, res) {
  try {
    let userDetails = req.query.authData.userData;
    const { priority, description, title, taskId, dueDate } = req.body;
    const todoTaskDetails = await taskManger.addTodoTask(
      priority,
      description,
      title,
      taskId,
      dueDate,
      userDetails
    );
    return res.status(201).json({
      todoTaskDetails,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getTodoTasks = async function (req, res) {
  try {
    let userDetails = req.query.authData.userData;
    const getTodoTasks = await taskManger.getTodoTasks(userDetails);
    return res.status(200).json({
      getTodoTasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const removeTodoTask = async function (req, res){
  try {
    let userDetails = req.query.authData.userData;
    const { taskId } = req.body
    const getRemoveTodoTasks = await taskManger.removeTodoTask(userDetails, taskId);
    return res.status(200).json({
      getRemoveTodoTasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = {
  addTodoTask,
  getTodoTasks,
  removeTodoTask
};
