const tasksRepo = require('./task.memory.repository');
const Task = require('./task.model');
const boardService = require('../boards/board.service');
const userService = require('../users/user.service');

/**
 * Returns all tasks
 * 
 * @param {string} boardId search criteria by board id
 * @returns {Task}
 */
const getAll = async (boardId) => tasksRepo.getAll(boardId);

/**
 * Returns task by search criterias
 * 
 * @param {string} boardId search criteria board id
 * @param {string} taskId search criteria task id
 * @returns {Task} found task
 */
const get = async (boardId, taskId) => tasksRepo.get(boardId, taskId);

/**
 * Adds new task
 * 
 * @param {string} boardId board id for task
 * @param {object} params new task params
 * @returns {Task} added task
 */
const add = async (boardId, params) => {
  if (!params) {
    throw new Error('Wrong input params');
  }

  const items = [
    'title',
    'order',
    'description',
    'userId',
    'boardId',
    'columnId',
  ];
  const task = new Task();

  task.boardId = boardId;
  items.forEach((el) => {
    if (params[el]) {
      task[el] = params[el];
    }
  });

  // checks for valid ids
  if (task.boardId) {
    const board = boardService.get(task.boardId);
    if (task.columnId) {
      board.getColumn(task.columnId);
    }
  }
  if (task.userId) {
    userService.get(task.userId);
  }

  tasksRepo.add(task);

  return task;
};

/**
 * Updates task
 * 
 * @param {string} boardId search criteria by board id
 * @param {string} taskId search criteria by task id
 * @param {object} params new info for task
 * @returns {Task} updated task
 */
const update = async (boardId, taskId, params) => {
  if (!params) {
    throw new Error('Wrong input params');
  }
  const items = [
    'title',
    'order',
    'description',
    'userId',
    'boardId',
    'columnId',
  ];

  const task = new Task();
  task.boardId = boardId;
  items.forEach((el) => {
    if (params[el]) {
      task[el] = params[el];
    }
  });

  // checks for valid ids
  if (task.boardId) {
    const board = boardService.get(task.boardId);
    if (task.columnId) {
      board.getColumn(task.columnId);
    }
  }
  if (task.userId) {
    userService.get(task.userId);
  }
  tasksRepo.update(boardId, taskId, task);
  return task;
};

/**
 * Removes task
 * 
 * @param {string} boardId search criteria by board id
 * @param {string} taskId search criteria by task id
 * @returns {void}
 */
const remove = async (boardId, taskId) => tasksRepo.remove(boardId, taskId);

/**
 * Cleans user
 * 
 * @param {string} boardId search criteria by board id
 * @param {string} taskId search criteria by task id
 * @returns {void}
 */
const cleanUser = async (boardId, taskId) =>
  tasksRepo.cleanUser(boardId, taskId);

module.exports = { getAll, get, add, update, remove, cleanUser };
