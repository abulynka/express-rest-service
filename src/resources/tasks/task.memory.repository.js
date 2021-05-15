const tasks = new Map();

/**
 * @param {string} boardId
 * @returns
 */
const getAll = async (boardId) => {
  if (!tasks.has(boardId)) {
    throw new Error('Unable to find board');
  }

  return tasks.get(boardId);
};

/**
 *
 * @param {string} boardId
 * @param {string} taskId
 * @returns
 */
const get = async (boardId, taskId) => {
  if (!tasks.has(boardId)) {
    throw new Error('Unable to find board');
  }
  const result = tasks.get(boardId).find((task) => task.id === taskId);
  if (!result) {
    throw new Error(`Wrong task id ${taskId}`);
  }
  return result;
};

/**
 * @param {Task} task
 * @returns
 */
const add = async (task) => {
  if (!tasks.has(task.boardId)) {
    tasks.set(task.boardId, []);
  }
  tasks.get(task.boardId).push(task);
  return task;
};

/**
 * @param {string} boardId
 */
const removeByBoardId = async (boardId) => {
  if (tasks.has(boardId)) {
    tasks.delete(boardId);
  }
};

/**
 * @param {string} boardId
 * @param {string} taskId
 */
const remove = async (boardId, taskId) => {
  if (!tasks.has(boardId)) {
    throw new Error('Wrong board id');
  }

  tasks.set(
    boardId,
    tasks.get(boardId).filter((task) => task.id !== taskId)
  );
};

/**
 *
 * @param {string} boardId
 * @param {string} taskId
 * @param {Object} newTask
 * @returns
 */
const update = async (boardId, taskId, newTask) => {
  const task = await get(boardId, taskId);

  ['title', 'order', 'description', 'userId', 'columnId', 'boardId'].forEach(
    (item) => {
      task[item] = newTask[item];
    }
  );

  return task;
};

/**
 * @param {string} userId
 */
const cleanUser = async (userId) =>
  tasks.forEach((value, key) => {
    value.forEach((task, index) => {
      if (task.userId === userId) {
        tasks.get(key)[index].userId = null;
      }
    });
  });

module.exports = {
  getAll,
  get,
  add,
  removeByBoardId,
  remove,
  update,
  cleanUser,
};
