const uuid = require('uuid').v4;

class Task {
  /**
   * Constructor
   * @param {Object} param0 input params
   * @returns {void} nothing to return
   */
  constructor({
    id = uuid(),
    title = '',
    order = 0,
    description = '',
    userId = null,
    boardId = null,
    columnId = null,
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  /**
   * Converts input task to object
   * @param {Task} task input task 
   * @returns {Object} converted task
   */
  static toResponse(task) {
    const { id, title, order, description, userId, boardId, columnId } = task;
    return { id, title, order, description, userId, boardId, columnId };
  }
}

module.exports = Task;
