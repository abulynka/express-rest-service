const boardsRepo = require('./board.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository');
const Board = require('./board.model');

/**
 * Returns all boards
 * 
 * @returns {Map<Board>} all boards
 */
const getAll = async () => boardsRepo.getAll();

/**
 * Adds new board
 * 
 * @param {object} params new board params
 * @returns {Board} added board
 * @throws {Error} wrong input data
 */
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

/**
 * Returns board by input id
 * 
 * @param {string} id 
 * @returns {Board} found board
 */
const get = async (id) => boardsRepo.get(id);

/**
 * Updates board
 * 
 * @param {string} id board id
 * @param {object} params new params
 * @returns {Board} updated board
 */
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

/**
 * Removes board by input id
 * 
 * @param {string} id board id to remove
 * @returns {void}
 */
const remove = async (id) => {
  await tasksRepo.removeByBoardId(id);
  await boardsRepo.remove(id);
};

module.exports = { getAll, add, get, update, remove };
