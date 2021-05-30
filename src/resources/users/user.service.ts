import usersRepo from './user.memory.repository';
import User from './user.model';
import tasksRepo from '../tasks/task.memory.repository';

/**
 * Returns all users
 * `
 * @returns {Promise<Map<number, User>>} map object of users
 */
const getAll = async (): Promise<Map<number, User>> => usersRepo.getAll();

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

  usersRepo.add(user);

  return user;
};

/**
 * Returns user by input id
 * 
 * @param {string} id user id to get
 * @returns {User}
 */
const get = async (id: string): Promise<User> => usersRepo.get(id);

/**
 * Updates user
 * 
 * @param {string} id user id to update
 * @param {{ [key: string]: string; }} info new user info
 * @returns {User} new User updated object
 */
const update = async (id: string, info: {[key: string]: string;}): Promise<User> => usersRepo.update(id, info);

/**
 * Removes user by input id
 * 
 * @param {string} id user id to remove 
 */
const remove = async (id: string) => {
  await usersRepo.remove(id);
  await tasksRepo.cleanUser(id);
}

export default { getAll, add, get, update, remove };