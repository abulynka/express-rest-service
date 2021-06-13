import {v4 as uuidv4} from 'uuid';

class Column {
  id: string;

  title: string;

  order: number;

  constructor({ id = uuidv4(), title = 'title', order = 0 } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  };

  /**
   * 
   * @param {Column} column
   * @returns {{ [key: string]: string; }}
   */
  static toResponse(column: Column): { [key: string]: string | number; } {
    const { id, title, order } = column;
    return { id, title, order };
  };
}

export default Column;