const uuid = require('uuid').v4;

class Column {
  constructor({ id = uuid(), title = 'title', order = 'order' } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }

  static toResponse(column) {
    const { id, title, order } = column;
    return { id, title, order };
  }
}

module.exports = Column;
