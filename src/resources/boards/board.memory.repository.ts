import Board from './board.model';

const boards = new Map();

/**
 * Returns all bords
 * @returns {Promise<Map<number, Board>>} all boards
 */
const getAll = async (): Promise<Map<number, Board>> => boards;

/**
 * Adds new board
 * @param {Board} board new board to add
 * @returns {Promise<Board>} added board object 
 */
const add = async (board: Board): Promise<Board> => {
  boards.set(board.id, board);
  return board;
};

/**
 * Returns board by input id
 * @param {string} id board to search
 * @returns {Promise<Board>} found bords
 * @throws {Error} unknown id
 */
const get = async (id: string): Promise<Board> => {
  if (!boards.has(id)) {
    throw new Error('Unknown id');
  }
  return boards.get(id);
};

/**
 * Updates board by input id
 * @param {string} id input id to update 
 * @param {Object} params new board params
 * @returns {Promise<Board>} updated board
 * @throws {Error} unknown board
 */
const update = async (id: string, params: { [key: string]: string; }): Promise<Board> => {
  if (!boards.has(id)) {
    throw new Error('Unknown board');
  }

  const board = boards.get(id);
  board.title = params['title'];
  return board;
};

/**
 * Removes board by input id
 * @param {string} id board id to remove
 * @return {Promise<void>} nothing to return
 */
const remove = async (id: string): Promise<void> => {
  if (!boards.has(id)) {
    throw new Error('Unable to find board');
  }

  boards.delete(id);
};

export default { getAll, add, get, update, remove };