import tasksRepo from './task.memory.repository';
import Task from './task.model';
import boardService from '../boards/board.service';
import userService from '../users/user.service';
import { Exception } from '../../middleware/exception';

/**
 * Returns all tasks
 * 
 * @param {string} boardId search criteria by board id
 * @returns {Promise<Task[]>}
 */
const getAll = async (boardId: string): Promise<Task[]> => await tasksRepo.getAll(boardId);

/**
 * Returns task by search criterias
 * 
 * @param {string} boardId search criteria board id
 * @param {string} taskId search criteria task id
 * @returns {Promise<Task>} found task
 */
const get = async (boardId: string, taskId: string): Promise<Task> => await tasksRepo.get(boardId, taskId);

/**
 * Adds new task
 * 
 * @param {string} boardId board id for task
 * @param {object} params new task params
 * @returns {Promise<Task>} added task
 */
const add = async (boardId: string, params: { [key: string]: string; }): Promise<Task> => {
  if (!params) {
    throw new Exception(Exception.STATUS_BAD_REQUEST, 'wrong input params');
  }

  const task = new Task();
  task.boardId = boardId;
  task.title = `${params['title']  }`;
  task.order = parseInt(`${params['order']  }`, 10);
  task.description = `${params['description']  }`;
  task.userId = params['userId'] || null;
  task.columnId = params['columnId'] || null;

  // checks for valid ids
  if (task.boardId) {
    const board = await boardService.get(task.boardId);
    if (task.columnId) {
      board.getColumn(task.columnId);
    }
  }
  if (task.userId) {
    userService.get(task.userId);
  }

  tasksRepo.add(task);

  return task;
};

/**
 * Updates task
 * 
 * @param {string} boardId search criteria by board id
 * @param {string} taskId search criteria by task id
 * @param {object} params new info for task
 * @returns {Promise<Task>} updated task
 */
const update = async (boardId: string, taskId: string, params: { [key: string]: string; }): Promise<Task> => {
  if (!params) {
    throw new Exception(Exception.STATUS_BAD_REQUEST, 'wrong input params');
  }

  const task = new Task();
  task.boardId = boardId;
  task.title = `${params['title']  }`;
  task.order = parseInt(`${params['order']  }`, 10);
  task.description = `${params['description']  }`;``
  task.userId = params['userId'] || null;
  task.boardId ??= params['boardId'] || null;
  task.columnId ??= params['columnId'] || null;

  if (task.userId) {
    await userService.get(task.userId);
  }
  await tasksRepo.update(boardId, taskId, task);
  return task;
}

/**
 * Removes task
 * 
 * @param {string} boardId search criteria by board id
 * @param {string} taskId search criteria by task id
 * @returns {Promise<void>}
 */
const remove = async (boardId: string, taskId: string): Promise<void> => await tasksRepo.remove(boardId, taskId);

export default { getAll, get, add, update, remove };