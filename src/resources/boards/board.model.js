const uuid = require('uuid').v4;
const Column = require('../columns/column.model.js');

class Board {
  /**
   * Constructor
   * @param {Object} param0 input default params
   * @returns {void} nothing to return
   */
  constructor({ id = uuid(), title = 'title', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  /**
   * Returns column
   * @param {string} id id to search
   * @returns {Board} found board
   */
  getColumn(id) {
    const column = this.columns.find((e) => {
      if (e.id === id) {
        return true;
      }
      return false;
    });
    if (!column) {
      throw new Error('Unable to find column');
    }
    return column;
  }

  /**
   * Sets columns from array
   * @param {Object} columns columns to set
   * @returns {void} nothing to return
   */
  setColumnsFromArray(columns) {
    columns.forEach((columnArr) => {
      const column = new Column();
      column.title = columnArr.title;
      column.order = columnArr.order;
      this.columns.push(column);
    });
  }

  /**
   * Converts board to object
   * @param {Board} board object to convert
   * @returns {Object} converted object
   */
  static toResponse(board) {
    const { id, title } = board;
    const columns = [];
    board.columns.forEach((column) => {
      columns.push(Column.toResponse(column));
    });
    return { id, title, columns };
  }
}

module.exports = Board;
