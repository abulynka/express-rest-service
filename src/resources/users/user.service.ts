// import usersRepo from './user.memory.repository';
import { UserRepository } from './user.repository';
import { User } from './user.model';
// import { TaskRepository } from '../tasks/task.repository';
// import tasksRepo from '../tasks/task.memory.repository';

/**
 * Returns all users
 * `
 * @returns {Promise<User>} array of users
 */
const getAll = async (): Promise<User[]> => new UserRepository().getAll();

/**
 * Adds new user
 * 
 * @param {{[key: string]: string;}} params new user info
 * @returns {Promise<User>} new user
 * @throw {Error} wrong input data
 */
const add = async (params: { [key: string]: string; }): Promise<User> => {
  if (!params || !params['name'] || !params['login'] || !params['password']) {
    throw new Error('Wrong input data');
  }
  const user = new User();

  user.name = params['name'];
  user.login = params['login'];
  user.password = params['password'];

  return new UserRepository().add(user);
};

/**
 * Returns user by input id
 * 
 * @param {string} id user id to get
 * @returns {User}
 */
const get = async (id: string): Promise<User> => new UserRepository().get(id);

/**
 * Updates user
 * 
 * @param {string} id user id to update
 * @param {{ [key: string]: string; }} info new user info
 * @returns {User} new User updated object
 */
const update = async (id: string, info: {[key: string]: string;}): Promise<User> => new UserRepository().update(id, info);

/**
 * Removes user by input id
 * 
 * @param {string} id user id to remove 
 */
const remove = async (id: string) => {
  await new UserRepository().remove(id);
  // await new TaskRepository().cleanUser(id);
}

export default { getAll, add, get, update, remove };