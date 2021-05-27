const boards = new Map();

/**
 * Returns all bords
 * 
 * @returns {Map<Board>} all boards
 */
const getAll = async () => boards;

/**
 * Adds new board
 * 
 * @param {Board} board new board to add
 * @returns {Board} added board object 
 */
const add = async (board) => {
  boards.set(board.id, board);
  return board;
};

/**
 * Returns board by input id
 * 
 * @param {string} id board to search
 * @returns {Board} found bords
 * @throws {Error} unknown id
 */
const get = async (id) => {
  if (!boards.has(id)) {
    throw new Error('Unknown id');
  }
  return boards.get(id);
};

/**
 * Updates board by input id
 * 
 * @param {string} id input id to update 
 * @param {object} params new board params
 * @returns {Board} updated board
 * @throws {Error} unknown board
 */
const update = async (id, params) => {
  if (!boards.has(id)) {
    throw new Error('Unknown board');
  }

  const board = boards.get(id);
  board.title = params.title;
  return board;
};

/**
 * Removes board by input id
 * 
 * @param {string} id board id to remove
 * @return {void}
 */
const remove = async (id) => {
  if (!boards.has(id)) {
    throw new Error('Unable to find board');
  }

  boards.delete(id);
};

module.exports = { getAll, add, get, update, remove };
