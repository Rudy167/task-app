const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { taskService } = require('../services');

const createTask = catchAsync(async (req, res) => {
  const task = await taskService.createTask(req.body);
  res.status(httpStatus.CREATED).send(task);
});
const updateTask = catchAsync(async (req, res) => {
  const task = await taskService.updateTaskById(req.params.taskID, req.body);
  res.send(task);
});
const readTask = catchAsync(async (req, res) => {
  const task = await taskService.getTaskById(req.params.taskID);
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, 'task not found');
  }

  res.send(task);
});
const readAllTask = catchAsync(async (req, res) => {
  console.log("here" + req["user"]["_id"]);
  const tasks = await taskService.listAllTasks(req["user"]["_id"]);
  res.send(tasks);
});

const deleteTask = catchAsync(async (req, res) => {
  await taskService.deleteTaskById(req.body.taskID);
  res.status(httpStatus.NO_CONTENT).send();
});


module.exports = {
  createTask,
  updateTask,
  readTask,
  readAllTask,
  deleteTask
};
