import {v4 as uuidv4} from 'uuid';
import Column from '../columns/column.model';

class Board {
  id: string;

  title: string;

  columns: Column[];

  constructor({ id = uuidv4(), title = 'title', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  getColumn(id: string) {
    const column = this.columns.find((e) => {
      if (e.id === id) {
        return true;
      }
      return false;
    })
    if (!column) {
      throw new Error('Unable to find column');
    }
    return column;
  }

  setColumnsFromArray(columns: { [key: string]: string; }[]) {
    columns.forEach((columnArr) => {
      const column = new Column();
      column.title = `${columnArr['title']  }`;
      column.order = `${columnArr['order']  }`;
      this.columns.push(column);
    });
  };

  /**
   * Converts board to object
   * 
   * @param {Board} board
   * @returns { [key: string]: string; }
   */
  static toResponse(board: Board): { [key: string]: string | { [key: string]: string; }[]; } {
    const {id} = board;
    const {title} = board;
    const columns: { [key: string]: string; }[] = [];
    board.columns.forEach((column) => {
      columns.push(Column.toResponse(column));
    });
    return { id, title, columns };
  }
}

export default Board;