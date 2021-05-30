const tasks = new Map();

/**
 * Returns all tasks
 * 
 * @param {string} boardId all tasks with input board id
 * @returns {Promise<Map<number,Task>>} all tasks by board id
 * @throws {Error} unable to find board
 */
const getAll = async (boardId) => {
  if (!tasks.has(boardId)) {
    throw new Error('Unable to find board');
  }

  return tasks.get(boardId);
};

/**
 * Returns task by input ids
 * 
 * @param {string} boardId board search criteria
 * @param {string} taskId task search criteria
 * @returns {Promise<Task>} found task
 * @throws {Error} unable to find board of task
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
 * Adds task
 * 
 * @param {Task} task new task
 * @returns {Promise<Task>} added task
 */
const add = async (task) => {
  if (!tasks.has(task.boardId)) {
    tasks.set(task.boardId, []);
  }
  tasks.get(task.boardId).push(task);
  return task;
};

/**
 * Removes task by board id
 * 
 * @param {string} boardId search criteria
 * @return {Promise<void>} nothing to return
 */
const removeByBoardId = async (boardId) => {
  if (tasks.has(boardId)) {
    tasks.delete(boardId);
  }
};

/**
 * Removes task
 * 
 * @param {string} boardId search critera by board
 * @param {string} taskId search criteria by task
 * @return {Promise<void>} nothing to return
 * @throws {Error} wrong board id
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
 * Updates task
 * 
 * @param {string} boardId search criteria by board
 * @param {string} taskId search criteria by task
 * @param {Object} newTask new task info
 * @returns {Promise<Task>} updated task
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
 * Cleans user
 * 
 * @param {string} userId sets task user id to null
 * @return {Promise<void>} nothing to return
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
