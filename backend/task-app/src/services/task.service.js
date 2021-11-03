const httpStatus = require('http-status');
const { Task } = require('../models');
const ApiError = require('../utils/ApiError');
const { userService } = require('../services');
/*
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateTaskById = async (taskId, updateBody) => {
  const task = await getTaskById(taskId);
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, 'task not found');
  }
  Object.assign(task, updateBody);
  await task.save();
  return task;
};



const queryTasks = async (filter, options) => {
  const tasks = await Task.paginate(filter, options);
  return tasks;
};
const listAllTasks = async (userID) => {
  console.log(userID);
  const user = await userService.getUserById(userID);
  const allTasks = [];

  for await (let each of user.tasks) {
    const task = await getTaskById(each);
    allTasks.push(task);
  }

  allTasks.sort((a, b) => {
    if (a == null)
      return 1;
    if (b == null)
      return -1;

    if (a.taskPriority == 'High')
      return -1;
    else if (b.taskPriority == 'High') {
      return 1;
    }
    else if (a.taskPriority == 'Low') {
      return 1;
    }
    else if (b.taskPriority == 'Low') {
      return -1;
    }
    else {
      return 0;
    }
  });
  console.log(allTasks);
  return allTasks;
};

const getTaskById = async (taskID) => {

  const task = await Task.findById(taskID);

  return task;
};
const createTask = async (taskBody) => {
  user = await userService.getUserById(taskBody.taskCreatedBy);
  if (!user) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'User not found, resource cannot be created');
  }
  const task = await Task.create(taskBody);
  await user.tasks.push(task._id);
  user.save();
  return task;
};
const deleteTaskById = async (taskID) => {
  const task = await getTaskById(taskID);
  await console.log(task);
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Task not found');
  }
  await task.remove();
  return task;
};

module.exports = {
  createTask,
  deleteTaskById,
  queryTasks,
  updateTaskById,
  listAllTasks

};
