import { Board } from './board.model';
import { Exception } from '../../common/exception';
import { BoardRepository } from './board.repository';
import Column from '../columns/column.model';

const getAll = async (): Promise<Board[]> => new BoardRepository().getAll();

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

  let columns: { [key: string]: string; }[] = [];
  if (params['columns'] && typeof params['columns'] === 'object') {
    columns = params['columns'];
  }
  board.setColumnsFromArray(columns);

  new BoardRepository().add(board);
  return board;
}

/**
 * Returns board by input id
 * 
 * @param {string} id 
 * @returns {Promise<Board>} found board
 */
const get = async (id: string): Promise<Board> => new BoardRepository().get(id);

/**
 * Updates board
 * 
 * @param {string} id board id
 * @param {object} params new params
 * @returns {Promise<Board>} updated board
 */
const update = async (id: string, params: { [key: string]: string; }): Promise<Board> => {
  const board = await new BoardRepository().update(id, params);

  let columns: { [key: string]: string; }[] = [];
  if (params['columns'] && typeof params['columns'] === 'object') {
    columns = params['columns'];
  }
  columns.forEach(async (columnArr) => {
      const column = new Column({
        id: columnArr['id'],
        title: columnArr['title'],
        order: parseInt(`${columnArr?.['order']  }`, 10),
      });
      await new BoardRepository().saveColumn(column);
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
  await new BoardRepository().remove(id);
}

export default { getAll, add, get, update, remove };