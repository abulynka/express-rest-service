const boardsRepo = require('./board.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository');
const Board = require('./board.model');

const getAll = async () => boardsRepo.getAll();
const add = async (params) => {
  if (!params || !params.title || !params.columns) {
    throw new Error('Wrong input data');
  }

  const board = new Board();
  board.title = params.title;
  board.title = params.title;
  board.setColumnsFromArray(params.columns);

  boardsRepo.add(board);
  return board;
};
const get = async (id) => boardsRepo.get(id);
const update = async (id, params) => {
  const board = await boardsRepo.update(id, params);
  params.columns.forEach((columnArr) => {
    try {
      const column = board.getColumn(columnArr.id);
      column.title = columnArr.title;
      column.order = columnArr.order;
    } catch {
      board.setColumnsFromArray(columnArr);
    }
  });
  return board;
};
const remove = async (id) => {
  await tasksRepo.removeByBoardId(id);
  await boardsRepo.remove(id);
};

module.exports = { getAll, add, get, update, remove };
