const completeTaskManager = require("../../managers/completeTask.manager");
const addToCompleteTask = async function (req, res) {
  try {
    let userDetails = req.query.authData.userData;
    const { taskId } = req.body;
    const completeTaskDetails = await completeTaskManager.addCompleteTask(
      taskId,
      userDetails
    );
    return res.status(201).json({
      completeTaskDetails,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getCompletedTasks = async function (req, res) {
  try {
    let userDetails = req.query.authData.userData;
    const getCompletedTask = await completeTaskManager.getCompletedTasks(userDetails);
    return res.status(200).json({
      getCompletedTask,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  addToCompleteTask,

  getCompletedTasks,
};
