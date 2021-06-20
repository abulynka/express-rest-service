import {v4 as uuidv4} from 'uuid';
import Column from '../columns/column.model';
import { Exception } from '../../common/exception';

export class Board {
  public id: string;

  public title: string;

  public columns: Column[];

  public constructor({ id = uuidv4(), title = 'title', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  public getColumn(id: string) {
    const column = this.columns.find((e) => {
      if (e.id === id) {
        return true;
      }
      return false;
    })
    if (!column) {
      throw new Exception(Exception.STATUS_NOT_FOUND, 'unable to find column');
    }
    return column;
  }

  setColumnsFromArray(columns: { [key: string]: string; }[]) {
    columns.forEach((columnArr) => {
      const column = new Column();
      column.title = `${ columnArr['title'] }`;
      column.order = parseInt(`${ columnArr['order'] }`, 10);
      this.columns.push(column);
    });
  }

  /**
   * Converts board to object
   * 
   * @param {Board} board
   * @returns { [key: string]: string; }
   */
  static toResponse(board: Board): { [key: string]: string | { [key: string]: string | number; }[]; } {
    const {id} = board;
    const {title} = board;
    const columns: { [key: string]: string | number; }[] = [];
    board.columns.forEach((column) => {
      columns.push(Column.toResponse(column));
    });
    return { id, title, columns };
  }
}