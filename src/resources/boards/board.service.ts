import boardsRepo from './board.memory.repository';
import tasksRepo from '../tasks/task.memory.repository';
import Board from './board.model';
import { Exception } from '../../middleware/exception';

/**
 * Returns all boards
 * 
 * @returns {Promise<Map<number, Board>>} all boards
 */
const getAll = async (): Promise<Map<number, Board>> => boardsRepo.getAll();

/**
 * Adds new board
 * 
 * @param { [key: string]: string; } params new board params
 * @returns {Promise<Board>} added board
 * @throws {Exception} wrong input data
 */
const add = async (params: { [key: string]: string; } ): Promise<Board> => {
  if (!params || !params['title'] || !params['columns']) {
    throw new Exception(Exception.STATUS_BAD_REQUEST, 'wrong input data');
  }

  const board = new Board();
  board.title = params['title'];
  board.title = params['title'];

  let columns: { [key: string]: string; }[] = [];
  if (params['columns'] && typeof params['columns'] === 'object') {
    columns = params['columns'];
  }
  board.setColumnsFromArray(columns);

  boardsRepo.add(board);
  return board;
}

/**
 * Returns board by input id
 * 
 * @param {string} id 
 * @returns {Promise<Board>} found board
 */
const get = async (id: string): Promise<Board> => boardsRepo.get(id);

/**
 * Updates board
 * 
 * @param {string} id board id
 * @param {object} params new params
 * @returns {Promise<Board>} updated board
 */
const update = async (id: string, params: { [key: string]: string; }): Promise<Board> => {
  const board = await boardsRepo.update(id, params);
  
  let columns: { [key: string]: string; }[] = [];
  if (params['columns'] && typeof params['columns'] === 'object') {
    columns = params['columns'];
  }
  columns.forEach((columnArr) => {
    try {
      const column = board.getColumn(`${columnArr?.['id']  }`);
      column.title = `${columnArr?.['title']  }`;
      column.order = parseInt(`${columnArr?.['order']  }`, 10);
    } catch {
      board.setColumnsFromArray([columnArr]);
    }
  });

  return board;
}

/**
 * Removes board by input id
 * 
 * @param {string} id board id to remove
 * @returns {Promise<void>}
 */
const remove = async (id: string): Promise<void> => {
  await tasksRepo.removeByBoardId(id);
  await boardsRepo.remove(id);
}

export default { getAll, add, get, update, remove };