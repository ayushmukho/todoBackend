const taskManger = require("../../managers/pendingTask.manager");
const addToPendingtask = async function (req, res) {
  try {
    let userDetails = req.query.authData.userData;
    const { taskId } = req.body;
    const pendingtaskDetails = await taskManger.addToPendingtask(
      taskId,
      userDetails
    );
    return res.status(201).json({
      pendingtaskDetails,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getPendingTask = async function (req, res) {
  try {
    let userDetails = req.query.authData.userData;
    const getPendingTasks = await taskManger.getPendingTasks(userDetails);
    return res.status(200).json({
      getPendingTasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addToPendingtask,
  getPendingTask,
};
