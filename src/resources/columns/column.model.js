const uuid = require('uuid').v4;

class Column {
  /**
   * Constructor
   * @param {Object} param0 params for constructor
   * @returns {void} nothing to return
   */
  constructor({ id = uuid(), title = 'title', order = 'order' } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }

  /**
   * Returns response
   * @param {Column} column input Column object
   * @returns {Object} object view of Column
   */
  static toResponse(column) {
    const { id, title, order } = column;
    return { id, title, order };
  }
}

module.exports = Column;
