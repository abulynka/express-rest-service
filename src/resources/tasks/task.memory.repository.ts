import Task from './task.model';

const tasks: Map<string, Task[]> = new Map();

/**
 * Returns all tasks
 * 
 * @param {string} boardId all tasks with input board id
 * @returns { Promise<Task[]>} all tasks by board id
 * @throws {Error} unable to find board
 */
const getAll = async (boardId: string): Promise<Task[]> => {
  if (!tasks.has(boardId)) {
    throw new Error('Unable to find board');
  }
  const foundTasks = tasks.get(boardId);
  if (!foundTasks) {
    throw new Error('Unable to find board');
  }
  return foundTasks;
};

/**
 * Returns task by input ids
 * 
 * @param {string} boardId board search criteria
 * @param {string} taskId task search criteria
 * @returns {Promise<Task>} found task
 * @throws {Error} unable to find board of task
 */
const get = async (boardId: string, taskId: string): Promise<Task> => {
  if (!tasks.has(boardId)) {
    throw new Error('Unable to find board');
  }
  const foundTasks = tasks.get(boardId);
  if (!foundTasks) {
    throw new Error('Unable to find board');
  }
  const result = foundTasks.find((task: Task) => task.id === taskId);
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
const add = async (task: Task): Promise<Task> => {
  if (!tasks.has(task.boardId)) {
    tasks.set(task.boardId, []);
  }
  tasks.get(task.boardId)?.push(task);
  return task;
};

/**
 * Removes task by board id
 * 
 * @param {string} boardId search criteria
 * @return {Promise<void>}
 */
const removeByBoardId = async (boardId: string): Promise<void> => {
  if (tasks.has(boardId)) {
    tasks.delete(boardId);
  }
};

/**
 * Removes task
 * 
 * @param {string} boardId search critera by board
 * @param {string} taskId search criteria by task
 * @return {Promise<void>}
 * @throws {Error} wrong board id
 */
const remove = async (boardId: string, taskId: string): Promise<void> => {
  if (!tasks.has(boardId)) {
    throw new Error('Wrong board id');
  }
  const foundTasks = tasks.get(boardId);
  if (!foundTasks) {
    throw new Error();
  }
  const tasksToSet = foundTasks.filter(task => task.id !== taskId);
  if (tasksToSet) {
    tasks.set(boardId, tasksToSet);
  }
};

/**
 * Updates task
 * 
 * @param {string} boardId search criteria by board
 * @param {string} taskId search criteria by task
 * @param {Object} newTask new task info
 * @returns {Promise<Task>}
 */
const update = async (
  boardId: string,
   taskId: string,
   newTask: {
     title: string,
     order: number,
     description: string,
     userId: string,
     columnId: string,
     boardId: string,
   }
): Promise<Task> => {
  const task = await get(boardId, taskId);

  task.title = newTask.title;
  task.order = newTask.order;
  task.description = newTask.description;
  task.userId = newTask.userId;
  task.columnId = newTask.columnId;
  task.boardId = newTask.boardId;

  return task;
};

/**
 * Cleans user
 * 
 * @param {string} userId sets task user id to null
 * @return {Promise<void>}
 */
const cleanUser = async (userId: string): Promise<void> =>
  tasks.forEach((value, key) => {
    value.forEach((task, index) => {
      if (task.userId === userId) {
        const taskIndex = tasks.get(key)?.[index];
        
        if (!taskIndex?.userId) {
          throw new Error();
        }
        taskIndex.userId = '';
      }
    });
  });

export default {
  getAll,
  get,
  add,
  removeByBoardId,
  remove,
  update,
  cleanUser,
};