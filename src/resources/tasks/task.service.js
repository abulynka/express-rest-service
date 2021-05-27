const tasksRepo = require('./task.memory.repository');
const Task = require('./task.model');
const boardService = require('../boards/board.service');
const userService = require('../users/user.service');

const getAll = async (boardId) => tasksRepo.getAll(boardId);

const get = async (boardId, taskId) => tasksRepo.get(boardId, taskId);

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

const remove = async (boardId, taskId) => tasksRepo.remove(boardId, taskId);

const cleanUser = async (boardId, taskId) =>
  tasksRepo.cleanUser(boardId, taskId);

module.exports = { getAll, get, add, update, remove, cleanUser };
